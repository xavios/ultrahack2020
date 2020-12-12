import React from "react";
import axios from "axios";
import Configuration from "./../Api/Configuration";

class Volunteer {
  FirstName: any;
  LastName: any;
  Email: any;
  MobilePhone: any;
  PrimaryMethodOfContact: any;
  Password: any;
}

interface IState {
  registrationSuccess: boolean;
  volunteer: Volunteer;
}

export default class Registration extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      registrationSuccess: false,
      volunteer: new Volunteer(),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event: any) {
    console.log(this.state);
    const volunteerState = (this.state as any).volunteer;
    axios
      .post(Configuration.serviceBaseUrl + "/users/createuser", {
        email: volunteerState.Email,
        password: volunteerState.Password,
        firstName: volunteerState.FirstName,
        lastName: volunteerState.LastName,
        userType: "volunteer",
        phone: volunteerState.MobilePhone,
      })
      .then((response: any) => {
        console.log(response);
        this.setState({
          registrationSuccess: true,
          volunteer: volunteerState,
        });
      });
    event.preventDefault();
  }

  handleInputChange = (event: any) => {
    let val = event.target.value;
    let currentVolunteer: any = this.state.volunteer;
    switch (event.target.id) {
      case "firstName":
        currentVolunteer.FirstName = val;
        break;
      case "lastName":
        currentVolunteer.LastName = val;
        break;
      case "email":
        currentVolunteer.Email = val;
        break;
      case "mobilePhone":
        currentVolunteer.MobilePhone = val;
        break;
      case "primaryMethodOfContact":
        currentVolunteer.PrimaryMethodOfContact = val;
        break;
      case "password":
        currentVolunteer.Password = val;
    }
    this.setState({
      registrationSuccess: false,
      volunteer: currentVolunteer,
    });
  };

  render() {
    return (
      <div className="container regContainer">
        {!this.state.registrationSuccess && (
          <div>
            <h3>Apply as a volunteer to Unicef Hungary</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group required">
                <label htmlFor="firstName" className="control-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  required
                  onChange={this.handleInputChange}
                ></input>
              </div>

              <div className="form-group required">
                <label htmlFor="lastName" className="control-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  required
                  onChange={this.handleInputChange}
                ></input>
              </div>

              <div className="form-group required">
                <label htmlFor="email" className="control-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                  onChange={this.handleInputChange}
                ></input>
              </div>

              <div className="form-group required">
                <label htmlFor="mobilePhone" className="control-label">
                  Mobile Phone Number (example: 0630-123-4567)
                </label>
                <input
                  type="tel"
                  pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}"
                  className="form-control"
                  id="mobilePhone"
                  onChange={this.handleInputChange}
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="primaryMethodOfContact">
                  Primary method of contact
                </label>
                <select
                  className="form-control"
                  id="primaryMethodOfContact"
                  onChange={this.handleInputChange}
                >
                  <option>Email</option>
                  <option>Phone</option>
                  <option>FaceBook (Messenger)</option>
                  <option>WhatsApp</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="control-label">
                  Secure password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                  onChange={this.handleInputChange}
                ></input>
              </div>

              <div className="form-group form-check required">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  required
                ></input>
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Do you accept our terms & conditions?
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        )}
        {this.state.registrationSuccess && (
          <div className="alert alert-success" role="alert">
            Thank you for your registration!
          </div>
        )}
      </div>
    );
  }
}
