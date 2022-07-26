function ExpenseItem() {
  return (
    <div>
      <div>March 28th 2022!</div>
      <div>
        <h2>Car Insurance</h2>
        <div>$200.0</div>
      </div>
    </div>
  );
  // return (
  //  <h2>Expense item!</h2>
  //  <h2>It's too expensive!</h2>
  // );
  // 위 처럼 작성할 수 없다. 왜냐하면(아래)
  //! 모든 JSX 구문에는 단 하나의 root 요소가 필요하다.
  //! 어떤 요소가 최상위의 같은 선상에 두 개 이상 동시에 존재할 수 없다.
  //! 그래서 위 처럼 div 태그로 감싸 주어서 단 하나의 root 요소의 역할을 하도록 한 것이다.
  //? 그리고 JSX를 ()로 감싸주지 않으면 unreachable code detected 에러가 발생한다.
}

export default ExpenseItem;
