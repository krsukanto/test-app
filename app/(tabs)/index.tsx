import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Path } from 'react-native-svg';

interface Transaction {
    type: string;
    date: string;
    amount: number;
    description: string;
    "Predicted Category": string;
}

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

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

    // Optional: color coding for predicted category
    function categoryColor(category: string | undefined): string {
        if (!category) {
            return '#9ca3af'; // gray-400
        }
        const cat = category.toLowerCase();
        switch (cat) {
            case 'cash inflow':
                return '#15803d'; // green-700
            case 'utilities expense':
            case 'utlities':
                return '#ca8a04'; // yellow-600
            case 'lending':
                return '#4f46e5'; // indigo-600
            case 'entertainment':
                return '#7c3aed'; // purple-600
            case 'salary expense':
                return '#1d4ed8'; // blue-700
            case 'travel':
                return '#db2777'; // pink-600
            case 'misc expense':
            case 'cash outflow':
                return '#b91c1c'; // red-600
            case 'inventory':
                return '#0f766e'; // teal-600
            case 'rental expense':
                return '#db2777'; // pink-600
            default:
                return '#4b5563'; // gray-600
        }
    }

    interface PieData {
        name: string;
        population: number;
        color: string;
        legendFontColor: string;
        legendFontSize: number;
    }

    // Calculate data for pie charts and summary cards
    function calculateData() {
        let totalIncome = 0;
        let totalExpenses = 0;
        let netProfit = 0;

        let debitCount = 0;
        let creditCount = 0;
        let debitAmount = 0;
        let creditAmount = 0;

        // Defensive check: ensure transactions is an array
        const txns = Array.isArray(transactions) ? transactions : [];

        txns.forEach((t) => {
            if (t.type.toLowerCase() === 'debit') {
                debitCount++;
                debitAmount += t.amount;
                totalExpenses += t.amount;
            } else if (t.type.toLowerCase() === 'credit') {
                creditCount++;
                creditAmount += t.amount;
                totalIncome += t.amount;
            }
        });

        netProfit = totalIncome - totalExpenses;

        const pieDataCount: PieData[] = [
            {
                name: 'Debit',
                population: debitCount,
                color: '#f87171',
                legendFontColor: '#333',
                legendFontSize: 14,
            },
            {
                name: 'Credit',
                population: creditCount,
                color: '#60a5fa',
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

        const categoryMap: { [key: string]: number } = {};
        txns.forEach((t) => {
            const category = t["Predicted Category"] || 'Unknown';
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

        return { totalIncome, totalExpenses, netProfit, pieDataCount, pieDataAmount, pieDataByCategory };
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
                        // Defensive check: ensure data is array
                        setTransactions(Array.isArray(data) ? data : []);
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

    function base64ToBlob(base64: string, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(base64);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }

    async function pickImageAndUpload() {
        // Request permission to access media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission required", "Permission to access media library is required!");
            return;
        }

        // Launch image picker
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            base64: true,
        });

        if (pickerResult.canceled) {
            return;
        }

        try {
            setUploading(true);
            setError(null);

            const asset = pickerResult.assets && pickerResult.assets[0];
            if (!asset || !asset.uri) {
                throw new Error('No image selected');
            }
            let blob: Blob;
            let filename = 'photo.jpg';
            if (asset.uri.startsWith('data:')) {
                // base64 data URI
                const base64Data = asset.uri.split(',')[1];
                const contentType = asset.uri.split(';')[0].split(':')[1];
                blob = base64ToBlob(base64Data, contentType);
                filename = `upload.${contentType.split('/')[1] || 'jpg'}`;
            } else {
                // file URI
                let localUri = asset.uri;
                if (!localUri.startsWith('file://')) {
                    localUri = 'file://' + localUri;
                }
                const fileResponse = await fetch(localUri);
                blob = await fileResponse.blob();
                filename = localUri.split('/').pop() || 'photo.jpg';
            }

            const formData = new FormData();
            // @ts-ignore
            formData.append('file', blob, filename);

            // Send POST request to API
            const uploadResponse = await fetch('https://my-budget-app-4070447009.us-central1.run.app/extract-bill-with-document-ai', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    // Do not set Content-Type header; let fetch set it automatically
                },
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error(`Upload failed with status ${uploadResponse.status}`);
            }

            const responseData = await uploadResponse.json();
            Alert.alert("Upload successful", "Image uploaded and processed successfully.");

            // Call predict_file API after successful upload
            try {
                const predictResponse = await fetch('https://my-budget-app-4070447009.us-central1.run.app/predict_file?filename=transactions.csv&folder=database');
                if (!predictResponse.ok) {
                    throw new Error('Prediction API response was not ok');
                }
                const predictData = await predictResponse.json();
                // Optionally handle predictData here
            } catch (predictErr) {
                const error = predictErr as Error;
                console.error('Prediction API call failed:', error.message);
            }

        } catch (err) {
            const error = err as Error;
            setError(error.message);
            Alert.alert("Upload failed", error.message);
        } finally {
            setUploading(false);
        }
    }

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

    const { totalIncome, totalExpenses, netProfit, pieDataCount, pieDataAmount, pieDataByCategory } = calculateData();

    // Calculate percentage changes for summary cards (dummy values for now)
    const incomeChange = '+15%';
    const expensesChange = '-10%';
    const profitChange = '+25%';

    // Helper to get color for change text
    const changeColor = (change: string) => (change.startsWith('+') ? '#078838' : '#e73908');

    // Calculate category percentages dynamically from transactions
    const categoryAmounts: { [key: string]: number } = {};
    let totalCategoryAmount = 0;

    // Defensive check: ensure transactions is an array
    const txns = Array.isArray(transactions) ? transactions : [];

    txns.forEach((t) => {
        const category = t["Predicted Category"] || 'Unknown';
        if (!categoryAmounts[category]) {
            categoryAmounts[category] = 0;
        }
        categoryAmounts[category] += t.amount;
        totalCategoryAmount += t.amount;
    });

    const categoryPercentages: { [key: string]: number } = {};
    Object.entries(categoryAmounts).forEach(([category, amount]) => {
        categoryPercentages[category] = totalCategoryAmount > 0 ? (amount / totalCategoryAmount) * 100 : 0;
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9fafb', paddingVertical: 12, paddingHorizontal: 16, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', color: '#101518' }}>Upload Transactions</Text>
                    <TouchableOpacity
                        style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}
                        onPress={pickImageAndUpload}
                        disabled={uploading}
                    >
                        <Svg width={24} height={24} fill="#101518" viewBox="0 0 24 24">
                            <Path d="M19 15v4H5v-4H3v4a2 2 0 002 2h14a2 2 0 002-2v-4h-2zM12 3l-5 5h3v6h4v-6h3l-5-5z" />
                        </Svg>
                    </TouchableOpacity>
                </View>

                {uploading && (
                    <View style={{ padding: 10, backgroundColor: '#e0e0e0', alignItems: 'center' }}>
                        <Text>Uploading image...</Text>
                    </View>
                )}

                <ScrollView contentContainerStyle={{ padding: 16 }}>
                    {/* Summary Cards */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap' }}>
                        <View style={{ flex: 1, minWidth: 158, backgroundColor: '#eaedf1', borderRadius: 12, padding: 16, marginHorizontal: 4, marginBottom: 8 }}>
                            <Text style={{ color: '#101518', fontSize: 16, fontWeight: '500', marginBottom: 4 }}>Total Income</Text>
                            <Text style={{ color: '#101518', fontSize: 24, fontWeight: '700', marginBottom: 4 }}>{formatAmount(totalIncome)}</Text>
                            <Text style={{ color: changeColor(incomeChange), fontSize: 16, fontWeight: '500' }}>{incomeChange}</Text>
                        </View>
                        <View style={{ flex: 1, minWidth: 158, backgroundColor: '#eaedf1', borderRadius: 12, padding: 16, marginHorizontal: 4, marginBottom: 8 }}>
                            <Text style={{ color: '#101518', fontSize: 16, fontWeight: '500', marginBottom: 4 }}>Total Expenses</Text>
                            <Text style={{ color: '#101518', fontSize: 24, fontWeight: '700', marginBottom: 4 }}>{formatAmount(totalExpenses)}</Text>
                            <Text style={{ color: changeColor(expensesChange), fontSize: 16, fontWeight: '500' }}>{expensesChange}</Text>
                        </View>
                        <View style={{ flex: 1, minWidth: 158, backgroundColor: '#eaedf1', borderRadius: 12, padding: 16, marginHorizontal: 4, marginBottom: 8 }}>
                            <Text style={{ color: '#101518', fontSize: 16, fontWeight: '500', marginBottom: 4 }}>Net Profit</Text>
                            <Text style={{ color: '#101518', fontSize: 24, fontWeight: '700', marginBottom: 4 }}>{formatAmount(netProfit)}</Text>
                            <Text style={{ color: changeColor(profitChange), fontSize: 16, fontWeight: '500' }}>{profitChange}</Text>
                        </View>
                    </View>

                    {/* Predicted Categories Section */}
                    <Text style={{ fontSize: 22, fontWeight: '700', color: '#101518', marginBottom: 12 }}>Predicted Categories</Text>
                    <View style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: 16 }}>
                        <Text style={{ color: '#101518', fontSize: 16, fontWeight: '500', marginBottom: 8 }}>Category Breakdown</Text>
                        <Text style={{ color: '#101518', fontSize: 24, fontWeight: '700', marginBottom: 4 }}>{formatAmount(totalExpenses)}</Text>
                        <Text style={{ color: '#6b7280', fontSize: 14, marginBottom: 12 }}>This Month</Text>
                        {Object.entries(categoryPercentages).map(([category, percent]) => (
                            <View key={category} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <Text style={{ color: '#6b7280', fontSize: 13, fontWeight: '700', width: 80 }}>{category}</Text>
                                <View style={{ flex: 1, height: 20, backgroundColor: '#eaedf1', borderRadius: 4, overflow: 'hidden' }}>
                                    <View style={{ width: `${percent}%`, height: '100%', backgroundColor: '#5c748a', borderRightWidth: 2, borderRightColor: '#eaedf1' }} />
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
