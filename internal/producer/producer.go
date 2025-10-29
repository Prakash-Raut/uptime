package producer

import (
	"time"

	"github.com/Prakash-Raut/uptime/internal/db"
	"github.com/Prakash-Raut/uptime/internal/models"
)

func LoadWebsites(ch chan models.Website) error {
	defer close(ch) // close channel at end

	ticker := time.NewTicker(3 * time.Second) // check every 3 seconds
	defer ticker.Stop() // stop ticker at end

	for {
		var websites []models.Website
		if err := db.DB.Select("id", "url").Find(&websites).Error; err != nil {
			return err
		}

		for _, website := range websites {
			ch <- website
		}

		// Wait for next tick, exit if channel is closed by someone
		<-ticker.C
	}
}
