"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase/client"

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Sign out from Firebase client
            await signOut(auth);

            // Clear the session cookie client-side
            document.cookie = "__session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            toast.success("Logged out successfully");

            // Navigate without full page reload
            router.push("/sign-in");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to logout");
        }
    };

    return (
        <Button
        className="cursor-pointer"
            onClick={handleLogout}
            variant="outline"
            size="sm"
        >
            Logout
        </Button>
    );
};

export default LogoutButton;
