import React from 'react';
import styles from './FormControls.module.css';
import { findAllByDisplayValue } from '@testing-library/react';
import { Field } from 'redux-form';

export const Textarea = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      <div>
        <textarea {...input} {...props} />
      </div>
      <div>{hasError && <span> {meta.error}</span>}</div>
    </div>
  );
};

export const Input = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      <div>
        <input {...input} {...props} />
      </div>
      <div>{hasError && <span> {meta.error}</span>}</div>
    </div>
  );
};
export const createField = (placeholder, name, validators, component, props = {}, text = '') => {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />
      {text}
    </div>
  );
};
