import { Container } from './styles'

import Logo from '../../assets/images/logo-mycontacts.svg'

export default function Header() {
	return (
		<Container>
			<img src={Logo} alt="My contacts" width={201} />
		</Container>
	)
}
