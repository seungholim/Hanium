//module dependencies
const query = require('./ratingFct');

exports.postRating = async(req, res, next) => {
    try{
        let returnJson = new Object();
        
        returnJson.res_State = "";
        returnJson.res_Msg = "";

        let {user_idx, recipe_idx, rating} = req.body;

        await query.postRating(user_idx, recipe_idx, rating)
            .then(() => {
            returnJson.res_State = "success";
            returnJson.res_Msg = "평점이 등록되었습니다.";
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

exports.getRating = async(req, res, next) => {
    try{
        let returnJson = new Object();

        let {user_idx, recipe_idx} = req.query;

        returnJson.res_State = "";
        returnJson.res_Msg = "";
        returnJson.res_Data = "";
    
        await query.getRating(user_idx, recipe_idx)
            .then((result) => {
            returnJson.res_State = "success_get_rating";
            returnJson.res_Msg = "평점을 성공적으로 가져왔습니다.";
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