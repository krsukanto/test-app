import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Investments = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        shares: 10,
        price: 182.52,
        change: 1.25,
    },
    {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        shares: 5,
        price: 142.65,
        change: -0.75,
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft Corp.',
        shares: 8,
        price: 338.45,
        change: 2.15,
    },
    {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        shares: 6,
        price: 129.12,
        change: 0.95,
    },
];

function InvestmentsScreen() {
    return (
        <ScrollView className="flex-1 bg-white">
            <View className="p-4">
                <View className="bg-white-100 rounded-xl p-4 mb-6">
                    <Text className="font-quicksand-medium text-base text-dark-100">Portfolio Value</Text>
                    <Text className="font-quicksand-bold text-3xl text-dark-100 mb-2">$25,430.82</Text>
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons
                            name="trending-up"
                            size={20}
                            color="#078807"
                        />
                        <Text className="font-quicksand-medium text-base text-success ml-1">+2.5%</Text>
                        <Text className="font-quicksand text-base text-gray-100 ml-2">Today</Text>
                    </View>
                </View>

                {Investments.map((investment) => (
                    <Pressable
                        key={investment.symbol}
                        className="bg-white-100 rounded-xl p-4 mb-4"
                    >
                        <View className="flex-row justify-between items-center mb-2">
                            <View>
                                <Text className="font-quicksand-bold text-base text-dark-100">
                                    {investment.symbol}
                                </Text>
                                <Text className="font-quicksand text-sm text-gray-100">
                                    {investment.name}
                                </Text>
                            </View>
                            <View className="items-end">
                                <Text className="font-quicksand-medium text-base text-dark-100">
                                    ${investment.price.toFixed(2)}
                                </Text>
                                <Text
                                    className={`font-quicksand-medium text-sm ${
                                        investment.change >= 0 ? 'text-success' : 'text-error'
                                    }`}
                                >
                                    {investment.change >= 0 ? '+' : ''}{investment.change}%
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="font-quicksand text-sm text-gray-100">
                                {investment.shares} shares
                            </Text>
                            <Text className="font-quicksand-medium text-sm text-dark-100 ml-4">
                                ${(investment.shares * investment.price).toFixed(2)}
                            </Text>
                        </View>
                    </Pressable>
                ))}
            </View>
        </ScrollView>
    );
}

export default InvestmentsScreen;
