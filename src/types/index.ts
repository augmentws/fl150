
export interface InputSchema {
  type: string;
  description?: string;
  properties?: Properties;
  items?: {
      properties?: Properties
  };

  displayType?: string;
  label: string;
}
export type Properties = {
  [key: string]: InputSchema;
};


export interface Section {
  label: string;
  properties: Properties;
  description?: string;
}
export interface FormSchema extends Schema{
  title?: string;
  description?: string;
}
export interface Schema {
  properties: Properties;
  title?:string;
  $schema: string;
}