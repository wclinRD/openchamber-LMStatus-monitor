// Manages SSE clients for live LM Studio status updates.
import http from 'node:http';

import type { LmStudioEvent } from '../shared/snapshot.ts';

/** SSE clients connected to /lm-studio-events. */
export const lmStudioSseClients = new Set<http.ServerResponse>();

/** Push a live LM Studio event to all connected SSE clients. */
export const pushLmStudioEvent = (event: LmStudioEvent): void => {
  const data = JSON.stringify(event);
  for (const client of lmStudioSseClients) {
    try {
      client.write(`event: lm-studio\n`);
      client.write(`data: ${data}\n\n`);
    } catch {
      lmStudioSseClients.delete(client);
    }
  }
};
