// eslint-disable-next-line no-use-before-define
import React, {
  useEffect, useState, useRef, Dispatch, SetStateAction, Suspense,
} from 'react';
import './Slider.sass';

const Arrows = React.lazy(() => import('./Arrows'));
const Pagination = React.lazy(() => import('./Pagination'));
const Counter = React.lazy(() => import('./Counter'));

interface UserInput {
  navigation?: {
    arrows?: boolean;
    pagination?: boolean;
  };
  counter?: boolean;
  transition?: number;
  direction?: string;
  initialActiveSlide?: number;
  children: React.ReactNode;
  className: string;
}

function Slider(userInput: UserInput): JSX.Element {
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideHeight, setSlideHeight] = useState(0);
  const [slidesLength, setSlidesLength] = useState(0);
  // eslint-disable-next-line react/destructuring-assignment
  const [activeSlide, setActiveSlide] = useState(userInput.initialActiveSlide ?? 0);

  const config = useRef(null);

  interface DomElements {
    slider?: HTMLElement;
    slides?: HTMLElement[];
  }

  const domElements = useRef(null);

  if (!config.current) config.current = createConfig();

  function createConfig() {
    interface DevConfig {
      transition: number;
      direction: string;
      slides?: number;
    }

    const devConfig: DevConfig = {
      transition: userInput.transition ?? 200,
      direction: userInput.direction ?? 'horizontal',
    };

    return Object.assign(devConfig, userInput);
  }

  function setSliderSize(slider: HTMLElement) {
    const { direction } = config.current;
    if (direction === 'horizontal') {
      setSlideWidth(slider.offsetWidth);
    } else {
      setSlideHeight(slider.offsetHeight);
    }
  }

  useEffect(() => {
    const slider = document.querySelector<HTMLElement>(`.${config.current.className}`);
    const slides = slider.querySelectorAll('.slider__slide');
    // Save dom elements in variables for further usage.
    domElements.current = {
      slider,
      slides,
    };

    setSlidesLength(config.current.children.length);

    setSliderSize(slider);
    window.addEventListener('resize', () => setSliderSize(slider));
  }, []);

  useEffect(() => {
    const { slides, slider } = domElements.current;
    console.log(slides);
    const prevActiveSlide = slider.querySelector('.slider__slide.is-active');
    prevActiveSlide?.classList.remove('is-active');

    slides[activeSlide].classList.add('is-active');
  });

  function setSliderPosition() {
    let sliderPosition = 0;
    if (config.current.direction === 'horizontal') {
      sliderPosition = activeSlide * slideWidth;
    } else sliderPosition = activeSlide * slideHeight;

    return { transform: `translate3d(${-sliderPosition}px, 0, 0)` };
  }

  return (
    <div className={config.current.className}>
      <div className="slider__wrapper" style={setSliderPosition()}>
        {config.current.children}
      </div>
      {/* arrows */}
      {config.current.navigation.arrows && (
        <Suspense fallback={<p>Arrows loading...</p>}>
          <Arrows
            setActiveSlide={(i) => setActiveSlide(i)}
            activeSlide={activeSlide}
            slidesLength={slidesLength}
          />
        </Suspense>
      )}

      {/* pagination */}
      {config.current.navigation.pagination && (
      <Suspense fallback={<p>Pagination loading...</p>}>
        <Pagination
          slidesLength={slidesLength}
          direction={config.current.direction}
          setActiveSlide={setActiveSlide}
          activeSlide={activeSlide}
        />
      </Suspense>
      )}

      {/* counter */}
      {config.current.counter && (
      <Suspense fallback={<p>Counter loading...</p>}>
        <Counter activeSlide={activeSlide} />
      </Suspense>
      )}
    </div>
  );
}

export default Slider;
