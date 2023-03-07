// create regex name cant be empty and must have at least 4 characters
const nameRegex = /^[a-zA-Z]{4,}$/;

// create a simple regex to verify email
const emailRegex = /\S+@\S+\.\S+/;

// regex to validate at least 7 characters, it can be letters, numbers or symbols
const passwordRegex = /^.{7,}$/;

export { nameRegex, emailRegex, passwordRegex };
