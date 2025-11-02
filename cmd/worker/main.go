package main

import (
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/Prakash-Raut/uptime/internal/consumer"
	"github.com/Prakash-Raut/uptime/internal/db"
	"github.com/Prakash-Raut/uptime/internal/models"
)

func main() {
	fmt.Println("🧠 Worker started")

	db.ConnectDB()

	// Load all regions from database
	var regions []models.Region
	if err := db.DB.Find(&regions).Error; err != nil {
		log.Fatal("Failed to load regions:", err)
	}

	if len(regions) == 0 {
		log.Println("⚠️  No regions found in database. Please create at least one region.")
		return
	}

	fmt.Printf("📋 Found %d region(s), creating %d worker(s)\n", len(regions), len(regions))

	// Create a ticker that fires every 3 seconds
	ticker := time.NewTicker(3 * time.Second)
	defer ticker.Stop()

	// Run immediately on startup
	runWorkerCycle(regions)

	// Then run every 3 seconds
	for range ticker.C {
		runWorkerCycle(regions)
	}
}

func runWorkerCycle(regions []models.Region) {
	fmt.Printf("🔄 Starting worker cycle at %s\n", time.Now().Format(time.RFC3339))

	var wg sync.WaitGroup
	for i, region := range regions {
		wg.Add(1)
		go consumer.RegionWorker(i, region, &wg)
	}

	wg.Wait()

	// ✅ Batch insert all ticks once
	if err := consumer.BatchInsertTicks(); err != nil {
		log.Printf("failed to insert ticks: %v", err)
	}

	fmt.Printf("✅ Worker cycle completed at %s\n\n", time.Now().Format(time.RFC3339))
}
