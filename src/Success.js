import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Success.css";

function Success() {
  const query = new URLSearchParams(useLocation().search);
  const paymentId = query.get("paymentId");
  const amount = query.get("amount");

  return (
    <div className="success-container">
      <div className="success-card">
        <h1>✅ Payment Successful!</h1>
        <p><strong>Payment ID:</strong> {paymentId}</p>
        <p><strong>Amount Paid:</strong> ₹{amount}</p>
        <Link to="/" className="back-link">Make another payment</Link>
      </div>
    </div>
  );
}

export default Success;
