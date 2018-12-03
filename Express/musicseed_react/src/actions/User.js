import axios from "axios";
import types from "./types";

export const fetchUser = () => async dispatch => {
    dispatch({
        type: types.FETCH_USER,
        payload: await axios.get("/api/users/current")
    });
};

// export const insertUser = () => async dispatch => {
//     dispatch({
//         type: types.INSERT_USER,
//         payload: await axios.post("/api/users")
//     })
// };