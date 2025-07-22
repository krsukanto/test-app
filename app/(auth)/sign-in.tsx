// app/(auth)/sign-in.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import {Link, Redirect, useRouter} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SignInScreen() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // If authenticated, redirect to the dashboard
    if (isAuthenticated) {
        return <Redirect href="/(tabs)" />;
    }

    const handleLogin = async () => {
        try {
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };


    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 justify-between">
                <View>
                    <View className="flex-row items-center p-4 pb-2 justify-between">
                        <Pressable
                            onPress={() => router.back()}
                            className="h-12 w-12 items-center justify-center"
                        >
                            <MaterialCommunityIcons name="arrow-left" size={24} color="#141414" />
                        </Pressable>

                        <Text className="flex-1 text-center text-lg font-quicksand-bold text-dark-100 pr-12">
                            Login
                        </Text>
                    </View>

                    <View className="max-w-[480px] px-4 py-3">
                        <TextInput
                            placeholder="Email"
                            value={formData.email}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="w-full h-14 bg-white-100 rounded-xl px-4 text-base font-quicksand text-dark-100"
                            placeholderTextColor="#757575"
                        />
                    </View>

                    <View className="max-w-[480px] px-4 py-3">
                        <TextInput
                            placeholder="Password"
                            value={formData.password}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                            secureTextEntry
                            className="w-full h-14 bg-white-100 rounded-xl px-4 text-base font-quicksand text-dark-100"
                            placeholderTextColor="#757575"
                        />
                    </View>

                    <View className="px-4 py-3">
                        <Pressable
                            onPress={handleLogin}
                            className="h-14 bg-primary rounded-xl items-center justify-center"
                        >
                            <Text className="text-base font-quicksand-bold text-white">
                                Sign In
                            </Text>
                        </Pressable>
                    </View>
                </View>

                <View className="flex-row justify-center items-center p-4">
                    <Text className="font-quicksand text-gray-100">
                        Don't have an account?{' '}
                    </Text>
                    <Link href="/sign-up" asChild>
                        <Pressable>
                            <Text className="font-quicksand-bold text-primary">
                                Sign Up
                            </Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
}
