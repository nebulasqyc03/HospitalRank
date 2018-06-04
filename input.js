

'use strict';

var dappAddress = "n1hkd43zSDd33d9sCXrUoAH2ATjYC4eAndM";
var InputData = function() {

};
InputData.prototype = {

    init: function() {
        var self = this;

        var index=UrlParm.parm("index");  
        if(index&&index!=""){
            $("#tab_index li a").eq(index).click();
        }
        $("#submit_1c").click(function() {
            self.addCitys();
        });
        $("#submit_2c").click(function() {
            self.addAdmins();
        });
        $("#submit_3c").click(function() {
            self.addHospital();
        });
        $("#submit_4c").click(function() {
            self.addDepartments();
        });
        self.initInputCityPage();
        self.initInputAdminPage();
    },
    initCityList:function(){

        $("#input_main").hide();
        $("#input_main_loading").show();

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

    showLoading:function (){
		layer.open({
            type: 3,
            content: '<img src="images/loading/loading_org.gif">'
		});
    },

    hideLoading: function() {
        layer.closeAll('loading');
    },

    initHospitalListByCity:function(cityId){
        var self = this;
        self.showLoading();
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
    addCitys:function(){
        var citys=$("#input-cityNames").val();
        if(citys == ""){
            var notify= notifyMsg("城市名称不能为空！");
            return;
        }
        // 提交
        var func = "add_citys_to_list";
        var req_arg_item = {
            "cityNames": citys,
        };
        var req_args = [];
        req_args.push(req_arg_item);

        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : func,
                    "args" : JSON.stringify(req_args),
                }
            },
            "method": "neb_sendTransaction"
        }, "*");
    },
    addAdmins:function(){
        var admins=$("#input-admin").val();
        if(admins == ""){
            var notify= notifyMsg("管理员标识不能为空！");
            return;
        }
        // 提交
        var func = "add_admins_to_list";
        var req_arg_item = {
            "admins": admins,
        };
        var req_args = [];
        req_args.push(req_arg_item);

        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : func,
                    "args" : JSON.stringify(req_args),
                }
            },
            "method": "neb_sendTransaction"
        }, "*");
    },
    addHospital:function(){
        var cityId=$("#select-cityList_3c").val();
        var hospitalName=$("#input-hospitalName").val();
        var hospitalLevel=$("#select-hospitalLevel").val();
        var hospitalType=$("#select-hospitalType").val();
        var economicType=$("#select-economicType").val();
        var hospitalLocation=$("#input-hospitalLocation").val();
        var hospitalDesc=$("#input-hospitalDesc").val();

        if(cityId == ""||hospitalName == ""||hospitalLevel == ""||hospitalType == ""
            ||hospitalLocation == ""||hospitalDesc == ""){
            var notify= notifyMsg("所有字段都不能为空！");
            return;
        }
        var departments=[];
        var objs=$("#form_3c .departmentDiv");
        if(objs&&objs.length>0){
            for(var i=0;i<objs.length;i++){
                var obj=$("#form_3c .departmentDiv")[i];
                var name=$(obj).find("input[name='departmentName']").val();
                if(name&&name!=""){
                    var dep={
                        "name":name,
                        "description":$(obj).find("textarea[name='departmentDesc']").val(),
                    };
                    departments.push(dep);
                }
                
            }
        }
        // 提交
        var func = "add_hospital_to_list";
        var req_arg_item = {
            "cityId": cityId,
            "hospitalName": hospitalName,
            "hospitalLevel": hospitalLevel,
            "hospitalType": hospitalType,
            "economicType": economicType,
            "hospitalLocation": hospitalLocation,
            "hospitalDesc": hospitalDesc,
            "departments": departments,
        };
        var req_args = [];
        req_args.push(req_arg_item);

        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : func,
                    "args" : JSON.stringify(req_args),
                }
            },
            "method": "neb_sendTransaction"
        }, "*");
    },
    addDepartments:function(){
        var hospitalId=$("#select-hospitalList").val();
        if(!hospitalId||hospitalId == ""){
            var notify= notifyMsg("所有字段都不能为空！");
            return;
        }
        var departments=[];
        var objs=$("#form_4c .departmentDiv");
        if(objs&&objs.length>0){
            for(var i=0;i<objs.length;i++){
                var obj=$("#form_4c .departmentDiv")[i];
                var name=$(obj).find("input[name='departmentName']").val();
                var description = $(obj).find("textarea[name='departmentDesc']").val();
                if(name&&name!=""&&description&&description != ""){
                    var dep={
                        "name":name,
                        "description":description,
                    };
                    departments.push(dep);
                }
            }
        }
        
        if(departments.length==0){
            var notify= notifyMsg("至少添加一个科室，字段不能为空");
            return;
        }
        // 提交
        var func = "add_departments_to_list";
        var req_arg_item = {
            "hospitalId": hospitalId,
            "departments": departments,
        };
        var req_args = [];
        req_args.push(req_arg_item);

        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : func,
                    "args" : JSON.stringify(req_args),
                }
            },
            "method": "neb_sendTransaction"
        }, "*");
    },
    listenWindowMessage: function() {
        var self = this;
        window.addEventListener('message', function(e) {
            // e.detail contains the transferred data
            if(e.data && e.data.data && e.data.data.neb_sendTransaction) {
                // 收到返回数据
                if(e.data.data.neb_sendTransaction.result) {
                    // 解析数据
                    var obj = JSON.parse(e.data.data.neb_sendTransaction.result);
                    console.log(obj);
                    if(obj.success==true){
                        // if(obj.type=="city"){
                        //     self.initCityList();
                        // }
                    }else{
                        alert(obj.message);
                    }
                } else {
                    console.log("Get Data From Constract Faield");
                }
            }else if(e.data && e.data.data && e.data.data.neb_call) {
                // 收到返回数据
                if(e.data.data.neb_call.result) {
                    // 解析数据
                    var obj = JSON.parse(e.data.data.neb_call.result);
                    if (obj.type == "city_list") {
                        self.parseCityList(obj);
                    } else if (obj.type == "hospital_list") {
                        self.parseHospitalList(obj);
                    } else if(obj.type == "admin_info") {
                        self.parseAdminInfo(obj);
                    } else if (obj.type == "super_admin_info") {
                        self.parseSuperAdminInfo(obj);
                    }
                    else {
                        console.log("no need attation");
                    }
                    console.log(obj);
                } else {
                    console.log("Get Data From Constract Faield");
                }
            }
        });
    },
    getNowFormatDate: function() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    },
    parseCityList:function(list){

        $("#input_main_loading").hide();
        $("#input_main").show();  

        $("#select-cityList_3c").empty();
        $("#select-cityList_4c").empty();
        if (list.data.length == 0) {
        } else {
            // 显示内容
            var citys = template(document.getElementById('city_list_t').innerHTML);
            var citys_html = citys({list: list.data});
            $("#select-cityList_3c").append(citys_html);
            $("#select-cityList_4c").append(citys_html);
            this.initHospitalListByCity($("#select-cityList_4c").val());
        }
    },
    parseHospitalList:function(list){
        var self = this;
        $("#select-hospitalList").empty();
        self.hideLoading();
        
        if (list.data.length == 0) {
        } else {
            // 显示内容
            var hospitals = template(document.getElementById('hospital_list_t').innerHTML);
            var hospitals_html = hospitals({list: list.data});
            $("#select-hospitalList").append(hospitals_html);
        }
    },

    initInputCityPage: function() {
        var req_args = [];
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : "is_my_admin",
                    "args" : JSON.stringify(req_args)
                }
            },
            "method": "neb_call"
        }, "*");
    },

    initInputAdminPage: function() {
        var req_args = [];
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : "is_my_super_admin",
                    "args" : JSON.stringify(req_args)
                }
            },
            "method": "neb_call"
        }, "*");
    },

    parseAdminInfo: function(obj) {
        var self = this;
        if (obj && obj.success == true) {
            $("#input-cityNames").attr("disabled", false);
            $("#submit_1c").attr("disabled", false);
            $("#submit_3c").attr("disabled", false);
            $("#submit_4c").attr("disabled", false);
        } else {
            $("#input-cityNames").attr("disabled", true);
            $("#submit_1c").attr("disabled", true);
            $("#submit_3c").attr("disabled", true);
            $("#submit_4c").attr("disabled", true);
        }
    },

    parseSuperAdminInfo: function(obj) {
        var self = this;
        if (obj && obj.success == true) {
            $("#input-admin").attr("disabled", false);
            $("#submit_2c").attr("disabled", false);
        } else {
            $("#input-admin").attr("disabled", true);
            $("#submit_2c").attr("disabled", true);
        }
    }
}

var inputDataObj;

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
    inputDataObj = new InputData();
    inputDataObj.init();
    inputDataObj.listenWindowMessage();
}



function initPage() {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("web page loaded...");
        $("#movie_input_warning").hide();
        setTimeout(checkNebpay,1000);
    });
}

function notifyMsg(msg){
   var notify =  $.notify({
        // options
        icon: 'glyphicon glyphicon-warning-sign',
        title: '警告',
        message: msg,
        target: '_blank'
    },{
        // settings
        element: 'body',
        position: null,
        type: "warning",
        allow_dismiss: true,
        newest_on_top: true,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "center"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        timer: 1000,
        url_target: '_blank'
    });

   return notify;
}
initPage();
function addDepartment_3c(){
    var html=$("#template_department .departmentDiv").prop("outerHTML");
    var addHtml=$("#form_3c .addDiv").prop("outerHTML");
    $("#form_3c .addDiv").remove();
    $("#form_3c").append(html).append(addHtml);
}
function addDepartment_4c(){
    var html=$("#template_department .departmentDiv").prop("outerHTML");
    var addHtml=$("#form_4c .addDiv").prop("outerHTML");
    $("#form_4c .addDiv").remove();
    $("#form_4c").append(html).append(addHtml);
}
function delDepartment(obj){
    $(obj).parents(".departmentDiv").remove();
}
function changeCity(){
    inputDataObj.initHospitalListByCity($("#select-cityList_4c").val());
}

function selectPage(index){
    // if (index == 1) {
    //     inputDataObj.initInputCityPage();
    //     return;
    // }
    // if (index == 2) {
    //     inputDataObj.initInputAdminPage();
    // }
    if (index == 3 || index == 4) {
        // inputDataObj.initInputCityPage();
        inputDataObj.initCityList();
        return;
    }
}
