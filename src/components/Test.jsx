"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";

export default function Test({ }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    
    const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
    if (!key) {
      console.error("NEXT_PUBLIC_PUSHER_KEY is missing");
      return;
    }

    const pusher = new Pusher(key, {
      cluster : "ap1", // use passed prop
    });

    const channel = pusher.subscribe("test-channel");
    channel.bind("test-event", (data) => {
      console.log("Received event:", data);
      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>Pusher Client Listener</h2>
      <p>
        <strong>Cluster:</strong>
      </p>

      {messages.length === 0 ? (
        <p>No messages received yet.</p>
      ) : (
        <ul>
          {messages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
