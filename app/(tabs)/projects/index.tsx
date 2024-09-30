import React from 'react'
import { router } from 'expo-router'
import { Searchbar, Surface, ActivityIndicator, SegmentedButtons, Avatar, Card, IconButton, TouchableRipple, Banner } from 'react-native-paper'
import { ScrollView, Platform, RefreshControl, Dimensions } from 'react-native'
import axios from 'axios'
import { styles } from '@/lib/ui'
import useFramerStore from '@/lib/utils/store'

const SelectProject = () => {

  const [query, setQuery] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [value, setValue] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [projects, setProjects] = React.useState([])
  const [filteredProjects, setFilteredProjects] = React.useState([])
  const [projectLoading, setProjectLoading] = React.useState(true)
  const deviceWidth = Dimensions.get("window").width;

  const { projectsSBVisible, activeProject, setActiveProject, setOpenedProjectName } = useFramerStore()

  async function fetchProjects() {
    try {
      const response = await axios.post('https://app.frame-house.eu/api/select-projects', { action: 'select-projects' })
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

      let bottom_spacing
      Platform.OS == 'android' ? bottom_spacing = 2 : bottom_spacing = 0

      return (
        <Card
          style={{ marginVertical: 8, marginHorizontal: 16 }}
          key={`project-card-${project.project_id}`}
          elevation={1}
        >
          <TouchableRipple
            borderless
            style={{ borderRadius: 10 }}
            rippleColor='rgba(0, 0, 0, .05)'
            onPress={() => {
              setOpenedProjectName(project.project_name)
              router.push({ pathname: `/open-project/${project.project_id}` })
            }}
          >
            <Card.Title
              title={project.project_name}
              titleStyle={{ fontWeight: 800 }}
              subtitle="Project information..."
              left={(props) => <Avatar.Text
                {...props}
                size={48}
                style={{ alignItems: 'center', backgroundColor: getRandomColor(project.project_name, 35, 40) }}
                labelStyle={{ fontSize: 20, bottom: bottom_spacing }}
                label={getUserInitial(project.project_name)}
              />}
              right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => {
                setActiveProject({ id: project.project_id, name: project.project_name })
                router.push({ pathname: `/projects/sawing-list` })
              }} />}
            ></Card.Title>
          </TouchableRipple>
        </Card>
      )
    })
    return list
  }

  return (
    <Surface elevation={1} style={{ flex: 1 }}>
      <Banner visible={projectsSBVisible} elevation={1} style={{ zIndex: 999 }}>
        <Searchbar
          value={query}
          loading={loading}
          onChangeText={(v) => setQuery(v)}
          placeholder="Search..."
          style={{ width: (deviceWidth - 32) }}
          elevation={1}
        />
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          style={{ paddingTop: 16, width: (deviceWidth - 32) }}
          buttons={[
            {
              value: 'pending',
              label: 'Pending',
              icon: 'checkbox-blank-circle-outline'
            },
            {
              value: 'current',
              label: 'Current',
              icon: 'play-speed'
            },
            {
              value: 'finished',
              label: 'Finished',
              icon: 'check-circle-outline'
            }
          ]}
        />
      </Banner>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <ProjectList />
      </ScrollView>
    </Surface>
  )
}

export default SelectProject