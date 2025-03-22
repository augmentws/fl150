
export async function parseFileUpload(req: Request): Promise<File> {
    // Get the multipart form data from the request.
    const formData = await req.formData();
    // Get the file associated with the field name "file".
    const file = formData.get('file');
    if (!file) {
      throw new Error('No file uploaded');
    }
    // Check that the value is an instance of File.
    if (!(file instanceof File)) {
      throw new Error('Uploaded data is not a file');
    }
    return file;
  }