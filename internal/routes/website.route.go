package routes

import (
	"net/http"

	"github.com/Prakash-Raut/uptime/internal/db"
	"github.com/Prakash-Raut/uptime/internal/middleware"
	"github.com/Prakash-Raut/uptime/internal/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterWebsiteRoutes(router *gin.Engine) {
	api := router.Group("/api/v1/websites")
	api.Use(middleware.AuthMiddleware()) // Protect all website routes

	api.POST("", func(c *gin.Context) {
		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
			return
		}

		var site models.Website
		if err := c.ShouldBindJSON(&site); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Set user ID from authenticated user
		site.UserID = userID.(string)

		if err := db.DB.Create(&site).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		// Preload User relation before returning
		if err := db.DB.Preload("User").Where("id = ?", site.ID).First(&site).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusCreated, site)
	})

	api.GET("", func(c *gin.Context) {
		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
			return
		}

		var sites []models.Website
		// Only return websites belonging to the authenticated user
		if err := db.DB.Preload("User").Where("user_id = ?", userID).Find(&sites).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, sites)
	})

	api.GET("/:id", func(c *gin.Context) {
		id := c.Param("id")
		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
			return
		}
		var site models.Website

		if err := db.DB.Preload("Ticks", func(db *gorm.DB) *gorm.DB {
			return db.Select("id, status, response_time_ms, created_at, region_id, website_id")
		}).Where("id = ? AND user_id = ?", id, userID).First(&site).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(http.StatusNotFound, gin.H{"error": "Website not found"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// Build ticks array with only the required fields
		ticks := make([]gin.H, len(site.Ticks))
		for i, tick := range site.Ticks {
			ticks[i] = gin.H{
				"id":               tick.ID,
				"status":           tick.Status,
				"response_time_ms": tick.ResponseTimeMs,
				"created_at":       tick.CreatedAt,
				"region_id":        tick.RegionID,
			}
		}

		c.JSON(http.StatusOK, gin.H{
			"id":         site.ID,
			"url":        site.Url,
			"time_added": site.TimeAdded,
			"ticks":      ticks,
			"user_id":    site.UserID,
		})
	})
}
