var myChart = echarts.init(document.getElementById('echarts-one'));
				option = {
					 color: ['#cdd4dc','#00558e'],
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)",
		        textStyle:{
		        	fontSize: 10,
		        	width: 20,
		        	height:20,
		        },
		        position: ['30%', '10%']
		    },
		    legend: {
		        orient: 'horizontal',
				x: 'center',
				y: 'bottom',
		        data: ['已开工','未开工']
		    },
		    series : [
		        {
		            name: '开工情况',
		            type: 'pie',
		            radius : '40%',
		            center: ['50%', '50%'],
		            startAngle: 120,
		            labelLine:{    
               			normal:{    
                    		length:3  
                		} 
           			 },
		            data:[
		                {value:10, name:'未开工'},
		                {value:30, name:'已开工'}
		            ],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
		 myChart.setOption(option);
		  var myChart2 = echarts.init(document.getElementById('echarts-two'));
		  option = {
					 color: ['#cdd4dc','#00558e'],
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)",
		        textStyle:{
		        	fontSize: 10,
		        	width: 20,
		        	height:20,
		        },
		        position: ['30%', '10%']
		    },
		    legend: {
		        orient: 'horizontal',
				x: 'center',
				y: 'bottom',
		        data: ['已完工','未完工']
		    },
		        series : [
		        {
		            name: '开工情况',
		            type: 'pie',
		            radius : '40%',
		            center: ['50%', '50%'],
		            startAngle: 120,
		            labelLine:{    
               			normal:{    
                    		length:3  
                		} 
           			 },
		            data:[
		                {value:10, name:'未完工'},
		                {value:30, name:'已完工'}
		            ],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
		 myChart2.setOption(option);
		 // 百度地图API功能
	var map = new BMap.Map("baidumap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(111.736671,40.848334), 11);  // 初始化地图,设置中心点坐标和地图级别
	//添加地图类型控件
	map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));	  
	map.setCurrentCity("呼和浩特");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	 function G(id) {
        return document.getElementById(id);
    }
 
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input": "suggestId"
            , "location": map
        });
 
    ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
 
        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;
    });
 
    var myValue;
    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
 
        setPlace();
    });
 
    function setPlace() {
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun() {
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 18);
            map.addOverlay(new BMap.Marker(pp));    //添加标注
        }
 
        var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(myValue);
    }