let urlApi = {
  //获取学校列表
  getAllSchoolList: "api/app/teacher/school/schools",
  //切换学校
  switchSchool: "/api/app/teacher/home/switchSchool",
  //今日收款
  queryBillSummaryAndBalance:
    "/api/app/teacher/home/queryBillSummaryAndBalance",
  // 当前余额
  queryBalance: "/api/app/teacher/withdraw/queryBalance",
  // 获取最新缴费
  queryRecentSuccessBills: "/api/app/teacher/bill/queryRecentSuccessBills",
  // 获取账单详情
  queryBillDetail: "/api/app/teacher/bill/detail",
  //获取支付方式列表
  getPaymentMethods: "api/app/teacher/common/getPaymentMethods",
  //删除待缴费账单
  closeAndDelBill: "api/app/teacher/bill/closeAndDel",
  //获取banner资源
  queryLaunchResource: "api/app/teacher/launchresouce/queryLaunchResource",
  //其他方式收费
  offlinePayment: "api/app/teacher/bill/offlinePayment",
  //账单查询
  billQuery: "api/app/teacher/bill/query",
  //当面收
  manualBills: "api/app/teacher/bill/manualBills",
  //当面付
  payInFaceBills: "api/app/teacher/bill/payInFaceBills",
  //批次列表
  batchList: "api/app/teacher/bill/batch/list",
  //获取批次账单详情
  queryBills: "api/app/teacher/bill/batch/queryBills",
  //批次收费详情
  batchStatistics: "api/app/teacher/bill/batch/statistics",
  //当面付二维码链接
  getFacePayQrCodeUrl: "api/app/teacher/payment/in/face/getQrCodeUrl",
  //银行卡列表
  queryWithdrawalInfo: "api/app/teacher/withdraw/queryWithdrawalInfo",
  //银行卡 提现
  payWithdrawal: "/api/app/teacher/withdraw/payWithdrawal",
  //银行卡 提现记录
  withdrawalQuery: "/api/app/teacher/withdraw/withdrawalQuery",
  //审核记录列表
  queryBankAuditList: "api/app/teacher/bankAudit/queryBankAuditList",
  //银行卡列表
  querySchoolBanks: "api/app/teacher/bankAudit/querySchoolBanks",
  // 当前余额
  getBalanceInfo: "/api/app/teacher/home/queryBalance",
  // 银行卡 获取开户行列表
  bankList: "api/app/teacher/bankAudit/queryAllBank",
  // 上传
  upload: "api/app/teacher/common/upload",
  // 绑定银行卡
  bindBankCard: "api/app/teacher/bankAudit/submitSchoolBankAudit",
  // 添加银行卡下载模版
  downloadBankLetter: "api/app/teacher/bankAudit/downloadBankComfirmLetter",
  // 增加校验项
  addVerify: 'api/app/teacher/school/addVerify',
  // 首次登录
  firstLogin: 'userAction/firstLogin',
  // 查询银行卡详情
  getCurrentBankInfo: 'api/app/teacher/bankAudit/queryDetail',
  // 驳回重新编辑银行卡
  modifyBankInfo: 'api/app/teacher/bankAudit/modifySchoolBankAudit',
  // 账单详情查看数据统计
  billStatistics: 'api/app/teacher/bill/billStatistics',

  // 赏格
  // 账户详情管理
  getAccountInfo: '/atv/api/account/info',
  // 获取红包列表
  getCouponList: '/atv/api/coupon/list',
  // 获取红包详情
  getCouponDetail: '/atv/api/coupon/detail/',
  // 领取红包
  receiveCoupon: '/atv/api/coupon/receive/',
  // 获取提现账户信息
  getWithdrawalInfo: "/atv/api/withdrawal/info",
  // 获取提现记录
  getWithdrawalRecordList: '/atv/api/withdrawal/record/list',
  // 提现
  couponWithdrawal: '/atv/api/withdrawal/withdrawal',
  // 获取赏金池列表
  getRewardList:'	api/app/teacher/activity/todayReward',
  // 赏金池详情
  queryRewardDetail: '/atv/api/activity/reward/detail/',
  // 提现回调
  getAlipayUserInfo: '/callback/activity/getAlipayUserInfo',

};

export default urlApi;
