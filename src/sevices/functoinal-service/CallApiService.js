// import axios from "axios";
// import { useProfile } from "../../context/profile/ProfileContext";

// export const BasicURL = "https://dev-api.droplinked.com"

// export function GetApiWithAuth(address, setstate, dataName, errorhandler) {
//     let token = JSON.parse(localStorage.getItem("token"));

//     axios
//         .get(BasicURL + `${address}`, {
//             headers: { Authorization: "Bearer " + token },
//         })
//         .then((e) => {
//             setstate(e.data.data[dataName]);
//         })
//         .catch((e) => errorhandler(e.response.data.reason));
// }

// export function GetApi(address, resHandler, errorhandler) {
//     axios
//         .get(BasicURL + `${address}`)
//         .then((e) => {
//             resHandler(e.response);
//         })
//         .catch((e) => errorhandler(e.response.data));
// }


// export function GetAuth(address, stateHandler, errorhandler) {

//     let token = JSON.parse(localStorage.getItem("token"));

//     axios
//         .get(BasicURL + `${address}`, {
//             headers: { Authorization: "Bearer " + token },
//         })
//         .then((e) => {
//             stateHandler(e);
//         })
//         .catch((e) => errorhandler(e));

// }

// //  if call api successfully call resFunc true id not call false and , error data
// export function PostApi(address, data, resFunc) {
//     let token = JSON.parse(localStorage.getItem("token"));

//     axios
//         .post(BasicURL + `${address}`, data, {
//             headers: { Authorization: "Bearer " + token },
//         })
//         .then((res) => {
//             resFunc(true);
//         })
//         .catch((error) => {
//             resFunc(false, error.response.data.reason);
//         });
// }

// //  if call api successfully call resFunc true id not call false and , error data
// export function PostWithoutToken(address, data, resFunc) {
//     axios
//         .post(BasicURL + `${address}`, data)
//         .then((res) => {
//             resFunc(true);
//         })
//         .catch((error) => {
//             resFunc(false, error.response.data.reason);
//         });
// }

// //  delete with token
// export function DeleteWithToken(address, resFunc) {
//     let token = JSON.parse(localStorage.getItem("token"));

//     axios
//         .delete(BasicURL + `${address}`, {
//             headers: { Authorization: "Bearer " + token },
//         })
//         .then((res) => {
//             resFunc(true);
//         })
//         .catch((error) => {
//             resFunc(false, error.response.data.reason);
//         });
// }