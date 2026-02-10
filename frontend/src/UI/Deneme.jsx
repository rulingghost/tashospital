import React, { useEffect, useState } from "react";

const Deneme = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const wsUrl = "ws://127.0.0.1:8001/ws/messages/"; // Backend WebSocket URL'si

  useEffect(() => {
    // WebSocket bağlantısını oluştur
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket bağlantısı kuruldu");
    };

    ws.onmessage = (event) => {
      // Gelen mesajları yakala
      const data = JSON.parse(event.data);
      if (data.message) {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket bağlantısı kapandı");
    };

    return () => {
      ws.close();
    };
  }, [wsUrl]);

  const sendMessage = () => {
    // Mesaj gönder
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({ message: inputMessage }));
      setInputMessage("");
    };
  };

  return (
    <div>
      <h1>WebSocket Test</h1>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Mesajınızı yazın"
        />
        <button onClick={sendMessage}>Gönder</button>
      </div>
      <div>
        <h2>Gelen Mesajlar</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default Deneme;
