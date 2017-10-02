import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; /* reduxForm, like connect */
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(field => (
      <Field key={field.name} type="text" {...field} component={SurveyField} />
    ));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red waves-effect waves-light btn">
            Cancel
          </Link>
          <button className="right waves-effect waves-light btn" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  errors.emails = validateEmails(values.recipients || '');

  formFields.forEach(({ name, error }) => {
    if (!values[name]) {
      errors[name] = error;
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
