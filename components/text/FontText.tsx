import { fontName } from '@/constants/fonts';
import React, { FunctionComponent } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

interface CustomTextProps extends TextProps {
  style?: TextStyle;
}

const FontText: FunctionComponent<CustomTextProps> = ({ style, ...props }) => {
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

  return (
    <Text style={[{ fontFamily: getFont() }, style]} {...props} />
  );
};

export default FontText;
