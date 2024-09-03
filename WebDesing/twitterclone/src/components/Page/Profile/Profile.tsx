import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = window.sessionStorage.getItem('accessJwt');
    if (!token) {
      setError('Nenhum token encontrado. Por favor, faça login.');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        const response = await axios(config);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        setError('Erro ao carregar o perfil.');
        setLoading(false);
        console.error('Erro ao buscar perfil:', error);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      {profile && (
        <div>
          <p>Nome: {profile.displayName}</p>
          <p>Descrição: {profile.description}</p>
          <p>Seguidores: {profile.followersCount}</p>
          <p>Seguindo: {profile.followsCount}</p>
          <p>Posts: {profile.postsCount}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
