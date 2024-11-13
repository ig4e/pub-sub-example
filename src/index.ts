import { COMMANDS_CHANNEL, RESPONSE_CHANNEL } from "./constants";
import { guilds, users } from "./dummy-data";
import { Commands, type CommandResponse, type ServerCommands } from "./types";
import { pub, sub } from "./utils";

sub.subscribe(COMMANDS_CHANNEL, (message) => {
  const { id, name, payload } = JSON.parse(message) as ServerCommands;

  if (name === Commands.GET_GUILDS) {
    const data = guilds.filter((guild) => payload.guildIds.includes(guild.id));

    pub.publish(
      RESPONSE_CHANNEL,
      JSON.stringify({
        id,
        payload: data,
      } satisfies CommandResponse)
    );
  }

  if (name === Commands.GET_USERS) {
    const data = users.filter((user) => payload.userIds.includes(user.id));

    pub.publish(
      RESPONSE_CHANNEL,
      JSON.stringify({
        id,
        payload: data,
      } satisfies CommandResponse)
    );
  }
});

console.log("Data server started!!");
