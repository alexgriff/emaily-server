const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Cache: 'no-cache'
};

export default {
  // some notes:
  // 1 - the .text() and manual json conversion
  // handles an undefined (i.e. empty-string) response
  // as well as a json response
  // 2 - the credentials key in the fetch config
  // sends along the cookies with the req
  fetchUser() {
    return fetch('api/current_user', {
      method: 'GET',
      headers,
      credentials: 'same-origin'
    })
      .then(res => res.text())
      .then(text => (text.length ? JSON.parse(text) : null));
  },

  postToken(token) {
    return fetch('api/stripe', {
      method: 'POST',
      headers,
      credentials: 'same-origin',
      body: JSON.stringify(token)
    })
      .then(res => res.text())
      .then(text => (text.length ? JSON.parse(text) : null));
  }
};
