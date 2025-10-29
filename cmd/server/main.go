package main

import (
	"log"

	"github.com/Prakash-Raut/uptime/internal/db"
	"github.com/Prakash-Raut/uptime/internal/models"
	"github.com/Prakash-Raut/uptime/internal/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	db.ConnectDB()

	if err := db.DB.AutoMigrate(&models.Website{}, &models.Region{}, &models.Tick{}); err != nil {
		log.Fatal("Migration failed:", err)
	}

	router := gin.Default()
	routes.RegisterWebsiteRoutes(router)
	routes.RegisterRegionRoutes(router)
	routes.RegisterTickRoutes(router)
	log.Println("🚀 API running on http://localhost:8080")
	router.Run(":8080")
}
