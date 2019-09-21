<template>
  <div v-if="data.length">
    <v-chart
      :forceFit="true"
      height="400"
      :data="data"
      :padding="padding"
    >
      <v-tooltip
        :x="x"
        :y="100"
        :follow="false"
        crosshairs='y'
        :htmlContent="htmlContent"
      ></v-tooltip>
      <v-line 
        position="date*value"
        color='type'
      >
      </v-line>
      <v-axis
        dataKey="date"
        :label="label"
      >
      </v-axis>
      <v-axis
        dataKey="value"
        :label="labelFormat"
      >
      </v-axis>
    </v-chart>
  </div>
</template>
<script>
const label = {
  textStyle: {
    fill: '#aaaaaa'
  }
}

const labelFormat = {
  textStyle: {
    fill: '#aaaaaa'
  },
  formatter: function formatter(text) {
    return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }
}

const data = [
  {
  date: '2018/8/1',
  type: '1',
  value: 40
},  {
  date: '2018/8/1',
  type: '2',
  value: 182
}, {
  date: '2018/8/2',
  type: '1',
  value: 6145
}, {
  date: '2018/8/2',
  type: '2',
  value: 257
}, {
  date: '2018/8/3',
  type: '1',
  value: 508
},  {
  date: '2018/8/4',
  type: '1',
  value: 6268
},  {
  date: '2018/8/4',
  type: '2',
  value: 428
}, {
  date: '2018/8/5',
  type: '1',
  value: 6411
},  {
  date: '2018/8/5',
  type: '2',
  value: 619
}, {
  date: '2018/8/6',
  type: '1',
  value: 1890
}, {
  date: '2018/8/6',
  type: '2',
  value: 87
}, {
  date: '2018/8/7',
  type: '1',
  value: 4251
}, {
  date: '2018/8/7',
  type: '2',
  value: 706
}, {
  date: '2018/8/8',
  type: '1',
  value: 2978
},{
  date: '2018/8/8',
  type: '2',
  value: 387
}, {
  date: '2018/8/9',
  type: '1',
  value: 3880
}, {
  date: '2018/8/9',
  type: '2',
  value: 488
}, {
  date: '2018/8/10',
  type: '1',
  value: 3606
}, {
  date: '2018/8/10',
  type: '2',
  value: 507
}, {
  date: '2018/8/11',
  type: '1',
  value: 4311
}, {
  date: '2018/8/11',
  type: '2',
  value: 548
}, {
  date: '2018/8/12',
  type: '1',
  value: 4116
}, {
  date: '2018/8/16',
  type: '2',
  value: 176
}, {
  date: '2018/8/17',
  type: '1',
  value: 1999
}, {
  date: '2018/8/18',
  type: '2',
  value: 176
}];
import qs from 'qs';
const axios = require('axios');
import { Dialog } from 'vant';
import { Toast } from 'vant';
import moment from "moment"
export default {
  mounted(){
    this.setStyle();
  },
  methods:{ 
    setStyle(){
      const id = 'legend-html';
      if (document.getElementById(id)) {
          return;
      }
      const styleTxt = `
        .custom-tooltip {
            width: 100% !important;
            height: 10% !important;
            position: absolute;
            top: 0px;
            left: 0px
        }

        .custom-tooltip-item {
            width: 150px;
            height: 50px;
            position: relative;
            float: left;
            margin-left: 20px;
            border-left-style: solid;
            border-left-width: 5px
        }

        .custom-tooltip-item:first-child {
            margin-left: 0
        }

        .custom-tooltip-item-name {
            width: 80%;
            height: 20px;
            position: absolute;
            top: 0px;
            left: 10px;
            color: rgba(0, 0, 0, 0.45);
            font-size: 14px
        }

        .custom-tooltip-item-value {
            width: 80%;
            height: 30px;
            position: absolute;
            bottom: 0px;
            left: 10px;
            color: #262626;
            font-size: 22px;
        }
      `;
      const style = document.createElement('style');
      style.setAttribute('id', id);
      style.innerHTML = styleTxt;
      document.getElementsByTagName('head')[0].appendChild(style);
    },
    getAllData:function(){
      var date = new Date();
      var theDate = moment(date).format('YYYY-MM-DD')
      var AllData = []
      axios.get('http://jizhang-api-dev.it266.com/api/record/account?token='+localStorage.token,{
          params:{
              begin_date:"2019-01-01",
              end_date:theDate              
          }
      })
      .then((res)=>{
        // console.log(res);
        var ListData = res.data.data.list
        for(var i = 0; i < res.data.data.list.length;i++){
          // if(res.data.data.list[i].total_money.split('.')[0])
          AllData[i] = {
            // 这边是创建时间
            date:moment(ListData[i].date).format('MM/DD HH'),
            type:String(res.data.data.list[i].type),
            value:Number(ListData[i].total_money.split('.')[0])
          }
          var count = res.data.data.list.length + i;
          AllData[count] = {
            date : moment(ListData[i].date).format('MM/DD HH'),
            type :'3',
            value:Number(ListData[i].total_money.split('.')[0])-Number(ListData[i].paid_money.split('.')[0])
          }
        }
        this.data = Array.prototype.slice.call(AllData)
        // console.log(AllData)
        // console.log(this.data)
        // console.log(this.data)

      })
    }
  },
  data() {
    return {
      data: data,
      padding: [150, 20, 90, 45],
      x:100,
      label,
      labelFormat,
      htmlContent: (title, items) => {
        var alias = {
          1: '收入',
          3: '利润',
          2: '支出'
        };
        var html = '<div class="custom-tooltip">';
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var color = item.color;
          var name = alias[item.name];
          var value = item.value;
          var domHead = '<div class="custom-tooltip-item" style="border-left-color:' + color + '">';
          var domName = '<div class="custom-tooltip-item-name">' + name + '</div>';
          var domValue = '<div class="custom-tooltip-item-value">' + value + '</div>';
          var time = '<div class="custom-tooltip-item-date">' + data[i].date + '</div>';
          var domTail = '</div>';
          html += domHead + domName + domValue + domTail;
        }
        return html + '</div>';
      }
    }
  },
  mounted(){
    this.getAllData()
  }
};
</script>

