// Polyfill for browser globals used by dependencies
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock for the Crypto API
Object.defineProperty(global.self, "crypto", {
  value: {
    subtle: {},
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
  },
});

// Canvas mock
if (typeof window !== "undefined") {
  window.HTMLCanvasElement.prototype.getContext = () => {
    return {
      fillRect: function () {},
      clearRect: function () {},
      getImageData: function () {
        return {
          data: new Array(4),
        };
      },
      putImageData: function () {},
      createImageData: function () {
        return [];
      },
      setTransform: function () {},
      drawImage: function () {},
      save: function () {},
      fillText: function () {},
      restore: function () {},
      beginPath: function () {},
      moveTo: function () {},
      lineTo: function () {},
      closePath: function () {},
      stroke: function () {},
      translate: function () {},
      scale: function () {},
      rotate: function () {},
      arc: function () {},
      fill: function () {},
      measureText: function () {
        return { width: 0 };
      },
      transform: function () {},
      rect: function () {},
      clip: function () {},
    };
  };
}
