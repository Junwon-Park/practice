import { StyleSheet, View, Text, Pressable } from "react-native";
// Pressable 컴포넌트 추가

const GoalItem = ({ text, deleteGoalHandler, id }) => {
  return (
    <Pressable onPress={deleteGoalHandler.bind(this, id)}>
      {/* Pressable 컴포넌트는 내부에 배치된 요소를 화면에서 누르면 발생하는 onPress 이벤트를 등록할 수 있게 해주는 컴포넌트이다. */}
      {/* 이 컴포넌트를 사용하면 Button 컴포넌트가 아니어도 onPress 속성을 사용해서 내부에 배치된 속성에 대해서 Click 이벤트를 등록할 수 있다. */}
      {/* deleteGoalHandler 함수의 인자로 Props로 받은 id를 전달해야 하는데, onPress 속성은 Item의 id를 반환하지 않기 떄문에 새로운 함수를 선언해서 id를 deleteGoalHandler 함수의 인자로 전달할 수도 있지만, */}
      {/* onPress에 지정된 함수에 bind() 메서드를 사용해서 Props로 받은 id를 onPress에 등록된 함수가 호출될 때 인자로 바로 전달할 수 있다. 이렇게 하면 이벤트 발생 시 호출된 이벤트 헨들러 함수의 인자로 id 전달 */}
      <View style={styles.goalItem}>
        <Text style={styles.goalItem}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
    color: "white",
  },
});
