run:
	docker run -p 3306:3306 --name db_todo -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_DATABASE=todo -d mysql:latest

build: dep
	CGO_ENABLED=0 go build -o server server.go

dep:
	go mod download

docker_build:
	docker build -t todo_server:latest .
