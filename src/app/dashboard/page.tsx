import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/authOptions"; // Adjust path if needed
import { redirect } from "next/navigation"; // For server redirects
import Dashboard from "@/components/Dashboard"; // Or wherever your component lives

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin"); // Or your custom sign-in route
    }

    return <Dashboard />;
}