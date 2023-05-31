import { useEffect } from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

import xCircleIcon from '../../../assets/images/icons/x-circle.svg'
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg'

export default function ToastMessage({
	message: { id, type, text, duration },
	onRemoveMessage
}) {
	useEffect(() => {
		const timeoutId = setTimeout(() => onRemoveMessage(id), duration || 7000)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [id, duration, onRemoveMessage])

	function handleRemoveToast() {
		onRemoveMessage(id)
	}

	return (
		<Container
			role="button"
			tabIndex={0}
			onClick={handleRemoveToast}
			type={type}
		>
			{type !== 'default' && (
				<img
					src={type === 'success' ? checkCircleIcon : xCircleIcon}
					alt={type === 'success' ? 'Check icon' : 'X icon'}
				/>
			)}
			<strong>{text}</strong>
		</Container>
	)
}

ToastMessage.propTypes = {
	message: PropTypes.shape({
		id: PropTypes.number.isRequired,
		text: PropTypes.string.isRequired,
		duration: PropTypes.number,
		type: PropTypes.oneOf(['default', 'success', 'danger'])
	}),
	onRemoveMessage: PropTypes.func.isRequired
}
