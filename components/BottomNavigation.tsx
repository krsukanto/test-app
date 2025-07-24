
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { House, Receipt, ChartBar, PresentationChart, Robot } from '@/components/icons';

type TabRoute = {
    path: `/(tabs)${string}`;
    icon: React.ComponentType<{ size: number; color: string }>;
    label: string;
}

const TABS: TabRoute[] = [
    { path: '/(tabs)', icon: House, label: 'Dashboard' },
    { path: '/(tabs)/cash-flow', icon: Receipt, label: 'Transactions' },
    { path: '/(tabs)/budget', icon: ChartBar, label: 'Budget' },
    { path: '/(tabs)/investments', icon: PresentationChart, label: 'Investments' },
    { path: '/(tabs)/chatbot', icon: Robot, label: 'Chatbot' }
];

export default function BottomNavigation() {
    const pathname = usePathname();

    return (
        <View style={styles.tabBar}>
            {TABS.map((tab) => {
                const isActive = pathname === tab.path ||
                    (pathname === '/(tabs)/index' && tab.path === '/(tabs)');
                const Icon = tab.icon;

                return (
                    <Link key={tab.path} href={tab.path} asChild>
                        <Pressable style={styles.tabItem}>
                            <Icon
                                size={24}
                                color={isActive ? '#141414' : '#757575'}
                            />
                            <Text style={[
                                styles.tabText,
                                isActive && styles.tabTextActive
                            ]}>
                                {tab.label}
                            </Text>
                        </Pressable>
                    </Link>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
        paddingVertical: 8,
        backgroundColor: '#ffffff',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#757575',
        marginTop: 4,
    },
    tabTextActive: {
        color: '#141414',
    },
});
