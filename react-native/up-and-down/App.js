import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Components
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
  return (
    <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.rootScreen}>
      {/* 반드시 color 속성으로 사용될 색상을 지정해주어야 하고 값은 배열 형태로 주어야 한다. */}
      {/* 그리고 배열의 색상에대한 값은 반드시 두 개 이상이어야 한다. */}
      <StartGameScreen />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
