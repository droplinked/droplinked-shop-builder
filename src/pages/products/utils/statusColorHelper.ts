import { RecentCrawlerTasksResponse } from "services/crawler/interface";

/**
 * Returns the appropriate text color class based on the status of a crawler task.
 * @param status - The current status of the crawler task
 * @returns A string representing the CSS text color class
 * - "text.success" for completed tasks
 * - "text.link" for tasks in progress (pending, previews_ready, processing_preview, products_selected, crawling)
 * - "text.error" for tasks with errors
 * @example
 * ```typescript
 * const color = getStatusColor("completed"); // returns "text.success"
 * const color = getStatusColor("error"); // returns "text.error"
 * ```
 */
export const getStatusColor = (status: RecentCrawlerTasksResponse["status"]) => {
    switch (status) {
        case "completed":
            return "text.primary";
        case "recorded":
            return "text.primary";

        case "error":
            return "text.error";

        default:
            return "text.link";
    }
}