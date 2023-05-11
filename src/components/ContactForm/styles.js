import styled, { css } from 'styled-components'

export const Form = styled.form``

export const ButtonContainer = styled.div`
	${({ theme }) => css`
		margin-top: ${theme.spacings.small};

		button {
			width: 100%;
		}
	`}
`
