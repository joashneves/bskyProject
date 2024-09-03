import React, { useEffect, useState } from 'react';
import { BskyAgent } from '@atproto/api';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
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
          displayName: profileResponse.data.displayName,
          description: profileResponse.data.description,
          followersCount: profileResponse.data.followersCount,
          followsCount: profileResponse.data.followsCount,
          postsCount: profileResponse.data.postsCount
        });

        navigate('/profile'); // Redireciona para a página de perfil
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
        <div>
          <p>Nome: {profile.displayName}</p>
          <p>Descrição: {profile.description}</p>
          <p>Seguidores: {profile.followersCount}</p>
          <p>Seguindo: {profile.followsCount}</p>
          <p>Posts: {profile.postsCount}</p>
        </div>
      ) : (
        <p>Perfil não encontrado.</p>
      )}
    </div>
  );
};

export default Profile;
