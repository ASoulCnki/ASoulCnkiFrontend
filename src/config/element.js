import Message from 'element-ui/packages/message/index';
// import CarouselItem from 'element-ui/packages/carousel-item/index';
// import Carousel from 'element-ui/packages/carousel/index.js';

import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-chalk/message.css'
// import 'element-ui/lib/theme-chalk/carousel.css'
// import 'element-ui/lib/theme-chalk/carousel-item.css'

const element = {
  install: (Vue) => {
    // Vue.use(Carousel);
    // Vue.use(CarouselItem)
    Vue.prototype.$message = Message
  }
}

export default element