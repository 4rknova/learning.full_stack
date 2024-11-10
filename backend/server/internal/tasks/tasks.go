package tasks

import (
	"log"
	database "server/internal/pkg/db/mysql"
	"server/internal/users"
)

// #1
type Task struct {
	ID     string
	Text   string
    IsDone bool
	User   *users.User
}

//#2
func (task Task) Save() int64 {
	stmt, err := database.Db.Prepare("INSERT INTO Tasks(Text,IsDone) VALUES(?,?)")
	if err != nil {
		log.Fatal(err)
	}
	res, err := stmt.Exec(task.Text, task.IsDone)
	if err != nil {
		log.Fatal(err)
	}
	id, err := res.LastInsertId()
	if err != nil {
		log.Fatal("Error:", err.Error())
	}
	log.Print("Row inserted!")
	return id
}

func GetAll() []Task {
	log.Print("Fetching all tasks..")

	stmt, err := database.Db.Prepare("SELECT id, Text, IsDone FROM Tasks")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()
	rows, err := stmt.Query()
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var tasks []Task
	for rows.Next() {
		var task Task
		err := rows.Scan(&task.ID, &task.Text, &task.IsDone)
		if err != nil{
			log.Fatal(err)
		}
		tasks = append(tasks, task)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}
	return tasks
}
