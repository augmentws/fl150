import { InputSchema, Section } from '../types';

/**
 * Builds enriched sections from a schema and prefill data.
 *
 * @param schema The input schema that defines the form structure.
 * @param prefill Optional prefill data to populate default values.
 * @returns An array of sections enriched with default values.
 */
export function buildSectionsFromSchema(
  schema: { properties: Record<string, any> },
  prefill: Record<string, any> = {}
): Section[] {
  const sections: Section[] = [];

  for (const [key, value] of Object.entries(schema.properties)) {
    const inputSchema = value as InputSchema;
    const prefillValue = prefill?.[key];

    if (inputSchema.type === 'object' && inputSchema.properties) {
      if (inputSchema.displayType === 'Section') {
        const enrichedProperties: Record<string, InputSchema> = {};

        for (const [subKey, subSchema] of Object.entries(inputSchema.properties)) {
          const subPrefillValue = prefill?.[subKey];

          enrichedProperties[subKey] = {
            ...subSchema,
            defaultValue: subPrefillValue !== undefined ? subPrefillValue : undefined,
          };
        }

        sections.push({
          label: inputSchema.label,
          description: inputSchema.description || '',
          properties: enrichedProperties,
        });
      }
    } else {
      sections.push({
        label: inputSchema.label || key,
        properties: {
          [key]: {
            ...inputSchema,
            defaultValue: prefillValue !== undefined ? prefillValue : undefined,
          },
        },
      });
    }
  }

  return sections;
}