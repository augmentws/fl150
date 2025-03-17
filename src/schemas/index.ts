import fl150 from './fl150.json';
import other from './other.json';
import { Schema } from '@/types';

export type SchemaNames = 
    | 'fl150'
    | 'other';

export const schemas: { [key in SchemaNames]: Schema } = {
  fl150: fl150,
  other: other,
};