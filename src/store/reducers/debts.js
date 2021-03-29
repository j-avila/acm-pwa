import * as types from './types'

export const debts = (debts = {}, action) => {
  switch (action.type) {
    case types.GET_DEBTS:
      return { ...debts, debtsList: action.debts }
    case types.GET_PAYED_DEBTS:
      return { ...debts, payedDebts: action.payedDebts }
    default:
      return debts
  }
}
