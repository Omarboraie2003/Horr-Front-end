import React, { useState, useEffect } from "react";
import horrSignInPage from '../assets/horr_sign_in_page.png';

function EmailConfirmationPage() {
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleResend = () => {
    // TODO: Call backend API to resend email
    console.log("Resending confirmation email...");

    setCanResend(false);
    setTimer(20);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <img className="logo" src={horrSignInPage} alt="Sign In" />
        <p className="tagline">
          Thank you for choosing us! <br />
          Please check your email to activate your account.
        </p>


        <p className="signin-link" style={{ marginTop: "15px" }}>
           Forgot email? <a href="/login">Go to SignUp</a>
        </p>
        
      </div>
    </div>
  );
}

export default EmailConfirmationPage;
