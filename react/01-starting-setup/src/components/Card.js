import "./Card.css";

function Card({ className, children }) {
  const classes = "card " + className;
  // 상위 컴포넌트에서 props로 내려준 className과 card라는 className을 모두 적용하기 위해 문자열 더하기를 사용했다.
  // classes = "card expense-item"과 동일하다.

  // 위에서 생성한 classes 문자열을 아래 래퍼 태그의 className으로 지정한다.
  // <div className="card expense-item"> 으로 지정한 것과 동일하다.
  return <div className={classes}>{children}</div>;
  // 다른 컴포넌트에서 사용자 지정 컴포넌트의 여는 태그와 닫는 태그 사이에 다른 HTML 태그 또는 컴포넌트를 렌더링하고 싶다면 해당 컴포넌트의 래퍼 태그의
  // 여는 태그와 닫는 태그 사이에 children 예약어를 사용해서 그렇게 할 수 있다.
  // children 예약어는 어디에서도 Card 컴포넌트에 props로 준 적이 없지만 리액트에서는 기본적으로 모든 사용자 지정 컴포넌트의 props에 children 예약어를 제공한다.
}

export default Card;
