"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useParams } from 'next/navigation';

export default function UploadPage() {
    const params = useParams();
    const formName = params?.formName;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [responseData, setResponseData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedFile) {
            setErrorMessage("No file selected");
            return;
        }
        setErrorMessage("");
        setResponseData(null);

        // Create a FormData instance and append the file
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            await fetch(`/api/uploadHandler?formName=${formName}`, {
                method: "POST",
                body: formData,
            });
            window.location.href = `/form/${formName}`; // Navigate client-side
            /*    
            if (!res.ok) {
                const errorRes = await res.json();
                setErrorMessage(errorRes.error || "Upload failed");
                return;
            }
            const json = await res.json();
            setResponseData(json);
            */
        } catch (error: any) {
            console.error("Error during upload", error);
            setErrorMessage("An error occurred during upload.");
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Upload a pay stub</h1>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-4"
            >
                <div>
                    <label
                        htmlFor="file"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Upload a Pay stub
                    </label>
                    <input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Upload
                </button>
            </form>

            {errorMessage && (
                <div className="mt-4 text-red-600">
                    <p>{errorMessage}</p>
                </div>
            )}

            {responseData && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2">Response JSON</h2>
                    <pre className="bg-gray-50 p-4 rounded border border-gray-200">
                        {JSON.stringify(responseData, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}