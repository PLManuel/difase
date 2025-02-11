import { register } from "swiper/element/bundle"

document.addEventListener("astro:page-load", () => {
  register()

  const swiperSectores = document.querySelector("#swiper-sectores")
  const swiperMarquee = document.querySelector("#swiper-marquee")

  if (swiperSectores) {
    const swiperSectoresParams = {
      loop: true,
      speed: 1000,
      spaceBetween: 10,
      breakpoints: {
        320: { slidesPerView: 1 },
        480: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      on: { init() {} },
    }

    Object.assign(swiperSectores, swiperSectoresParams)
    swiperSectores.initialize()
  }

  if (swiperMarquee) {
    const swiperMarqueeParams = {
      loop: true,
      speed: 5000,
      allowTouchMove: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: { slidesPerView: 2 },
        480: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      },
      injectStyles: [
        `
        .swiper-wrapper {
          transition-timing-function: linear !important;
        }
        `,
      ],
      on: { init() {} },
    }

    Object.assign(swiperMarquee, swiperMarqueeParams)
    swiperMarquee.initialize()
  }
},)
