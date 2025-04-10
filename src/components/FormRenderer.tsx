"use client"
import React from 'react';
import InputField from './InputField';
import ArrayInputField from './ArrayInputField';
import { InputSchema, Section } from '../types';
import { buildSectionsFromSchema } from '../utils/buildSections';

interface FormData {
  [key: string]: any;
}

interface FormRendererProps {
  schema: any;
  prefill?: Record<string, any>;
}

const FormRenderer: React.FC<FormRendererProps> = ({ schema, prefill = {} }) => {
  console.log("PREFIL\n" + JSON.stringify(prefill, null, 2));
  const [formData, setFormData] = React.useState<FormData>({});
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
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    requestAnimationFrame(() => {
      const headerOffset = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset - 40;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    });
  };

  const sections: Section[] = buildSectionsFromSchema(schema, prefill);

  return (
    <div className="pt-16 flex flex-1 gap-4">
      <aside className="sticky top-16 self-start w-64 flex-shrink-0 border-r p-4">
        <h3 className="font-semibold mb-4">Sections</h3>
        <nav className="space-y-2">
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.label}>
                <a href={`#${section.label}`} className="block hover:text-blue-500" onClick={() => handleNavClick(section.label)}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4 relative">      {/* Left-hand navigation menu */}
        <div>
          {schema.title && <h1 className="text-2xl font-bold mb-4">{schema.title}</h1>}
          {schema.description && <p className="text-gray-600 mb-6 italic">{schema.description}</p>}
          <form>
            {sections.map((section) => (
              <section id={section.label} key={section.label} className="mb-8 mr-4 border p-4 rounded-md shadow-md" >
                {section.label && <h2 className="text-xl font-bold mb-2">{section.label}</h2>}
                {section.description && <div>{section.description}</div>}
                {section.properties && Object.entries(section.properties).map(([fieldKey, fieldValue]) => {
                  let subInputSchema: InputSchema = fieldValue as InputSchema;
                  if (fieldValue.properties) {
                    subInputSchema = fieldValue as InputSchema;

                  }
                  if (subInputSchema.type === 'array' && subInputSchema.items && subInputSchema.items.properties) {
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
                    <InputField key={fieldKey} fieldName={fieldKey} schema={fieldValue} value={formData[fieldKey] ?? fieldValue.defaultValue ?? ''} onChange={handleInputChange} />
                  );

                })}
              </section>
            ))}
          </form>
        </div>
      </main>
    </div>
  );
};
export default FormRenderer;


