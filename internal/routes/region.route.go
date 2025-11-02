package routes

import (
	"net/http"

	"github.com/Prakash-Raut/uptime/internal/db"
	"github.com/Prakash-Raut/uptime/internal/middleware"
	"github.com/Prakash-Raut/uptime/internal/models"
	"github.com/gin-gonic/gin"
)

func RegisterRegionRoutes(router *gin.Engine) {
	api := router.Group("/api/v1/regions")
	api.Use(middleware.AuthMiddleware()) // Protect all region routes

	api.POST("", func(c *gin.Context) {
		var region models.Region
		if err := c.ShouldBindJSON(&region); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := db.DB.Create(&region).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusCreated, region)
	})

	api.GET("", func(c *gin.Context) {
		var regions []models.Region
		// Return all regions (universal/default regions)
		if err := db.DB.Find(&regions).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, regions)
	})
}
