import * as Reg from '@/constants/RegularConstants';

let rules = {
  'name': {
    getMessage: field => 'Please enter a valid name!',
    validate: (value, args) => {
      return Reg.name.test(value.trim())
    }
  },
  'email': {
    getMessage: field => 'Please enter a valid email!',
    validate: (value, args) => {
      return Reg.email.test(value.trim())
    }
  },
  'phoneNo': {
    getMessage: field => 'Please enter a valid phoneNo!',
    validate: (value, args) => {
      return Reg.mobile.test(value.trim())
    }
  },
  'passportNo': {
    getMessage: field => 'Please enter a valid passportNo!',
    validate: (value, args) => {
      return Reg.passport.test(value.trim())
    }
  },
}
export default rules;
