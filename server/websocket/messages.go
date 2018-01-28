package websocket

import (
	"encoding/json"
)

const (
	chatMessageType   = "CHAT"
	configMessageType = "CONFIG"
	logoutMessageType = "LOGOUT"
)

// Message is the interface for all types of messages
type Message interface {
	serialize() ([]byte, error)
}

// ChatMessage describes a message of the chat
type ChatMessage struct {
	MsgType string          `json:"type"`
	Data    ChatMessageData `json:"data"`
}

// Serialize a chat message instance
func (m ChatMessage) serialize() ([]byte, error) {
	return json.Marshal(m)
}

// Deserialize a body message to a chat message instance
func deserializeChatMessage(msgText []byte) (ChatMessage, error) {
	var msg ChatMessage
	if err := json.Unmarshal(msgText, &msg); err != nil {
		return msg, err
	}
	return msg, nil
}

// ChatMessageData contains the information used on a chat message
type ChatMessageData struct {
	Text string `json:"text"`
	User user   `json:"User"`
}

type user struct {
	Name string `json:"name"`
	UUID string `json:"uuid"`
}

// ConfigMessage describes a configuration message send to the host
type ConfigMessage struct {
	MsgType string            `json:"type"`
	Data    ConfigMessageData `json:"data"`
}

// Serialize a chat message instance
func (m ConfigMessage) serialize() ([]byte, error) {
	return json.Marshal(m)
}

// Deserialize a body message to a chat message instance
func deserializeConfigMessage(msgText []byte) (ConfigMessage, error) {
	var msg ConfigMessage
	if err := json.Unmarshal(msgText, &msg); err != nil {
		return msg, err
	}
	return msg, nil
}

// ConfigMessageData containes the information used on a config message
type ConfigMessageData struct {
	UUID string `json:"uuid"`
}

// LogoutMessage is the message that will be sent, when a chat host unsubscribes
type LogoutMessage struct {
	MsgType string            `json:"type"`
	Data    LogoutMessageData `json:"data"`
}

// LogoutMessageData contains the information used on a logout message
type LogoutMessageData struct {
	UUID string `json:"uuid"`
}

// Serialize a logout message instance
func (m LogoutMessage) serialize() ([]byte, error) {
	return json.Marshal(m)
}
