import path from 'path'
import { defineConfig } from 'vite'
import bundleAnalyzer from 'vite-bundle-analyzer'
import svgr from 'vite-plugin-svgr'
import { reactRouter } from "@react-router/dev/vite"
import { cjsInterop } from "vite-plugin-cjs-interop"

// 👇 dev-time polyfills for process/global (via esbuild)
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
    worker: {
        format: "es"
    },
    plugins: [
        reactRouter(),
        cjsInterop({
            dependencies: ["react-to-pdf", "react-color", "react-dom/server", "lz-string", "react-dropzone"]
        }),
        svgr({
            svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
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
        chunkSizeWarningLimit: 1000,
        // 👇 ensure replacements also happen in production builds
        rollupOptions: {
            // nothing else needed `define` below handles globals in output
        }
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

    // ✅ Universal shims (dev + build)
    // - Replace bare identifiers at bundle time so code doesn’t crash at runtime.
    define: {
        // map `global` usages to the browser global
        global: 'globalThis',
        // keep packages that read from process.env from exploding
        'process.env': {},
    },

    // ✅ Extra help during dependency pre-bundling (dev server)
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis',
            },
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    process: true,  // provides a tiny `process` shim
                    buffer: true,   // (optional) if any deps use Buffer
                }),
            ],
        },
    },
})