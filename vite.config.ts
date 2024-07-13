import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@pages': path.join(__dirname, './src/pages'),
            '@lib': path.join(__dirname, './src/lib'),
            '@components': path.join(__dirname, './src/components'),
        },
    },
})
