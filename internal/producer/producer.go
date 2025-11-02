package producer

import (
	"github.com/Prakash-Raut/uptime/internal/db"
	"github.com/Prakash-Raut/uptime/internal/models"
)

func LoadWebsites(ch chan models.Website) error {
	defer close(ch) // close channel at end

	var websites []models.Website
	if err := db.DB.Select("id", "url", "user_id").Find(&websites).Error; err != nil {
		return err
	}

	for _, website := range websites {
		ch <- website
	}

	return nil
}
