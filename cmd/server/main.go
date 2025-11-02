package main

import (
	"log"
	"time"

	"github.com/Prakash-Raut/uptime/internal/db"
	"github.com/Prakash-Raut/uptime/internal/models"
	"github.com/Prakash-Raut/uptime/internal/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db.ConnectDB()

	if err := db.DB.AutoMigrate(
		&models.User{},
		&models.Website{},
		&models.Region{},
		&models.Tick{},
	); err != nil {
		log.Fatal("Migration failed:", err)
	}

	router := gin.Default()

	// Configure CORS middleware
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Register auth routes (public)
	routes.RegisterAuthRoutes(router)

	// Register protected routes
	routes.RegisterWebsiteRoutes(router)
	routes.RegisterRegionRoutes(router)
	routes.RegisterTickRoutes(router)
	log.Println("🚀 API running on http://localhost:8080")
	router.Run(":8080")
}
