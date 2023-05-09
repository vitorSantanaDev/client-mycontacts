import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import defaultTheme from '../assets/styles/themes/default'

export default function renderWithTheme(children) {
	return render(<ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>)
}
