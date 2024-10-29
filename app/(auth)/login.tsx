import { Image } from 'expo-image'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Button, Surface, TextInput, HelperText, Text } from 'react-native-paper'
import { Alert, Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { styles } from '@/lib/ui'

const LoginScreen = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [errors, setErrors] = useState({ error: false, message: '' })

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://app.frame-house.eu/api/auth',
        { action: 'auth', login: username, password: password }
      )
      if (response.data.status === 'success') {
        if (Platform.OS !== 'web') {
          SecureStore.setItemAsync('auth_token', response.data.token)
          //navigation.navigate('/secured', { token: response.data.token })
        } else {
          setToken(response.data.token)
        }
      } else {
        setErrors({ error: true, message: response.data.message })
      }
    } catch (error) {
      console.error(error)
    }
  }

  /*
  // Read SecureStore on render
  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      SecureStore.getItemAsync('test').then((result) => {
        if (result) {
          Alert.alert(result)
        }
      })
    }
  })
  */

  return (
    <Surface style={{ ...styles.screen, alignItems: undefined }}>
      <Image
        alt="Logo"
        source={require('@/assets/images/icon.png')}
        style={{
          height: 150,
          width: 150,
          borderRadius: 16,
          marginBottom: 32,
          marginHorizontal: 'auto',
        }}
      />
      <Text variant="headlineMedium" style={{ textAlign: 'center' }}>Welcome to Framer</Text>
      <Text variant="bodyLarge" style={{ textAlign: 'center' }}>Log in to get started</Text>

      <>
        <Surface elevation={0}>
          <TextInput
            maxLength={64}
            mode="outlined"
            label="Username"
            id="login"
            value={username}
            right={<TextInput.Icon icon="account-outline" />}
            placeholder="Enter your username..."
            onChangeText={(value) => setUsername(value)}
          />
        </Surface>
        <Surface elevation={0}>
          <TextInput
            secureTextEntry={true}
            maxLength={64}
            mode="outlined"
            label="Password"
            id="password"
            value={password}
            error={!!errors.error}
            right={<TextInput.Icon icon="eye" />}
            placeholder="Enter your password..."
            onChangeText={(value) => setPassword(value)}
          />
          <HelperText type="error" visible={!!errors.error}>{errors.message}</HelperText>
        </Surface>
        <Button mode="contained" icon="login" onPress={() => handleSubmit()}>Login</Button>
      </>

      <Button mode="contained-tonal" onPress={() => router.push('/(auth)/signup')} >Forgot password?</Button>
    </Surface>
  )

}

export default LoginScreen