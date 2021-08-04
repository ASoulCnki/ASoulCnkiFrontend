/**
 * 合并重复区间
 * @param {Array<Object>} intervals 待去重区间
 * @returns {Array<Object>} 去重的区间
 */
 const merge = function (intervals) {
	if (intervals.length == 0) return []

	intervals.sort((a, b) => a.start - b.start);

	let outputs = [];
	outputs.push(intervals[0]);

	intervals.forEach(s => {
		const lastInterval = outputs[outputs.length - 1];
		const [currLeft, currRight] = [s.start, s.end];

		(lastInterval.end < currLeft) ?
			outputs.push(s) :
			lastInterval.end = Math.max(lastInterval.end, currRight);
	});
	return outputs.sort((a, b) => b.start - a.start);
};


/**
 * 标记重复区间
 * @param {String} origin 待查重文本
 * @param {String} dest 返回的文本
 * @param {Number} sensive 敏感长度
 * @returns {Array<Object>} 重复区间数组（根据开始位置逆序）
 */
function compare(origin, dest, sensive) {
	const length = origin.length * dest.length;
	let martix = Array(length).fill(0);
	let cacheArray = [];
	let [originArr, destArr] = [[...origin], [...dest]];


	const convert = (indexY, indexX) => indexY * origin.length + indexX;

	const remove = (arr, obj) => {
		const x = JSON.stringify(obj);
		return arr.filter(s => JSON.stringify(s) != x);
	};

	const newCache = (end, offset) => {
		let start = end - offset;
		start = start < 0 ? 0 : start + 1;
		return {
			start: start,
			end: offset + start
		};
	};

	originArr.forEach((s, index) => {
		if (dest[0] == s) martix[index] = 1;
	});

	destArr.forEach((x, indexX) => {
		originArr.forEach((y, indexY) => {
			const index = convert(indexY, indexX);
			const preIndex = convert(indexY - 1, indexX - 1);

			if (x == y) {
				if (indexY == 0) {
					martix[index] = 1;
					return;
				}

				martix[index] = martix[preIndex] + 1;

				if (martix[index] >= sensive) {
					cacheArray.push(newCache(indexY, martix[index]));
				}
				if (martix[index] > sensive) {
					cacheArray = remove(cacheArray, newCache(indexY - 1, martix[preIndex]));
				}

			}
		});
	});
	return merge(cacheArray);
}
const render = (s, flag, tag) => {
	const strArr = [...s];
	const tagName = tag.match(/\w+/);
	tag = tagName ? tagName[0].toLowerCase() : 'em';

	for (const i of flag) {
		strArr.splice(i.end, 0, `</${tag}>`);
		strArr.splice(i.start, 0, `<${tag}>`);
	}

	return strArr.join('');
};

/**
 * 对文本重复对比，给重复部分加tag
 * @param {string} origin 待查重文本
 * @param {string} dest 服务器返回的文本
 * @param {number} sensive 敏感长度
 * @param {string} tag HTML tag, example a, em
 * @returns {string} 做好标记的文本
 */
export function fillTags(origin, dest, sensive = 4, tag = "em") {
	const flag = compare(origin, dest, sensive);
	return render(dest, flag, tag);
}
