import axios from "axios";

const baseURL = "https://xkcd.com/";

export class XKCD {
  async GetLatestComicMetadata() {
    let url = `${baseURL}info.0.json`;
    const resp = await axios(url);
    return resp.data;
  }

  async GetSpecificComic(id) {
    let url = `${baseURL}${id}/info.0.json`;
    console.log(url);
    const resp = await axios(url);
    return resp.data;
  }
}
