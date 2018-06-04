

'use strict';

var dappAddress = "n1hkd43zSDd33d9sCXrUoAH2ATjYC4eAndM";

var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
var nebPay = new NebPay();


var DepartmentsShow = function() {
    this.hospital_and_dep_loaded = false;
};
var commentPageSize=5;
var bannerPageSize=3;
DepartmentsShow.prototype = {

    init: function() {
        var self = this;
        var hospitalId=UrlParm.parm("hospitalId");  
        self.initHospitalInfo(hospitalId); 
        self.initDepartmentList(hospitalId);
    },
    initHospitalInfo:function(hospitalId){
        var req_args = [];
        req_args.push(hospitalId);
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : "query_hospital_by_key",
                    "args" : JSON.stringify(req_args)
                }
            },
            "method": "neb_call"
        }, "*");
    },
    initDepartmentList:function(hospitalId){
        var req_args = [];
        req_args.push(hospitalId);
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : "query_department_by_hospital",
                    "args" : JSON.stringify(req_args)
                }
            },
            "method": "neb_call"
        }, "*");
    },
    getCommentSumByDepartmentId:function(departmentId){
        var req_args = [];
        req_args.push(departmentId);
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : "query_commentSum_by_departmentId",
                    "args" : JSON.stringify(req_args)
                }
            },
            "method": "neb_call"
        }, "*");

    },
    getCommentByDepartmentId:function(departmentId,page){
        var req_args = [];
        req_args.push(departmentId);
        req_args.push(page);
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : "query_commentItem_list_by_departmentId",
                    "args" : JSON.stringify(req_args)
                }
            },
            "method": "neb_call"
        }, "*");
    },
    getBannerSumByDepartmentId:function(departmentId){
        var req_args = [];
        req_args.push(departmentId);
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : "query_bannerSum_by_departmentId",
                    "args" : JSON.stringify(req_args)
                }
            },
            "method": "neb_call"
        }, "*");

    },
    getBannerByDepartmentId:function(departmentId,page){
        var req_args = [];
        req_args.push(departmentId);
        req_args.push(page);
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : "query_bannerItem_list_by_departmentId",
                    "args" : JSON.stringify(req_args)
                }
            },
            "method": "neb_call"
        }, "*");
    },
    addGoodItem:function(departmentId){
        if(departmentId == ""){
            var notify= notifyMsg("点赞失败！");
            return;
        }
        // 提交
        var func = "add_goodItem_to_list";
        var req_arg_item = {
            "departmentId": departmentId,
        };
        var req_args = [];
        req_args.push(req_arg_item);

        // window.postMessage({
        //     "target": "contentscript",
        //     "data":{
        //         "to" : dappAddress,
        //         "value" : "0",
        //         "contract" : {
        //             "function" : func,
        //             "args" : JSON.stringify(req_args),
        //         }
        //     },
        //     "method": "neb_sendTransaction"
        // }, "*");
        nebPay.call(dappAddress, 0, "add_goodItem_to_list", JSON.stringify(req_args), {    //使用nebpay的call接口去调用合约,
            listener: function(txtHash) {
                window.setTimeout(function() {
                    var cur_num = parseInt($("#good_" + departmentId).find("span").text());
                    cur_num = cur_num + 1;
                    $("#good_" + departmentId).find("span").text(cur_num)
                }, 10000);
            },
        });
    },
    addBadItem:function(departmentId){
        if(departmentId == ""){
            var notify= notifyMsg("点踩失败！");
            return;
        }
        // 提交
        var func = "add_badItem_to_list";
        var req_arg_item = {
            "departmentId": departmentId,
        };
        var req_args = [];
        req_args.push(req_arg_item);

        // window.postMessage({
        //     "target": "contentscript",
        //     "data":{
        //         "to" : dappAddress,
        //         "value" : "0",
        //         "contract" : {
        //             "function" : func,
        //             "args" : JSON.stringify(req_args),
        //         }
        //     },
        //     "method": "neb_sendTransaction"
        // }, "*");

        nebPay.call(dappAddress, 0, "add_badItem_to_list", JSON.stringify(req_args), {    //使用nebpay的call接口去调用合约,
            listener: function(txtHash) {
                window.setTimeout(function() {
                    var cur_num = parseInt($("#bad_" + departmentId).find("span").text());
                    cur_num = cur_num + 1;
                    $("#bad_" + departmentId).find("span").text(cur_num)
                }, 10000);
            },
        });
    },
    addCommentItem:function(departmentId){
        if(departmentId == ""){
            var notify= notifyMsg("评论失败！");
            return;
        }
        var username=$("#commentOf"+departmentId).find("input[name='username']").val();
        var score=$("#commentOf"+departmentId).find("select[name='score']").val();
        var content=$("#commentOf"+departmentId).find("textarea[name='content']").val();
        var commentTime = this.getNowFormatDate();
        // 提交
        var func = "add_commentItem_to_list";
        var req_arg_item = {
            "departmentId": departmentId,
            "commentName":username,
            "commentTime": commentTime,
            "content":content,
            "score":score,
        };
        var req_args = [];
        req_args.push(req_arg_item);

        // window.postMessage({
        //     "target": "contentscript",
        //     "data":{
        //         "to" : dappAddress,
        //         "value" : "0",
        //         "contract" : {
        //             "function" : func,
        //             "args" : JSON.stringify(req_args),
        //         }
        //     },
        //     "method": "neb_sendTransaction"
        // }, "*");

        nebPay.call(dappAddress, 0, "add_commentItem_to_list", JSON.stringify(req_args), {    //使用nebpay的call接口去调用合约,
            listener: function(txtHash) {
                window.setTimeout(function() {
                    var cur_num = parseInt($("#comment_" + departmentId).find("span").text());
                    cur_num = cur_num + 1;
                    $("#comment_" + departmentId).find("span").text(cur_num);

                    var temp_show = {
                        commentName: username,
                        departmentId: departmentId,
                        content: content,
                        commentTime: commentTime,
                        score: score
                    };
                    var temp_list = [];
                    temp_list.push(temp_show);

                    var comments = template(document.getElementById('comment_list_t').innerHTML);
                    var comments_html = comments({list: temp_list});
                    $("#comment_list_" + departmentId).prepend(comments_html);
                }, 10000);
            },
        });
    },

    addBannerItem:function(departmentId){
        var self = this;
        if(departmentId == ""){
            var notify= notifyMsg("赠送锦旗失败！");
            return;
        }
        var userObj = $("#bannerOf"+departmentId).find("input[name='username']");
        var username=userObj.val();
        var titleObj = $("#bannerOf"+departmentId).find("input[name='title']");
        var title= titleObj.val();
        var imgBase64 = $("#imgshow_" + departmentId).attr("src");

        // 判空
        if (username == "") {
            userObj.focus();
            self.showMessage('请填写昵称');
            // 弹框
            return;
        }
        if (title == "") {
            titleObj.focus();
            self.showMessage('请填写锦旗标题');
            // 弹框
            return;
        }

        if (imgBase64 != "" && imgBase64 != "images/upimg.png") {
             var length = imgBase64.replace(/[^\u0000-\u00ff]/g,"aaa").length;
             console.log(length);
             if (length > 112400) {
                $("imgshow_" + departmentId).focus();
                 self.showMessage('抱歉，暂时不支持大图片，请选择小图片(base64编码大小需小于128K)"');
                 // 弹框
                 return;
             }
        }
        if (imgBase64 == "images/upimg.png") {
            $("imgshow_" + departmentId).focus();
            self.showMessage('请上传图片');
            // 弹框
            return;
        }
        var sendTime = this.getNowFormatDate();
        // 提交
        var func = "add_bannerItem_to_list";
        var req_arg_item = {
            "departmentId": departmentId,
            "username":username,
            "sendTime":sendTime,
            "title":title,
            "imgBase64":imgBase64,
        };
        var req_args = [];
        req_args.push(req_arg_item);

        // window.postMessage({
        //     "target": "contentscript",
        //     "data":{
        //         "to" : dappAddress,
        //         "value" : "0",
        //         "contract" : {
        //             "function" : func,
        //             "args" : JSON.stringify(req_args),
        //         }
        //     },
        //     "method": "neb_sendTransaction"
        // }, "*");

        nebPay.call(dappAddress, 0, "add_bannerItem_to_list", JSON.stringify(req_args), {    //使用nebpay的call接口去调用合约,
            listener: function(txtHash) {
                window.setTimeout(function() {
                    var cur_num = parseInt($("#banner_" + departmentId).find("span").text());
                    cur_num = cur_num + 1;
                    $("#banner_" + departmentId).find("span").text(cur_num);

                    var temp_show = {
                        username: username,
                        departmentId: departmentId,
                        title: title,
                        imgBase64: imgBase64,
                        sendTime: sendTime
                    };
                    var temp_list = [];
                    temp_list.push(temp_show);

                    var banners = template(document.getElementById('banner_list_t').innerHTML);
                    var banners_html = banners({list: temp_list});
                    $("#banner_list_"+ departmentId).prepend(banners_html);
                }, 10000);
            },
        });

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
                    if (obj.type == "department_list") {
                        self.parseDepartmentList(obj);
                    } else if (obj.type == "hospital_info") {
                        self.parseHospitalInfo(obj);
                    } else if(obj.type== "query_commentSum_by_departmentId"){
                        self.parseCommentSum(obj);
                    } else if(obj.type== "query_commentItem_list_by_departmentId"){
                        self.parseCommentList(obj);
                    } else if(obj.type== "query_bannerItem_list_by_departmentId"){
                        self.parseBannerList(obj);
                    } else if(obj.type== "query_bannerSum_by_departmentId"){
                        self.parseBannerSum(obj);
                    } else {
                        console.log("no need attation");
                    }
                    console.log(obj);
                } else {
                    console.log("Get query Data From Constract Faield");
                }
            }else if(e.data && e.data.data && e.data.data.neb_sendTransaction) {
                // 收到返回数据
                if(e.data.data.neb_sendTransaction.result) {
                    // 解析数据
                    var obj = JSON.parse(e.data.data.neb_sendTransaction.result);
                    console.log(e.data.data.neb_sendTransaction.result);
                    if(obj.success==true){
                        if(obj.type=="add_badItem_to_list"){
                        }else if(obj.type=="add_goodItem_to_list"){
                        }else if(obj.type=="add_commentItem_to_list"){
                        }else if(obj.type=="add_bannerItem_to_list"){
                            self.updateBannerCount(obj);
                        }
                    }else{
                        alert(obj.message);
                    }
                } else {
                    console.log("Get update Data From Constract Faield");
                }
            }
        });
    },

    parseHospitalInfo: function(obj) {
        var self = this;
        if (self.hospital_and_dep_loaded == true) {
            $("#detail_loading").hide();
            $("#detail_main").show();
            self.hospital_and_dep_loaded = false;
        } else {
            self.hospital_and_dep_loaded = true;
        }
        
        $("#hospitalName_span").text(obj.hospital.name);
        $("#hospitalType_span").text(obj.hospital.type);
        $("#hospitalLevel_span").text(obj.hospital.level);
        $("#economicType_span").text(obj.hospital.economicType);
        $("#hospitalLocation_span").text(obj.hospital.location);
        $("#hospitalDesc_span").text(obj.hospital.description);
        $("#hospital_li").text(obj.hospital.name);
        
    },
    parseDepartmentList:function(list){
        var self = this;
        if (self.hospital_and_dep_loaded == true) {
            $("#detail_loading").hide();
            $("#detail_main").show();
            self.hospital_and_dep_loaded = false;
        } else {
            self.hospital_and_dep_loaded = true;
        }
        
        $("#department_list_div .department_item_div").remove();
        if (list.data.length == 0) {
            $("#department_warning").show();
        } else {
            $("#department_warning").hide();
            // 显示内容
            var departments = template(document.getElementById('department_list_t').innerHTML);
            var departments_html = departments({list: list.data});
            $("#department_list_div").append(departments_html);
        }
    },

    parseCommentSum:function(obj){
        var paginationObj = new Pagination(obj.departmentId,"comment",commentPageSize);
        paginationObj.init(obj.sum);
        paginationObj.showPagination(); 
    },
    parseCommentList:function(list){
        $("#comment_loading_" + list.departmentId).hide();
        $("#comment_list_"+list.departmentId).show();
        $("#comment_list_"+list.departmentId).find('.commentItemDiv').remove();
        if (list.data.length == 0) {
            $("#comment_list_"+list.departmentId).append($("#comment_warning").html());
            $("#pagination_comment_"+list.departmentId).hide();
        } else {
            // 显示内容
            var comments = template(document.getElementById('comment_list_t').innerHTML);
            var comments_html = comments({list: list.data});
            $("#comment_list_"+list.departmentId).append(comments_html);
            $("#pagination_comment_"+list.departmentId).show();
        }
        
    },
    parseBannerList:function(list){
        $("#banner_list_loading_" + list.departmentId).hide();
        $("#banner_list_"+list.departmentId).show();
        $("#banner_list_"+list.departmentId).find('.bannerItemDiv').remove();
        if (list.data.length == 0) {
            $("#banner_list_"+list.departmentId).append($("#banner_warning").html());
            $("#pagination_banner_"+list.departmentId).hide();
        } else {
            // 显示内容
            var banners = template(document.getElementById('banner_list_t').innerHTML);
            var banners_html = banners({list: list.data});
            $("#banner_list_"+list.departmentId).append(banners_html);
            $("#pagination_banner_"+list.departmentId).show();
        }
        
    },
    parseBannerSum:function(obj){
        var paginationObj = new Pagination(obj.departmentId,"banner",bannerPageSize);
        paginationObj.init(obj.sum);
        paginationObj.showPagination(); 
    },
    updateBannerCount:function(obj){
       $("#departmentOf"+obj.departmentId).find(".bannerCount").text(obj.bannerCount); 
       $("#departmentOf"+obj.departmentId).find(".scoreCount").text(obj.scoreCount); 
       $("#bannerOf"+obj.departmentId).find("input[name='username']").val(""); 
       $("#bannerOf"+obj.departmentId).find("input[name='title']").val("");
       this.getBannerSumByDepartmentId(obj.departmentId);
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
    
    showMessage:function (message){
		layer.open({
			content: message,
			skin: 'msg',
			time: 2
		});
    },

}

var departmentObj=new DepartmentsShow();

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
    departmentObj = new DepartmentsShow();
    departmentObj.listenWindowMessage();
    departmentObj.init();
    
}



function initPage() {
    document.addEventListener("DOMContentLoaded", function() {
        $("#detail_main").hide();
        $("#detail_loading").show();
        console.log("web page loaded...");
        setTimeout(checkNebpay,1000);
    });
}
initPage();

/*点击事件*/

function goodClick(id){
    departmentObj.addGoodItem(id);
}
function badClick(id){
    departmentObj.addBadItem(id);
}
function commentClick(id){
    var o=$("#commentOf"+id);
    if($(o).is(":hidden")){
        $("#departmentOf"+id).find(".showOrHide").hide();
        $(o).show();
        //加载评论列表
        $("#comment_list_"+ id).hide();
        $("#comment_loading_" + id).show();
        
        
        departmentObj.getCommentSumByDepartmentId(id);
        //departmentObj.getCommentByDepartmentId(id,{"pageSize":5,"pageNum":1});
    }else{
        $(o).hide();
    }
    
}
function commitComment(id){
    departmentObj.addCommentItem(id);
}

function commitBanner(id){
    departmentObj.addBannerItem(id);
}
function bannerClick(id){
    var o=$("#bannerOf"+id);
    if($(o).is(":hidden")){
        $("#departmentOf"+id).find(".showOrHide").hide();
        $(o).show();
        //加载锦旗列表
        $("#banner_list_" + id).hide();
        $("#banner_list_loading_" + id).show();
        
        departmentObj.getBannerSumByDepartmentId(id);
        //departmentObj.getBannerByDepartmentId(id,{"pageSize":2,"pageNum":1});
    }else{
        $(o).hide();
    }
}
function close(obj){
    $(obj).removeClass("open");
}

//分页
var SHOW_NUM_PER_PAGE = 2;

var Pagination = function(departmentId,type,page_size) {
    this.list_index = [];
    this.page_size = page_size;
    this.showGoInput = true;
    this.showGoButton = true;
    this.departmentId = departmentId;
    this.type=type;
};
Pagination.prototype = {
    // 初始化
    init: function(totalNum) {
        this.list_index=[];
        for(var i = 1; i <= totalNum; i++) {
            this.list_index.push(i);
        }
    },

    // 显示分页插件
    showPagination: function() {
        var self = this;
        $('#pagination_'+this.type+"_"+self.departmentId).pagination({
            dataSource: this.list_index,
            pageSize: this.page_size,
            showGoInput: true,
            showGoButton: true,
            callback: function(data, pagination) {
                var click_page_num = pagination.pageNumber;
                var list_offset = data[0];
                self.onChoosePageEvent(click_page_num, list_offset);
            }
        });
    },

    // 选择页事件
    onChoosePageEvent: function(click_page_num, list_offset) {
        console.log("click_page_num = " + click_page_num + "; list_offset=" + list_offset);
        var page={
            "pageSize":this.page_size,
            "pageNum":click_page_num
        };
        if(this.type=="banner"){
            $("#banner_list_" + this.departmentId).hide();
            $("#banner_list_loading_" + this.departmentId).show();
            departmentObj.getBannerByDepartmentId(this.departmentId,page);
        }else if(this.type=="comment"){
            $("#comment_list_"+ this.departmentId).hide();
            $("#comment_loading_" + this.departmentId).show();
            departmentObj.getCommentByDepartmentId(this.departmentId,page);
        }
    },
}

