import answer from 'the-answer';
import { sayHello } from './module';
import './moment';


export default () => {
  console.log(`the answer is ${answer}`, sayHello('World'));
}
