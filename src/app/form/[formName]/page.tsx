import { notFound } from 'next/navigation';
import FormRenderer from '@/components/FormRenderer';
import Link from 'next/link';
import { schemas, SchemaNames } from '@/schemas';
import type { Metadata } from 'next'
 
type Props = {
  params: Promise<{ formName: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export function generateStaticParams() {
  return Object.keys(schemas).map((schemaName) => ({
    formName: schemaName,
  }));
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // read route params
  const { formName } = await params
const schema = schemas[formName];
if (!schema) {
  return {
    title: 'Form Not Found',
    description: `The form "${formName}" does not exist.`,
  };
}
return {
  title: `Fill out the ${schema.title} Form`,
  description: `Complete the ${schema.title} form quickly and easily.`,
};
}

export default async function FormPage({ params }:Props) {
  const { formName } = await params;

  if (!formName || !Object.keys(schemas).includes(formName)) {
    return notFound();
  }

  const schema = schemas[formName as SchemaNames];

  if (!schema) {
    return notFound();
  }

  return (
    <div>
      <FormRenderer schema={schema} />
    </div>
  );
}