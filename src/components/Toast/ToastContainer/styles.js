import styled, { css } from 'styled-components'

export const Container = styled.div`
	${() => css`
		z-index: 2;
		position: fixed;
		bottom: 4.8rem;
		left: 50%;
		transform: translateX(-50%);
		cursor: pointer;
	`}
`
