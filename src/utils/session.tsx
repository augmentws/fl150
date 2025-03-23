import { cookies } from 'next/headers';
import { getIronSession, IronSession } from 'iron-session';
export const sessionOptions = {
    password: process.env.SESSION_SECRET as string,
    cookieName: 'nextjs-session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};

export interface SessionData {
    payData?: Record<string, any>; // or a specific type if you have one
}

export async function getSession(): Promise<IronSession<SessionData>> {
    const cookieStore = await cookies(); // or await cookies(), depending on runtime
    return getIronSession<SessionData>(cookieStore, sessionOptions);
}