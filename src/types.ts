export enum Commands {
  GET_GUILDS,
  GET_USERS,
}

export interface Command {
  id: string;
  name: Commands;
  payload: any;
}

export interface CommandResponse {
  id: string;
  payload: any;
}

interface GetGuildsPayload {
  guildIds: string[];
}

interface GetUsersPayload {
  userIds: string[];
}

export type CommandsPayload<Command extends Commands> =
  Command extends Commands.GET_GUILDS
    ? GetGuildsPayload
    : Command extends Commands.GET_USERS
    ? GetUsersPayload
    : never;

export type ServerCommands =
  | {
      id: string;
      name: Commands.GET_GUILDS;
      payload: GetGuildsPayload;
    }
  | {
      id: string;
      name: Commands.GET_USERS;
      payload: GetUsersPayload;
    };
