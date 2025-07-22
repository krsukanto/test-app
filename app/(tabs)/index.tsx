import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useAuthStore from '../../store/auth.store';  // Updated import path
import clsx from 'clsx';


const { width } = Dimensions.get('window');

export default function DashboardScreen() {
    const { user } = useAuthStore();
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const profitData = [80, 60, 10, 40, 40, 50, 70];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView>
                <View className="flex-row items-center bg-white p-4 pb-2 justify-between">
                    <View className="w-12 h-12 justify-center items-center">
                        <Image
                            source={{
                                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQSTLOMg2AHz1JGAF7OUnRKDwI8hzldzZ6dv3XF56HsFevrP2NoEE6Bi13qYfUrPLT4CaqFl9zwvs-LzuP0feXWNuD4EjvdYFQ9P3wjNpLCludMmpZpVDsVbjk5cNGonRn7wMnJqy_dytcongU3lCbQ2ZGtEIL7EOkxG4sv49NiWsCtacf6H79hacIaZC_-nsRj2e7hui95XyvW6br20ByA1pbtBD9ZgP_KF04AnP_aLIS6W03xtrjXw-Yat-XNBkP2WlOIP9ekjsC"
                            }}
                            className="w-8 h-8 rounded-full"
                        />
                    </View>
                    <Text className="font-quicksand-bold text-lg text-dark-100 flex-1 text-center pr-12">
                        Dashboard
                    </Text>
                </View>

                <Text className="font-quicksand-bold text-[22px] text-dark-100 px-4 pb-3 pt-5">
                    Revenue
                </Text>

                <View className="px-4 py-6">
                    <View className="min-w-72 flex-1">
                        <Text className="font-quicksand-medium text-base text-dark-100">Total Income</Text>
                        <Text className="font-quicksand-bold text-[32px] text-dark-100">$12,500</Text>
                        <View className="flex-row gap-1 mb-4">
                            <Text className="font-quicksand text-base text-gray-100">Last Year</Text>
                            <Text className="font-quicksand-medium text-base text-success">+15%</Text>
                        </View>

                        <LineChart
                            data={{
                                labels: monthLabels,
                                datasets: [{
                                    data: [21, 41, 93, 33, 101, 61, 45]
                                }]
                            }}
                            width={width - 32}
                            height={180}
                            chartConfig={{
                                backgroundColor: '#ffffff',
                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#ffffff',
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(135, 135, 135, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForBackgroundLines: {
                                    strokeDasharray: []
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                </View>

                <Text className="font-quicksand-bold text-[22px] text-dark-100 px-4 pb-3 pt-5">
                    Budget
                </Text>

                <View className="p-4">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="font-quicksand-medium text-base text-dark-100">Spending</Text>
                        <Text className="font-quicksand text-sm text-dark-100">750</Text>
                    </View>
                    <View className="h-2 bg-white-100 rounded-full overflow-hidden">
                        <View className="h-full bg-dark-100 rounded-full" style={{ width: '75%' }} />
                    </View>
                    <Text className="font-quicksand text-sm text-gray-100 mt-3">Remaining</Text>
                </View>

                <Text className="font-quicksand-bold text-[22px] text-dark-100 px-4 pb-3 pt-5">
                    Balances
                </Text>

                {['Checking', 'Savings'].map((type, index) => (
                    <View key={type} className="flex-row items-center gap-4 px-4 py-2 min-h-[72px]">
                        <View className="w-12 h-12 bg-white-100 rounded-lg items-center justify-center">
                            <MaterialCommunityIcons name="bank" size={24} color="#181C2E" />
                        </View>
                        <View>
                            <Text className="font-quicksand-medium text-base text-dark-100">
                                ${type === 'Checking' ? '5,200' : '10,500'}
                            </Text>
                            <Text className="font-quicksand text-sm text-gray-100">{type}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
