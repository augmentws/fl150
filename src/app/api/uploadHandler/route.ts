import { NextResponse } from 'next/server';
import { join } from 'path';
import payStub from '../../../schemas/paystub.json';
import { GEMINI_BASE_URL, GEMINI_MODEL_PATH, GEMINI_MODEL, gemini_headers } from '../config';
import { parseFileUpload } from '../../../utils/parseFileUpload';
import { getUploadUrl, uploadFileToLocation } from '../../../utils/uploadFile';
import { prepareModelRequest } from '../../../utils/prepareModelRequest';
import { parseModelResponse } from '../../../utils/parseModelResponse';
import { getSession } from '../../../utils/session'; 
import type {SessionData } from '../../../utils/session';
import {processPayData} from '../../../utils/payStubProcessor';
import { IronSession } from 'iron-session';


// Optional: Configure runtime if needed
export const config = {
  runtime: 'nodejs',
};

export async function POST(request: Request) {
  try {
    // Parse the uploaded file. Note: You'll need to update parseFileUpload to work with Request.
    const session: IronSession<SessionData> = await getSession();
    const file = await parseFileUpload(request);
    
    const fileMime = file.type ?? 'application/octet-stream';
    let uploadUrl;
    try {
      uploadUrl = await getUploadUrl(file, fileMime);
    } catch (error: any) {
      console.error('Upload URL error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    let fileName;
    try {
      fileName = await uploadFileToLocation(file, fileMime, uploadUrl);
    } catch (error: any) {
      console.error('File upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    try {
      const updatedPayStub = prepareModelRequest(payStub, fileMime, fileName);
      const queryHeader = new Headers(gemini_headers);
      const path = join(GEMINI_BASE_URL, GEMINI_MODEL_PATH).replace('{MODEL}', GEMINI_MODEL);
      console.log('Upload URL:'+path);
      console.log(updatedPayStub);
      const infoResponse = await fetch(
        path,
        {
          method: 'POST',
          headers: queryHeader,
          body: JSON.stringify(updatedPayStub),
        }
      );
      if (!infoResponse.ok) {
        throw new Error(
          `Failed to submit file info. Status: ${infoResponse.status} ${infoResponse.statusText}`
        );
      }
      
      const infoData = await infoResponse.json();
      let formData = parseModelResponse(infoData);
      formData = processPayData(formData);
      
      session.payData = formData;
      await session.save();
      return NextResponse.json({ message: 'Upload successful' }, { status: 200 });

    } catch (error: any) {
      console.error('Submit file info error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
  } catch (error: any) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}