const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Chave não configurada.' });

  const { system, userMessage } = req.body;
  const prompt = system ? `${system}\n\n${userMessage}` : userMessage;

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );
    const data = await r.json();
    console.log('Gemini status:', r.status, JSON.stringify(data).slice(0,200));
    if (!r.ok) return res.status(r.status).json({ error: data?.error?.message || 'Erro Gemini' });
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    res.json({ text });
  } catch (err) {
    console.error('ERRO:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
