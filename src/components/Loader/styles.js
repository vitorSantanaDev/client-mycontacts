import styled, { css } from 'styled-components'

export const Overlay = styled.div`
	${() => css`
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: rgba(246, 245, 252, 0.7);

		display: flex;
		align-items: center;
		justify-content: center;
	`}
`
