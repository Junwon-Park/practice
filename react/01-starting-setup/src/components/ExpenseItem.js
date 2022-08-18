import { useState } from "react";
// react 라이브러리에서 state 훅 import
// 위 처럼 {}를 사용하여 특정 객체의 이름을 구조분해 형태로 불러오는 것을 Named Import라고 한다.
import ExpenseDate from "./ExpenseDate";
import Card from "./Card";
import "./ExpenseItem.css";

function ExpenseItem({ title, amount, date }) {
  //? Props는 꼭 객체이기 때문에 당연히 구조분해 할당으로 받을 수 있다.
  //! 물론 이때, 각 속성의 이름은 넘겨줄 때의 이름과 동일해야 한다.

  const [changeTitle, setChangeTitle] = useState(title);
  // useState()의 인자로 대입한 값은 해당 컴포넌트가 최초로 평가될 때, 한 번만 초기화 되는 초기화를 위한 값이다.
  // useState()는 두 개의 요소를 반환하는데 왼쪽은 변수(state), 오른쪽은 그 변수의 값을 변경하는 함수이다.
  // 그리고 useState()의 선언 키워드로 const(상수)를 사용하는데, useState()가 반환하는 state(변수)는 changeTitle = value 이런 식으로 재할당 하여 변경할 수 없다.
  // 무조건 변경 함수를 사용해야 하는데, state의 값도 이 컴포넌트에 변수 자체로 관리되는 것이 아니라 리액트 내부의 state를 관리하는 곳에서 관리한다.
  //! 변경 함수를 호출하여 값을 변경하면 변경된 값을 리액트의 state를 관리하는 곳에서 값이 변경되고 해당 state가 선언된 컴포넌트를 호출한다.
  //! 그러면 해당 컴포넌트는 JSX 코드를 반환하고 반환된 JSX 코드는 DOM 요소로 변환하여 화면에 다시 렌더링 된다.
  //! useState()는 이런 방식으로 각 컴포넌의 JSX 코드의 컨텐츠를 변경할 수 있다. 리액트는 이런 방식으로 브라우저에 렌더링된 컨텐츠를 변경한다.

  const clickHandler = () => {
    // onClick 이벤트 발생 시, 동작할 함수, function 키워드로 작성해도 동일하게 동작한다.
    setChangeTitle("Updated!");
    console.log("Clicked!!!");
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={date} />
      <div className="expense-item__description">
        <h2>{changeTitle}</h2> {/* 일반 변수 대신 state를 대입 */}
        <div className="expense-item__price">${amount}</div>
      </div>
      <button onClick={clickHandler}>Change Title</button>
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
