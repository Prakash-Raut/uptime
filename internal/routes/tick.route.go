package routes

import (
	"net/http"

	"github.com/Prakash-Raut/uptime/internal/db"
	"github.com/Prakash-Raut/uptime/internal/models"
	"github.com/gin-gonic/gin"
)

func RegisterTickRoutes(router *gin.Engine) {
	api := router.Group("/api/ticks")

	api.POST("", func(c *gin.Context) {
		var tick models.Tick
		if err := c.ShouldBindJSON(&tick); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := db.DB.Create(&tick).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusCreated, tick)
	})

	api.GET("", func(c *gin.Context) {
		var ticks []models.Tick
		if err := db.DB.Find(&ticks).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, ticks)
	})
}
