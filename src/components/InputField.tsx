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
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(fieldName, event.target.value);
    }
  };
  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(fieldName, event.target.value);
    }
  };

  const label = schema.label !== undefined ? schema.label : fieldName;
  console.log('value: ' + JSON.stringify(value))
  console.log('schema: ' + JSON.stringify(schema))
  let inputElement;
  if (schema.enum) {
    inputElement = (
      <select
        id={fieldName}
        value={value}
        onChange={handleSelectChange}
        className="md:col-span-1 bg-gray-100 dark:bg-gray-400 border border-gray-300 rounded-md p-1 w-full text-right"
      >
        <option value="">Select an option</option>
        {schema.enum.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>);
  }
  else if (schema.inputType === 'textarea') {
    inputElement = (
      <textarea
        className="col-span-1 bg-gray-100 dark:bg-gray-400 border border-gray-300 rounded-md p-2 w-full text-right"
        id={fieldName}
        value={value}
        onChange={handleTextAreaChange}
        rows={3}
      />
    );
  } else if (schema.inputType === 'checkbox') {
    inputElement = (
      <input
        className="col-span-1 bg-gray-100 dark:bg-gray-400 border border-gray-300 rounded-md p-1 w-full text-right"
        type={schema.inputType}
        id={fieldName}
        checked={value}
        onChange={handleChange}
      />
    );
  }
  else {
    inputElement = (
      <input
        className="col-span-1 bg-gray-100 dark:bg-gray-400 border border-gray-300 rounded-md p-1 w-full text-right"
        type={schema.inputType}
        id={fieldName}
        value={value}
        onChange={handleChange}
      />
    );
  }
  return (
    <div key={fieldName} className='form-input-container grid grid-cols-4 gap-2 items-start w-full'>
      {label && (
        <label
          className="text-sm col-span-3 break-words w-full"
          htmlFor={fieldName}
        >
          {label}:
        </label>
      )}
      {inputElement}
    </div>
  )
};
export default InputField;