import { register } from "swiper/element/bundle"

register()

const swiperMarquee = document.querySelector("#swiper-marquee")

const swiperMarqueeParams = {
  slidesPerView: "4",
  loop: true,
  speed: 5000,
  allowTouchMove: false,
  spaceBetween: 100,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  injectStyles: [
    `
      .swiper-wrapper {
        transition-timing-function: linear !important;
      }
    `,
  ],
  on: {
    init() {},
  },
}

Object.assign(swiperMarquee, swiperMarqueeParams)

swiperMarquee.initialize()
