import React from "react";

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

export default class Tasks extends React.Component<any, IState> {}
