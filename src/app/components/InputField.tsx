'use client'

import React from 'react';
import { InputSchema } from '../../types';

interface InputFieldProps{
  fieldName: string;
  schema: InputSchema;
  value: any;
  onChange?: (fieldName: string, newValue: any) => void;
}

const InputField: React.FC<InputFieldProps> = ({ fieldName, schema, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(fieldName, event.target.value);
    }
  };

  const label = schema.label !== undefined ? schema.label : fieldName;

  return (
    <div key={fieldName} className='form-input-container'>
        <label htmlFor={fieldName}>{label}:</label>
        <input
          type={schema.type === 'number' ? 'number' : 'text'}
          id={fieldName}
          value={value}
          onChange={handleChange}
        />
    </div>
  );
};
export default InputField;