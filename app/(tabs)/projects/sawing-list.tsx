import React, { useEffect, useState, useCallback } from 'react'
import { Surface, List, DataTable, Text, Icon, TouchableRipple, useTheme, Button, Dialog, Portal, Switch } from 'react-native-paper'
import { ScrollView, RefreshControl, Dimensions } from 'react-native'
import { DonutChart } from "react-native-circular-chart"
import axios from 'axios'
import useFramerStore from '@/lib/utils/store'
import { LoadingIndicator } from '@/lib/ui/components'

const SawingList = () => {

  const [loading, setLoading] = useState(true)
  const [levels, setLevels] = useState([])
  const { activeProject } = useFramerStore()
  const [levelDialog, setLevelDialog] = useState({ visible: false, dialogData: { level_name: '', level_id: 0 } })
  const hideDialog = () => setLevelDialog({ visible: false, dialogData: { level_name: '', level_id: 0 } })
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const colors = useTheme().colors
  const screenWidth = Dimensions.get("window").width

  async function loadSawingList() {
    setLoading(true)
    if (activeProject.id !== 0) {
      try {
        const response = await axios.post('https://app.frame-house.eu/api/load-sawing-list', { action: 'load-sawing-list', id: activeProject.id })
        //console.log(response)
        if (response.data.status === 'success') {
          setLevels(response.data.levels)
        } else {
          console.error('Something wrong...')
        }
      } catch (error) {
        console.error(error)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    loadSawingList()
  }, [activeProject])

  const onRefresh = useCallback(() => {
    loadSawingList()
  }, [])

  if (loading === true) {
    return (<LoadingIndicator />)
  }

  const Parts = ({ parts }: any) => {
    return (
      <>
        {parts.map(
          (part: any) => (
            <DataTable.Row key={`part-id-${part.part_id}`} style={{ paddingHorizontal: 24 }}>
              <DataTable.Cell textStyle={{ fontWeight: 900 }}>{part.part_name}</DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 0.7 }}>{part.part_height / 10}x{part.part_width / 10}x{part.part_length / 10}</DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 0.3 }}>{part.part_quantity}/0</DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 0.3 }}>
                {part.part_quantity == part.part_finished ?
                  <Icon source="check-circle-outline" size={24} />
                  :
                  <Icon source="checkbox-blank-circle-outline" size={24} />
                }
              </DataTable.Cell>
            </DataTable.Row>
          )
        )}
      </>
    )
  }

  const Groups = ({ groups }: any) => {
    return (
      <Surface>
        <DataTable>
          {groups.map(
            (group: any) => (
              <>
                <DataTable.Header key={`group-id-${group.group_id}`} style={{ paddingHorizontal: 24 }}>
                  <DataTable.Title textStyle={{ fontWeight: 900, fontSize: 14 }}>{group.group_name}</DataTable.Title>
                  <DataTable.Title numeric style={{ flex: 0.7 }}>Dimensions</DataTable.Title>
                  <DataTable.Title numeric style={{ flex: 0.3 }}>Quan.</DataTable.Title>
                  <DataTable.Title numeric style={{ flex: 0.3 }}>
                    <TouchableRipple
                      onPress={() => console.log('Pressed')}
                      rippleColor="rgba(0, 0, 0, .15)"
                      borderless
                      style={{ borderRadius: 12 }}
                    >
                      <Icon source="dots-horizontal" size={24} />
                    </TouchableRipple>
                  </DataTable.Title>
                </DataTable.Header>
                <Parts key={`part-id-${group.group_id}`} parts={group.group_parts} />
              </>
            )
          )}
        </DataTable>
      </Surface>
    )
  }

  const Levels = () => {
    return (
      <List.AccordionGroup>
        {levels.map(
          (level: any) => (
            <List.Accordion
              title={level.level_name}
              id={`level-id-${level.level_id}`}
              key={`level-key-${level.level_id}`}
              onLongPress={() => setLevelDialog({ visible: true, dialogData: level })}
              left={props => <List.Icon {...props} icon="folder-outline" />}
            >
              <Groups groups={level.level_groups} />
            </List.Accordion>
          )
        )}
      </List.AccordionGroup>
    )
  }

  function rgb2hex(orig: any, percent: number) {
    orig = orig.replace(/[^,]+(?=\))/, percent);
    var a, isPercent,
      rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
      alpha = (rgb && rgb[4] || "").trim(),
      hex = rgb ? "#" +
        (rgb[1] | 1 << 8).toString(16).slice(1) +
        (rgb[2] | 1 << 8).toString(16).slice(1) +
        (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
    if (alpha !== "") {
      isPercent = alpha.indexOf("%") > -1;
      a = parseFloat(alpha);
      if (!isPercent && a >= 0 && a <= 1) {
        a = Math.round(255 * a);
      } else if (isPercent && a >= 0 && a <= 100) {
        a = Math.round(255 * a / 100)
      } else {
        a = "";
      }
    }
    if (a) {
      hex += (a | 1 << 8).toString(16).slice(1);
    }
    return hex;
  }

  const MyComponent = () => {
    return (
      <Portal>
        <Dialog visible={levelDialog.visible} onDismiss={hideDialog}>
          <Dialog.Title style={{textAlign: 'center'}}>{levelDialog.dialogData.level_name}</Dialog.Title>
          <Dialog.Content>
            <Surface elevation={0} style={{ flexDirection: 'row' }}>
              <Surface elevation={0} style={{ flex: 0.8, justifyContent: 'center' }}>
                <Text variant="bodyLarge">This level contains walls or prefabricated constructions:</Text>
              </Surface>
              <Surface elevation={0} style={{ flex: 0.2, alignSelf: 'flex-end' }}>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
              </Surface>
            </Surface>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={() => console.log('Ok')}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }

  const DATA = [
    { name: 'Completed', value: 92, color: rgb2hex(colors.primary, 1), icon: 'check-circle-outline', id: 0 },
    { name: 'Production\ntable', value: 87, color: rgb2hex(colors.primary, 0.8), icon: 'screw-flat-top', id: 1 },
    { name: 'Hundegger\nK2', value: 31, color: rgb2hex(colors.primary, 0.6), icon: 'saw-blade', id: 2 },
    { name: 'Hundegger\nSC1', value: 38, color: rgb2hex(colors.primary, 0.4), icon: 'saw-blade', id: 3 },
    { name: 'Rest', value: 8, color: rgb2hex(colors.primary, 0.2), icon: 'checkbox-blank-circle-outline', id: 4 }
  ]

  return (
    <Surface elevation={0} style={{ flex: 1 }}>
      <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
        <Surface elevation={1}>
          <DonutChart
            data={DATA}
            strokeWidth={15}
            radius={90}
            containerWidth={screenWidth}
            containerHeight={230}
            labelTitleStyle={{ textAlign: "center" }}
          />
          <Surface elevation={0} style={{ flexDirection: 'row', bottom: 20 }}>
            {DATA.map((item: any) => (
              <Surface key={`item-key-${item.id}`} elevation={0} style={{ flex: 0.2, alignItems: 'center' }}>
                <Icon
                  color={item.color}
                  source={item.icon}
                  size={18}
                />
                <Text variant="labelLarge" style={{ textAlign: 'center', fontWeight: 800, color: rgb2hex(colors.onPrimaryContainer, 0.8) }}>{item.value}%</Text>
                <Text variant="labelMedium" style={{ textAlign: 'center', color: rgb2hex(colors.onPrimaryContainer, 0.6) }}>{item.name}</Text>
              </Surface>
            ))}
          </Surface>
        </Surface>
        <Levels />
      </ScrollView>
      <MyComponent />
    </Surface>
  )

}

export default SawingList;