import { Stack } from 'expo-router'

import { Locales, StackHeader } from '@/lib'

const Layout = () => (
  <Stack
    screenOptions={{
      animation: 'slide_from_bottom',
      header: (props) => <StackHeader navProps={props} children={undefined} />,
    }}
  >
    <Stack.Screen name="login" options={{ title: Locales.t('login') }} />
    <Stack.Screen name="signup" options={{ title: Locales.t('signup') }} />
  </Stack>
)

export default Layout
