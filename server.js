const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Chave não configurada.' });

  const { system, userMessage } = req.body;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: system || '',
        messages: [{ role: 'user', content: userMessage }]
      })
    });
    const data = await r.json();
    console.log('Anthropic status:', r.status, JSON.stringify(data).slice(0,200));
    if (!r.ok) return res.status(r.status).json({ error: data?.error?.message || 'Erro API' });
    const text = data?.content?.[0]?.text ?? '';
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
