import HttpClient from './utils/http-client'

class ContactsService {
	constructor() {
		this.httpClient = new HttpClient('http://localhost:3001')
	}
	async listContacts(orderBy = 'asc') {
		return this.httpClient.get(`/contacts?orderBy=${orderBy}`)
	}
}

export default new ContactsService()