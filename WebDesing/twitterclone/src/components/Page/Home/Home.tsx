import { useEffect, useState } from "react";
import { agent } from "../../../lib/api";

interface Feed {
  displayName: string;
}

interface FeedsResponse {
  data: {
    feeds: Feed[];
  };
}

function Home() {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        // Obtém os geradores de feed populares
        const response = await agent.app.bsky.unspecced.getPopularFeedGenerators({
          limit: 10,
        });

        // Assegura que a resposta está tipada corretamente
        const data: FeedsResponse = response;
        setFeeds(data.data.feeds);
      } catch (err) {
        setError('Erro ao carregar feeds.');
        console.error('Erro ao buscar feeds:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-xl my-4">Top Feeds</h1>
      <ul>
        {feeds.map((feed) => (
          <li key={feed.displayName}>{feed.displayName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
