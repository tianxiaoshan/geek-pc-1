const saveChannels = []

export default function reducer(state = saveChannels, action) {
  const { type, payload } = action
  if (type === 'save/channelsid') {
    return payload
  }
  return state
}
