package routes

import (
	"net/http"

	"github.com/Prakash-Raut/uptime/internal/db"
	"github.com/Prakash-Raut/uptime/internal/middleware"
	"github.com/Prakash-Raut/uptime/internal/models"
	"github.com/gin-gonic/gin"
)

func RegisterTickRoutes(router *gin.Engine) {
	api := router.Group("/api/v1/ticks")
	api.Use(middleware.AuthMiddleware()) // Protect all tick routes

	api.POST("", func(c *gin.Context) {
		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
			return
		}

		var tick models.Tick
		if err := c.ShouldBindJSON(&tick); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Verify that the website belongs to the authenticated user
		var website models.Website
		if err := db.DB.Where("id = ? AND user_id = ?", tick.WebsiteID, userID).First(&website).Error; err != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "Website not found or access denied"})
			return
		}

		// Verify that the region exists (regions are universal)
		var region models.Region
		if err := db.DB.Where("id = ?", tick.RegionID).First(&region).Error; err != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "Region not found"})
			return
		}

		if err := db.DB.Create(&tick).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		// Preload relations before returning
		db.DB.Preload("Website").Preload("Region").First(&tick, tick.ID)
		c.JSON(http.StatusCreated, tick)
	})

	api.GET("", func(c *gin.Context) {
		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
			return
		}

		var ticks []models.Tick
		// Only return ticks for websites belonging to the authenticated user
		if err := db.DB.Preload("Website").Preload("Region").
			Joins("JOIN websites ON websites.id = ticks.website_id").
			Where("websites.user_id = ?", userID).
			Find(&ticks).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, ticks)
	})
}
