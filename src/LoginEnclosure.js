var UserProfile = (function() {
  var Name = "";
  var User_id= -1;
  var Nav="";
  

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
    document.cookie=`name=${name};`
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
    document.cookie=`User_id=${name};`
    User_id = name;     
    // Also set this in cookie/localStorage
  };
   var getNav = function() {
    return Nav;    // Or pull this from cookie/localStorage
  };

  var setNav = function(name) {
    Nav = name;     
    // Also set this in cookie/localStorage
  };

  return {
    getName: getName,
    setName: setName,
    getId:getId,
    setId:setId,
    getNav:getNav,
    setNav:setNav
  }

})();


export default UserProfile;