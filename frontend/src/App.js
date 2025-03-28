import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);

  // Fetch transactions (Ensure your backend has this endpoint)
  useEffect(() => {
    fetch("http://127.0.0.1:8000/transactions") // Update if the endpoint is different
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch transactions");
        }
        return res.json();
      })
      .then((data) => setTransactions(data))
      .catch((err) => setError(err.message));
  }, []);

  // Handle user query submission
  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a question.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setResponse(data.answer);
      setQuery(""); // Clear input field after submission
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Personal Finance Tracker</h1>

        {/* Display Transactions */}
        <h2>Recent Transactions</h2>
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        <ul>
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <li key={index}>
                {tx.date} - {tx.category} - ${tx.amount}
              </li>
            ))
          ) : (
            <p>No transactions available.</p>
          )}
        </ul>

        {/* User Query Form */}
        <form onSubmit={handleQuerySubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a finance-related question..."
          />
          <button type="submit">Ask</button>
        </form>

        {/* Display Response */}
        {response && (
          <div>
            <h3>AI Response:</h3>
            <p>{response}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
