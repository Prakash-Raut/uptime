package routes

import (
	"net/http"

	"github.com/Prakash-Raut/uptime/internal/db"
	"github.com/Prakash-Raut/uptime/internal/models"
	"github.com/gin-gonic/gin"
)

func RegisterWebsiteRoutes(router *gin.Engine) {
	api := router.Group("/api/websites")

	api.POST("", func(c *gin.Context) {
		var site models.Website
		if err := c.ShouldBindJSON(&site); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := db.DB.Create(&site).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusCreated, site)
	})

	api.GET("", func(c *gin.Context) {
		var sites []models.Website
		if err := db.DB.Find(&sites).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, sites)
	})
}
