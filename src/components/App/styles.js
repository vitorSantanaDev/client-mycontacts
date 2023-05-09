import styled, { css } from 'styled-components'

export const Container = styled.div`
	${({ theme }) => css`
		width: 100%;
		margin: 0 auto;
		max-width: ${theme.grid.container};
	`}
`
