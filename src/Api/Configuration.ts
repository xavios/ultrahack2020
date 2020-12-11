export default class Configuration {
    public static serviceBaseUrl: string = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;
}