import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index'
import Balance from '../pages/Balance'
import Myself from '../pages/myself'
import addAccount from '../pages/addAccount'
import myAccount from'../components/mySelf/myAccount'
import editAccount from '../pages/editAccount'
import addBookkeeping from '../pages/addBookkeeping'
import inBookkeep from '../pages/inBookkeep'
import outBookkeep from '../pages/outBookkeep'
import createBookkeepingM from '../pages/createBookkeepingM'
import inMoneyList from '../pages/inMoneyList'
import outMoneyList from '../pages/outMoneyList'
import morMoneyList from '../pages/morMoneyList'
import MonthList from '../components/mySelf/MonthList'
import QuarterList from '../components/mySelf/QuarterList'
import YearList from '../components/mySelf/YearList'
import billDetails from '../components/Balance/billDetails'
import Subsequent from '../components/Balance/Subsequent'
import editInfo from '../components/mySelf/editInfo'
import editPassword from '../components/mySelf/editPassword'
import editMobile from '../components/mySelf/editMobile'
import updataCenterInfo from '../components/mySelf/updataCenterInfo'
import WatchShareBook from '../components/mySelf/WatchShareBook'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path:'/addBookkeeping',
      name:'addBookkeeping',
      component:addBookkeeping,
      redirect:'/inBookkeep',
      children:[{
        path:'/inBookkeep',
        name:'inBookkeep',
        component:inBookkeep
      },{
        path:'/outBookkeep',
        name:'outBookkeep',
        component:outBookkeep
      },{
        path:'/createBookkeepingM',
        name:'createBookkeepingM',
        component:createBookkeepingM
      }]
    },
    {
      path:'/myAccount',
      name:'myAccount',
      component: myAccount
    },
    {
      path:'/editAccount',
      name:'editAccount',
      component:editAccount
    },
    {
      path:'/addAccount',
      name:'addAccount',
      component:addAccount
    },
    {
      path: '/home',
      name: 'index',
      component: Index
    },
    {
      path:'/balance',
      name:'balance',
      component:Balance
    },
    {
      path:'/myself',
      name:'myself',
      component:Myself
    },
    {
      path:'/inMoneyList',
      name:'inMoneyList',
      redirect:'/MonthList',
      component:inMoneyList,
      children:[{
        path:'/MonthList',
        name:'MonthList',
        component:MonthList
      },{
        path:'/QuarterList',
        name:'QuarterList',
        component:QuarterList
      },{
        path:'/YearList',
        name:'YearList',
        component:YearList
      }]
    },{
      path:'/outMoneyList',
      name:'outMoneyList',
      component:outMoneyList
    },{
      path:'/morMoneyList',
      name:'morMoneyList',
      component:morMoneyList
    },{
      path:'/billDetails',
      name:'billDetails',
      component:billDetails
    },{
      path:'/Subsequent',
      name:'Subsequent',
      component:Subsequent
    },{
      path:'/editInfo',
      name:"editInfo",
      component:editInfo
    },{
      path:'/editPassword',
      name:'editPassword',
      component:editPassword
    },{
      path:'/editMobile',
      name:'editMobile',
      component:editMobile
    },{
      path:'/updataCenterInfo',
      name:'updataCenterInfo',
      component:updataCenterInfo
    },{
      path:'/WatchShareBook',
      name:'WatchShareBook',
      component:WatchShareBook
    }
  ]
})
