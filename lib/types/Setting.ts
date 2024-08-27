import { Color, Language } from '@/lib/types'

type Setting = {
  color: Color
  theme: 'light' | 'dark' | 'auto'
  language: Language | 'auto'
}

export default Setting
