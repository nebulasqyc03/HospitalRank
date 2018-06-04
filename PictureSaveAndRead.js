

'use strict';



var PictureSaveAndRead = function() {

};
var pre_url="";
var pre_file="";
var pre_value="";
PictureSaveAndRead.prototype = {
    init: function() {
        var self = this;
		$("#kit_image").on('click',function(){
			$("#myfile").click();
		});
        $("#myfile").on('change', function () {
			var file_src = self.getFileUrl(this.id);
			$("#myfile").attr("src",file_src);
			// $("#myfile").attr("name",pre_file);
			// $("#myfile").attr("value",pre_value);
			if(''!=file_src){
				self.transImgToBase64(file_src).then(function(retBase64) {
					$("#kit_image").attr("src", retBase64);
					// console.log(retBase64);
				});
			}else{
				$("#kit_image").attr("src", "images/upimg.png");
			}
			//self.loadImg();
			
        });
    },
	loadImg:function (){
		var self = this;
		var file_src = self.getFileUrl("myfile");
		if(undefined!=file_src&&''!=file_src)
		self.transImgToBase64(file_src).then(function(retBase64) {
			$("#papers_image").attr("src", retBase64);
			// console.log(retBase64);
		});
	},
    transImgToBase64: function(img_url) {
        var self = this;
        var image = new Image;
        // image.crossOrigin = "Anonymous";
        image.src = img_url;
        image.crossOrigin = "Anonymous";
        var deferred=$.Deferred();
        image.onload = function (){
            //将base64传给done上传处理
            deferred.resolve(self.getBase64OfPic(image));
        }
        return deferred.promise();//问题要让onload完成后再return

    },

    getBase64OfPic: function(img_obj) {
        var canvas = document.createElement("canvas");
        canvas.width = img_obj.width;
        canvas.height = img_obj.height;
        if (canvas.width > 150) {
            canvas.width = 150;
        }
        if (canvas.height > 200) {
            canvas.height = 200;
        }
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img_obj, 0, 0, canvas.width, canvas.height);
        var data_url = canvas.toDataURL('image/jpeg', 0.5);
        return data_url;
    },

    getFileUrl: function(input_id) {
		var input =document.getElementById(input_id).value;
		if(''==input)
			return "";
		
		pre_value=input;
        var url;
        if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
            url = document.getElementById(input_id).value;
			 var fileSystem = new ActiveXObject("Scripting.FileSystemObject");        
			 var file = fileSystem.GetFile (url); 
			pre_file=file;
        } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
            url = window.URL.createObjectURL(document.getElementById(input_id).files.item(0));
			pre_file=document.getElementById(input_id).files[0];
        } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
            url = window.URL.createObjectURL(document.getElementById(input_id).files.item(0));
			pre_file=document.getElementById(input_id).files[0];
        }
		pre_url=url;
        return url;
    }
}

var picTrans = new PictureSaveAndRead();

function loadFlagImg(which) {
    console.log("click");
    var objfather = $(which).closest("div");
    var obj = $(which).closest("div").find("input[name='img-input']");
    obj.click();
}
function changeFlagImg(which) {
    console.log("onchange");
    var file_src = picTrans.getFileUrl(which.id);
    $(which).attr("src", file_src);
    if(''!=file_src){
        picTrans.transImgToBase64(file_src).then(function(retBase64) {
            $(which).closest("div").find("img").attr("src", retBase64);
        });
    }else{
        $(which).attr("src", "images/upimg.png");
    }
}