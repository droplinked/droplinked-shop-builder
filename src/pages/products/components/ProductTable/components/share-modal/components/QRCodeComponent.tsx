import { Center } from '@chakra-ui/react';
import React from 'react';
import QRCode from 'react-qr-code';

// تعریف ثابت‌های رنگ‌ها
const WHITE_COLOR = "#FFFFFF";
const BLACK_COLOR = "#000000";

// تعریف تایپ رنگ‌ها
type CircleColor = typeof WHITE_COLOR | typeof BLACK_COLOR;

interface QRCodeComponentProps {
  link: string;  // لینک محصول برای QR Code
  color: CircleColor;  // رنگ برای QR Code
}

// استفاده از forwardRef برای انتقال ref به عنصر اصلی
const QRCodeComponent = React.forwardRef<HTMLDivElement, QRCodeComponentProps>(
  ({ link, color }, ref) => {
    return (
      <Center
        ref={ref} // اضافه کردن ref به اینجا
        backgroundColor={color === WHITE_COLOR ? WHITE_COLOR : BLACK_COLOR}
        padding={2}
        borderRadius={8}
        marginY='16px'
      >
        <QRCode
          style={{ height: "148px", width: "148px" }}
          value={link}
          fgColor={color === WHITE_COLOR ? BLACK_COLOR : WHITE_COLOR} // تنظیم رنگ QR Code
          bgColor={color === WHITE_COLOR ? WHITE_COLOR : BLACK_COLOR} // تنظیم رنگ پس‌زمینه
        />
      </Center>
    );
  }
);

export default QRCodeComponent;
