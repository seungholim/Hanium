//module dependencies
const query = require('./ingredientsFct');

exports.getIngredients = async(req, res, next) => {
    try{
        let returnJson = new Object();

        let idx = req.query.idx;

        returnJson.res_State = "";
        returnJson.res_Msg = "";
        returnJson.res_Data = "";
    
        await query.getIngredients(idx)
            .then((result) => {
            returnJson.res_State = "success_get_ingredients";
            returnJson.res_Msg = "식재료를 성공적으로 가져왔습니다.";
            returnJson.res_Data = result;
            res.send(returnJson);
        })
            .catch((e) => {
            returnJson.res_State = "sql_error";
            returnJson.res_Msg = "잠시 후에 시도해주세요.";
            res.send(returnJson);
        });    
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}

exports.searchIngredients = async(req, res, next) => {
    try{
        let returnJson = new Object();

        let keyword = req.query.keyword;
        
        returnJson.res_State = "";
        returnJson.res_Msg = "";
        returnJson.res_Data = "";

        await query.searchIngredients(keyword)
            .then((result) => {
            returnJson.res_State = "success_search_ingredients";
            returnJson.res_Msg = "식재료를 성공적으로 검색했습니다.";
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

exports.insertRefrigerator = async(req, res, next) => {
    try{
        let returnJson = new Object();
        
        returnJson.res_State = "";
        returnJson.res_Msg = "";

        let {user_idx, ingredients_idx, buyDate} = req.body;

        await query.insertRefrigerator(user_idx, ingredients_idx, buyDate)
            .then(() => {
            returnJson.res_State = "success";
            returnJson.res_Msg = "냉장고에 성공적으로 넣었습니다.";
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

exports.postIngredientsToBasket = async(req, res, next) => {
    try{
        let returnJson = new Object();
        
        returnJson.res_State = "";
        returnJson.res_Msg = "";

        let {user_idx, ingredients_idx, ingredients_name} = req.body;

        await query.postIngredientsToBasket(user_idx, ingredients_idx, ingredients_name)
            .then(() => {
            returnJson.res_State = "success";
            returnJson.res_Msg = "장바구니에 성공적으로 넣었습니다.";
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