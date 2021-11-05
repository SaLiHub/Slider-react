import './index.sass';
import * as ReactDOM from 'react-dom';
import Slider from './components/Slider/Slider';

ReactDOM.render(
  <Slider navigation={{ arrows: true }} counter={true} pagination={true} />,
  document.getElementById('slider1'),
);
