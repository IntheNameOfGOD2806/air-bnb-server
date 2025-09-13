import { Credentials } from "../../auth/Credentials";
import { UserInfo } from "../../auth/UserInfo";

export const VALID_ID = "1";

export const TEST_USER: UserInfo = {
  id: "cl7qmjh4h0000tothyjqapgj5",
  roles: ["User"],
  username: "ofek",
  email: "ofek@ofek.com",
  userImage: "ofek.jpg",
  firstName: "ofek",
  lastName: "ofek",
};
export const SIGN_TOKEN = "SIGN_TOKEN";
export const VALID_CREDENTIALS: Credentials = {
  email: "Valid User",
  password: "Valid User Password",
};
export const INVALID_CREDENTIALS: Credentials = {
  email: "Invalid User",
  password: "Invalid User Password",
};
