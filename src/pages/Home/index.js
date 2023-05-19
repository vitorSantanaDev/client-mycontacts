import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

import {
	Card,
	Header,
	Container,
	ListHeader,
	InputSearchContainer
} from './styles'

import formatPhone from '../../utils/formatPhone'

import delay from '../../utils/delay'
import Loader from '../../components/Loader'

import edit from '../../assets/images/icons/edit.svg'
import arrow from '../../assets/images/icons/arrow.svg'
import trash from '../../assets/images/icons/trash.svg'

export default function Home() {
	const [contacts, setContacts] = useState([])
	const [orderBy, setOrderBy] = useState('asc')
	const [searchTerm, setSearchTerm] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	const filteredContacts = useMemo(
		() =>
			contacts.filter((contact) =>
				contact.name.toLowerCase().includes(searchTerm.toLowerCase())
			),
		[contacts, searchTerm]
	)

	useEffect(() => {
		;(async () => {
			try {
				setIsLoading(true)
				const response = await fetch(
					`http://localhost:3001/contacts?orderBy=${orderBy}`
				)
				await delay(500)
				const data = await response.json()
				setContacts(data)
			} catch (err) {
				console.error(err)
			} finally {
				setIsLoading(false)
			}
		})()
	}, [orderBy])

	function handleToggleOrderBy() {
		setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))
	}

	function handleSearchTermChange({ target }) {
		setSearchTerm(target.value)
	}

	return (
		<Container>
			<Loader isLoading={isLoading} />
			<InputSearchContainer>
				<input
					type="text"
					value={searchTerm}
					placeholder="Pesquisar contato..."
					onChange={handleSearchTermChange}
				/>
			</InputSearchContainer>
			<Header>
				<strong>
					{filteredContacts.length}{' '}
					{filteredContacts.length === 1 ? 'Contato' : 'Contatos'}
				</strong>
				<Link to="/new">Novo contato</Link>
			</Header>
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
		</Container>
	)
}
