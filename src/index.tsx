import './index.sass';
import * as ReactDOM from 'react-dom';
import Slider from './components/Slider/Slider';

ReactDOM.render(
  <Slider
    navigation={{ arrows: true, pagination: true }}
    counter={true}
    activeSlide={0}
  />,
  document.getElementById('slider1'),
);
