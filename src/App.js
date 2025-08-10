import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
     const response = await axios.post("https://payxpress-server.onrender.com/create-order", {
  amount,
});

      const { order } = response.data;

      const options = {
        key: "rzp_test_VzN2QNdKVVkLIM", // Test Key
        amount: order.amount,
        currency: "INR",
        name: "PayXpress",
        description: "Secure Online Payment",
        image: "/logo.png",
        order_id: order.id,
        handler: function (response) {
          window.location.href = `/success?paymentId=${response.razorpay_payment_id}&amount=${amount}`;
        },
        theme: {
          color: "#3b82f6",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="app-container">
      <div className="payment-card">
        <img src="/logo.png" alt="PayXpress Logo" className="logo" />
        <h1 className="title">PayXpress – Secure Payment</h1>
        <p className="subtitle">Pay instantly with UPI, Cards, NetBanking, or Wallet</p>

        <input
          type="number"
          placeholder="Enter amount (INR)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="amount-input"
        />

        <button onClick={handlePayment} className="pay-btn">
          💳 Pay Now
        </button>

        <div className="icons">
          <img src="/visa.png" alt="Visa" />
          <img src="/mastercard.png" alt="Mastercard" />
          <img src="/rupay.png" alt="RuPay" />
          <img src="/upi.png" alt="UPI" />
        </div>
      </div>
    </div>
  );
}

export default App;
