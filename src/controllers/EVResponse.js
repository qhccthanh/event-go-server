
function SuccessResponse(res,result) {
  res.json({
    'code': 200,
    'data': result
  });
};

function ErrorResponse(res,code,error) {


  if (code == undefined) {
    code = 404;
  }

  if (error == undefined) {
    error = "Error not found";
  }
  res.status(code);
  res.send({
    'code': code,
    'error': error
  });
}

var jwt_decode = require('jwt-decode');

function verifiyAccessToken(req, key) {
  // CHeck user_id decode jwt
  // access_token trong header hoac session
  if (req.next_authorized !== undefined && req.next_authorized !== null) {
    if (req.next_authorized[key] !== undefined) {
      console.log("vào đây");
      return req.next_authorized[key];
    }
  }
  
  var access_token = req.authorization;
  if (access_token === undefined || access_token === null) {
    access_token = req.session.access_token;
  }

  if (access_token === null || access_token === undefined ) {
    return null;
  }

  var decode = jwt_decode(access_token);
  if (typeof key === 'string') {
    
    var value = decode[key];
    return value;
  }
  if (typeof key === 'Array') {
    var value = {};
    key.forEach(function(keyItem) {
      value[key] = decode[key];
    })

    return value;
  }
  return null;
}

var configure = require('../configure/configure');
function authoriedAdmin(admin) {

  if (admin == null || admin == undefined)
    return "admin empty";

  if (admin.username == null || admin.password == null)
    return "username or password empty";

  if ( admin.username.localeCompare(configure.admin_username) != 0 ||
      admin.password.localeCompare(configure.admin_password) != 0) {
    return "username or password incorrect";
  }

  return null;

}

function sendDataInRxMongo(Rx,res) {
  Rx.subscribe(function(doc){
    SuccessResponse(res,doc)
  }, function(error){
    console.error(error);
    ErrorResponse(res,404,"Send data failure");
  })
}

module.exports = {
  success: SuccessResponse,
  failure: ErrorResponse,
  verifiyAccessToken: verifiyAccessToken,
  authoriedAdmin: authoriedAdmin,
  sendData: sendDataInRxMongo
};
