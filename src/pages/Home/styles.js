import styled, { css } from 'styled-components'

export const Container = styled.div`
	${({ theme }) => css`
		margin-top: ${theme.spacings.medium};
	`}
`

export const Header = styled.header`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;

		strong {
			color: ${theme.colors.gray[900]};
			font-size: calc(${theme.font.sizes.xlarge} + 0.4rem);
		}

		a {
			text-decoration: none;
			color: ${theme.colors.primary.main};
			border-radius: ${theme.border.radius};
			font-weight: ${theme.font.bold};
			border: 2px solid ${theme.colors.primary.main};
			padding: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};

			&:hover {
				color: white;
				transition: all 0.2s ease-in;
				background-color: ${theme.colors.primary.main};
			}
		}
	`}
`

export const ListContainer = styled.div`
	${({ theme }) => css`
		margin-top: ${theme.spacings.small};

		header {
			button {
				border: none;
				display: flex;
				align-items: center;
				background: transparent;
				margin-bottom: 0.8rem;

				span {
					margin-right: 0.8rem;
					font-weight: bold;
					color: ${theme.colors.primary.main};
				}
			}
		}
	`}
`

export const Card = styled.div`
	${({ theme }) => css`
		border-radius: 4px;
		background-color: white;
		padding: ${theme.spacings.xsmall};

		display: flex;
		align-items: center;
		justify-content: space-between;

		& + & {
			margin-top: ${theme.spacings.xsmall};
		}

		.info {
			.contact-name {
				display: flex;
				align-items: center;

				small {
					padding: 0.4rem;
					margin-left: 0.8rem;
					text-transform: uppercase;
					font-weight: ${theme.font.bold};
					color: ${theme.colors.primary.main};
					border-radius: ${theme.border.radius};
					background-color: ${theme.colors.primary.lighter};
				}
			}

			span {
				display: block;
				color: ${theme.colors.gray[200]};
				font-size: ${theme.font.sizes.small};
			}
		}

		.actions {
			display: flex;
			align-items: center;

			button {
				border: none;
				margin-left: 0.8rem;
				background-color: transparent;
			}
		}
	`}
`
