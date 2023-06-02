import { useEffect, useRef, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import Loader from '../../components/Loader'
import PageHeader from '../../components/PageHeader'
import ContactForm from '../../components/ContactForm'

import toast from '../../utils/toast'
import ContactsService from '../../services/Contacts.service'

export default function EditContact() {
	const { id } = useParams()
	const history = useHistory()
	const contactFormRef = useRef(null)
	const [isLoading, setIsLoading] = useState(true)
	const [contactName, setContactName] = useState('')

	async function handleSubmit(formData) {
		try {
			const contact = {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				category_id: formData.categoryID
			}
			const response = await ContactsService.updateContact(id, contact)
			setContactName(response.name)
			toast({
				type: 'success',
				text: 'Contato editado com sucesso!',
				duration: 3000
			})
		} catch {
			toast({
				type: 'danger',
				text: 'Ocorreu um erro ao editar o contato!',
				duration: 3000
			})
		}
	}

	useEffect(() => {
		async function loadContact() {
			try {
				const contact = await ContactsService.getContactById(id)
				contactFormRef.current.setFieldsValue(contact)
				setIsLoading(false)
				setContactName(contact.name)
			} catch {
				history.push('/')
				toast({ type: 'danger', text: 'Contato não encontrado!' })
			}
		}

		loadContact()
	}, [id, history])

	return (
		<>
			<Loader isLoading={isLoading} />
			<PageHeader
				title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
			/>
			<ContactForm
				ref={contactFormRef}
				onSubmit={handleSubmit}
				buttonLabel="Salvar alterações"
			/>
		</>
	)
}
