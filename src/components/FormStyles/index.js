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
	`}
`

export const ButtonComponent = styled.button`
	${({ theme, danger }) => css`
		border: none;
		height: 5.2rem;
		color: white;
		font-weight: ${theme.font.bold};
		border-radius: ${theme.border.radius};
		font-size: ${theme.font.sizes.medium};
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
		background-color: ${danger
			? theme.colors.danger.main
			: theme.colors.primary.main};

		padding: ${theme.spacings.xsmall};

		transition: background 0.2s ease-in;

		&:hover {
			background-color: ${danger
				? theme.colors.danger.light
				: theme.colors.primary.light};
		}

		&:active {
			background-color: ${danger
				? theme.colors.danger.dark
				: theme.colors.primary.dark};
		}

		&:disabled {
			background-color: #ccc;
			cursor: not-allowed;
		}
	`}
`
