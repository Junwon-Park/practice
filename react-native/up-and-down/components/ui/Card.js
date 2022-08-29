import { StyleSheet, View } from "react-native";

import Colors from "../../constants/colors";

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    // <View>에 적용할 스타일이고 <View>는 기본적으로 Flexbox이다.
    justifyContent: "center",
    alignItems: "center", // RN에서 Flexbox의 alignItems의 기본 값은 Column이다.
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    // elevation 속성은 Android 전용 Shadow 효과를 주는 속성이다.
    elevation: 4,
    // 아래 shadow 속성들은 iOS 전용 Shadow 효과를 주는 속성들이다.
    shadowColor: "black", // 그림자 색상
    shadowOffset: { width: 0, heihgt: 2 }, // 그림자 사이즈
    shadowRadius: 6, // 그림자 모서리
    shadowOpacity: 0.25, // 그림자 투명도(그림자 진한 정도)
  },
});
