import React, { FC, ReactElement, useState } from "react";
import { IEvent } from "../Models/IEvent"
import { IUser } from "./../Models/IUser";

type MyEventsProps = {
    userId: string;

}

const MyEvents : FC<MyEventsProps> = (props): ReactElement => { 
    // const [state, setState] = useState({
    //     user: IUser      
    // });

    return (
        <div className="alert alert-success">My events</div>
    );
}

export default MyEvents;