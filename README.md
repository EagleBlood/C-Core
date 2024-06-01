# Central - Core

<p align="center">
  <img src="./img/LogoLight.png" alt="Logo" width="30%" height="30%">
</p>

React application made with TypeScript utilizing [Vite](https://vitejs.dev) build tool. A web app designed for home needs, featuring a user-friendly dashboard that allows device data monitoring and user managment. Powered by a custom Node.js server.

# Getting Started

>**Note**: Make sure you have [Node.js](https://nodejs.org/en) and either [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager installed on your machine before proceeding.

## Step 1: Instalation:

1. **Clone the repository to your local machine:**
```bash
git clone https://github.com/EagleBlood/C-Core.git
```

2. **Navigate to the project directory:**
```bash
cd C-Core
```
> [!IMPORTANT]
> The `api` folder within the main directory contains the backend server, which is essential for the dashboard's functionality.

3. **Installing dependencies:**
There are two sets of dependencies to manage for this project:
- **`/C-Core` Dependencies:** Navigate to the `/C-Core` directory and install dependencies using your preferred package manager.
- **`/C-Core/api` Dependencies:** Move to the `/C-Core/api` directory and install its separate dependencies using the same package manager you used for the core project.

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

## Step 2: Start your Application

Once the installation is complete, you can start the dashboard:

- **Frontend:** In the main project directory (`/C-Core`), to initiate the development server for the user interface, run `npm run dev`
- **Backend:** Navigate to the api subfolder (`/C-Core/api`) and to start the Node.js server handling backend functionality, run `npm run watch`

```bash
# For /C-Core
npm run dev

# For /C-Core/ap
npm run watch
```

# Functionality

Uppon starting the app, user will be 
