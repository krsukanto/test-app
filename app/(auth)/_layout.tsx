import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import useAuthStore from '../../store/auth.store';

export default function AuthLayout() {
    const { isAuthenticated, isLoading } = useAuthStore();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace('/(tabs)');
        }
    }, [isAuthenticated, isLoading]);

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'white' },
            }}
        />
    );
}
