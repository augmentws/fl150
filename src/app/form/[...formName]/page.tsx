import fs from 'fs';
import path from 'path';

import { notFound } from 'next/navigation';
import FormRenderer from '@/app/components/FormRenderer';
import Link from 'next/link';
import { schemas, SchemaNames } from '@/schemas';

interface PageProps {
  params: {
    formName: string[];
  };
}
export default async function Page({ params }: PageProps) {
  const formName = await params.formName?.[0] ;

    if (!formName || !Object.keys(schemas).includes(formName)) {
        return notFound();
      }
      
  const schema = schemas[formName as SchemaNames];
  
  if (!schema) {
    return notFound();
  }

  return (
    <div>
      <Link href="/">
        Home
      </Link>
      <FormRenderer schema={schema} />
    </div>
  );
  
}