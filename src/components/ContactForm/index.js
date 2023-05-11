import PropTypes from 'prop-types'

import FormGroup from '../FormGroup'
import { ButtonContainer, Form } from './styles'
import { ButtonComponent, InputComponent, SelectComponent } from '../FormStyles'

export default function ContactForm({ buttonLabel }) {
	return (
		<Form>
			<FormGroup>
				<InputComponent placeholder="Nome" />
			</FormGroup>

			<FormGroup>
				<InputComponent placeholder="E-mail" />
			</FormGroup>

			<FormGroup>
				<InputComponent placeholder="Telefone" />
			</FormGroup>

			<FormGroup>
				<SelectComponent>
					<option></option>
				</SelectComponent>
			</FormGroup>
			<ButtonContainer>
				<ButtonComponent type="submit">{buttonLabel}</ButtonComponent>
			</ButtonContainer>
		</Form>
	)
}

ContactForm.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}
