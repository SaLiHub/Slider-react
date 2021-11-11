import './index.sass';
import * as ReactDOM from 'react-dom';
import Slider from './components/Slider/Slider';
import Slide from './components/Slider/Slide';

ReactDOM.render(
  <Slider
    navigation={{ arrows: true, pagination: true }}
    counter={true}
    initialActiveSlide={0}
    className="slider"
  >
    <Slide>
      <button type="button">a11y</button>1
    </Slide>
    <Slide>
      <button type="button">a11y</button>2
    </Slide>
    <Slide>
      <button type="button">a11y</button>3
    </Slide>
    <Slide>
      <button type="button">a11y</button>4
    </Slide>
    <Slide>
      <button type="button">a11y</button>5
    </Slide>
  </Slider>,
  document.getElementById('slider-container'),
);