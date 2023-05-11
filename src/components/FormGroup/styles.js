import styled, { css } from 'styled-components'

export const Container = styled.div`
	${({ theme }) => css`
		& + & {
			margin-top: ${theme.spacings.xsmall};
		}

		small {
			display: block;
			margin-top: 0.8rem;
			font-size: 1.2rem;
			color: ${theme.colors.danger.main};
		}
	`}
`
