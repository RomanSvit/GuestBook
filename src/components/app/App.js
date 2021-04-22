import React, { Component } from "react";
import "./App.css";
import Comments from "../comments/Comments";
import Spinner from "../spiner/Spiner";

class App extends Component {
  state = {
    BASE_URL: "https://peaceful-chamber-89886.herokuapp.com/api",
    users: [],
    user: "",
    message: "",
    isLoading: false,
    error: null,
    posted: false,
    isDel: false,
  };

  componentDidMount = () => {
    this.setState({ isLoading: true });
    this.getUsers();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.posted !== this.state.posted ||
      prevState.isDel !== this.state.isDel
    ) {
      this.setState({ isLoading: true });
      this.getUsers();
      this.setState({
        posted: false,
        isDel: false,
      });
    }
  };
  getUsers = async () => {
    try {
      await fetch(`${this.state.BASE_URL}/comments`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({ users: [...data] });
          this.setState({ isLoading: false });
        });
    } catch (error) {
      throw new Error(error);
    }
  };
  addPost = async (data) => {
    try {
      await fetch(`${this.state.BASE_URL}/addComment`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      this.setState({ posted: true, isLoading: false });
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
  remove = (id) => {
    fetch(`${this.state.BASE_URL}/comments/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        this.setState({ isDel: true, isLoading: false });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { user, message } = this.state;
    const data = {
      name: user,
      message,
    };
    this.addPost(data);
    this.reset();
  };
  reset = () => {
    this.setState({ ...this.state, user: "", message: "", isLoading: false });
  };
  handleClickDelete = (e) => {
    const { id } = e.target;
    this.remove(id);
  };
  render() {
    const { message, user, users, isLoading } = this.state;
    return (
      <>
        <div className="container">
          <h1 className="main-titlle">Guest Book</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="user"
              value={user}
              onChange={this.handleChange}
              placeholder="Your name"
            />
            <textarea
              type="text"
              name="message"
              value={message}
              onChange={this.handleChange}
              placeholder="Your comment"
            ></textarea>
            <button className="btn-post" type="submit">
              Add coment
            </button>
          </form>
          {isLoading ? <Spinner /> : null}
          {users.length ? (
            <Comments props={users} onDelete={this.handleClickDelete} />
          ) : null}
        </div>
      </>
    );
  }
}

export default App;
