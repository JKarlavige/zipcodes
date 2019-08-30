import {randomNumber} from './randomNumber'

export const generateServiceLevel = () => {
  const availableServiceLevels = ["g", "1", "2", "3"]
  const serviceLevel = availableServiceLevels[randomNumber(0,3)]
  return serviceLevel
}