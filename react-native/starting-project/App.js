import { useState } from "react"; // useState는 react 라이브러리의 useState 객체를 그 대로 사용한다.
import { StyleSheet, View, Button, FlatList } from "react-native";

// Componenets
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    // 상태 갱신 함수를 사용해서 State를 갱신할 때, 갱신할 값이 기존의 State에 의존한다면,
    // 즉 기존의 State는 그 대로 유지하면서 갱신하는 경우라면 위 처럼 익명 함수로 기존 함수를 전달하는 방식으로 진행하는 것이 올바른 방법이다.
    // 상태 갱신 함수의 인자로 익명함수를 지정하면 익명함수의 인자로 해당 갱신함수의 현재 State를 받을 수 있는데, 그 것을 이용하는 것이고 이 방법이 추천되는 방법이다.
  };

  const deleteGoalHandler = (id) => {
    // 이 함수는 FlatList에 추가된 Item을 누르면 호출되는 함수로 눌린 Item을 삭제하는 기능이다.
    // 이 함수가 여기에 선언된 이유는 Item을 지우는 것이 courseGoals 상태의 해당 Item을 지우는 것이기 때문에 해당 상태가 존재하는 컴포넌트에 선언한 것이다.
    // 특정 요소를 제외해야 하기 때문에 각 item의 고유한 값인 id를 인자로 받도록 한다.
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((item) => item.id !== id);
      // 기존의 상태를 활용하여 상태를 갱신하기 위해 상태 갱신 함수가 반환하는 기존 상태를 사용한 상태 갱신
      // 기존의 상태에서 현재 함수의 인자로 전달된 id와 동일한 id를 가진 Item filter 함수로 제거
    });
  };

  return (
    <View style={styles.appContainer}>
      <GoalInput addGoalHandler={addGoalHandler} />
      {/* RN에서 Button 컴포넌트의 클릭 이벤트는 onPress라는 속성에 지정한다. */}
      <View style={styles.goalContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return (
              <GoalItem
                text={itemData.item.text}
                deleteGoalHandler={deleteGoalHandler}
                id={itemData.item.id}
              />
            );
          }}
          keyExtractor={(item, index) => item.id}
        />
        {/* <FlatList> 컴포넌트는 셀프 클로징 컴포넌트이다. */}
        {/* 컨텐츠 목록을 보여주고 스크롤 기능을 제공하는 컴포넌트이고 데이터는 배열 형태로 제공해야하며 배열의 타입은 객체 형태여야 한다. */}
        {/* key라는 키가 있다면 자동으로 인식하여 목록의 고유한 key로 사용하기 때문에 데이터 목록의 키 중에 key라는 이름의 키가 있다면 따로 key를 지정하지 않아도 된다.(리스트 목록의 각 컨텐츠에는 고유한 key가 반드시 있어야 한다.) */}
        {/* 데이터 목록은 data라는 속성으로 받는다. */}
        {/* <FlatList> 컴포넌트는 스크롤 기능 내부에 렌더링 될 컨텐츠를 renderItem 속성에 익명함수를 지정하여 그 인자로 받고 넘겨 받는 item은 data 속성에 지정한 목록으로 부터 <FlatList>가 넘겨준다. 즉, 화면에 뿌려줄 컨텐츠는 여기에 지정하는 것이다. */}
        {/* 만약 사용할 데이터 목록의 item에 key라는 이름을 가진 키가 없는 경우 keyExtractor 속성을 사용해서 key로 사용될 고유한 값을 반환 받아야 한다. 보통 DB 또는 다른 서버에 API로 받은 데이터의 경우 key라는 키가 존재하지 않을 가능성이 높다. */}
        {/* 보통 DB, API로 받는 데이터의 경우 고유한 값으로 id라는 키를 가지는 경우가 많다. 그래서 여기에서는 keyExtractor 속성을 통해 각 item의 id라는 키를 반환 받아서 각 컨텐츠의 고유한 key로 사용한다. */}
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

  goalContainer: {
    flex: 4,
    // flex 속성은 같은 부모 아래 존재하는 형제 컴포넌트 끼리의 비율을 지정한다.
    // 이 컴포넌트는 총 합 4 중에 3의 비율(4/5)을 차지하게 된다.
  },
});
