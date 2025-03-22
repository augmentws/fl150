export function parseModelResponse(response:any) {
    try {
      // Get the text content inside candidates -> content -> parts[0] -> text
      const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;
  
      if (!rawText) {
        throw new Error('No text content found in the response.');
      }
  
      // Extract the JSON inside the ```json ... ``` block
      const jsonMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/);
  
      if (!jsonMatch || jsonMatch.length < 2) {
        throw new Error('No JSON block found inside the text.');
      }
  
      // Parse the extracted JSON string
      const jsonString = jsonMatch[1];
      const parsedJson = JSON.parse(jsonString);
  
      return parsedJson;
    } catch (error: any) {
      console.error('Failed to extract and parse JSON:', error.message);
      return null;
    }
  }