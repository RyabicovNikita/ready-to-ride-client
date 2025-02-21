import { request } from "../utils";

export const logoutUser = () => request("logout", "POST");
export const authUser = (isRegister, data) => request(isRegister ? "register" : "login", "POST", data);
