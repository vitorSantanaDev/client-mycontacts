import styled, { css } from 'styled-components'

export const Container = styled.header`
	${({ theme }) => css`
		a {
			display: flex;
			align-items: center;
			text-decoration: none;
			cursor: pointer;

			span {
				font-weight: ${theme.font.bold};
				color: ${theme.colors.primary.main};
			}

			img {
				margin-right: 0.8rem;
				transform: rotate(-90deg);
			}
		}

		h1 {
			font-size: calc(${theme.font.sizes.xlarge} + 0.4rem);
		}
	`}
`
