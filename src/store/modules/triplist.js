import fetch from '@/utils/ApiUtils';
import { Indicator, Toast } from 'mint-ui';
import { queryChannelUserOrder, queryUserOrderDetail } from '@/constants/ApiConstants';
export const MyTripList = {
  state: {
    status: 1,
    pageNum: 1,
    totalPage: 1,
    pageSize: 8,
    orderId: '',
    isLoading: false,
    isMoreLoading: false,
    noDataShow: false,
    departOrReturn: 1,
    tripInfo: {},
    orderInfo: {},
    voyageInfo: {},
    travellerinfo: {},
    tripDetailInfo: {},
    triplistArray: [],
    statusList: ['', 'Upcoming', 'To be paid', 'Completed', 'Canceled'],
    Tstatus: {
      1: 'Refunding',
      2: 'Changing',
      3: 'Refunding',
      4: 'Changed',
      5: 'Refunded',
      105: 'Upcoming',
      106: 'Complete',
      107: 'To be paid',
      108: 'Fail',
      109: 'Fail'
    }
  },
  actions: {
    selectDiffStatus ({ commit, state }, type) {
      state.triplistArray = [];
      state.status = type;
      state.pageNum = 1;
      state.totalPage = 1;
      Indicator.open({
        text: 'loading...',
        spinnerType: 'fading-circle'
      });
      commit('saveMyTripList', type);
    },
    changeLoadMoreAction ({ commit, state }, val) {
      state.isLoading = val;
      state.isMoreLoading = val;
      if (val) {
        state.pageNum += 1;
        setTimeout(() => {
          commit('saveMyTripList', state.status);
        }, 500);
      }
    }
  },
  mutations: {
    saveMyTripList (state, status) { // 更新数据triplist
      let data = {
        pageNum: state.pageNum,
        pageSize: state.pageSize,
        status: state.statusList[status]
      };
      fetch.post(queryChannelUserOrder, data, { headers: {
        'Content-Type': 'application/json'
      } }).then(res => {
        if (res.code === 0) {
          Indicator.close();
          let arr = res.data.list;
          state.totalPage = Math.ceil(res.data.total / state.pageSize);
          state.isLoading = false;
          state.isMoreLoading = false;
          state.triplistArray.push(...arr);
          if (res.data.list.length < 1) {
            state.noDataShow = true;
          } else {
            state.noDataShow = false;
          }
        } else {
          Toast(res.msg);
        }
      })
    },
    saveSearchDetailInfo (state, data) { // 获取trip detail
      // state.orderId = '';
      // state.tripInfo = {};
      // state.orderInfo = {};
      // state.voyageInfo = {};
      // state.travellerinfo = {};
      let url = `${queryUserOrderDetail}?tripId=${data}`
      Indicator.open({
        text: 'loading...',
        spinnerType: 'fading-circle'
      });
      fetch(url).then(res => {
        if (res.code === 0) {
          res.data.triplist.forEach(e => {
            let isTicketNo = false;
            // let isOperateable = false;
            e.ticketsinfo.forEach(value => {
              e.travellerinfo.forEach((val, j) => {
                e.isTicketNo = isTicketNo || !!value[j].ticketno;
                if (Number(val.status) === 1) {
                  e.isOperateable = true;
                }
                // e.isOperateable = isOperateable || !!Number(val.status);
                e.Tstatus = state.Tstatus[String(value[j].status)];
              });
            });
            e.isChangeable = e.refundable && e.isOperateable && e.isTicketNo;
          });
          state.tripDetailInfo = res.data;
          state.orderId = res.data.order.orderid;
          state.orderInfo = res.data.order;
          state.tripInfo = res.data.triplist[0];
          state.voyageInfo = res.data.triplist[0].voyageinfo[0];
          state.travellerinfo = res.data.triplist[0].travellerinfo[0];
          Indicator.close();
        } else {
          console.log(`%c ${res.code} --> ${res.message}`, 'color:red;');
        }
      })
    },
  }
};
