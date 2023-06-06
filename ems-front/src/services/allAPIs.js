import { BASE_URL } from "./base_url";
import { commonRequest } from "./commonReq";

// register
export const empRegister = async (body, header) => {
  return await commonRequest("POST", `${BASE_URL}/employee/register`, body, header);
};

//getallusers api
export const getusers = async (searchkey) => {
  return await commonRequest("GET", `${BASE_URL}/employee/get-all-employee-details?search=${searchkey}`, "");
};

// view profile
export const viewProfile = async (id) => {
  return await commonRequest("GET", `${BASE_URL}/employee/view-profile/${id}`, "");
};

//delete user
export const removeUser = async (id) => {
  return await commonRequest("DELETE", `${BASE_URL}/employee/remove-user/${id}`, {});
};
