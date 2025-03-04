const fs = require("fs");
const path = require("path");

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
import React, { SVGProps } from "react";

export const ${componentName} = (props:SVGProps<SVGSVGElement>) => (
    ${cleanedSvg}
);
`;
}

// New recursive function to process directories
function processDirectory(dir) {
  try {
    console.log(`Scanning directory: ${dir}`);
    const items = fs.readdirSync(dir);
    console.log(`Found ${items.length} items in directory`);

    let convertedCount = 0;
    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Recursively process subdirectories
        convertedCount += processDirectory(fullPath);
      } else if (item.endsWith(".svg")) {
        console.log(`Processing SVG file: ${fullPath}`);

        const parentFolderName = path.basename(dir);
        const baseName = path.basename(item, ".svg");
        // Combine folder name with file name for the component name
        const componentName = `${toPascalCase(parentFolderName)}${toPascalCase(baseName)}`;

        const svgContent = fs.readFileSync(fullPath, "utf8");
        const componentContent = createReactComponent(svgContent, componentName);
        const componentPath = path.join(dir, `${componentName}.tsx`);

        fs.writeFileSync(componentPath, componentContent);
        fs.unlinkSync(fullPath);

        console.log(`Successfully converted ${item} to ${componentName}.tsx`);
        convertedCount++;
      }
    });

    return convertedCount;
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error);
    return 0;
  }
}

// Run the script with the absolute path
const iconsDir = path.resolve(__dirname);
console.log("Script starting...");
console.log("Working directory:", iconsDir);
const totalConverted = processDirectory(iconsDir);
console.log(`Conversion complete. Converted ${totalConverted} files.`);
