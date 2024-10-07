import { BskyAgent } from '@atproto/api';

const agent = new BskyAgent();

// Configura os rótulos principais da aplicação
BskyAgent.configure({
  appLabelers: ['did:web:meu-labeler.com'],
});

// Função para obter as preferências do usuário e as definições de rótulos
export async function obterPreferenciasERotulos() {
  // Assume que o agente está em uma sessão autenticada
  const prefs = await agent.getPreferences();
  const labelDefs = await agent.getLabelDefinitions(prefs);
  return { prefs, labelDefs };
}

// Função para sincronizar as definições de rótulos periodicamente
export async function sincronizarRotulos() {
  setInterval(async () => {
    const { prefs, labelDefs } = await obterPreferenciasERotulos();
    // Cache o resultado se necessário
    console.log('Sincronização de rótulos completa', { prefs, labelDefs });
  }, 21600000); // 6 horas
}
