import zipcodes from 'zipcodes'
import randomZipcode from 'random-zipcode'

export const generateZipcode = () => {
  let location = zipcodes.lookup(randomZipcode())
  if(!location) {
    while(location === undefined) {
      location = zipcodes.lookup(randomZipcode())
      if(location) {
        return location
      }
    }
  } else {
    return location
  }
}