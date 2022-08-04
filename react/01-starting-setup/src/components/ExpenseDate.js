import "./ExpenseDate.css";

function ExpenseDate({ date }) {
  // toLocaleString()은 날짜를 다루기 위해 JS에서 제공하는 기본 메서드이다.
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();

  return (
    <div className="expense-date">
      <div classname="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div classname="expense-date__day">{day}</div>
    </div>
  );
}

export default ExpenseDate;
