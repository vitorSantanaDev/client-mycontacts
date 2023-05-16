import { useState } from 'react'

import PropTypes from 'prop-types'

import useErros from '../../hooks/use-erros'
import formatPhone from '../../utils/formatPhone'
import isEmailValid from '../../utils/isEmailValid'

import FormGroup from '../FormGroup'
import { ButtonComponent, InputComponent, SelectComponent } from '../FormStyles'

import { ButtonContainer, Form } from './styles'

export default function ContactForm({ buttonLabel }) {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [category, setCategory] = useState('')

	const { errors, setError, removeError, getErrorMessageByFieldName } =
		useErros()

	const isFormValid = name && errors.length === 0

	function handleSubmit(event) {
		event.preventDefault()
		console.log({ name, email, phone, category })
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
		setCategory(target.value)
	}

	return (
		<Form onSubmit={handleSubmit} noValidate>
			<FormGroup error={getErrorMessageByFieldName('name')}>
				<InputComponent
					value={name}
					name="name"
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
					placeholder="E-mail"
					onChange={handleEmailChange}
					error={getErrorMessageByFieldName('email')}
				/>
			</FormGroup>

			<FormGroup error={getErrorMessageByFieldName('phone')}>
				<InputComponent
					name="phone"
					maxLength="15"
					placeholder="Telefone"
					value={formatPhone(phone)}
					onChange={handlePhoneChange}
					error={getErrorMessageByFieldName('phone')}
				/>
			</FormGroup>

			<FormGroup>
				<SelectComponent value={category} onChange={handleCategoryChange}>
					<option value="">Categoria</option>
					<option value="Instagram">Instagram</option>
					<option value="Instagram">Discord</option>
				</SelectComponent>
			</FormGroup>
			<ButtonContainer>
				<ButtonComponent disabled={!isFormValid} type="submit">
					{buttonLabel}
				</ButtonComponent>
			</ButtonContainer>
		</Form>
	)
}

ContactForm.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}
