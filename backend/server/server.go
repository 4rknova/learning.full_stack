package main

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/httplog/v2"
	"log"
	"log/slog"
	"net/http"
	"server/graph"
	"server/internal/pkg/db/mysql"
	"time"
)

const defaultPort = "4000"

func main() {
	logger := httplog.NewLogger("httplog-example", httplog.Options{
		// JSON:             true,
		LogLevel:         slog.LevelDebug,
		Concise:          true,
		RequestHeaders:   true,
		MessageFieldName: "message",
		TimeFieldFormat:  time.RFC850,
		Tags: map[string]string{
			"version": "v1.0-81aa4244d9fc8076a",
			"env":     "dev",
		},
	})

	port := defaultPort

	router := chi.NewRouter()
	router.Use(httplog.RequestLogger(logger))

	database.InitDB()
	defer func() {
		err := database.CloseDB()
		if err != nil {
			log.Fatal("Error: ", err)
		}
	}()
	database.Migrate()

	log.Print("Starting server at port ", port)

	server := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	router.Handle("/query", server)

	log.Fatal(http.ListenAndServe(":"+port, router))
}
