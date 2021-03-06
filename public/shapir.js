import {config} from "./firebase-config.js";

export function include(...urls) {
    let loaded = urls.map(src => {
        return new Promise(function(resolve, reject) {
            let script = document.createElement("script");

            Object.assign(script, {
                async: true,
                onload: function() {
                    resolve(script);
                    script.remove();
                },
                onerror: function() {
                    reject(script);
                },
                src
            });

            document.head.append(script);
        });
    });

    return Promise.all(loaded);
}

let firebaseLoaded = include(
    "https://www.gstatic.com/firebasejs/7.1.0/firebase-app.js",
    "https://www.gstatic.com/firebasejs/7.1.0/firebase-database.js"
).then(() => {
    firebase.initializeApp(config);
});

export default async function shapir(){
    var result, obJSON, auth_url, token_url, redirect_url, client_id, client_secret, response_type, scope, grant_type, client_auth, tok, expires_in, properties = [], methods = [], sitesToken=[], currentType="", results = [];

    await firebaseLoaded;

    let snapshot = await firebase.database().ref('/abstractions').once('value');

    snapshot.forEach( childSnapshot => {
        var site = childSnapshot.key;
        window[site] = {} //initilize function

        var promise = firebase.database().ref('/abstractions/'+site).once('value').then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                let siteKey = childSnapshot.key;
                let siteVal  = childSnapshot.val();

                // Every site, has "objects/types" and "functions" (e.g. 'dailymotion': {'objects': {'VideoObject':{}, 'MusicPlaylist':{} }, 'functions': [{'name':'searchVideos', ...}, {}]} )
                if (siteKey == "objects"){
                    for (const [key, value] of Object.entries(siteVal)) {
                        let type = key;
                        let val  = eval(value);

                        window[site][type] = function(...args) { return self(type, val, "self", "none", ...args) };

                        function self (typekey, typeOb, caller, prop, ...args) {
                            // console.log("typeOb:", typeOb)
                            // console.log("caller:", caller)
                            // console.log("callerTYPE:", typekey)
                            // console.log("typeId: ", typeOb.id)
                            // console.log("args: ", args)
                            currentType = typekey;

                            if (prop == "none"){
                                var endpoint = typeOb.construct[caller].endpoint;
                                var params = typeOb.construct[caller].input;
                                // var typeId = typeOb.id
                                // console.log("typeId1: ", typeId)
                            }
                            else {
                                var arrEndpoints= typeOb.construct[caller];
                                console.log("arrEndpoints: ", arrEndpoints)
                                var elemIndex = arrEndpoints.findIndex(element => element.property == prop)
                                var endpoint = typeOb.construct[caller][elemIndex].endpoint;
                                var params = typeOb.construct[caller][elemIndex].input;
                                // var typeId = typeOb.construct[caller][elemIndex].id;
                                // console.log("typeId2: ", typeId)
                            }

                            var idValue = args[0];
                            var typeId = typeOb.id;
                            var properties = typeOb.properties;
                            var getters = typeOb.getters;
                            var setters = typeOb.setters;
                            var methods = typeOb.methods;
                            var remove = typeOb.delete;
                            var add = typeOb.add;
                            var fields=[], paramList="", mParamList="";

                            if (params){
                                for (var p=0; p<params.length; ++p){
                                    Object.entries(params[p]).forEach(([key, value]) => {
                                        paramList+=`${key}`
                                        paramList+="="
                                        paramList+=args[p]
                                    });
                                    if (p+1<params.length){
                                        paramList+="&"
                                    }
                                }
                            }

                            for (var f=0; f< properties.length; ++f){
                                if (properties[f].field != undefined){
                                    fields.push(properties[f].property)
                                }
                            }

                            // return new Promise(function(resolve, reject) {resolve(fetch('https://scrapir.org/api/'+endpoint+'?'+paramList+'&Number of Results=2').then(response => response.json())) }).then(o => {
                            return firebase.database().ref('/apis/'+endpoint).once('value').then(function(snapshot) {
                                obJSON = snapshot.val();
                                if (obJSON.oauth2){
                                    // console.log("oauth2")
                                    return new Promise((resolve, reject) => {
                                    console.log("auth function");
                                        auth_url= obJSON.oauth2[0].authURL;
                                        token_url= obJSON.oauth2[0].tokenURL;
                                        redirect_url= obJSON.oauth2[0].callbackURL;
                                        client_id= obJSON.oauth2[0].clientId;
                                        client_secret= obJSON.oauth2[0].clientSec;
                                        response_type= obJSON.oauth2[0].resType;
                                        scope= obJSON.oauth2[0].scope;
                                        grant_type= obJSON.oauth2[0].grantType;
                                        client_auth= obJSON.oauth2[0].clientAuth;

                                        var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                        //while(acToken === undefined){
                                        var pollTimer = window.setInterval(function() {
                                            try {
                                                console.log("url here: ", win.document.URL); //here url
                                                if (win.document.URL.indexOf(redirect_url) != -1) {
                                                    window.clearInterval(pollTimer);
                                                    var url =   win.document.URL;
                                                    acToken =   gup(url, 'code');
                                                    resolve(acToken)
                                                    // tokenType = gup(url, 'token_type');
                                                    // expiresIn = gup(url, 'expires_in');
                                                    win.close();
                                                    // return validateToken(acToken)
                                                }
                                            } catch(e) {
                                                console.log("error in oauth")
                                            }
                                        }, 200);

                                        function gup(url, name) {
                                            name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                            var regexS = "[\?&]"+name+"=([^&#]*)";
                                            var regex = new RegExp( regexS );
                                            var results = regex.exec( url );
                                            if ( results == null )
                                                return "";
                                            else
                                                return results[1];
                                        }//end of gup()

                                    })
                                    .then(token=>{
                                        return new Promise((resolve, reject) => {
                                        console.log("Token: ",token)
                                        console.log("Token URL: ",token_url)
                                        $.ajax({
                                            url: token_url,
                                            method: "POST",
                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                            success: function(response) {
                                                console.log("response: ",response);
                                                //important to check access token and token type (e.g. bearer)
                                                tok = response.access_token;
                                                console.log("tok: ", tok)
                                                resolve('https://scrapir.org/api/'+endpoint+'?tokenAPI='+tok)
                                                //console.log("result: ",result);
                                                //return result;
                                            },
                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                console.log("error: ",response);
                                            }
                                        })
                                    })
                                    // return something
                                    })

                                }
                                else { //no oauth
                                    // console.log("NOT oauth2")
                                    result =  'https://scrapir.org/api/'+endpoint+'?'+paramList
                                    return result;
                                }
                            })//firebase
                            .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                            .then(o => {
                                // console.log("result: ", o)
                                //map response to class properties
                                if (o.constructor === Array){
                                    // console.log("ARRAY");
                                    o.forEach(function(ob) {
                                        for (var p=0; p<properties.length; ++p){
                                            if (properties[p].field){// it won't check type properties (e.g. comment for VideoObject)
                                                if (properties[p].property != properties[p].field && ob[properties[p].field]) {
                                                    Object.defineProperty(ob, properties[p].property, Object.getOwnPropertyDescriptor(ob, properties[p].field));
                                                    delete ob[properties[p].field];
                                                }
                                            }
                                            else { //if the property is a type
                                                let propType = properties[p].property;
                                                let typeName = properties[p].type;

                                                Object.defineProperty(ob, propType, {
                                                    get: function() {
                                                        let promise = firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                                            console.log("typeOb4: ", snapshot.val())
                                                            // return self(snapshot.val(), type, propType, ob[typeId]);
                                                            return self(snapshot.key, snapshot.val(), currentType, propType, ob[typeId]);
                                                        });
                                                        return promise;
                                                    }
                                                });//end of getter

                                            }
                                        }

                                        //***************************** SETTERS *********************************/
                                    if (setters){
                                        for (var s=0; s<setters.length; ++s){
                                            // console.log("setter: ", setters[s])
                                            var field = setters[s].field; //API endpoint field to be set
                                            var prop;
                                            var setEndpoint =  setters[s].endpoint;
                                            var setParams = setters[s].params;
                                            var idd = setters[s].id;
                                            //get the schema.org property mapped to this field
                                            for (var f=0; f< properties.length; ++f){
                                                if (properties[f].field == field){
                                                    prop = properties[f].property;
                                                }
                                            }

                                            Object.defineProperty(ob, prop, {
                                                set: function(newValue) {
                                                    console.log("newValue: ", newValue)
                                                    this.pro = firebase.database().ref('/apis/'+setEndpoint).once('value').then(function(snapshot) {
                                                    obJSON = snapshot.val();
                                                    console.log(obJSON)
                                                    if (obJSON.oauth2){
                                                        // console.log("oauth2")
                                                        return new Promise((resolve, reject) => {
                                                                console.log("auth function");
                                                                auth_url= obJSON.oauth2[0].authURL;
                                                                token_url= obJSON.oauth2[0].tokenURL;
                                                                redirect_url= obJSON.oauth2[0].callbackURL;
                                                                client_id= obJSON.oauth2[0].clientId;
                                                                client_secret= obJSON.oauth2[0].clientSec;
                                                                response_type= obJSON.oauth2[0].resType;
                                                                scope= obJSON.oauth2[0].scope;
                                                                grant_type= obJSON.oauth2[0].grantType;
                                                                client_auth= obJSON.oauth2[0].clientAuth;

                                                                var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                var pollTimer = window.setInterval(function() {
                                                                    try {
                                                                        console.log("url here: ", win.document.URL); //here url
                                                                        if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                            window.clearInterval(pollTimer);
                                                                            var url =   win.document.URL;
                                                                            acToken =   gup(url, 'code');
                                                                            resolve(acToken)
                                                                            // tokenType = gup(url, 'token_type');
                                                                            // expiresIn = gup(url, 'expires_in');
                                                                            win.close();
                                                                            // return validateToken(acToken)
                                                                        }
                                                                    } catch(e) {
                                                                        console.log("error in oauth")
                                                                    }
                                                                }, 200);

                                                                function gup(url, name) {
                                                                    name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                    var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                    var regex = new RegExp( regexS );
                                                                    var results = regex.exec( url );
                                                                    if ( results == null )
                                                                        return "";
                                                                    else
                                                                        return results[1];
                                                                }//end of gup()

                                                            })
                                                            .then(token=>{
                                                                return new Promise((resolve, reject) => {
                                                                console.log("Token: ",token)
                                                                console.log("Token URL: ",token_url)
                                                                $.ajax({
                                                                    url: token_url,
                                                                    method: "POST",
                                                                    data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                    success: function(response) {
                                                                        console.log("response: ",response);
                                                                        //important to check access token and token type (e.g. bearer)
                                                                        tok = response.access_token;
                                                                        console.log("tok: ", tok)
                                                                        resolve('https://scrapir.org/api/'+setEndpoint+'?tokenAPI='+tok+'&'+field+'='+newValue+'&'+idd+'='+idValue)
                                                                    },
                                                                    error: function(response, jqXHR, textStatus, errorThrown) {
                                                                        console.log("error: ",response);
                                                                    }
                                                                })
                                                            })
                                                            // return something
                                                            })

                                                    }
                                                    else { //no oauth
                                                        // console.log("!!!oauth2")
                                                        result =  'https://scrapir.org/api/'+setEndpoint+'?'+paramList+'&'+pro+'='+newValue+'&id='+identifier
                                                        //console.log("result: ",result);
                                                        return result;
                                                    }

                                                })//firebase
                                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url)) })   })

                                                }
                                            });
                                        }
                                    }

                                        //***************************** METHODS *********************************/
                                    if (methods){
                                        for (var m=0;  m<methods.length; ++m){
                                            var mName = methods[m].name;
                                            var mEndpoint = methods[m].endpoint;
                                            var mParams = methods[m].params;

                                            // add the imageId
                                            Object.defineProperty(ob, mName.toString(), {
                                                enumerable: true,
                                                configurable: true,
                                                value: function(mArgs) {

                                                if (mArgs.length>0){
                                                    if (mParams){
                                                        for (var p=0; p<mParams.length; ++p){
                                                            mParamList+=mParams[p]
                                                            mParamList+="="
                                                            mParamList+=mArgs[p]
                                                            if (p+1<mParams.length){
                                                                mParamList+="&"
                                                            }
                                                        }
                                                    }
                                                }
                                                else {
                                                    mParamList+=mParams[0]
                                                    mParamList+="="
                                                    mParamList+=ob[mParams[0]]
                                                }

                                                console.log("mParamList: ", mParamList)
                                                return firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
                                                obJSON = snapshot.val();
                                                //console.log(obJSON)

                                                if (obJSON.oauth2){
                                                    // console.log("oauth2")

                                                    var tokenPromise;
                                                    var sTokens = JSON.parse(localStorage.getItem('tokens'));
                                                    console.log(sTokens)
                                                    const elementsIndex = sTokens.findIndex(element => element.site == site)
                                                    console.log("sTokens[elementsIndex]: ", sTokens[elementsIndex].token)
                                                    if (sTokens[elementsIndex].token!=""){
                                                                tokenPromise= new Promise((resolve, reject) => {resolve(sTokens[elementsIndex].token)})
                                                                .then(token=>{
                                                                    return new Promise((resolve, reject) => {
                                                                        console.log("Token: ",token)
                                                                        $.ajax({
                                                                            url: token_url,
                                                                            method: "POST",
                                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                            success: function(response) {
                                                                                console.log("response: ",response);
                                                                                tok = response.access_token;
                                                                                expires_in = response.expires_in;
                                                                                console.log("tok: ", tok)
                                                                                console.log("expires_in: ", expires_in)
                                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                //const elementsIndex = this.sTokens.findIndex(element => element.site == site)
                                                                                let newArray = [...sTokens]
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                // this.setState({newArray});

                                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))

                                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                            },
                                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                console.log("error: ",response);
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }
                                                            else {
                                                                tokenPromise= new Promise((resolve, reject) => {
                                                                    console.log("auth function");
                                                                    auth_url= obJSON.oauth2[0].authURL;
                                                                    token_url= obJSON.oauth2[0].tokenURL;
                                                                    redirect_url= obJSON.oauth2[0].callbackURL;
                                                                    client_id= obJSON.oauth2[0].clientId;
                                                                    client_secret= obJSON.oauth2[0].clientSec;
                                                                    response_type= obJSON.oauth2[0].resType;
                                                                    scope= obJSON.oauth2[0].scope;
                                                                    grant_type= obJSON.oauth2[0].grantType;
                                                                    client_auth= obJSON.oauth2[0].clientAuth;

                                                                    var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                    var pollTimer = window.setInterval(function() {
                                                                        try {
                                                                            console.log("url here: ", win.document.URL); //here url
                                                                            if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                                window.clearInterval(pollTimer);
                                                                                var url =   win.document.URL;
                                                                                acToken =   gup(url, 'code');
                                                                                resolve(acToken)
                                                                                // tokenType = gup(url, 'token_type');
                                                                                // expiresIn = gup(url, 'expires_in');
                                                                                win.close();
                                                                            }
                                                                        } catch(e) {
                                                                            console.log("error in oauth")
                                                                        }
                                                                    }, 200);

                                                                    function gup(url, name) {
                                                                        name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                        var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                        var regex = new RegExp( regexS );
                                                                        var results = regex.exec( url );
                                                                        if ( results == null )
                                                                            return "";
                                                                        else
                                                                            return results[1];
                                                                    }//end of gup()

                                                                })
                                                                .then(token=>{
                                                                    return new Promise((resolve, reject) => {
                                                                        console.log("Token: ",token)
                                                                        $.ajax({
                                                                            url: token_url,
                                                                            method: "POST",
                                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                            success: function(response) {
                                                                                console.log("response: ",response);
                                                                                tok = response.access_token;
                                                                                expires_in = response.expires_in;
                                                                                console.log("tok: ", tok)
                                                                                console.log("expires_in: ", expires_in)
                                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                let newArray = [...sTokens]
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                // this.setState({newArray});

                                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))


                                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                            },
                                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                console.log("error: ",response);
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }

                                                    return tokenPromise


                                                }
                                                else { //no oauth
                                                    // console.log("!!!oauth2")
                                                    result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                                    return result;
                                                }

                                                })//firebase
                                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                                            }
                                            });
                                        //   });

                                        }//loop to create methods
                                    }
                                    });//loop over array of objects


                                    //remove the fields that are not in the class
                                    var keys = Object.keys(o[0])
                                    for (var k=0; k<keys.length; ++k){
                                        if (!fields.includes(keys[k])){
                                            o.forEach(function(ob) {
                                                delete ob[keys[k]];
                                            })
                                        }
                                    }

                                }
                                else {
                                    // console.log("NOT ARRAY")
                                    for (var p=0; p< properties.length; ++p){
                                        if (properties[p].field){// it won't check type properties (e.g. comment for VideoObject)
                                            if (properties[p].property != properties[p].field && o[properties[p].field]) {
                                                Object.defineProperty(o, properties[p].property,Object.getOwnPropertyDescriptor(o, properties[p].field));
                                                delete o[properties[p].field];
                                            }
                                        }
                                        else { //if the property is a type
                                            let propType = properties[p].property;
                                            let typeName = properties[p].type;
                                            // console.log("typeId: ", typeId);
                                            // console.log("o[typeId]1: ", o[typeId])
                                            var idVal = o[typeId];

                                            // creat a getter for property of type Type
                                            Object.defineProperty(o, propType, {
                                                get: function() {
                                                    let promise = firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                                        console.log("typeOb1: ", snapshot.val())
                                                        console.log("o[typeId]2: ", idVal)
                                                        return self(snapshot.key, snapshot.val(), currentType, propType, idVal);
                                                    });
                                                    return promise;
                                                }
                                            });

                                            //*** if you want to remove the getter, replce iti with this
                                            // o[propType]= function(){return ""};
                                            // (async function(){
                                            //     o[propType] = await firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                            //         console.log("typeOb1: ", snapshot.val())
                                            //         return self(snapshot.key, snapshot.val(), currentType, propType, o[typeId]);
                                            //     });
                                            //     return o;
                                            // })()

                                        }
                                    }//end of for loop properties

                                    if(remove){

                                        //for (var m=0;  m<methods.length; ++m){
                                            // var mName = methods[m].name;
                                            var mEndpoint = remove.endpoint;
                                            var mParams = remove.id;

                                            Object.defineProperty(o, 'delete', {
                                                // enumerable: true,
                                                // configurable: true,
                                                value: function() {
                                                    mParamList+=mParams
                                                    mParamList+="="
                                                    mParamList+=o[typeId];
                                                // console.log("mParamList: ", mParamList)
                                                return firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
                                                obJSON = snapshot.val();
                                                // console.log(obJSON)

                                                if (obJSON.oauth2){
                                                    //show a popup window
                                                    //ask for clientID, clientSecret, and redirectURL

                                                        return new Promise((resolve, reject) => {
                                                            // var newWindow = window.open("", null, "height=250,width=600,status=yes,toolbar=no,menubar=no,location=no");

                                                            // newWindow.document.write('<h4> This method requires authentication. Please signup for the API and and provide your client id, client secret and callback url</h4>'
                                                            // +'<table><tr><td><label for="male">Client ID</label></td>'
                                                            // +'<td><input style="width:380px"  type="text" id="cId" value=""></td> </tr>'
                                                            // +'<tr><td><label for="female">Client Secret</label></td>'
                                                            // +'<td><input style="width:380px" type="text" id="cSec" value=""></td></tr>'
                                                            // +'<tr><td><label for="other">Redirect URL</label></td>'
                                                            // +'<td><input style="width:380px"  type="text" id="red" value=""><br><br></td></tr>'
                                                            // +'<tr><td><input id="formBut" type="submit"  value="Submit"></td></tr> </table>'
                                                            // );
                                                            // newWindow.document.getElementById('formBut').addEventListener('click', function(){
                                                                // console.log("C ID: ", newWindow.document.getElementById('cId').value)
                                                                // console.log("C SEC: ", newWindow.document.getElementById('cSec').value)
                                                                // console.log("Red: ", newWindow.document.getElementById('red').value)
                                                                // newWindow.close();
                                                                // let clientID  = newWindow.document.getElementById('cId').value;
                                                                // let clientSec = newWindow.document.getElementById('cSec').value;
                                                                // let callbackUrl  = newWindow.document.getElementById('red').value
                                                                // console.log("auth function");
                                                                auth_url= obJSON.oauth2[0].authURL;
                                                                token_url= obJSON.oauth2[0].tokenURL;
                                                                redirect_url= obJSON.oauth2[0].callbackURL;
                                                                client_id= obJSON.oauth2[0].clientId;
                                                                client_secret= obJSON.oauth2[0].clientSec;
                                                                response_type= obJSON.oauth2[0].resType;
                                                                scope= obJSON.oauth2[0].scope;
                                                                grant_type= obJSON.oauth2[0].grantType;
                                                                client_auth= obJSON.oauth2[0].clientAuth;

                                                                    var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                    var pollTimer = window.setInterval(function() {
                                                                        try {
                                                                            console.log("url here: ", win.document.URL); //here url
                                                                            if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                                window.clearInterval(pollTimer);
                                                                                var url =   win.document.URL;
                                                                                // acToken =   gup(url, 'code');
                                                                                // tokenType = gup(url, 'token_type');
                                                                                // expiresIn = gup(url, 'expires_in');
                                                                                win.close();
                                                                                resolve(gup(url, 'code'))
                                                                            }
                                                                        } catch(e) {
                                                                            console.log("error in oauth")
                                                                        }
                                                                    }, 200);

                                                                    function gup(url, name) {
                                                                        name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                        var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                        var regex = new RegExp( regexS );
                                                                        var results = regex.exec( url );
                                                                        if ( results == null )
                                                                            return "";
                                                                        else{
                                                                            return results[1];
                                                                        }
                                                                    }//end of gup()
                                                                // }se value
                                                            //});//new window



                                                        })//end of promise return
                                                        .then(token=>{
                                                            return new Promise((resolve, reject) => {
                                                            console.log("Token: ",token)
                                                            console.log("Token URL: ",token_url)
                                                            $.ajax({
                                                                url: token_url,
                                                                method: "POST",
                                                                data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                success: function(response) {
                                                                    console.log("response: ",response);
                                                                    //important to check access token and token type (e.g. bearer)
                                                                    tok = response.access_token;
                                                                    console.log("tok: ", tok)
                                                                    resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                },
                                                                error: function(response, jqXHR, textStatus, errorThrown) {
                                                                    console.log("error: ",response);
                                                                }
                                                            })
                                                        })
                                                        // return something
                                                    })


                                                }else { //no oauth
                                                    // console.log("!!!oauth2")
                                                    result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                                    return result;
                                                }

                                                })//firebase
                                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                                            }
                                            });
                                        //   });

                                        //}//loop to create methods
                                    }

                                    //***************************** SETTERS *********************************/
                                    if (setters){
                                    for (var s=0; s<setters.length; ++s){
                                        console.log("setter: ", setters[s])
                                        var field = setters[s].field; //API endpoint field to be set
                                        var prop="";
                                        var setEndpoint =  setters[s].endpoint;
                                        // var setParams = setters[s].params;
                                        var idd = setters[s].id;
                                        //get the schema.org property mapped to this field
                                        for (var f=0; f< properties.length; ++f){
                                            if (properties[f].field == field){
                                                prop = properties[f].property;
                                            }
                                        }

                                        Object.defineProperty(o, prop, {
                                            set: function(newValue) {
                                                console.log("newValue: ", newValue)
                                                this.pro = firebase.database().ref('/apis/'+setEndpoint).once('value').then(function(snapshot) {
                                                obJSON = snapshot.val();
                                                console.log(obJSON)
                                                if (obJSON.oauth2){
                                                    // console.log("oauth2")
                                                    return new Promise((resolve, reject) => {
                                                        // var newWindow = window.open("", null, "height=250,width=600,status=yes,toolbar=no,menubar=no,location=no");

                                                        // newWindow.document.write('<h4> This method requires authentication. Please signup for the API and and provide your client id, client secret and callback url</h4>'
                                                        // +'<table><tr><td><label for="male">Client ID</label></td>'
                                                        // +'<td><input style="width:380px"  type="text" id="cId" value=""></td> </tr>'
                                                        // +'<tr><td><label for="female">Client Secret</label></td>'
                                                        // +'<td><input style="width:380px" type="text" id="cSec" value=""></td></tr>'
                                                        // +'<tr><td><label for="other">Redirect URL</label></td>'
                                                        // +'<td><input style="width:380px"  type="text" id="red" value=""><br><br></td></tr>'
                                                        // +'<tr><td><input id="formBut" type="submit"  value="Submit"></td></tr> </table>'
                                                        // );
                                                        // newWindow.document.getElementById('formBut').addEventListener('click', function(){
                                                            // console.log("C ID: ", newWindow.document.getElementById('cId').value)
                                                            // console.log("C SEC: ", newWindow.document.getElementById('cSec').value)
                                                            // console.log("Red: ", newWindow.document.getElementById('red').value)
                                                            // newWindow.close();
                                                            // let clientID  = newWindow.document.getElementById('cId').value;
                                                            // let clientSec = newWindow.document.getElementById('cSec').value;
                                                            // let callbackUrl  = newWindow.document.getElementById('red').value
                                                            // console.log("auth function");
                                                            auth_url= obJSON.oauth2[0].authURL;
                                                            token_url= obJSON.oauth2[0].tokenURL;
                                                            redirect_url= obJSON.oauth2[0].callbackURL;
                                                            client_id= obJSON.oauth2[0].clientId;
                                                            client_secret= obJSON.oauth2[0].clientSec;
                                                            response_type= obJSON.oauth2[0].resType;
                                                            scope= obJSON.oauth2[0].scope;
                                                            grant_type= obJSON.oauth2[0].grantType;
                                                            client_auth= obJSON.oauth2[0].clientAuth;

                                                                var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                var pollTimer = window.setInterval(function() {
                                                                    try {
                                                                        console.log("url here: ", win.document.URL); //here url
                                                                        if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                            window.clearInterval(pollTimer);
                                                                            var url =   win.document.URL;
                                                                            // acToken =   gup(url, 'code');
                                                                            // tokenType = gup(url, 'token_type');
                                                                            // expiresIn = gup(url, 'expires_in');
                                                                            win.close();
                                                                            resolve(gup(url, 'code'))
                                                                        }
                                                                    } catch(e) {
                                                                        console.log("error in oauth")
                                                                    }
                                                                }, 200);

                                                                function gup(url, name) {
                                                                    name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                    var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                    var regex = new RegExp( regexS );
                                                                    var results = regex.exec( url );
                                                                    if ( results == null )
                                                                        return "";
                                                                    else{
                                                                        return results[1];
                                                                    }
                                                                }//end of gup()
                                                            // }se value
                                                        //});//end of new window

                                                    })//end of promise return
                                                        .then(token=>{
                                                            return new Promise((resolve, reject) => {
                                                            console.log("Token: ",token)
                                                            console.log("Token URL: ",token_url)
                                                            $.ajax({
                                                                url: token_url,
                                                                method: "POST",
                                                                data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                success: function(response) {
                                                                    console.log("response: ",response);
                                                                    //important to check access token and token type (e.g. bearer)
                                                                    tok = response.access_token;
                                                                    console.log("tok: ", tok)
                                                                    resolve('https://scrapir.org/api/'+setEndpoint+'?tokenAPI='+tok+'&'+field+'='+newValue+'&'+idd+'='+idValue)
                                                                },
                                                                error: function(response, jqXHR, textStatus, errorThrown) {
                                                                    console.log("error: ",response);
                                                                }
                                                            })
                                                        })
                                                        // return something
                                                    })

                                                }
                                                else { //no oauth
                                                    // console.log("!!!oauth2")
                                                    result =  'https://scrapir.org/api/'+setEndpoint+'?'+paramList+'&'+pro+'='+newValue+'&id='+identifier
                                                    //console.log("result: ",result);
                                                    return result;
                                                }

                                            })//firebase
                                            .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url)) })   })

                                            }
                                        });
                                    }
                                    }

                                    //***************************** METHODS *********************************/
                                    if (methods){//return here
                                        for (var m=0;  m<methods.length; ++m){
                                            // console.log("method: ", methods[m].name)
                                            var mName = methods[m].name;
                                            var mEndpoint = methods[m].endpoint;
                                            var mParams = methods[m].params;

                                            Object.defineProperty(o, mName.toString(), {
                                                // enumerable: true,
                                                // configurable: true,
                                                value: function(mArgs) {

                                                if(mArgs){
                                                    for (const [key, value] of Object.entries(mArgs)) {
                                                        --paramLen
                                                        console.log(`${key}: ${value}`);
                                                        mParamList+= key
                                                        mParamList+="="
                                                        mParamList+= value
                                                        if (paramLen>0){
                                                            mParamList+="&"
                                                        }
                                                    }
                                                }else{
                                                    mParamList+=mParams[0]
                                                    mParamList+="="
                                                    mParamList+=o[typeId];
                                                }

                                                // console.log("mParamList: ", mParamList)
                                                return firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
                                                obJSON = snapshot.val();
                                                // console.log(obJSON)

                                                if (obJSON.oauth2){
                                                    return new Promise((resolve, reject) => {
                                                        // var newWindow = window.open("", null, "height=250,width=600,status=yes,toolbar=no,menubar=no,location=no");

                                                        // newWindow.document.write('<h4> This method requires authentication. Please signup for the API and and provide your client id, client secret and callback url</h4>'
                                                        // +'<table><tr><td><label for="male">Client ID</label></td>'
                                                        // +'<td><input style="width:380px"  type="text" id="cId" value=""></td> </tr>'
                                                        // +'<tr><td><label for="female">Client Secret</label></td>'
                                                        // +'<td><input style="width:380px" type="text" id="cSec" value=""></td></tr>'
                                                        // +'<tr><td><label for="other">Redirect URL</label></td>'
                                                        // +'<td><input style="width:380px"  type="text" id="red" value=""><br><br></td></tr>'
                                                        // +'<tr><td><input id="formBut" type="submit"  value="Submit"></td></tr> </table>'
                                                        // );

                                                        // newWindow.document.getElementById('formBut').addEventListener('click', function(){
                                                        // newWindow.close();
                                                        // let clientID  = newWindow.document.getElementById('cId').value;
                                                        // let clientSec = newWindow.document.getElementById('cSec').value;
                                                        // let callbackUrl  = newWindow.document.getElementById('red').value
                                                        auth_url= obJSON.oauth2[0].authURL;
                                                        token_url= obJSON.oauth2[0].tokenURL;
                                                        redirect_url= obJSON.oauth2[0].callbackURL;
                                                        client_id= obJSON.oauth2[0].clientId;
                                                        client_secret= obJSON.oauth2[0].clientSec;
                                                        response_type= obJSON.oauth2[0].resType;
                                                        scope= obJSON.oauth2[0].scope;
                                                        grant_type= obJSON.oauth2[0].grantType;
                                                        client_auth= obJSON.oauth2[0].clientAuth;

                                                            var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                            var pollTimer = window.setInterval(function() {
                                                                try {
                                                                    console.log("url here: ", win.document.URL); //here url
                                                                    if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                        window.clearInterval(pollTimer);
                                                                        var url =   win.document.URL;
                                                                        // acToken =   gup(url, 'code');
                                                                        // tokenType = gup(url, 'token_type');
                                                                        // expiresIn = gup(url, 'expires_in');
                                                                        win.close();
                                                                        resolve(gup(url, 'code'))
                                                                    }
                                                                } catch(e) {
                                                                    console.log("error in oauth")
                                                                }
                                                            }, 200);

                                                            function gup(url, name) {
                                                                name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                var regex = new RegExp( regexS );
                                                                var results = regex.exec( url );
                                                                if ( results == null )
                                                                    return "";
                                                                else{
                                                                    return results[1];
                                                                }
                                                            }//end of gup()
                                                            // }se value
                                                       // });//end of new window

                                                    })//end of promise return
                                                    .then(token=>{
                                                        return new Promise((resolve, reject) => {
                                                                console.log("Token: ",token)
                                                                console.log("Token URL: ",token_url)
                                                                $.ajax({
                                                                    url: token_url,
                                                                    method: "POST",
                                                                    data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                    success: function(response) {
                                                                        console.log("response: ",response);
                                                                        //important to check access token and token type (e.g. bearer)
                                                                        tok = response.access_token;
                                                                        console.log("tok: ", tok)
                                                                        resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                    },
                                                                    error: function(response, jqXHR, textStatus, errorThrown) {
                                                                        console.log("error: ",response);
                                                                    }
                                                                })
                                                            })
                                                        })

                                                }else { //no oauth
                                                    // console.log("!!!oauth2")
                                                    result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                                    return result;
                                                }

                                                })//firebase
                                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })

                                            }////////////


                                            });
                                        //   });

                                        }//loop to create methods
                                    }

                                    //remove the response fields that are not mapped to the schema.org type properties
                                    var keys = Object.keys(o)
                                    for (var k=0; k<keys.length; ++k){
                                        if (!fields.includes(keys[k])){
                                            delete o[keys[k]];
                                        }
                                    }
                                }//end of else of no array

                                return o;
                            })
                            // return obj;
                        };//end of self function

                        window[site][type]['create'] = function(args) { return create(val, args) };

                        function create(typeOb, args){

                            let createEndpoint =  typeOb.add.endpoint;
                            console.log("createEndpoint: ", createEndpoint)
                            console.log("args: ", args)

                            return firebase.database().ref('/apis/'+createEndpoint).once('value').then(function(snapshot) {
                                obJSON = snapshot.val();

                                let paramNames = []
                                let mParamList =""

                                for(let p in obJSON.parameters){
                                    paramNames.push(obJSON.parameters[p].name)
                                }

                                var paramLen = Object.entries(args).length;
                                for (const [key, value] of Object.entries(args)) {
                                    --paramLen
                                    // if(paramNames.indexOf(key) != -1){//check if the param is correct
                                        console.log(`${key}: ${value}`);
                                        mParamList+= key
                                        mParamList+="="
                                        mParamList+= value
                                        if (paramLen>0){
                                            mParamList+="&"
                                        }
                                    // }
                                }
                                if(mParamList.endsWith("&")){
                                    mParamList = mParamList.slice(0, -1);
                                }

                                if (obJSON.oauth2){
                                    return new Promise((resolve, reject) => {
                                        // var newWindow = window.open("", null, "height=250,width=600,status=yes,toolbar=no,menubar=no,location=no");

                                        // newWindow.document.write('<h4> This method requires authentication. Please signup for the API and and provide your client id, client secret and callback url</h4>'
                                        // +'<table><tr><td><label for="male">Client ID</label></td>'
                                        // +'<td><input style="width:380px"  type="text" id="cId" value=""></td> </tr>'
                                        // +'<tr><td><label for="female">Client Secret</label></td>'
                                        // +'<td><input style="width:380px" type="text" id="cSec" value=""></td></tr>'
                                        // +'<tr><td><label for="other">Redirect URL</label></td>'
                                        // +'<td><input style="width:380px"  type="text" id="red" value=""><br><br></td></tr>'
                                        // +'<tr><td><input id="formBut" type="submit"  value="Submit"></td></tr> </table>'
                                        // );

                                        // newWindow.document.getElementById('formBut').addEventListener('click', function(){
                                        // newWindow.close();
                                        // let clientID  = newWindow.document.getElementById('cId').value;
                                        // let clientSec = newWindow.document.getElementById('cSec').value;
                                        // let callbackUrl  = newWindow.document.getElementById('red').value
                                        console.log("auth function");
                                        auth_url= obJSON.oauth2[0].authURL;
                                        token_url= obJSON.oauth2[0].tokenURL;
                                        redirect_url= obJSON.oauth2[0].callbackURL;
                                        client_id= obJSON.oauth2[0].clientId;
                                        client_secret= obJSON.oauth2[0].clientSec;
                                        response_type= obJSON.oauth2[0].resType;
                                        scope= obJSON.oauth2[0].scope;
                                        grant_type= obJSON.oauth2[0].grantType;
                                        client_auth= obJSON.oauth2[0].clientAuth;

                                            var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                            var pollTimer = window.setInterval(function() {
                                                try {
                                                    console.log("url here: ", win.document.URL); //here url
                                                    if (win.document.URL.indexOf(redirect_url) != -1) {
                                                        window.clearInterval(pollTimer);
                                                        var url =   win.document.URL;
                                                        // acToken =   gup(url, 'code');
                                                        // tokenType = gup(url, 'token_type');
                                                        // expiresIn = gup(url, 'expires_in');
                                                        win.close();
                                                        resolve(gup(url, 'code'))
                                                    }
                                                } catch(e) {
                                                    console.log("error in oauth")
                                                }
                                            }, 200);

                                            function gup(url, name) {
                                                name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                var regexS = "[\?&]"+name+"=([^&#]*)";
                                                var regex = new RegExp( regexS );
                                                var results = regex.exec( url );
                                                if ( results == null )
                                                    return "";
                                                else{
                                                    return results[1];
                                                }
                                            }//end of gup()
                                            // }se value

                                        //});//end of new window

                                    })//end of promise return
                                    .then(token=>{
                                        return new Promise((resolve, reject) => {
                                            console.log("Token: ",token)
                                            console.log("Token URL: ",token_url)
                                            $.ajax({
                                                url: token_url,
                                                method: "POST",
                                                data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                success: function(response) {
                                                    console.log("response: ",response);
                                                    //important to check access token and token type (e.g. bearer)
                                                    tok = response.access_token;
                                                    console.log("tok: ", tok)
                                                    resolve('https://scrapir.org/api/'+createEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                },
                                                error: function(response, jqXHR, textStatus, errorThrown) {
                                                    console.log("error: ",response);
                                                }
                                            })
                                        })
                                    })

                                }else { //no oauth
                                    // console.log("!!!oauth2")
                                    result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                    return result;
                                }

                            })//firebase

                            .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                        }//add

                    }//loop through site's object

                }//if objects

                if (siteKey == "functions"){
                    for (var v=0; v< siteVal.length; ++v) {
                        // console.log("siteVal[v]: ", siteVal[v])
                        let funcName = "search";//siteVal[v].name;
                        let mEndpoint = siteVal[v].endpoint;
                        let mObject = siteVal[v].object;
                        let mParamList="";
                        let mID = siteVal[v].id;//id of the object
                        let mSearchParam = siteVal[v].searchParam;//search term
                        let properties=[], fields=[];

                        firebase.database().ref('/abstractions/'+site+'/objects/'+mObject+'/properties').once('value').then(function(snapshot) {
                            snapshot.forEach(function(childSnapshot) {
                                properties.push(childSnapshot.val())
                            })
                        }).then(()=>{
                            for (var f=0; f< properties.length; ++f){
                                if (properties[f].field != undefined){
                                    fields.push(properties[f].property)
                                }
                            }
                        })

                        window[site][funcName] = function(...mArgs) { return siteFunction(...mArgs) };

                        function siteFunction(...mArgs) {

                            return firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
                            obJSON = snapshot.val();

                            let paramNames = []
                            for(let p in obJSON.parameters){
                                paramNames.push(obJSON.parameters[p].name)
                            }
                            paramNames.push('numResults');
                            paramNames.push('apiKey');

                            //check that the parameters passed are correct
                            if(typeof mArgs[0] === 'object' && mArgs[0] !== null){
                                var hasKeywords=false;
                                var otherArgs = mArgs[0];
                            }else{
                                var hasKeywords=true;
                                var keywords = mArgs[0];
                                var otherArgs = mArgs[1];
                            }

                            //search keywords
                            if(hasKeywords){//if there is a
                                mParamList+= mSearchParam;
                                mParamList+="=";
                                mParamList+= keywords;
                            }
                            //other parameters (e.g. sort)
                            if(otherArgs){
                                if(hasKeywords){
                                    mParamList+="&"
                                }
                                var paramLen = Object.entries(otherArgs).length;
                                for (const [key, value] of Object.entries(otherArgs)) {
                                    --paramLen
                                    var keyVal=""
                                    if(key=='numresults'){//mavo lower case the letters
                                        keyVal = 'numResults'
                                    }else if(key=='apikey'){//mavo lower case the letters
                                        keyVal = 'apiKey'
                                    }else{
                                        keyVal= key
                                    }
                                    if(paramNames.indexOf(keyVal) != -1){//check if the param is correct
                                        console.log(`${keyVal}: ${value}`);
                                        mParamList+= keyVal
                                        mParamList+="="
                                        mParamList+= value
                                        if (paramLen>0){
                                            mParamList+="&"
                                        }
                                    }
                                }
                                if(mParamList.endsWith("&")){
                                    mParamList = mParamList.slice(0, -1);
                                }
                            }


                            if (obJSON.oauth2){
                                // console.log("oauth2")
                                var tokenPromise;
                                var sTokens = JSON.parse(localStorage.getItem('tokens'));
                                console.log(sTokens)
                                const elementsIndex = sTokens.findIndex(element => element.site == site)
                                console.log("sTokens[elementsIndex]: ", sTokens[elementsIndex].token)
                                if (sTokens[elementsIndex].token!=""){
                                            tokenPromise= new Promise((resolve, reject) => {resolve(sTokens[elementsIndex].token)})
                                            .then(token=>{
                                                return new Promise((resolve, reject) => {
                                                    console.log("Token: ",token)
                                                    $.ajax({
                                                        url: token_url,
                                                        method: "POST",
                                                        data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                        success: function(response) {
                                                            console.log("response: ",response);
                                                            tok = response.access_token;
                                                            expires_in = response.expires_in;
                                                            console.log("tok: ", tok)
                                                            console.log("expires_in: ", expires_in)
                                                            // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                            // console.log("tokens: ", localStorage.getItem('tokens'));
                                                            //const elementsIndex = this.sTokens.findIndex(element => element.site == site)
                                                            let newArray = [...sTokens]
                                                            newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                            newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                            // this.setState({newArray});

                                                            localStorage.setItem('tokens', JSON.stringify(newArray));
                                                            console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))

                                                            resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                        },
                                                        error: function(response, jqXHR, textStatus, errorThrown) {
                                                            console.log("error: ",response);
                                                        }
                                                    })
                                                })
                                            })
                                        }
                                        else {
                                            tokenPromise= new Promise((resolve, reject) => {
                                                console.log("auth function");
                                                auth_url= obJSON.oauth2[0].authURL;
                                                token_url= obJSON.oauth2[0].tokenURL;
                                                redirect_url= obJSON.oauth2[0].callbackURL;
                                                client_id= obJSON.oauth2[0].clientId;
                                                client_secret= obJSON.oauth2[0].clientSec;
                                                response_type= obJSON.oauth2[0].resType;
                                                scope= obJSON.oauth2[0].scope;
                                                grant_type= obJSON.oauth2[0].grantType;
                                                client_auth= obJSON.oauth2[0].clientAuth;

                                                var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                var pollTimer = window.setInterval(function() {
                                                    try {
                                                        console.log("url here: ", win.document.URL); //here url
                                                        if (win.document.URL.indexOf(redirect_url) != -1) {
                                                            window.clearInterval(pollTimer);
                                                            var url =   win.document.URL;
                                                            acToken =   gup(url, 'code');
                                                            resolve(acToken)
                                                            // tokenType = gup(url, 'token_type');
                                                            // expiresIn = gup(url, 'expires_in');
                                                            win.close();
                                                        }
                                                    } catch(e) {
                                                        console.log("error in oauth")
                                                    }
                                                }, 200);

                                                function gup(url, name) {
                                                    name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                    var regexS = "[\?&]"+name+"=([^&#]*)";
                                                    var regex = new RegExp( regexS );
                                                    var results = regex.exec( url );
                                                    if ( results == null )
                                                        return "";
                                                    else
                                                        return results[1];
                                                }//end of gup()

                                            })
                                            .then(token=>{
                                                return new Promise((resolve, reject) => {
                                                    console.log("Token: ",token)
                                                    $.ajax({
                                                        url: token_url,
                                                        method: "POST",
                                                        data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                        success: function(response) {
                                                            console.log("response: ",response);
                                                            tok = response.access_token;
                                                            expires_in = response.expires_in;
                                                            console.log("tok: ", tok)
                                                            console.log("expires_in: ", expires_in)
                                                            // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                            // console.log("tokens: ", localStorage.getItem('tokens'));
                                                            let newArray = [...sTokens]
                                                            newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                            newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                            // this.setState({newArray});

                                                            localStorage.setItem('tokens', JSON.stringify(newArray));
                                                            console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))


                                                            resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                        },
                                                        error: function(response, jqXHR, textStatus, errorThrown) {
                                                            console.log("error: ",response);
                                                        }
                                                    })
                                                })
                                            })
                                        }

                                return tokenPromise


                            }
                            else { //no oauth
                                // console.log("!!!oauth2")
                                result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                return result;
                            }

                            })//firebase
                            .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                            .then(o => {
                                let otherFields = []
                                let once=true;
                                let onceAll = true;
                                // console.log("result: ", o)
                                // console.log("properties!!! ", properties)
                                //map response to class properties
                                if (o.constructor === Array){
                                    // console.log("ARRAY");
                                    o.forEach(function(ob) {//for each object
                                        once=true;
                                        onceAll = true;

                                        for (var p=0; p<properties.length; ++p){
                                            if (properties[p].field){// it won't check type properties (e.g. comment for VideoObject)
                                                if (properties[p].property != properties[p].field && ob[properties[p].field]) {
                                                    Object.defineProperty(ob, properties[p].property, Object.getOwnPropertyDescriptor(ob, properties[p].field));
                                                    delete ob[properties[p].field];
                                                }
                                                else if(ob[properties[p].field]===undefined){// field is not returned with Search but it's retunred in Get
                                                // console.log(properties[p].field)
                                                    let propType = properties[p].property;
                                                    let searchID = ob[mID];
                                                    if(otherFields.indexOf(propType) == -1){
                                                        otherFields.push(propType)//otherFields contains the fields in Get but returned by Search
                                                    }

                                                    if(once){
                                                        once=false;
                                                        Object.defineProperty(ob, 'other', { //other contains an object
                                                            get: function() {
                                                                let promise = firebase.database().ref('/abstractions/'+site+'/objects/'+mObject).once('value').then(function(snapshot) {
                                                                    // console.log("typeOb4: ", snapshot.val())
                                                                    return self(snapshot.key, snapshot.val(), "self", propType, searchID);
                                                                });
                                                                return promise;
                                                            }
                                                        });//end of getter
                                                    }
                                                }

                                            }else{ //if(properties[p].type)//if the property is a type
                                                let propType = properties[p].property;
                                                let typeName = properties[p].type;
                                                let idVal = ob[mID];

                                                Object.defineProperty(ob, propType, {
                                                    get: function() {
                                                        let promise = firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                                            // console.log("typeOb2: ", snapshot.val())
                                                            // return self(snapshot.val(), type, propType, ob[typeId]);
                                                            return self(snapshot.key, snapshot.val(), mObject, propType, idVal);
                                                        });
                                                        return promise;
                                                    }
                                                });//end of getter

                                            }

                                            //Add the other fields in Get but not in Search to the Search
                                            if(onceAll){
                                                onceAll=false;
                                                for (let f in otherFields) {

                                                    Object.defineProperty(ob, otherFields[f], {
                                                        get:function() {
                                                            return ob['other'].then(data=>{
                                                                return data[otherFields[f]];
                                                            })
                                                        }
                                                    });//end of getter
                                                }
                                            }
                                        }//for loop


                                        //add the siteName property
                                        Object.defineProperty(ob, "siteName", {
                                            value: site,
                                            writable: false
                                        });



                                    //***************************** METHODS *********************************/
                                    if (methods){
                                        for (var m=0;  m<methods.length; ++m){
                                            var mName = methods[m].name;
                                            var mEndpoint = methods[m].endpoint;
                                            var mParams = methods[m].params;

                                            Object.defineProperty(ob, mName.toString(), { value: function(...mArgs) {
                                                if (mArgs.length>0){
                                                    if (mParams){
                                                        for (var p=0; p<mParams.length; ++p){
                                                                mParamList+=mParams[p]//`${key}`
                                                                mParamList+="="
                                                                mParamList+=mArgs[p]//THIS ASSUMES THAT id value will be sent
                                                            if (p+1<mParams.length){
                                                                mParamList+="&"
                                                            }
                                                        }
                                                    }
                                                }
                                                else {
                                                    // console.log("methods[m]:2 ", ob.imageId)
                                                    // let elemIndexM = properties.findIndex(element => element.field == methods[m].params[0])
                                                    // let endpointM = properties[elemIndexM].property;
                                                    // console.log("HERE: ", ob[endpointM])
                                                    mParamList+=mParams[0]
                                                    mParamList+="="
                                                    mParamList+=ob[mParams[0]]
                                                }

                                                console.log("mParamList: ", mParamList)
                                                return firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
                                                obJSON = snapshot.val();
                                                //console.log(obJSON)

                                                if (obJSON.oauth2){
                                                    // console.log("oauth2")
                                                    var tokenPromise;
                                                    var sTokens = JSON.parse(localStorage.getItem('tokens'));
                                                    console.log(sTokens)
                                                    const elementsIndex = sTokens.findIndex(element => element.site == site)
                                                    console.log("sTokens[elementsIndex]: ", sTokens[elementsIndex].token)
                                                    if (sTokens[elementsIndex].token!=""){
                                                                tokenPromise= new Promise((resolve, reject) => {resolve(sTokens[elementsIndex].token)})
                                                                .then(token=>{
                                                                    return new Promise((resolve, reject) => {
                                                                        console.log("Token: ",token)
                                                                        $.ajax({
                                                                            url: token_url,
                                                                            method: "POST",
                                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                            success: function(response) {
                                                                                console.log("response: ",response);
                                                                                tok = response.access_token;
                                                                                expires_in = response.expires_in;
                                                                                console.log("tok: ", tok)
                                                                                console.log("expires_in: ", expires_in)
                                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                //const elementsIndex = this.sTokens.findIndex(element => element.site == site)
                                                                                let newArray = [...sTokens]
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                // this.setState({newArray});

                                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))

                                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                            },
                                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                console.log("error: ",response);
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }
                                                            else {
                                                                tokenPromise= new Promise((resolve, reject) => {
                                                                    console.log("auth function");
                                                                    auth_url= obJSON.oauth2[0].authURL;
                                                                    token_url= obJSON.oauth2[0].tokenURL;
                                                                    redirect_url= obJSON.oauth2[0].callbackURL;
                                                                    client_id= obJSON.oauth2[0].clientId;
                                                                    client_secret= obJSON.oauth2[0].clientSec;
                                                                    response_type= obJSON.oauth2[0].resType;
                                                                    scope= obJSON.oauth2[0].scope;
                                                                    grant_type= obJSON.oauth2[0].grantType;
                                                                    client_auth= obJSON.oauth2[0].clientAuth;

                                                                    var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                    var pollTimer = window.setInterval(function() {
                                                                        try {
                                                                            console.log("url here: ", win.document.URL); //here url
                                                                            if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                                window.clearInterval(pollTimer);
                                                                                var url =   win.document.URL;
                                                                                acToken =   gup(url, 'code');
                                                                                resolve(acToken)
                                                                                // tokenType = gup(url, 'token_type');
                                                                                // expiresIn = gup(url, 'expires_in');
                                                                                win.close();
                                                                            }
                                                                        } catch(e) {
                                                                            console.log("error in oauth")
                                                                        }
                                                                    }, 200);

                                                                    function gup(url, name) {
                                                                        name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                        var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                        var regex = new RegExp( regexS );
                                                                        var results = regex.exec( url );
                                                                        if ( results == null )
                                                                            return "";
                                                                        else
                                                                            return results[1];
                                                                    }//end of gup()

                                                                })
                                                                .then(token=>{
                                                                    return new Promise((resolve, reject) => {
                                                                        console.log("Token: ",token)
                                                                        $.ajax({
                                                                            url: token_url,
                                                                            method: "POST",
                                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                            success: function(response) {
                                                                                console.log("response: ",response);
                                                                                tok = response.access_token;
                                                                                expires_in = response.expires_in;
                                                                                console.log("tok: ", tok)
                                                                                console.log("expires_in: ", expires_in)
                                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                let newArray = [...sTokens]
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                // this.setState({newArray});

                                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))


                                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                            },
                                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                console.log("error: ",response);
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }

                                                    return tokenPromise


                                                }
                                                else { //no oauth
                                                    // console.log("!!!oauth2")
                                                    result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                                    return result;
                                                }

                                                })//firebase
                                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                                            }
                                            });
                                        //   });

                                        }//loop to create methods
                                    }

                                    });//loop over array of objects


                                    //remove the response fields that are not mapped to the schema.org type properties
                                    var keys = Object.keys(o[0])
                                    for (var k=0; k<keys.length; ++k){
                                        if (!fields.includes(keys[k])){
                                            o.forEach(function(ob) {
                                                delete ob[keys[k]];
                                            })
                                        }
                                    }

                                }
                                else {
                                    // console.log("NOT ARRAY")
                                    for (var p=0; p<properties.length; ++p){
                                        if (properties[p].field){// it won't check type properties (e.g. comment for VideoObject)
                                            if (properties[p].property != properties[p].field && o[properties[p].field]) {
                                                Object.defineProperty(o, properties[p].property,Object.getOwnPropertyDescriptor(o, properties[p].field));
                                                delete o[properties[p].field];
                                            }
                                        }
                                        else { //if the property is a type
                                            let propType = properties[p].property;
                                            let typeName = properties[p].type;
                                            let idVal = o[mID]

                                            // creat a getter for property of type Type
                                            Object.defineProperty(o, propType, {
                                                get: function() {
                                                    let promise = firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                                        // console.log("typeOb3: ", snapshot.val())
                                                        return self(snapshot.key, snapshot.val(), mObject, propType, idVal);
                                                    });
                                                    return promise;
                                                }
                                            });

                                        }
                                    }//end of for loop properties

                                    //***************************** METHODS *********************************/
                                    if (methods){
                                        for (var m=0;  m<methods.length; ++m){
                                            // console.log("methods[m]: ", methods[m].name)
                                            var mName = methods[m].name;
                                            var mEndpoint = methods[m].endpoint;
                                            var mParams = methods[m].params;

                                            Object.defineProperty(o, mName.toString(), { value: function(...mArgs) {
                                                if (mParams){
                                                    for (var p=0; p<mParams.length; ++p){
                                                        //Object.entries(mParams[p]).forEach(([key, value]) => {
                                                            mParamList+=mParams[p]//`${key}`
                                                            mParamList+="="
                                                            mParamList+=mArgs[p]
                                                        // });
                                                        if (p+1<mParams.length){
                                                            mParamList+="&"
                                                        }
                                                    }
                                                }
                                                console.log("mParamList: ", mParamList)
                                                return firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
                                                obJSON = snapshot.val();
                                                console.log(obJSON)

                                                if (obJSON.oauth2){
                                                    // console.log("oauth2")

                                                    var tokenPromise;
                                                    var sTokens = JSON.parse(localStorage.getItem('tokens'));
                                                    console.log(sTokens)
                                                    const elementsIndex = sTokens.findIndex(element => element.site == site)
                                                    console.log("sTokens[elementsIndex]: ", sTokens[elementsIndex].token)
                                                    if (sTokens[elementsIndex].token!=""){
                                                                tokenPromise= new Promise((resolve, reject) => {resolve(sTokens[elementsIndex].token)})
                                                                .then(token=>{
                                                                    return new Promise((resolve, reject) => {
                                                                        console.log("Token: ",token)
                                                                        $.ajax({
                                                                            url: token_url,
                                                                            method: "POST",
                                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                            success: function(response) {
                                                                                console.log("response: ",response);
                                                                                tok = response.access_token;
                                                                                expires_in = response.expires_in;
                                                                                console.log("tok: ", tok)
                                                                                console.log("expires_in: ", expires_in)
                                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                //const elementsIndex = this.sTokens.findIndex(element => element.site == site)
                                                                                let newArray = [...sTokens]
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                // this.setState({newArray});

                                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))

                                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                            },
                                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                console.log("error: ",response);
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }
                                                            else {
                                                                tokenPromise= new Promise((resolve, reject) => {
                                                                    console.log("auth function");
                                                                    auth_url= obJSON.oauth2[0].authURL;
                                                                    token_url= obJSON.oauth2[0].tokenURL;
                                                                    redirect_url= obJSON.oauth2[0].callbackURL;
                                                                    client_id= obJSON.oauth2[0].clientId;
                                                                    client_secret= obJSON.oauth2[0].clientSec;
                                                                    response_type= obJSON.oauth2[0].resType;
                                                                    scope= obJSON.oauth2[0].scope;
                                                                    grant_type= obJSON.oauth2[0].grantType;
                                                                    client_auth= obJSON.oauth2[0].clientAuth;

                                                                    var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                    var pollTimer = window.setInterval(function() {
                                                                        try {
                                                                            console.log("url here: ", win.document.URL); //here url
                                                                            if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                                window.clearInterval(pollTimer);
                                                                                var url =   win.document.URL;
                                                                                acToken =   gup(url, 'code');
                                                                                resolve(acToken)
                                                                                // tokenType = gup(url, 'token_type');
                                                                                // expiresIn = gup(url, 'expires_in');
                                                                                win.close();
                                                                            }
                                                                        } catch(e) {
                                                                            console.log("error in oauth")
                                                                        }
                                                                    }, 200);

                                                                    function gup(url, name) {
                                                                        name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                        var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                        var regex = new RegExp( regexS );
                                                                        var results = regex.exec( url );
                                                                        if ( results == null )
                                                                            return "";
                                                                        else
                                                                            return results[1];
                                                                    }//end of gup()

                                                                })
                                                                .then(token=>{
                                                                    return new Promise((resolve, reject) => {
                                                                        console.log("Token: ",token)
                                                                        $.ajax({
                                                                            url: token_url,
                                                                            method: "POST",
                                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                            success: function(response) {
                                                                                console.log("response: ",response);
                                                                                tok = response.access_token;
                                                                                expires_in = response.expires_in;
                                                                                console.log("tok: ", tok)
                                                                                console.log("expires_in: ", expires_in)
                                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                let newArray = [...sTokens]
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                // this.setState({newArray});

                                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))


                                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                            },
                                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                console.log("error: ",response);
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }

                                                    return tokenPromise


                                                }
                                                else { //no oauth
                                                    // console.log("!!!oauth2")
                                                    result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                                    return result;
                                                }

                                                })//firebase
                                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                                            }
                                            });
                                        //   });

                                        }//loop to create methods
                                    }
                                    //remove the fields that are not in the class
                                    var keys = Object.keys(o)
                                    for (var k=0; k<keys.length; ++k){
                                        if (!fields.includes(keys[k])){
                                            delete o[keys[k]];
                                        }
                                    }
                                }//end of else of no array

                                return o;
                            })

                        }


                        function self (typekey, typeOb, caller, prop, ...args) {
                            // console.log("typeOb:", typeOb)
                            // console.log("caller:", caller)
                            // console.log("callerTYPE:", typekey)
                            // console.log("typeId: ", typeOb.id)
                            // console.log("args: ", args)

                            currentType = typekey;

                            // console.log("prop:", prop)

                            if (prop == "none"){
                                let endpoint = typeOb.construct[caller].endpoint;
                                let params = typeOb.construct[caller].input;
                                // var typeId = typeOb.id
                                // console.log("typeId1: ", typeId)
                            }
                            else if(Array.isArray(typeOb.construct[caller])){
                                // let arrEndpoints= typeOb.construct[caller];
                                // var elemIndex = arrEndpoints[0]//.findIndex(element => element.property == prop)
                                var endpoint = typeOb.construct[caller][0].endpoint;
                                var params = typeOb.construct[caller][0].input;
                            }else{
                                let arrEndpoints= typeOb.construct[caller];
                                // console.log("arrEndpoints: ", arrEndpoints)
                                let endpoint = typeOb.construct[caller].endpoint;
                                let params = typeOb.construct[caller].input;



                                var typeId = typeOb.construct[caller].id;
                                // console.log("endpoint: ", endpoint)
                            }

                            var idValue = args[0];
                            var typeId = typeOb.id;
                            var properties = typeOb.properties;
                            var getters = typeOb.getters;
                            var setters = typeOb.setters;
                            var methods = typeOb.methods;
                            var fields=[], paramList="", mParamList="";

                            if (params){
                                for (var p=0; p<params.length; ++p){
                                    Object.entries(params[p]).forEach(([key, value]) => {
                                        paramList+=`${key}`
                                        paramList+="="
                                        paramList+=args[p]
                                    });
                                    if (p+1<params.length){
                                        paramList+="&"
                                    }
                                }
                            }

                            for (var f=0; f< properties.length; ++f){
                                if (properties[f].field != undefined){
                                    fields.push(properties[f].property)
                                }
                            }

                            // var obj={};
                            // return new Promise(function(resolve, reject) {resolve(fetch('https://scrapir.org/api/'+endpoint+'?'+paramList+'&Number of Results=2').then(response => response.json())) }).then(o => {
                            return firebase.database().ref('/apis/'+endpoint).once('value').then(function(snapshot) {
                                obJSON = snapshot.val();
                                // if (obJSON.oauth2){
                                //     // console.log("oauth2")
                                //     return new Promise((resolve, reject) => {
                                //     console.log("auth function");
                                //         auth_url= obJSON.oauth2[0].authURL;
                                //         token_url= obJSON.oauth2[0].tokenURL;
                                //         redirect_url= obJSON.oauth2[0].callbackURL;
                                //         client_id= obJSON.oauth2[0].clientId;
                                //         client_secret= obJSON.oauth2[0].clientSec;
                                //         response_type= obJSON.oauth2[0].resType;
                                //         scope= obJSON.oauth2[0].scope;
                                //         grant_type= obJSON.oauth2[0].grantType;
                                //         client_auth= obJSON.oauth2[0].clientAuth;

                                //         var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                //         //while(acToken === undefined){
                                //         var pollTimer = window.setInterval(function() {
                                //             try {
                                //                 console.log("url here: ", win.document.URL); //here url
                                //                 if (win.document.URL.indexOf(redirect_url) != -1) {
                                //                     window.clearInterval(pollTimer);
                                //                     var url =   win.document.URL;
                                //                     acToken =   gup(url, 'code');
                                //                     resolve(acToken)
                                //                     // tokenType = gup(url, 'token_type');
                                //                     // expiresIn = gup(url, 'expires_in');
                                //                     win.close();
                                //                     // return validateToken(acToken)
                                //                 }
                                //             } catch(e) {
                                //                 console.log("error in oauth")
                                //             }
                                //         }, 200);

                                //         function gup(url, name) {
                                //             name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                //             var regexS = "[\?&]"+name+"=([^&#]*)";
                                //             var regex = new RegExp( regexS );
                                //             var results = regex.exec( url );
                                //             if ( results == null )
                                //                 return "";
                                //             else
                                //                 return results[1];
                                //         }//end of gup()

                                //     })
                                //     .then(token=>{
                                //         return new Promise((resolve, reject) => {
                                //         console.log("Token: ",token)
                                //         console.log("Token URL: ",token_url)
                                //         $.ajax({
                                //             url: token_url,
                                //             method: "POST",
                                //             data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                //             success: function(response) {
                                //                 console.log("response: ",response);
                                //                 //important to check access token and token type (e.g. bearer)
                                //                 tok = response.access_token;
                                //                 console.log("tok: ", tok)
                                //                 resolve('https://scrapir.org/api/'+endpoint+'?tokenAPI='+tok)
                                //                 //console.log("result: ",result);
                                //                 //return result;
                                //             },
                                //             error: function(response, jqXHR, textStatus, errorThrown) {
                                //                 console.log("error: ",response);
                                //             }
                                //         })
                                //     })
                                //     // return something
                                //     })

                                // }
                                // else { //no oauth
                                    // console.log("NOT oauth2")
                                    result =  'https://scrapir.org/api/'+endpoint+'?'+paramList
                                    return result;
                                // }
                            })//firebase
                            .then(url => { return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                            .then(o => {
                                // console.log("result: ", o)
                                //map response to class properties
                                if (o.constructor === Array){
                                    // console.log("ARRAY");
                                    o.forEach(function(ob) {
                                        for (var p=0; p<properties.length; ++p){
                                            if (properties[p].field){// it won't check type properties (e.g. comment for VideoObject)
                                                if (properties[p].property != properties[p].field && ob[properties[p].field]) {
                                                    Object.defineProperty(ob, properties[p].property, Object.getOwnPropertyDescriptor(ob, properties[p].field));
                                                    delete ob[properties[p].field];
                                                }
                                            }
                                            else { //if the property is a type
                                                let propType = properties[p].property;
                                                let typeName = properties[p].type;

                                                Object.defineProperty(ob, propType, {
                                                    get: function() {
                                                        let promise = firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                                            console.log("typeOb4: ", snapshot.val())
                                                            // return self(snapshot.val(), type, propType, ob[typeId]);
                                                            return self(snapshot.key, snapshot.val(), currentType, propType, ob[typeId]);
                                                        });
                                                        return promise;
                                                    }
                                                });//end of getter

                                            }
                                        }

                                        //***************************** SETTERS *********************************/
                                        for (s in setters){
                                            // console.log("setter: ", setters[s])
                                            var field = setters[s].field; //API endpoint field to be set
                                            var prop;
                                            var setEndpoint =  setters[s].endpoint;
                                            var setParams = setters[s].params;
                                            var idd = setters[s].id;
                                            //get the schema.org property mapped to this field
                                            for (var f=0; f< properties.length; ++f){
                                                if (properties[f].field == field){
                                                    prop = properties[f].property;
                                                }
                                            }

                                            Object.defineProperty(ob, prop, {
                                                enumerable: true,
                                                set: function(newValue) {
                                                    console.log("newValue: ", newValue)
                                                    this.pro = firebase.database().ref('/apis/'+setEndpoint).once('value').then(function(snapshot) {
                                                    obJSON = snapshot.val();
                                                    console.log(obJSON)
                                                    if (obJSON.oauth2){
                                                        // console.log("oauth2")
                                                        return new Promise((resolve, reject) => {
                                                                // console.log("auth function");
                                                                auth_url= obJSON.oauth2[0].authURL;
                                                                token_url= obJSON.oauth2[0].tokenURL;
                                                                redirect_url= obJSON.oauth2[0].callbackURL;
                                                                client_id= obJSON.oauth2[0].clientId;
                                                                client_secret= obJSON.oauth2[0].clientSec;
                                                                response_type= obJSON.oauth2[0].resType;
                                                                scope= obJSON.oauth2[0].scope;
                                                                grant_type= obJSON.oauth2[0].grantType;
                                                                client_auth= obJSON.oauth2[0].clientAuth;

                                                                var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                var pollTimer = window.setInterval(function() {
                                                                    try {
                                                                        console.log("url here: ", win.document.URL); //here url
                                                                        if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                            window.clearInterval(pollTimer);
                                                                            var url =   win.document.URL;
                                                                            acToken =   gup(url, 'code');
                                                                            resolve(acToken)
                                                                            // tokenType = gup(url, 'token_type');
                                                                            // expiresIn = gup(url, 'expires_in');
                                                                            win.close();
                                                                            // return validateToken(acToken)
                                                                        }
                                                                    } catch(e) {
                                                                        console.log("error in oauth")
                                                                    }
                                                                }, 200);

                                                                function gup(url, name) {
                                                                    name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                    var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                    var regex = new RegExp( regexS );
                                                                    var results = regex.exec( url );
                                                                    if ( results == null )
                                                                        return "";
                                                                    else
                                                                        return results[1];
                                                                }//end of gup()

                                                            })
                                                            .then(token=>{
                                                                return new Promise((resolve, reject) => {
                                                                console.log("Token: ",token)
                                                                console.log("Token URL: ",token_url)
                                                                $.ajax({
                                                                    url: token_url,
                                                                    method: "POST",
                                                                    data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                    success: function(response) {
                                                                        console.log("response: ",response);
                                                                        //important to check access token and token type (e.g. bearer)
                                                                        tok = response.access_token;
                                                                        console.log("tok: ", tok)
                                                                        resolve('https://scrapir.org/api/'+setEndpoint+'?tokenAPI='+tok+'&'+field+'='+newValue+'&'+idd+'='+idValue)
                                                                    },
                                                                    error: function(response, jqXHR, textStatus, errorThrown) {
                                                                        console.log("error: ",response);
                                                                    }
                                                                })
                                                            })
                                                            // return something
                                                            })

                                                    }
                                                    else { //no oauth
                                                        // console.log("!!!oauth2")
                                                        result =  'https://scrapir.org/api/'+setEndpoint+'?'+paramList+'&'+pro+'='+newValue+'&id='+identifier
                                                        //console.log("result: ",result);
                                                        return result;
                                                    }

                                                })//firebase
                                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url)) })   })

                                                }
                                            });
                                        }

                                        //***************************** METHODS *********************************/
                                    if (methods){
                                        for (var m=0;  m<methods.length; ++m){
                                            var mName = methods[m].name;
                                            var mEndpoint = methods[m].endpoint;
                                            var mParams = methods[m].params;

                                            // add the imageId
                                            Object.defineProperty(ob, mName.toString(), { value: function(...mArgs) {
                                                if (mArgs.length>0){
                                                    if (mParams){
                                                        for (var p=0; p<mParams.length; ++p){
                                                            //Object.entries(mParams[p]).forEach(([key, value]) => {
                                                                mParamList+=mParams[p]//`${key}`
                                                                mParamList+="="
                                                                mParamList+=mArgs[p]//THIS ASSUMES THAT id value will be sent
                                                            // });
                                                            if (p+1<mParams.length){
                                                                mParamList+="&"
                                                            }
                                                        }
                                                    }
                                                }
                                                else {
                                                    // console.log("methods[m]:2 ", ob.imageId)
                                                    // let elemIndexM = properties.findIndex(element => element.field == methods[m].params[0])
                                                    // let endpointM = properties[elemIndexM].property;
                                                    // console.log("HERE: ", ob[endpointM])
                                                    mParamList+=mParams[0]
                                                    mParamList+="="
                                                    mParamList+=ob[mParams[0]]
                                                }

                                                console.log("mParamList: ", mParamList)
                                                return firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
                                                obJSON = snapshot.val();
                                                //console.log(obJSON)

                                                if (obJSON.oauth2){
                                                    // console.log("oauth2")

                                                    var tokenPromise;
                                                    var sTokens = JSON.parse(localStorage.getItem('tokens'));
                                                    console.log(sTokens)
                                                    const elementsIndex = sTokens.findIndex(element => element.site == site)
                                                    console.log("sTokens[elementsIndex]: ", sTokens[elementsIndex].token)
                                                    if (sTokens[elementsIndex].token!=""){
                                                                tokenPromise= new Promise((resolve, reject) => {resolve(sTokens[elementsIndex].token)})
                                                                .then(token=>{
                                                                    return new Promise((resolve, reject) => {
                                                                        console.log("Token: ",token)
                                                                        $.ajax({
                                                                            url: token_url,
                                                                            method: "POST",
                                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                            success: function(response) {
                                                                                console.log("response: ",response);
                                                                                tok = response.access_token;
                                                                                expires_in = response.expires_in;
                                                                                console.log("tok: ", tok)
                                                                                console.log("expires_in: ", expires_in)
                                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                //const elementsIndex = this.sTokens.findIndex(element => element.site == site)
                                                                                let newArray = [...sTokens]
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                // this.setState({newArray});

                                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))

                                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                            },
                                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                console.log("error: ",response);
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }
                                                            else {
                                                                tokenPromise= new Promise((resolve, reject) => {
                                                                    console.log("auth function");
                                                                    auth_url= obJSON.oauth2[0].authURL;
                                                                    token_url= obJSON.oauth2[0].tokenURL;
                                                                    redirect_url= obJSON.oauth2[0].callbackURL;
                                                                    client_id= obJSON.oauth2[0].clientId;
                                                                    client_secret= obJSON.oauth2[0].clientSec;
                                                                    response_type= obJSON.oauth2[0].resType;
                                                                    scope= obJSON.oauth2[0].scope;
                                                                    grant_type= obJSON.oauth2[0].grantType;
                                                                    client_auth= obJSON.oauth2[0].clientAuth;

                                                                    var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                    var pollTimer = window.setInterval(function() {
                                                                        try {
                                                                            console.log("url here: ", win.document.URL); //here url
                                                                            if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                                window.clearInterval(pollTimer);
                                                                                var url =   win.document.URL;
                                                                                acToken =   gup(url, 'code');
                                                                                resolve(acToken)
                                                                                // tokenType = gup(url, 'token_type');
                                                                                // expiresIn = gup(url, 'expires_in');
                                                                                win.close();
                                                                            }
                                                                        } catch(e) {
                                                                            console.log("error in oauth")
                                                                        }
                                                                    }, 200);

                                                                    function gup(url, name) {
                                                                        name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                        var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                        var regex = new RegExp( regexS );
                                                                        var results = regex.exec( url );
                                                                        if ( results == null )
                                                                            return "";
                                                                        else
                                                                            return results[1];
                                                                    }//end of gup()

                                                                })
                                                                .then(token=>{
                                                                    return new Promise((resolve, reject) => {
                                                                        console.log("Token: ",token)
                                                                        $.ajax({
                                                                            url: token_url,
                                                                            method: "POST",
                                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                            success: function(response) {
                                                                                console.log("response: ",response);
                                                                                tok = response.access_token;
                                                                                expires_in = response.expires_in;
                                                                                console.log("tok: ", tok)
                                                                                console.log("expires_in: ", expires_in)
                                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                let newArray = [...sTokens]
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                // this.setState({newArray});

                                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))


                                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                            },
                                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                console.log("error: ",response);
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }

                                                    return tokenPromise


                                                }
                                                else { //no oauth
                                                    // console.log("!!!oauth2")
                                                    result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                                    return result;
                                                }

                                                })//firebase
                                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                                            }
                                            });
                                        //   });

                                        }//loop to create methods
                                    }
                                    });//loop over array of objects


                                    //remove the fields that are not in the class
                                    var keys = Object.keys(o[0])
                                    for (var k=0; k<keys.length; ++k){
                                        if (!fields.includes(keys[k])){
                                            o.forEach(function(ob) {
                                                delete ob[keys[k]];
                                            })
                                        }
                                    }

                                }
                                else {
                                    // console.log("NOT ARRAY")
                                    for (var p=0; p<properties.length; ++p){
                                        if (properties[p].field){// it won't check type properties (e.g. comment for VideoObject)
                                            if (properties[p].property != properties[p].field && o[properties[p].field]) {
                                                Object.defineProperty(o, properties[p].property,Object.getOwnPropertyDescriptor(o, properties[p].field));
                                                delete o[properties[p].field];
                                            }
                                        }
                                        else { //if the property is a type
                                            let propType = properties[p].property;
                                            let typeName = properties[p].type;
                                            console.log("typeId: ", typeId);
                                            console.log("o[typeId]1: ", o[typeId])
                                            var idVal = o[typeId];

                                            // creat a getter for property of type Type
                                            Object.defineProperty(o, propType, {
                                                get: function() {
                                                    let promise = firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                                        console.log("typeOb1: ", snapshot.val())
                                                        console.log("o[typeId]2: ", idVal)
                                                        return self(snapshot.key, snapshot.val(), currentType, propType, idVal);
                                                    });
                                                    return promise;
                                                }
                                            });

                                            //*** if you want to remove the getter, replce it with this
                                            // o[propType]= function(){return ""};
                                            // (async function(){
                                            //     o[propType] = await firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                            //         console.log("typeOb1: ", snapshot.val())
                                            //         return self(snapshot.key, snapshot.val(), currentType, propType, o[typeId]);
                                            //     });
                                            //     return o;
                                            // })()

                                        }
                                    }//end of for loop properties


                                    //***************************** SETTERS *********************************/
                                    for (s in setters){
                                        // console.log("setter: ", setters[s])
                                        var field = setters[s].field; //API endpoint field to be set
                                        var prop;
                                        var setEndpoint =  setters[s].endpoint;
                                        var setParams = setters[s].params;
                                        var idd = setters[s].id;
                                        //get the schema.org property mapped to this field
                                        for (var f=0; f< properties.length; ++f){
                                            if (properties[f].field == field){
                                                prop = properties[f].property;
                                            }
                                        }

                                        Object.defineProperty(o, prop, {
                                            set: function(newValue) {
                                                console.log("newValue: ", newValue)
                                                this.pro = firebase.database().ref('/apis/'+setEndpoint).once('value').then(function(snapshot) {
                                                obJSON = snapshot.val();
                                                console.log(obJSON)
                                                if (obJSON.oauth2){
                                                    // console.log("oauth2")
                                                    return new Promise((resolve, reject) => {
                                                            console.log("auth function");
                                                            auth_url= obJSON.oauth2[0].authURL;
                                                            token_url= obJSON.oauth2[0].tokenURL;
                                                            redirect_url= obJSON.oauth2[0].callbackURL;
                                                            client_id= obJSON.oauth2[0].clientId;
                                                            client_secret= obJSON.oauth2[0].clientSec;
                                                            response_type= obJSON.oauth2[0].resType;
                                                            scope= obJSON.oauth2[0].scope;
                                                            grant_type= obJSON.oauth2[0].grantType;
                                                            client_auth= obJSON.oauth2[0].clientAuth;

                                                            var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                            var pollTimer = window.setInterval(function() {
                                                                try {
                                                                    console.log("url here: ", win.document.URL); //here url
                                                                    if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                        window.clearInterval(pollTimer);
                                                                        var url =   win.document.URL;
                                                                        acToken =   gup(url, 'code');
                                                                        resolve(acToken)
                                                                        // tokenType = gup(url, 'token_type');
                                                                        // expiresIn = gup(url, 'expires_in');
                                                                        win.close();
                                                                        // return validateToken(acToken)
                                                                    }
                                                                } catch(e) {
                                                                    console.log("error in oauth")
                                                                }
                                                            }, 200);

                                                            function gup(url, name) {
                                                                name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                var regex = new RegExp( regexS );
                                                                var results = regex.exec( url );
                                                                if ( results == null )
                                                                    return "";
                                                                else
                                                                    return results[1];
                                                            }//end of gup()

                                                        })
                                                        .then(token=>{
                                                            return new Promise((resolve, reject) => {
                                                            console.log("Token: ",token)
                                                            console.log("Token URL: ",token_url)
                                                            $.ajax({
                                                                url: token_url,
                                                                method: "POST",
                                                                data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                success: function(response) {
                                                                    console.log("response: ",response);
                                                                    //important to check access token and token type (e.g. bearer)
                                                                    tok = response.access_token;
                                                                    console.log("tok: ", tok)
                                                                    resolve('https://scrapir.org/api/'+setEndpoint+'?tokenAPI='+tok+'&'+field+'='+newValue+'&'+idd+'='+idValue)
                                                                },
                                                                error: function(response, jqXHR, textStatus, errorThrown) {
                                                                    console.log("error: ",response);
                                                                }
                                                            })
                                                        })
                                                        // return something
                                                        })

                                                }
                                                else { //no oauth
                                                    // console.log("!!!oauth2")
                                                    result =  'https://scrapir.org/api/'+setEndpoint+'?'+paramList+'&'+pro+'='+newValue+'&id='+identifier
                                                    //console.log("result: ",result);
                                                    return result;
                                                }

                                            })//firebase
                                            .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url)) })   })

                                            }
                                        });
                                    }

                                    //***************************** METHODS *********************************/
                                if (methods){
                                    for (var m=0;  m<methods.length; ++m){
                                        // console.log("methods[m]: ", methods[m].name)
                                        var mName = methods[m].name;
                                        var mEndpoint = methods[m].endpoint;
                                        var mParams = methods[m].params;

                                        Object.defineProperty(o, mName.toString(), { value: function(mArgs) {

                                            var paramLen = Object.entries(mArgs).length;
                                            // console.log("paramLen: ", paramLen)

                                            for (const [key, value] of Object.entries(mArgs)) {
                                                --paramLen
                                                console.log(`${key}: ${value}`);
                                                mParamList+= key
                                                mParamList+="="
                                                mParamList+= value
                                                if (paramLen>0){
                                                    mParamList+="&"
                                                }
                                            }

                                            // if (mParams){
                                            //     for (var p=0; p<mParams.length; ++p){
                                            //         //Object.entries(mParams[p]).forEach(([key, value]) => {
                                            //             mParamList+=mParams[p]//`${key}`
                                            //             mParamList+="="
                                            //             mParamList+=mArgs[p]
                                            //         // });
                                            //         if (p+1<mParams.length){
                                            //             mParamList+="&"
                                            //         }
                                            //     }
                                            // }
                                            console.log("mParamList: ", mParamList)
                                            return firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
                                            obJSON = snapshot.val();
                                            console.log(obJSON)

                                            if (obJSON.oauth2){
                                                // console.log("oauth2")

                                                var tokenPromise;
                                                var sTokens = JSON.parse(localStorage.getItem('tokens'));
                                                console.log(sTokens)
                                                const elementsIndex = sTokens.findIndex(element => element.site == site)
                                                console.log("sTokens[elementsIndex]: ", sTokens[elementsIndex].token)
                                                if (sTokens[elementsIndex].token!=""){
                                                            tokenPromise= new Promise((resolve, reject) => {resolve(sTokens[elementsIndex].token)})
                                                            .then(token=>{
                                                                return new Promise((resolve, reject) => {
                                                                    console.log("Token: ",token)
                                                                    $.ajax({
                                                                        url: token_url,
                                                                        method: "POST",
                                                                        data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                        success: function(response) {
                                                                            console.log("response: ",response);
                                                                            tok = response.access_token;
                                                                            expires_in = response.expires_in;
                                                                            console.log("tok: ", tok)
                                                                            console.log("expires_in: ", expires_in)
                                                                            // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                            // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                            //const elementsIndex = this.sTokens.findIndex(element => element.site == site)
                                                                            let newArray = [...sTokens]
                                                                            newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                            newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                            // this.setState({newArray});

                                                                            localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                            console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))

                                                                            resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                        },
                                                                        error: function(response, jqXHR, textStatus, errorThrown) {
                                                                            console.log("error: ",response);
                                                                        }
                                                                    })
                                                                })
                                                            })
                                                        }
                                                        else {
                                                            tokenPromise= new Promise((resolve, reject) => {
                                                                console.log("auth function");
                                                                auth_url= obJSON.oauth2[0].authURL;
                                                                token_url= obJSON.oauth2[0].tokenURL;
                                                                redirect_url= obJSON.oauth2[0].callbackURL;
                                                                client_id= obJSON.oauth2[0].clientId;
                                                                client_secret= obJSON.oauth2[0].clientSec;
                                                                response_type= obJSON.oauth2[0].resType;
                                                                scope= obJSON.oauth2[0].scope;
                                                                grant_type= obJSON.oauth2[0].grantType;
                                                                client_auth= obJSON.oauth2[0].clientAuth;

                                                                var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                var pollTimer = window.setInterval(function() {
                                                                    try {
                                                                        console.log("url here: ", win.document.URL); //here url
                                                                        if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                            window.clearInterval(pollTimer);
                                                                            var url =   win.document.URL;
                                                                            acToken =   gup(url, 'code');
                                                                            resolve(acToken)
                                                                            // tokenType = gup(url, 'token_type');
                                                                            // expiresIn = gup(url, 'expires_in');
                                                                            win.close();
                                                                        }
                                                                    } catch(e) {
                                                                        console.log("error in oauth")
                                                                    }
                                                                }, 200);

                                                                function gup(url, name) {
                                                                    name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                    var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                    var regex = new RegExp( regexS );
                                                                    var results = regex.exec( url );
                                                                    if ( results == null )
                                                                        return "";
                                                                    else
                                                                        return results[1];
                                                                }//end of gup()

                                                            })
                                                            .then(token=>{
                                                                return new Promise((resolve, reject) => {
                                                                    console.log("Token: ",token)
                                                                    $.ajax({
                                                                        url: token_url,
                                                                        method: "POST",
                                                                        data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                        success: function(response) {
                                                                            console.log("response: ",response);
                                                                            tok = response.access_token;
                                                                            expires_in = response.expires_in;
                                                                            console.log("tok: ", tok)
                                                                            console.log("expires_in: ", expires_in)
                                                                            // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                            // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                            let newArray = [...sTokens]
                                                                            newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                            newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                            // this.setState({newArray});

                                                                            localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                            console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))


                                                                            resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                        },
                                                                        error: function(response, jqXHR, textStatus, errorThrown) {
                                                                            console.log("error: ",response);
                                                                        }
                                                                    })
                                                                })
                                                            })
                                                        }

                                                return tokenPromise


                                            }
                                            else { //no oauth
                                                // console.log("!!!oauth2")
                                                result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                                return result;
                                            }

                                            })//firebase
                                            .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                                        }
                                        });
                                    //   });

                                    }//loop to create methods
                                }
                                    //remove the fields that are not in the class
                                    var keys = Object.keys(o)
                                    for (var k=0; k<keys.length; ++k){
                                        if (!fields.includes(keys[k])){
                                            delete o[keys[k]];
                                        }
                                    }
                                }//end of else of no array

                                return o;
                            })
                            // return obj;
                        };


                        // support searchVideoObject("funny cats", {in: ["youtube", "dailymotion"], order: "date"})
                        // functionName1 :[arry of sites] save the object of the search function then outisde of the lo
                        // functionName2 :[arry of sites] save the object of the search function then outisde of the lo
                        // Object1: [array of sites]
                        // window[funcName] = function(...mArgs) { return nameFunction(...mArgs) };


                    }
                }//if functions

            });//end of snapshot

        })

        results.push(promise);

    })// end of snapshot.forEach

    //VideoObject({'in':['youtube', 'dailymotion']})
    // return firebase.database().ref('/types').once('value').then(function(snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //         let typeName = childSnapshot.key
    //         let typeSites = childSnapshot.val()

    //         window[typeName]={}
    //         window[typeName] = function(args) { return getTypeSite(typeName, typeSites, args) };
    //         //loop through the sites in 'in':['youtube', 'dailymotion']

    //         function getTypeSite(typeName, typeSites, args){
    //             for(let site in typeSites){
    //                 widnow[site][typeName](typeName, val, "self", "none", ...args);
    //                 //concatenate the results from multiple calls
    //             }
    //         }
    //     })
    // })
    // .then(()=>{
        return Promise.all(results);
    // })


}
