
import { BskyAgent } from '@atproto/api';

const agent = new BskyAgent({
    service: 'https://bsky.social'
  });

const labelerDID = 'did:web:meu-labeler.com';

// Declara um labeler com rótulos personalizados
export async function declararLabeler() {
  const registroLabeler = {
    "$type": "app.bsky.labeler.service",
    "policies": {
      "labelValues": ["porn", "spider"],
      "labelValueDefinitions": [
        {
          "identifier": "spider",
          "severity": "alert",
          "blurs": "media",
          "defaultSetting": "warn",
          "locales": [
            { "lang": "pt", "name": "Aviso de Aranha", "description": "Aranha!!!" }
          ]
        }
      ]
    },
    "createdAt": new Date().toISOString(),
  };

  await agent.createRecord(labelerDID, registroLabeler);
}
