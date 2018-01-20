package websocket

import (
	"github.com/twinj/uuid"
)

// Hub collects all the connected chat hosts, and manage their connections
type Hub struct {
	chatHosts []ChatHost
}

// NewHub creates a new hub instance
func NewHub() *Hub {
	return &Hub{
		chatHosts: make([]ChatHost, 0),
	}
}

// addHost adds a new host to the hub
func (h *Hub) addHost(chatHost ChatHost) ChatHost {
	h.chatHosts = append(h.chatHosts, chatHost)
	return chatHost
}

// broadcastMessage sends the message to all the subscribed hosts
func (h *Hub) broadcastMessage(messageType int, body []byte) error {
	errc := make(chan error)
	for _, chatHost := range h.chatHosts {
		// Writes message to all hosts asynchronously
		go func(chatHost ChatHost) {
			errc <- chatHost.conn.WriteMessage(messageType, body)
		}(chatHost)
	}

	// Wait for all the channels to finish
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

// unregister a host by uuid
func (h *Hub) unregister(chatHost *ChatHost) {
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
