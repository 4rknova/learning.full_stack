.PHONY: init install migrate start 

init: install 

start:
	docker start db_todo

install:
	docker run -p 3306:3306 --name db_todo -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_DATABASE=todo -d mysql:latest

migrate:
	./migrate -database mysql://root:pass@/todo -path ../server/internal/pkg/db/migrations/mysql up

