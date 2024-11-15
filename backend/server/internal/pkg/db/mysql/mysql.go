package database

import (
	"database/sql"
	"errors"
	_ "github.com/go-sql-driver/mysql"
	"github.com/golang-migrate/migrate"
	"github.com/golang-migrate/migrate/database/mysql"
	_ "github.com/golang-migrate/migrate/source/file"
	"log"
	"time"
)

var Db *sql.DB

func InitDB() {
	log.Print("Initiating database connection..")

	for {
		var db, err = sql.Open("mysql", "root:pass@tcp(todo_db:3306)/todo?parseTime=true")
		if err != nil {
			log.Print(err)
			time.Sleep(5 * time.Second)
			continue
		}

		if err = db.Ping(); err != nil {
			log.Print(err)
			continue
		} else {
			Db = db
			break
		}
	}
}

func CloseDB() error {
	log.Print("Closing database connection..")

	return Db.Close()
}

func Migrate() {
	log.Print("Performing database migration..")

	if err := Db.Ping(); err != nil {
		log.Fatal(err)
	}

	driver, _ := mysql.WithInstance(Db, &mysql.Config{})
	m, _ := migrate.NewWithDatabaseInstance(
		"file://internal/pkg/db/migrations/mysql",
		"mysql",
		driver,
	)

	if err := m.Up(); err != nil && !errors.Is(err, migrate.ErrNoChange) {
		log.Fatal(err)
	}
}
