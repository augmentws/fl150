'use client';
import { useState } from 'react';

export default function FileUploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploadStatus('Uploading...');
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        if (data.success) {
            setUploadStatus('Upload successful!');
        } else {
            setUploadStatus(`Upload failed: ${data.error}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload File</button>
            <p>{uploadStatus}</p>
        </form>
    );
}