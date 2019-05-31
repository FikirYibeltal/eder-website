var UserProfile = (function() {
  var Name = "";
  var User_id= -1;
  var Nav="";
  var Path="";

  function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function writeCookie (key, value, minutes) {
    var date = new Date();
    minutes = minutes || 1;    
    date.setTime(+ date + (minutes * 60000)); 
    window.document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + ";";
    return value;
}

  var getName = function() {
    console.log(getCookie("name"));
    if(getCookie("name")==""){
      return Name;

    }else{
      return getCookie("name");
    }
    // return Name;    // Or pull this from cookie/localStorage
  };

  var setName = function(name) {
    writeCookie('name',name,120)
    // document.cookie=`name=${name};`
    Name = name;    
    // Also set this in cookie/localStorage
  };

  var getId = function() {
    console.log(getCookie("User_id"));
    if(getCookie("User_id")==-1){
      return User_id;

    }else{
      return getCookie("User_id");
    }

    return User_id;    // Or pull this from cookie/localStorage
  };

  var setId = function(name) {
    writeCookie('User_id',name,120)
    // document.cookie=`User_id=${name};`
    User_id = name;     
    // Also set this in cookie/localStorage
  };
   var getNav = function() {
    if(getCookie('Nav')==""){
      return Nav;
    }else{
      return getCookie("Nav");
    }
    return Nav;    // Or pull this from cookie/localStorage
  };

  var setNav = function(name) {
    writeCookie('Nav',name,120)
    // document.cookie=`Nav=${name};`
    Nav = name;     
    // Also set this in cookie/localStorage
  };

   var getPath = function() {
    if(getCookie('Path')==""){
      return Path;
    }else{
      return getCookie("Path");
    }
    return Path;    // Or pull this from cookie/localStorage
  };

  var setPath = function(name) {
    document.cookie=`Path=${name};`
    Path = name;     
    // Also set this in cookie/localStorage
  };
  return {
    getName: getName,
    setName: setName,
    getId:getId,
    setId:setId,
    getNav:getNav,
    setNav:setNav,
    getPath:getPath,
    setPath:setPath
  }

})();


export default UserProfile;