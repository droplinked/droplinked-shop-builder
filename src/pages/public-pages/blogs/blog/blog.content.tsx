import { useCreateBlockNote } from "@blocknote/react";
import { IBlog } from "../blogs.interface";
import AppTypography from "components/common/typography/AppTypography";
import React, { useEffect, useState } from "react";

function BlogContent({ blog }: { blog: IBlog }) {
    const [html, setHTML] = useState<string>("");
    const editor = useCreateBlockNote({ initialContent: JSON.parse(blog.content) });

    useEffect(() => {
        (async () => {
            const html = await editor.blocksToHTMLLossy();
            setHTML(html);
        })();
    }, []);

    return <AppTypography color={"white"} dangerouslySetInnerHTML={{ __html: html }}></AppTypography>;
}

export default BlogContent;
