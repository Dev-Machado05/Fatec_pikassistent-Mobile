require('dotenv').config();
const cors = require('cors');
const express = require('express');
const crypto = require('crypto');
const auth = require('./auth/authMiddleware');
const Groq = require('groq-sdk');

const app = express();

// Infra da API: configuracao de CORS e preflight.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Infra da API: habilita leitura de JSON no corpo das requisicoes.
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

let messages = [
  {
    id: crypto.randomUUID(),
    text: 'Oi, tudo bem?',
    senderName: 'aRandonGuy',
  },
];

// autenticação:
app.get('/profile', auth, (req, res) => {
  res.json({
    message: 'Usuário autenticado',
    uid: req.user.uid,
    email: req.user.email,
  });
});

// chat global (memoria local): lista mensagens salvas.
app.get('/api/getMessage', (req, res) => {
  res.status(200).json({ success: true, data: messages });
});

// chat global (memoria local): salva mensagem enviada.
app.post('/api/postMessage', (req, res) => {
  try {
    const { id, message, senderName } = req.body;

    if (!message || !senderName) {
      return res.status(400).json({
        success: false,
        error: 'Mensagem ou nome do remetente faltando.',
      });
    }

    const userId = id || `anon_${Date.now()}`;

    messages.push({ id: userId, text: message, senderName: senderName || 'Anônimo' });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// Chatbot IA: recebe mensagem do usuario e gera resposta com Groq.
app.post('/api/chat', async (req, res) => {
  try {
    console.log('🔍 HEADERS:', req.headers);
    console.log('🔍 BODY:', req.body);
    console.log('🔍 Body type:', typeof req.body);
    console.log('🔍 Body keys:', Object.keys(req.body));

    const { message } = req.body;
    console.log('🔍 Message:', message);

    if (!message) {
      console.error('Mensagem faltando no corpo da requisição.');
      return res.status(400).json({
        success: false,
        error: 'Mensagem faltando.',
      });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'Você é o Pikassistent, um expert em Pokémon da 1ª geração. Seja calmo, paciente e responda em português com o humor de um fã.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 1024,
      stream: false,
    });

    const botResponse = completion.choices[0].message.content;

    res.status(200).json({
      success: true,
      response: botResponse,
    });
  } catch (error) {
    console.error('Error generating chat completion:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = app;
