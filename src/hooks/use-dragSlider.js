import { useRef, useState, useEffect } from "react";
import { SmoothHorizontalScrolling } from "../utilities/index";

export const useDragSlider = () => {
  const sliderRef = useRef();
  const movieRef = useRef();
  const [dragDown, setDragDown] = useState(0);
  const [dragMovie, setDragMovie] = useState(0);
  const [isDrag, setIsDrag] = useState(false);

  useEffect(() => {
    // Xét hành động kéo và thả
    if (isDrag) {
      if (dragMovie < dragDown) handleScrollRight();
      if (dragMovie > dragDown) handleScrollLeft();
    }
  }, [dragDown, dragMovie, isDrag]);
  // hàm xử lý cuộn (click) trái
  const handleScrollRight = () => {
    const maxScrollLeft =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

    if (sliderRef.current.scrollLeft < maxScrollLeft) {
      SmoothHorizontalScrolling(
        sliderRef.current,
        250,
        movieRef.current.clientWidth * 3,
        sliderRef.current.scrollLeft
      );
    }
  };
  // hàm xử lý cuộn (click) phải
  const handleScrollLeft = () => {
    console.log(sliderRef.current.scrollLeft);
    if (sliderRef.current.scrollLeft > 0) {
      SmoothHorizontalScrolling(
        sliderRef.current,
        250,
        -movieRef.current.clientWidth * 3,
        sliderRef.current.scrollLeft
      );
    }
  };

  // hàm sự kiện khi người dùng bắt đầu kéo
  const onDragStart = (e) => {
    // console.log(e.screenX);
    setIsDrag(true);
    setDragDown(e.screenX);
  };
  // hàm sự kiện khi người dùng bắt đầu kéo xong
  const onDragEnd = (e) => {
    // console.log(e.screenX);
    setIsDrag(false);
  };
  // hàm sự kiện khi người dùng kéo và thả (mục tiêu)
  const onDragEnter = (e) => {
    // console.log(e.screenX);
    setDragMovie(e.screenX);
  };
  return {
    sliderRef,
    movieRef,
    dragDown,
    dragMovie,
    isDrag,
    handleScrollLeft,
    handleScrollRight,
    onDragStart,
    onDragEnd,
    onDragEnter,
  };
};
