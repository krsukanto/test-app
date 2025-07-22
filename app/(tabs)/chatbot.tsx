
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Message {
    id: string;
    text: string;
    isBot: boolean;
    timestamp: Date;
}

function ChatbotScreen() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! How can I help you with your finances today?',
            isBot: true,
            timestamp: new Date(),
        },
    ]);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputText.trim(),
            isBot: false,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, newMessage]);
        setInputText('');

        // Simulate bot response
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm processing your request. As an AI assistant, I'll help you with your financial questions.",
                isBot: true,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView className="flex-1 p-4">
                {messages.map((message) => (
                    <View
                        key={message.id}
                        className={`mb-4 max-w-[80%] ${
                            message.isBot ? 'self-start' : 'self-end ml-auto'
                        }`}
                    >
                        <View
                            className={`rounded-2xl p-3 ${
                                message.isBot ? 'bg-white-100' : 'bg-primary'
                            }`}
                        >
                            <Text
                                className={`font-quicksand ${
                                    message.isBot ? 'text-dark-100' : 'text-white'
                                }`}
                            >
                                {message.text}
                            </Text>
                        </View>
                        <Text className="font-quicksand text-xs text-gray-100 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            <View className="border-t border-white-100 p-4">
                <View className="flex-row items-center gap-4">
                    <View className="flex-1 bg-white-100 rounded-xl flex-row items-center px-4">
                        <TextInput
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Type your message..."
                            className="flex-1 h-12 font-quicksand text-dark-100"
                            placeholderTextColor="#757575"
                            multiline
                        />
                    </View>
                    <Pressable
                        onPress={handleSend}
                        disabled={!inputText.trim()}
                        className={`w-12 h-12 rounded-xl items-center justify-center ${
                            inputText.trim() ? 'bg-primary' : 'bg-white-100'
                        }`}
                    >
                        <MaterialCommunityIcons
                            name="send"
                            size={24}
                            color={inputText.trim() ? '#ffffff' : '#757575'}
                        />
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

export default ChatbotScreen;
