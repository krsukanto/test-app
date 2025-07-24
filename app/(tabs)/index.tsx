import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';

interface Transaction {
    type: string;
    date: string;
    amount: number;
    description: string;
    predictedCategory: string;
}

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Format date string to readable format with fallback for invalid dates
    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'N/A';
        }
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    // Format amount as currency
    function formatAmount(amount: number): string {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    }

    // Optional: color coding for predicted category
    function categoryColor(category: string | undefined): string {
        if (!category) {
            return 'text-gray-100';
        }
        switch (category.toLowerCase()) {
            case 'food':
                return 'text-green-600';
            case 'transport':
                return 'text-blue-600';
            case 'entertainment':
                return 'text-purple-600';
            case 'bills':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    }

    interface PieData {
        name: string;
        population: number;
        color: string;
        legendFontColor: string;
        legendFontSize: number;
    }

    // Calculate data for pie charts
    function calculatePieData(): { pieDataCount: PieData[]; pieDataAmount: PieData[]; pieDataByCategory: PieData[] } {
        let debitCount = 0;
        let creditCount = 0;
        let debitAmount = 0;
        let creditAmount = 0;

        transactions.forEach((t) => {
            if (t.type.toLowerCase() === 'debit') {
                debitCount++;
                debitAmount += t.amount;
            } else if (t.type.toLowerCase() === 'credit') {
                creditCount++;
                creditAmount += t.amount;
            }
        });

        const pieDataCount: PieData[] = [
            {
                name: 'Debit',
                population: debitCount,
                color: '#f87171', // red-400
                legendFontColor: '#333',
                legendFontSize: 14,
            },
            {
                name: 'Credit',
                population: creditCount,
                color: '#60a5fa', // blue-400
                legendFontColor: '#333',
                legendFontSize: 14,
            },
        ];

        const pieDataAmount: PieData[] = [
            {
                name: 'Debit',
                population: debitAmount,
                color: '#f87171',
                legendFontColor: '#333',
                legendFontSize: 14,
            },
            {
                name: 'Credit',
                population: creditAmount,
                color: '#60a5fa',
                legendFontColor: '#333',
                legendFontSize: 14,
            },
        ];

        // New pie data categorized by predictedCategory and amount
        const categoryMap: { [key: string]: number } = {};
        transactions.forEach((t) => {
            const category = t.predictedCategory || 'Unknown';
            if (!categoryMap[category]) {
                categoryMap[category] = 0;
            }
            categoryMap[category] += t.amount;
        });

        const colors = ['#f87171', '#60a5fa', '#34d399', '#a78bfa', '#fbbf24', '#f472b6', '#60a5fa'];

        const pieDataByCategory: PieData[] = Object.entries(categoryMap).map(([name, amount], index) => ({
            name,
            population: amount,
            color: colors[index % colors.length],
            legendFontColor: '#333',
            legendFontSize: 14,
        }));

        return { pieDataCount, pieDataAmount, pieDataByCategory };
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

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-white">
                <Text className="text-red-500">Error: {error}</Text>
            </SafeAreaView>
        );
    }

    const { pieDataCount, pieDataAmount, pieDataByCategory } = calculatePieData();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView>
                <View className="flex-row justify-around p-4">
                    <View>
                        <Text className="text-center font-semibold mb-2">Debit vs Credit (Count)</Text>
                        <PieChart
                            data={pieDataCount}
                            width={screenWidth / 2.2}
                            height={220}
                            chartConfig={{
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            }}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            absolute
                        />
                    </View>
                    <View>
                        <Text className="text-center font-semibold mb-2">Categories (Amount)</Text>
                        <PieChart
                            data={pieDataByCategory}
                            width={screenWidth / 2.2}
                            height={220}
                            chartConfig={{
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            }}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            absolute
                        />
                    </View>
                </View>
                <ScrollView horizontal className="p-4">
                    {transactions.length === 0 ? (
                        <Text className="text-center text-gray-500">No transactions found.</Text>
                    ) : (
                        <View className="min-w-full border border-gray-300 rounded-lg bg-white shadow-md">
                            <View className="flex-row bg-gray-100 border-b border-gray-300 sticky top-0 z-10">
                                <Text className="w-2/12 p-4 font-semibold border-r border-gray-300">Type</Text>
                                <Text className="w-2/12 p-4 font-semibold border-r border-gray-300">Date</Text>
                                <Text className="w-2/12 p-4 font-semibold border-r border-gray-300">Amount</Text>
                                <Text className="w-3/12 p-4 font-semibold border-r border-gray-300">Description</Text>
                                <Text className="w-3/12 p-4 font-semibold">Predicted Category</Text>
                            </View>
                            {transactions.map((item, index) => (
                                <View
                                    key={index}
                                    className={`flex-row border-b border-gray-300 ${
                                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    }`}
                                >
                                    <Text className="w-2/12 p-4 border-r border-gray-300">{item.type}</Text>
                                    <Text className="w-2/12 p-4 border-r border-gray-300">{formatDate(item.date)}</Text>
                                    <Text className="w-2/12 p-4 border-r border-gray-300">{formatAmount(item.amount)}</Text>
                                    <Text className="w-3/12 p-4 border-r border-gray-300">{item.description}</Text>
                                    <Text className={`w-3/12 p-4 ${categoryColor(item.predictedCategory)}`}>{item.predictedCategory}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
}
