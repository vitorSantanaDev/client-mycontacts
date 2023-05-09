import { Container, InputSearchContainer } from './styles'

import Logo from '../../assets/images/logo-mycontacts.svg'

export default function Header() {
	return (
		<Container>
			<img src={Logo} alt="My contacts" width={201} />
			<InputSearchContainer>
				<input type="text" placeholder="Pesquisar contato..." />
			</InputSearchContainer>
		</Container>
	)
}
