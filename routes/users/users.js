const query = require('./usersFct.js');

exports.getsigninlist = async(req, res, next) => {
    try{
        let returnJson = new Object();


        returnJson.res_State = "";
        returnJson.res_Msg = "";
        returnJson.res_Data = "";


        await query.getsigninlist()
            .then((result) => {
            returnJson.res_State = "success_get_userlist";
            returnJson.res_Msg = "사용자 목록을 성공적으로 가져왔습니다.";
            returnJson.res_Data = result;
            res.send(returnJson);
        })
            .catch(() => {
            returnJson.res_State = "sql_error";
            returnJson.res_Msg = "잠시 후에 시도해주세요.";
            res.send(returnJson);
            });
        
    } catch(e){
        console.error(e);
        next(createError(404, e));
    }

}