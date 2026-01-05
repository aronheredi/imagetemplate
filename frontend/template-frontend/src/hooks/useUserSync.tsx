import type { dbUser } from "@/types/user";
import { useEffect, useState } from "react"
import { useAuth } from "./useAuth";

export const useUserSync = () => {
    const { user, isAuthenticated } = useAuth();
    const [dbUser, setDbUser] = useState<dbUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const syncUserWithBackend = async () => {
            if (isAuthenticated && user) {
                try {
                    setLoading(true);
                    // User is already synced from JWT token
                    setDbUser(user as dbUser);
                } catch (error) {
                    console.error('Error syncing user with backend:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }
        syncUserWithBackend();
    }, [isAuthenticated, user]);
    return { dbUser, loading };
}