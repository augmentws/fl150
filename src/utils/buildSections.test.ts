import { buildSectionsFromSchema } from './buildSections';

describe('buildSectionsFromSchema', () => {
  it('should build sections with default values from prefill', () => {
    const schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "FL-150 Income and Expense Declaration",
        "description": "JSON Schema representation of the FL-150 form with structured keys and labels.",
        "type": "object",
        "displayType": "Form",
        "properties":
        {
            "employment":
            {
                "type": "object",
                "displayType": "Section",
                "properties":
                {
                    "employer":
                    {
                        "type": "string",
                        "displayType": "Input",
                        "inputType": "text",
                        "description": "Employer Name",
                        "label": "Employer"
                    },
                    "employers_address":
                    {
                        "type": "string",
                        "displayType": "Input",
                        "inputType": "text",
                        "description": "Employer Address",
                        "label": "Employer's address"
                    }
                },
                "required":
                [
                    "employer",
                    "employers_address"
                ],
                "label": "Employment",
                "title": "Employment"
            }
        }
    };

    const prefill = {
      employer: 'Test Corp',
      employers_address: '1234 some place',
    };

    const sections = buildSectionsFromSchema(schema, prefill);
    expect(sections).toEqual([
        {
            "label": "Employment",
            "description": "",
            "properties":
            {
                "employer":
                {
                    "type": "string",
                    "displayType": "Input",
                    "inputType": "text",
                    "description": "Employer Name",
                    "label": "Employer",
                    "defaultValue": "Test Corp"
                },
                "employers_address":
                {
                    "type": "string",
                    "displayType": "Input",
                    "inputType": "text",
                    "description": "Employer Address",
                    "label": "Employer's address",
                    "defaultValue": "1234 some place"
                }
            }
        }
    ]);
  });
});