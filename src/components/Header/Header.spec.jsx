import React from 'react'
import renderWithTheme from '../../utils/render-with-theme'

import Header from '.'
import { screen } from '@testing-library/react'

describe('<Header />', () => {
	it('should render the header component correctly', () => {
		renderWithTheme(<Header />)

		expect(screen.getByAltText(/My contacts/i)).toBeInTheDocument()
	})
	it('should match snapshot', () => {
		const { container } = renderWithTheme(<Header />)

		expect(container.firstChild).toMatchSnapshot()
	})
})
