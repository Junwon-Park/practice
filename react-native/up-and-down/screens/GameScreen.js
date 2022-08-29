import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";

// Components
import Title from "../components/ui/title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

// Unit function
const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) return generateRandomBetween(min, max, exclude);
  else return rndNum;
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) onGameOver();
  }, [currentGuess, userNumber, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", sytle: "Cancel" },
      ]);

      return;
    }

    // 추측한 값이 사용자가 입력한 값 보다 작을 때.
    if (direction === "lower") maxBoundary = currentGuess;
    // 현재 추측 값 보다 작기 maxBoundary에 현재 추측 값을 할당하고 generateRandomBetween에 현재 추측 값이 할당된 maxBoundary를 상한선 인자로 주면 하한선 값 부터 상한선 값 까지의 랜덤 값을 반환한다.
    // 그런데 여기에서 제외 숫자를 현재 추측 값을 주면 하한선 값과 상한선 값 사이의 랜던한 값 중 현재 추측 값을 제외하면 유효한 값 만을 반환하게 된다.
    // /
    // 추측한 값이 사용자가 입력한 값 보다 클 때.
    else minBoundary = currentGuess + 1;

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    setCurrentGuess(newRndNumber);
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View style={styles.primaryButtonContainer}>
          <PrimaryButton
            onPress={nextGuessHandler.bind(this, "greater")}
            style={styles.primaryButton}
          >
            +
          </PrimaryButton>
          <PrimaryButton
            onPress={nextGuessHandler.bind(this, "lower")}
            style={styles.primaryButton}
          >
            -
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  primaryButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  primaryButton: {
    flex: 1,
  },
});
