package controllers

import (
	"github.com/gorilla/websocket"
)

var chatHosts []ChatHost

type ChatHost struct {
	conn *websocket.Conn
}

func newChatHost(conn *websocket.Conn) *ChatHost {
	return &ChatHost{
		conn,
	}
}

func addHostByConn(conn *websocket.Conn) {
	chatHost := newChatHost(conn)

	addHost(*chatHost)
}

func addHost(chatHost ChatHost) {
	chatHosts = append(chatHosts, chatHost)
}
