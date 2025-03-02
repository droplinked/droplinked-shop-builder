const fs = require("fs");
const path = require("path");

function flattenSvgDirectories(rootDir) {
  const items = fs.readdirSync(rootDir);

  items.forEach((item) => {
    const fullPath = path.join(rootDir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Check all subfolders in this directory
      const subItems = fs.readdirSync(fullPath);
      const subFolders = subItems.filter((subItem) => fs.statSync(path.join(fullPath, subItem)).isDirectory());

      subFolders.forEach((subFolder) => {
        const subFolderPath = path.join(fullPath, subFolder);
        const svgFiles = fs.readdirSync(subFolderPath).filter((file) => file.endsWith(".svg"));

        if (svgFiles.length > 0) {
          // Move SVG files to parent directory
          svgFiles.forEach((svgFile) => {
            const sourcePath = path.join(subFolderPath, svgFile);
            const targetPath = path.join(fullPath, svgFile);

            // If file with same name exists, add a suffix
            let finalTargetPath = targetPath;
            let counter = 1;
            while (fs.existsSync(finalTargetPath)) {
              const ext = path.extname(svgFile);
              const baseName = path.basename(svgFile, ext);
              finalTargetPath = path.join(fullPath, `${baseName}_${counter}${ext}`);
              counter++;
            }

            fs.renameSync(sourcePath, finalTargetPath);
            console.log(`Moved: ${svgFile} from ${subFolder} to ${path.basename(fullPath)} directory`);
          });

          // Remove the subfolder if it's empty
          if (fs.readdirSync(subFolderPath).length === 0) {
            fs.rmdirSync(subFolderPath);
            console.log(`Removed empty folder ${subFolder} from: ${path.basename(fullPath)}`);
          }
        }
      });
    }
  });

  console.log("\n✅ Finished moving SVG files from subfolders");
}

// Run the script
const iconsDir = path.resolve(__dirname);
flattenSvgDirectories(iconsDir);
