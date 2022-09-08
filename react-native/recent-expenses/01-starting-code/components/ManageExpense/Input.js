import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Input = ({ label, style, textInputConfig }) => {
  const inputStyle = [styles.input];

  if (textInputConfig && textInputConfig.multiline)
    // textInputConfig와 textInputConfig.multiline 모두 Truthy라면 아래 로직 실행
    inputStyle.push(styles.inputMultiline);

  return (
    <View style={[styles.inputContainer, style]}>
      {/* style Props가 넘어 왔으면 styles.inputContainer에 덮어쓰고 undefiend라면 styles.inputContainer만 적용된다. */}
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyle} {...textInputConfig} />
      {/* textInputConfig는 TextInput 내장 컴포넌트의 속성과 값을 키값 쌍으로 가진 객체이다.. */}
      {/* textInputConfig를 객체 구조분해 할당한 것이다. */}
      {/* textInputConfig를 Props로 넘길 때, {}로 묶어서 넘기면 된다. -> textInputConfig={{key:value, key:value}} */}
      {/* 이러면 Props가 몇 개든 상관 없이 동적으로  */}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100, // 최소 높이 100(높이가 100px 미만일 수 없다.)
    textAlignVertical: "top",
    // ? 공식 문서에 보면 TextInput의 multiline 속성을 사용(true)하는 경우 해당 TextInput의 스타일에 textAlignVertical 속성에 'top'을 지정하면 iOS, Android 두 플랫폼 모두 동일한 위치에서 작성되도록 일치시킬 수 있다고 나와있다.
  },
});
