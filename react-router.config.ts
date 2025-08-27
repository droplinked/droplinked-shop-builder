import type { Config } from "@react-router/dev/config";

export default {
    appDirectory: "src",
    ssr: false,
    async prerender(args) {
        return ["/"]
    },
} satisfies Config;
