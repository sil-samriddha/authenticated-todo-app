import React, { Component } from "react";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import "../Styles/splash.css";

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      error: "",
    };
  }
  handleChange = (event, property) => {
    this.setState({ [property]: event.target.value.trim() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    try {
      fetch(import.meta.env.VITE_API_URL + "/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.pass,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            Cookies.set('login', data.jwt);
            window.location.replace("/app");
          }
          this.setState({
            email: "",
            pass: ""
          });
        });
    } catch (e) {
      this.setState({
        error: e.message,
      });
    }
  };
  render() {
    return (
      <div className="splashscreen">
        <h1>Welcome back</h1>
        <img src="login.svg" alt="image" />
        <span>&nbsp;{this.state.error}&nbsp;</span>
        {input.map((comp) => (
          <input
            key={comp.id}
            type={comp.type}
            placeholder={comp.placeholder}
            value={this.state[comp.property]}
            onChange={(event) => this.handleChange(event, comp.property)}
          />
        ))}
        <div>
          <button onClick={this.handleSubmit}>Login</button>
        </div>
        <p>
          Don't have an account ? <Link to='/signup'>Sign Up</Link>
        </p>
      </div>
    );
  }
}

const input = [
  {
    id: 1,
    placeholder: "Enter your Email",
    type: "email",
    property: "email",
  },
  {
    id: 2,
    placeholder: "Enter Password",
    type: "password",
    property: "pass",
  },
];
