import { FETCH_USER } from './types';
import api from '../api';

export const fetchUser = () => async dispatch => {
  const res = await api.fetchUser();
  dispatch({ type: FETCH_USER, payload: res });
};

/* code above is the same as below */
// function fetchUser() {
//   return function(dispatch) {
//     api.fetchUser().then(res => {
//       dispatch({ type: FETCH_USER, payload: res });
//     });
//   };
// }