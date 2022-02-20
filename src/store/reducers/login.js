const initiValues = {
  token: '',
  refresh_token: '',
}

export default function reducer(state = initiValues, action) {
  const { type, payload } = action
  if (type === 'save/token') {
    return payload
  }
  return state
}
