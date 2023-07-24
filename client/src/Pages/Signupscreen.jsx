import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles/splash.css";

export default class Signupscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      pass: "",
      conf_pass: "",
      error: "",
    };
  }
  handleChange = (event, property) => {
    this.setState({ [property]: event.target.value.trim() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.pass,
    }
    try {
      if (this.state.pass !== this.state.conf_pass)
        throw new Error("Confirm Password");

      fetch(import.meta.env.VITE_API_URL +"/auth/signup", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
     })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success === true) {
            this.setState({
              name: "",
              email: "",
              pass: "",
              conf_pass: "",
            });
            window.location.replace('/verify')
          }else {
            this.setState({
              error : data.message
            })
          }          
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
        <h1>Welcome to ToDo!</h1>
        <p>Let's help to meet up your tasks.</p>
        <span>&nbsp;{this.state.error}&nbsp;</span>
        {input.map((comp) => (
          <input
            key={comp.id}
            type={comp.type}
            placeholder={comp.placeholder}
            spellCheck="false"
            value={this.state[comp.property]}
            onChange={(event) => this.handleChange(event, comp.property)}
          />
        ))}
        <div>
          <button onClick={this.handleSubmit}>Register now</button>
        </div>
        <p>
          Already have an account ? <Link to='/signin'>Sign In</Link>
        </p>
      </div>
    );
  }
}

const input = [
  {
    id: 1,
    placeholder: "Enter your full name",
    type: "text",
    property: "name",
  },
  {
    id: 2,
    placeholder: "Enter your Email",
    type: "email",
    property: "email",
  },
  {
    id: 3,
    placeholder: "Enter Password",
    type: "password",
    property: "pass",
  },
  {
    id: 4,
    placeholder: "Confirm password",
    type: "password",
    property: "conf_pass",
  },
];
