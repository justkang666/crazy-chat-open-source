import ElementPlus from 'element-plus'
import { createI18n } from 'vue-i18n'
import 'element-plus/lib/theme-chalk/index.css'
import localeZH from 'element-plus/lib/locale/lang/zh-cn'
import localeEN from 'element-plus/lib/locale/lang/en'

const i18n = createI18n({
  locale: localeZH.name,
  fallbackLocale: localeEN.name,
})

export default (app) => {
  app.use(ElementPlus, { locale:localeZH })
  app.use(i18n)
}
