import { BskyAgent } from '@atproto/api';

// Função para adicionar um label a um post
export async function addLabel(agent: BskyAgent, postUri: string, postCid: string, label: string) {
  try {
    // Adiciona um label ao post com o URI e CID fornecidos
    await agent.labelPost({
      uri: postUri,
      cid: postCid,
      labels: [label], // A label que você deseja adicionar
    });

    console.log(`Label "${label}" adicionado ao post ${postUri}`);
  } catch (error) {
    console.error('Erro ao adicionar label:', error);
  }
}

// Função para atualizar a bio com labels
export async function updateBioWithLabels(agent: BskyAgent, newBio: string, selfLabels: string[]) {
  try {
    const currentProfile = await agent.getProfile();

    // Atualiza a bio do usuário com as self-labels (inserindo no final da bio)
    const updatedBio = `${newBio}\n\nLabels: ${selfLabels.join(', ')}`;

    await agent.updateProfile({
      displayName: currentProfile.data.displayName,
      description: updatedBio,
    });

    console.log('Bio atualizada com labels!');
  } catch (error) {
    console.error('Erro ao atualizar a bio com labels:', error);
  }
}
