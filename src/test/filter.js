import utils from "./utils";

/**
 * 金额格式化
 * @param {*} number  要格式化的数字
 * @param {*} decimals  保留几位小数(默认2)
 * @param {*} dec_point  小数点符号（默认'.'）
 * @param {*} thousands_sep  千分位符号(默认',')
 */

let moneyFormatFilter = number => {
  let places = 2;
  let thousand = ',';
  let decimal = '.';
  number = number || 0;
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  var negative = number < 0 ? "-" : "",
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return '￥' + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

let formatDateToString = dateTime => utils.dateFormat("YYYY.MM.DD HH:mm", new Date(dateTime));

let statusFilter = statusNum => {
  let status = '';
  if (statusNum == 'CHECK_IN') {
    status = '审核中...'
  } else if (statusNum == 'CHECK_PASS') {
    status = '审核通过'
  } else if (statusNum == 'CHECK_REJECT') {
    status = '审核驳回'
  } else if (statusNum == 'CHECK_FAIL') {
    status = '审核失败'
  } else if (statusNum == 'WAIT_CHECK') {
    status = '待审核'
  }

  return status
}

export { moneyFormatFilter, formatDateToString, statusFilter };
