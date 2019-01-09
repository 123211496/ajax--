/**
 * Created by Administrator on 2016/5/24.
 */
(function(){
    var common = {
        init:function(){
            //调用ajax设置的方法
            this.ajaxSetting();
        }
        setData:function(name,obj){
            if(typeof obj==='object'){
                obj=JSON.stringify(obj); //将obj转为string类型
            }
            localStorage.setItem(name,obj); //localStorage存储   ,将obj赋值给name存储
        },
        getData:function(key){
            var data;
            try{
                var obj = localStorage.getItem(key);
                data = JSON.parse(obj); //将obj转为JSON格式
            }catch(e){
                data = obj;
            }
            return data;
        },
        //ajax公共设置
        ajaxSetting:function(){
            $.ajaxSettings.beforeSend=function(){
                common.loadingStart();
            };
            $.ajaxSettings.error=function(){
                common.loadingFinish();
            };
            $.ajaxSettings.complete=function(){
                common.loadingFinish();
            }
        },
        rmStorage:function(key){
            localStorage.removeItem(key);
            //localStorage.clear();    将localStorage中的数据全部清除。
        },
        getWebUrl:function(urlName){
            return "http://127.0.0.1:3000/"+urlName;
        },
        ajax:function(url,data,callback){
            data.sessionId= common.getData('sessionId');
            url = common.getWebUrl(url);
            $.ajax({
                url:url,
                data:data,
                type:'post',
                dataType:'json',
                success:function(res){
                    callback(res);
                },
                error:function(){
                    alert('网络异常')
                }
            })
        }
    };
    common.init();
    window.common = common;  //相当于申明一个全局变量
})();
