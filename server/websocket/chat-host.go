package websocket

import (
	"log"

	"github.com/gorilla/websocket"
	"github.com/twinj/uuid"
)

// ChatHost is an instance of a client host
type ChatHost struct {
	conn *websocket.Conn
	hub  *Hub
	uuid uuid.Uuid
}

// newChatHost creates a new ChatHost instance
func newChatHost(conn *websocket.Conn, hub *Hub) *ChatHost {
	return &ChatHost{
		conn,
		hub,
		uuid.NewV1(),
	}
}

// handle the connection for the current chat host
func (c *ChatHost) handle() {
	// on closing the connection
	defer func() {
		c.hub.unregister(c)
		c.conn.Close()
	}()

	for {
		// read and broadcast the different message asynchronously
		ch := make(chan error)
		go func(chatHost *ChatHost) {
			messageType, p, err := c.conn.ReadMessage()
			if err != nil {
				ch <- err
			}
			if err = c.hub.broadcastMessage(messageType, p); err != nil {
				ch <- err
			}
			// if successful, return nil. Otherwise the channel never sends
			// a value and is not able to closing the goroutine
			ch <- nil
		}(c)

		// wait for
		if err := <-ch; err != nil {
			log.Println(err)
			return
		}
	}
}
