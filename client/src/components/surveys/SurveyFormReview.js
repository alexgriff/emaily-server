import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = formFields.map(({ name, label }) => (
    <div key={name}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  ));
  return (
    <div>
      <h5>Please Confirm Your Entries</h5>
      <div>{reviewFields}</div>
      <button
        onClick={onCancel}
        className="yellow darken-3 white-text btn-flat"
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green right waves-effect waves-light btn"
      >
        SEND SURVEY
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = ({ form: { surveyForm: { values } } }) => ({
  formValues: values
});

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
