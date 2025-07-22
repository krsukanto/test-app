// app/(auth)/forgot-password.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from '@/components/icons';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        // TODO: Implement password reset logic
        console.log('Reset password for:', email);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center p-4 pb-2 justify-between">
                <Pressable
                    onPress={() => router.back()}
                    className="h-12 w-12 items-center justify-center"
                >
                    <ArrowLeft size={24} color="#141414" />
                </Pressable>

                <Text className="flex-1 text-center text-lg font-bold tracking-tight text-[#141414] pr-12">
                    Reset Password
                </Text>
            </View>

            <View className="max-w-[480px] px-4 py-3">
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="w-full h-14 bg-[#f2f2f2] rounded-xl px-4 text-base text-[#141414] placeholder:text-[#757575]"
                    placeholderTextColor="#757575"
                />
            </View>

            <View className="px-4 py-3">
                <Pressable
                    onPress={handleResetPassword}
                    className="h-12 max-w-[480px] rounded-full bg-white border border-[#141414] items-center justify-center"
                >
                    <Text className="text-[#141414] text-base font-bold tracking-[0.015em]">
                        Reset Password
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
