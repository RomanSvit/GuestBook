import React, { Component } from "react";
import "./App.css";
import { getAllusers } from "../../api/api-services";
import Comments from "../comments/Comments";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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
    this.getUsers();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.posted !== this.state.posted ||
      prevState.isDel !== this.state.isDel
    ) {
      this.getUsers();
      this.setState({ posted: false, isDel: false });
    }
  };
  getUsers = () => {
    const prom = getAllusers();
    prom.then(
      (data) => {
        this.setState({ isLoading: true, users: [...data] });
      },
      (error) => {
        this.setState({
          isLoading: true,
          error,
        });
      }
    );
  };
  addPost = async (data) => {
    try {
      await fetch(`${this.state.BASE_URL}/addUser`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      this.setState({ posted: true });
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
  remove = (id) => {
    fetch(`${this.state.BASE_URL}/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        this.setState({ isDel: true });
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
    this.setState({ ...this.state, user: "", message: "" });
  };
  handleClickDelete = (e) => {
    const { id } = e.target;
    this.remove(id);
  };
  render() {
    const { message, user, users, isLoading, error } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoading) {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      );
    } else {
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
                placeholder="Coments"
              ></textarea>
              <button className="btn-post" type="submit">
                Add coment
              </button>
            </form>
            {users.length ? (
              <Comments props={users} onDelete={this.handleClickDelete} />
            ) : null}
          </div>
        </>
      );
    }
  }
}

export default App;
