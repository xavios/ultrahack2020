import { stringify } from "querystring";
import React, { FC, ReactElement, useEffect, useState } from "react";
import UserApiClient from "src/Api/UserApiClient";
import { IUser } from "src/Models/IUser";
import { DateRange } from "../Models/DateRange";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserType } from "src/Models/UserType";

type ProfileProps = {
  userId: string;
};

const Profile: FC<ProfileProps> = (props): ReactElement => {
  const userApiClient = new UserApiClient();
  const [state, setState] = useState({
    _id: props.userId,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    availability: Array<DateRange>(),
    profession: "",
    languages: "",
    skills: "",
    newsletter: false,
    password: "",
    userType: UserType.volunteer,
  });

  useEffect(() => {
    async function loadDataWrapper() {
      await loadData();
    }
    loadDataWrapper();
  }, []);

  const loadData = async () => {
    const user: IUser = await userApiClient.get(props.userId);
    setState(user);
  };

  const onAddDateClick = () => {
    const newItem: DateRange = {
      from: new Date(),
      to: new Date(),
    };

    setState({ ...state, availability: [...state.availability, newItem] });
  };

  const onDeleteDateClick = (id?: string) => {
    const newAbs = state.availability.filter((a) => a._id !== id);
    setState({ ...state, availability: newAbs });
  };

  const onSaveClick = async () => {
    await userApiClient.update(state);
    await loadData();
  };

  return (
    <div className="container">
      <form className="text-left">
        <h4>Personal Data</h4>

        <div className="form-group row">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">
            First name
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={state?.firstName}
              onChange={(e) => {
                setState({ ...state, firstName: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="lastName" className="col-sm-2 col-form-label">
            Last name
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={state?.lastName}
              onChange={(e) => {
                setState({ ...state, lastName: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              id="email"
              value={state?.email}
              onChange={(e) => {
                setState({ ...state, email: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="phone" className="col-sm-2 col-form-label">
            Phone
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              id="phone"
              value={state?.phone}
              onChange={(e) => {
                setState({ ...state, phone: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="phone" className="col-sm-2 col-form-label">
            Location
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              id="location"
              value={state?.location}
              onChange={(e) => {
                setState({ ...state, location: e.target.value });
              }}
            />
          </div>
        </div>

        <h4>Availability</h4>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="newsletter" />
          <label
            className="form-check-label"
            htmlFor="exampleCheck1"
            defaultChecked={state.newsletter}
            onClick={(e) => {
              setState({ ...state, newsletter: !state.newsletter });
            }}
          >
            Subscribe me to Unicef newsletter about new events & tasks
          </label>
        </div>

        {state.availability.map((a: DateRange) => {
          return (
            <div className="form-group row mt-3 ml-0" key={a._id}>
              <label htmlFor="phone" className="col-form-label mr-3">
                From
              </label>
              <div className="mr-5 datePicker">
                <DatePicker
                  selected={a.from}
                  onChange={(date: any) => {
                    const currentRange = state.availability.find(
                      (f) => f._id === a._id
                    );
                    if (currentRange === undefined) {
                      return;
                    }
                    currentRange.from = date;
                    setState({ ...state });
                  }}
                />
              </div>

              <label htmlFor="phone" className=" col-form-label mr-3">
                To
              </label>
              <div className="datePicker">
                <DatePicker
                  selected={a.to}
                  onChange={(date: any) => {
                    const currentRange = state.availability.find(
                      (f) => f._id === a._id
                    );
                    if (currentRange === undefined) {
                      return;
                    }
                    currentRange.to = date;
                    setState({ ...state });
                  }}
                />
              </div>

              <button
                type="button"
                className="ml-5 btn btn-outline-danger"
                onClick={() => onDeleteDateClick(a._id)}
              >
                Delete
              </button>
            </div>
          );
        })}

        <button
          type="button"
          className="btn btn-outline-primary mb-3 mt-3"
          onClick={onAddDateClick}
        >
          Add availability
        </button>

        <h4>Skills</h4>
        <div className="form-group row">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">
            Profession
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              id="profession"
              value={state?.profession}
              onChange={(e) => {
                setState({ ...state, profession: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">
            Languages
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              id="profession"
              value={state?.languages}
              onChange={(e) => {
                setState({ ...state, languages: e.target.value });
              }}
            />
          </div>
        </div>
      </form>
      <div className="row mt-5">
        <button type="submit" className="btn btn-primary" onClick={onSaveClick}>
          Save changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
