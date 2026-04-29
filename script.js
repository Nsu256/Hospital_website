document.addEventListener("DOMContentLoaded", () => {
	// Get the main medical form with fallback selectors in case class names change.
	const medicalForm = document.querySelector(".formconent form, .formcontent form, .formsection form, form");
	if (!medicalForm) {
		console.warn("Medical form was not found.");
		return;
	}

	// Select all existing inputs by their current order in the HTML.
	const inputs = medicalForm.querySelectorAll("input");
	const fields = {
		patientName: inputs[0],
		phone: inputs[1],
		address: inputs[2],
		email: inputs[3],
		primarySymptoms: inputs[4],
		recentHistory: inputs[5],
		temperature: inputs[6],
		weight: inputs[7],
		bloodPressure: inputs[8],
		activityLevel: inputs[9],
		diagnosis: inputs[10]
	};

	// Build one reusable message element for both error and success states.
	const messageBox = document.createElement("p");
	messageBox.style.margin = "8px 0 14px";
	messageBox.style.fontFamily = "Segoe UI, Tahoma, Geneva, Verdana, sans-serif";
	messageBox.style.fontSize = "15px";
	messageBox.style.fontWeight = "600";

	const submitContainer = medicalForm.querySelector(".formbutton");
	const submitButton = submitContainer ? submitContainer.querySelector("button") : null;

	// Force submit behavior even if HTML button type is missing or changed.
	if (submitButton && submitButton.type !== "submit") {
		submitButton.type = "submit";
	}

	if (submitContainer) {
		submitContainer.insertAdjacentElement("beforebegin", messageBox);
	} else {
		medicalForm.appendChild(messageBox);
	}

	const showMessage = (text, type) => {
		messageBox.textContent = text;
		messageBox.style.color = type === "success" ? "#0a7a2f" : "#b10000";
	};

	const clearMessage = () => {
		messageBox.textContent = "";
	};

	// Remove highlight styles when the user edits a field after validation fails.
	const setFieldError = (field, hasError) => {
		if (!field) {
			return;
		}

		field.style.border = hasError ? "2px solid #d90429" : "1px solid black";
		if (!hasError) {
			clearMessage();
		}
	};

	Object.values(fields).forEach((field) => {
		if (!field) {
			return;
		}

		field.addEventListener("input", () => {
			setFieldError(field, false);
		});
	});

	const isEmpty = (value) => !value || !value.trim();
	const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
	const isValidPhone = (value) => /^[0-9+()\-\s]{7,20}$/.test(value.trim());
	const isNumericValue = (value) => /^\d+(\.\d+)?$/.test(value.trim());
	const isValidBloodPressure = (value) => /^\d{2,3}\/\d{2,3}$/.test(value.trim());

	// Validate all required rules and return the first invalid field for focus.
	const validateForm = () => {
		let firstInvalidField = null;
		const errors = [];

		const requiredFields = [
			fields.patientName,
			fields.phone,
			fields.address,
			fields.email,
			fields.primarySymptoms,
			fields.temperature,
			fields.weight,
			fields.bloodPressure,
			fields.activityLevel,
			fields.diagnosis
		];

		requiredFields.forEach((field) => {
			const missing = !field || isEmpty(field.value);
			setFieldError(field, missing);

			if (missing && !firstInvalidField) {
				firstInvalidField = field;
			}
		});

		if (firstInvalidField) {
			errors.push("Please fill in all required fields.");
		}

		if (fields.email && !isEmpty(fields.email.value) && !isValidEmail(fields.email.value)) {
			setFieldError(fields.email, true);
			errors.push("Please enter a valid email address.");
			if (!firstInvalidField) {
				firstInvalidField = fields.email;
			}
		}

		if (fields.phone && !isEmpty(fields.phone.value) && !isValidPhone(fields.phone.value)) {
			setFieldError(fields.phone, true);
			errors.push("Please enter a valid phone number.");
			if (!firstInvalidField) {
				firstInvalidField = fields.phone;
			}
		}

		if (fields.temperature && !isEmpty(fields.temperature.value) && !isNumericValue(fields.temperature.value)) {
			setFieldError(fields.temperature, true);
			errors.push("Body temperature must be a numeric value.");
			if (!firstInvalidField) {
				firstInvalidField = fields.temperature;
			}
		}

		if (fields.weight && !isEmpty(fields.weight.value) && !isNumericValue(fields.weight.value)) {
			setFieldError(fields.weight, true);
			errors.push("Body weight must be a numeric value.");
			if (!firstInvalidField) {
				firstInvalidField = fields.weight;
			}
		}

		if (fields.bloodPressure && !isEmpty(fields.bloodPressure.value) && !isValidBloodPressure(fields.bloodPressure.value)) {
			setFieldError(fields.bloodPressure, true);
			errors.push("Blood pressure must look like 120/80.");
			if (!firstInvalidField) {
				firstInvalidField = fields.bloodPressure;
			}
		}

		return {
			isValid: errors.length === 0,
			firstInvalidField,
			errorMessage: errors[0] || ""
		};
	};

	// Intercept submit, validate input, and show a clear success/error message.
	const handleSubmit = (event) => {
		event.preventDefault();

		const validation = validateForm();
		if (!validation.isValid) {
			showMessage(validation.errorMessage, "error");
			if (validation.firstInvalidField) {
				validation.firstInvalidField.focus();
			}
			return;
		}

		showMessage("Form submitted successfully. Our team will contact you soon.", "success");
		medicalForm.reset();
	};

	medicalForm.addEventListener("submit", handleSubmit);

	// Extra safety for cases where custom markup stops the normal submit event path.
	if (submitButton) {
		submitButton.addEventListener("click", (event) => {
			if (submitButton.type === "button") {
				event.preventDefault();
				handleSubmit(event);
			}
		});
	}
});
