export default {
  getEnv() {
    let HOST = window.location.host;
    if (HOST.indexOf(".soeasypay.cn") !== -1) {
      return "prod";
    } else if (HOST == "pre.soeasypay.cn") {
      return "pre"; // 195
    } else if (HOST == "test.soeasypay.cn") {
      return "test"; // 168
    } else if (HOST == "test1.soeasypay.cn") {
      return "test1"; // 181
    } else if (HOST == "dev1.soeasypay.cn") {
      return "dev1"; // 169
    } else if (HOST == "dev2.soeasypay.cn") {
      return "dev2"; // 179
    } else {
      return "local";
    }
  },
  getHttpUrl() {
    let HTTPAPI = "";
    if (this.getEnv() == "prod") {
      HTTPAPI = window.location.origin;
    } else if (this.getEnv() == "prod") {
      HTTPAPI = window.location.origin;
    } else if (this.getEnv() == "test") {
      HTTPAPI = window.location.origin;
    } else if (this.getEnv() == "test1") {
      HTTPAPI = window.location.origin;
    } else if (this.getEnv() == "dev1") {
      HTTPAPI = window.location.origin;
    } else if (this.getEnv() == "dev2") {
      HTTPAPI = window.location.origin;
    } else {
        HTTPAPI = "/ali"; // 默认dev1
    }
    return HTTPAPI;
  }
};
