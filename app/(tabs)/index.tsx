import React from 'react'
import { Surface, Avatar, Card, Text, useTheme } from 'react-native-paper'
import axios from 'axios'
import { Colors } from '@/lib/ui'

const TabsHome = () => {

  const [machineStatus, setMachineStatus] = React.useState({ hundegger_sc1: { status: "Offline" }, hundegger_k2: { status: "Offline" } })
  const theme = useTheme().dark ? 'dark' : 'light'

  async function checkMachineStatus() {
    try {
      const response = await axios.post('https://app.frame-house.eu/api/machine-status', { action: 'machine-status' })
      setMachineStatus(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    checkMachineStatus()
  }, [])

  const getStatusColor = (str: string) => {
    if (str == "Online") {
      return "green"
    } else if (str == "Offline") {
      return "red"
    } else {
      return "blue"
    }
  }

  return (
    <Surface style={{ flex: 1, gap: 8, paddingHorizontal: 16, paddingVertical: 16 }}>
      <Text variant="titleLarge">Production lines status</Text>
      <Surface elevation={0}>
        <Card.Title
          title="Hundegger SC1"
          subtitle={machineStatus.hundegger_sc1.status}
          theme={{ colors: Colors[theme].orange }}
          left={(props) => <Avatar.Icon theme={{ colors: Colors[theme][getStatusColor(machineStatus.hundegger_sc1.status)] }} {...props} icon="saw-blade" />}
        />
        <Card.Title
          title="Hundegger K2"
          subtitle={machineStatus.hundegger_k2.status}
          left={(props) => <Avatar.Icon theme={{ colors: Colors[theme][getStatusColor(machineStatus.hundegger_k2.status)] }} {...props} icon="saw-blade" />}
        />
        <Card.Title
          title="Gluing press"
          subtitle="Offline"
          left={(props) => <Avatar.Icon theme={{ colors: Colors[theme].red }} {...props} icon="saw-blade" />}
        />
      </Surface>
    </Surface>
  )
}

export default TabsHome
