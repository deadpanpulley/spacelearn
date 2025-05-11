import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { TimerReset as KeyReset, ArrowLeft } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const { resetPassword, loading } = useAuth();
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (error) {
      // Error is handled by the AuthContext
    }
  };

  if (success) {
    return (
      <View style={styles.container}>
        <Animated.View 
          entering={FadeIn.duration(800)}
          style={styles.successContainer}
        >
          <KeyReset size={48} color="#10B981" />
          <Text style={styles.successTitle}>Check Your Email</Text>
          <Text style={styles.successText}>
            We've sent password reset instructions to {email}
          </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity style={styles.backButton}>
              <ArrowLeft size={20} color="#0B3D91" />
              <Text style={styles.backButtonText}>Back to Login</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(800)}
        style={styles.formContainer}
      >
        <View style={styles.header}>
          <KeyReset size={48} color="#0B3D91" />
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you instructions to reset your password.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleResetPassword}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Sending Instructions...' : 'Send Instructions'}
          </Text>
        </TouchableOpacity>

        <Link href="/(auth)/login" asChild>
          <TouchableOpacity style={styles.backButton}>
            <ArrowLeft size={20} color="#0B3D91" />
            <Text style={styles.backButtonText}>Back to Login</Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    padding: 24,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#0B3D91',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#71717A',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
    color: '#4B4B4B',
  },
  input: {
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  button: {
    backgroundColor: '#0B3D91',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0B3D91',
    marginLeft: 8,
  },
  successContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  successTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#10B981',
    marginTop: 16,
    marginBottom: 8,
  },
  successText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#71717A',
    textAlign: 'center',
    marginBottom: 24,
  },
});