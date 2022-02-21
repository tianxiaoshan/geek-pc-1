const artList = {}

export default function reducer(state = artList, action) {
  const { type, payload } = action
  if (type === 'save/article') {
    return payload
  }
  return state
}
