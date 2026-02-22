import { useState } from "react";

const StatisticLine = ({ text, value, unit = "" }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value} {unit}
    </td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : ((good * 1 + bad * -1) / total).toFixed(2);
  const positive = total === 0 ? 0 : ((good / total) * 100).toFixed(2);

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text={"Good"} value={good} />
        <StatisticLine text={"Neutral"} value={neutral} />
        <StatisticLine text={"Bad"} value={bad} />
        <StatisticLine text={"Total"} value={total} />
        <StatisticLine text={"Average"} value={average} />
        <StatisticLine text={"Positive"} value={positive} unit="%" />
      </tbody>
    </table>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
