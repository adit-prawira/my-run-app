import produce from "immer";
import createDataContext from "./createDataContext";
import {
    GET_TRACK,
    GET_TRACKS,
    CREATE_TRACK,
    UPDATE_TRACK,
    DELETE_TRACK,
    ALERT_ERROR,
} from "./actionTypes";
import trackApi from "../api/trackApi";

const initialState = { tracks: [], error: null, success: null };

const trackReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case GET_TRACK:
            return state;
        case GET_TRACKS:
            state.tracks = action.payload;
            return state;
        case CREATE_TRACK:
            return state;
        case UPDATE_TRACK:
            return state;
        case DELETE_TRACK:
            return state;
        case ALERT_ERROR:
            return state;
        default:
            return state;
    }
});

const getTracks = (dispatch) => async () => {
    try {
        const tracks = (await trackApi.get("/tracks")).data;
        dispatch({ type: GET_TRACKS, payload: tracks });
    } catch (err) {
        dispatch({ type: ALERT_ERROR, payload: "Oops! Something went wrong!" });
    }
};

const getTrack = (dispatch) => async (trackId) => {};

const createTrack = (dispatch) => async (formValues) => {
    await trackApi.post("/tracks", formValues);
};
const updateTrack = (dispatch) => async (updatedFormValues) => {};
const deleteTrack = (dispatch) => async (trackId) => {};

export const { Provider, Context } = createDataContext(
    trackReducer,
    { getTrack, getTracks, createTrack, updateTrack, deleteTrack },
    initialState
);