import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

export default function ReactPortal({ children, containerID }) {
	let container = document.getElementById(containerID)

	if (!container) {
		container = document.createElement('div')
		container.setAttribute('id', containerID)
	}

	document.body.appendChild(container)

	return ReactDOM.createPortal(children, container)
}

ReactPortal.propTypes = {
	children: PropTypes.node.isRequired,
	containerID: PropTypes.string
}

ReactPortal.defaultProps = { containerID: 'portal-root' }
