import React from 'react'
import { screen } from '@testing-library/react'

import FormGroup from '.'
import renderWithTheme from '../../utils/render-with-theme'

jest.mock('../Spinner', () => {
	return {
		__esModule: true,
		default: function Mock({ size }) {
			return (
				<div
					data-testid="Mock Spinner Component"
					style={{ fontSize: size }}
				></div>
			)
		}
	}
})

describe('<FormGroup />', () => {
	it('should render  the FromGroup component correctly', () => {
		const { container } = renderWithTheme(<FormGroup>Input</FormGroup>)

		expect(screen.getByText('Input')).toBeInTheDocument()
		expect(container.firstChild).toMatchInlineSnapshot(`
		.c0 + .c0 {
		  margin-top: 1.6rem;
		}

		.c1 small {
		  display: block;
		  margin-top: 0.8rem;
		  font-size: 1.2rem;
		  color: #FC5050;
		}

		.c1 .form-item {
		  position: relative;
		}

		.c1 .form-item .loader {
		  top: 1.8rem;
		  right: 1.6rem;
		  position: absolute;
		}

		<div
		  class="c0 c1"
		>
		  <div
		    class="form-item"
		  >
		    Input
		  </div>
		</div>
	`)
	})

	it('should render the error message if it exist', () => {
		renderWithTheme(<FormGroup error="Houve algum erro">Input</FormGroup>)

		expect(screen.getByText('Houve algum erro')).toBeInTheDocument()
	})

	it('should render a spinner if the isLoading prop is true', () => {
		renderWithTheme(<FormGroup isLoading>FormGroup</FormGroup>)

		const spinner = screen.getByTestId('Mock Spinner Component')
		expect(spinner).toBeInTheDocument()
	})
})
