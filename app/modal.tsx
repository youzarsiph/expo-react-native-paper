import { Canvas, Rect, LinearGradient, vec } from '@shopify/react-native-skia'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import { Chip, Surface, Text, useTheme } from 'react-native-paper'

import Locales from '@/locales'

const Modal = () => {
  const theme = useTheme()
  const { width } = useWindowDimensions()

  return (
    <Surface
      style={{
        flex: 1,
        gap: 16,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {Platform.OS !== 'web' ? (
        <Canvas
          style={{
            left: 0,
            right: 0,
            position: 'absolute',
            height: 300,
            width,
          }}
        >
          <Rect x={0} y={0} width={width} height={300}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width, width)}
              colors={[theme.colors.primary, theme.colors.inversePrimary]}
            />
          </Rect>
        </Canvas>
      ) : undefined}

      <Text variant="displaySmall">{Locales.t('titleModal')}</Text>

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
}

export default Modal
