// import {View, Text, Button, Alert} from 'react-native'
// import {Link, router} from "expo-router";
// import CustomInput from "@/components/CustomInput";
// import CustomButton from "@/components/CustomButton";
// import {useState} from "react";
// import {createUser} from "@/lib/appwrite";
//
// const SignUp = () => {
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [form, setForm] = useState({ name: '', email: '', password: '' });
//
//     const submit = async () => {
//         const { name, email, password } = form;
//
//         if(!name || !email || !password) return Alert.alert('Error', 'Please enter valid email address & password.');
//
//         setIsSubmitting(true)
//
//         try {
//             await createUser({ email,  password,  name });
//
//             router.replace('/');
//         } catch(error: any) {
//             Alert.alert('Error', error.message);
//         } finally {
//             setIsSubmitting(false);
//         }
//     }
//
//     return (
//         <View className="gap-10 bg-white rounded-lg p-5 mt-5">
//             <CustomInput
//                 placeholder="Enter your full name"
//                 value={form.name}
//                 onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
//                 label="Full name"
//             />
//             <CustomInput
//                 placeholder="Enter your email"
//                 value={form.email}
//                 onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
//                 label="Email"
//                 keyboardType="email-address"
//             />
//             <CustomInput
//                 placeholder="Enter your password"
//                 value={form.password}
//                 onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
//                 label="Password"
//                 secureTextEntry={true}
//             />
//
//             <CustomButton
//                 title="Sign Up"
//                 isLoading={isSubmitting}
//                 onPress={submit}
//             />
//
//             <View className="flex justify-center mt-5 flex-row gap-2">
//                 <Text className="base-regular text-gray-100">
//                     Already have an account?
//                 </Text>
//                 <Link href="/sign-in" className="base-bold text-primary">
//                     Sign In
//                 </Link>
//             </View>
//         </View>
//     )
// }
//
// export default SignUp

// app/(auth)/sign-up.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const handleCreateAccount = () => {
        // TODO: Implement account creation logic
        console.log('Create account with:', formData);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 justify-between">
                <View>
                    <View className="px-4 py-3">
                        <Image
                            source={{
                                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXE8GjqMJMrtbgadSzoirK8UB9fAgsppUTpZr6wMdQI5keuG_qIsh7gDEKggqY2OqVlhuI2ZtjcmAqmZxblAK2CGv8rwif4LN79oaw8BmR0WG1XhQpp26pym8fmjK4WmeD34lyE9-ck5pJ5f8wcOA3ynZzsMNS2iCraabE-KXpgDeDlwttjbNiSQVmRafHyvMDE0dd7p828mszdzVbBiJB2oVc0ogrBhqfv_0OrjrQn86uvTPaLxJLaOMY_j6ZWYYezleZOHRlTNia"
                            }}
                            className="w-full h-[218px] rounded-xl"
                            resizeMode="cover"
                        />
                    </View>

                    <Text className="text-[#141414] text-[28px] font-bold text-center pb-3 pt-5">
                        Create Your Account
                    </Text>

                    <View className="max-w-[480px] px-4 py-3">
                        <TextInput
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
                            className="w-full h-14 bg-[#f2f2f2] rounded-xl px-4 text-base text-[#141414] placeholder:text-[#757575]"
                            placeholderTextColor="#757575"
                        />
                    </View>

                    <View className="max-w-[480px] px-4 py-3">
                        <TextInput
                            placeholder="Email"
                            value={formData.email}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="w-full h-14 bg-[#f2f2f2] rounded-xl px-4 text-base text-[#141414] placeholder:text-[#757575]"
                            placeholderTextColor="#757575"
                        />
                    </View>

                    <View className="max-w-[480px] px-4 py-3">
                        <TextInput
                            placeholder="Password"
                            value={formData.password}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                            secureTextEntry
                            className="w-full h-14 bg-[#f2f2f2] rounded-xl px-4 text-base text-[#141414] placeholder:text-[#757575]"
                            placeholderTextColor="#757575"
                        />
                    </View>
                </View>

                <View>
                    <View className="px-4 py-3">
                        <Pressable
                            onPress={handleCreateAccount}
                            className="h-12 max-w-[480px] rounded-full bg-white border border-[#141414] items-center justify-center"
                        >
                            <Text className="text-[#141414] text-base font-bold tracking-[0.015em]">
                                Create Account
                            </Text>
                        </Pressable>
                    </View>

                    <Link href="/sign-in" asChild>
                        <Pressable>
                            <Text className="text-[#757575] text-sm text-center underline pb-3 pt-1">
                                Already have an account? Sign In
                            </Text>
                        </Pressable>
                    </Link>

                    <View className="h-5 bg-white" />
                </View>
            </View>
        </SafeAreaView>
    );
}
