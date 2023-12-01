//module dependencies
const query = require('./userFct.js');
const valid = require('validator');
const md5 = require('md5');
const { default: validator } = require('validator');

exports.signup = async(req, res, next) => {
    try{
        let availableId = 0;
        let availableNick = 0;
        const nickNamePattern = /[가-힣0-9a-zA-Z]/;
        const userNamePattern = /[가-힣]/;
        let returnJson = new Object();
        returnJson.res_State = "";
        returnJson.res_Msg = "";
    
        let {id, pw, pw2, nickName, userName, memNum} = req.body;

        if(id.length > 50 || id == '' || valid.isEmail(id) == false) {
            returnJson.res_State = "id_is_invalid_form";
            returnJson.res_Msg = "올바른 이메일을 입력해주세요.";
            res.send(returnJson);
        } else if(pw.length > 16 || pw.length < 8) {
            returnJson.res_State = "pw_is_invalid_form";
            returnJson.res_Msg = "올바른 비밀번호를 입력해주세요.";
            res.send(returnJson);
        } else if(pw != pw2) {
            returnJson.res_State = "pw_do_not_match";
            returnJson.res_Msg = "비밀번호가 일치하지 않습니다.";
            res.send(returnJson);
        } else if(nickName.length > 20 || nickName == '' || nickNamePattern.test(nickName) == false) {
            returnJson.res_State = "nickName_is_invalid_form";
            returnJson.res_Msg = "올바른 닉네임을 입력해주세요."
            res.send(returnJson);
        } else if(userName > 10 || (userName != '' && userNamePattern.test(userName) == false)) {
            returnJson.res_State = "userName_is_invalid_form";
            returnJson.res_Msg = "올바른 이름을 입력해주세요.";
            res.send(returnJson);
        } else {
            let pwSalt ='sangsoonlee';
            pw = md5(pw + pwSalt);
            await query.chkId(id)
                .then((result) => {
                    if(result == 1) {
                        availableId = 1;
                    }else if(result == 0){
                        returnJson.res_State = "email_is_already_used";
                        returnJson.res_Msg = "사용중인 이메일 입니다.";
                        res.send(returnJson);
                    }
                })
                .catch(() => {
                    returnJson.res_State = "sql_error";
                    returnJson.res_Msg = "잠시 후에 시도해주세요.";
                    res.send(returnJson);
                });
    
            await query.chkNickName(nickName)
                .then((result) => {
                    if(result == 1){
                        availableNick = 1;
                    }else if(result == 0){
                        returnJson.res_State = "nickname_is_already_used";
                        returnJson.res_Msg = "사용중인 닉네임 입니다.";
                        res.send(returnJson);
                    }
                })
                .catch(() => {
                    returnJson.res_State = "sql_error";
                    returnJson.res_Msg = "잠시 후에 시도해주세요.";
                    res.send(returnJson);
                });
            if(availableId && availableNick) {
                await query.signup(id, pw, nickName, userName, memNum)
                    .then(() => {
                        returnJson.res_State = "success";
                        returnJson.res_Msg = "회원가입을 축하드립니다.";
                        res.send(returnJson);
                    })
                    .catch(() => {
                        returnJson.res_State = "sql_error";
                        returnJson.res_Msg = "잠시 후에 시도해주세요.";
                        res.send(returnJson);
                    });
            }
        }
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}

exports.getUser = async (id) => {
    let returnJson = new Object();
            
    returnJson.res_State = "";
    returnJson.res_Msg = "";

    await query.getUser(id)
        .then((result) => {
            returnJson = result;
        })
        .catch(() => {
            returnJson.res_State = "sql_error";
            returnJson.res_Msg = "잠시 후에 시도해주세요.";
        });
    return returnJson;
}

exports.signin = async(req, res, next) => {
    try{
        let returnJson = new Object();
        let data = new Object();
        
        returnJson.res_State = "";
        returnJson.res_Msg = "";

        let id = req.body.id;
        let pw = req.body.pw;
        let token = req.body.token;

        let success = 0;

        await query.signin(id, pw)
            .then((result) => {
                if(result.length > 0) {
                    success = 1;
                } else {
                    returnJson.res_State = "invalid_data";
                    returnJson.res_Msg = "잘못된 아이디 혹은 잘못된 비밀번호입니다.";
                    res.send(returnJson);
                }
            });
        if(success == 1 ) {
            data = await this.getUser(id);
            await query.updateToken(id, token)
                .then(() => {
                    returnJson.res_State = "success";
                    returnJson.res_Msg = "로그인 되었습니다.";
                    returnJson.res_Data = data;
                    res.send(returnJson);
                });
        }
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}