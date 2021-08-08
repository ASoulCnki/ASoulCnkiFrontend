/**
 * Acticity Module For Member Birthday
 * Maintainer: ch3cknull <ch3cknull@outlook.com>
 * Date: 2021/08/07 
 */

/**
 * return random link from videoArray
 * @param {Array<String>} videoArray video url array
 * @returns {String} a url
 */
export function randomURL(videoArray) {
  let random = Math.floor(Math.random() * 1000) % (videoArray.length - 1)
  return videoArray[random]
}


/**
 * judge if active time
 * @param {Number} start start time - mill second
 * @param {Number} end  end time - mill second
 * @returns {Boolean} isActive
 */
export function isTimeActive() {
  if (persistence()) 
    return true
  const time = new Date() * 1
  const [start, end] = [1628352000000, 1628438400000]
  return (time > start && time < end)
}


const NO_ACTIVE_KEY = 'isNotActive'
/**
 * get Active state from localStorage
 * @returns {Boolean} isActive
 */
export function isActive() {
  // enable activity when isNotActive is false
  const state = JSON.parse(localStorage.getItem(NO_ACTIVE_KEY))
  if (state == null)
    enableActive()
  return !state
}

export function disableActive() {
  localStorage.setItem(NO_ACTIVE_KEY, true)
}

export function enableActive() {
  localStorage.setItem(NO_ACTIVE_KEY, false)
}

export function existActiveKey() {
  return localStorage.getItem(NO_ACTIVE_KEY) != null
}


const DIALOG_HISTORY = 'dialogHistory'

export function setDialog() {
  localStorage.setItem(DIALOG_HISTORY, true)
}

export function getDialogExist() {
  return localStorage.getItem(DIALOG_HISTORY) != null
}

// 彩蛋持久化, 当这一项存在，无视活动时间
const PERSISTENCE_FLAG = 'active'
export function persistence() {
  return localStorage.getItem(PERSISTENCE_FLAG) != null
}
