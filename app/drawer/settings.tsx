import * as SecureStore from 'expo-secure-store'
import React from 'react'
import { Platform, useColorScheme } from 'react-native'
import {
  Surface,
  List,
  Menu,
  Button,
  IconButton,
  Snackbar,
  Icon,
} from 'react-native-paper'

import {
  Color,
  Colors,
  Language,
  Languages,
  LoadingIndicator,
  Locales,
  ScreenInfo,
  Setting,
  styles,
} from '@/lib'

const Settings = () => {
  const colorScheme = useColorScheme()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState({ visible: false, content: '' })
  const [settings, setSettings] = React.useState<Setting>({
    color: 'default',
    language: 'auto',
    theme: 'auto',
  })
  const [display, setDisplay] = React.useState({
    color: false,
    language: false,
    theme: false,
  })

  React.useEffect(() => {
    setLoading(true)

    if (Platform.OS !== 'web') {
      SecureStore.getItemAsync('settings')
        .then((result) =>
          setSettings(JSON.parse(result ?? JSON.stringify(settings))),
        )
        .catch((res) =>
          setMessage({
            visible: true,
            content: res.message,
          }),
        )
    }

    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const themeColors =
    Colors[
      settings.theme === 'auto' ? (colorScheme ?? 'light') : settings.theme
    ]

  return (
    <Surface style={{ flex: 1 }}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Surface elevation={0}>
          <List.AccordionGroup>
            <List.Accordion
              id="1"
              title={Locales.t('appearance')}
              left={(props) => <List.Icon {...props} icon="palette" />}
            >
              <List.Item
                title={Locales.t('language')}
                description={Locales.t('changeLanguage')}
                left={(props) => <List.Icon {...props} icon="translate" />}
                right={(props) => (
                  <Menu
                    visible={display.language}
                    onDismiss={() =>
                      setDisplay({ ...display, language: false })
                    }
                    anchor={
                      <IconButton
                        {...props}
                        icon="pencil"
                        onPress={() =>
                          setDisplay({ ...display, language: true })
                        }
                      />
                    }
                  >
                    <Menu.Item
                      title="System"
                      trailingIcon={
                        settings.language === 'auto' ? 'check' : undefined
                      }
                      onPress={() => {
                        setSettings({ ...settings, language: 'auto' })
                        setDisplay({ ...display, language: false })
                      }}
                    />
                    {Object.entries(Languages).map((lang) => (
                      <Menu.Item
                        key={lang[0]}
                        title={`${lang[1].name} / ${lang[1].nativeName}`}
                        trailingIcon={
                          settings.language === lang[0] ? 'check' : undefined
                        }
                        onPress={() => {
                          setSettings({
                            ...settings,
                            language: lang[0] as Language,
                          })
                          setDisplay({ ...display, language: false })
                        }}
                      />
                    ))}
                  </Menu>
                )}
              />
              <List.Item
                title={Locales.t('mode')}
                description={Locales.t('changeMode')}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={
                      settings.theme === 'auto'
                        ? 'theme-light-dark'
                        : settings.theme === 'light'
                          ? 'weather-sunny'
                          : 'weather-night'
                    }
                  />
                )}
                right={(props) => (
                  <Menu
                    visible={display.theme}
                    onDismiss={() => setDisplay({ ...display, theme: false })}
                    anchor={
                      <IconButton
                        {...props}
                        icon="pencil"
                        onPress={() => setDisplay({ ...display, theme: true })}
                      />
                    }
                  >
                    <Menu.Item
                      title={Locales.t('system')}
                      leadingIcon="theme-light-dark"
                      trailingIcon={
                        settings.theme === 'auto' ? 'check' : undefined
                      }
                      onPress={() => {
                        setSettings({ ...settings, theme: 'auto' })
                        setDisplay({ ...display, theme: false })
                      }}
                    />
                    <Menu.Item
                      title={Locales.t('lightMode')}
                      leadingIcon="weather-sunny"
                      trailingIcon={
                        settings.theme === 'light' ? 'check' : undefined
                      }
                      onPress={() => {
                        setSettings({ ...settings, theme: 'light' })
                        setDisplay({ ...display, theme: false })
                      }}
                    />
                    <Menu.Item
                      title={Locales.t('darkMode')}
                      leadingIcon="weather-night"
                      trailingIcon={
                        settings.theme === 'dark' ? 'check' : undefined
                      }
                      onPress={() => {
                        setSettings({ ...settings, theme: 'dark' })
                        setDisplay({ ...display, theme: false })
                      }}
                    />
                  </Menu>
                )}
              />
              <List.Item
                title={Locales.t('color')}
                description={Locales.t('changeColor')}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="palette-swatch-variant"
                    color={
                      Colors[
                        settings.theme === 'auto'
                          ? (colorScheme ?? 'light')
                          : settings.theme
                      ][settings.color]?.primary
                    }
                  />
                )}
                right={(props) => (
                  <Menu
                    visible={display.color}
                    onDismiss={() => setDisplay({ ...display, color: false })}
                    anchor={
                      <IconButton
                        {...props}
                        icon="pencil"
                        onPress={() => setDisplay({ ...display, color: true })}
                      />
                    }
                  >
                    {Object.keys(Colors.light).map((color) => (
                      <Surface
                        key={color}
                        elevation={0}
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Surface
                          elevation={0}
                          style={{
                            padding: 4,
                            marginLeft: 8,
                            borderRadius: 16,
                            backgroundColor:
                              color !== settings.color
                                ? undefined
                                : themeColors[color]?.primary,
                          }}
                        >
                          <Icon
                            size={24}
                            source="palette"
                            color={
                              color !== settings.color
                                ? themeColors[color as Color]?.primary
                                : themeColors[color].onPrimary
                            }
                          />
                        </Surface>

                        <Menu.Item
                          key={color}
                          title={Locales.t(color)}
                          onPress={() => {
                            setSettings({
                              ...settings,
                              color: color as Color,
                            })
                            setDisplay({ ...display, color: false })
                          }}
                        />
                      </Surface>
                    ))}
                  </Menu>
                )}
              />
            </List.Accordion>
          </List.AccordionGroup>
        </Surface>
      )}

      <Surface elevation={0} style={styles.screen}>
        <ScreenInfo
          title={Locales.t('titleSettings')}
          path="app/(tabs)/settings.tsx"
        />
      </Surface>

      <Button
        mode="contained"
        style={{ margin: 16 }}
        onPress={() =>
          Platform.OS !== 'web'
            ? SecureStore.setItemAsync('settings', JSON.stringify(settings))
                .then(() =>
                  setMessage({
                    visible: true,
                    content: Locales.t('restartApp'),
                  }),
                )
                .catch((res) =>
                  setMessage({
                    visible: true,
                    content: res.message,
                  }),
                )
            : setMessage({
                visible: true,
                content: Locales.t('notAvailable'),
              })
        }
      >
        {Locales.t('save')}
      </Button>

      <Snackbar
        visible={message.visible}
        onDismiss={() => setMessage({ ...message, visible: false })}
        onIconPress={() => setMessage({ ...message, visible: false })}
      >
        {message.content}
      </Snackbar>
    </Surface>
  )
}

export default Settings
