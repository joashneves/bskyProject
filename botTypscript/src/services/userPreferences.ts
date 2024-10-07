import { BskyAgent } from '@atproto/api';
// Preferências do usuário para moderação
const preferenciasUsuario = {
    userDid: 'did:plc:1234...',
    moderationPrefs: {
      adultContentEnabled: true,
      labels: {
        porn: 'hide',
        sexual: 'warn',
        nudity: 'ignore',
      },
      labelers: [
        {
          did: 'did:web:meu-labeler.com',
          labels: {
            porn: 'hide',
            sexual: 'warn',
            nudity: 'ignore',
          }
        }
      ],
      mutedWords: ['spam', 'ofensivo'],
      hiddenPosts: ['postId1', 'postId2'],
    },
  };

  const agent = new BskyAgent({
    service: 'https://bsky.social'
  });
  
  // Função para aplicar as preferências do usuário
  export async function aplicarPreferenciasUsuario() {

    await agent.setPreferences(preferenciasUsuario.userDid, preferenciasUsuario.moderationPrefs);
  }
  