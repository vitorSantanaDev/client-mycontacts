import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import renderWithTheme from '../../utils/render-with-theme'

import PageHeader from '.'
import { screen } from '@testing-library/react'

describe('<Header />', () => {
	it('should render the Page Header component correctly', () => {
		renderWithTheme(
			<MemoryRouter>
				<PageHeader title="Novo contato" />
			</MemoryRouter>
		)

		expect(
			screen.getByRole('heading', { name: /Novo contato/i })
		).toBeInTheDocument()
	})
	it('should match snapshot', () => {
		const { container } = renderWithTheme(
			<MemoryRouter>
				<PageHeader title="Novo contato" />
			</MemoryRouter>
		)

		expect(container.firstChild).toMatchSnapshot()
	})
})
