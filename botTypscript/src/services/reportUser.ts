import { BskyAgent } from '@atproto/api';

const agent = new BskyAgent({
    service: 'https://bsky.social'
  });

// Função para relatar um usuário
export async function relatarUsuario() {


    const relatorio = {
      reasonType: 'com.atproto.moderation.defs#reasonViolation',
      reason: 'Comportamento inadequado observado.',
      subject: { did: 'did:web:bob.com' },
    };
  
    await agent.withProxy('atproto_labeler', 'did:web:meu-labeler.com')
                .createModerationReport(relatorio);
  }
  