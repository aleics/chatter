// server.go
package main

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"./controllers"
)

func main() {
	wsc := controllers.NewWSController()

	router := mux.NewRouter()
	router.HandleFunc("/chat", wsc.Handler)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:4200"},
		AllowCredentials: true,
	})

	handler := c.Handler(router)

	http.ListenAndServe(":1234", handler)
}
