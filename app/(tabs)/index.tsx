import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Surface, Avatar, Card, Text, useTheme, IconButton, Button } from 'react-native-paper'
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps'
import axios from 'axios'
import { Colors } from '@/lib/ui'

const TabsHome = () => {

  let accuracy = 0.000100
  const [machineStatus, setMachineStatus] = useState({ hundegger_sc1: { status: "Offline" }, hundegger_k2: { status: "Offline" } })
  const theme = useTheme().dark ? 'dark' : 'light'
  const factory = {
    longitude: 24.026175, // 24.0264437
    latitude: 56.826657, // 56.8268811
    perimeter: {
      top: (24.026431 + accuracy),
      bottom: (24.025877 - accuracy),
      left: (56.826371 - accuracy),
      right: (56.826899 + accuracy)
    }
  }
  const [onFactory, setOnFactory] = useState(false)
  const [location, setLocation] = useState({ coords: { latitude: 0, longitude: 0 } })
  const [errorMsg, setErrorMsg] = useState('')

  const factoryArea = [
    // x - latitude, y - longitude
    { latitude: 56.825853, longitude: 24.026370 },
    { latitude: 56.826692, longitude: 24.027702 },
    { latitude: 56.827474, longitude: 24.025824 },
    { latitude: 56.827367, longitude: 24.025163 },
    { latitude: 56.827100, longitude: 24.024879 },
    { latitude: 56.826524, longitude: 24.024779 }
  ]
  const factoryArea2 = [
    // x - latitude, y - longitude
    { x: 56.825853, y: 24.026370 },
    { x: 56.826692, y: 24.027702 },
    { x: 56.827474, y: 24.025824 },
    { x: 56.827367, y: 24.025163 },
    { x: 56.827100, y: 24.024879 },
    { x: 56.826524, y: 24.024779 }
  ]

  function isPointInPoly(poly: any, pt: any) {
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y)) && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x) && (c = !c);
    return c;
  }

  async function checkMachineStatus() {
    try {
      const response = await axios.post('https://app.frame-house.eu/api/machine-status', { action: 'machine-status' })
      setMachineStatus(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getStatusColor = (str: string) => {
    if (str == "Online") {
      return "green"
    } else if (str == "Offline") {
      return "red"
    } else {
      return "blue"
    }
  }

  async function checkLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }
    try {
      let location = await Location.getCurrentPositionAsync({})

      // TEST

      console.log(isPointInPoly(factoryArea2, {
        x: location.coords.latitude,
        y: location.coords.longitude
      }))

      // END TEST

      setLocation(location)
      if (isPointInPoly(factoryArea2, { x: location.coords.latitude, y: location.coords.longitude })) {
        setOnFactory(true)
      } else {
        setOnFactory(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    checkLocation()
    checkMachineStatus()
  }, [])

  let text = 'Waiting...'
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  let employerOnFactory = 'Waiting...'
  if (onFactory === true) {
    employerOnFactory = 'On factory'
  } else {
    employerOnFactory = 'Not on factory'
  }

  return (
    <ScrollView>
      <Surface style={{ flex: 1, gap: 16, paddingHorizontal: 16, paddingVertical: 16 }}>

        <Card>
          <Card.Title
            title="Production lines status"
            titleVariant="titleLarge"
            left={(props) => <Avatar.Icon {...props} icon="antenna" />}
          />
          <Card.Content>
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
                left={(props) => <Avatar.Icon theme={{ colors: Colors[theme].red }} {...props} icon="view-day" />}
              />
            </Surface>
          </Card.Content>
        </Card>

        <Card>
          <Card.Title
            title="Locator"
            titleVariant="titleLarge"
            left={(props) => <Avatar.Icon {...props} icon="map-marker-account-outline" />}
            right={(props) => <IconButton {...props} icon="refresh" onPress={() => checkLocation()} />}
          />
          <Card.Content>
            <Surface elevation={0} style={{ alignItems: "center" }}>
              {location ? (
                <>
                  <Text>{employerOnFactory}</Text>
                </>
              ) : null}
              <Surface style={styles.container}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  initialRegion={{
                    latitude: 56.826657,
                    longitude: 24.026175,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} />
                  <Polygon coordinates={factoryArea}></Polygon>
                </MapView>
              </Surface>
            </Surface>
          </Card.Content>
        </Card>

      </Surface>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  map: {
    height: 200,
  },
});

export default TabsHome