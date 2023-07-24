import React, { Component } from "react";
import Cookies from 'js-cookie';
import "../Styles/splash.css";

export default class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: ["", "", "", ""],
    };
    this.inputRefs = [];
  }

  handleChange = (event, index) => {
    const updatedOtp = [...this.state.otp];
    updatedOtp[index] = event.target.value;
    this.setState({ otp: updatedOtp });

    if (event.target.value !== "" && index < this.inputRefs.length - 1) {
      this.inputRefs[index + 1].focus();
    }
  };
  handleKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      index > 0 &&
      this.state.otp[index] === ""
    ) {
      this.inputRefs[index - 1].focus();
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    try {
      fetch(import.meta.env.VITE_API_URL +"/auth/verify", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          otp: this.state.otp.join(""),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            Cookies.set('login', data.jwt)
            window.location.replace("/app")
          }
          this.setState({
            otp: ["", "", "", ""],
          });
        });
    } catch (e) {
      alert(e.message);
    }
  };
  render() {
    return (
      <div className="splashscreen">
        <h1>Enter OTP</h1>
        <img src="verify.png" alt="image" />
        <span>&nbsp;{this.state.error}&nbsp;</span>
        <div className="otp">
          {this.state.otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(event) => this.handleChange(event, index)}
              onKeyDown={(event) => this.handleKeyDown(event, index)}
              ref={(ref) => (this.inputRefs[index] = ref)}
            />
          ))}
        </div>
        <div>
          <button onClick={this.handleSubmit}>Verify</button>
        </div>
      </div>
    );
  }
}
