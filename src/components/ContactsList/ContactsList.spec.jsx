import React from 'react'
import renderWithTheme from '../../utils/render-with-theme'

import ContactsList from '.'
import { screen } from '@testing-library/react'

describe('<ContactsList />', () => {
	it('should render the contacts list component correctly', () => {
		renderWithTheme(<ContactsList />)

		expect(screen.getAllByAltText(/edit/i)).toHaveLength(3)
		expect(screen.getAllByAltText(/delete/i)).toHaveLength(3)
		expect(screen.getAllByText(/vitor santana/i)).toHaveLength(3)
		expect(screen.getAllByText(/instagram/i)).toHaveLength(3)
		expect(screen.getAllByText(/vitor@email.com/i)).toHaveLength(3)
		expect(screen.getAllByText('(41) 99999-9900')).toHaveLength(3)
	})
	it('should match snapshot', () => {
		const { container } = renderWithTheme(<ContactsList />)

		expect(container.firstChild).toMatchSnapshot()
	})
})
