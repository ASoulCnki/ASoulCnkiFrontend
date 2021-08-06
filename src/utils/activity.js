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
export function isTimeActive(start, end) {
  const time = new Date() * 1
  return (time > start && time < end) 
}


const ACTIVE_KEY = 'isNotActive'
/**
 * get Active state from localStorage
 * @returns {Boolean} isActive
 */
export function isActive() {
  // enable activity when isNotActive is false
  return !(JSON.parse(localStorage.getItem(ACTIVE_KEY)) || false)
}

export function disableActive() {
  localStorage.setItem(ACTIVE_KEY, true)
}

export function enableActive() {
  localStorage.setItem(ACTIVE_KEY, false)
}