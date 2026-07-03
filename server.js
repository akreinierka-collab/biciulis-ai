import express from "express";
import cors from "cors";

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

        res.json({
            answer: data?.generated_text || "Nėra atsakymo"
        });

    } catch (err) {
        res.json({ answer: "Klaida: " + err.message });
    }
});

app.listen(10000, () => console.log("Bičiulis veikia"));
