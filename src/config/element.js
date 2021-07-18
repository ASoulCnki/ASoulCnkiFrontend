import Message from 'element-ui/packages/message/index';
import CarouselItem from 'element-ui/packages/carousel-item/index';
import Carousel from 'element-ui/packages/carousel/index.js';

const element = {
  install: (Vue) => {
    Vue.use(Carousel);
    Vue.use(CarouselItem)
    Vue.prototype.$message = Message
  }
}

export default element