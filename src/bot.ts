import { BskyAgent } from '@atproto/api';
import * as dotenv from 'dotenv';
import * as readline from 'readline';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configura o readline para ler do console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


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

    rl.question('Digite a mensagem para postar no Bluesky: ', async (message) => {
        try {
          await agent.post({
            text: message,
            createdAt: new Date().toISOString()
          });
  
          console.log('Postagem feita com sucesso!');
        } catch (error) {
          console.error('Erro ao postar a mensagem:', error);
        } finally {
          rl.close(); // Fecha a interface de leitura
        }
      });

  } catch (error) {
    console.error('Erro ao iniciar o bot:', error);
  }
}

// Inicia o bot
startBot();
