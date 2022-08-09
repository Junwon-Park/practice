import Expenses from "./components/Expenses";

function App() {
  //? App 컴포넌트를 함수형 컴포넌트로 선언한 것이다.
  //? index.js에서 이 App 컴포넌트를 메인 화면에 뿌려주고 있다.

  const expenses = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ];

  return (
    //? 컴포넌트는 HTML 요소를 반환한다.
    //! 이 것은 당연히 일반적인 자바스크립트 문법은 아니고 리액트 팀에서 개발한 JSX라는 파일을 반환하는 구문으로 자바스크립트에서 정상 동작한다.
    <div>
      <h2>Let's get started!</h2>
      <Expenses expenses={expenses} />
    </div>
    //? JSX는 JavaScript XML의 줄임말이다.
    //? HTML은 XML이라고 할 수 있고, JS에서 XML(HTML) 구문을 사용하는 형식을 JSX라고 하며 JSX는 React의 실행 됫단에서 변환 과정을 거쳐 브라우저가 이해할 수 있도록 해석된다.
    //? JSX는 개발자에게 친숙한 HTML로 작성할 수 있고, 실행 시 브라우저가 해석할 수 있는 코드로 변환되기 때문에 편리하다.
  );
}

export default App;
//? export default는 기본 값으로 내보내는 객체를 정의한다.
//? export default로 내보내면 내보낸 이름 그 대로 import하여 사용 가능하다.(import App from App;)
//! App.js라는 App 컴포넌트를 선언한 파일은 기본 값으로 App 컴포넌트(App 함수 컴포넌트)를 내보내서 다른 곳에서 불러와(import) 사용할 수 있도록 한다.
