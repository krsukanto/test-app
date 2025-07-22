
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ROUTE_TITLES: Record<string, string> = {
    '/(tabs)': 'Dashboard',
    '/(tabs)/cash-flow': 'Cash Flow',
    '/(tabs)/budget': 'Budget',
    '/(tabs)/investments': 'Investments',
    '/(tabs)/chatbot': 'Chatbot',
    '/(tabs)/index': 'Dashboard',
};

export default function TopNavigation() {
    const pathname = usePathname();
    const router = useRouter();
    const shouldShowBack = pathname !== '/(tabs)' && pathname !== '/(tabs)/index';

    // Determine the title based on the pathname
    let title = 'Dashboard';
    if (pathname === '/(tabs)/index' || pathname === '/(tabs)') {
        title = 'Dashboard';
    } else {
        // Find the matching route title
        for (const route in ROUTE_TITLES) {
            if (pathname.startsWith(route)) {
                title = ROUTE_TITLES[route];
                break;
            }
        }
    }

    return (
        <View style={styles.header}>
            <View style={styles.leadingContainer}>
                {shouldShowBack && (
                    <Pressable
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={24}
                            color="#141414"
                        />
                    </Pressable>
                )}
            </View>

            <Text style={styles.title}>{title}</Text>

            {/* Empty view for alignment */}
            <View style={styles.trailingContainer} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingHorizontal: 16,
    },
    leadingContainer: {
        width: 48,
    },
    trailingContainer: {
        width: 48,
    },
    backButton: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontFamily: 'quicksand-bold',
        color: '#141414',
        flex: 1,
        textAlign: 'center',
    },
});
