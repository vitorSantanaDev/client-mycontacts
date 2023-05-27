import PageHeader from '../../components/PageHeader'
import ContactForm from '../../components/ContactForm'
import ContactsService from '../../services/Contacts.service'

export default function NewContact() {
	async function handleSubmit(formData) {
		try {
			const contact = {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				category_id: formData.categoryID
			}
			const response = await ContactsService.createContact(contact)
			console.log({ response })
		} catch {}
	}

	return (
		<>
			<PageHeader title="Novo contato" />
			<ContactForm onSubmit={handleSubmit} buttonLabel="Cadastrar" />
		</>
	)
}
