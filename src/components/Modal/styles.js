import styled, { css } from 'styled-components'

export const Overlay = styled.div`
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	position: fixed;
	backdrop-filter: blur(5px);
	background-color: rgba(0, 0, 0, 0.6);

	display: flex;
	align-items: center;
	justify-content: center;
`

export const Container = styled.div`
	${({ theme, danger }) => css`
		background-color: white;
		padding: ${theme.spacings.small};
		border-radius: ${theme.border.radius};
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
		max-width: 45rem;
		width: 100%;

		h1 {
			font-size: 2.4rem;
			color: ${danger ? theme.colors.danger.main : theme.colors.gray[900]};
		}

		p {
			margin-top: 0.8rem;
		}
	`}
`

export const Footer = styled.footer`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-top: ${theme.spacings.medium};

		.cancel-button {
			border: none;
			background-color: transparent;
			font-size: ${theme.font.sizes.medium};
			margin-right: 0.8rem;
			color: ${theme.colors.gray[200]};
		}
	`}
`
