import { GroupBase, StylesConfig } from 'react-select'
import { OptionType } from '../../models/form'

export function getVenue(invited: string | undefined) {
  if (invited == 'Both') return 'both'
  if (invited == 'Cornwall') return 'scorrier'
  if (invited == 'New Zealand') return 'gwavas'
  console.log(invited)
  return undefined
}

export function firstName(fullName: string) {
  return fullName.split(' ')[0]
}

export function toCurrency(num: number) {
  return num % 1 !== 0 ? num.toFixed(2) : num.toString()
}

export const selectStyle: StylesConfig<
  OptionType,
  false,
  GroupBase<OptionType>
> = {
  control: (baseStyles) => ({
    ...baseStyles,
    borderWidth: '1px',
    borderColor: 'black',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#823c50', // Set your desired color
  }),
}
