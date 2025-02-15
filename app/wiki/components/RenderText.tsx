import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors, { campusColors } from '@/constants/colors';
import { Content } from '@/types/wikiTypes';
import { StyleSheet, View } from 'react-native';

const RenderText = ({ content }: { content: Content }) => {
  const { campus } = useCampus();
  const { theme } = useTheme();

  switch (content.type) {
    case 'empty':
      return <View style={{ height: 6 }} />;

    case 'subtitle':
      return <FontText fontWeight="700" style={styles.subtitle}>{content.body}</FontText>;

    case 'text':
      return <FontText style={styles.text}>{content.body}</FontText>;

    case 'strong':
      return <FontText style={[styles.text, { color: campusColors[campus!] }]}>{content.body}</FontText>;

    case 'questionAnswer':
      return (
        <View style={[styles.questionAnswerContainer, { backgroundColor: colors[theme].gray300 }]}>
          <View style={styles.questionAnswerRow}>
            <FontText style={[styles.question, { color: campusColors[campus!] }]}>Q. </FontText>
            <FontText style={[styles.qaText, { color: campusColors[campus!] }]}>{content.question}</FontText>
          </View>
          <View style={styles.questionAnswerRow}>
            <FontText style={styles.question}>A. </FontText>
            <FontText style={styles.qaText}>{content.answer}</FontText>
          </View>
        </View>
      );

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 17,
    marginTop: 16,
    marginBottom: 4
  },
  text: {
    fontSize: 15
  },
  questionAnswerContainer: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 4
  },
  questionAnswerRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  question: {
    fontSize: 15
  },
  qaText: {
    fontSize: 15,
  },
});

export default RenderText;
