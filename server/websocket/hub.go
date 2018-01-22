package websocket

import (
	"github.com/twinj/uuid"
)

type hubMessage struct {
	body []byte
	typ  int
}

// Hub collects all the connected chat hosts, and manage their connections
type Hub struct {
	chatHosts []ChatHost

	broadcast   chan hubMessage
	subscribe   chan *ChatHost
	unsubscribe chan *ChatHost
}

// NewHub creates a new hub instance
func NewHub() *Hub {
	return &Hub{
		chatHosts:   make([]ChatHost, 0),
		broadcast:   make(chan hubMessage),
		subscribe:   make(chan *ChatHost),
		unsubscribe: make(chan *ChatHost),
	}
}

// Run the hub
func (h *Hub) Run() {
	for {
		select {
		case chatHost := <-h.subscribe:
			h.addHost(*chatHost)
		case chatHost := <-h.unsubscribe:
			h.removeHost(chatHost)
		case msg := <-h.broadcast:
			h.broadcastMsg(msg.typ, msg.body)
		}
	}
}

// addHost adds a new host to the hub
func (h *Hub) addHost(chatHost ChatHost) ChatHost {
	h.chatHosts = append(h.chatHosts, chatHost)
	return chatHost
}

// broadcastMsg sends the message to all the subscribed hosts
func (h *Hub) broadcastMsg(msgType int, msg []byte) error {
	errc := make(chan error)
	for _, chatHost := range h.chatHosts {
		// Writes message to all hosts asynchronously
		go func(chatHost ChatHost) {
			errc <- chatHost.writeMessage(msgType, msg)
		}(chatHost)
	}

	// Wait for all the workers to finish
	for i := 0; i < len(h.chatHosts); i++ {
		if err := <-errc; err != nil {
			return err
		}
	}
	return nil
}

// getIndexOfChatHost returns the index of a chat host by its uuid
func (h *Hub) getIndexOfChatHost(chatHost *ChatHost) int {
	for i, c := range h.chatHosts {
		if uuid.Equal(c.uuid, chatHost.uuid) {
			return i
		}
	}
	return -1
}

// removeHost removes a host by uuid
func (h *Hub) removeHost(chatHost *ChatHost) {
	if i := h.getIndexOfChatHost(chatHost); i != -1 {
		h.remove(i)
	}
}

// remove an element of the chat hosts array
func (h *Hub) remove(i int) {
	l := len(h.chatHosts)

	// Replace it with the last one.
	h.chatHosts[i] = h.chatHosts[l-1]

	// Chop off the last one.
	h.chatHosts = h.chatHosts[:l-1]
}
