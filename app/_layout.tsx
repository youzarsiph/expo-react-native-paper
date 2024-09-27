import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useFonts, JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono'
import { NotoSans_400Regular } from '@expo-google-fonts/noto-sans'
import * as Localization from 'expo-localization'
import { SplashScreen, Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import React from 'react'
import { Platform, useColorScheme, Alert, Text } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import Locales from '@/lib/locales'
import { Setting } from '@/lib/types'
import { StackHeader, Themes } from '@/lib/ui'

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)' // Ensure that reloading on `/modal` keeps a back button present.
}

SplashScreen.preventAutoHideAsync() // Prevent the splash screen from auto-hiding before asset loading is complete.

async function getToken(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  }
}

const RootLayout = () => {
  const [loaded, error] = useFonts({ NotoSans_400Regular, JetBrainsMono_400Regular, ...MaterialCommunityIcons.font })
  React.useEffect(() => { if (error) throw error }, [error])
  React.useEffect(() => { if (loaded) { SplashScreen.hideAsync() } }, [loaded])
  if (!loaded) { return null }
  return <RootLayoutNav />
}

const RootLayoutNav = () => {

  const colorScheme = useColorScheme()
  const [settings, setSettings] = React.useState<Setting>({ theme: 'auto', color: 'default', language: 'auto' })

  // Load settings from the device
  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      SecureStore.getItemAsync('settings').then((result) => {
        if (result === null) { SecureStore.setItemAsync('settings', JSON.stringify(settings)).then((res) => console.log(res)) }
        setSettings(JSON.parse(result ?? JSON.stringify(settings)))
      })
      // Check auth token
      SecureStore.getItemAsync('auth_token').then((result) => {
        if (result) {
          //Alert.alert(result)
        }
      })
    } else {
      setSettings({ ...settings, theme: colorScheme ?? 'light' })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (settings.language === 'auto') {
      Locales.locale = Localization.getLocales()[0].languageCode ?? 'en'
    } else {
      Locales.locale = settings.language
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PaperProvider theme={Themes[settings.theme === 'auto' ? (colorScheme ?? 'dark') : settings.theme][settings.color]}>
      <Stack screenOptions={{
        animation: 'ios',
        header: (props) => (
          <StackHeader navProps={props} children={undefined} />
        )
      }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ title: Locales.t('search') }} />
        <Stack.Screen name="modal" options={{ title: Locales.t('titleModal'), presentation: 'modal' }} />
        <Stack.Screen name="open-project/[id]" options={{ title: 'Details', presentation: 'modal' }} />
      </Stack>
    </PaperProvider>
  )
}

export default RootLayout
