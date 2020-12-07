import React from "react";

class Volunteer {
  FirstName: any;
  LastName: any;
  Email: any;
  MobilePhone: any;
  PrimaryMethodOfContact: any;
}

export default class Registration extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = new Volunteer();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event: any) {
    console.log(this.state);
    event.preventDefault();
  }

  handleInputChange = (event: any) => {
    let val = event.target.value;
    let currentVolunteer: any = this.state;
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
    }
    this.setState(currentVolunteer);
  };

  render() {
    return (
      <div className="container regContainer">
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
              First Name
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
              Mobile Phone Number
            </label>
            <input
              type="mobilePhone"
              className="form-control"
              id="mobilePhone"
              required
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
    );
  }
}
