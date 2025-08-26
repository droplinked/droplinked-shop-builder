import { BASE_URL } from "utils/app/variable";

export async function getPublicBlogsServerSide(params: { page?: number; limit?: number } = {}) {
    const { page = 1, limit = 9 } = params;

    try {
        // Use the same endpoint as the client-side service
        const url = `${BASE_URL}/blogs/public/admin?page=${page}&limit=${limit}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data?.data || { data: [], totalDocuments: 0 };
    } catch (error) {
        console.error('Failed to fetch blogs on server:', error);
        return { data: [], totalDocuments: 0 };
    }
}

export async function getPublicBlogBySlugServerSide(slug: string) {
    try {
        // Use the same endpoint as the client-side service
        const url = `${BASE_URL}/blogs/public/admin/${slug}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data || null;
    } catch (error) {
        console.error('Failed to fetch blog by slug on server:', error);
        return null;
    }
}
