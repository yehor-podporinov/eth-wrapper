import { BigNumber, BigNumberish, utils } from 'ethers'
import { isBoolean, isDate, isEmpty, isNumber } from 'lodash'
import { type Validator } from '../types'

type ValidatorFunc = (...params: any[]) => Validator

export const required: Validator = value => ({
  isValid:
    !isEmpty(value) ||
    isNumber(value) ||
    isDate(value) ||
    isBoolean(value) ||
    value instanceof File,
  message: 'Field must be filled',
})

export const minLength: ValidatorFunc = (length: number) => value => ({
  isValid: String(value).length >= length,
  message: 'validations.field-error_minLength',
})

export const maxLength: ValidatorFunc = (length: number) => value => ({
  isValid: String(value).length <= length,
  message: 'validations.field-error_maxLength',
})

export const ether: Validator = value => {
  let isEther = false
  try {
    const parsedValue = utils.parseEther(value)
    isEther = !parsedValue.isNegative()
  } catch {}

  return {
    isValid: !value || isEther,
    message: 'Field must be amount of ether',
  }
}

export const maxEther: ValidatorFunc = (max: BigNumberish) => {
  const parsedMax = BigNumber.from(max)

  return value => {
    let isLte = false

    try {
      const parsedValue = utils.parseEther(value)
      isLte = parsedValue.lte(parsedMax)
    } catch {
    }

    return {
      isValid: !value || isLte,
      message: 'Insufficient amount of tokens',
    }
  }
}
