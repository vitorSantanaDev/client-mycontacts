import { useEffect, useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'

import {
	Card,
	Header,
	Container,
	ListHeader,
	ErrorContainer,
	EmptyListContainer,
	InputSearchContainer
} from './styles'

import formatPhone from '../../utils/formatPhone'

import Loader from '../../components/Loader'

import sad from '../../assets/images/sad.svg'
import edit from '../../assets/images/icons/edit.svg'
import arrow from '../../assets/images/icons/arrow.svg'
import trash from '../../assets/images/icons/trash.svg'
import emptyBox from '../../assets/images/empty-box.svg'

import ContactsService from '../../services/Contacts.service'
import { ButtonComponent } from '../../components/FormStyles'

export default function Home() {
	const [contacts, setContacts] = useState([])
	const [orderBy, setOrderBy] = useState('asc')
	const [searchTerm, setSearchTerm] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

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

	return (
		<Container>
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
						<ButtonComponent onClick={handleTryAgain} type="button">
							Tentar Novamente
						</ButtonComponent>
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
								<button type="button">
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
