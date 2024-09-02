"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@atproto/api");
const dotenv = __importStar(require("dotenv"));
const readline = __importStar(require("readline"));
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
    const agent = new api_1.BskyAgent({
        service: 'https://bsky.social'
    });
    try {
        // Faz o login
        await agent.login({
            identifier: process.env.BLUESKY_IDENTIFIER,
            password: process.env.BLUESKY_PASSWORD
        });
        console.log('Login realizado com sucesso!');
        rl.question('Digite a mensagem para postar no Bluesky: ', async (message) => {
            try {
                await agent.post({
                    text: message,
                    createdAt: new Date().toISOString()
                });
                console.log('Postagem feita com sucesso!');
            }
            catch (error) {
                console.error('Erro ao postar a mensagem:', error);
            }
            finally {
                rl.close(); // Fecha a interface de leitura
            }
        });
    }
    catch (error) {
        console.error('Erro ao iniciar o bot:', error);
    }
}
// Inicia o bot
startBot();
