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
  transition?: number;
  direction?: string;
  activeSlide?: number;
}

function Slider(userConfig: UserConfig): JSX.Element {
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideHeight, setSlideHeight] = useState(0);
  const [slidesLength, setSlidesLength] = useState(0);

  const config = useRef(null);

  if (!config.current) config.current = createConfig();

  function createConfig() {
    console.log('luck');
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
  }
  // eslint-disable-next-line react/destructuring-assignment
  const [activeSlide, setActiveSlide] = useState(userConfig.activeSlide ?? 0);

  useEffect(() => {
    const slider = document.querySelector<HTMLElement>('.slider');
    const { direction } = config.current;

    if (direction === 'horizontal') {
      setSlideWidth(slider.offsetWidth);
    } else {
      setSlideHeight(slider.offsetHeight);
    }
  }, []);

  return (
    <>
      <SliderWrapper
        setSlidesLength={setSlidesLength}
        slideHeight={slideHeight}
        slideWidth={slideWidth}
        direction={config.current.direction}
        activeSlide={activeSlide}
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
  slideHeight: number;
  slideWidth: number;
  direction: string;
  activeSlide: number;
};

function SliderWrapper(props: Wrapper) {
  const {
    children, setSlidesLength, slideHeight, slideWidth, direction, activeSlide,
  } = props;

  function setSliderPosition() {
    let sliderPosition = 0;
    if (direction === 'horizontal') {
      sliderPosition = activeSlide * slideWidth;
    } else sliderPosition = activeSlide * slideHeight;

    return { transform: `translate3d(${-sliderPosition}px, 0, 0)` };
  }

  useEffect(() => {
    // Save quantity of slides so then to use it in next render
    // for building pagination and do so only on first render.
    setSlidesLength(children.length);
  }, []);

  return (
    <div className="slider__wrapper" style={setSliderPosition()}>
      {children}
    </div>
  );
}

export default Slider;
