const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Cache: 'no-cache'
};

// some notes:
// 1 - the .text() and manual json conversion
// handles an undefined (i.e. empty-string) response
// as well as a json response or error response
// 2 - the credentials key in the fetch config
// sends along the cookies with the req
const get = url => {
  return fetch(url, {
    method: 'GET',
    headers,
    credentials: 'same-origin'
  })
    .then(res => res.text())
    .then(text => {
      if (!text.length) {
        return null;
      }
      try {
        return JSON.parse(text);
      } catch (err) {
        return text;
      }
    });
};

const post = (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers,
    credentials: 'same-origin',
    body: JSON.stringify(body)
  })
    .then(res => res.text())
    .then(text => {
      if (!text.length) {
        return null;
      }
      try {
        return JSON.parse(text);
      } catch (err) {
        return text;
      }
    });
};

export default {
  fetchUser() {
    return get('/api/current_user');
  },
  postToken(token) {
    return post('/api/stripe', token);
  },
  createSurvey(survey) {
    return post('/api/surveys', survey);
  },
  fetchSurveys() {
    return get('/api/surveys');
  }
};
