import { TextInput, View, StyleSheet } from "react-native";

// Components
import PrimaryButton from "../components/PrimaryButton";

const StartGameScreen = () => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputNumber}
        maxLength={2}
        keyboardType="number-pad"
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton>Confirm</PrimaryButton>
        </View>
      </View>
      {/* 두 버튼들을 View 컴포넌트로 먼저 감싼 이유는 View 컴포넌트는 기본적으로 Flexbox를 적용받고 있고 flexDirction은 기본 값으로 'column'이기 때문에 flexDirection: 'row'을 적용해서 두 버튼들을 수평으로 나란히 위치시키기 위해서이다. */}
      {/* 그리고 두 버튼들을 View 컴포넌트로 각각 감싼 이유는 Flexbox는 보통 View 컴포넌트로 감싼 혹은 View 컴포넌트를 중첩하여 레이아웃을 완성하기 때문이다. */}
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: "#4e0329",
    borderRadius: 8,
    // elevation 속성은 Android 전용 Shadow 효과를 주는 속성이다.
    elevation: 4,
    // 아래 shadow 속성들은 iOS 전용 Shadow 효과를 주는 속성들이다.
    shadowColor: "black", // 그림자 색상
    shadowOffset: { width: 0, heihgt: 2 }, // 그림자 사이즈
    shadowRadius: 6, // 그림자 모서리
    shadowOpacity: 0.25, // 그림자 투명도(그림자 진한 정도)
  },
  inputNumber: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 2,
    color: "#ddb52f",
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
