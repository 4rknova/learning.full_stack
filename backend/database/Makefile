.PHONY: start_db_service


start_db_service:
	docker run -p 3306:3306 --name db_todo -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_DATABASE=todo -d mysql:latest

