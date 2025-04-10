export const GEMINI_BASE_URL ='https://generativelanguage.googleapis.com';
export const GEMINI_FILES_PATH ='/upload/v1beta/files';
export const GEMINI_MODEL_PATH ='/v1beta/models/{MODEL}:generateContent';
export const GEMINI_MODEL ='gemini-2.0-flash';

export const gemini_headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-goog-api-key': process.env.GEMINI_API_KEY as string
  });
  