import styled, { css } from 'styled-components'

export const Container = styled.header`
	display: flex;
	margin-top: 7.4rem;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`

export const InputSearchContainer = styled.div`
	${({ theme }) => css`
		width: 100%;
		margin-top: ${theme.spacings.xlarge};

		input {
			width: 100%;
			height: 5rem;
			border: none;
			outline: none;
			border-radius: 2.5rem;
			background-color: white;
			padding: 0 ${theme.spacings.medium};
			box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

			&::placeholder {
				color: ${theme.colors.gray[200]};
			}
		}
	`}
`
