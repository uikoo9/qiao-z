'use strict';

/**
 * success
 * 	msg
 * 	obj
 */
const success = (msg, obj) => {
  return json('success', msg, obj);
};

/**
 * fail
 * 	msg
 * 	obj
 */
const fail = (msg, obj) => {
  return json('fail', msg, obj);
};

// json
function json(type, msg, obj) {
  const jsonObj = {
    type: '',
    msg: '',
    obj: null,
  };

  if (type) jsonObj.type = type;
  if (msg) jsonObj.msg = msg;
  if (obj) jsonObj.obj = obj;

  return jsonObj;
}

exports.fail = fail;
exports.success = success;
