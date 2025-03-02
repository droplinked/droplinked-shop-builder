const fs = require("fs");
const path = require("path");

function validateSvgFiles(rootDir) {
  const nonSvgFiles = [];
  const ignoredFiles = [];
  const ignoredExtensions = [".tsx", ".js"];

  function processDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);

    items.forEach((item) => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      const extension = path.extname(item);

      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (!item.endsWith(".svg")) {
        if (ignoredExtensions.includes(extension)) {
          ignoredFiles.push({
            path: fullPath,
            type: extension,
          });
        } else {
          nonSvgFiles.push({
            path: fullPath,
            type: extension || "no extension",
          });
        }
      }
    });
  }

  try {
    processDirectory(rootDir);

    if (ignoredFiles.length > 0) {
      console.log("\n⚠️  Ignored files (tsx/js):");
      ignoredFiles.forEach((file) => {
        console.log(`- ${file.path} (${file.type})`);
      });
    }

    if (nonSvgFiles.length === 0) {
      console.log("\n✅ All other files are SVG files");
      return true;
    } else {
      console.log("\n❌  Found non-SVG files:");
      nonSvgFiles.forEach((file) => {
        console.log(`- ${file.path} (${file.type})`);
      });
      return false;
    }
  } catch (error) {
    console.error("Error while validating files:", error);
    return false;
  }
}

// Run the validator
const iconsDir = path.resolve(__dirname);
validateSvgFiles(iconsDir);
