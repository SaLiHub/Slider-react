import './index.sass';
import * as ReactDOM from 'react-dom';
import Slider from './components/Slider/Slider';

ReactDOM.render(
  <Slider navigation={{ arrows: true, pagination: true }} counter={true} />,
  document.getElementById('slider1'),
);
