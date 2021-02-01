class Vehicle {
  constructor (name) {
    this._name = name;
  }

  get name () {
    return this._name;
  }
}
export { Vehicle }