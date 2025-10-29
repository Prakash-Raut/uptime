package consumer

import (
	"fmt"
	"log"
	"net/http"
	"strings"
	"sync"

	"github.com/Prakash-Raut/uptime/internal/models"
)

func WebsiteWorker(id int, ch chan models.Website, wg *sync.WaitGroup) {
	defer wg.Done() // decrement wait group counter
	for website := range ch {
		fmt.Printf("Worker %d: Checking %s\n", id, website.Url)
		getWebsiteStatus(website)
	}
}

func getWebsiteStatus(website models.Website) {
	url := strings.TrimSpace(website.Url) // remove whitespace from url
	resp, err := http.Get(url)   // send GET request to url

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close() // close response body
	if resp.StatusCode == 200 {
		fmt.Printf("Website %s is up\n", url)
	} else {
		fmt.Printf("Website %s is down\n", url)
	}
}
