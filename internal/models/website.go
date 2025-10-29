package models

import (
	"time"
)

type Website struct {
	ID        string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Url       string    `json:"url"`
	TimeAdded time.Time `json:"time_added"`
	Ticks     []Tick    `gorm:"foreignKey:WebsiteID;constraint:OnDelete:CASCADE;" json:"ticks"`
}
