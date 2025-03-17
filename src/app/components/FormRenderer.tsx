"use client"
import React from 'react';
import InputField from './InputField';
import ArrayInputField from './ArrayInputField';
import { InputSchema, Properties } from '../../types';

interface FormData {
    [key: string]: any;
  }

interface Section {
  label: string;
  properties?: Properties;
}

interface FormSchema {
  title: string;
  description?: string;
  type: string;
  properties: { [key: string]: InputSchema }
}

interface FormRendererProps {
  schema: any;
}

const FormRenderer: React.FC<FormRendererProps> = ({ schema }) => {

  const [formData, setFormData] = React.useState<FormData>({} );
  const handleInputChange = (fieldName: string, value: any) => {
    console.log(`Field: ${fieldName}, Value: ${value}`);
    setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value
    }));
  };

  const handleArrayChange = (fieldName: string, data: Record<string, string>[]) => {
    setFormData((prevData) => ({
        ...prevData,
        [fieldName]: data,
    }));
};
    const sections: Section[] = [];
  
  for (const [key, value] of Object.entries(schema.properties)) {
    const inputSchema = value as InputSchema;
    if (inputSchema.type === "object" && inputSchema.properties) {
      if (inputSchema.displayType === 'Section') {
          sections.push({
            label: inputSchema.label,
            properties: inputSchema.properties
          })
      }else {
          for (const [subKey, subValue] of Object.entries(inputSchema.properties)){
            sections.push({
              label: (subValue as InputSchema).label || subKey,
              properties: { [subKey]: subValue as InputSchema },
            });
          }
      }
    } else {
      sections.push({
        label: inputSchema.label || key,
        properties: { [key]: inputSchema },
      });
    }
  }


  return (
    <>
      {schema.title && <h1>{schema.title}</h1>}      
      {schema.description && <p className='form-description'><i>{schema.description}</i></p>}

      <form>
        {sections.map((section,index) => (
            <section key={index} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px', overflow: 'auto', maxWidth: '100%' }}>
              {section.label && <h2>{section.label}</h2>}              
              {section.properties && Object.entries(section.properties).map(([fieldKey, fieldValue]) => {
                let subInputSchema:InputSchema = fieldValue as InputSchema;
                if (fieldValue.properties){
                  subInputSchema = fieldValue as InputSchema;
                    
                }
                  if (subInputSchema.type === 'array' && subInputSchema.items) {
                    return (<div key={fieldKey} className='table-form-input-container'>
                        <ArrayInputField
                            properties={subInputSchema.items.properties} data={formData[fieldKey] || []}
                            onChange={(data: Record<string, string>[]) => handleArrayChange(fieldKey, data)}

                        />
                    </div>);
                }

                if (subInputSchema.displayType === 'Section') {
                  return (
                    <div key={fieldKey}>
                      <h2>Section: {subInputSchema.type}</h2>
                      {subInputSchema.description && <p className="form-description"><i>{subInputSchema.description}</i></p>}
                    </div>
                  );
                }
                return (
                    <InputField fieldName={fieldKey} schema={fieldValue} value={formData[fieldKey] || ''} onChange={handleInputChange} />
                );
                
              })}
            </section> 
        ))}
      </form>
    </>
  );
};
export default FormRenderer;


