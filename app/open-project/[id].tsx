import React, { useState } from 'react'
import axios from 'axios'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, Dimensions, View, ImageBackground } from 'react-native'
import { Surface, ActivityIndicator, Text, Chip, Divider, Button, useTheme, Dialog, Portal, Avatar, TouchableRipple, Card, Banner, IconButton, Icon } from 'react-native-paper'
import { Notifier, NotifierComponents } from 'react-native-notifier'
import { Colors, styles, CircularChart, ProjectPreset } from '@/lib/ui'
import { rgb2hex } from '@/lib/utils'


const OpenProject = () => {

  const [projectData, setProjectData] = useState({
    project_id: '',
    project_name: '',
    project_production_start_date: 0,
    project_production_end_date: 0,
    project_status: '',
    project_codes_import_date: null
  })
  const [files, setFiles] = useState([])
  const [projectLoading, setProjectLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)

  // Error | Success banner
  const [showBanner, setShowBanner] = useState(false)
  const [bannerData, setBannerData] = useState('')

  const { id } = useLocalSearchParams()
  const theme = useTheme().dark ? 'dark' : 'light'
  const colors = useTheme().colors
  const screenWidth = Dimensions.get("window").width

  async function fetchProjectData() {
    try {
      const response = await axios.post('https://app.frame-house.eu/api/open-project', { action: 'open-project', id: id })
      if (response.data.status === 'success') {
        setProjectData(response.data.project)
        const codes = await axios.post('https://app.frame-house.eu/api/load-codes', { action: 'load-codes' })
        if (codes.data.status === 'success') {
          const filteredItems = codes.data.files.filter((p: any) =>
            p.name.toLowerCase().includes(response.data.project.project_name.toLowerCase())
          )
          setFiles(filteredItems)
          setProjectLoading(false)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function importCodes(props: any) {
    setProjectLoading(true)
    try {
      const response = await axios.post('https://app.frame-house.eu/api/import-codes', { action: 'import-codes', ...props })
      console.log(response)
      if (response.data.status === 'success') {

        setProjectLoading(false)
        setShowDialog(false)

        Notifier.showNotification({
          title: 'Success!',
          description: response.data.message,
          duration: 9000,
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'success',
            titleStyle: { marginTop: 48 },
            descriptionStyle: { marginBottom: 16 }
          }
        })

      } else {

        setProjectLoading(false)
        setShowDialog(false)

        Notifier.showNotification({
          title: 'Error!',
          description: response.data.message,
          duration: 9000,
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'error',
            titleStyle: { marginTop: 48 },
            descriptionStyle: { marginBottom: 16 }
          }
        })

      }
    } catch (error: any) {
      setProjectLoading(false)
      setShowDialog(false)
      //console.error(error)
      setBannerData('An error occurred during the request. Contact your administrator. Error: ' + error.message)
      setShowBanner(true)
    }
  }

  React.useEffect(() => {
    fetchProjectData()
  }, [])

  if (projectLoading === true) {
    return (
      <Surface style={styles.screen}>
        <ActivityIndicator animating={true} size={'large'} />
      </Surface>
    )
  }

  const fileList = files.map((file: any) => {
    return (
      <Surface elevation={0} key={`file-${file.id}`}>
        <TouchableRipple
          borderless
          style={{ borderRadius: 12 }}
          rippleColor='rgba(0, 0, 0, .05)'
          onPress={() => importCodes({ pid: projectData.project_id, file: file.url })}
        >
          <Card elevation={5}>
            <Card.Title
              title={file.name}
              subtitle={file.modified}
              left={(props) => <Avatar.Icon {...props} icon="folder-zip-outline" />}
            />
          </Card>
        </TouchableRipple>
      </Surface>
    )
  })

  const chartData = [
    { id: 0, name: "Total", value: 92, color: rgb2hex(colors.primary, 1), icon: 'check-circle-outline' },
    { id: 1, name: "Walls", value: 87, color: rgb2hex(colors.primary, 0.8), icon: 'screw-flat-top' },
    { id: 2, name: "K2", value: 31, color: rgb2hex(colors.primary, 0.6), icon: 'saw-blade' },
    { id: 3, name: "SC1", value: 38, color: rgb2hex(colors.primary, 0.4), icon: 'saw-blade' },
    { id: 4, name: "Rest", value: 8, color: rgb2hex(colors.primary, 0.2), icon: 'checkbox-blank-circle-outline' }
  ]

  return (
    <Surface style={{ flex: 1 }}>
      <Banner style={{ zIndex: 999 }} visible={showBanner} actions={[{ label: 'Close', onPress: () => setShowBanner(false) }]} elevation={4}>{bannerData}</Banner>

      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Content>
            <Surface elevation={0} style={{ gap: 8 }}>
              {fileList}
            </Surface>
          </Dialog.Content>
        </Dialog>
      </Portal>

      <ScrollView>
        <Surface style={{ flex: 1, gap: 16, paddingHorizontal: 16, paddingVertical: 16 }}>

          <Card>
            <Card.Title
              title="Production"
              titleVariant="titleLarge"
              subtitle={projectData.project_status}
              left={(props) => <Avatar.Icon {...props} icon="calendar-month-outline" />}
              right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { console.log('click-clack') }} />}
            />
            <Card.Content>
              <Surface elevation={0} style={{ flexDirection: "row", columnGap: 16 }}>
                <Surface elevation={0} style={{ flex: 0.5 }}>
                  <Text style={{ paddingBottom: 8 }}>Production start date</Text>
                  <Chip icon="calendar-range">{new Date(projectData.project_production_start_date * 1000).toDateString()}</Chip>
                </Surface>
                <Surface elevation={0} style={{ flex: 0.5 }}>
                  <Text style={{ paddingBottom: 8 }}>Production end date</Text>
                  <Chip icon="calendar-check">{new Date(projectData.project_production_end_date * 1000).toDateString()}</Chip>
                </Surface>
              </Surface>
            </Card.Content>
          </Card>

          <Card>
            <Card.Title
              title="Statistics"
              titleVariant="titleLarge"
              left={(props) => <Avatar.Icon {...props} icon="chart-bar-stacked" />}
            />
            <Card.Content>
              <Surface elevation={0} style={{ flexDirection: "row", columnGap: 16 }}>
                <CircularChart data={chartData} config={{ horizontalPadding: 32, containerHeight: 200 }} />
              </Surface>
            </Card.Content>
          </Card>

          <Card>
            <Card.Title
              title="Sawlist"
              titleVariant="titleLarge"
              left={(props) => <Avatar.Icon {...props} icon="saw-blade" />}
              right={(props) => <IconButton {...props} icon="cloud-upload-outline" disabled={files.length > 0 ? false : true} onPress={() => setShowDialog(true)} />}
            />
            <Card.Content>
              {projectData.project_codes_import_date === null ? <Text>Not imported</Text> : <Text>Imported</Text>}
            </Card.Content>
          </Card>

          <Card>
            <Card.Title
              title="Preset"
              titleVariant="titleLarge"
              left={(props) => <Avatar.Icon {...props} icon="cog" />}
              right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => console.log('clack')} />}
            />
            <Card.Content>
              <View style={{ height: 250 }}>
                <ProjectPreset preset="Standart with facade insulation 50mm" />
              </View>
            </Card.Content>
          </Card>

          <Card>
            <Card.Title
              title="Loading"
              titleVariant="titleLarge"
              left={(props) => <Avatar.Icon {...props} icon="truck" />}
              right={(props) => <IconButton {...props} icon="dots-vertical" disabled={files.length > 0 ? false : true} onPress={() => setShowDialog(true)} />}
            />
            <Card.Content>
              <Surface elevation={0} style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                <Chip icon="truck-check-outline">29/09/2024</Chip>
                <Chip icon="truck-outline">01/10/2024</Chip>
                <Chip icon="truck-outline">02/10/2024</Chip>
                <Chip icon="truck-outline">05/10/2024</Chip>
              </Surface>
            </Card.Content>
          </Card>

        </Surface>
      </ScrollView>
    </Surface>
  )
}

export default OpenProject