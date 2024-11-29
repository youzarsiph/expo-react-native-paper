/**
 * Locales
 */

import { I18n } from 'i18n-js'

import Arabic from '@/lib/locales/ar'
import English from '@/lib/locales/en'
import Turkish from '@/lib/locales/tr'

const Locales = new I18n({
  ar: Arabic,
  en: English,
  tr: Turkish,
})

Locales.enableFallback = true

export { Locales }
