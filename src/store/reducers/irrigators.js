export const irrigators = (state = { data: [] }, action) => {
  /* Limpiar el state */
  if(action.reset) state = { data: [] }

  const flagValue = JSON.stringify(state.data)
  const list = JSON.parse(flagValue)

  if(action['irrigators']) {
    action.irrigators.forEach(element => {
      if(!flagValue.includes(JSON.stringify(element))) list.push(element)
    });

    return {
      ...state,
      count: action.count,
      data: list
    }
  }

  return state
}
