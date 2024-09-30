import React, { useEffect, useState } from 'react'
import { Surface, Text, List, DataTable, Icon, ProgressBar, Button } from 'react-native-paper'
import { Platform, View, ScrollView, RefreshControl } from 'react-native'
import axios from 'axios'
import useFramerStore from '@/lib/utils/store'
import { LoadingIndicator } from '@/lib/ui/components'

import { ScreenInfo, styles } from '@/lib/ui'

const MyComponent2 = () => {

  const [items] = React.useState([
    {
      key: 1,
      name: 'AB/R/1',
      required: 15,
      finished: 9,
    },
    {
      key: 2,
      name: 'AB/R/2',
      required: 3,
      finished: 3,
    },
    {
      key: 3,
      name: 'AB/R/3',
      required: 9,
      finished: 9,
    },
    {
      key: 4,
      name: 'AB/R/4',
      required: 31,
      finished: 16,
    },
  ]);

  return (
    <>
      <View>
        <ProgressBar progress={0.38} />
      </View>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Designation</DataTable.Title>
            <DataTable.Title>Required / finished</DataTable.Title>
            <DataTable.Title numeric>Status</DataTable.Title>
          </DataTable.Header>

          {items.map((item) => (
            <DataTable.Row key={item.key}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.required}/{item.finished}</DataTable.Cell>
              <DataTable.Cell numeric>
                {item.required == item.finished ? <Icon source="check-circle-outline" size={20} /> : <Icon source="checkbox-blank-circle-outline" size={20} />}
              </DataTable.Cell>
            </DataTable.Row>
          ))}

        </DataTable>
      </View>
    </>
  );
};

const SawingList = () => {

  const [loading, setLoading] = useState(true)
  const [levels, setLevels] = useState([])
  const { activeProject } = useFramerStore()

  async function loadSawingList() {
    setLoading(true)
    if (activeProject.id !== 0) {
      try {
        const response = await axios.post('https://app.frame-house.eu/api/load-sawing-list', { action: 'load-sawing-list', id: activeProject.id })
        if (response.data.status === 'success') {
          setLevels(response.data.levels)
        }
      } catch (error) {
        console.error(error)
      }
    }
    setLoading(false)
  }

  React.useEffect(() => {
    loadSawingList()
  }, [])

  const onRefresh = React.useCallback(() => {
    loadSawingList()
  }, [])

  if (loading === true) {
    return (<LoadingIndicator />)
  }

  const Levels = () => {
    let levelList = levels.map(
      (level: any) => (
        <List.Accordion title={level.level_name} id={`level-id-${level.level_id}`} key={`level-key-${level.level_id}`} left={props => <List.Icon {...props} icon="folder-outline" />}>
          <Text>{level.level_name}</Text>
        </List.Accordion>
      )
    )
    return (
      <List.AccordionGroup>{levelList}</List.AccordionGroup>
    )
  }
  console.log(levels)

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
      <Surface style={{ flex: 1 }}>
        <Levels />
      </Surface>
    </ScrollView>
  )
};

export default SawingList;