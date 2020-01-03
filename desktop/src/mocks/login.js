/**
 * user page - user info
 *
 * @url /login?username=233
 *
 * GET: Request method and parameter
 *   uid This is the requested userID
 *
 * Here you can write a detailed description
 * of the parameters of the information.
 */

module.exports = function (req) {
  var username = req.query.username;
  var password = req.query.password;

  if (!username || !password) {
    return {
      code: -1,
      msg: 'login failed: incorrect username or password',
    }
  }

  return {
    code: "200",
    data: {
      "name": "@name",
      "age|20-30": 1,
      "email": "@email",
      "date": "@date",
    },
  };
};