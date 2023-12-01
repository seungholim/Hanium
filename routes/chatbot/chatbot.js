//module dependencies
const query = require('./chatbotFct.js');

exports.getChatbot = async(req, res, next) => {
  try{
      let returnJson = new Object();

      let keyword = req.query.keyword;

      returnJson.res_State = "";
      returnJson.res_Msg = "";
      returnJson.res_Data = {"response": ""};

      await query.getChatbot(keyword)
        .then((result) => {
          returnJson.res_State = "success_get_chatbot";
          returnJson.res_Msg = "성공적으로 가져왔습니다.!!";
          returnJson.res_Data.response = result;
          res.send(returnJson);
        })
          .catch((e) => {
          returnJson.res_State = "sql_error";
          returnJson.res_Msg = "잠시 후에 시도해주세요.";
          returnJson.res_Data = e;
          res.send(returnJson);
          });
        } catch(e) {
          console.error(e);
          next(createError(404, e));
        }
      }