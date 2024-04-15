/**
 * Locales
 */

import { I18n } from "i18n-js";

import Arabic from "@/locales/ar";
import English from "@/locales/en";
import Turkish from "@/locales/tr";

const Locales = new I18n({
  ar: Arabic,
  en: English,
  tr: Turkish,
});

Locales.enableFallback = true;

export default Locales;
