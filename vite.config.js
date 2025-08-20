import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import bundleAnalyzer from 'vite-bundle-analyzer'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr({
            // Enable importing SVGs as React components
            svgrOptions: {
                exportType: 'named',
                ref: true,
                svgo: false,
                titleProp: true,
            },
            include: '**/*.svg',
        }),
        nodePolyfills({
            // Enable polyfills for specific globals and modules
            globals: {
                Buffer: true,
                global: true,
                process: true,
            },
            // Enable polyfills for Node.js built-in modules
            protocolImports: true,
            // Exclude constants to prevent conflicts with local constants directory
            exclude: ['constants'],
        }),
        process.env.ANALYZE && bundleAnalyzer({
            openAnalyzer: true,
            analyzerMode: 'static',
            reportFilename: 'bundle-report.html',
        }),
    ].filter(Boolean),

    resolve: {
        alias: {
            // Set up path aliases to match your current jsconfig.json baseUrl
            '@': path.resolve(__dirname, './src'),
            'src': path.resolve(__dirname, './src'),
            'assets': path.resolve(__dirname, './src/assets'),
            'components': path.resolve(__dirname, './src/components'),
            'pages': path.resolve(__dirname, './src/pages'),
            'utils': path.resolve(__dirname, './src/utils'),
            'hooks': path.resolve(__dirname, './src/hooks'),
            'services': path.resolve(__dirname, './src/services'),
            'lib': path.resolve(__dirname, './src/lib'),
            'stores': path.resolve(__dirname, './src/stores'),
            'constants': path.resolve(__dirname, './src/constants'),
            'types': path.resolve(__dirname, './src/types'),
            'layouts': path.resolve(__dirname, './src/layouts'),
            'routes': path.resolve(__dirname, './src/routes'),
            'locales': path.resolve(__dirname, './src/locales'),
            'context': path.resolve(__dirname, './src/context'),
            'hoc': path.resolve(__dirname, './src/hoc'),
            'data': path.resolve(__dirname, './src/data'),

            // Node.js polyfills for Web3 and blockchain functionality
            'stream': 'stream-browserify',
            'buffer': 'buffer',
            'crypto': 'crypto-browserify',
            'util': 'util',
            'process': 'process/browser',


        },
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },

    define: {
        // Define global constants
        global: 'globalThis',
    },

    optimizeDeps: {
        include: [
            'buffer',
            'process',
            'stream-browserify',
            'crypto-browserify',
            'util',
        ],
        exclude: ['fs']
    },

    server: {
        port: 3000,
        open: true,
        host: true,
    },

    build: {
        outDir: 'build',
        assetsDir: 'static',
        sourcemap: true,
        // Increase chunk size warning limit
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: {
                    // Split vendor chunks for better caching
                    'react-vendor': ['react', 'react-dom'],
                    'chakra-ui': ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
                    'utils': ['axios', 'moment', 'formik', 'yup'],
                },
            },
        },
    },

    // Include Excel and CSV files as assets
    assetsInclude: ['**/*.xlsx', '**/*.xls', '**/*.csv'],

    // CSS configuration
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "src/assets/style/index.css";`
            }
        }
    },
})
