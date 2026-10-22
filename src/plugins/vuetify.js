import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '../styles.css'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: { light: { colors: { primary: '#1976D2', success: '#4CAF50', info: '#2196F3', error: '#FF5252' } } },
  },
  defaults: {
    VBtn: { class: 'text-uppercase' },
    VTextField: { variant: 'underlined' },
    VSelect: { variant: 'underlined' },
  },
})
