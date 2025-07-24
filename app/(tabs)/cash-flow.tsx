import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

interface Transaction {
    type: string;
    date: string;
    amount: number;
    description: string;
    "Predicted Category": string;
}

export default function CashFlowScreen() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedFilter, setSelectedFilter] = useState('All');

    // Format date string to readable format with fallback for invalid dates
    function formatDate(dateString: string): string {
        if (!dateString) {
            return 'N/A';
        }

        let date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            return date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });
        }

        const parts = dateString.split('-');
        if (parts.length === 3) {
            let day = parseInt(parts[0], 10);
            let month = parseInt(parts[1], 10) - 1;
            let year = parseInt(parts[2], 10);
            if (year < 100) {
                year += year >= 70 ? 1900 : 2000;
            }
            date = new Date(year, month, day);
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                });
            }
        }

        return 'N/A';
    }

    // Format amount as currency
    function formatAmount(amount: number): string {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    }

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            async function fetchTransactions() {
                try {
                    const response = await fetch('https://my-budget-app-4070447009.us-central1.run.app/transactions');
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    if (isActive) {
                        setTransactions(data);
                        setError(null);
                    }
                } catch (err) {
                    const error = err as Error;
                    if (isActive) {
                        setError(error.message);
                    }
                } finally {
                    if (isActive) {
                        setLoading(false);
                    }
                }
            }
            fetchTransactions();
            return () => {
                isActive = false;
            };
        }, [])
    );

    const filters = ['All', 'Income', 'Expenses'];

    const renderFilter = (filter: string) => (
        <TouchableOpacity
            key={filter}
            style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonSelected,
            ]}
            onPress={() => setSelectedFilter(filter)}
        >
            <Text
                style={[
                    styles.filterText,
                    selectedFilter === filter && styles.filterTextSelected,
                ]}
            >
                {filter}
            </Text>
        </TouchableOpacity>
    );

    const renderTransaction = ({ item }: { item: Transaction }) => (
        <View style={styles.transactionRow}>
            <View style={styles.transactionInfo}>
                <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
                <Text style={styles.transactionCategory}>Predicted: {item["Predicted Category"]}</Text>
            </View>
            <View>
                <Text style={[styles.transactionAmount, item.amount < 0 ? styles.amountNegative : styles.amountPositive]}>
                    {item.amount < 0 ? '-' : '+'}{formatAmount(Math.abs(item.amount))}
                </Text>
            </View>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <Text style={styles.sectionTitle}>Filters</Text>
                <View style={styles.filtersContainer}>
                    {filters.map(renderFilter)}
                </View>
                <View style={styles.dropdownContainer}>
                    <TouchableOpacity style={styles.dropdownButton}>
                        <Text style={styles.dropdownText}>Date</Text>
                        <Text style={styles.caretDown}>▼</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownButton}>
                        <Text style={styles.dropdownText}>Category</Text>
                        <Text style={styles.caretDown}>▼</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={transactions.filter((t) => {
                        if (selectedFilter === 'All') return true;
                        if (selectedFilter === 'Income') return t.type.toLowerCase() === 'credit';
                        if (selectedFilter === 'Expenses') return t.type.toLowerCase() === 'debit';
                        return true;
                    })}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderTransaction}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    scrollEnabled={false}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8fafc',
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0d151c',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    filtersContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
    filterButton: {
        backgroundColor: '#e7edf4',
        borderRadius: 9999,
        paddingHorizontal: 16,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    filterButtonSelected: {
        backgroundColor: '#cbd5e1',
    },
    filterText: {
        color: '#0d151c',
        fontSize: 14,
        fontWeight: '500',
    },
    filterTextSelected: {
        fontWeight: '700',
    },
    dropdownContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingBottom: 12,
        gap: 12,
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e7edf4',
        borderRadius: 9999,
        paddingHorizontal: 16,
        height: 32,
        justifyContent: 'center',
        gap: 6,
    },
    dropdownText: {
        color: '#0d151c',
        fontSize: 14,
        fontWeight: '500',
    },
    caretDown: {
        color: '#0d151c',
        fontSize: 12,
    },
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8fafc',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e7edf4',
        alignItems: 'center',
    },
    transactionInfo: {
        flexDirection: 'column',
    },
    transactionDate: {
        color: '#0d151c',
        fontSize: 16,
        fontWeight: '600',
    },
    transactionCategory: {
        color: '#49749c',
        fontSize: 14,
        fontWeight: '400',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: '400',
    },
    amountPositive: {
        color: '#0d151c',
    },
    amountNegative: {
        color: '#0d151c',
    },
});
