import moment from "moment";
import router from '../router/index';

export default {
  /**
   * 获取top X + 其他支付方式
   * @param {*} topCount
   * @param {*} payWayList
   */
  getPayWayTopX(topCount, payWayList) {
    const totalPaywayCount = payWayList.length;
    let topFinalCount =
      totalPaywayCount > topCount ? topCount : totalPaywayCount;
    let topPayWayList = [];
    let otherPayMoney = 0.0;
    payWayList.forEach((item, index) => {
      if (index < topFinalCount) {
        item.icon = this.getPayWayIcon(item.paymentMethod);
        topPayWayList.push(item);
      } else {
        otherPayMoney += parseFloat(item.payMoney);
      }
    });
    if (totalPaywayCount > topFinalCount) {
      topPayWayList.push({
        payName: "其它方式",
        payMoney: otherPayMoney,
        paymentMethod: 0,
        icon: this.getPayWayIcon(0)
      });
    }

    return topPayWayList;
  },

  /**
   * 获取支付方式icon
   * @param {*} payWayMethod 支付方式
   */
  getPayWayIcon(payWayMethod) {
    let icon;
    payWayMethod = parseInt(payWayMethod);
    switch (payWayMethod) {
      case 1: //支付宝教育缴费
        icon = require("../assets/charge/icon_payway_easypay.png");
        break;
      case 2: //现金
        icon = require("../assets/charge/icon_payway_cash.png");
        break;
      case 3: //POS
        icon = require("../assets/charge/icon_payway_pos.png");
        break;
      case 4: //银行汇款转账
        icon = require("../assets/charge/icon_payway_bank.png");
        break;
      case 5: //微信转账
        icon = require("../assets/charge/icon_payway_wechat.png");
        break;
      case 6: //支付宝转账
        icon = require("../assets/charge/icon_payway_alipay.png");
        break;
      case 7: //其它方式
        icon = require("../assets/charge/icon_payway_other.png");
        break;
      case 8: //教育培训缴费
        icon = require("../assets/charge/icon_payway_train_pay.png");
        break;
      case 9: //分期收(学校手续费)
        icon = require("../assets/charge/icon_payway_allin_school.png");
        break;
      case 10: //分期收(用户手续费)
        icon = require("../assets/charge/icon_payway_allin_person.png");
        break;
      case 11: //信用卡/储蓄卡(商家付手续费)
        icon = require("../assets/charge/icon_payway_credit_school.png");
        break;
      case 12: //信用卡/储蓄卡(用户付手续费)
        icon = require("../assets/charge/icon_payway_credit_person.png");
        break;
      case 13: //支付宝
        icon = require("../assets/charge/icon_payway_mybank_alipay.png");
        break;
      case 14: //微信
        icon = require("../assets/charge/icon_payway_mybank_wx.png");
        break;
      case 15: //网银转账
        icon = require("../assets/charge/icon_payway_netfin.png");
        break;
      default:
        //其它方式
        icon = require("../assets/charge/icon_payway_other.png");
        break;
    }
    return icon;
  },

  //时间戳装换
  dateFormat(fmt, date) {
    return moment(date).format(fmt);
  },

  //账单状态
  billStatusName(status) {
    let statusName = {
      "-1": "未知",
      "0": "账单发送失败",
      "1": "未发送账单",
      "2": "待缴费",
      "3": "支付成功",
      "4": "缴费成功",
      "5": "逾期关闭",
      "6": "账单关闭",
      "7": "发送超时"
    };
    return statusName[status];
  },

  //账单类型
  inputType(inputType) {
    let inputTypeStr = "";
    switch (inputType) {
      case "EXCEL":
        inputTypeStr = "批次账单";
        break;
      case "MANUAL":
        inputTypeStr = "当面收";
        break;
      case "PAYMENT_IN_FACE":
        inputTypeStr = "当面付";
        break;
    }
    return inputTypeStr;
  },

  //深拷贝
  deepClone(source) {
    return JSON.parse(JSON.stringify(source));
  },

  /**
   *获取账单搜索框的占位字符
   *
   * @export
   * @returns placeholder 占位字符
   */
  getSearchBillPlaceholder(schoolInfo) {
    let placeholder = "";
    switch (schoolInfo.schoolAttrType) {
      case "MOBILE":
        placeholder = "姓名、手机号";
        break;
      case "STUDENT_CODE":
        placeholder = "姓名、学号";
        break;
      case "ID_NO":
        placeholder = "姓名、身份证号";
        break;
      default:
        placeholder = "姓名、学号、身份证号";
        break;
    }
    return placeholder;
  },

  //写cookies

  setCookie(name, value) {
    let Days = 20;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie =
      name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  },

  //读取cookies
  getCookie(name) {
    let arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  },

  //删除cookies
  delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },

  // 调用支付宝内壳jsapi，必须调用
  ready(callback) {
    // 如果jsbridge已经注入则直接调用
    if (window.AlipayJSBridge) {
      callback && callback();
    } else {
      // 如果没有注入则监听注入的事件
      document.addEventListener("AlipayJSBridgeReady", callback, false);
    }
  },

  // 新开页面跳转
  pushWindow(path, data) {
    ap.pushWindow({
      url: `#${path}`,
      data: data
    });
    // router.push({ path, query: data });
  },

  // 从url获取参数
  getUrlKey(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
  }
};
