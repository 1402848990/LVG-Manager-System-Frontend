import axios from 'axios';

// 查找重复元素及其个数
function countNum(arr) {
  const _res = [];
  arr.sort();
  for (let i = 0; i < arr.length; ) {
    let count = 0;
    for (let j = i; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        count++;
      }
    }
    _res.push([arr[i], count]);
    i += count;
  }
  return _res;
}

// 获取IP、地点等地理位置
async function getIPandAddress() {
  const res = await axios({
    url: '/cityjson?ie=json',
    // url: 'http://wrdemo.cn/gps/',
    // url: 'http://api.ip138.com/query/',
    method: 'get'
  });
  const d = res.data.split('= ');
  const dd = d[1].split(';');
  const data = JSON.parse(dd[0]);
  console.log('data', data);
  return data;
}

function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

// 数组去重
const unique = arr => {
  const res = [];
  const json = {};
  for (let i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }
  return res;
};

export { unique, debounce, getIPandAddress, countNum };
