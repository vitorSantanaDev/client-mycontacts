import { useRef } from 'react'
import toast from '../../utils/toast'

import PageHeader from '../../components/PageHeader'
import ContactForm from '../../components/ContactForm'
import ContactsService from '../../services/Contacts.service'

export default function NewContact() {
	const contactFormRef = useRef(null)

	async function handleSubmit(formData) {
		try {
			const contact = {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				category_id: formData.categoryID
			}
			await ContactsService.createContact(contact)
			contactFormRef.current.resetFieldsValue()
			toast({
				type: 'success',
				text: 'Contato criado com sucesso!',
				duration: 3000
			})
		} catch {
			toast({
				type: 'danger',
				text: 'Ocorreu um erro ao cadastrar um novo contato!',
				duration: 3000
			})
		}
	}

	return (
		<>
			<PageHeader title="Novo contato" />
			<ContactForm
				ref={contactFormRef}
				onSubmit={handleSubmit}
				buttonLabel="Cadastrar"
			/>
		</>
	)
}
