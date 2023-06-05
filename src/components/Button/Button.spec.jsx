import React from 'react'

import Button from '.'
import renderWithTheme from '../../utils/render-with-theme'
import { screen } from '@testing-library/react'
import defaultTheme from '../../assets/styles/themes/default'
import userEvent from '@testing-library/user-event'

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

describe('<Button />', () => {
	it('should render button with default props', () => {
		renderWithTheme(<Button>Button</Button>)

		const button = screen.getByRole('button', { name: /button/i })

		expect(button).toBeInTheDocument()
		expect(button.getAttribute('type')).toStrictEqual('button')
		expect(button).toHaveStyle({
			backgroundColor: defaultTheme.colors.primary.main
		})
	})

	it('should render button with background danger, when prop danger is true', () => {
		renderWithTheme(<Button danger>Button</Button>)

		const button = screen.getByRole('button', { name: /button/i })

		expect(button).toHaveStyle({
			backgroundColor: defaultTheme.colors.danger.main
		})
	})

	it('should render the button with a spinner when prop loading is true', () => {
		renderWithTheme(<Button isLoading>Button</Button>)

		const spinner = screen.getByTestId('Mock Spinner Component')

		const button = spinner.parentElement

		expect(spinner).toBeInTheDocument()

		expect(button).toHaveStyle({
			backgroundColor: '#ccc',
			cursor: 'not-allowed'
		})
	})

	it('should call the handleClick function when the button is clicked', () => {
		const handleClick = jest.fn()
		renderWithTheme(<Button onClick={handleClick}>Button</Button>)

		const button = screen.getByRole('button', { name: /button/i })
		userEvent.click(button)

		expect(handleClick).toBeCalledTimes(1)
	})

	it('should match snapshot', () => {
		const { container } = renderWithTheme(<Button>Button</Button>)

		expect(container.firstChild).toMatchSnapshot()
	})
})
