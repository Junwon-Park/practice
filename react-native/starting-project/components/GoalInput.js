import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Modal,
  Image,
} from "react-native";

const GoalInput = ({ addGoalHandler, modalIsVisible, endAddGoalHandler }) => {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  const goalInputHandler = (enteredText) => {
    // JSX의 TextInput의 onChangeText가 입력한 값을 인자로 넘겨준다.
    // 파라미터의 이름은 당연히 자유롭게 지을 수 있다.
    setEnteredGoalText(enteredText);
  };

  const liftUpGoalText = () => {
    // App 컴포넌트에 선언된 버튼 이벤트 핸들러 함수를 호출해 해당 함수의 인자로 State를 전달해서 부모 컴포넌트의 이벤트 핸들러 함수로 끌어올려주는 상태 끌어올리기 함수 대입
    if (enteredGoalText !== "") addGoalHandler(enteredGoalText);
    // 사용자가 아무 것도 입력하지 않았을 때는 이벤트 핸들러 함수를 호출하지 않도록 예외처리(값을 입력하지 않으면 item이 생성되지 않는다.)
    // 이제 버튼을 누르면 상태 끌어올리기 함수가 호출되고 내부의 이벤트 핸들러 함수의 인자로 State를 전달하여 호출한다.
    setEnteredGoalText("");
    // 버튼을 클릭하면 인풋창의 텍스트가 초기화 되도록 상태 갱신 함수에 빈 문자열 줘서 호출
    // 상태 갱신 함수가 호출되면 React의 State 관리자 부분에 해당 State를 갱신하도록 요청하게 되고 State 관리자의 State가 갱신되면 해당 State가 선언된 컴포넌트를 재호출하여 새로 렌더링 한다.
    // 아래 JSX 구문을 렌더링하기 전에 여기서의 작업이 먼저 이루어지기 때문에 아래 TextInput 컴포넌트의 value 속성에 대입된 상태는 이미 빈 문자열인 상태이다.
    // 즉, 버튼을 누르면 enteredGoalText의 상태가 빈 문자열로 갱신되면서 해당 컴포넌트가 다시 렌더링되고 아래 JSX 구문은 State가 이미 갱신된 이후에 이루어지므로 아래 JSX 구문의 TextInput의 value 속성에는 빈 문자열이 대입된다.
  };

  return (
    <Modal visible={modalIsVisible} animationType="fade">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/goalImage.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        {/* 해당 인풋 컴포넌트에서 발생하는 입력 이벤트는 입력된 값을 지정한 함수의 인자로 전달한다. */}
        {/* 버튼이 눌린 후에는 위 liftUpGoalText 함수의 setEnteredGoalText 갱신 함수에 의해서 빈 문자열이 대입된다. */}
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={liftUpGoalText} color="#b180f0" />
            {/* 위에 선언된 상태 끌어올리기 함수 대입 */}
          </View>
          <View style={styles.button}>
            <Button
              title="Cancel"
              onPress={endAddGoalHandler}
              color="#f31282"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    // flex 속성은 같은 부모 아래 존재하는 형제 컴포넌트 끼리의 비율을 지정한다.
    // 현재 이 속성으로 공간의 비율을 공유하는 형제 컴포넌트는 하나이며 해당 컴포넌트에 flex: 3이 지정되어 있기 때문에
    // 이 컴포넌트는 총 합 4 중에 1의 비율(1/5)을 차지하게 된다.
    justifyContent: "center",
    alignItems: "center",
    // alignItems의 값을 지정하지 않으면 기본 값을 'stretch'가 적용된다.
    // 그래서 alignItems의 값을 'center'로 하지 않았을 때, 버튼의 height가 세로로 부모의 height 만큼 늘어나 버튼의 상단에 붙어 있던 것이다.
    // alignItems에 'center'를 지정해서 버튼이 부모의 height 만큼 늘어나지 않고 가운데 정렬 되도록 했다.
    padding: 16,
    backgroundColor: "#311b6b",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 16,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
