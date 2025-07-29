import "@blocknote/core/fonts/inter.css";
import { BlockNoteViewRaw as BlockNoteView } from "@blocknote/react";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { Box } from "@chakra-ui/react";
import React from "react";
import { parseBlocknoteTexteditorContent } from "utils/helpers/blocknoteUtils";
import { IBlogDetail } from "../blogs.interface";

function BlogContent({ blog }: { blog: IBlogDetail }) {
  const parsedContent = parseBlocknoteTexteditorContent(blog.content);
  const editor = useCreateBlockNote({
    initialContent: parsedContent?.length ? parsedContent : undefined,
  });

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
      <BlockNoteView
        editor={editor}
        editable={false}
        theme={{
          colors: {
            editor: {
              text: "#fff",
              background: "transparent",
            },
          },
        }}
      />
    </Box>
  );
}

export default BlogContent;