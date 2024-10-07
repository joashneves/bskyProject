import blue from '@atproto/api';
import * as dotenv from 'dotenv';
import { checkMentions } from './services/checkmention';
import { addLabel } from './services/addLabels';
import { declararLabeler } from './services/labeler';
import { aplicarPreferenciasUsuario } from './services/userPreferences';
import { relatarUsuario } from './services/reportUser';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();
const { BskyAgent } = blue;

async function main() {
  await declararLabeler();
  await aplicarPreferenciasUsuario();
  await relatarUsuario();
}


async function startBot() {
  const agent = new BskyAgent({
    service: 'https://bsky.social'
  });

  try {
    await agent.login({
      identifier: process.env.BLUESKY_IDENTIFIER!,
      password: process.env.BLUESKY_PASSWORD!
    });

    console.log('Login realizado com sucesso!');

    // Verifica menções a cada 60 segundos
    setInterval(() => checkMentions(agent), 60000);

    // Exemplo de uso da função para adicionar labels
    await addLabel(agent, 'uri-do-post', 'cid-do-post', 'label-exemplo');

  } catch (error) {
    console.error('Erro ao iniciar o bot:', error);
  }
}

startBot();
