import React, { useEffect, useState } from 'react';
import { BskyAgent } from '@atproto/api';
import { useNavigate } from 'react-router-dom';
import  styles from './Profile.module.css';

interface ProfileData {
  avatar: string,
  banner: string,
  displayName: string;
  description: string;
  followersCount: number;
  followsCount: number;
  postsCount: number;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchProfile = async () => {
      const identifier = window.sessionStorage.getItem('identifier') || '';
      const password = window.sessionStorage.getItem('password') || '';

      const agent = new BskyAgent({
        service: 'https://bsky.social'
      });

      try {
        await agent.login({
          identifier: identifier,
          password: password
        });

        // Obtém dados do perfil
        const profileResponse = await agent.app.bsky.actor.getProfile({
          actor: identifier // Use o identificador do usuário para obter o perfil
        });

        // Atualiza o estado com os dados do perfil
        setProfile({
          avatar: profileResponse.data.avatar,
          banner: profileResponse.data.banner,
          displayName: profileResponse.data.displayName,
          description: profileResponse.data.description,
          followersCount: profileResponse.data.followersCount,
          followsCount: profileResponse.data.followsCount,
          postsCount: profileResponse.data.postsCount
        });

        console.log(profileResponse)
      } catch (error) {
        setError('Erro ao fazer login ou obter perfil.');
        console.error('Erro ao fazer login ou obter perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      {profile ? (
        <div className={styles.perfilAvatarConteiner}>
        <img className={styles.perfilAvatarBanner} src={profile.banner} alt="Banner do Usuário" />
        <img className={styles.perfilAvatar} src={profile.avatar} alt="Avatar do Usuário" />
        <div className={styles.perfilInfo}>
        <div className={styles.DescricaoNome}>
          <h1>Nome: {profile.displayName}</h1>
          <p>Descrição: {profile.description}</p>
        </div>
        <div className={styles.InformacoesCount}>
          <p>Seguidores: {profile.followersCount}</p>
          <p>Seguindo: {profile.followsCount}</p>
          <p>Posts: {profile.postsCount}</p>
        </div>
        </div>
        </div>
      
      ) : (
        <p>Perfil não encontrado.</p>
      )}

          
        
    </div>
  );
};

export default Profile;
