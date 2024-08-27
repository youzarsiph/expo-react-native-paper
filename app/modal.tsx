import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform } from 'react-native'
import { Surface } from 'react-native-paper'

import Locales from '@/lib/locales'
import { ScreenInfo, styles } from '@/lib/ui'

const Modal = () => (
  <Surface style={styles.screen}>
    <ScreenInfo title={Locales.t('titleModal')} path="app/modal.tsx" />

    {/* Use a light status bar on iOS to account for the black space above the modal */}
    <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
  </Surface>
)

export default Modal
