// server.go
package main

import (
	"log"
	"net/http"

	"./websocket"
)

func main() {
	startWebsocket()
}

func startWebsocket() {
	// Initialize the websocket functionality for connection handling
	wsc := websocket.NewWSController()
	hub := websocket.NewHub()
	addr := ":1234"

	log.Println("websocket: instances started")

	http.HandleFunc("/chat", func(w http.ResponseWriter, r *http.Request) {
		wsc.Handler(hub, w, r)
	})

	log.Printf("websocket: listening into %s", addr)

	if err := http.ListenAndServe(addr, nil); err != nil {
		log.Fatal(err)
	}
}
