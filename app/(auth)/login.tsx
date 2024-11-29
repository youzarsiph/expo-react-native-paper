import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Formik } from 'formik'
import React from 'react'
import {
  Button,
  Surface,
  TextInput,
  HelperText,
  Text,
} from 'react-native-paper'
import * as Yup from 'yup'

import { styles } from '@/lib'

const Login = () => (
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

    <Text variant="headlineLarge" style={{ textAlign: 'center' }}>
      Welcome!
    </Text>
    <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
      We're excited to have you back. Please log in to continue.
    </Text>

    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => console.log(values)}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .min(3, 'Too Short!')
          .max(64, 'Too Long!')
          .required('Please enter a username.'),
        password: Yup.string()
          .min(8, 'Too Short! must be at least 8 characters.')
          .max(64, 'Too Long!')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
            'Must 1 uppercase, 1 lowercase, 1 number and 1 special case character',
          )
          .required('Please enter a password'),
      })}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <>
          <Surface elevation={0}>
            <TextInput
              maxLength={64}
              mode="outlined"
              label="Username"
              value={values.username}
              error={!!errors.username}
              onBlur={handleBlur('username')}
              right={64 - values.username.length}
              placeholder="Enter your username..."
              onChangeText={handleChange('username')}
            />
            <HelperText type="error" visible={!!errors.username}>
              {errors.username}
            </HelperText>
          </Surface>

          <Surface elevation={0}>
            <TextInput
              maxLength={64}
              mode="outlined"
              label="Password"
              value={values.password}
              error={!!errors.password}
              onBlur={handleBlur('password')}
              right={64 - values.password.length}
              placeholder="Enter your password..."
              onChangeText={handleChange('password')}
            />
            <HelperText type="error" visible={!!errors.password}>
              {errors.password}
            </HelperText>
          </Surface>

          <Button mode="contained" onPress={() => handleSubmit()}>
            Login
          </Button>
        </>
      )}
    </Formik>

    <Button
      mode="contained-tonal"
      onPress={() => router.push('/(auth)/signup')}
    >
      New here?
    </Button>
  </Surface>
)

export default Login
