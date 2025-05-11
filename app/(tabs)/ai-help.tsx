import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Brain, Send, Star, History, Settings as SettingsIcon } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

type ResponseStyle = 'concise' | 'detailed' | 'eli5';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function AIHelpScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [responseStyle, setResponseStyle] = useState<ResponseStyle>('detailed');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'This is a simulated AI response. In the actual implementation, this would be replaced with the response from the AI service.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.styleSelector}>
          <TouchableOpacity
            style={[styles.styleButton, responseStyle === 'concise' && styles.styleButtonActive]}
            onPress={() => setResponseStyle('concise')}
          >
            <Text style={[styles.styleButtonText, responseStyle === 'concise' && styles.styleButtonTextActive]}>
              Concise
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.styleButton, responseStyle === 'detailed' && styles.styleButtonActive]}
            onPress={() => setResponseStyle('detailed')}
          >
            <Text style={[styles.styleButtonText, responseStyle === 'detailed' && styles.styleButtonTextActive]}>
              Detailed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.styleButton, responseStyle === 'eli5' && styles.styleButtonActive]}
            onPress={() => setResponseStyle('eli5')}
          >
            <Text style={[styles.styleButtonText, responseStyle === 'eli5' && styles.styleButtonTextActive]}>
              ELI5
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <Brain size={48} color="#0B3D91" style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>Ask Me Anything!</Text>
            <Text style={styles.emptyText}>
              I'm your AI learning assistant. Ask me questions about space, science, or any topic you're curious about.
            </Text>
            <View style={styles.suggestionContainer}>
              <Text style={styles.suggestionsTitle}>Try asking:</Text>
              <TouchableOpacity
                style={styles.suggestionButton}
                onPress={() => setInputText("Explain black holes in simple terms")}
              >
                <Text style={styles.suggestionText}>"Explain black holes in simple terms"</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.suggestionButton}
                onPress={() => setInputText("How do rockets work?")}
              >
                <Text style={styles.suggestionText}>"How do rockets work?"</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.suggestionButton}
                onPress={() => setInputText("What causes the seasons on Earth?")}
              >
                <Text style={styles.suggestionText}>"What causes the seasons on Earth?"</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          messages.map((message, index) => (
            <Animated.View
              key={message.id}
              entering={FadeInDown.delay(index * 100)}
              style={[
                styles.messageContainer,
                message.type === 'user' ? styles.userMessage : styles.aiMessage
              ]}
            >
              {message.type === 'ai' && (
                <View style={styles.aiHeader}>
                  <Image
                    source={{ uri: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg' }}
                    style={styles.aiAvatar}
                  />
                  <Text style={styles.aiName}>Space AI</Text>
                </View>
              )}
              <Text style={[
                styles.messageText,
                message.type === 'user' ? styles.userMessageText : styles.aiMessageText
              ]}>
                {message.content}
              </Text>
              {message.type === 'ai' && (
                <View style={styles.messageActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Star size={16} color="#0B3D91" />
                    <Text style={styles.actionText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <History size={16} color="#0B3D91" />
                    <Text style={styles.actionText}>History</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <SettingsIcon size={16} color="#0B3D91" />
                    <Text style={styles.actionText}>Settings</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Animated.View>
          ))
        )}
        {loading && (
          <Animated.View
            entering={FadeInDown}
            style={[styles.messageContainer, styles.aiMessage]}
          >
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>AI is thinking...</Text>
            </View>
          </Animated.View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me anything..."
          multiline
          maxLength={500}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim() || loading}
        >
          <Send size={20} color={inputText.trim() ? '#FFFFFF' : '#A0AEC0'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  styleSelector: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    padding: 4,
  },
  styleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  styleButtonActive: {
    backgroundColor: '#0B3D91',
  },
  styleButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#71717A',
  },
  styleButtonTextActive: {
    color: '#FFFFFF',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#0B3D91',
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#71717A',
    textAlign: 'center',
    marginBottom: 24,
  },
  suggestionContainer: {
    width: '100%',
  },
  suggestionsTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 12,
  },
  suggestionButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#0B3D91',
  },
  messageContainer: {
    marginBottom: 16,
    borderRadius: 16,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0B3D91',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  aiName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0B3D91',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  userMessageText: {
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  aiMessageText: {
    fontFamily: 'Inter-Regular',
    color: '#333333',
  },
  messageActions: {
    flexDirection: 'row',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#0B3D91',
    marginLeft: 4,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#71717A',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    padding: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#0B3D91',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E5E5E5',
  },
});