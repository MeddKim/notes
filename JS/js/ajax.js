var request;
if(window.XMLHttpRequest){
	request = new XMLHttpRequest();  // IE7+,Firefox,Chrome,Opera,Safari
}else{
	request = new ActiveXObject("Microsoft.XMLHTTP"); //IE6,IE5
}

//request对象有一下方法：
// open(method,url,async);    method:请求方法(POST,GET);	async:同步(false)还是异步(true)，一般用异步，默认true
//send(string);  
//
//如：
// request.open("GET","get.php",true); request.send();
//
// request.open("POST","post.php",true); request.send();
//
//request.open("post","create.php",true); 
//request.setRequestHeader("Content-type","application/x-www-form-urlencoded"); 
//request.send("name=张三");
//
//获取服务器响应：
//responseText : 获取字符串形式的响应数据
//responseXML : 获取XML形式的响应数据
//status和statusText : 以数字和文本形式返回HTTP状态码
//getAllResponseHeader() : 获取所有的响应报头
//getResponseHeader(key): 查询响应中某个字段的值
//
//
//获取响应状态
//readyState
//0:请求未初始化，open还没有调用
//1：服务器连接已建立，open已经调用
//2：请求已接收，也就是接收到头信息
//3：请求处理中，也就是接收到响应主体 Access-Control-Allow-Origin
//4：请求已完成，且响应已就绪
//

request.open("GET","http://localhost:80/hello",true);
request.setRequestHeader("Access-Control-Allow-Origin: *"); 
request.send();

request.onreadystatechange = function(){
	if(request.readyState === 4 && request.status === 200){
		//do someting request.responseText()
		var content = request.responseText();
		console.log("hehehe");
		console.log(content);
	}
}