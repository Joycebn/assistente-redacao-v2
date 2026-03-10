# ✏️ Assistente de Redação — Versão 2.0

Aplicativo guiado passo a passo para alunos montarem sua própria redação
dissertativa-argumentativa, escolhendo conectivos e ideias em cada etapa.
Desenvolvido especialmente para alunos com dislexia e discalculia.

---

## Estrutura do projeto

```
assistente-redacao/
├── server.js          ← Backend Node.js (proxy para a API Google Gemini)
├── package.json       ← Dependências
└── public/
    └── index.html     ← App completo (HTML + CSS + JS)
```

---

## Como pegar a chave do Google Gemini (GRÁTIS)

1. Acesse **aistudio.google.com**
2. Faça login com sua conta Google
3. Clique em **"Get API Key"** → **"Create API Key"**
4. Copie a chave gerada (começa com `AIza...`)

---

## Como rodar localmente

1. Instale o Node.js: https://nodejs.org
2. Entre na pasta e instale as dependências:
   ```bash
   npm install
   ```
3. Configure a variável de ambiente:
   ```bash
   export GEMINI_API_KEY=AIzaSua_chave_aqui
   ```
4. Inicie:
   ```bash
   npm start
   ```
5. Abra: **http://localhost:3000**

---

## Como subir no Render.com (grátis)

1. Crie conta em https://render.com
2. **New → Web Service** → conecte ao GitHub
3. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Em **Environment Variables** adicione:
   ```
   GEMINI_API_KEY = AIzaSua_chave_aqui
   ```
5. Clique em **Deploy** ✅

---

## O que o app faz

O aluno monta a redação passo a passo em 12 etapas:

1. 🎯 Tema
2. 🌐 Contextualização (histórica, atual, filósofo, definição, dado, cotidiano)
3. ⚠️ Apresentação do problema (com conectivo)
4. 💬 Tese (com conectivo)
5. 🧱 Dois argumentos (com conectivos)
6. 🧱 Desenvolvimento 1 — explicação
7. 📚 Desenvolvimento 1 — repertório
8. 🧱 Desenvolvimento 2 — explicação
9. 📚 Desenvolvimento 2 — repertório
10. 🔁 Conclusão — retomada
11. 🛠️ Proposta de intervenção (agente + ação + objetivo)
12. 🏆 Redação completa montada

O robô sugere ideias mas o aluno escreve e escolhe. ✅
