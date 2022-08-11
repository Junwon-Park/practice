import ExpenseDate from "./ExpenseDate";
import Card from "./Card";
import "./ExpenseItem.css";

function ExpenseItem({ title, amount, date }) {
  //? Props는 꼭 객체이기 때문에 당연히 구조분해 할당으로 받을 수 있다.
  //! 물론 이때, 각 속성의 이름은 넘겨줄 때의 이름과 동일해야 한다.

  const clickHandler = () => {
    // onClick 이벤트 발생 시, 동작할 함수, function 키워드로 작성해도 동일하게 동작한다.
    console.log("Clicked!!!");
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${amount}</div>
      </div>
      <button onClick={clickHandler()}>Change Title</button>
      {/* onClick과 같은 이벤트 리스너에서 동작할 함수 지정은 함수를 지정한다.
      반드시 ()를 붙여 호출하는 것이 아닌 함수를 지정만 해주어야 한다. */}
    </Card>
  );

  // function ExpenseItem(props) {
  //   //? props라는 이름의 객체로 Props 전달(이 객체의 이름은 사용자 지정으로 내가 정하는 것이다.)

  //   const month = props.date.toLocaleString("en-US", { month: "long" });
  //   const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  //   const year = props.date.getFullYear();
  //   return (
  //     <div className="expense-item">
  //       <div>
  //         <div>{month}</div>
  //         <div>{year}</div>
  //         <div>{day}</div>
  //       </div>
  //       <div className="expense-item__description">
  //         <h2>{props.title}</h2>
  //         <div className="expense-item__price">${props.amount}</div>
  //       </div>
  //     </div>
  //   );

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
