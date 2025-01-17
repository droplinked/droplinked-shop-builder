export const downloadQRCode = (qrCodeContainerRef: React.RefObject<HTMLDivElement>, fileName: string = 'qrcode.png') => {
    const svgElement = qrCodeContainerRef.current?.querySelector('svg');
    if (!svgElement) return;
  
    const { width, height } = svgElement.getBoundingClientRect();
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
  
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      context?.drawImage(img, 0, 0, width, height);
      const pngDataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = pngDataUrl;
      link.download = fileName;
      link.click();
  
      URL.revokeObjectURL(url);
    };
  
    img.src = url;
  };
  