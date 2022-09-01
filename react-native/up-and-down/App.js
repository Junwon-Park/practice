import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
// expo에서 제공하는 expo-font 라이브러리의 useFonts 훅을 불러온다.
import AppLoading from "expo-app-loading";
// 앱이 로딩 중일 때, 스플래시 화면을 연장해주는 라이브러리

// Components
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";

// Constants
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  // useFonts Hooks
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
  // 불러온 useFonts 훅의 인자로 객체 형태로 사용할 Font의 이름('키') 값은 require() 메서드의 인자로 파일의 상대 경로를 넣는다.
  // 그러면 앱을 실행했을 때, App 컴포넌트가 가장 먼저 실행되면서 useFonts의 각 Font들도 로딩된다.
  // useState 훅 처럼 []에 변수를 넣어서 Font가 로딩 중인지 여부를 boolean 값으로 반환한다.
  // 이렇게 등록한 Font는 로딩이 완료되고 나면 모든 컴포넌트에서 사용이 가능하다.

  // fontsLoaded가 Falsy 값이라면 AppLoading 컴포넌트를 반환한다.(스플래시 화면 반환)
  // useFonts의 Font가 로딩 중일 때, AppLoading을 반환(스플래시 화면 반환)하고 로딩이 완료되면 App 컴포넌트가 재실행된다.
  if (!fontsLoaded) return <AppLoading />;

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  };

  const startNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
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

  if (gameIsOver && userNumber)
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );

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
