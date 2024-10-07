import { moderatePost, moderateProfile, moderateNotification, moderateFeedGen, moderateUserList, moderateLabeler } from '@atproto/api';

// Função para moderar um post
export async function moderarPost(post: any, moderationOptions: any) {
  const res = moderatePost(post, moderationOptions);

  const uiContext = res.ui('contentList');

  if (uiContext.filter) {
    // Não exiba o post
    console.log('Post filtrado e não será exibido.');
  }

  if (uiContext.blur) {
    // Cubra o post
    console.log('Post coberto devido ao seguinte motivo:', uiContext.blurs[0]);
    if (uiContext.noOverride) {
      console.log('A cobertura não pode ser removida.');
    }
  }

  // Moderar conteúdo de mídia dentro do post
  const mediaContext = res.ui('contentMedia');
  if (mediaContext.blur) {
    console.log('Mídia coberta:', mediaContext.blurs[0]);
    if (mediaContext.noOverride) {
      console.log('A cobertura da mídia não pode ser removida.');
    }
  }

  // Moderar avatar
  const avatarContext = res.ui('avatar');
  if (avatarContext.blur) {
    console.log('Avatar coberto:', avatarContext.blurs[0]);
    if (avatarContext.noOverride) {
      console.log('A cobertura do avatar não pode ser removida.');
    }
  }

  // Exibir alertas e informações
  for (const alert of uiContext.alerts) {
    console.log('Alerta:', alert);
  }
  for (const inform of uiContext.informs) {
    console.log('Informação:', inform);
  }
}
