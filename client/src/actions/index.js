import { FETCH_USER, FETCH_SURVEYS } from './types';
import api from '../api';

export const fetchUser = () => async dispatch => {
  const res = await api.fetchUser();
  dispatch({ type: FETCH_USER, payload: res });
};

export const handleToken = token => async dispatch => {
  const res = await api.postToken(token);
  dispatch({ type: FETCH_USER, payload: res });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await api.createSurvey(values);
  dispatch({ type: FETCH_USER, payload: res });
  history.push('/surveys');
};

/* code above is the same as below */
// function fetchUser() {
//   return function(dispatch) {
//     api.fetchUser().then(res => {
//       dispatch({ type: FETCH_USER, payload: res });
//     });
//   };
// }

export const fetchSurveys = () => async dispatch => {
  const surveys = await api.fetchSurveys();
  dispatch({ type: FETCH_SURVEYS, payload: surveys });
};
