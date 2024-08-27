import React from 'react'
import { ActivityIndicator, Surface } from 'react-native-paper'

const LoadingIndicator = () => (
  <Surface
    elevation={0}
    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
  >
    <ActivityIndicator />
  </Surface>
)

export default LoadingIndicator
