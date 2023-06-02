import PropTypes from 'prop-types'

import Button from '../Button'
import { Container, Footer, Overlay } from './styles'
import ReactPortal from '../ReactPortal'

export default function Modal({
	danger,
	title,
	children,
	cancelLabel,
	confirmLabel,
	onCancel,
	onConfirm,
	visible,
	isLoading
}) {
	if (!visible) return null

	return (
		<ReactPortal containerID="modal-root">
			<Overlay>
				<Container danger={danger}>
					<h1>{title}</h1>
					<div className="modal-body">{children}</div>
					<Footer>
						<button
							disabled={isLoading}
							onClick={onCancel}
							type="button"
							className="cancel-button"
						>
							{cancelLabel}
						</button>
						<Button
							isLoading={isLoading}
							onClick={onConfirm}
							danger={danger}
							type="button"
						>
							{confirmLabel}
						</Button>
					</Footer>
				</Container>
			</Overlay>
		</ReactPortal>
	)
}

Modal.propTypes = {
	danger: PropTypes.bool,
	isLoading: PropTypes.bool,
	visible: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	cancelLabel: PropTypes.string,
	confirmLabel: PropTypes.string,
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired
}

Modal.defaultProps = {
	danger: false,
	cancelLabel: 'Cancelar',
	confirmLabel: 'Confirmar',
	isLoading: false
}
