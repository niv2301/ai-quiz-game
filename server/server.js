const express = require('express');
const OpenAI = require('openai');
const dotenv = require('dotenv');
const cors = require('cors');

// טוען את משתני הסביבה
dotenv.config();

// יצירת השרת
const app = express();
const port = 3000;

// הגדרת CORS כדי לאפשר בקשות מלקוח אחר (React ב-3001)
app.use(cors({ origin: 'http://localhost:3001' }));

// חובה! הוספת JSON parser כדי שהשרת יוכל לקרוא `req.body`
app.use(express.json()); 

// יצירת חיבור ל-OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ודא שהמפתח מגיע מה-ENV
});

// מסלול לקבלת שאלה מה-OpenAI
app.post("/generate-question", async (req, res) => {
  const { category, difficulty } = req.body; // קבלת קטגוריה ורמת קושי מהבקשה

  // בדוק שהקטגוריה ורמת הקושי הוגדרו
  if (!category || !difficulty) {
    return res.status(400).json({ error: 'Category and difficulty are required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `צור שאלה בקטגוריה "${category}" ברמת קושי "${difficulty}" עם 4 תשובות אפשריות, ואחת מהן נכונה. על הפלט להיות בפורמט JSON בלבד: { "question": "...", "answers": ["...", "...", "...", "..."], "correct": "..." }`,
        },
      ],
    });

    if (response && response.choices && response.choices.length > 0) {
      const jsonResponse = JSON.parse(response.choices[0].message.content);
      
      if (!jsonResponse.question || !jsonResponse.answers || !jsonResponse.correct) {
        return res.status(500).json({ error: "Invalid JSON format from OpenAI" });
      }

      res.json(jsonResponse);
    } else {
      res.status(500).json({ error: "Invalid response from OpenAI" });
    }

  } catch (error) {
    console.error("Error generating question:", error);
    res.status(500).json({ error: "Failed to generate question" });
  }
});




// הפעלת השרת
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
