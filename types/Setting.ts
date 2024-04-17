import { Color, Language } from '@/types'

type Setting = {
  color: Color
  theme: 'light' | 'dark' | 'auto'
  language: Language | 'auto'
}

export default Setting
