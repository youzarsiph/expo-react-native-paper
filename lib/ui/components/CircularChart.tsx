import { Dimensions, StyleSheet } from "react-native"
import { Surface, Icon, Text, useTheme } from "react-native-paper"
import { DonutChart } from "react-native-circular-chart"
import { rgb2hex } from "@/lib/utils"

type DonutDataProps = {
    id: number,
    name: string,
    value: number | string,
    color: string,
    icon: string
}

const CircularChart = ({ data, config }: any) => {

    const screenWidth = Dimensions.get("window").width
    const colors = useTheme().colors
    const itemWidth = (1 / data.length)

    const style = StyleSheet.create({
        labelContainer: {
            flex: 1,
            flexDirection: "row"
        },
        lables: {
            flex: itemWidth,
            alignItems: "center",
            textAlignVertical: "bottom"
        },
        labelTitle: {
            textAlign: "center"
        }
    })

    return (
        <Surface elevation={0}>
            <DonutChart
                data={data}
                strokeWidth={15}
                radius={90}
                containerWidth={screenWidth - (config.horizontalPadding * 2)}
                containerHeight={config.containerHeight}
                labelTitleStyle={{ textAlign: "center" }}
            />
            <Surface elevation={0} style={style.labelContainer}>
                {data.map(
                    (item: DonutDataProps) => (
                        <Surface elevation={0} style={style.lables}>
                            <Icon
                                color={colors.primary}
                                source={item.icon}
                                size={18}
                            />
                            <Text variant="labelLarge" style={{ textAlign: 'center', fontWeight: 800, color: rgb2hex(colors.onPrimaryContainer, 0.8) }}>{item.value}%</Text>
                            <Text variant="labelMedium" style={style.labelTitle}>{item.name}</Text>
                        </Surface>
                    )
                )}
            </Surface>
        </Surface>
    )
}

export default CircularChart