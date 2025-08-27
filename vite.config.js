import path from 'path'
import { defineConfig } from 'vite'
import bundleAnalyzer from 'vite-bundle-analyzer'
import svgr from 'vite-plugin-svgr'
import { reactRouter } from "@react-router/dev/vite";
import { cjsInterop } from "vite-plugin-cjs-interop";


// https://vitejs.dev/config/
export default defineConfig({
    worker: {
        format: "es"
    },
    plugins: [
        reactRouter(),
        cjsInterop({
            dependencies: ["react-to-pdf", "react-color", "react-dom/server", "lz-string"]
        }),
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

        },
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },

    ssr: {
        noExternal: ["gsap", "chakra-ui", "i18next", "droplinked-designer-configs"]
    },

    server: {
        port: 3000,
        open: true,
        host: true,
    },

    build: {
        outDir: 'build',
        assetsDir: 'static',
        sourcemap: false,
        // Increase chunk size warning limit
        chunkSizeWarningLimit: 1000,
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
