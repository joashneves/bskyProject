"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relatarUsuario = relatarUsuario;
const api_1 = require("@atproto/api");
const agent = new api_1.BskyAgent({
    service: 'https://bsky.social'
});
// Função para relatar um usuário
async function relatarUsuario() {
    const relatorio = {
        reasonType: 'com.atproto.moderation.defs#reasonViolation',
        reason: 'Comportamento inadequado observado.',
        subject: { did: 'did:web:bob.com' },
    };
    await agent.withProxy('atproto_labeler', 'did:web:meu-labeler.com')
        .createModerationReport(relatorio);
}
