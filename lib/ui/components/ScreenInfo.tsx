import { Chip, Text } from 'react-native-paper'

import { Locales } from '@/lib/locales'

import GradientBackground from './GradientBackground'

const ScreenInfo = (props: { title: string; path: string }) => (
  <>
    <GradientBackground />

    <Text variant="displaySmall">{props.title}</Text>

    <Text variant="bodyLarge">{Locales.t('openScreenCode')}</Text>

    <Chip textStyle={{ fontFamily: 'JetBrainsMono_400Regular' }}>
      {props.path}
    </Chip>

    <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
      {Locales.t('changeScreenCode')}
    </Text>
  </>
)

export default ScreenInfo
