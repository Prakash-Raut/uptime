package main

import (
	"fmt"
	"log"
	"sync"

	"github.com/Prakash-Raut/uptime/internal/consumer"
	"github.com/Prakash-Raut/uptime/internal/db"
	"github.com/Prakash-Raut/uptime/internal/models"
	"github.com/Prakash-Raut/uptime/internal/producer"
)

func main() {
	fmt.Println("🧠 Worker started")

	db.ConnectDB()

	ch := make(chan models.Website)
	go func() {
		if err := producer.LoadWebsites(ch); err != nil {
			log.Fatal(err)
		}
	}()

	var wg sync.WaitGroup
	for i := 0; i < 3; i++ {
		wg.Add(1)
		go consumer.WebsiteWorker(i, ch, &wg)
	}

	wg.Wait()
	fmt.Println("✅ All workers done")
}
