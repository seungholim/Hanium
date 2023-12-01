//module dependencies
const query = require('./IOTFct');

exports.getTempHumi = async(req, res, next) => {
    try{
        let returnJson = new Object();

        let user_idx = req.query.user_idx;

        returnJson.res_State = "";
        returnJson.res_Msg = "";
        returnJson.res_Data = "";
    
        await query.getTempHumi(user_idx)
            .then((result) => {
            returnJson.res_State = "success_get_temp_humi";
            returnJson.res_Msg = "온습도를 성공적으로 가져왔습니다.";
            returnJson.res_Data = result;
            res.send(returnJson);
        })
            .catch(() => {
            returnJson.res_State = "sql_error";
            returnJson.res_Msg = "잠시 후에 시도해주세요.";
            res.send(returnJson);
        });    
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}

exports.getRefrigeratorImage = async(req, res, next) => {
    try{
        let returnJson = new Object();

        let user_idx = req.query.user_idx;

        returnJson.res_State = "";
        returnJson.res_Msg = "";
        returnJson.res_Data = "";
    
        await query.getRefrigeratorImage(user_idx)
            .then((result) => {
            returnJson.res_State = "success_get_refrigerator_image";
            returnJson.res_Msg = "냉장고 내부를 성공적으로 가져왔습니다.";
            returnJson.res_Data = result;
            res.send(returnJson);
        })
            .catch(() => {
            returnJson.res_State = "sql_error";
            returnJson.res_Msg = "잠시 후에 시도해주세요.";
            res.send(returnJson);
        });    
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}