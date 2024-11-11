import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Slider.module.css";

const slides = [
  {
    importantTitle: "Stan Smith",
    title: "Forever!",
    img: "img/frog.png",
  },
  {
    importantTitle: "Stan Smith",
    title: "Forever!",
    img: "img/frog.png",
  },
  {
    importantTitle: "Stan Smith",
    title: "Forever!",
    img: "img/frog.png",
  },
  {
    importantTitle: "Stan Smith",
    title: "Forever!",
    img: "img/frog.png",
  },
];

export const Slider = () => {
  return (
    <div className={styles.container}>
      <Swiper modules={[Navigation]} navigation className={styles.slider}>
        {slides.map((obj, index) => (
          <SwiperSlide className={styles.slide} key={index}>
            <div className={styles.content}>
              <img className={styles.logo} src="img/sliderLogo.png" alt="" />
              <h2 className={styles.title}>
                Stan Smith
                <span className={styles.span}>, Forever!</span>
              </h2>
              <button className={styles.button}>Купить</button>
            </div>
            <div className={styles.imgWrapper}>
              <img className={styles.img} src="img/frog.png" alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
