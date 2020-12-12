import { IUser } from "../Models/IUser";
import Configuration from "./Configuration";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class UserApiClient {
  axiosInstance = axios.create();
  cookies = new Cookies();

  constructor() {
    this.axiosInstance.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        // TODO: figure out what the shit can we do with 401 sign in!
        debugger;
        if (error.response.status === 401) {
          console.log("got 401");
        }
        return Promise.reject(error);
      }
    );
  }

  public async userIsLoggedIn(): Promise<boolean> {
    let token = this.cookies.get("x-access-token");
    if (!token) {
      return false;
    }
    let response = await axios.get(
      `${Configuration.serviceBaseUrl}/users/isloggedin`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    let body: any = response.data;
    return body.message == "User logged in";
  }

  public async signIn(email: string, pass: string): Promise<string | null> {
    const cookies = new Cookies();
    let response = await this.axiosInstance.post(
      `${Configuration.serviceBaseUrl}/users/singin`,
      {
        email: email,
        password: pass,
      }
    );
    let body: any = response.data;
    if (body.accessToken != null) {
      const cookies = new Cookies();
      cookies.set("x-access-token", body.accessToken);
      return body.id;
    }
    return null;
  }

  public async getUsers(): Promise<IUser[]> {
    const response = await fetch(
      `${Configuration.serviceBaseUrl}/users/getusers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.cookies.get("x-access-token") as string,
        },
      }
    );

    const responseJson = await response.json();

    return responseJson.users;
  }

  public async get(userId: string): Promise<IUser> {
    const response = await fetch(
      `${Configuration.serviceBaseUrl}/users/getuser/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.cookies.get("x-access-token") as string,
        },
      }
    );

    const responseJson = await response.json();
    const user: IUser = responseJson.user;
    user.availability = user.availability.map((a) => {
      return {
        _id: a._id,
        from: new Date(a.from),
        to: new Date(a.to),
      };
    });
    return user;
  }

  public async update(user: IUser): Promise<IUser> {
    const response = await fetch(
      `${Configuration.serviceBaseUrl}/users/updateuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.cookies.get("x-access-token") as string,
        },
        body: JSON.stringify(user),
      }
    );

    const responseJson = await response.json();

    return responseJson.user;
  }
}
