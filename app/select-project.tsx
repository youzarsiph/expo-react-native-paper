import React from 'react'
import { Searchbar, Surface, ActivityIndicator, SegmentedButtons, Avatar, Card, IconButton, TouchableRipple } from 'react-native-paper'
import { ScrollView, Platform, RefreshControl, Alert } from 'react-native'
import axios from 'axios'
import { ScreenInfo, styles } from '@/lib/ui'

const Search = () => {

  const [query, setQuery] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [value, setValue] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [projects, setProjects] = React.useState([])
  const [filteredProjects, setFilteredProjects] = React.useState([])
  const [projectLoading, setProjectLoading] = React.useState(true)

  async function fetchProjects() {
    try {
      const response = await axios.post('http://app.frame-house.eu/api/project/select-projects.php', { action: 'select_projects' })
      if (response.data.status === 'success') {
        setProjects(response.data.projects)
        setFilteredProjects(response.data.projects)
        setProjectLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    fetchProjects()
    setRefreshing(false)
  }, [])

  React.useEffect(() => {
    fetchProjects()
  }, [])

  // Search logic
  React.useEffect(() => {
    if (query !== '') {
      setLoading(true)
      const filteredItems = projects.filter((p: any) =>
        p.project_name.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredProjects(filteredItems)
    } else {
      setFilteredProjects(projects)
    }

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [query])

  if (projectLoading === true) {
    return (
      <Surface style={styles.screen}>
        <ActivityIndicator animating={true} size={'large'} />
      </Surface>
    )
  }

  const ProjectList = () => {
    let list = filteredProjects.map((project: any) => {

      function getUserInitial(userName: string) {
        const parts = userName ? userName.split(/[ -]/) : [];
        let initials = '';
        for (let i = 0; i < parts.length; i += 1) {
          initials += parts[i].charAt(0);
        }
        if (initials.length > 2 && initials.search(/[A-Z]/) !== -1) {
          initials = initials.replace(/[a-z]+/g, '');
        }
        initials = initials.substr(0, 2).toUpperCase();
        return initials;
      }

      function getRandomColor(str: string, s: number, l: number) {
        var hash = 0
        for (var i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash)
        }
        var h = hash % 360
        return 'hsl(' + h + ', ' + s + '%, ' + l + '%)'
      }

      let bottom_spacing;
      Platform.OS == 'android' ? bottom_spacing = 2 : bottom_spacing = 0

      return (
        <Card
          style={{ marginTop: 8, marginBottom: 8, marginHorizontal: 16 }}
          key={project.project_name}
        >
          <TouchableRipple borderless style={{ borderRadius: 10 }} rippleColor='rgba(0, 0, 0, .05)' onPress={() => console.log('click')}>
            <Card.Title
              title={project.project_name}
              titleStyle={{ fontWeight: 800 }}
              subtitle="Preparing | in production | awaiting shiping..."
              left={(props) => <Avatar.Text {...props} labelStyle={{ fontSize: 20, bottom: bottom_spacing }} style={{ alignItems: 'center', backgroundColor: getRandomColor(project.project_name, 35, 40) }} size={48} label={getUserInitial(project.project_name)} />}
              right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => { }} />}
            ></Card.Title>
          </TouchableRipple>
        </Card>
      )
    })
    return list
  }

  return (
    <Surface style={{ flex: 1, gap: 8 }}>
      <Searchbar
        value={query}
        loading={loading}
        onChangeText={(v) => setQuery(v)}
        placeholder="Search project..."
        style={{ marginTop: 16, marginHorizontal: 16 }}
      />
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        style={{ marginTop: 8, marginHorizontal: 16 }}
        buttons={[
          {
            value: 'in_queue',
            label: 'In queue',
            icon: 'checkbox-blank-circle-outline'
          },
          {
            value: 'finished',
            label: 'Finished',
            icon: 'check-circle-outline'
          }
        ]}
      />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <ProjectList />
      </ScrollView>
    </Surface>
  )
}

export default Search
