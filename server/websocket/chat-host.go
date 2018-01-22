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

func (c *ChatHost) sendConfig() {
	msgData := ConfigMessageData{c.uuid.String()}
	msg := ConfigMessage{configMessageType, msgData}

	body, err := msg.serialize()
	if err != nil {
		log.Println(err)
		return
	}

	err = c.writeMessage(1, body)
	if err != nil {
		log.Println(err)
		return
	}
}

// handle the connection for the current chat host
func (c *ChatHost) handle() {
	// on closing the connection
	defer func() {
		c.hub.unsubscribe <- c
		c.conn.Close()
	}()

	for {
		// read and broadcast the different message asynchronously
		msg, err := c.readMessage()
		if err != nil {
			log.Println(err)
			return
		}

		c.hub.broadcast <- msg
	}
}

// readMessage reads a message from the host connection
func (c *ChatHost) readMessage() (hubMessage, error) {
	var msg hubMessage

	typ, body, err := c.conn.ReadMessage()
	if err != nil {
		return msg, err
	}

	msg = hubMessage{body, typ}

	return msg, nil
}

func (c *ChatHost) writeMessage(msgType int, msg []byte) error {
	return c.conn.WriteMessage(msgType, msg)
}
