interface Props {
  activeSlide: number;
}

function Counter(props: Props):JSX.Element {
  const { activeSlide } = props;
  return <span className="slider__counter">{activeSlide + 1}</span>;
}

export default Counter;