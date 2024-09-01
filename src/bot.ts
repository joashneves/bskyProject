import { BskyAgent } from '@atproto/api';
import * as dotenv from 'dotenv';

dotenv.config();

// Função assíncrona para executar o bot
async function startBot() {
  // Cria uma instância do agente
  const agent = new BskyAgent({
    service: 'https://bsky.social'
  });

  try {
    // Faz o login
    await agent.login({
        identifier: process.env.BLUESKY_IDENTIFIER!,
        password: process.env.BLUESKY_PASSWORD!
    });

    console.log('Login realizado com sucesso!');

    // Faz uma postagem
    await agent.post({
      text: 'outro teste, rapidão.',
      createdAt: new Date().toISOString()
    });

    console.log('Postagem feita com sucesso!');
  } catch (error) {
    console.error('Erro ao iniciar o bot:', error);
  }
}

// Inicia o bot
startBot();
