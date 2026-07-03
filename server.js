import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY;

app.post("/ask", async (req, res) => {
    const { question, name } = req.body;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + API_KEY
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `
Tu esi Bičiulis – ramus, draugiškas, realistiškas pokalbio partneris.
Kalbi paprastai, be filosofijos.
Trumpi atsakymai.
Jei nežinai – pasakai.
Kartais užduodi klausimą atgal.
Vartotojo vardas: ${name || "drauge"}
                        `
                    },
                    {
                        role: "user",
                        content: question
                    }
                ]
            })
        });

        const data = await response.json();

        res.json({
            answer: data.choices[0].message.content
        });

    } catch (err) {
        res.json({ answer: "Klaida: " + err.message });
    }
});

app.listen(10000, () => {
    console.log("Bičiulis veikia");
});
