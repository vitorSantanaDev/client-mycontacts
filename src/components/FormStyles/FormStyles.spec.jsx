import React from 'react'
import { InputComponent, SelectComponent } from '.'
import renderWithTheme from '../../utils/render-with-theme'
import { screen } from '@testing-library/react'
import defaultTheme from '../../assets/styles/themes/default'

describe('InputComponent', () => {
	it('should render the input with error styles when there is any error', () => {
		renderWithTheme(
			<InputComponent placeholder="Input error" error="Há algum error" />
		)

		const inputElement = screen.getByPlaceholderText('Input error')

		expect(inputElement).toHaveStyle({
			color: defaultTheme.colors.danger.main,
			borderColor: defaultTheme.colors.danger.main
		})
	})
	it('should macth snapshot', () => {
		const { container } = renderWithTheme(<InputComponent />)

		expect(container.firstChild).toMatchInlineSnapshot(`
		.c0 {
		  width: 100%;
		  border: 2px solid white;
		  outline: none;
		  height: 5.2rem;
		  background-color: white;
		  font-family: 'Sora',sans-serif;
		  padding: 0 1.6rem;
		  border-radius: 0.4rem;
		  box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
		  -webkit-appearance: none;
		  -moz-appearance: none;
		  appearance: none;
		  -webkit-transition: border-color 0.2s ease-in;
		  transition: border-color 0.2s ease-in;
		}

		.c0:focus {
		  border-color: #5061FC;
		}

		.c0:disabled {
		  border-color: #BCBCBC;
		  background-color: #E6E6E6;
		}

		<input
		  class="c0"
		/>
	`)
	})
})

describe('SelectComponent', () => {
	it('should macth snapshot', () => {
		const { container } = renderWithTheme(<SelectComponent />)

		expect(container.firstChild).toMatchInlineSnapshot(`
		.c0 {
		  width: 100%;
		  border: 2px solid white;
		  outline: none;
		  height: 5.2rem;
		  background-color: white;
		  font-family: 'Sora',sans-serif;
		  padding: 0 1.6rem;
		  border-radius: 0.4rem;
		  box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
		  -webkit-appearance: none;
		  -moz-appearance: none;
		  appearance: none;
		  -webkit-transition: border-color 0.2s ease-in;
		  transition: border-color 0.2s ease-in;
		}

		.c0:focus {
		  border-color: #5061FC;
		}

		.c0:disabled {
		  opacity: 1;
		  border-color: #BCBCBC;
		  background-color: #E6E6E6;
		}

		<select
		  class="c0"
		/>
	`)
	})
})
