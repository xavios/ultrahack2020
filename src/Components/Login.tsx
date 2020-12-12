import React from "react";
import UserApiClient from "./../Api/UserApiClient";

interface IState {
  email: string;
  pass: string;
}

interface IProps {
  login: (userId: string) => void;
}

export default class Login extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      pass: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(event: any) {
    console.log(this.state);
    let userAnpiClient = new UserApiClient();
    userAnpiClient.signIn(this.state.email, this.state.pass).then((userid) => {
      this.props.login(userid as string);
    });
    event.preventDefault();
  }

  handleChange(event: any) {
    let val = event.target.value;
    switch (event.target.id) {
      case "email":
        this.setState({
          email: val,
          pass: this.state.pass,
        });
        break;
      case "pass":
        this.setState({
          email: this.state.email,
          pass: val,
        });
        break;
    }
  }

  inputStyle: any = {
    backgroundColor: "#f6f6f6",
    color: "#0d0d0d",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "5px",
    width: "85%",
    border: "2px solid #f6f6f6",
  };

  buttonStyle: any = {
    backgroundColor: "#56baed",
    border: "none",
    color: "white",
    padding: "15px 80px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    textTransform: "uppercase",
    fontSize: "13px",
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="email"
          id="email"
          className="fadeIn second"
          name="email"
          placeholder="Email"
          style={this.inputStyle}
          onChange={this.handleChange}
          required
        ></input>
        <input
          type="password"
          id="pass"
          className="fadeIn third"
          name="pass"
          placeholder="Password"
          style={this.inputStyle}
          onChange={this.handleChange}
          required
        ></input>
        <br />
        <input
          type="submit"
          className="fadeIn fourth"
          value="Log In"
          style={this.buttonStyle}
        ></input>
      </form>
    );
  }
}
