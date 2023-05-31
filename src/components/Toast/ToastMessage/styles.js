import styled, { css } from 'styled-components'

const containerVariants = {
	default: (theme) => css`
		background-color: ${theme.colors.primary.main};
	`,
	success: (theme) => css`
		background-color: ${theme.colors.success.main};
	`,
	danger: (theme) => css`
		background-color: ${theme.colors.danger.main};
	`
}

export const Container = styled.div`
	${({ theme, type }) => css`
		padding: ${theme.spacings.xsmall} ${theme.spacings.medium};
		color: white;
		border-radius: ${theme.border.radius};
		box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);

		${containerVariants[type](theme) || containerVariants.default(theme)}

		display: flex;
		align-items: center;
		justify-content: center;

		& + & {
			margin-top: 1.2rem;
		}

		img {
			margin-right: 0.8rem;
		}
	`}
`
