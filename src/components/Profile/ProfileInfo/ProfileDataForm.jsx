import React from 'react';
import { Contact } from './ProfileInfo';
import { createField, Input, Textarea } from '../../Common/FormControls';
import { reduxForm } from 'redux-form';

const ProfileDataForm = ({handleSubmit,profile}) => {
  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div>
        <div>
          <button className="btn btn-secondary btn-sm">Save</button>
        </div>

        <div className="list-group-item">
          <b>FULL NAME : </b>
          {createField('Full name', 'fullName', [], Input)}
        </div>

        <div className="list-group-item">
          <b> Looking for a job : </b>
          {createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
        </div>

        <div className="list-group-item">
          <b>
            {' '}
            My profissional skils
            {createField('My profissional skils', 'lookingForAJobDescription', [], Textarea)}
          </b>
        </div>

        <div className="list-group-item">
          <b> About me {createField('About me', 'aboutMe', [], Textarea)}</b>
        </div>
        <div className="list-group-item">
          <b> Contacts : </b>
          {Object.keys(profile.contacts).map(key => {
            return <div key={key}>
              <b >{key}:{createField(key,'contacts.'+key,[],Input)}</b>
            </div>;
          })}
        </div>
      </div>
    </form>
  );
};
const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm);
export default ProfileDataFormReduxForm;
