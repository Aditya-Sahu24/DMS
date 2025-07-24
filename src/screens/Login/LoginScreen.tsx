import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/features/auth/authSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const { isLoading, isAuthenticated, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Home' as never);
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (userId && password) {
      dispatch(loginUser({ userId, password }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Logo Section */}
      <View style={styles.logoBox}>
        <Image source={require('../../assets/images/Logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.subTitle}>Document Management System</Text>
      </View>

      {/* Login Form Card */}
      <View style={styles.card}>
        <Text style={styles.loginTitle}>Login</Text>

        <TextInput
          placeholder="User ID"
          style={styles.input}
          onChangeText={setUserId}
          value={userId}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholderTextColor="#999"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Powered by MSSPL © 2025</Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf1f7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoBox: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f6f8fa',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  button: {
    backgroundColor: '#0077cc',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#0077cc',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
});

export default LoginScreen;
