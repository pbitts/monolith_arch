export default class Address {
  _street: string = "";
  _number: string = "";
  _complement: string;
  _city: string = "";
  _state: string = "";
  _zip: string = "";
  _zipcode: string = "";


  constructor(street: string, number: string, complement: string, 
            city: string, zip: string, zipcode: string,) {
    this._street = street;
    this._number = number;
    this._complement = complement;
    this._city = city;
    this._zip = zip;
    this._zipcode = zipcode;
    

  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get complement(): string {
    return this._complement;
  }

  get city(): string {
    return this._city;
  }

  get zip(): string {
    return this._zip;
  }

  get zipcode(): string {
    return this._zipcode;
  }


  
}
