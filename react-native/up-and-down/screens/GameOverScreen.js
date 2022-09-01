import { View, Text, Image, StyleSheet } from "react-native";
import Colors from "../constants/colors";

import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";

const GameOverScreen = ({ roundNumber, userNumber, onStartNewGame }) => {
  return (
    <View style={styles.rootContainer}>
      <Title>Game is over!!</Title>
      <View style={styles.imageContainer}>
        {/* 아래 이미지의 모서리를 둥글게 만들기 위한 View 컴포넌트 */}
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundNumber}</Text>{" "}
        rounds to guess the number{" "}
        <Text style={styles.highlight}>{userNumber}</Text>
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1, // root는 화면 전체 차지
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    // width와 heigth의 값을 동일하게 주고 borderRadius를 width 또는 height 값의 반을 주면 원이 된다.
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
