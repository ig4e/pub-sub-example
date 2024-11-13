import { Hono } from "hono";
import { Commands } from "./types";
import { sendCommand } from "./utils";

const app = new Hono();

app.get("/api/guilds", async (c) => {
  const result = await sendCommand(Commands.GET_GUILDS, {
    guildIds: ["436338717368647680"],
  });

  return c.json(result as any);
});

app.get("/api/users", async (c) => {
  const result = await sendCommand(Commands.GET_USERS, {
    userIds: ["436338717368647680"],
  });

  return c.json(result as any);
});

export default app;
