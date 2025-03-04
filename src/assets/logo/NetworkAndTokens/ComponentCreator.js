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

// Main function to process SVG files
function processIcons(rootDir) {
  const items = fs.readdirSync(rootDir);

  items.forEach((item) => {
    if (item.endsWith(".svg")) {
      const fullPath = path.join(rootDir, item);
      const svgContent = fs.readFileSync(fullPath, "utf8");

      // Get component name based on file name
      const baseName = path.basename(item, ".svg");
      const componentName = `${baseName}Icon`;

      // Create React component file
      const componentContent = createReactComponent(svgContent, componentName);
      const componentPath = path.join(rootDir, `${componentName}.tsx`);

      fs.writeFileSync(componentPath, componentContent);

      // Delete original SVG file
      fs.unlinkSync(fullPath);

      console.log(`Converted ${item} to ${componentName}.tsx`);
    }
  });
}

// Run the script
const iconsDir = path.resolve(__dirname);
processIcons(iconsDir);
