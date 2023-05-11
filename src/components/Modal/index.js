import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import { ButtonComponent } from '../FormStyles'
import { Container, Footer, Overlay } from './styles'

export default function Modal({ danger }) {
	return ReactDOM.createPortal(
		<Overlay>
			<Container danger={danger}>
				<h1>Modal title</h1>
				<p>Modal body</p>
				<Footer>
					<button type="button" className="cancel-button">
						Cancelar
					</button>
					<ButtonComponent danger={danger} type="button">
						Deletar
					</ButtonComponent>
				</Footer>
			</Container>
		</Overlay>,
		document.getElementById('modal-root')
	)
}

Modal.propTypes = {
	danger: PropTypes.bool
}

Modal.defaultProps = { danger: false }
