package controllers

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

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     checkOrigin,
}

// Handler handles the new websocket request
func (wsc *WSController) Handler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsc.upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	addHostByConn(conn)

	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		if messageType == 8 {
			// TODO: unregister chat host
		} else {
			if err = broadcastMessage(messageType, p); err != nil {
				log.Println(err)
				return
			}
		}
	}
}

func broadcastMessage(messageType int, body []byte) error {
	for _, chatHost := range chatHosts {
		if err := chatHost.conn.WriteMessage(messageType, body); err != nil {
			return err
		}
	}
	return nil
}

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
