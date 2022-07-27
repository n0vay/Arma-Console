export default class BaseService{
    
    _baseApiUrl = ""

    constructor() {
        this._baseApiUrl = "https://tilosia-arma-web-backend.herokuapp.com/api/v1";
        // this._baseApiUrl = "http://localhost:8000/api";
    }
}