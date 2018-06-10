export const SET_LOCATION = 'SET_LOCATION';
export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export const GET_PRESSURE_DATA = 'GET_PRESSURE_DATA';
export const GET_PRESSURE_DATA_SUCCESS = 'GET_PRESSURE_DATA_SUCCESS';
export const GET_PRESSURE_DATA_FAIL = 'GET_PRESSURE_DATA_FAIL';

const defaultState = {
  lat: null,
  lng: null,
  startDate: null,
  endDate: null,
  pressureData: [],
  error: false,
  loading: false
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, lat: action.lat, lng: action.lng };
    case SET_DATE_RANGE:
      return { ...state, startDate: action.startDate, endDate: action.endDate };
    case GET_PRESSURE_DATA:
      return { ...state, loading: true };
    case GET_PRESSURE_DATA_SUCCESS:
      return { ...state, loading: false, pressureData: action.payload.data };
    case GET_PRESSURE_DATA_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

export function getPressureData(lat, lng, startDate, endDate) {
  return {
    type: GET_PRESSURE_DATA,
    payload: {
      request: {
        url: `/pressure?lat=${lat}&long=${lng}&dateStart=${startDate}&dateEnd=${endDate}`
      }
    }
  };
}

export function setDateRange(startDate, endDate) {
  return {
    type: SET_DATE_RANGE,
    startDate,
    endDate
  };
}

export function setLocation(lat, lng) {
  return {
    type: SET_LOCATION,
    lat,
    lng
  };
}