import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// expo에서 제공하는 vector-icons 모듈의 Ionicons라는 Icon set를 불러온 것이다.

// Components
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/InstructionText";
import Card from "../components/ui/Card";
import GuessLogItem from "../components/game/GuessLogItem";

// Until function
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
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) onGameOver(guessRounds.length);
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

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
    setGuessRounds((prevGuessRounds) => [...prevGuessRounds, newRndNumber]);
  };

  const guessRoundsLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          {/* 커스텀 컴포넌트인 InstructionText의 Props로 style을 전달한 것이다.(Props이기 떄문에 style이라는 이름은 다른 이름으로 전달할 수 있다.) */}
          Higher or lower?
        </InstructionText>
        <View style={styles.primaryButtonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </PrimaryButton>
        </View>
      </Card>
      {/* {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
          ))} */}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(guessRound) => (
            <GuessLogItem
              roundNumber={guessRoundsLength - guessRound.index}
              guess={guessRound.item}
            />
          )}
          keyExtractor={(item) => item}
        />
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
  },
  instructionText: {
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
