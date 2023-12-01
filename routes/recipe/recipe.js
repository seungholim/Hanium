//module dependencies
const query = require('./recipeFct.js');

exports.getRecipe = async(req, res, next) => {
    try{
        let returnJson = new Object();

        let idx = req.query.idx;

        returnJson.res_State = "";
        returnJson.res_Msg = "";
        returnJson.res_Data = new Object();

        if(idx === undefined) {
            await query.getRecipeList()
                .then((result) => {
                returnJson.res_State = "success_get_recipe";
                returnJson.res_Msg = "레시피 목록을 성공적으로 가져왔습니다.";
                returnJson.res_Data = result;
                res.send(returnJson);
            })
                .catch(() => {
                returnJson.res_State = "sql_error";
                returnJson.res_Msg = "잠시 후에 시도해주세요.";
                res.send(returnJson);
            });
        } else {
            await query.getRecipe(idx)
                .then((result) => {
                    returnJson.res_Data.recipe = result;
                })
                .catch(() => {
                    returnJson.res_State = "sql_error";
                    returnJson.res_Msg = "잠시 후에 시도해주세요.";
                    res.send(returnJson);
                });   

            await query.getRecipeIngredients(idx)
                .then((result) => {
                    returnJson.res_Data.ingredients = result;
                })
                .catch(() => {
                    returnJson.res_State = "sql_error";
                    returnJson.res_Msg = "잠시 후에 시도해주세요.";
                    res.send(returnJson);
                });   
                
            await query.getRecipeDescription(idx)
                .then((result) => {
                    returnJson.res_State = "success_get_recipe";
                    returnJson.res_Msg = "레시피 목록을 성공적으로 가져왔습니다.";
                    returnJson.res_Data.description = result;
                    res.send(returnJson);
                })
                    .catch(() => {
                    returnJson.res_State = "sql_error";
                    returnJson.res_Msg = "잠시 후에 시도해주세요.";
                    res.send(returnJson);
                });   
        }
    } catch(e){
        console.error(e);
        next(createError(404, e));
    }
}

exports.getIngredientsInRecipe = async(req, res, next) => {
    try{
        let returnJson = new Object();

        let idx = req.query.idx;

        returnJson.res_State = "";
        returnJson.res_Msg = "";
        returnJson.res_Data = "";

    await query.getIngredientsInRecipe(idx)
            .then((result) => {
            returnJson.res_State = "success_get_ingredients";
            returnJson.res_Msg = "식재료를 성공적으로 가져왔습니다.";
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

exports.getRecommendedRecipe = async(req, res, next) => {
    try{
        let returnJson = new Object();

        let idx = req.query.idx;

        returnJson.res_State = "";
        returnJson.res_Msg = "";
        returnJson.res_Data = "";

    await query.getRecommendedRecipe(idx)
            .then((result) => {
            returnJson.res_State = "success_get_ingredients";
            returnJson.res_Msg = "추천 레시피를 성공적으로 가져왔습니다.";
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

exports.postRecipe = async(req, res, next) => {
    try{
        let returnJson = new Object();

        returnJson.res_State = "";
        returnJson.res_Msg = "";

        let recipe = JSON.parse(JSON.parse(req.body.recipe));
        let ingredients = JSON.parse(JSON.parse(req.body.ingredients));
        let description = JSON.parse(JSON.parse(req.body.description));
        let titleImage = "";
        let descriptionImage = [];
        let descriptionImageChk = JSON.parse(JSON.parse(req.body.descriptionImageChk));

        if (req.files['titleImage']) {
            titleImage = "http://d2hrq3gekbym4u.cloudfront.net/"+req.files['titleImage'][0].key;
        }
        
        var j = 0;
        for (var i = 0; i < descriptionImageChk.length; i++) {
            if (descriptionImageChk[i]) {
                descriptionImage[i] = "http://d2hrq3gekbym4u.cloudfront.net/"+req.files['descriptionImage'][j].key;
                j++;
            } else {
                descriptionImage[i] = "";
            }
        }

        await query.postRecipe(recipe, ingredients, description, titleImage, descriptionImage)
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

exports.searchRecipe = async(req, res, next) => {
    try{
        let returnJson = new Object();

        let keyword = req.query.keyword;
        
        returnJson.res_State = "";
        returnJson.res_Msg = "";
        returnJson.res_Data = "";

        await query.searchRecipe(keyword)
            .then((result) => {
            returnJson.res_State = "success_search_recipe";
            returnJson.res_Msg = "레시피를 성공적으로 검색했습니다.";
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

exports.postRecipeToBasket = async(req, res, next) => {
    try{
        let returnJson = new Object();

        returnJson.res_State = "";
        returnJson.res_Msg = "";

        let {user_idx, recipe_idx} = req.body;

        await query.postRecipeToBasket(user_idx, recipe_idx)
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