import { useCallback, useEffect, useState } from 'react'

import ToastMessage from '../ToastMessage'

import { toastEventManager } from '../../../utils/toast'

import { Container } from './styles'

export default function ToastContainer() {
	const [messages, setMessage] = useState([])

	useEffect(() => {
		function handleAddToast({ type, text, duration }) {
			setMessage((prev) => [
				...prev,
				{ id: Math.random(), type, text, duration }
			])
		}

		toastEventManager.on('addtoast', handleAddToast)

		return () => {
			toastEventManager.removeListener('addtoast', handleAddToast)
		}
	}, [])

	const handleRemoveMessage = useCallback((id) => {
		setMessage((prev) => prev.filter((message) => message.id !== id))
	}, [])

	return (
		<Container>
			{messages.map((message) => (
				<ToastMessage
					key={message.id}
					message={message}
					onRemoveMessage={handleRemoveMessage}
				/>
			))}
		</Container>
	)
}
