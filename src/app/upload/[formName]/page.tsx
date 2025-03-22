import UploadPage from './uploadPage';
type Props = {
    params: Promise<{ formName: string }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props) {
    const resolvedParams = await params; // Await it!
    return {
        title: `Upload Form - ${resolvedParams.formName}`,
    };
}
console.log()
export default async function Page() {
    return <UploadPage />;
}