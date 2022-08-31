import { StyleSheet, Text } from "react-native";

import Colors from "../../constants/colors";

const instructionText = ({ children, style }) => {
  // 덮어쓰고 싶은 다른 컴포넌트의 style을 Props로 받아 적용할 수 있고, style 속성의 값으로 배열을 대입하고 여러 스타일을 지정할 수 있다.
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

export default instructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
