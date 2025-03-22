'use client';

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="h-10 m-1 px-4 py-2 text-sm dark:bg-black dark:text-red text-white rounded"
        >
            Logout
        </button>
    );
}