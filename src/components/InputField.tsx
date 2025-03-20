'use client'

import React from 'react';
import { InputSchema } from '../types';

interface InputFieldProps {
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
    <div key={fieldName} className='form-input-container grid grid-cols-1 md:grid-cols-4 gap-2 items-start w-full'>
      <label 
    className="text-sm md:col-span-3 break-words"
    htmlFor={fieldName}>{label}:</label>
      <input
    className="md:col-span-1 bg-gray-100 dark:bg-gray-400 border border-gray-300 rounded-md p-1 w-full"
    type={schema.type === 'number' ? 'number' : 'text'}
        id={fieldName}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
export default InputField;