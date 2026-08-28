class LoginForm {
	#email = '';
	#password = '';
	#rememberMe = false;
	#form;
	#message;

	constructor(form) {
		if (!(form instanceof HTMLFormElement)) {
			throw new TypeError('A valid login form is required.');
		}

		this.#form = form;
		this.#message = form.querySelector('.form-message');
		this.#bindEvents();
	}

	get email() {
		return this.#email;
	}

	set email(value) {
		this.#email = String(value).trim().toLowerCase();
	}

	get password() {
		return this.#password;
	}

	set password(value) {
		this.#password = String(value);
	}

	get rememberMe() {
		return this.#rememberMe;
	}

	set rememberMe(value) {
		this.#rememberMe = Boolean(value);
	}

	#bindEvents() {
		this.#form.addEventListener('submit', (event) => this.#handleSubmit(event));
	}

	#readFormValues() {
		const formData = new FormData(this.#form);

		this.email = formData.get('email');
		this.password = formData.get('password');
		this.rememberMe = formData.get('remember') === 'on';
	}

	#validateEmail() {
		if (!this.email) {
			return 'Email address is required.';
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(this.email) ? '' : 'Enter a valid email address.';
	}

	#validatePassword() {
		if (!this.password) {
			return 'Password is required.';
		}

		if (this.password.length < 8) {
			return 'Password must contain at least 8 characters.';
		}

		if (!/[A-Z]/.test(this.password)) {
			return 'Password must contain at least one uppercase letter.';
		}

		if (!/[a-z]/.test(this.password)) {
			return 'Password must contain at least one lowercase letter.';
		}

		if (!/\d/.test(this.password)) {
			return 'Password must contain at least one number.';
		}

		return '';
	}

	#validate() {
		return this.#validateEmail() || this.#validatePassword();
	}

	#showMessage(message, isSuccess = false) {
		this.#message.textContent = message;
		this.#message.classList.toggle('success', isSuccess);
	}

	#handleSubmit(event) {
		event.preventDefault();
		this.#readFormValues();

		const validationError = this.#validate();

		if (validationError) {
			this.#showMessage(validationError);
			return;
		}

		this.#showMessage(
			`Validation successful for ${this.email}. Connect this form to your login API next.`,
			true,
		);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const loginFormElement = document.querySelector('form');

	if (loginFormElement) {
		new LoginForm(loginFormElement);
	}
});
