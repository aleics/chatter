package websocket

import (
	"encoding/json"
)

const (
	chatMessageType   = "CHAT"
	configMessageType = "CONFIG"
)

// Message is an interface that defines the functions of any message type
type Message interface {
	serialize() ([]byte, error)
	deserializeMessage(msgText []byte) (Message, error)
}

// ChatMessage describes a message of the chat
type ChatMessage struct {
	MsgType string          `json:"type"`
	Data    ChatMessageData `json:"data"`
}

// Serialize a chat message instance
func (m *ChatMessage) serialize() ([]byte, error) {
	return json.Marshal(m)
}

// Deserialize a body message to a chat message instance
func deserializeMessage(msgText []byte) (ChatMessage, error) {
	var msg ChatMessage
	if err := json.Unmarshal(msgText, &msg); err != nil {
		return msg, err
	}
	return msg, nil
}

// ChatMessageData contains the information used on a chat message
type ChatMessageData struct {
	Text string `json:"text"`
	User string `json:"user"`
}
