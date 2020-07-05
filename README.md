# ejam

ejam deployments client and server

# Code editor

It is strongly recommended to use VS Code with Prettier extension.

```bash
ext install esbenp.prettier-vscode
```

# Requirements

Node.js, npm

# Environment

Create .env file in the root directory using following template, fill user/password specific fields

```
  CLIENT_HOST=localhost
  CLIENT_PORT=80

  API_HOST=localhost
  API_PORT=81
  API_PROXY_PATH=/api

  CONNECTION_STRING=
```

# Start server

```bash
npm run server
```

# Start client

```bash
npm run client
```
