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
const checkmention_1 = require("./services/checkmention");
const addLabels_1 = require("./services/addLabels");
const labeler_1 = require("./services/labeler");
const userPreferences_1 = require("./services/userPreferences");
const reportUser_1 = require("./services/reportUser");
// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();
async function main() {
    await (0, labeler_1.declararLabeler)();
    await (0, userPreferences_1.aplicarPreferenciasUsuario)();
    await (0, reportUser_1.relatarUsuario)();
}
async function startBot() {
    const agent = new api_1.BskyAgent({
        service: 'https://bsky.social'
    });
    try {
        await agent.login({
            identifier: process.env.BLUESKY_IDENTIFIER,
            password: process.env.BLUESKY_PASSWORD
        });
        console.log('Login realizado com sucesso!');
        // Verifica menções a cada 60 segundos
        setInterval(() => (0, checkmention_1.checkMentions)(agent), 60000);
        // Exemplo de uso da função para adicionar labels
        await (0, addLabels_1.addLabel)(agent, 'uri-do-post', 'cid-do-post', 'label-exemplo');
    }
    catch (error) {
        console.error('Erro ao iniciar o bot:', error);
    }
}
startBot();
