import { createClient } from "redis";
import { v4 } from "uuid";
import { COMMANDS_CHANNEL, REDIS_URL, RESPONSE_CHANNEL } from "./constants";
import {
  Commands,
  type Command,
  type CommandResponse,
  type CommandsPayload,
} from "./types";

export const pub = await createClient({
  url: REDIS_URL,
}).connect();

export const sub = await createClient({
  url: REDIS_URL,
}).connect();

const requests = new Map();

await sub.subscribe(RESPONSE_CHANNEL, (message) => {
  const { id, payload } = JSON.parse(message) as CommandResponse;

  if (requests.has(id)) {
    const { resolve } = requests.get(id);
    resolve(payload);
    requests.delete(id);
  }
});

export async function sendCommand<C extends Commands>(
  name: C,
  payload: CommandsPayload<C>
) {
  return new Promise<unknown>((resolve, reject) => {
    const oId = v4();
    requests.set(oId, { resolve, reject });

    setTimeout(() => {
      requests.delete(oId);
      reject(new Error("Request timed out"));
    }, 10000);

    pub.publish(
      COMMANDS_CHANNEL,
      JSON.stringify({
        id: oId,
        name,
        payload,
      } satisfies Command)
    );
  });
}
