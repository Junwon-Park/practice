import { useState } from "react"; // useState는 react 라이브러리의 useState 객체를 그 대로 사용한다.
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
} from "react-native";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);

  const goalInputHandler = (enteredText) => {
    // JSX의 TextInput의 onChangeText가 입력한 값을 인자로 넘겨준다.
    // 파라미터의 이름은 당연히 자유롭게 지을 수 있다.
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      enteredGoalText,
    ]);
    // 상태 갱신 함수를 사용해서 State를 갱신할 때, 갱신할 값이 기존의 State에 의존한다면,
    // 즉 기존의 State는 그 대로 유지하면서 갱신하는 경우라면 위 처럼 익명 함수로 기존 함수를 전달하는 방식으로 진행하는 것이 올바른 방법이다.
    // 상태 갱신 함수의 인자로 익명함수를 지정하면 익명함수의 인자로 해당 갱신함수의 현재 State를 받을 수 있는데, 그 것을 이용하는 것이고 이 방법이 추천되는 방법이다.
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
        />
        {/* 해당 인풋 컴포넌트에서 발생하는 입력 이벤트는 입력된 값을 지정한 함수의 인자로 전달한다. */}
        <Button title="Add Goal" onPress={addGoalHandler} />
        {/* RN에서 Button 컴포넌트의 클릭 이벤트는 onPress라는 속성에 지정한다. */}
      </View>
      <View style={styles.goalContainer}>
        {/* ScrollView를 사용할 때에는 <View> 컨테이너 컴포넌트로 감싸서 스크롤이 적용될 부분의 공간을 만들어 줘야 한다. */}
        {/* ScrollView는 부모 컴포넌트에 맞게 적용된다. */}
        <ScrollView>
          {courseGoals.map((goal, idx) => {
            return (
              <View style={styles.goalItem} key={idx}>
                {/* iOS에서는 Text 요소에 직접 둥근 모서리 속성을 적용할 수 없기 때문에 <View> 컴포넌트로 감싸서 해당 컴포넌트에 해당 속성을 적용했다. */}
                {/* <View> 컴포넌트에 해당 속성을 적용하면 양쪽 Native 플랫폼에 모두 잘 적용된다. */}
                <Text style={styles.goalItem}>{goal}</Text>
                {/* RN에서는 CSS 처럼 부모의 스타일 속성이 자식에게 상속되지 않기 때문에 <View> 컴포넌트에 지정한 속성이 <Text> 컴포넌트에 적용되지 않아 텍스트 색상인 color 속성이 적용되지 않았다. */}
                {/* 그래서 동일한 스타일을 적용해주었다.. */}
              </View>
            );
          })}
        </ScrollView>
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
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
    color: "white",
  },
});
