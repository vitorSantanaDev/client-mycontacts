import styled, { css } from 'styled-components'

export const InputComponent = styled.input`
	${({ theme, error }) => css`
		width: 100%;
		border: 2px solid white;
		outline: none;
		height: 5.2rem;
		background-color: white;
		font-family: ${theme.font.family};
		padding: 0 ${theme.spacings.xsmall};
		border-radius: ${theme.border.radius};
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
		appearance: none;

		transition: border-color 0.2s ease-in;

		${!!error &&
		css`
			color: ${theme.colors.danger.main};
			border-color: ${theme.colors.danger.main} !important;
		`}

		&:focus {
			border-color: ${theme.colors.primary.main};
		}

		&:disabled {
			border-color: ${theme.colors.gray[200]};
			background-color: ${theme.colors.gray[100]};
		}
	`}
`

export const SelectComponent = styled.select`
	${({ theme }) => css`
		width: 100%;
		border: 2px solid white;
		outline: none;
		height: 5.2rem;
		background-color: white;
		font-family: ${theme.font.family};
		padding: 0 ${theme.spacings.xsmall};
		border-radius: ${theme.border.radius};
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
		appearance: none;

		transition: border-color 0.2s ease-in;

		&:focus {
			border-color: ${theme.colors.primary.main};
		}

		&:disabled {
			opacity: 1;
			border-color: ${theme.colors.gray[200]};
			background-color: ${theme.colors.gray[100]};
		}
	`}
`
