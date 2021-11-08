interface Props {
  changeSliderPosition: (i: number) => void;
  activeSlide: number;
  slidesLength: number;
}

function Arrows(props: Props): JSX.Element {
  function handleArrowClick(e: React.MouseEvent<HTMLElement>) {
    const { activeSlide, changeSliderPosition, slidesLength } = props;
    const target = e.target as HTMLTextAreaElement;

    if (target.classList.contains('slider__arrow_back')) {
      if (activeSlide <= 0) return;
      const newIndex = activeSlide - 1;
      changeSliderPosition(newIndex);
    } else if (target.classList.contains('slider__arrow_forward')) {
      console.log(activeSlide);
      if (activeSlide >= slidesLength - 1) return;
      const newIndex = activeSlide + 1;
      changeSliderPosition(newIndex);
    }

    // function triggerArrows(newIndex: number) {
    //   changeSliderPosition(newIndex);
    //   applyChangesAfterTransition(newIndex);
    // }
  }
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

export default Arrows;