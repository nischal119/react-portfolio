const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value) {
  return EMAIL_REGEX.test(value.trim());
}

export function sanitizePhoneInput(value) {
  return value.replace(/\D/g, "").slice(0, 10);
}

export function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10;
}

export function validateContactForm(values) {
  const errors = {};

  const name = values.name?.trim() ?? "";
  const email = values.email?.trim() ?? "";
  const phone = values.phone?.trim() ?? "";
  const message = values.message?.trim() ?? "";

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (!isValidPhone(phone)) {
    errors.phone = "Enter a valid 10-digit phone number.";
  }

  if (!message) {
    errors.message = "Please describe your project.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export function hasContactErrors(errors) {
  return Object.keys(errors).length > 0;
}
