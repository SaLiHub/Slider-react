// eslint-disable-next-line no-use-before-define
import React, {
  useEffect, useState, useRef, Dispatch, SetStateAction, Suspense,
} from 'react';
import './Slider.sass';

const Arrows = React.lazy(() => import('./Arrows'));
const Pagination = React.lazy(() => import('./Pagination'));
const Counter = React.lazy(() => import('./Counter'));

interface UserConfig {
  navigation?: {
    arrows?: boolean;
    pagination?: boolean;
  };
  counter?: boolean;
  pagination?: boolean;
  transition?: number;
  direction?: string;
  activeSlide?: number;
}

function Slider(userConfig: UserConfig): JSX.Element {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideHeight, setSlideHeight] = useState(0);
  const [slidesLength, setSlidesLength] = useState(0);

  // eslint-disable-next-line react/destructuring-assignment
  const [activeSlide, setActiveSlide] = useState(userConfig.activeSlide ?? 0);

  const config = (function createConfig() {
    interface DevConfig {
      transition: number;
      direction: string;
      slides?: number;
    }

    const devConfig: DevConfig = {
      transition: userConfig.transition ?? 200,
      direction: userConfig.direction ?? 'horizontal',
    };

    return Object.assign(devConfig, userConfig);
  })();

  function changeSliderPosition(index: number) {
    if (config.direction === 'horizontal') {
      setSliderPosition(index * slideWidth);
    } else setSliderPosition(index * slideHeight);
    setActiveSlide(index);
  }

  useEffect(() => {
    const slider = document.querySelector<HTMLElement>('.slider');
    const { direction } = config;

    if (direction === 'horizontal') {
      setSlideWidth(slider.offsetWidth);
    } else {
      setSlideHeight(slider.offsetHeight);
    }
    console.log('useEffect1');
  }, []);

  return (
    <>
      <SliderWrapper
        setSlidesLength={setSlidesLength}
        sliderPosition={sliderPosition}
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
      </SliderWrapper>

      {/* arrows */}
      {config.navigation.arrows && (
        <Suspense fallback={<p>Arrows loading...</p>}>
          <Arrows
            changeSliderPosition={(i) => changeSliderPosition(i)}
            activeSlide={activeSlide}
            slidesLength={slidesLength}
          />
        </Suspense>
      )}

      {/* pagination */}
      {config.navigation.pagination && (
      <Suspense fallback={<p>Pagination loading...</p>}>
        <Pagination
          slidesLength={slidesLength}
          direction={config.direction}
        />
      </Suspense>
      )}

      {/* counter */}
      {config.counter && (
      <Suspense fallback={<p>Counter loading...</p>}>
        <Counter />
      </Suspense>
      )}
    </>
  );
}

type SlideProps = {
  children: React.ReactNode;
};

function Slide(props: SlideProps) {
  const { children } = props;

  return (
    <div className="slider__slide">
      {children}
    </div>
  );
}

// Wrapper component.
type Wrapper = {
  children: React.ReactElement[];
  setSlidesLength: Dispatch<SetStateAction<number>>;
  sliderPosition: number;
};

function SliderWrapper(props: Wrapper) {
  const { children, setSlidesLength, sliderPosition } = props;

  function transformSlider() {
    return { transform: `translate3d(${-sliderPosition}px, 0, 0)` };
  }

  useEffect(() => {
    // Save quantity of slides so then to use it in next render
    // for building pagination and do so only on first render.
    setSlidesLength(children.length);
  }, []);

  return (
    <div className="slider__wrapper" style={transformSlider()}>
      {children}
    </div>
  );
}

export default Slider;
