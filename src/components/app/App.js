import React, { Component } from "react";
import "./App.css";
import Comments from "../comments/Comments";
import Spinner from "../spiner/Spiner";
import * as services from "../../services/api";

class App extends Component {
    state = {
        users: [],
        message: "",
        user: "",
        isLoading: false,
    };

    componentDidMount = () => {
        this.setState({ isLoading: true });
        this.getUsers();
    };
    getUsers = () => {
        services
            .getUsersApi()
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({ users: [...data] });
                this.setState({ isLoading: false });
            })
            .catch((error) => {
                throw new Error(error);
            });
    };

    addPost = (data) => {
        services
            .addPostApi(data)
            .then((res) => {
                return res.json();
            })
            .then((data) =>
                this.setState((prevState) => ({
                    users: [...prevState.users, data],
                    isLoading: false,
                }))
            )
            .catch((error) => {
                console.error("Ошибка:", error);
            });
    };
    remove = (id) => {
        services
            .removeComentApi(id)
            .then(() => {
                this.setState({
                    isLoading: false,
                });
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
        let data;
        const { user, message } = this.state;
        if (this.state.message === "" || this.state.user === "") {
            alert("Fill empty fields, please.");
        } else {
            data = {
                name: user,
                message,
            };
            this.setState({ isLoading: true });
            this.addPost(data);
            this.reset();
        }
    };
    reset = () => {
        this.setState({
            user: "",
            message: "",
        });
    };
    handleClickDelete = (e) => {
        const { id } = e.target;
        let arr = this.state.users;
        let newUsers = arr.filter((elem) => elem._id !== id);
        this.setState({ users: [...newUsers], isLoading: true });
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
                            Add comment
                        </button>
                    </form>
                    {isLoading ? <Spinner /> : null}
                    {users.length ? (
                        <Comments
                            props={users}
                            onDelete={this.handleClickDelete}
                        />
                    ) : null}
                </div>
            </>
        );
    }
}

export default App;
