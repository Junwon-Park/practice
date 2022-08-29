import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Components
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";

// Constants
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true);

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };

  const gameOverHandler = () => {
    setGameIsOver(true);
  };

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  // 컴포넌트를 하드 코딩으로 넣지 않고 변수를 사용해서 다른 컴포넌트로 변경할 수 있도록 하기 위한 변수(헬퍼 변수라고 부른다.)
  // 유효성 검증이 완료된 숫자를 자식 컴포넌트인 StartGameScreen에서 받아오기 위해 pickedNumberHandler 함수를 Props로 전달

  // userNumber가 Truthy 값이면 screen에 GameScreen 컴포넌트를 재할당 한다.
  // 이미 StartGameScreen에서 검증이 끝난 숫자가 들어오기 때문에 숫자가 들어오면 스크린을 변경해줘도 된다.
  if (userNumber)
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );

  if (gameIsOver && userNumber) screen = <GameOverScreen />;

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      {/* 반드시 color 속성으로 사용될 색상을 지정해주어야 하고 값은 배열 형태로 주어야 한다. */}
      {/* 그리고 배열의 색상에대한 값은 반드시 두 개 이상이어야 한다. */}
      <ImageBackground
        source={require("./assets/images/dices.jpg")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
