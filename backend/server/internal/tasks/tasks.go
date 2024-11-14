package tasks

import (
	"database/sql"
	"log"
	database "server/internal/pkg/db/mysql"
	"server/internal/users"
)

type Task struct {
	ID     string
	Text   string
	IsDone bool
	User   *users.User
}

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
	return id
}

func (task Task) Update() bool {
	stmt, err := database.Db.Prepare("UPDATE Tasks SET IsDone=? WHERE ID=?")
	if err != nil {
		log.Fatal(err)
	}
	res, err := stmt.Exec(task.IsDone, task.ID)
	if err != nil {
		log.Fatal(err)
	}
	count, err := res.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}
	return count == 1
}

func (task Task) Delete() bool {
	stmt, err := database.Db.Prepare("DELETE FROM Tasks WHERE ID=?")
	if err != nil {
		log.Fatal(err)
	}
	res, err := stmt.Exec(task.ID)
	if err != nil {
		log.Fatal(err)
	}
	count, err := res.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}
	return count == 1
}

func GetAll() []Task {
	stmt, err := database.Db.Prepare("SELECT ID, Text, IsDone FROM Tasks")
	if err != nil {
		log.Fatal(err)
	}
	defer func(stmt *sql.Stmt) {
		err := stmt.Close()
		if err != nil {
			log.Fatal(err)
		}
	}(stmt)
	rows, err := stmt.Query()
	if err != nil {
		log.Fatal(err)
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			log.Fatal(err)
		}
	}(rows)
	var tasks []Task
	for rows.Next() {
		var task Task
		err := rows.Scan(&task.ID, &task.Text, &task.IsDone)
		if err != nil {
			log.Fatal(err)
		}
		tasks = append(tasks, task)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}
	return tasks
}
