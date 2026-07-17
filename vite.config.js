import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config - just uses the standard React plugin
export default defineConfig({
  plugins: [react()],
});
