package models

import "time"

type Tick struct {
	ID             string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Status         string    `json:"status"`
	ResponseTimeMs int       `json:"response_time_ms"`
	CreatedAt      time.Time `json:"created_at"`

	// Foreign keys
	WebsiteID string  `gorm:"type:uuid;not null" json:"website_id"`
	Website   Website `gorm:"constraint:OnDelete:CASCADE;" json:"website"`

	RegionID string `gorm:"type:uuid;not null" json:"region_id"`
	Region   Region `gorm:"constraint:OnDelete:CASCADE;" json:"region"`
}
