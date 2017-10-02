const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validEmail = email => {
  return re.test(email) === false;
};

export default emails => {
  const emailsArray = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => email.length);

  const invalids = emailsArray.filter(validEmail);

  if (invalids.length) {
    return `These emails are invalid: ${invalids}`;
  }
};
