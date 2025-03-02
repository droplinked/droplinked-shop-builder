const fs = require("fs");
const path = require("path");

// Helper function to convert size to suffix
function getSizeSuffix(size) {
  switch (size) {
    case "16":
      return "Sm";
    case "20":
      return "Md";
    case "24":
      return "Lg";
    default:
      return "";
  }
}

// Helper function to convert kebab/snake case to pascal case
function toPascalCase(str) {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

// Helper function to create React component from SVG content
function createReactComponent(svgContent, componentName) {
  // Clean up SVG content
  const cleanedSvg = svgContent
    .replace(/<\?xml.*?\?>/, "")
    .replace(/<!--.*?-->/g, "")
    .replace(/\n\s+/g, " ")
    .replace(/stroke-width/g, "strokeWidth")
    .replace(/stroke-linecap/g, "strokeLinecap")
    .replace(/stroke-linejoin/g, "strokeLinejoin");

  return `// Generated from SVG to React Component
import React from "react";

export const ${componentName} = (props) => (
    ${cleanedSvg}
);
`;
}

// Main function to process SVG files
function processIcons(rootDir) {
  // Read all directories recursively
  function processDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);

    items.forEach((item) => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (item.endsWith(".svg")) {
        // Process SVG file
        const folderName = path.basename(path.dirname(fullPath));
        const svgContent = fs.readFileSync(fullPath, "utf8");

        // Extract size from filename (e.g., "Size=16_0")
        const sizeMatch = item.match(/Size=(\d+)/);
        if (sizeMatch) {
          const size = sizeMatch[1];
          const suffix = getSizeSuffix(size);
          const componentName = `${toPascalCase(folderName)}${suffix}`;

          // Create React component file
          const componentContent = createReactComponent(svgContent, componentName);
          const componentPath = path.join(path.dirname(fullPath), `${componentName}.tsx`);

          fs.writeFileSync(componentPath, componentContent);

          // Delete original SVG file
          fs.unlinkSync(fullPath);

          console.log(`Converted ${item} to ${componentName}.tsx`);
        }
      }
    });
  }

  processDirectory(rootDir);
}

// Run the script
const iconsDir = path.resolve(__dirname);
processIcons(iconsDir);
