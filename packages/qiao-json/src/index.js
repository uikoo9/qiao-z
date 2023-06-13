/**
 * success
 * 	msg
 * 	obj
 */
export const success = (msg, obj) => {
  return json('success', msg, obj);
};

/**
 * fail
 * 	msg
 * 	obj
 */
export const fail = (msg, obj) => {
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
