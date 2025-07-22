// app/_layout.tsx
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import './globals.css';

export default function RootLayout() {
    // Load your custom fonts here if any, to avoid font-related render errors
    const [fontsLoaded] = useFonts({
        'quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
        'quicksand-medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        'quicksand-bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return null; // Or a splash/loading component
    }

    return (
        <SafeAreaProvider>
            <Slot />
        </SafeAreaProvider>
    );
}
