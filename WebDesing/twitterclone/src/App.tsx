import { useState } from 'react';
import { BskyAgent } from '@atproto/api';
import './App.css';

function App() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Impede o comportamento padrão de submissão do formulário

    const agent = new BskyAgent({
      service: 'https://bsky.social'
    });

    try {
      await agent.login({
        identifier: identifier,
        password: password
      });

      setMessage('Login realizado com sucesso!');
      // Aqui você pode adicionar lógica adicional após o login, como navegar para outra página
    } catch (error) {
      setMessage('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login no Bluesky</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="identifier">Identificador</label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
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

export default App;
