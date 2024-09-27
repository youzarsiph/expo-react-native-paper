import React, { useState } from 'react'
import { router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, Dimensions, Alert } from 'react-native'
import { Surface, ActivityIndicator, Text, Chip, Divider, Button, useTheme, Dialog, Portal, Avatar, TouchableRipple, Card, Banner, Icon } from 'react-native-paper'
import axios from 'axios'
import { Colors, styles } from '@/lib/ui'

import { PieChart } from "react-native-chart-kit"

const OpenProject = () => {

  const [data, setData] = useState({ project_name: '', project_id: '' })
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

  // each value represents a goal ring in Progress chart
  const dataChart = [
    {
      name: "Sawed SC1",
      percents: 25,
      color: "#8db3d6",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14
    },
    {
      name: "Sawed K2",
      percents: 15,
      color: "#a9d68d",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14
    },
    {
      name: "Produced",
      percents: 35,
      color: "#d6c08d",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14
    },
    {
      name: "Glued",
      percents: 10,
      color: "#d68dba",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14
    },
    {
      name: "Rest",
      percents: 20,
      color: colors.outlineVariant,
      legendFontColor: "#7F7F7F",
      legendFontSize: 14
    }
  ]

  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
  }

  async function fetchProjectData() {
    try {
      const response = await axios.post('https://app.frame-house.eu/api/open-project', { action: 'open-project', id: id })
      if (response.data.status === 'success') {
        setData(response.data.project)
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
        setBannerData('Codes successfuly imported and sawlist created!')
        setShowBanner(true)
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
      <Surface elevation={0}
        key={`file-${file.id}`}>
        <TouchableRipple
          borderless
          style={{ borderRadius: 12 }}
          rippleColor='rgba(0, 0, 0, .05)'
          onPress={() => importCodes({ pid: data.project_id, file: file.url })}
        >
          <Card.Title
            title={file.name}
            subtitle={file.modified}
            left={(props) => <Avatar.Icon {...props} icon="folder-zip-outline" />}
            style={{ borderWidth: 1, borderStyle: "dashed", borderRadius: 12, borderColor: colors.onPrimaryContainer }}
          />
        </TouchableRipple>
      </Surface>
    )
  })

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
          <Text variant="headlineMedium">{data.project_name}</Text>
          <Divider />
          <Text variant="titleMedium" style={{ fontWeight: 900 }}>PRODUCTION DATES</Text>
          <Surface elevation={0} style={{ flexDirection: 'row', gap: 8 }}>
            <Chip icon="calendar-month">24/09/2024</Chip>
            <Chip icon="calendar-multiple-check">27/09/2024</Chip>
          </Surface>
          <Divider />
          <Text variant="titleMedium" style={{ fontWeight: 900 }}>STATUS</Text>
          <Surface elevation={0} style={{ flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
            <PieChart
              data={dataChart}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor={"percents"}
              backgroundColor={"transparent"}
              paddingLeft={"16"}
            />
          </Surface>
          <Divider />
          <Text variant="titleMedium" style={{ fontWeight: 900 }}>SAWLIST</Text>
          <Surface elevation={0}>
            <Button icon="cloud-upload-outline" mode="contained" disabled={files.length > 0 ? false : true} onPress={() => setShowDialog(true)}>Import from ownCloud</Button>
          </Surface>
          <Divider />
          <Text variant="titleMedium" style={{ fontWeight: 900 }}>PRESET</Text>
          <Surface elevation={0} style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <Chip icon="alpha-s-circle-outline" theme={{ colors: Colors[theme].olive }}>Standart</Chip>
            <Chip icon="alpha-v-circle-outline" theme={{ colors: Colors[theme].orange }}>Vapor membrane</Chip>
            <Chip icon="alpha-d-circle-outline" theme={{ colors: Colors[theme].blue }}>Double rafters</Chip>
          </Surface>
          <Divider />
          <Text variant="titleMedium" style={{ fontWeight: 900 }}>LOADING</Text>
          <Surface elevation={0} style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <Chip icon="truck-check-outline">29/09/2024</Chip>
            <Chip icon="truck-outline">01/10/2024</Chip>
            <Chip icon="truck-outline">02/10/2024</Chip>
            <Chip icon="truck-outline">05/10/2024</Chip>
          </Surface>
        </Surface>
      </ScrollView>
    </Surface>
  )
}

export default OpenProject