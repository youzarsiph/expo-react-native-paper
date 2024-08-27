import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'
import { Platform, useWindowDimensions } from 'react-native'
import { useTheme } from 'react-native-paper'

const GradientBackground = (props: { height?: 'full' }) => {
  const theme = useTheme()
  const { height, width } = useWindowDimensions()

  return Platform.OS !== 'web' ? (
    <Canvas
      style={{
        left: 0,
        right: 0,
        position: 'absolute',
        height: props.height ? height : 300,
        width,
      }}
    >
      <Rect x={0} y={0} width={width} height={props.height ? height : 300}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, width)}
          colors={[theme.colors.primary, theme.colors.inversePrimary]}
        />
      </Rect>
    </Canvas>
  ) : undefined
}

export default GradientBackground
