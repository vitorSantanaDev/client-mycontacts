import { useEffect, useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'

import {
	Card,
	Header,
	Container,
	ListHeader,
	ErrorContainer,
	EmptyListContainer,
	InputSearchContainer,
	SearchNotFoundContainer
} from './styles'

import formatPhone from '../../utils/formatPhone'

import Loader from '../../components/Loader'

import sad from '../../assets/images/sad.svg'
import edit from '../../assets/images/icons/edit.svg'
import arrow from '../../assets/images/icons/arrow.svg'
import trash from '../../assets/images/icons/trash.svg'
import emptyBox from '../../assets/images/empty-box.svg'
import maginifierQuestion from '../../assets/images/magnifier-question.svg'

import Button from '../../components/Button'
import Modal from '../../components/Modal'

import ContactsService from '../../services/Contacts.service'
import toast from '../../utils/toast'

export default function Home() {
	const [contacts, setContacts] = useState([])
	const [orderBy, setOrderBy] = useState('asc')
	const [searchTerm, setSearchTerm] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
	const [contactBeingDeleted, setContactBeingDeleted] = useState(null)
	const [isLoadingDelete, setIsLoadingDelete] = useState(false)

	const filteredContacts = useMemo(
		() =>
			contacts.filter((contact) =>
				contact.name.toLowerCase().includes(searchTerm.toLowerCase())
			),
		[contacts, searchTerm]
	)

	const loadContacts = useCallback(() => {
		;(async () => {
			try {
				setIsLoading(true)
				const contactsList = await ContactsService.listContacts(orderBy)
				setHasError(false)
				setContacts(contactsList)
			} catch (err) {
				setHasError(true)
			} finally {
				setIsLoading(false)
			}
		})()
	}, [orderBy])

	useEffect(loadContacts, [loadContacts])

	function handleToggleOrderBy() {
		setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))
	}

	function handleSearchTermChange({ target }) {
		setSearchTerm(target.value)
	}

	function handleTryAgain() {
		loadContacts()
	}

	function handleDeleteContact(contact) {
		setIsDeleteModalVisible((prev) => !prev)
		setContactBeingDeleted(contact)
	}

	function handleCloseDeleteModal() {
		setIsDeleteModalVisible((prev) => !prev)
		setContactBeingDeleted(null)
	}

	async function handleConfirmDeleteContact() {
		try {
			setIsLoadingDelete(true)
			await ContactsService.deleteContact(contactBeingDeleted.id)
			setContacts((prev) =>
				prev.filter((contact) => contact.id !== contactBeingDeleted.id)
			)
			handleCloseDeleteModal()
			toast({
				type: 'success',
				text: 'Contato deletado com sucesso!',
				duration: 3000
			})
		} catch {
			toast({
				type: 'danger',
				text: 'Ocorreu algum erro ao deletar o contato!',
				duration: 3000
			})
		} finally {
			setIsLoadingDelete(false)
		}
	}

	return (
		<Container>
			<Modal
				isLoading={isLoadingDelete}
				visible={isDeleteModalVisible}
				onCancel={handleCloseDeleteModal}
				onConfirm={handleConfirmDeleteContact}
				confirmLabel="Deletar"
				cancelLabel="Cancelar"
				title={`Tem certeza que deseja remover "${contactBeingDeleted?.name}" da sua lista de contatos?`}
				danger
			>
				<p>Esta ação não poderá ser desfeita</p>
			</Modal>
			<Loader isLoading={isLoading} />
			{!!contacts.length && !hasError && (
				<InputSearchContainer>
					<input
						type="text"
						value={searchTerm}
						placeholder="Pesquisar contato..."
						onChange={handleSearchTermChange}
					/>
				</InputSearchContainer>
			)}
			<Header
				justifyContent={
					hasError ? 'flex-end' : !contacts.length ? 'center' : 'space-between'
				}
			>
				{!hasError && !!contacts.length && (
					<strong>
						{filteredContacts.length}{' '}
						{filteredContacts.length === 1 ? 'Contato' : 'Contatos'}
					</strong>
				)}
				<Link to="/new">Novo contato</Link>
			</Header>

			{hasError && (
				<ErrorContainer>
					<img src={sad} alt="Sad" />
					<div className="details">
						<strong>Ocorreu um erro ao obter os seus contatos!</strong>
						<Button onClick={handleTryAgain} type="button">
							Tentar Novamente
						</Button>
					</div>
				</ErrorContainer>
			)}

			{!hasError && (
				<>
					{!contacts.length && !isLoading && (
						<EmptyListContainer>
							<img src={emptyBox} alt="Empty box" />
							<p>
								Você ainda não tem nenhum contato cadastrado! Clique no botão{' '}
								<strong>”Novo contato”</strong> à cima para cadastrar o seu
								primeiro!
							</p>
						</EmptyListContainer>
					)}

					{!!contacts.length && !filteredContacts.length && (
						<SearchNotFoundContainer>
							<img src={maginifierQuestion} alt="Maginifier Question" />
							<span>
								Nenhum resultado foi encontrado para{' '}
								<strong>
									{'"'}
									{searchTerm}
									{'"'}
								</strong>
								.
							</span>
						</SearchNotFoundContainer>
					)}

					{!!filteredContacts.length && (
						<ListHeader orderBy={orderBy}>
							<button type="button" onClick={handleToggleOrderBy}>
								<span>Nome</span> <img src={arrow} alt="Arrow" />
							</button>
						</ListHeader>
					)}
					{filteredContacts.map((contact) => (
						<Card key={contact.id}>
							<div className="info">
								<div className="contact-name">
									<strong>{contact.name}</strong>
									{!!contact.category_name && (
										<small>{contact.category_name}</small>
									)}
								</div>
								<span>{contact.email}</span>
								<span>{formatPhone(contact.phone)}</span>
							</div>

							<div className="actions">
								<Link to={`/edit/${contact.id}`}>
									<img src={edit} alt="Edit" />
								</Link>
								<button
									type="button"
									onClick={() => handleDeleteContact(contact)}
								>
									<img src={trash} alt="Delete" />
								</button>
							</div>
						</Card>
					))}
				</>
			)}
		</Container>
	)
}
