import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, Dimensions } from 'react-native'
import { Surface, ActivityIndicator, Text, Chip, Divider, Card, useTheme } from 'react-native-paper'
import axios from 'axios'
import { Colors, styles } from '@/lib/ui'

import { PieChart } from "react-native-chart-kit"

const OpenProject = () => {

  const [data, setData] = React.useState({ project_name: '' })
  const [projectLoading, setProjectLoading] = React.useState(true)
  const { id } = useLocalSearchParams()
  const theme = useTheme().dark ? 'dark' : 'light'
  const colors = useTheme().colors
  const screenWidth = Dimensions.get("window").width

  // each value represents a goal ring in Progress chart
  const dataChart = [
    {
      name: "Sawed SC1",
      percents: 25,
      color: "#0099cc",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14
    },
    {
      name: "Sawed K2",
      percents: 15,
      color: "#ff9900",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14
    },
    {
      name: "Produced",
      percents: 35,
      color: "#cc6699",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14
    },
    {
      name: "Glued",
      percents: 10,
      color: "#99cc00",
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
        setProjectLoading(false)
      }
    } catch (error) {
      console.error(error)
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

  return (
    <Surface style={{ flex: 1 }}>
      <ScrollView>
        <Surface style={{ flex: 1, gap: 8, paddingHorizontal: 16, paddingVertical: 16 }}>
          <Text variant="titleLarge">{data.project_name}</Text>
          <Divider />
          <Text variant="titleMedium">Production dates</Text>
          <Surface elevation={0} style={{ flexDirection: 'row', gap: 8 }}>
            <Chip icon="calendar-month">24/09/2024</Chip>
            <Chip icon="calendar-multiple-check">27/09/2024</Chip>
          </Surface>
          <Divider />
          <Text variant="titleMedium">Production status</Text>
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
          <Text variant="titleMedium">Project preset</Text>
          <Surface elevation={0} style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <Chip icon="alpha-s-circle-outline" theme={{ colors: Colors[theme].olive }}>Standart</Chip>
            <Chip icon="alpha-v-circle-outline" theme={{ colors: Colors[theme].orange }}>Vapor membrane</Chip>
            <Chip icon="alpha-d-circle-outline" theme={{ colors: Colors[theme].blue }}>Double rafters</Chip>
          </Surface>
          <Divider />
          <Text variant="titleMedium">Loading dates</Text>
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