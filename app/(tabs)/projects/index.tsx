import React, { useState } from 'react'
import { Surface, Text, List, DataTable, Icon, ProgressBar, Menu, Button } from 'react-native-paper'
import { Platform, View } from 'react-native'

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
        <ProgressBar progress={0.38} /></View>
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
    </>
  );
};

const MyComponent = () => {
  return (
    <>
      <List.AccordionGroup>
        <List.Accordion title="First level walls" id="1" left={props => <List.Icon {...props} icon="folder-outline" />}>
          <MyComponent2 />
        </List.Accordion>
        <List.Accordion title="Joist system" id="2" left={props => <List.Icon {...props} icon="folder-outline" />}>
          <MyComponent2 />
        </List.Accordion>
        <List.Accordion title="Rafter system" id="3" left={props => <List.Icon {...props} icon="folder-outline" />}>
          <MyComponent2 />
        </List.Accordion>
      </List.AccordionGroup>
    </>
  )
};

export default MyComponent;