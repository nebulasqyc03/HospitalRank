

'use strict';

var dappAddress = "n1hkd43zSDd33d9sCXrUoAH2ATjYC4eAndM";
var ListShow = function() {

}
ListShow.prototype = {

    init: function() {
        var self = this;
        self.initCityList();
    },
    initCityList:function(){
        var req_args = [];
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : "query_all_city",
                    "args" : JSON.stringify(req_args)
                }
            },
            "method": "neb_call"
        }, "*");
    },
    getHospitalByCity:function(cityId){
        var req_args = [];
        req_args.push(cityId);
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : "query_hospital_by_city",
                    "args" : JSON.stringify(req_args)
                }
            },
            "method": "neb_call"
        }, "*");
    },
    listenWindowMessage: function() {
        var self = this;
        window.addEventListener('message', function(e) {
            // e.detail contains the transferred data
            if(e.data && e.data.data && e.data.data.neb_call) {
                // 收到返回数据
                if(e.data.data.neb_call.result) {
                    // 解析数据
                    var obj = JSON.parse(e.data.data.neb_call.result);
                    if (obj.type == "city_list") {
                        self.parseCityList(obj);
                    } else if (obj.type == "hospital_list") {
                        self.parseHospitalList(obj);
                    } else {
                        console.log("no need attation");
                    }
                    console.log(obj);
                } else {
                    console.log("Get Data From Constract Faield");
                }
            }
        });
    },

    parseCityList: function(list) {
        $("#main_loading").hide();
        $("#main_list").show();
        
        if (list.data.length == 0) {
            $("#city_list").hide();
            $("#city_warning").show();
        } else {
            $("#city_warning").hide();
            $("#city_list").empty().show();
            // 显示内容
            var citys = template(document.getElementById('city_list_t').innerHTML);
            var citys_html = citys({list: list.data});
            $("#city_list").append(citys_html);
            //默认点击选择第一个城市
            $("#city_list li a")[0].click();
        }

    },
    parseHospitalList:function(list){
        $("#hospital_loading").hide();
        $("#hospital_list_div").show();
        $("#hospital_list_div .hospital_item_div").remove();
        if (list.data.length == 0) {
            $("#hospital_warning").show();
        } else {
            $("#hospital_warning").hide();
            // 显示内容
            var hospitals = template(document.getElementById('hospital_list_t').innerHTML);
            var hospitals_html = hospitals({list: list.data});
            $("#hospital_list_div").append(hospitals_html);
        }
    },
}

var listObj=new ListShow();

function checkNebpay() {
    console.log("check nebpay")
    try{
        var NebPay = require("nebpay");
    }catch(e){
        //alert ("Extension wallet is not installed, please install it first.")
        console.log("no nebpay");
        $("#noExtension").removeClass("hide")
    }

    // 环境ok，拉取数据
    listObj = new ListShow();
    listObj.listenWindowMessage();
    listObj.init();
    
}



function initPage() {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("web page loaded...");
        $("#main_list").hide();
        $("#main_loading").show();
        setTimeout(checkNebpay,1000);
    });
}
function selectCity(cityId,cityName){
    $("#selectedCity").text(cityName);
    $("#hospital_list_div").hide();
    $("#hospital_loading").show();
    listObj.getHospitalByCity(cityId);
}

function jumpDetailPage(id) {
    location.href="departments.html?hospitalId=" + id;
}
initPage();
  