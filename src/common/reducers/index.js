import { combineReducers } from "redux";
import navigation from "../../navigation/redux/reducers/navigation.js";
import register from "../../auth/redux/reducers/register.js";
import auth from "../../auth/redux/reducers/auth.js";

export default combineReducers({
  register,
  auth,
  navigation,
});