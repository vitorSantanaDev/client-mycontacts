import styled, { css } from 'styled-components'

export const Container = styled.header`
	${({ theme }) => css`
		display: flex;
		margin-top: 7.4rem;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		margin-bottom: ${theme.spacings.xlarge};
	`}
`
