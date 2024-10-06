import { types } from '@assets/types-color.json'

/**
 * Returns the color associated with the given type, if it exists.
 *
 * @example
 * getTypeColor('fire') // #ff9900
 * getTypeColor('FAKE_TYPE') // undefined
 *
 * @param {string} type
 * @returns {string | undefined}
 */
export const getTypeColor = (type: string): string | undefined =>
  types.find((t) => t.name.toLowerCase() === type.toLowerCase())?.color
