"use strict";
import promise from "es6-promise";
promise.polyfill();
import axios from "axios";
import env from "./env";
import store from "../store/AppStore";
import utils from "./utils";
import router from '../router/index';
const BASE_URL = env.getHttpUrl();

let instance = axios.create({
  timeout: 20000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json"
  },
  withCredentials: true,
  baseURL: BASE_URL
});

let formInstance = axios.create({
  timeout: 20000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "multipart/form-data"
  },
  withCredentials: true,
  baseURL: BASE_URL
})

// 请求时的拦截器
instance.interceptors.request.use(
  config => {
    store.commit("loading");
    return config;
  },
  error => {
    store.commit("unloading");
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  res => {
    store.commit("unloading");
    return res;
  },
  error => {
    store.commit("unloading");
    return Promise.resolve(error.res);
  }
);

// return res返回的是一个对象
// 网络或者服务器的错误
function checkStatus(res) {
  // 这里可以加一些动作, 比如来个进度条结束动作
  // 如果http状态码正常，则直接返回数据
  if (res && (res.status === 200 || res.status === 304 || res.status === 400)) {
    return res;
    // 如果不需要除了data之外的数据，可以直接 return res.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    message: "网络异常"
  };
}

// 程序端的错误
function checkCode(res, exceptionReturn) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    if (exceptionReturn) {
      res = {
        data: {
          error: true,
          message: res.message
        }
      };
      return res.data;
    }
    ap.showToast({ content: res.message, type: "none" });
    throw new Error(res.message);
  }

  if (res.data.status === "0000") {
    ap.showToast({ content: res.data.message, type: "none" });

    utils.ready(function () {
      AlipayJSBridge.call("exitApp");
    });

    throw new Error(res.data.message);
  }

  if (res.data.status === 42) {
    //学校未设置校验项，请联系学校管理员完成设置
    ap.confirm({
      title: '该学校暂未设置校验项，请设置校验项',
      content: '',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }, function (result) {
      console.log(result);
      if (result.confirm) {
        store.commit("isSetCheckItem", true);
        router.push({ path: "/setCheckItem" });
      }
    });
    throw new Error(res.data.message);
  }

  //系统异常
  if (res.data.status === 99999) {
    if (exceptionReturn) {
      res.data.error = true;
      return res.data;
    }
    ap.showToast({ content: res.message, type: "none" });

    throw new Error(res.data.message);
  }
  //没有权限 或者是boss/org/audi下的成功
  if (res.data.status === 10000) {
    if (
      res.data.data &&
      Object.keys(res.data.data).find(value => {
        return value === "list";
      })
    ) {
      return res.data;
    }
    if (exceptionReturn) {
      res.data.error = true;
      return res.data;
    }
    ap.showToast({ content: "没有权限", type: "none" });

    throw new Error("没有权限");
  }

  // 非正常code
  if (res.data.status !== 0) {
    if (exceptionReturn) {
      res.data.error = true;
      return res.data;
    }
    store.commit("unloading");
    ap.showToast({ content: res.data.message, type: "none" });
    throw new Error(res.data.message);
  }
  return res.data;
}

export default {
  /**
   * get请求
   * @param {*} url 请求地址
   * @param {*} data  参数
   * @param {*} exceptionReturn 异常时是否返回
   */
  get(url, params, exceptionReturn) {
    let headers = this.getHeader();
    return instance
      .request({
        method: "GET",
        url,
        params, // get 请求时带的参数
        headers: headers
      })
      .then(res => {
        return checkStatus(res);
      })
      .then(res => {
        return checkCode(res, exceptionReturn);
      });
  },

  //post json传参
  postJson(url, params, exceptionReturn) {
    let headers = this.getHeader();
    return instance
      .request({
        method: "POST",
        url,
        headers,
        data: JSON.stringify(params)
      })
      .then(res => {
        return checkStatus(res);
      })
      .then(res => {
        return checkCode(res, exceptionReturn);
      });
  },

  postForm(url, params, exceptionReturn) {
    let headers = this.getHeader();
    return formInstance
      .request({
        method: "POST",
        url,
        headers,
        data: params
      })
      .then(res => {
        return checkStatus(res);
      })
      .then(res => {
        return checkCode(res, exceptionReturn);
      });
  },

  getHeader() {
    let clientType = "";
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      clientType = "ios";
    } else if (navigator.userAgent.match(/Android/i)) {
      clientType = "android";
    } else {
      clientType = "other";
    }

    return {
      appVersion: "1.1.0",
      app: "soeasypayschoolh5",
      clientType: clientType,
      token: store.state.token
    };

  }
};
