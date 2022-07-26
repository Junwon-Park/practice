//! index.js는 npm start로 앱을 실행하면 가장 먼저 실행되는 파일이다.
import ReactDOM from "react-dom";
// react-dom이라는 서드파티 라이브러리를 불러와 ReactDom이라는 객체로 불러온다.
//? 실제로 package.json의 dependencies에 설치되어 있다.(CRA를 사용하면 프로젝트를 생성할 때, 자동으로 설치된다.)
//? dependencies에 보면 react도 있다. 그 말은 react도 외부 라이브러리를 불러와 사용하고 있다는 것이다.
//? CRA를 사용하면 React 라이브러리를 설치하고 React 개발에 꼭 필요한 필수 라이브러리를 설치해주는 것이다.

import "./index.css";
//? css 파일은 import로 불러올 때, 확장자(.css)를 꼭 붙여야 한다.
import App from "./App";
//? 같은 디렉토리의 App 컴포넌트를 import 한다.
//? 컴포넌트를 import 하여 불러올 때는 확장자(.js)는 꼭 생략해야 한다.
// import ExpenseItem from "./components/ExpenseItem";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// //? 위에서 불러온 ReactDOM 객체의 createRoot() 메서드로 root 객체 생성
// //? createRoot()의 인자로는 root가 될 DOM 객체를 대입한다.
// root.render(<App />);
// //? ReactDOM.createRoot()로 생성한 root 객체의 render() 메서드에 App 컴포넌트를 넣어서 App 컴포넌트를 root 컴포넌트로써 렌더링한다.
// //! 여기에서 root 객체를 생성하기 위해 createRoot() 메서드의 인자로 넣었던 HTML의 DOM 객체인 document.getElementById("root")는
// //! public/index.html의 body 태그 내에 존재하는 <div id="root"></div> 요소이다.
// //! public/index.html은 React에서 유일하게 존재하는 HTML 파일이다.
// //! 결론적으로 public/index.html의 body 태그의 <div id="root"></div>가 root.render() 메서드에 의해서 App 컴포넌트로 대체되는 것이다.
// //? App 컴포넌트는 CRA로 프로젝트를 생성하면 scr에 자동으로 생성되는 컴포넌트이다.

ReactDOM.render(<App />, document.getElementById("root"));
//? 위에서 root 객체를 생성해서 render 메서드로 App 컴포넌트를 index.html의 body의 <div id="root"></div>을 대체한 것을 한 줄로 더 간결하게 작성할 수 있다.
