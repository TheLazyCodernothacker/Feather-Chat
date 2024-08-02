import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
    const [message, setMessage] = useState('Nothing yet.');

    useEffect(() => {
        const getMessage = async () => {
            try {
                const response = await fetch('/api');
                const data = await response.text();
                setMessage(data);
            } catch (error) {
                console.log(error);
                setMessage('Error!');
            }
        }

        getMessage();
    }, []);

    return (
        <main>
            asdf: {message}
        </main>
    );
}