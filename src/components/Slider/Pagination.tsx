import { Dispatch, SetStateAction } from 'react';

interface Props {
  direction: string;
  slidesLength: number;
  setActiveSlide: Dispatch<SetStateAction<number>>;
  activeSlide: number;
}

function Pagination(props: Props): JSX.Element {
  const {
    slidesLength, direction, setActiveSlide, activeSlide,
  } = props;
  const paginationState = direction === 'vertical' ? 'is-vertical' : 'is-horizontal';
  const bullets = [];

  for (let i = 0; i < slidesLength; i++) {
    let className = '';
    if (i === activeSlide) className = 'slider__bullet is-active';
    else className = 'slider__bullet';

    bullets.push(
      <button
        type="button"
        className={className}
        aria-label={`select ${i} slide`}
        data-index={i}
        key={i}
        onClick={() => setActiveSlide(i)}
      />,
    );
  }

  return (
    <div className={`slider__pagination ${paginationState}`}>
      {bullets}
    </div>
  );
}

export default Pagination;