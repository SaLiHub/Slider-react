interface Props {
  setActiveSlide: (i: number) => void;
  activeSlide: number;
  slidesLength: number;
}

function Arrows(props: Props): JSX.Element {
  const { activeSlide, setActiveSlide, slidesLength } = props;

  function handleArrowClick(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLTextAreaElement;

    if (target.classList.contains('slider__arrow_back')) {
      if (activeSlide === 0) return;
      const newIndex = activeSlide - 1;
      setActiveSlide(newIndex);
    } else if (target.classList.contains('slider__arrow_forward')) {
      if (activeSlide === slidesLength - 1) return;
      const newIndex = activeSlide + 1;
      setActiveSlide(newIndex);
    }

    // function triggerArrows(newIndex: number) {
    //   changeSliderPosition(newIndex);
    //   applyChangesAfterTransition(newIndex);
    // }
  }
  if (activeSlide === 0) {
    var isBackDisabled = true;
    console.log('first');
  } else if (activeSlide === slidesLength - 1) {
    console.log('last');
    var isForwardDisabled = true;
  }
  return (
    <>
      <button
        type="button"
        aria-label="back"
        className="slider__arrow slider__arrow_back"
        onClick={handleArrowClick}
        disabled={isBackDisabled}
      />
      <button
        type="button"
        aria-label="forward"
        className="slider__arrow slider__arrow_forward"
        onClick={handleArrowClick}
        disabled={isForwardDisabled}
      />
    </>
  );
}

export default Arrows;
