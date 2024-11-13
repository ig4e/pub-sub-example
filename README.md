# Pub-Sub Example Project

This project demonstrates a Redis-based publish-subscribe (Pub/Sub) system implemented in TypeScript using the Bun runtime. It provides an HTTP API to fetch guild and user data by sending commands over Redis channels. The project uses a Pub/Sub design pattern to communicate between a data server and API server, making it a useful example for real-time or distributed applications.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [License](#license)

## Features

- **Command-Based Data Retrieval**: Retrieve guilds or users based on specific IDs.
- **Redis Pub/Sub Integration**: Uses Redis channels for decoupled communication between components.
- **Type-Safe Commands**: Strong typing ensures reliable data structures and minimizes runtime errors.
- **API Access with Hono**: An HTTP server allows easy access to the Redis Pub/Sub commands via RESTful endpoints.

## Architecture

The project has two main components:

1. **Data Server (`index.ts`)**: Listens to Redis commands on a specific channel, processes them, and publishes responses.
2. **API Server (`client.ts`)**: Provides an HTTP interface for clients, sending commands to the data server and returning responses to the caller.

### Workflow

- The API server (`client.ts`) receives HTTP requests for guild or user data.
- The API server then publishes a command to Redis on the `COMMANDS_CHANNEL`.
- The data server (`index.ts`) subscribes to `COMMANDS_CHANNEL`, processes the request, and sends back the data to `RESPONSE_CHANNEL`.
- The API server listens on `RESPONSE_CHANNEL`, retrieves the response, and returns it to the HTTP client.

## Project Structure

```plaintext
pub-sub-example/
├── src/
│   ├── client.ts            # API server that exposes HTTP endpoints
│   ├── constants.ts         # Defines constants for Redis channels and URLs
│   ├── dummy-data.ts        # Sample guild and user data
│   ├── index.ts             # Data server handling commands
│   ├── types.ts             # TypeScript types for commands and responses
│   └── utils.ts             # Utility functions for Redis Pub/Sub interactions
└── package.json             # Project dependencies and scripts
```

### Main Files

- **`client.ts`**: Defines `/api/guilds` and `/api/users` endpoints to fetch guild and user data.
- **`index.ts`**: Listens for commands and publishes data to response channels.
- **`utils.ts`**: Manages Redis Pub/Sub communication, including sending commands and handling responses.
- **`types.ts`**: Provides types for commands and responses, ensuring type-safe interactions.

## Getting Started

### Prerequisites

- **Bun**: Install [Bun](https://bun.sh/) for fast JavaScript execution.
- **Redis**: A running instance of Redis (configure with `REDIS_URL` if needed).

### Installation

1. Clone this repository.
2. Run the following command to install dependencies:
   ```bash
   bun install
   ```

### Running the Servers

1. **Start the Data Server**:
   ```bash
   bun run src/index.ts
   ```
   This command initializes the data server, which listens for commands on the `COMMANDS_CHANNEL`.

2. **Start the API Server**:
   ```bash
   bun run src/client.ts
   ```
   This command starts the HTTP server, exposing the endpoints for retrieving guild and user data.

### Available Endpoints

- **GET `/api/guilds`**: Retrieves guild data by sending a command to Redis.
- **GET `/api/users`**: Retrieves user data by sending a command to Redis.

Each endpoint sends a command to the `COMMANDS_CHANNEL` with the required payload and waits for a response from the data server.

## Example Usage

1. Start both the data and API servers.
2. Make an HTTP request to either endpoint:
   ```bash
   curl http://localhost:3000/api/guilds
   ```
   or
   ```bash
   curl http://localhost:3000/api/users
   ```

   The API server will respond with data from the data server.

## Dependencies

- **Hono**: Minimal HTTP framework for handling requests in `client.ts`.
- **redis**: Redis client for Pub/Sub functionality.
- **uuid**: Used for generating unique identifiers for requests.
- **Bun**: JavaScript runtime that efficiently handles project dependencies and execution.

## License

This project is open-source. Feel free to use, modify, and distribute it.
