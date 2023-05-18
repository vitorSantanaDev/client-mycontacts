import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
	Card,
	Header,
	Container,
	ListHeader,
	InputSearchContainer
} from './styles'

import formatPhone from '../../utils/formatPhone'

import edit from '../../assets/images/icons/edit.svg'
import arrow from '../../assets/images/icons/arrow.svg'
import trash from '../../assets/images/icons/trash.svg'

export default function Home() {
	const [contacts, setContacts] = useState([])
	const [orderBy, setOrderBy] = useState('asc')
	const [searchTerm, setSearchTerm] = useState('')

	const filteredContacts = contacts.filter((contact) =>
		contact.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	useEffect(() => {
		fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
			.then((response) => response.json())
			.then((json) => setContacts(json))
			.catch((error) => console.log(error))
	}, [orderBy])

	function handleToggleOrderBy() {
		setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))
	}

	function handleSearchTermChange({ target }) {
		setSearchTerm(target.value)
	}

	return (
		<Container>
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
