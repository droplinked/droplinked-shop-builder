const fs = require("fs");
const path = require("path");

function flattenSvgDirectories(rootDir) {
  function processDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);

    items.forEach((item) => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Process subdirectory first
        processDirectory(fullPath);

        // After processing, check if there are any SVG files
        const subDirItems = fs.readdirSync(fullPath);
        const svgFiles = subDirItems.filter((file) => file.endsWith(".svg"));

        // Move SVG files to parent directory
        svgFiles.forEach((svgFile) => {
          const sourcePath = path.join(fullPath, svgFile);
          const targetPath = path.join(dirPath, svgFile);

          // If file with same name exists, add a suffix
          let finalTargetPath = targetPath;
          let counter = 1;
          while (fs.existsSync(finalTargetPath)) {
            const ext = path.extname(svgFile);
            const baseName = path.basename(svgFile, ext);
            finalTargetPath = path.join(dirPath, `${baseName}_${counter}${ext}`);
            counter++;
          }

          fs.renameSync(sourcePath, finalTargetPath);
          console.log(`Moved: ${svgFile} to parent directory`);
        });

        // Check if directory is empty after moving files
        const remainingFiles = fs.readdirSync(fullPath);
        if (remainingFiles.length === 0) {
          fs.rmdirSync(fullPath);
          console.log(`Removed empty directory: ${fullPath}`);
        }
      }
    });
  }

  try {
    processDirectory(rootDir);
    console.log("\n✅ Finished flattening SVG directories");
  } catch (error) {
    console.error("Error while processing directories:", error);
  }
}

// Run the script
const iconsDir = path.resolve(__dirname);
flattenSvgDirectories(iconsDir);
