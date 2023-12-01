//module dependencies
const query = require('./pushFct.js');
const admin = require("firebase-admin");
const serviceAccount = require("./recipe-application-84da3-firebase-adminsdk-9cpwe-4811898892.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://recipe-application-84da3.firebaseio.com"
});

exports.expirationCounter = async() => {
    try{
        await query.expirationCounter()
            .then(() => {
                console.log("success_expiration_counter");
            })
            .catch((e) => {
                console.error(e);
            });
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}

exports.refrigeratorUser = async() => {
    try{
        await query.refrigeratorUser()
            .then(async(result) => {
            for(var i = 0; i < result.length; i++) {
                let registrationToken = result[i].token;
                if(registrationToken) {
                    await query.refrigeratorIngredients(result[i].user_idx)
                        .then(async(result) => {
                            let expired = result[0].ingredients_name;
                            let payload = {
                                notification : {
                                    title : "보관기한 임박",
                                    body : `${expired}의 보관기한이 하루 남았습니다.`
                                }
                            }
                            await admin.messaging().sendToDevice(registrationToken, payload)
                                .then(() => {
                                    console.log("success_refrigerator_user");
                            })
                                .catch((e) => {
                                console.error(e);
                            });
                        })
                        .catch((e) => {
                            console.error(e);
                        });

                }
            }
        })
            .catch((e) => {
                console.error(e);
        });    
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}

/* exports.refrigeratorUser = async() => {
    try{
        await query.refrigeratorUser()
            .then(async(result) => {
            for(var i = 0; i < result.length; i++) {
                let registrationToken = result[i].token;
                console.log(registrationToken);
                console.log(result[i].user_idx);
                await query.refrigeratorIngredients(result[i].user_idx)
                    .then(async(result) => {
                        let expired = result[0].ingredients_name;
                        console.log(expired);
                        let payload = {
                            notification : {
                                title : "보관기한 임박",
                                body : `${expired}의 보관기한이 하루 남았습니다.`
                            }
                        }
                        await admin.messaging().sendToDevice(registrationToken, payload)
                            .then(() => {
                            console.log("success");
                        })
                            .catch((e) => {
                            console.error(e);
                        });
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            }
        })
            .catch((e) => {
                console.error(e);
        });    
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
} */