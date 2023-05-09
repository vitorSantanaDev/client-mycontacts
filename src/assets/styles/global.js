import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: ${({ theme }) => theme.font.family};
	}

	html {
      font-size: 62.5%;
  }

	body {
		font-size: ${({ theme }) => theme.font.sizes.medium};
		background-color: ${({ theme }) => theme.colors.mainBg};
	}

	button {
		cursor: pointer;
	}
`
