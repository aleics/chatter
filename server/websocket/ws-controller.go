package websocket

import (
	"log"
	"net"
	"net/http"
	"net/url"

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

	// Handle chat host connection in a parallel worker
	go chatHost.handle()
}

// checkOrigin checks if the origin host from the HTTP request
// is the same as the server host (ignoring if different port)
func checkOrigin(r *http.Request) bool {
	origin := r.Header["Origin"]
	if len(origin) == 0 {
		return true
	}
	u, err := url.Parse(origin[0])
	if err != nil {
		log.Println(err)
		return false
	}

	serverHost, _, err := net.SplitHostPort(u.Host)
	if err != nil {
		log.Println(err)
		return false
	}

	clientHost, _, err := net.SplitHostPort(r.Host)
	if err != nil {
		log.Println(err)
		return false
	}

	return serverHost == clientHost
}
