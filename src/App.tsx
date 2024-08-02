import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io(
  "https://automatic-palm-tree-w6gwrwrw7v6h9vr4-8000.app.github.dev/"
);

export default function App() {
  const [message, setMessage] = useState("Nothing yet.");

  useEffect(() => {
    socket.emit("message", "Hello, asdf!");
    socket.on("message", (data) => {
      setMessage(data);
    });
    const getMessage = async () => {
      try {
        const response = await fetch("/api");
        const data = await response.text();
        setMessage(data);
      } catch (error) {
        console.log(error);
        setMessage("Error!");
      }
    };

    getMessage();
  }, []);

  return <main>asdf: {message}</main>;
}
