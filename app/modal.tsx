import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform } from 'react-native'
import { Chip, Divider, Surface, Text } from 'react-native-paper'

import Locales from '@/locales'

const Modal = () => (
  <Surface
    style={{
      flex: 1,
      gap: 16,
      padding: 32,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text variant="displaySmall">{Locales.t('titleModal')}</Text>

    <Divider />

    <Text variant="bodyLarge">{Locales.t('openScreenCode')}</Text>

    <Chip textStyle={{ fontFamily: 'JetBrainsMono_400Regular' }}>
      app/modal.tsx
    </Chip>

    <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
      {Locales.t('changeScreenCode')}
    </Text>

    {/* Use a light status bar on iOS to account for the black space above the modal */}
    <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
  </Surface>
)

export default Modal
