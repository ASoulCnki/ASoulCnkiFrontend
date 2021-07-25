import Message from 'element-ui/packages/message/index';
import CarouselItem from 'element-ui/packages/carousel-item/index';
import Carousel from 'element-ui/packages/carousel/index';
import Dialog from 'element-ui/packages/dialog/index'
import CheckBox from 'element-ui/packages/checkbox/index'

const element = {
  install: (Vue) => {
    Vue.use(Carousel);
    Vue.use(CarouselItem)
    Vue.use(Dialog)
    Vue.use(CheckBox)
    Vue.prototype.$message = Message
  }
}

export default element