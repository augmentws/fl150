export function prepareModelRequest(payStubJson: any, mime: string, id: string): any {
    const fileData = payStubJson?.contents?.[0]?.parts?.[0]?.file_data;
    if (fileData) {
      fileData.mime_type = mime;
      if (typeof fileData.file_uri === 'string') {
        fileData.file_uri = fileData.file_uri.replace('{id}', id);
      }
    }
    console.log("AI Request: \n"+payStubJson);
    return payStubJson;
  }