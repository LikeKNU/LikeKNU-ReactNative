import { CustomTextProps } from '@/components/text/TextProps';
import { fontName } from '@/constants/Fonts';
import React from 'react';
import { Text } from 'react-native';

const FontText: React.FC<CustomTextProps> = ({ style, ...props }) => {
  const getFont = () => {
    switch (style?.fontWeight) {
      case '100':
        return fontName.thin;
      case '200':
        return fontName.extraLight;
      case '300':
        return fontName.light;
      case '400':
        return fontName.regular;
      case '500':
        return fontName.medium;
      case '600':
        return fontName.semiBold;
      case '700' || 'bold':
        return fontName.bold;
      case '800':
        return fontName.extraBold;
      case '900':
        return fontName.black;
      default:
        return fontName.regular;
    }
  };
  console.log(getFont());

  return (
    <Text style={[{ fontFamily: getFont() }, style]} {...props} />
  );
};

export default FontText;
