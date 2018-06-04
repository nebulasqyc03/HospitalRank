"use strict";
var superAdmin="superAdmin";
/**
*城市实体
*/
var CityItem = function(text) {
	if (text) {
        var obj = JSON.parse(text);
        this.id = obj.id;
        this.name = obj.name;
        this.from = obj.from;
	} else {
        this.id="";
        this.name = "";
        this.from = "";
	}
};

CityItem.prototype = {
    toString: function() {
        return JSON.stringify(this);
    }
};
/**
*用户实体
*/
var AdminItem = function(text) {
    if (text) {
        var obj = JSON.parse(text);
        this.name = obj.name;
    } else {
        this.name = "";
    }
};

AdminItem.prototype = {
    toString: function() {
        return JSON.stringify(this);
    }
};
/**
*医院实体
*id、医院名称、医院等级、医院类型、经济类型、医院地址、医院简介、所属城市id，创建人标识
*/
var HospitalItem = function(text) {
    if (text) {
        var obj = JSON.parse(text);
        this.id = obj.id;
        this.name = obj.name;
        this.level = obj.level;
        this.type = obj.type;
        this.economicType = obj.economicType;
        this.location = obj.location;
        this.description = obj.description;
        this.cityId = obj.cityId;
        this.creator = obj.creator;
    } else {
        this.id = "";
        this.name = obj.name;
        this.level = obj.level;
        this.type = obj.type;
        this.economicType = obj.economicType;
        this.location = obj.location;
        this.description = obj.description;
        this.cityId = obj.cityId;
        this.creator = obj.creator;
    }
};
/**
*医院实体
*id、医院名称、医院等级、医院类型、经济类型、医院地址、医院简介、所属城市id，创建人标识
*/
var HospitalItem = function(text) {
    if (text) {
        var obj = JSON.parse(text);
        this.id = obj.id;
        this.name = obj.name;
        this.level = obj.level;
        this.type = obj.type;
        this.economicType = obj.economicType;
        this.location = obj.location;
        this.description = obj.description;
        this.cityId = obj.cityId;
        this.creator = obj.creator;
    } else {
        this.id = "";
        this.name = "";
        this.level = "";
        this.type = "";
        this.economicType = "";
        this.location = "";
        this.description = "";
        this.cityId = "";
        this.creator = "";
    }
};


HospitalItem.prototype = {
    toString: function() {
        return JSON.stringify(this);
    }
};

//id、科室名称、科室简介，所属医院id，创建人标识，点赞总数、点踩总数、评论总数，获得锦旗总数、口碑评分总数
var DepartmentItem = function(text) {
    if (text) {
        var obj = JSON.parse(text);
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.hospitalId = obj.hospitalId;
        this.creator = obj.creator;
        this.goodCount = obj.goodCount;
        this.badCount = obj.badCount;
        this.commentCount = obj.commentCount;
        this.bannerCount = obj.bannerCount;
        this.scoreCount = obj.scoreCount;
    } else {
        this.id = "";
        this.name = "";
        this.description = "";
        this.hospitalId = "";
        this.creator = "";
        this.goodCount = 0;
        this.badCount = 0;
        this.commentCount = 0;
        this.bannerCount = 0;
        this.scoreCount = 0;
    }
};

var GoodItem = function(text) {//点赞记录信息
    if (text) {
        var obj = JSON.parse(text);
        this.id = obj.id;//id=from+'_'+时间戳
        this.departmentId = obj.departmentId;
        this.recordTime = obj.recordTime;
        this.from = obj.from;
    } else {
        this.id = "";
        this.departmentId = "";
        this.recordTime = "";
        this.from = "";
    }
};
var BadItem = function(text) {//嘘Ta记录信息
    if (text) {
        var obj = JSON.parse(text);
        this.id = obj.id;//id=from+'_'+时间戳
        this.departmentId = obj.departmentId;
        this.recordTime = obj.recordTime;
        this.from = obj.from;
    } else {
        this.id = "";
        this.departmentId = "";
        this.recordTime = "";
        this.from = "";
    }
};
//id、所属科室id，评论内容、评论人姓名、评论人标识、评论时间、评分（-3至3分，共7个口碑评分可选）
var CommentItem = function(text) {
    if (text) {
        var obj = JSON.parse(text);
        this.id = obj.id;//id=from+'_'+时间戳
        this.departmentId = obj.departmentId;
        this.content = obj.content;
        this.commentName = obj.commentName;
        this.commentTime = obj.commentTime;
        this.from = obj.from;
        this.score = obj.score;
    } else {
        this.id = "";
        this.departmentId = "";
        this.content = "";
        this.commentName = "";
        this.commentTime = "";
        this.from = "";
        this.score = 0;
    }
};
var BannerItem = function(text){
    if (text) {
        var obj = JSON.parse(text);
        this.id = obj.id;//id=from+'_'+时间戳
        this.departmentId = obj.departmentId;
        this.title = obj.title;
        this.username = obj.username;
        this.imgBase64 = obj.imgBase64;
        this.sendTime = obj.sendTime;
        this.from = obj.from;
    } else {
        this.id = "";
        this.departmentId = "";
        this.title = "";
        this.username = "";
        this.imgBase64 = "";
        this.from = "";
        this.sendTime = "";
    }
};
DepartmentItem.prototype = {
    toString: function() {
        return JSON.stringify(this);
    }
};
GoodItem.prototype = {
    toString: function() {
        return JSON.stringify(this);
    }
};
BadItem.prototype = {
    toString: function() {
        return JSON.stringify(this);
    }
};
CommentItem.prototype = {
    toString: function() {
        return JSON.stringify(this);
    }
};
BannerItem.prototype = {
    toString: function() {
        return JSON.stringify(this);
    }
};
var DataSys = function() {
    // 1. 先创建GoldSunStorage对象（用于存储数据）
    var goldApi = new GoldSunStorage(null);
    // 2. 定义数据结构，该行代码作用：为ApiSample创建一个属性sample_data，该属性是一个list结构，list中存储的是SampleDataItem对象
    //城市列表
    goldApi.defineMapProperty(this, "city_list", {
        parse: function (text) {
            return new CityItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
    goldApi.defineProperty(this, "city_list_size");
    // 定义一个存储string的list
    goldApi.defineMapProperty(this, "city_list_array");

    //管理员
    goldApi.defineMapProperty(this, "admin_list", {
        parse: function (text) {
            return new CityItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
    goldApi.defineProperty(this, "admin_list_size");
    // 定义一个存储string的list
    goldApi.defineMapProperty(this, "admin_list_array");

    //医院
    goldApi.defineMapProperty(this, "hospital_list", {
        parse: function (text) {
            return new HospitalItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
    goldApi.defineProperty(this, "hospital_list_size");
    // 定义一个存储string的list
    goldApi.defineMapProperty(this, "hospital_list_array");

    //科室
    goldApi.defineMapProperty(this, "department_list", {
        parse: function (text) {
            return new DepartmentItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
    goldApi.defineProperty(this, "department_list_size");
    // 定义一个存储string的list
    goldApi.defineMapProperty(this, "department_list_array");

    //评论列表
    goldApi.defineMapProperty(this, "commentItem_list", {
        parse: function (text) {
            return new CommentItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
    // 定义一个参数，记录commentItem_list的长度
    goldApi.defineProperty(this, "commentItem_list_size");
    // 定义一个存储string的list
    goldApi.defineMapProperty(this, "commentItem_list_array");
    //点赞列表
    goldApi.defineMapProperty(this, "goodItem_list", {
        parse: function (text) {
            return new GoodItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
    // 定义一个参数，记录goodItem_list的长度
    goldApi.defineProperty(this, "goodItem_list_size");
    // 定义一个存储string的list
    goldApi.defineMapProperty(this, "goodItem_list_array");
    //嘘Ta列表
    goldApi.defineMapProperty(this, "badItem_list", {
        parse: function (text) {
            return new BadItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
    // 定义一个参数，记录badItem_list的长度
    goldApi.defineProperty(this, "badItem_list_size");
    // 定义一个存储string的list
    goldApi.defineMapProperty(this, "badItem_list_array");

    //送锦旗列表
    goldApi.defineMapProperty(this, "bannerItem_list", {
        parse: function (text) {
            return new BannerItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
    // 定义一个参数，记录badItem_list的长度
    goldApi.defineProperty(this, "bannerItem_list_size");
    // 定义一个存储string的list
    goldApi.defineMapProperty(this, "bannerItem_list_array");
    // 3. 经过1和2步，数据结构定义完成，下面需要实现接口方法，所有的数据都存放在sample_data中
}
DataSys.prototype = {
    // 初始化方法，在使用ApiSample之前，务必要调用一次(而且只能调用一次)，所有的初始化逻辑都放到这里
    init: function() {
        if (this.city_list_size == null) {
            this.city_list_size = 0;
        }
        if (this.admin_list_size == null) {
            this.admin_list_size = 0;
        }
        if (this.hospital_list_size == null) {
            this.hospital_list_size = 0;
        }
        if (this.department_list_size == null) {
            this.department_list_size = 0;
        }
        if (this.goodItem_list_size == null) {
            this.goodItem_list_size = 0;
        }
        if (this.badItem_list_size == null) {
            this.badItem_list_size = 0;
        }
        if (this.commentItem_list_size == null) {
            this.commentItem_list_size = 0;
        }
        if (this.bannerItem_list_size == null) {
            this.bannerItem_list_size = 0;
        }
    },
    // 添加一个对象到list中的例子
    add_citys_to_list: function(text) {
        var addResult = {
            success : false,
            message : "",
            type:"city",
        };

        var obj = text;  //JSON.parse(text);
        obj.cityNames =  obj.cityNames.trim();
        obj.from = obj.from.trim();
        if(obj.cityNames===""|| obj.from===""){
            addResult.success = false;
            addResult.message = "empty names / from";
            return addResult;
        }
        if(obj.from!=superAdmin){
            var r=this.query_admin_by_name(obj.from);
            if(r.success!=true){
                addResult.success = false;
                addResult.message = "you are not admin";
                return addResult;
            }
        }
        var cityNames=obj.cityNames;
        var names=[];
        names=cityNames.split(",");
        for(var i=0;i<names.length;i++){
            if(names[i]==""){
                continue;
            }
            var result = this.query_city_by_name(names[i]);
            if(result.success==true){
                continue;
            }
            var city = new CityItem();
            city.name = names[i];
            city.from = obj.from;
            city.id=obj.from+guid();

            var index = this.city_list_size;
            this.city_list_array.put(index,city.id);
            this.city_list.put(city.id, city);
            this.city_list_size +=1;
            
        }
        addResult.success = true;
        addResult.message = "You successfully added citys!";
        return addResult;
        
    },
    city_list_size : function(){
        return this.city_list_size;
    },
    // 从list中查找对象的例子
    query_city_by_name: function(name) {
        var result = {
            success : false,
            type:"city_info",
            city : ""
        };
        name = name.trim();
        if ( name === "" ) {
            result.success = false;
            result.city = "";
            return result;
        }
        var key;
        var city;
        for(var i=0;i<this.city_list_size;i++){
            key = this.city_list_array.get(i);
            city = this.city_list.get(key);
            if(city.name==name){
                result.success = true;
                result.city = city;
                break;
            }
        }
        return result;
    },
    query_all_city : function(){
        var result = {
            success : false,
            type:"city_list",
            data : []
        };
        var number = this.city_list_size;
        var key;
        var city;
        for(var i=0;i<number;i++){
            key = this.city_list_array.get(i);
            city = this.city_list.get(key);
            result.data.push(city);
        }
        if(result.data === ""){
            result.success = false;
        }else{
            result.success = true;
        }
        return result;
    },

    //admin
    // 添加一个对象到list中的例子
    add_admins_to_list: function(text) {
        var addResult = {
            success : false,
            message : "",
            type:"admin",
        };

        var obj = text;  //JSON.parse(text);
        obj.admins =  obj.admins.trim();
        if(obj.admins===""){
            addResult.success = false;
            addResult.message = "empty names";
            return addResult;
        }
        if(obj.from!=superAdmin){
            addResult.success = false;
            addResult.message = "you are not superAdmin";
            return addResult;
        }
        var admins=obj.admins;
        var names=[];
        names=admins.split(",");
        for(var i=0;i<names.length;i++){
            if(names[i]==""){
                continue;
            }
            var result = this.query_admin_by_name(names[i]);
            if(result.success==true){
                continue;
            }
            var admin = new AdminItem();
            admin.name = names[i];

            var index = this.admin_list_size;
            this.admin_list_array.put(index,admin.name);
            this.admin_list.put(admin.name, admin);
            this.admin_list_size +=1;
            
        }
        addResult.success = true;
        addResult.message = "You successfully added admins!";
        return addResult;
        
    },

    admin_list_size : function(){
        return this.admin_list_size;
    },
    // 从list中查找对象的例子
    query_admin_by_name: function(key) {
        var result = {
            success : false,
            type:"admin_info",
            admin : ""
        };
        key = key.trim();
        if ( key === "" ) {
            result.success = false;
            result.admin = "";
            return result;
        }
        var admin = this.admin_list.get(key);
        if(admin){
            result.success = true;
            result.admin = admin;
        }else{
            result.success = false;
            result.admin = "";
        }
        return result;
    },
    //hospital
    add_hospital_to_list:function(text){
        var addResult = {
            success : false,
            message : "",
            type:"hospital",
        };

        var obj = text;  //JSON.parse(text);
        obj.cityId=obj.cityId.trim();
        obj.hospitalName=obj.hospitalName.trim();
        obj.hospitalLevel=obj.hospitalLevel.trim();
        obj.hospitalType=obj.hospitalType.trim();
        obj.economicType=obj.economicType.trim();
        obj.hospitalLocation=obj.hospitalLocation.trim();
        obj.hospitalDesc=obj.hospitalDesc.trim();
        obj.from=obj.from.trim();
        if(obj.from!=superAdmin){
            var r=this.query_admin_by_name(obj.from);
            if(r.success!=true){
                addResult.success = false;
                addResult.message = "you are not admin";
                return addResult;
            }
        }
        if(obj.cityId==""||obj.hospitalName==""||obj.hospitalLevel==""||obj.economicType==""
            ||obj.hospitalLocation==""||obj.hospitalDesc==""||obj.from==""||obj.hospitalType==""){
            addResult.success = false;
            addResult.message = "empty cityId / hospitalName /hospitalLevel/economicType/hospitalType/hospitalDesc/hospitalLocation/from";
            return addResult;
        }

        var result = this.query_hospital_by_name(obj.hospitalName);
        if(result.success==true){
            addResult.success = false;
            addResult.message = "医院名称重复";
            return addResult;
        }
        var hospital = new HospitalItem();
        hospital.id = obj.from+guid();
        hospital.name = obj.hospitalName;
        hospital.level = obj.hospitalLevel;
        hospital.type = obj.hospitalType;
        hospital.economicType = obj.economicType;
        hospital.location = obj.hospitalLocation;
        hospital.description = obj.hospitalDesc;
        hospital.cityId = obj.cityId;
        hospital.creator = obj.from;

        var index = this.hospital_list_size;
        this.hospital_list_array.put(index,hospital.id);
        this.hospital_list.put(hospital.id, hospital);
        this.hospital_list_size +=1;

        var param={
            "hospitalId":hospital.id,
            "from":obj.from,
            "departments":obj.departments,
        };
        this.add_departments_to_list(param);
        //解析科室
        /*var departments=obj.departments;
        if(departments&&departments.length>0){
            for (var i = 0; i < departments.length; i++) {
                //判断是否冲突
                var key=hospital.id+departments[i].name;
                result = this.query_department_by_key(key);
                if(result.success){
                    continue;
                }
                //添加
                var dep = new DepartmentItem();
                dep.id = obj.from+guid();
                dep.name = departments[i].name;
                dep.description = departments[i].description;
                dep.HospitalId = hospital.id;
                dep.creator = obj.from;
                dep.goodCount = 0;
                dep.badCount = 0;
                dep.commentCount = 0;
                dep.bannerCount = 0;
                dep.scoreCount = 0;
                var depIndex = this.department_list_size;
                this.department_list_array.put(depIndex,key);
                this.department_list.put(key, dep);
                this.department_list_size +=1;
            }
        }*/
        
        addResult.success = true;
        addResult.message = "You successfully added hospital!";
        return addResult;
        
    },
    query_hospitalList_by_city:function(cityId){

    },
    query_hospital_by_city:function(cityId){
        var result = {
            success : false,
            type:"hospital_list",
            data : []
        };
        if(!cityId||cityId==""){
            return result;
        }
        var number = this.hospital_list_size;
        var key;
        var hospital;
        var hosMap={};
        var array=[];
        for(var i=0;i<number;i++){
            key = this.hospital_list_array.get(i);
            hospital = this.hospital_list.get(key);
            if(cityId==hospital.cityId){
                hospital["goodSum"]=0;
                hospital["badSum"]=0;
                hospital["commentSum"]=0;
                hospital["bannerSum"]=0;
                hospital["score"]=0;
                hospital["count"]=0;
                hospital["sumScore"]=0;
                hosMap[""+hospital.id]=hospital;
                array.push(hospital.id);
                //计算这个医院的评分
                /*var depCount=0;
                var sumScore=0;
                var depRes=this.query_department_by_hospital(hospital.id);
                if(depRes.success&&depRes.data.length>0){
                    for(var j=0;j<depRes.data.length;j++){
                        sumScore+=depRes.data[j].scoreCount;
                        depCount++;
                    }
                }
                if(depCount>0){
                    hospital["score"]=sumScore/depCount;
                }else{
                    hospital["score"]=0;
                }
                result.data.push(hospital);*/
            }
        }
        var depkey;
        var department;
        for(var i=0;i<this.department_list_size;i++){
            depkey = this.department_list_array.get(i);
            department = this.department_list.get(depkey);
            var hos=hosMap[department.hospitalId];
            if(hos){
                hos["goodSum"]=hos["goodSum"]+department.goodCount;
                hos["badSum"]=hos["badSum"]+department.badCount;
                hos["commentSum"]=hos["commentSum"]+department.commentCount;
                hos["bannerSum"]=hos["bannerSum"]+department.bannerCount;
                hos["count"]=hos["count"]+1;
                hos["sumScore"]=hos["sumScore"]+department.scoreCount;
                hos["score"]=hos["sumScore"];
            }
        }
        //遍历map成list
        for(var i=0;i<array.length;i++){
            result.data.push(hosMap[array[i]]);
        }
        if(result.data === ""){
            result.success = false;
        }else{
            result.success = true;
        }
        result.data=sortListDESC(result.data,"score");
        return result;
    },
    query_hospital_by_name:function(name){
        var result = {
            success : false,
            type:"hospital_info",
            hospital : ""
        };
        name = name.trim();
        if ( name === "" ) {
            result.success = false;
            result.hospital = "";
            return result;
        }
        var key;
        var hospital;
        for(var i=0;i<this.hospital_list_size;i++){
            key = this.hospital_list_array.get(i);
            hospital = this.hospital_list.get(key);
            if(hospital.name==name){
                result.success = true;
                result.hospital = hospital;
                break;
            }
        }
        return result;
    },
    query_hospital_by_key: function(key) {
        var result = {
            success : false,
            type:"hospital_info",
            hospital : ""
        };
        key = key.trim();
        if ( key === "" ) {
            result.success = false;
            result.hospital = "";
            return result;
        }
        var hospital = this.hospital_list.get(key);
        if(hospital){
            result.success = true;
            result.hospital = hospital;
        }else{
            result.success = false;
            result.hospital = "";
        }
        return result;
    },
    //department
    query_department_by_key: function(key) {
        var result = {
            success : false,
            type:"department_info",
            department : ""
        };
        key = key.trim();
        if ( key === "" ) {
            result.success = false;
            result.department = "";
            return result;
        }
        var department = this.department_list.get(key);
        if(department){
            result.success = true;
            result.department = department;
        }else{
            result.success = false;
            result.department = "";
        }
        return result;
    },
    query_department_by_name:function(hospitalId,name){
        var result = {
            success : false,
            type:"department_info",
            department : ""
        };
        name = name.trim();
        if ( name === "" ) {
            result.success = false;
            result.department = "";
            return result;
        }
        var key;
        var department;
        for(var i=0;i<this.department_list_size;i++){
            key = this.department_list_array.get(i);
            department = this.department_list.get(key);
            if(department.name==name&&department.hospitalId==hospitalId){
                result.success = true;
                result.department = department;
                break;
            }
        }
        return result;
    },
    add_departments_to_list:function(text){
        var addResult = {
            success : false,
            message : "",
            type:"hospital",
        };

        var obj = text;  //JSON.parse(text);
        if(obj.from!=superAdmin){
            var r=this.query_admin_by_name(obj.from);
            if(r.success!=true){
                addResult.success = false;
                addResult.message = "you are not admin";
                return addResult;
            }
        }
        //解析科室
        obj.hospitalId=obj.hospitalId.trim();
        if(obj.hospitalId==""){
            addResult.success = false;
            addResult.message = "请选择对应的医院";
            return addResult;
        }
        var departments=obj.departments;
        if(departments&&departments.length>0){
            for (var i = 0; i < departments.length; i++) {
                if(departments[i].name==""){
                    continue;
                }
                //判断是否冲突
                //var key=obj.hospitalId+departments[i].name;
                var result = this.query_department_by_name(obj.hospitalId,departments[i].name);
                if(result.success==true){
                    continue;
                }
                //添加
                var dep = new DepartmentItem();
                dep.id = obj.from+guid();
                dep.name = departments[i].name;
                dep.description = departments[i].description;
                dep.hospitalId = obj.hospitalId;
                dep.creator = obj.from;
                dep.goodCount = 0;
                dep.badCount = 0;
                dep.commentCount = 0;
                dep.bannerCount = 0;
                dep.scoreCount = 0;
                var depIndex = this.department_list_size;
                this.department_list_array.put(depIndex,dep.id);
                this.department_list.put(dep.id, dep);
                this.department_list_size +=1;
            }
        }else{
            addResult.success = false;
            addResult.message = "科室为空";
            return addResult;
        }
        
        addResult.success = true;
        addResult.message = "You successfully added hospital!";
        return addResult;
        
    },
    query_department_by_hospital:function(hospitalId){
        var result = {
            success : false,
            type:"department_list",
            data : []
        };
        var number = this.department_list_size;
        var key;
        var department;
        for(var i=0;i<number;i++){
            key = this.department_list_array.get(i);
            department = this.department_list.get(key);
            if(department.hospitalId==hospitalId){
                result.data.push(department);
            }
        }
        result.data=sortListDESC(result.data,"scoreCount");
        if(result.data === ""){
            result.success = false;
        }else{
            result.success = true;
        }
        return result;
    },
    //comment
    add_commentItem_to_list: function(text) {
        var addResult = {
            success : false,
            message : "",
            type : "add_commentItem_to_list",
            departmentId:"",
            commentCount:0,
            scoreCount:0,
        };
        var obj = text;
        obj.departmentId = obj.departmentId.trim();
        var result = this.query_department_by_key(obj.departmentId);
        if(result.success){
            obj.from = obj.from;
            var timestamp = new Date().getTime();//当前时间戳，精确到毫秒，如：1280977330748
            obj.id = obj.from + "_" + timestamp;//id=from+'_'+时间戳
            obj.content = obj.content.trim();
            obj.commentName = obj.commentName.trim();
            obj.commentTime = obj.commentTime;
            if(obj.content===""|| obj.commentName===""){
                addResult.success = false;
                addResult.message = "empty content / commentName.";
                return addResult;
            }
            if (obj.commentName.length > 64 || obj.content.length > 256){
                addResult.success = false;
                addResult.message = "content / commentName  exceed limit length. content'length is 256. commentName's length is 64.";
                return addResult;
            }
            var commentItem = new CommentItem();
            commentItem.id = obj.id;
            commentItem.departmentId = obj.departmentId;
            commentItem.content = obj.content;
            commentItem.commentName = obj.commentName;
            commentItem.commentTime = obj.commentTime;
            commentItem.from = obj.from;
            commentItem.score = obj.score;
            var index = this.commentItem_list_size;
            this.commentItem_list_array.put(index,commentItem.id);
            this.commentItem_list.put(commentItem.id, commentItem);
            this.commentItem_list_size +=1;
            //更新科室的评论数和口碑评分
            var department = result.department;
            var commentCount = department.commentCount;
            var scoreCount = department.scoreCount;
            department.commentCount = commentCount + 1;
            department.scoreCount = scoreCount + Number(obj.score);
            if (department.scoreCount < 0) {
                department.scoreCount = 0;
            }
            this.department_list.put(department.id, department);

            addResult.departmentId=department.id;
            addResult.commentCount=department.commentCount;
            addResult.scoreCount=department.scoreCount;
            addResult.success = true;
            addResult.message = "You successfully add ths Duanzi's comment!";
            return addResult;
        }else{
            addResult.success = false;
            addResult.message = "Can not find the Duanzi!";
            return addResult;
        }
    },
    commentItem_list_size : function(){
        return this.commentItem_list_size;
    },
    //根据段子Id查询该段子的评论列表(按插入顺序倒序)
    query_commentItem_list_by_departmentId : function(departmentId,page){
        var result = {
            success : false,
            type : "query_commentItem_list_by_departmentId",
            departmentId:departmentId,
            message : "",
            data : []
        };
        if(!page||!page.pageSize||!page.pageNum){
            page.pageSize=5;
            page.pageNum=1;
        }
        departmentId = departmentId.trim();
        if ( departmentId === "" ) {
            result.success = false;
            result.message = "empty departmentId";
            return result;
        }
        if(this.commentItem_list_size<=0){
            result.success = false;
            result.message = "no data";
            return result;
        }
        var qResult = this.query_department_by_key(departmentId);
        if(qResult.success){
            var number = this.commentItem_list_size-1;
            var commentItem;
            var count=0;
            var key;
            for(var i=number;i>=0;i--){
                key = this.commentItem_list_array.get(i);
                commentItem = this.commentItem_list.get(key);
                if(commentItem&&commentItem.departmentId==departmentId){
                    count++;
                    if(count>(page.pageNum-1)*page.pageSize&&count<=page.pageNum*page.pageSize){
                        result.data.push(commentItem);
                    }
                }
            }
            if(result.data.length>0){
                result.success = true;
            }else{
                result.success = false;
                result.message = "no data";
            }
        }else{
            result.success = false;
            result.message = "no data";
        }
        return result;
    },
    query_commentSum_by_departmentId:function(departmentId){
        var result = {
            success : false,
            type : "query_commentSum_by_departmentId",
            departmentId:departmentId,
            message : "",
            sum : 0
        };
        departmentId = departmentId.trim();
        if ( departmentId === "" ) {
            result.success = false;
            result.message = "empty departmentId";
            return result;
        }
        var qResult = this.query_department_by_key(departmentId);
        if(qResult.success){
            var number = this.commentItem_list_size-1;
            var commentItem;
            var key;
            var count=0;
            for(var i=number;i>=0;i--){
                key = this.commentItem_list_array.get(i);
                commentItem = this.commentItem_list.get(key);
                if(commentItem&&commentItem.departmentId==departmentId){
                    count++;
                }
            }
            result.success=true;
            result.sum=count;
        }else{
            result.success = false;
            result.message = "no data";
        }
        return result;
    },
    //添加一个段子的一条点赞记录到list中
    add_goodItem_to_list: function(text) {
        var addResult = {
            success : false,
            message : "",
            type : "add_goodItem_to_list",
            departmentId:"",
            goodCount:0,
            scoreCount:0,

        };
        var obj = text;
        obj.departmentId = obj.departmentId.trim();
        var result = this.query_department_by_key(obj.departmentId);
        if(result.success){
            obj.from = obj.from;
            var timestamp = new Date().getTime();//当前时间戳，精确到毫秒，如：1280977330748
            obj.id = obj.from + "_" + timestamp;//id=from+'_'+时间戳
            obj.recordTime = new Date();
            var goodItem = new GoodItem();
            goodItem.id = obj.id;
            goodItem.departmentId = obj.departmentId;
            goodItem.recordTime = obj.recordTime;
            goodItem.from = obj.from;
            var index = this.goodItem_list_size;
            this.goodItem_list_array.put(index,goodItem.id);
            this.goodItem_list.put(goodItem.id, goodItem);
            this.goodItem_list_size +=1;
            //将科室的点赞数量+1
            var department = result.department;
            var goodCount = department.goodCount;
            var scoreCount = department.scoreCount;
            department.goodCount = goodCount + 1;
            department.scoreCount = scoreCount + 1;
            this.department_list.put(department.id, department);
            addResult.departmentId=department.id;
            addResult.goodCount=department.goodCount;
            addResult.scoreCount=department.scoreCount;
            addResult.success = true;
            addResult.message = "You successfully add ths Duanzi's Zan!";
            return addResult;
        }else{
            addResult.success = false;
            addResult.message = "Can not find the Duanzi!";
            return addResult;
        }
    },
    goodItem_list_size : function(){
        return this.goodItem_list_size;
    },
    //添加一个段子的一条嘘Ta记录到list中
    add_badItem_to_list: function(text) {
        var addResult = {
            success : false,
            message : "",
            type : "add_badItem_to_list",
            departmentId:"",
            badCount:0,
            scoreCount:0,
        };
        var obj = text;
        obj.departmentId = obj.departmentId.trim();
        var result = this.query_department_by_key(obj.departmentId);
        if(result.success){
            obj.from = obj.from;
            var timestamp = new Date().getTime();//当前时间戳，精确到毫秒，如：1280977330748
            obj.id = obj.from + "_" + timestamp;//id=from+'_'+时间戳
            obj.recordTime = new Date();
            var badItem = new BadItem();
            badItem.id = obj.id;
            badItem.departmentId = obj.departmentId;
            badItem.recordTime = obj.recordTime;
            badItem.from = obj.from;
            var index = this.badItem_list_size;
            this.badItem_list_array.put(index,badItem.id);
            this.badItem_list.put(badItem.id, badItem);
            this.badItem_list_size +=1;
            //将段子的嘘Ta数量+1
            var department = result.department;
            var badCount = department.badCount;
            var scoreCount = department.scoreCount;
            department.badCount = badCount + 1;
            department.scoreCount = scoreCount - 1;
            this.department_list.put(department.id, department);

            addResult.departmentId=department.id;
            addResult.badCount=department.badCount;
            addResult.scoreCount=department.scoreCount;
            addResult.success = true;
            addResult.message = "You successfully add ths Duanzi's XuTa!";
            return addResult;
        }else{
            addResult.success = false;
            addResult.message = "Can not find the Duanzi!";
            return addResult;
        }
    },
    badItem_list_size : function(){
        return this.badItem_list_size;
    },

    //banner
    add_bannerItem_to_list: function(text) {
        var addResult = {
            success : false,
            message : "",
            type : "add_bannerItem_to_list",
            departmentId:"",
            bannerCount:0,
            scoreCount:0,
        };
        var obj = text;
        obj.departmentId = obj.departmentId.trim();
        var result = this.query_department_by_key(obj.departmentId);
        if(result.success){
            obj.from = obj.from;
            var timestamp = new Date().getTime();//当前时间戳，精确到毫秒，如：1280977330748
            obj.id = obj.from + "_" + timestamp;//id=from+'_'+时间戳
            obj.imgBase64 = obj.imgBase64.trim();
            obj.username = obj.username.trim();
            obj.title = obj.title;
            if(obj.username===""|| obj.title==="" ||obj.imgBase64==""){
                addResult.success = false;
                addResult.message = "empty username / title /imgBase64.";
                return addResult;
            }
            if (obj.username.length > 64 || obj.title.length > 64){
                addResult.success = false;
                addResult.message = "title / username  exceed limit length 64. ";
                return addResult;
            }
            var bannerItem = new BannerItem();
            bannerItem.id = obj.id;
            bannerItem.departmentId = obj.departmentId;
            bannerItem.title = obj.title;
            bannerItem.username = obj.username;
            bannerItem.imgBase64 = obj.imgBase64;
            bannerItem.from = obj.from;
            bannerItem.sendTime = obj.sendTime;
            var index = this.bannerItem_list_size;
            this.bannerItem_list_array.put(index,bannerItem.id);
            this.bannerItem_list.put(bannerItem.id, bannerItem);
            this.bannerItem_list_size +=1;
            //更新科室的评论数和口碑评分
            var department = result.department;
            var bannerCount = department.bannerCount;
            var scoreCount = department.scoreCount;
            department.bannerCount = bannerCount + 1;
            department.scoreCount = scoreCount + 5;
            this.department_list.put(department.id, department);

            addResult.departmentId=department.id;
            addResult.bannerCount=department.bannerCount;
            addResult.scoreCount=department.scoreCount;
            addResult.success = true;
            addResult.message = "You successfully add banner!";
            return addResult;
        }else{
            addResult.success = false;
            addResult.message = "Can not find the department!";
            return addResult;
        }
    },
    bannerItem_list_size : function(){
        return this.bannerItem_list_size;
    },
    //根据科室Id查询该科室的banner列表(按插入顺序倒序,分页)
    query_bannerItem_list_by_departmentId : function(departmentId,page){
        var result = {
            success : false,
            type : "query_bannerItem_list_by_departmentId",
            departmentId:departmentId,
            message : "",
            data : []
        };
        if(!page||!page.pageSize||!page.pageNum){
            page.pageSize=2;
            page.pageNum=1;
        }
        departmentId = departmentId.trim();
        if ( departmentId === "" ) {
            result.success = false;
            result.message = "empty departmentId";
            return result;
        }
        if(this.bannerItem_list_size<=0){
            result.success = false;
            result.message = "no data";
            return result;
        }
        var qResult = this.query_department_by_key(departmentId);
        if(qResult.success){
            var number = this.bannerItem_list_size-1;
            var bannerItem;
            var key;
            var count=0;
            for(var i=number;i>=0;i--){
                key = this.bannerItem_list_array.get(i);
                bannerItem = this.bannerItem_list.get(key);
                if(bannerItem&&bannerItem.departmentId==departmentId){
                    count++;
                    if(count>(page.pageNum-1)*page.pageSize&&count<=page.pageNum*page.pageSize){
                        result.data.push(bannerItem);
                    }
                    
                }
            }
            if(result.data.length>0){
                result.success = true;
            }else{
                result.success = false;
                result.message = "no data";
            }
        }else{
            result.success = false;
            result.message = "no data";
        }
        return result;
    },
    query_bannerSum_by_departmentId : function(departmentId){
        var result = {
            success : false,
            type : "query_bannerSum_by_departmentId",
            departmentId:departmentId,
            message : "",
            sum : 0
        };
        departmentId = departmentId.trim();
        if ( departmentId === "" ) {
            result.success = false;
            result.message = "empty departmentId";
            return result;
        }
        var qResult = this.query_department_by_key(departmentId);
        if(qResult.success){
            var number = this.bannerItem_list_size-1;
            var bannerItem;
            var key;
            var count=0;
            for(var i=number;i>=0;i--){
                key = this.bannerItem_list_array.get(i);
                bannerItem = this.bannerItem_list.get(key);
                if(bannerItem&&bannerItem.departmentId==departmentId){
                    count++;
                }
            }
            result.success=true;
            result.sum=count;
        }else{
            result.success = false;
            result.message = "no data";
        }
        return result;
    }
};
function guid() {
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
//对列表数据进行排序sortKey排序的键值
function sortListASC(list,sortKey){
    if(list&&list.length>0){
        for(var i=0;i<list.length;i++){
            for(var j=i;j<list.length;j++){
                if(list[i][sortKey]>list[j][sortKey]){
                    var temp=list[i];
                    list[i]=list[j];
                    list[j]=temp;
                }
            }
        }
    }
    return list;
}
//对列表数据进行排序sortKey排序的键值
function sortListDESC(list,sortKey){
    if(list&&list.length>0){
        for(var i=0;i<list.length;i++){
            for(var j=i;j<list.length;j++){
                if(list[i][sortKey]<list[j][sortKey]){
                    var temp=list[i];
                    list[i]=list[j];
                    list[j]=temp;
                }
            }
        }
    }
    return list;
}
window.DataSys = DataSys;

