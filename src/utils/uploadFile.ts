import { join } from 'path';
import { GEMINI_BASE_URL, GEMINI_FILES_PATH, gemini_headers } from '../app/api/config';

export async function getUploadUrl(file: File, fileMime: string): Promise<string> {
  const fileSize = file.size;
  const fileUrlHeader = new Headers(gemini_headers);
  fileUrlHeader.set('X-Goog-Upload-Header-Content-Length', fileSize.toString());
  fileUrlHeader.set('X-Goog-Upload-Header-Content-Type', fileMime);
  fileUrlHeader.set('X-Goog-Upload-Protocol', 'resumable');
  fileUrlHeader.set('X-Goog-Upload-Command', 'start');
console.log("Sending URL : "+ join(GEMINI_BASE_URL, GEMINI_FILES_PATH))
  const locationResponse = await fetch(join(GEMINI_BASE_URL, GEMINI_FILES_PATH), {
    method: 'POST',
    headers: fileUrlHeader,
  });
  if (!locationResponse.ok) throw new Error('Failed to get upload location');

  for (const [key, value] of locationResponse.headers.entries()) {
    console.log(`${key}: ${value}`);
  }
  const uploadUrl = locationResponse.headers.get('X-Goog-Upload-URL');
  
  if (!uploadUrl) throw new Error('Upload URL header is missing');

  return uploadUrl;
}

export async function uploadFileToLocation(file: File, fileMime: string, uploadUrl: string): Promise<string> {
  const fileSize = file.size;
  const uploadHeader = new Headers(gemini_headers);
  uploadHeader.set('X-Goog-Upload-Header-Content-Length', fileSize.toString());
  uploadHeader.set('Content-Type', fileMime);
  uploadHeader.set('X-Goog-Upload-Offset', '0');
  uploadHeader.set('X-Goog-Upload-Command', 'upload, finalize');

  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);
    const uploadResponse = await fetch(uploadUrl, {
    method: 'POST',
    headers: uploadHeader,
    body: fileBuffer,
  });
  if (!uploadResponse.ok) throw new Error('Failed to upload file');

  const uploadData = await uploadResponse.json();
  const fileName = uploadData.file.name;
  if (!fileName) throw new Error('File name missing in upload response');

  return fileName;
}