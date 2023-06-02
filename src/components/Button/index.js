import PropTypes from 'prop-types'

import { StyledButton } from './styles'
import Spinner from '../Spinner'

export default function Button({
	type,
	disabled,
	isLoading,
	children,
	onClick,
	danger
}) {
	return (
		<StyledButton
			danger={danger}
			type={type}
			onClick={onClick}
			disabled={disabled || isLoading}
		>
			{!isLoading && children}
			{isLoading && <Spinner size={16} />}
		</StyledButton>
	)
}

Button.propTypes = {
	danger: PropTypes.bool,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	isLoading: PropTypes.bool,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func
}

Button.defaultProps = {
	type: 'button',
	disabled: false,
	isLoading: false,
	onClick: () => {},
	danger: false
}
