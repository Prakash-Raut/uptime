package consumer

import (
	"fmt"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/Prakash-Raut/uptime/internal/db"
	"github.com/Prakash-Raut/uptime/internal/models"
)

var ticks []models.Tick

func WebsiteWorker(id int, ch chan models.Website, wg *sync.WaitGroup) {
	defer wg.Done() // decrement wait group counter
	for website := range ch {
		fmt.Printf("Worker %d: Checking %s\n", id, website.Url)
		getWebsiteStatus(website)
	}
}

func getWebsiteStatus(website models.Website) {
	start := time.Now()
	url := strings.TrimSpace(website.Url) // remove whitespace from url
	resp, err := http.Get(url)   // send GET request to url

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close() // close response body
	if resp.StatusCode == 200 {
		fmt.Printf("Website %s is up\n", url)
		ticks = append(ticks, models.Tick{
			Status: "up",
			ResponseTimeMs: int(time.Since(start).Milliseconds()),
			WebsiteID: website.ID,
			RegionID: "4f2f3d24-e5d0-4b55-ac40-0b6ffb4e49d0",
		})
	} else {
		fmt.Printf("Website %s is down\n", url)
		ticks = append(ticks, models.Tick{
			Status: "down",
			ResponseTimeMs: int(time.Since(start).Milliseconds()),
			WebsiteID: website.ID,
			RegionID: "4f2f3d24-e5d0-4b55-ac40-0b6ffb4e49d0",
		})
	}
}

func BatchInsertTicks() error {
	if len(ticks) == 0 {
		return nil
	}
	db.DB.CreateInBatches(ticks, len(ticks)) // inserts per batch
	fmt.Printf("Inserted %d ticks\n", len(ticks))
	return nil
}
