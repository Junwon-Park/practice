import { View, Text, Pressable, StyleSheet } from "react-native";

const PrimaryButton = ({ children, onPress }) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.buttonPressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: "#640233" }}
      >
        {/* Android에서는 버튼을 눌렀을 때, android_ripple 속성으로 물결 효과를 줬지만 iOS는 여기에 바로 속성으로 물결 효과를 줄 수 없기 때문에 스타일 객체를 추가해서 눌렀을 때, 투명도가 변하도록 구현한 것이다 */}
        {/* 일단 style 속성의 값으로 배열을 줄 수 있는데, 배열의 스타일 속성이 모두 적용된다. 스타일을 여러 개 줄 때, 사용할 수 있다. */}
        {/*//! Pessable 컴포넌트의 style 속성에는 익명함수를 지정할 수 있고 해당 버튼을 눌렀을 때, 그 익명함수의 인자로 버튼이 눌렸는 지에 대한 결과가 Boolean 값으로 전달된다. 눌렸다면 true, 눌리지 않은 기본의 상태라면 false이다. */}
        {/*//! 전달되는 인자는 객체의 형태로 달되고 해당 Boolean 값은 인자로 전달된 객체의 pressed라는 속성의 값으로 전달된다. 위에서는 해당 객체를 구조분해 할당 해서 pressed 속성만 추출한 것이다. */}
        {/* iOS에는 android_ripple 속성이 적용되지 않기 때문에 투명도로 비슷한 효과를 준 것이다. 물론 Android에도 동일하게 적용되며 다만 Android에는 android_ripple 속성에 의해서 물결 효과도 함께 적용된다. */}
        {/* 그래서 버튼이 눌렸을 때, 평소 버튼의 스타일인 buttonInnerContainer와 불투명도 스타일 속성이 적용된 buttonPressed을 동시에 적용하고, 버튼이 눌리지 않은 평소에는 buttonInnerContainer만 적용한 상태로 보이도록 구현한 것이다. */}
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden", // 물결 효과가 컨테이너를 넘어가는 경우 넘어가는 부분을 안보이게 해주는 속성
  },
  buttonInnerContainer: {
    backgroundColor: "#72063c",
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    elevation: 4, // Android 전용 Shadow 효과
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  buttonPressed: {
    opacity: 0.75, // opacity는 불투명도이기 때문에 0.75는 75% 불투명하드는 의미이기 때문에 25% 투명하다는 의미이다. 1이 100%이다.
  },
});
