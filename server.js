const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
    const { question } = req.body;

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: question
                })
            }
        );

        const data = await response.json();

        let answer =
            data?.generated_text ||
            data?.[0]?.generated_text ||
            "Atsiprašau, negavau atsakymo.";

        res.json({ answer });

    } catch (err) {
        res.json({ answer: "Klaida: " + err.message });
    }
});

app.listen(10000, () => {
    console.log("Bičiulis (free) veikia");
}); 
