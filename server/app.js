import express from "express";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.get("/api", (req, res) => {
    res.send("Hello World!");
});

if (process.env.NODE_ENV === 'production') {
    console.log("starting production app...");
    
    app.use(express.static(path.join(__dirname, '..', 'dist')));
    app.use(express.static(path.join(__dirname, '..', 'public')));
    
    app.listen(process.env.PORT || 5000);
}

export default app;
