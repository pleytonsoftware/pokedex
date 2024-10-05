import 'i18next'

import type { LOCALE_NAMESPACES } from '@constants/translate'
import type commonNS from '../public/locales/en/common.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: [typeof LOCALE_NAMESPACES.common]
    resources: {
      common: typeof commonNS
    }
  }
}
