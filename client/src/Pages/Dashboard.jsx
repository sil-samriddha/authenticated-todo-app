import React, { Component } from "react";
import Cookies from "js-cookie";
import "../Styles/dashboard.css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      user_name: "user-name",
      user_email: "user@email.com",
      upcoming_tasks: [],
      completed_tasks: [],
      add_task_name: "",
      add_task_description: "",
    };
    this.submitRef = React.createRef();
  }
  componentDidMount() {
    this.handleMount();
  }
  handleMount = () => {
    fetch(import.meta.env.VITE_API_URL + "/task/" + Cookies.get("login"))
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          this.setState({
            user_id: data.user["_id"],
            user_name: data.user.name,
            user_email: data.user.email,
            upcoming_tasks: data.upcoming_task,
            completed_tasks: data.completed_task,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleChange = (event, property) => {
    this.setState({ [property]: event.target.value });
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      this.submitRef.current.click();
    }
  };

  handleLogout = () => {
    Cookies.remove("login");
    window.location.replace("/");
  };
  handleDelete = (id) => {
    fetch(import.meta.env.VITE_API_URL + "/task", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task_id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          document.getElementById(id).style.animation = "delete 0.3s forwards";
          setTimeout(() => {
            this.setState((prevState) => ({
              upcoming_tasks: prevState.upcoming_tasks.filter((task) => {
                return task["_id"] != id;
              }),
              completed_tasks: prevState.completed_tasks.filter((task) => {
                return task["_id"] != id;
              }),
            }));
          }, 300);
        } else {
          new Error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleUpdate = (id) => {
    fetch(import.meta.env.VITE_API_URL + "/task", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task_id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          document.getElementById(id).style.animation = "delete 0.3s forwards";
          setTimeout(() => {
            this.handleMount();
          }, 300);
        } else {
          new Error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    try {
      fetch(import.meta.env.VITE_API_URL + "/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.state.user_id,
          title: this.state.add_task_name,
          description: this.state.add_task_description,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            this.setState({
              add_task_name: "",
              add_task_description: "",
            });
            this.handleMount();
          }
        });
    } catch (e) {
      alert(e.message);
    }
  };
  render() {
    return (
      <div className="dashboard">
        <div className="welcome">
          <img src="profile.png" alt="avtar" />
          <h1>{this.state.user_name}</h1>
          <p>{this.state.user_email}</p>
          <button onClick={this.handleLogout}>Log out</button>
        </div>
        <div className="tasks">
          <h1>
            Welcome <span>{this.state.user_name}</span>
          </h1>
          <h2>
            <span>Upcoming </span>tasks
          </h2>
          <div className="upcoming">
            {this.state.upcoming_tasks.map((task) => (
              <div key={task._id} id={task._id}>
                <div className="task-title-box">
                  <div className="task-title">{task.title}</div>
                  <div className="task-title-btn">
                    <button onClick={() => this.handleUpdate(task._id)}>
                      <i className="material-icons" style={{ color: "green" }}>
                        check_circle
                      </i>
                    </button>
                    <button onClick={() => this.handleDelete(task._id)}>
                      <i
                        className="material-icons"
                        style={{ color: "darkred" }}
                      >
                        delete
                      </i>
                    </button>
                  </div>
                </div>
                <div className="task-desc">{task.description}</div>
              </div>
            ))}
          </div>
          <h2>
            <span>Completed</span> tasks
          </h2>
          <div className="completed">
            {this.state.completed_tasks.map((task) => (
              <div key={task._id} id={task._id}>
                <div className="task-title-box">
                  <div className="task-title">{task.title}</div>
                  <div className="task-title-btn">
                    <button onClick={() => this.handleDelete(task._id)}>
                      <i
                        className="material-icons"
                        style={{ color: "darkred" }}
                      >
                        delete
                      </i>
                    </button>
                  </div>
                </div>
                <div className="task-desc">{task.description}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="add-task">
          <h2>Add Tasks</h2>
          <input
            type="text"
            placeholder="Task Name"
            value={this.state.add_task_name}
            onChange={(event) => this.handleChange(event, "add_task_name")}
          />
          <textarea
            placeholder="Task Description"
            value={this.state.add_task_description}
            onChange={(event) =>
              this.handleChange(event, "add_task_description")
            }
            onKeyDown={this.handleKeyDown}
          />

          <button ref={this.submitRef} onClick={this.handleSubmit}>
            Add task
          </button>
        </div>
      </div>
    );
  }
}
