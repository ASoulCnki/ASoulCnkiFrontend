import Message from 'element-ui/packages/message/index';
import CarouselItem from 'element-ui/packages/carousel-item/index';
import Carousel from 'element-ui/packages/carousel/index';
import Dialog from 'element-ui/packages/dialog/index'
import CheckBox from 'element-ui/packages/checkbox/index'
import RadioGroup from 'element-ui/packages/radio-group'
import RadioButton from 'element-ui/packages/radio-button'

const element = {
  install: (Vue) => {
    Vue.use(Carousel);
    Vue.use(CarouselItem)
    Vue.use(Dialog)
    Vue.use(CheckBox)
    Vue.use(RadioGroup)
    Vue.use(RadioButton)
    Vue.prototype.$message = Message
  }
}

export default element