package websocket

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// WSController manages the websocket stream
type WSController struct {
	upgrader websocket.Upgrader
}

// NewWSController creates a new websocket controller
func NewWSController() *WSController {
	var upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin:     checkOrigin,
	}

	return &WSController{
		upgrader,
	}
}

// Handler handles the new websocket request
func (wsc *WSController) Handler(hub *Hub, w http.ResponseWriter, r *http.Request) {
	// upgrade the connection information
	conn, err := wsc.upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	// initialize a new chat host and add it to the hub
	chatHost := newChatHost(conn, hub)
	hub.subscribe <- chatHost

	go chatHost.sendConfig()

	// Handle chat host connection in a parallel worker
	go chatHost.handle()
}

// TODO: add really checkOrigin logic
func checkOrigin(r *http.Request) bool {
	return true
}
