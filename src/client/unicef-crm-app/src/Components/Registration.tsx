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
  }

  handleSubmit(event: any) {
    console.log("TODO: Someone registered!");
    event.preventDefault();
  }

  render() {
    return (
      <div className="container regContainer">
        <h3>Apply as a volunteer to Unicef Hungary</h3>
        <form>
          <div className="form-group required">
            <label htmlFor="firstName" className="control-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              required
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
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="primaryMethodOfContact">
              Primary method of contact
            </label>
            <select className="form-control" id="primaryMethodOfContact">
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
