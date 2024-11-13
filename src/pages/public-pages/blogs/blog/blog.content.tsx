import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { Box } from "@chakra-ui/react";
import React from "react";
import { IBlog } from "../blogs.interface";

function BlogContent({ blog }: { blog: IBlog }) {
    const editor = useCreateBlockNote({ initialContent: JSON.parse(blog.content) });

    return (
        <Box
            sx={{
                ".bn-editor": {
                    paddingInline: "0px !important",
                    backgroundColor: "transparent !important",
                    minHeight: "auto !important",
                    ".bn-block-content[data-content-type=video], .bn-block-content[data-content-type=image]": {
                        "*": { width: "100%" },
                    },
                },
            }}
        >
            <BlockNoteView editor={editor} editable={false} />
        </Box>
    );
}

export default BlogContent;
