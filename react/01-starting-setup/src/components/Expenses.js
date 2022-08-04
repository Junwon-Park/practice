import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";

function Expenses({ title, amount, date }) {
  return (
    <div className="expenses">
      <ExpenseItem title={title} amount={amount} date={date} />
    </div>
  );
}

export default Expenses;
