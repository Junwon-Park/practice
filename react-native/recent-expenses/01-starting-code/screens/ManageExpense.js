import { useContext, useLayoutEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

// Custom comonents
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  // ? "?." 문법은 JS에 새로 추가된 문법으로 객체에 사용할 수 있는 문법이며 Optional Chaining이라고 부른다.
  // ? 위 문법에서 route.params에 expenseId라는 키가 존재한다면 값을 반환하고 route.params가 비었거나 expenseId라는 키가 존재하지 않으면 undefined를 반환한다.
  // ? Dot notation만 사용할 경우 해당 키가 없다면 에러가 발생하지만 "?."을 사용하면 에러가 나지 않고 undefined를 반환한다.
  // ? 단, Object.value와 같은 형식은 없으면 그냥 undefined이기 때문에 에러가 발생하지 않지만 위 route.params.expenseId 처럼 Dot notation을 두 개 이상(중첩된 Object) 사용할 경우에는 에러가 발생하기 때문에 "?."을 사용한다.
  // ? route.params에서 route가 null or undefined일 때 에러 안남(undefined 반환), route.params.expenseId에서 route.params가 null or undefined일 때 에러남 -> 이런 상황에만 "?." 사용
  const isEditing = !!editedExpenseId;
  // ? "!!"(느낌표 두 개)는 Truthy 값은 true, Falsy 값은 false를 반환한다.
  // ? ex) !!0 === false, !!1 === true, !!undefined === false, !!"" === false, !!false === false, !!true === true

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: "Test!!!!",
        amount: 29.99,
        date: new Date("2022-05-20"),
      });
    } else {
      expensesCtx.addExpense({
        description: "Test",
        amount: 19.99,
        date: new Date("2022-05-19"),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
        // ? && 논리 연산자를 사용하여 isEditing이 Truthy면 &&의 우측 컴포넌트들을 반환하고 Falsy라면 뿌려주지 않도록 하는 로직
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
