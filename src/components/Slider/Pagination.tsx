interface Props {
  direction: string;
  slidesLength: number;
}

function Pagination(props: Props): JSX.Element {
  const { slidesLength, direction } = props;
  const paginationState = direction === 'vertical' ? 'is-vertical' : 'is-horizontal';
  const bullets = [];
  for (let i = 0; i < slidesLength; i++) {
    bullets.push(
      <button
        type="button"
        className="slider__bullet"
        aria-label={`select ${i} slide`}
        data-index={i}
        key={i}
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