import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";

function Expenses({ expenses }) {
  return (
    <div className="expenses">
      {expenses.map((el, idx) => {
        return (
          <ExpenseItem
            title={el.title}
            amount={el.amount}
            date={el.date}
            key={idx}
          />
        );
      })}
    </div>
  );
}

export default Expenses;
