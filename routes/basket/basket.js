//module dependencies
const query = require('./basketFct.js');

exports.getBasket = async(req, res, next) => {
    try{
        let returnJson = new Object();

        let user_idx = req.query.user_idx;

        returnJson.res_State = "";
        returnJson.res_Msg = "";
        returnJson.res_Data = "";

    await query.getBasket(user_idx)
            .then((result) => {
            returnJson.res_State = "success_get_ingredients";
            returnJson.res_Msg = "장바구니를 성공적으로 가져왔습니다.";
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

exports.postBasketToRefrigerator = async(req, res, next) => {
    try{
        let returnJson = new Object();

        returnJson.res_State = "";
        returnJson.res_Msg = "";

        let {user_idx, buyDate, shopping_list} = req.body;

        console.log(req.body.shopping_list);

        await query.postBasketToRefrigerator(user_idx, buyDate, shopping_list)
        .then(() => {
            returnJson.res_State = "success";
            returnJson.res_Msg = "성공적으로 등록되었습니다.";
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