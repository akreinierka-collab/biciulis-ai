import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const HF_TOKEN = process.env.HF_TOKEN;

app.post("/ask", async (req, res) => {
    const { question } = req.body;

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/google/flan-t5-small",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + HF_TOKEN,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: question
                })
            }
        );

        const data = await response.json();

        res.json({
            answer:
                data?.[0]?.generated_text ||
                data?.generated_text ||
                JSON.stringify(data)
        });

    } catch (err) {
        res.json({ answer: "Klaida: " + err.message });
    }
});

app.listen(10000, () => console.log("Bičiulis veikia"));
