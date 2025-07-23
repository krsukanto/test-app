import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ROUTE_TITLES: Record<string, string> = {
    '/': 'Dashboard',
    '/cash-flow': 'Cash Flow',
    '/budget': 'Budget',
    '/investments': 'Investments',
    '/chatbot': 'Chatbot',
    '/index': 'Dashboard',
};

export default function TopNavigation() {
    const pathname = usePathname();
    const router = useRouter();

    const shouldShowBack = pathname !== '/' && pathname !== '/index';

    // Normalize pathname by removing trailing slash if present (except root '/')
    const normalizedPathname = pathname && pathname !== '/' && pathname.endsWith('/')
        ? pathname.slice(0, -1)
        : pathname;

    // Find matched route key by matching normalized pathname with route keys
    const matchedRoute = Object.keys(ROUTE_TITLES)
        .filter((route) => normalizedPathname && normalizedPathname.startsWith(route))
        .sort((a, b) => b.length - a.length)[0];

    const title = matchedRoute ? ROUTE_TITLES[matchedRoute] : '';

    return (
        <View style={styles.header}>
            <View style={styles.leadingContainer}>
                {shouldShowBack && (
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <MaterialCommunityIcons name="chevron-left" size={24} color="#141414" />
                    </Pressable>
                )}
            </View>
            <Text style={styles.title}>{title}</Text>
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
