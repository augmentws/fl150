'use-client'
import { useSession, signIn, signOut } from "next-auth/react";

export default function Dashboard() {
    const { data: session } = useSession();

    if (!session) {
        return <button onClick={() => signIn()}>Sign in</button>;
    }

    return (
        <div>
            <p>Signed in as {session.user?.email}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
}