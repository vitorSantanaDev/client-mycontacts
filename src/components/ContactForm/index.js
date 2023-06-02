import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

import PropTypes from 'prop-types'

import useErros from '../../hooks/use-erros'
import formatPhone from '../../utils/formatPhone'
import isEmailValid from '../../utils/isEmailValid'

import FormGroup from '../FormGroup'
import Button from '../Button'

import { InputComponent, SelectComponent } from '../FormStyles'

import CategoriesService from '../../services/Categories.service'
import { ButtonContainer, Form } from './styles'

const ContactForm = forwardRef(function ContactForm(
	{ buttonLabel, onSubmit },
	ref
) {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [categoryID, setCategoryID] = useState('')
	const [categories, setCategories] = useState([])
	const [isLoadingCategories, setIsLoadingCategories] = useState(true)
	const [isSubmiting, setIsSubmiting] = useState(false)

	const { errors, setError, removeError, getErrorMessageByFieldName } =
		useErros()

	const isFormValid = name && errors.length === 0

	useEffect(loadCategories, [])

	useImperativeHandle(
		ref,
		() => ({
			setFieldsValue: (contact) => {
				setName(contact.name ?? '')
				setEmail(contact.email ?? '')
				setPhone(formatPhone(contact.phone ?? ''))
				setCategoryID(contact.category_id ?? '')
			}
		}),
		[]
	)

	function loadCategories() {
		;(async () => {
			try {
				const categoriesList = await CategoriesService.listCategories()
				setCategories(categoriesList)
			} catch {
			} finally {
				setIsLoadingCategories(false)
			}
		})()
	}

	async function handleSubmit(event) {
		event.preventDefault()
		setIsSubmiting(true)
		await onSubmit({ name, email, phone, categoryID })
		setIsSubmiting(false)
	}

	function handleNameChange({ target }) {
		setName(target.value)

		if (!target.value) {
			setError({ field: 'name', message: 'Nome é obrigatório' })
		} else {
			removeError('name')
		}
	}

	function handleEmailChange({ target }) {
		setEmail(target.value)

		if (target.value && !isEmailValid(target.value)) {
			setError({ field: 'email', message: 'E-mail inválido' })
		} else {
			removeError('email')
		}
	}

	function handlePhoneChange({ target }) {
		setPhone(target.value)
	}

	function handleCategoryChange({ target }) {
		setCategoryID(target.value)
	}

	return (
		<Form onSubmit={handleSubmit} noValidate>
			<FormGroup error={getErrorMessageByFieldName('name')}>
				<InputComponent
					value={name}
					name="name"
					disabled={isSubmiting}
					placeholder="Nome *"
					onChange={handleNameChange}
					error={getErrorMessageByFieldName('name')}
				/>
			</FormGroup>

			<FormGroup error={getErrorMessageByFieldName('email')}>
				<InputComponent
					value={email}
					name="email"
					type="email"
					disabled={isSubmiting}
					placeholder="E-mail"
					onChange={handleEmailChange}
					error={getErrorMessageByFieldName('email')}
				/>
			</FormGroup>

			<FormGroup error={getErrorMessageByFieldName('phone')}>
				<InputComponent
					name="phone"
					maxLength="15"
					disabled={isSubmiting}
					placeholder="Telefone"
					value={formatPhone(phone)}
					onChange={handlePhoneChange}
					error={getErrorMessageByFieldName('phone')}
				/>
			</FormGroup>

			<FormGroup isLoading={isLoadingCategories}>
				<SelectComponent
					value={categoryID}
					disabled={isLoadingCategories || isSubmiting}
					onChange={handleCategoryChange}
				>
					<option value="">Categoria</option>
					{categories.map((category) => {
						return (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						)
					})}
				</SelectComponent>
			</FormGroup>
			<ButtonContainer>
				<Button disabled={!isFormValid} isLoading={isSubmiting} type="submit">
					{buttonLabel}
				</Button>
			</ButtonContainer>
		</Form>
	)
})

export default ContactForm

ContactForm.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}
