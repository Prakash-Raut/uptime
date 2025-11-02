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

var (
	ticks []models.Tick
	mutex sync.Mutex // Mutex to protect ticks slice for concurrent access
)

func RegionWorker(id int, region models.Region, wg *sync.WaitGroup) {
	defer wg.Done() // decrement wait group counter

	fmt.Printf("Worker %d: Started for region %s (%s)\n", id, region.Name, region.ID)

	// Load all websites
	var websites []models.Website
	if err := db.DB.Select("id", "url", "user_id").Find(&websites).Error; err != nil {
		log.Printf("Worker %d: Failed to load websites: %v", id, err)
		return
	}

	fmt.Printf("Worker %d: Found %d website(s) to check for region %s\n", id, len(websites), region.Name)

	// Check each website
	for _, website := range websites {
		fmt.Printf("Worker %d: Checking %s\n", id, website.Url)
		getWebsiteStatus(website, region.ID)
	}

	fmt.Printf("Worker %d: Finished checking all websites for region %s\n", id, region.Name)
}

func getWebsiteStatus(website models.Website, regionID string) {
	start := time.Now()
	url := strings.TrimSpace(website.Url) // remove whitespace from url
	resp, err := http.Get(url)            // send GET request to url

	if err != nil {
		log.Printf("Failed to check website %s: %v", url, err)
		return
	}

	defer resp.Body.Close() // close response body

	var tick models.Tick
	if resp.StatusCode == 200 {
		fmt.Printf("Website %s is up\n", url)
		tick = models.Tick{
			Status:         "up",
			ResponseTimeMs: int(time.Since(start).Milliseconds()),
			WebsiteID:      website.ID,
			RegionID:       regionID,
		}
	} else {
		fmt.Printf("Website %s is down (status: %d)\n", url, resp.StatusCode)
		tick = models.Tick{
			Status:         "down",
			ResponseTimeMs: int(time.Since(start).Milliseconds()),
			WebsiteID:      website.ID,
			RegionID:       regionID,
		}
	}

	// Thread-safe append to ticks slice
	mutex.Lock()
	ticks = append(ticks, tick)
	mutex.Unlock()
}

func CreateTick() error {
	if err := db.DB.Create(ticks).Error; err != nil {
		return err
	}
	return nil
}

func BatchInsertTicks() error {
	mutex.Lock()
	defer mutex.Unlock()

	if len(ticks) == 0 {
		return nil
	}
	db.DB.CreateInBatches(ticks, len(ticks)) // inserts per batch
	fmt.Printf("Inserted %d ticks\n", len(ticks))

	// Clear ticks slice after insertion to prepare for next cycle
	ticks = nil
	return nil
}
