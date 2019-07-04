import { Vehicle } from './Es6class2.js';

class Car extends Vehicle {
  move () {
    console.log(this.name + ' is spinning wheels...')
  }
}
console.log('class 里先执行吗？');
export { Car }