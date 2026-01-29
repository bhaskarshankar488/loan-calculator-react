import { useState } from "react";
import "../styles/loan.css";

function Calculate() {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [years, setYears] = useState("");

  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const [monthly, setMonthly] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  function validateAndCalculate() {
    if (!amount || !interest || !years || amount <= 0 || interest <= 0 || years <= 0) {
      alert("⚠️ Please enter valid positive numbers!");
      return;
    }

    setLoading(true);
    setShowSummary(false);

    setTimeout(() => {
      calculateResult();
      setLoading(false);
      setShowSummary(true);
    }, 500);
  }

  function calculateResult() {
    const r = interest / 100 / 12;
    const n = years * 12;

    const emi =
      r === 0
        ? amount / n
        : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const totalPay = emi * n;
    const interestPay = totalPay - amount;

    setMonthly(emi);
    setTotal(totalPay);
    setTotalInterest(interestPay);
  }

  function handleReset() {
    setAmount("");
    setInterest("");
    setYears("");
    setMonthly(0);
    setTotal(0);
    setTotalInterest(0);
    setShowSummary(false);
  }

  return (
    <>
      <div className="calculator">
        <h2>Loan Calculator</h2>

        <div className="input-group">
          <label>Loan Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />
        </div>

        <div className="input-group">
          <label>Interest Rate (%)</label>
          <input
            type="number"
            value={interest}
            onChange={(e) => setInterest(Number(e.target.value))}
            placeholder="Enter interest"
          />
        </div>

        <div className="input-group">
          <label>Years</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            placeholder="Enter No of years"
          />
        </div>

        <button onClick={validateAndCalculate} id="calcBtn">Calculate</button>

        {loading && <div className="loader"></div>}
      </div>

      {showSummary && (
        <div className="loan-summary">
          <h3>Loan Summary</h3>

          <div className="summary-item">
            <label>Monthly Payment:</label>
            <span>
              {monthly.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>

          <div className="summary-item">
            <label>Total Payment:</label>
            <span>
              {total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>

          <div className="summary-item">
            <label>Total Interest Payable:</label>
            <span>
              {totalInterest.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>

          <button onClick={handleReset} id="resetBtn" >Reset</button>
        </div>
      )}
    </>
  );
}

export default Calculate;
