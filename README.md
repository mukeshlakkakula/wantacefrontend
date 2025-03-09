# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Project Details

- **Live Frontend URL:** [Wantace Frontend](https://wantacefrontend.vercel.app/)
- **Base API URL for Backend:** [Wantace Backend](https://wantacebackend.onrender.com/)
- **GitHub Repository (Frontend):** [wantacefrontend](https://github.com/mukeshlakkakula/wantacefrontend.git)
- **GitHub Repository (Backend):** [wantacebackend](https://github.com/mukeshlakkakula/wantacebackend.git)
- **Loom Video (project explaination):** [Loom Video](https://www.loom.com/share/b7c457a6bc6e42898073d0935c44d6af?sid=f438b2e4-86eb-40bc-87bb-a1ac5e77da62)

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enabling type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## How to Run the Project in VS Code

### Prerequisites

- Ensure you have **Node.js** installed (Recommended: v16+)
- Install **VS Code** and set up the necessary extensions (ESLint, Prettier, etc.)
- Install **Git** for cloning repositories

### Steps to Run Frontend

1. Clone the frontend repository:
   ```sh
   git clone https://github.com/mukeshlakkakula/wantacefrontend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd wantacefrontend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Steps to Run Backend

1. Clone the backend repository:
   ```sh
   git clone https://github.com/mukeshlakkakula/wantacebackend.git
   ```
2. Navigate to the backend directory:
   ```sh
   cd wantacebackend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and configure required environment variables.
5. Start the backend server:
   ```sh
   npm start
   ```
6. The backend will run on [http://localhost:5000](http://localhost:5000) by default.

### Additional Notes

- Make sure both frontend and backend are running simultaneously for full functionality.
