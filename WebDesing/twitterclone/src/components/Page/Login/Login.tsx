import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BskyAgent } from '@atproto/api';
import styles from './Login.module.css';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const agent = new BskyAgent({
      service: 'https://bsky.social'
    });

    try {
      await agent.login({
        identifier: identifier,
        password: password
      });
      console.log(agent)
      // Redireciona para a página de perfil com as informações do usuário
      window.sessionStorage.setItem("identifier", identifier);
      window.sessionStorage.setItem("password", password)
      navigate('/profile');
    } catch (error) {
      setMessage('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className={styles.login_container}>
      <h1>Login no Bluesky</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.form_group}>
          <label htmlFor="identifier">Identificador</label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
