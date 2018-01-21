package websocket

import (
	"encoding/json"
)

// Message contains the message information sent to the host
type Message struct {
	Text string `json:"text"`
	User string `json:"user"`
}

// Serialize a chat message instance
func (m *Message) serialize() ([]byte, error) {
	return json.Marshal(m)
}

// Deserialize a body message to a chat message instance
func deserializeMessage(msgText []byte) (*Message, error) {
	var msg Message
	if err := json.Unmarshal(msgText, &msg); err != nil {
		return nil, err
	}
	return &msg, nil
}
