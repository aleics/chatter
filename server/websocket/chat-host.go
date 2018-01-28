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

func (c *ChatHost) getUUID() string {
	return c.uuid.String()
}

func (c *ChatHost) sendLogout() {
	msg := LogoutMessage{
		logoutMessageType,
		LogoutMessageData{
			c.getUUID(),
		},
	}

	body, err := msg.serialize()
	if err != nil {
		log.Println(err)
		return
	}

	c.hub.broadcast <- hubMessage{body, websocket.TextMessage}
}

func (c *ChatHost) sendConfig() {
	msgData := ConfigMessageData{c.getUUID()}
	msg := ConfigMessage{configMessageType, msgData}

	c.sendMessage(msg)
}

func (c *ChatHost) sendMessage(msg Message) {
	body, err := msg.serialize()
	if err != nil {
		log.Println(err)
		return
	}

	err = c.writeMessage(websocket.TextMessage, body)
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
