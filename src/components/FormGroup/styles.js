import styled, { css } from 'styled-components'

export const Container = styled.div`
	${({ theme }) => css`
		& + & {
			margin-top: ${theme.spacings.xsmall};
		}
	`}
`
