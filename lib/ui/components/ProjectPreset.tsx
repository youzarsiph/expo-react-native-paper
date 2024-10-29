import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg'

import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

const ProjectPreset = (props: any) => {

    const { preset } = props
    let config

    switch (preset) {
        case "Basic":
            config = {
                externalOsb: true
            }
            break;
        case "Standart":
            config = {
                internalOsb: true,
                insulation: true,
                externalOsb: true
            }
            break;
        case "Standart with vapor membrane":
            config = {
                internalOsb: true,
                vaporMembrane: true,
                insulation: true,
                externalOsb: true
            }
            break;
        case "Standart with facade insulation 50mm":
            config = {
                internalOsb: true,
                vaporMembrane: true,
                insulation: true,
                externalOsb: true,
                facadeInsulation: true,
                facadeInsulation50: true
            }
            break;
        case "Standart with lathing and vapor membrane":
            config = {
                internalOsb: true,
                vaporMembrane: true,
                insulation: true,
                externalOsb: true,
                windMembrane: true,
                lathing: true,
                lathing45: true
            }
            break;
        case "Passive":
            config = {
                internalOsb: true,
                vaporMembrane: true,
                insulation: true,
                externalOsb: true,
                windMembrane: true,
                facadeInsulation: true,
                facadeInsulation100: true
            }
            break;
        case "Passive with lathing":
            config = {
                internalOsb: true,
                vaporMembrane: true,
                insulation: true,
                externalOsb: true,
                windMembrane: true,
                facadeInsulation: true,
                facadeInsulation100: true,
                lathing: true,
                lathing120: true
            }
            break;
        default:
            config = {
                frame: true
            }
            break;
    }

    return (
        <View
            style={[
                StyleSheet.absoluteFill,
                { alignItems: 'center', justifyContent: 'center' },
            ]}>
            <Svg height="100%" width="100%" viewBox="0 0 120 120">

                <Defs>
                    <Pattern id='a' patternUnits='userSpaceOnUse' width='100' height='100' patternTransform='scale(0.15) rotate(0)'>
                        <Rect x='0' y='0' width='100%' height='100%' fill='#fbe0a0ff' />
                        <Path d='M100 20.234v41.641q-6.719 7.656-10.234 17.812-3.36 9.766-3.125 20.313h-3.438v-4.531q0-2.657.39-4.532l.626-3.359.703-3.281 2.265-7.656q1.329-4.22 2.813-7.344.781-1.719 2.812-4.453l2.891-4.297.86-2.578.312-2.735q.156-5-.547-13.203l-2.344-20.937Q92.656 8.516 92.422 0h6.797q-.078 6.172.078 10.156.156 5.547.703 10.078m0 49.532v20.468q-.469 2.11-.703 4.844L99.063 100H92.5l-.078-8.594q0-5.156.547-8.515.469-3.047 2.89-6.797L100 69.766M79.219 100h-3.672l.39-8.36.938-8.359q1.016-6.953 1.875-10.781 1.328-5.86 3.36-10.313l2.5-6.015 1.562-6.328.547-5q.078-2.813-.703-4.844l-3.282-9.531-3.28-9.531q-1.876-6.094-2.735-10.313Q75.547 4.922 75.547 0h3.672q.078 8.516 2.422 17.031 2.343 8.282 6.718 15.782l-2.03-11.016-1.876-11.016-.86-5.312L83.126 0h3.516l.234 4.531.547 4.532 2.5 16.25 2.422 16.328q1.015 8.125.156 15.625l-.625 3.28q-.547 1.798-1.562 2.97l-1.875 1.953q-1.094 1.172-1.641 2.187-1.64 2.735-2.89 7.813l-2.423 8.047q-1.406 3.515-1.875 8.125-.39 3.125-.39 8.359m-6.406 0H64.53q-2.11-9.922-1.718-18.828.39-4.922 1.796-8.203l2.97-7.5q1.405-4.219 1.718-7.89.312-2.735-.39-5.313-.704-2.657-2.345-4.844-2.343-3.125-5.78-6.328l-.938 2.5-.86 2.656q-2.343 6.797-4.922 11.953-3.125 6.25-7.03 10.86-1.485 2.265-2.579 5.312-.781 2.344-1.484 5.781Q41.25 88.75 41.25 100h-6.484l.312-12.266q.39-6.718 1.64-12.265 1.72-7.344 4.844-11.407l2.344-2.5 2.344-2.5q2.5-2.968 3.906-6.875 1.328-3.671 1.485-7.734.156-5.156-.86-12.5L48.906 19.61Q47.578 8.516 47.97 0h10.078q-.625 12.188 1.875 22.11 2.422 9.218 8.515 16.25l5 5.234q3.047 3.203 4.375 5.781 2.657 4.922.938 12.266-1.016 4.609-3.906 10.859-1.172 2.578-1.797 5.86-.547 2.5-.781 6.093-.391 7.266.546 15.547m-14.765 0H47.969V89.453q.312-5.937 1.718-10.39 4.297-12.657 10.157-22.813l1.797-3.047 2.109-2.812q1.25 4.687-1.094 11.562-5.625 16.953-4.61 38.047m-29.296 0H17.969l.234-5.781.469-5.782L21.25 65.86l2.422-22.578q1.172-12.031-1.875-21.797-1.719 3.047-2.969 7.5l-2.031 7.813q-.469 1.719-.547 4.219l.078 4.218-.547 11.094-1.797 10.469Q12.5 74.062 12.11 77.266q-.39 2.734-.312 6.406l.234 6.406.39 5q.235 2.813.704 4.922H5.781V81.25l-.078-6.016Q1.563 81.797 0 89.844v-20.39q5.86-10.47 7.422-22.657 1.25-9.14.078-23.36L6.406 11.72Q5.86 4.844 5.781 0h7.344l1.406 11.328 1.094 11.328q1.25-2.422 1.797-6.015l.625-6.25.078-5.157L17.969 0h10.86q.077 2.969.702 6.953l1.172 6.797 1.64 11.094q.626 6.172.157 11.172-.547 4.297-2.031 9.687L27.5 55.078q-2.031 6.719-2.344 14.531-.078 3.75.625 8.36l1.563 8.203.703-2.422 4.531-18.672q2.344-10.312 3.594-18.828.625-3.984.625-9.062l-.313-9.141-1.093-13.984Q34.688 5.547 34.766 0h6.484q-.078 8.984 1.953 19.688l1.64 8.75q.938 5.078.938 8.75 0 3.828-1.015 7.5-.938 3.671-2.813 6.874-4.61 9.375-7.812 20.47-2.813 9.687-4.766 21.405-.703 3.75-.625 6.563M0 61.797V19.766l.781 4.375.703 4.453 2.344 13.984.235 1.563.234 2.343Q5.078 54.61 0 61.797M64.61 0h8.202q-.39 7.266.157 11.953l.86 4.531 1.25 4.532 3.593 13.672 3.36 13.671.546 2.657.156 2.656-2.343-6.406q-1.407-3.516-3.047-6.172l-4.14-6.64-4.298-6.563q-1.172-1.953-1.875-4.61-.547-1.875-.937-4.922Q64.844 9.453 64.609 0' stroke-width='1' stroke='none' fill='hsla(47,80.9%,61%,1)' />
                    </Pattern>
                    
                    <Pattern id='b' patternUnits='userSpaceOnUse' width='60' height='60' patternTransform='scale(0.2) rotate(0)'>
                        <Rect x='0' y='0' width='100%' height='100%' fill='#5e6a26ff' />
                        <Path d='M15 30v30m-7.5 0V30h15v30m7.5 0H0V30h30M45 0v30m7.5-30v30m-15 0V0M30 0h30v30M30 45h30m-30-7.5h30m0 15H30M30 30h30v30H30zM0 15h30M0 7.5h30m0 15H0M0 0h30v30H0z' stroke-width='1' stroke='#758316ff' fill='none' />
                    </Pattern>
                </Defs>

                <Polygon
                    // OSB3 12mm from inside (Standart)
                    opacity={config.internalOsb ? 100 : 0}
                    points="0,0 120,0 120,120, 0,120"
                    fill="url(#a)"
                    stroke="#e6b800"
                    strokeWidth="0.7"
                />
                <Polygon
                    // Vapor membrane
                    opacity={config.vaporMembrane ? 100 : 0}
                    points="30,7 50,7 7,50 7,30"
                    fill="#eee"
                    stroke="#aaa"
                    strokeWidth="0.7"
                />
                <Polygon
                    // Insulation
                    opacity={config.insulation ? 100 : 0}
                    points="50,7 100,7 7,100 7,50"
                    fill="url(#b)"
                    stroke="#7a7a52"
                    strokeWidth="0.7"
                />
                <Rect
                    x="0"
                    y="0"
                    width="120"
                    height="7"
                    stroke="#8B4513"
                    strokeWidth="0.7"
                    fill="#DEB887"
                />
                <Rect
                    x="0"
                    y="7"
                    width="7"
                    height="106"
                    stroke="#8B4513"
                    strokeWidth="0.7"
                    fill="#DEB887"
                />
                <Rect
                    x="56.5"
                    y="7"
                    width="7"
                    height="106"
                    stroke="#8B4513"
                    strokeWidth="0.7"
                    fill="#DEB887"
                />
                <Rect
                    x="113"
                    y="7"
                    width="7"
                    height="106"
                    stroke="#8B4513"
                    strokeWidth="0.7"
                    fill="#DEB887"
                />
                <Rect
                    x="0"
                    y="113"
                    width="120"
                    height="7"
                    stroke="#8B4513"
                    strokeWidth="0.7"
                    fill="#DEB887"
                />

                <Polygon
                    // External OSB3 12mm
                    opacity={config.externalOsb ? 100 : 0}
                    points="100,1 119,1 119,119 1,119 1,100"
                    fill="url(#a)"
                    stroke="#997a00"
                    strokeWidth="0.7"
                />
                <Polygon
                    // Wind membrane
                    opacity={config.windMembrane ? 100 : 0}
                    points="1,119 20,119 119,119 119,20 119,1"
                    fill="#808080"
                    stroke="#666666"
                    strokeWidth="0.7"
                />
                <Polygon
                    // Facade insulation (50 or 100mm)
                    opacity={config.facadeInsulation ? 100 : 0}
                    points="20,119 119,119 119,20"
                    fill="url(#b)"
                    stroke="#7a7a52"
                    strokeWidth="0.7"
                />
                <G rotation="-45" origin="37, 10" opacity={config.internalOsb ? 100 : 0}>
                    <Text
                        fill="#333"
                        fontSize="7"
                        fontWeight="bold">OSB 12mm</Text>
                </G>
                <G rotation="-45" origin="60, 18" opacity={config.vaporMembrane ? 100 : 0}>
                    <Text
                        fill="#333"
                        fontSize="7"
                        fontWeight="bold">Vapour membrane</Text>
                </G>
                <G rotation="-45" origin="112, 40" opacity={config.insulation ? 100 : 0}>
                    <Text
                        fill="#333"
                        fontSize="7"
                        fontWeight="bold">Insulation 200mm</Text>
                </G>
                <G rotation="-45" origin="137, 50" opacity={config.externalOsb ? 100 : 0}>
                    <Text
                        fill="#333"
                        fontSize="7"
                        fontWeight="bold">OSB 12mm</Text>
                </G>
                <G rotation="-45" origin="152, 41" opacity={config.windMembrane ? 100 : 0}>
                    <Text
                        fill="#333"
                        fontSize="7"
                        fontWeight="bold">Wind membrane</Text>
                </G>
                <Polygon
                    // Facade lathing
                    opacity={config.lathing ? 100 : 0}
                    points="59,80 59,120 63.5,120 63.5,75.5"
                    stroke="#8B4513"
                    strokeWidth="0.7"
                    fill="#DEB887"
                />
                <Polygon
                    // Facade lathing
                    opacity={config.lathing ? 100 : 0}
                    points="115,24 115,120 119,120 119,19.5"
                    stroke="#8B4513"
                    strokeWidth="0.7"
                    fill="#DEB887"
                />
                <G rotation="-45" origin="159, 17" opacity={config.facadeInsulation100 ? 100 : 0}>
                    <Text
                        fill="#333"
                        fontSize="7"
                        fontWeight="bold">Facade insulation 100mm</Text>
                </G>
                <G rotation="-45" origin="159, 17" opacity={config.facadeInsulation50 ? 100 : 0}>
                    <Text
                        fill="#333"
                        fontSize="7"
                        fontWeight="bold">Facade insulation 50mm</Text>
                </G>
                <G rotation="-45" origin="167, 0" opacity={config.lathing45 ? 100 : 0}>
                    <Text
                        fill="#333"
                        fontSize="7"
                        fontWeight="bold">Lathing 45mm</Text>
                </G>
                <G rotation="-45" origin="167, 0" opacity={config.lathing120 ? 100 : 0}>
                    <Text
                        fill="#333"
                        fontSize="7"
                        fontWeight="bold">Lathing 120mm</Text>
                </G>
            </Svg>
        </View>
    )
}

export default ProjectPreset