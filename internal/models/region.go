package models

type Region struct {
	ID    string `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Name  string `json:"name"`
	Ticks []Tick `gorm:"foreignKey:RegionID;constraint:OnDelete:CASCADE;" json:"ticks"`
}
