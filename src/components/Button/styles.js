import styled, { css } from 'styled-components'

export const StyledButton = styled.button`
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

		display: flex;
		align-items: center;
		justify-content: center;

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
