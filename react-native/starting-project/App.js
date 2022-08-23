import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Your course goal!" />
        <Button title="Add Goal" />
        {/* Button 컴포넌트에는 style 속성이 없기 때문에 직접 스타일을 지정할 수 없다. */}
      </View>
      <View style={styles.goalContainer}>
        <Text>List of goal...</Text>
      </View>
    </View>
  );
}
//
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // 컨테이너인 <View> 컴포넌트는 기본적으로 자식 컴포넌트, 즉 내부에 존재하는 컨텐츠 크기 만큼의 사이즈를 갖게 되는데,
    // 컨테이너에 이 속성을 주지 않았을 때, 자식 컴포넌트들의 사이즈 보다 작았기 때문에 화면에 이상하게 보인 것이다.
    // 컨테이너 컴포넌트는 한 컴포넌트의 최상위 컴포넌트로 형제 컴포넌트도 존재하지 않고 부모 컴포넌트도 없기 때문에 단 하나만 존재한다.
    // 그래서 flex: 1로 지정해서 Main axis의 화면 전체를 차지하여 자식 컴포넌트가 정상적으로 배치되도록 했다.
    padding: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    // flex 속성은 같은 부모 아래 존재하는 형제 컴포넌트 끼리의 비율을 지정한다.
    // 현재 이 속성으로 공간의 비율을 공유하는 형제 컴포넌트는 하나이며 해당 컴포넌트에 flex: 3이 지정되어 있기 때문에
    // 이 컴포넌트는 총 합 4 중에 1의 비율(1/5)을 차지하게 된다.
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // alignItems의 값을 지정하지 않으면 기본 값을 'stretch'가 적용된다.
    // 그래서 alignItems의 값을 'center'로 하지 않았을 때, 버튼의 height가 세로로 부모의 height 만큼 늘어나 버튼의 상단에 붙어 있던 것이다.
    // alignItems에 'center'를 지정해서 버튼이 부모의 height 만큼 늘어나지 않고 가운데 정렬 되도록 했다.
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  goalContainer: {
    flex: 4,
    // flex 속성은 같은 부모 아래 존재하는 형제 컴포넌트 끼리의 비율을 지정한다.
    // 이 컴포넌트는 총 합 4 중에 3의 비율(4/5)을 차지하게 된다.
  },
});
