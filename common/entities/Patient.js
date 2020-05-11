import Base from './Base'

export default class Patient extends Base {
  
  static dummy() {
    return new Patient({
      name: 'Eamonn Coghlan',
      address: 'Here, there and everywhere',
      phone: '02142168',
      email: 'eamole@hotmail.com'
    })   
  }
}
// maybe have a seeder!!

