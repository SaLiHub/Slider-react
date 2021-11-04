/* eslint-disable react/self-closing-comp */
import { useEffect, useState } from 'react';
import './Slider.sass';

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
    const devConfig = {
      transition: userConfig.transition ?? 200,
      direction: userConfig.direction ?? 'horizontal',
    };

    return Object.assign(devConfig, userConfig);
  })();

  function handleArrowClick(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLTextAreaElement;
    console.log(activeSlide, 'slidebutton');
    if (target.classList.contains('slider__arrow_back')) {
      if (activeSlide < 0) return;
      const newIndex = activeSlide - 1;
      changeSliderPosition(newIndex);
    } else if (target.classList.contains('slider__arrow_forward')) {
      if (activeSlide > slidesLength - 1) return;
      const newIndex = activeSlide + 1;
      changeSliderPosition(newIndex);
    }

    // function triggerArrows(newIndex: number) {
    //   changeSliderPosition(newIndex);
    //   applyChangesAfterTransition(newIndex);
    // }
  }

  function changeSliderPosition(index: number) {
    if (config.direction === 'horizontal') setSliderPosition(index * slideWidth);
    else setSliderPosition(index * slideHeight);
    setActiveSlide(index);
  }

  useEffect(() => {
    const slider = document.querySelector<HTMLElement>('.slider');
    if (config.direction === 'horizontal') {
      setSlideWidth(slider.offsetWidth);
    } else {
      setSlideHeight(slider.offsetHeight);
    }
  }, [config.direction]);

  function Arrows() {
    if (config.navigation.arrows) {
      return (
        <>
          <button
            type="button"
            aria-label="forward"
            className="slider__arrow slider__arrow_forward"
            onClick={handleArrowClick}
          />
          <button
            type="button"
            aria-label="back"
            className="slider__arrow slider__arrow_back"
            onClick={handleArrowClick}
          />
        </>
      );
    }

    return null;
  }

  function Counter() {
    if (config.counter) {
      return <span className="slider__counter">12</span>;
    }

    return null;
  }

  function Pagination() {
    if (config.pagination) {
      const paginationState = config.direction === 'vertical' ? 'is-vertical' : 'is-horizontal';
      const bullets = [];
      for (let i = 0; i < slidesLength; i++) {
        bullets.push(
          <button
            type="button"
            className="slider__bullet"
            aria-label={`select ${i} slide`}
            data-index={i}
            key={i}
          >
          </button>,
        );
      }

      return (
        <div className={`slider__pagination ${paginationState}`}>
          {bullets}
        </div>
      );
    }

    return null;
  }

  type SlideProps = {
    id?: number;
    children?: React.ReactNode;
  };

  function Slide(props: SlideProps) {
    const { id, children } = props;

    return (
      <div className="slider__slide" data-id={id}>
        {children}
      </div>
    );
  }

  type Wrapper = {
    children?: React.ReactElement[];
  };

  function SliderWrapper(props: Wrapper) {
    const { children } = props;
    useEffect(() => {
      setSlidesLength(children.length);
    }, [children.length]);

    return <div className="slider__wrapper" style={transformSlider()}>{children}</div>;
  }

  function transformSlider() {
    console.log(sliderPosition, 'pos');
    return { transform: `translate3d(${-sliderPosition}px, 0, 0)` };
  }

  console.log('render');

  return (
    <>
      <SliderWrapper>
        <Slide id={0}>
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
      <Arrows />

      {/* pagination */}
      <Pagination />

      {/* counter */}
      <Counter />
    </>
  );
}

export default Slider;
