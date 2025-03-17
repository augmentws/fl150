'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [selectedForm, setSelectedForm] = useState('default');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if(value !== "default"){
    setSelectedForm(value);
    }
  };
  useEffect(() => {

    if (selectedForm !== "default") {
        if(window.location.pathname !== `/form/${selectedForm}`)
          router.push(`/form/${selectedForm}`);
      }
  }, [selectedForm, router]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center sm:items-start">
        <div className="text-center">
          <h1>Hi! What form can I help you with today?</h1>
          <select className="mt-4 p-2 border border-gray-300 rounded-md" value={selectedForm} onChange={handleChange}>
            <option value="default" disabled hidden>Select a form</option>
            <option value="fl150" >FL 150</option>
            <option value="other" >Other</option>
          </select>
        </div>

      </main>

    </div>
  );
}

