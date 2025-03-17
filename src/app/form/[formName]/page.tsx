import { notFound } from 'next/navigation';
import FormRenderer from '@/app/components/FormRenderer';
import Link from 'next/link';
import { schemas, SchemaNames } from '@/schemas';

interface PageProps {
  params: {
    formName: string;
  };
}
export default function FormPage({ params }: PageProps) {
  const formName = params.formName;

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