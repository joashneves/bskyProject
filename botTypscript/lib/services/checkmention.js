"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMentions = checkMentions;
const tlds_1 = __importDefault(require("tlds"));
// Conjunto para armazenar os URIs das menções já respondidas
const respondedMentions = new Set();
// Função para detectar menções e links
function detectFacets(text) {
    const facets = [];
    let match;
    // Detectando menções
    const mentionRegex = /(^|\s|\()(@)([a-zA-Z0-9.-]+)(\b)/g;
    while ((match = mentionRegex.exec(text))) {
        const mentionHandle = match[3];
        const start = match.index + match[2].length; // Position after the '@'
        const end = start + mentionHandle.length;
        facets.push({
            $type: 'app.bsky.richtext.facet',
            index: {
                byteStart: start,
                byteEnd: end,
            },
            features: [
                {
                    $type: 'app.bsky.richtext.facet#mention',
                    did: mentionHandle, // Mentioned user ID must be resolved
                },
            ],
        });
    }
    // Detectando links
    const linkRegex = /(^|\s|\()((https?:\/\/[\S]+)|((?<domain>[a-z][a-z0-9]*(\.[a-z0-9]+)+)[\S]*))/gim;
    while ((match = linkRegex.exec(text))) {
        let uri = match[2];
        if (!uri.startsWith('http')) {
            const domain = match.groups?.domain;
            if (!domain || !isValidDomain(domain)) {
                continue;
            }
            uri = `https://${uri}`;
        }
        const start = match.index;
        const end = start + match[2].length;
        facets.push({
            index: {
                byteStart: start,
                byteEnd: end,
            },
            features: [
                {
                    $type: 'app.bsky.richtext.facet#link',
                    uri,
                },
            ],
        });
    }
    return facets.length > 0 ? facets : undefined;
}
// Função para verificar e responder menções
async function checkMentions(agent) {
    try {
        const notifications = await agent.listNotifications();
        // Filtra as menções
        const mentions = notifications.data.notifications.filter((notif) => notif.reason === 'mention');
        // Função para obter o DID de um usuário a partir do handle
        async function getUserDID(agent, handle) {
            try {
                const user = await agent.getProfile({ handle });
                return user.data.did; // Retorna o DID do usuário
            }
            catch (error) {
                console.error(`Erro ao obter o DID para @${handle}:`, error);
                return null;
            }
        }
        // No seu código de verificação de menções
        for (const mention of mentions) {
            const postUri = mention.uri;
            const postCid = mention.cid;
            const authorHandle = mention.author.handle;
            // Verifica se já respondemos a essa menção
            if (!respondedMentions.has(postUri)) {
                console.log(`Menção de ${authorHandle} encontrada!`);
                // Obtém o DID do autor da menção
                const authorDID = await getUserDID(agent, authorHandle);
                if (!authorDID) {
                    console.log(`DID não encontrado para @${authorHandle}, ignorando.`);
                    continue; // Ignora se não encontrar o DID
                }
                // Responder ao post da menção
                const responseText = `Olá, @${authorHandle}! Obrigado pela menção!`;
                const facets = detectFacets(new UnicodeString(responseText)); // Certifique-se de usar a função detectFacets
                await agent.post({
                    text: responseText,
                    createdAt: new Date().toISOString(),
                    reply: {
                        root: {
                            uri: postUri,
                            cid: postCid,
                        },
                        parent: {
                            uri: postUri,
                            cid: postCid,
                        },
                    },
                    facets, // Inclui as facetas geradas
                });
                console.log(`Respondido a @${authorHandle}`);
                // Marca a menção como respondida
                respondedMentions.add(postUri);
            }
            else {
                console.log(`Já respondido a @${authorHandle}, ignorando.`);
            }
        }
    }
    catch (error) {
        console.error('Erro ao verificar menções:', error);
    }
}
// Função para validar domínios
function isValidDomain(str) {
    return !!tlds_1.default.find((tld) => {
        const i = str.lastIndexOf(tld);
        if (i === -1) {
            return false;
        }
        return str.charAt(i - 1) === '.' && i === str.length - tld.length;
    });
}
