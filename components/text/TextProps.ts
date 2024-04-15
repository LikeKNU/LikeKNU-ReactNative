import { TextProps, TextStyle } from 'react-native';

export interface CustomTextProps extends TextProps {
  style?: TextStyle;
  // fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'bold';
}
