//app/(tabs)/budget.tsx
import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BudgetCategories = [
    { icon: 'food', label: 'Food & Dining', spent: 450, budget: 600 },
    { icon: 'home', label: 'Housing', spent: 1200, budget: 1500 },
    { icon: 'car', label: 'Transportation', spent: 300, budget: 400 },
    { icon: 'shopping', label: 'Shopping', spent: 250, budget: 300 },
    { icon: 'medical-bag', label: 'Healthcare', spent: 150, budget: 200 },
    { icon: 'gamepad-variant', label: 'Entertainment', spent: 180, budget: 200 },
];

function BudgetScreen() {
    return (
        <ScrollView className="flex-1 bg-white">
            <View className="p-4">
                <View className="bg-gray-100 rounded-xl p-4 mb-4">
                    <Text className="font-quicksand-medium text-base text-gray-800">Total Budget</Text>
                    <Text className="font-quicksand-bold text-3xl text-gray-800 mb-2">$3,200</Text>
                    <View className="flex-row items-center">
                        <Text className="font-quicksand text-base text-gray-500">Spent: </Text>
                        <Text className="font-quicksand-medium text-base text-gray-800">$2,530</Text>
                    </View>
                </View>

                {BudgetCategories.map((category) => (
                    <Pressable
                        key={category.label}
                        className="flex-row items-center bg-gray-100 rounded-xl p-4 mb-4"
                    >
                        <View className="w-12 h-12 bg-gray-100 rounded-lg items-center justify-center">
                            <MaterialCommunityIcons
                                name={category.icon}
                                size={24}
                                color="#181C2E"
                            />
                        </View>
                        <View className="flex-1 ml-4">
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="font-quicksand-medium text-base text-gray-800">
                                    {category.label}
                                </Text>
                                <Text className="font-quicksand-medium text-base text-gray-800">
                                    ${category.spent}/{category.budget}
                                </Text>
                            </View>
                            <View className="h-2 bg-white rounded-full overflow-hidden">
                                <View
                                    className="h-full bg-primary rounded-full"
                                    style={{ width: `${(category.spent / category.budget) * 100}%` }}
                                />
                            </View>
                        </View>
                    </Pressable>
                ))}
            </View>
        </ScrollView>
    );
}

export default BudgetScreen;
