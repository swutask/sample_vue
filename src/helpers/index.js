export const requiredFieldsValidation = (errorMessages, obj) => {
  return Object.keys(obj).forEach(i => {
    errorMessages[i] = !obj[i]?.trim() ? `The ${i.toLowerCase()} field is required` : null
  })
}

export const emailValidation = email => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase()) ? null : 'The email field must be a valid email.'
}

export const passwordValidation = password => {
  return password?.length >= 8 ? null : 'The password field must be at least 8 characters.'
}
