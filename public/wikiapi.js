// let script = document.createElement('script');
// script.src = '../shapirW.js';
// // script.type = 'module'
// document.getElementsByTagName('head')[0].appendChild(script);

async function include(...urls) {
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



var apis = {}, sites = [], dataTypes={};

async function getItemTypes(id) {

    include("../shapirW.js")
    .then(()=>{


    Object.defineProperty(dataTypes, "test", {
        get: function() {
            return "TARFAH is COOL";
        }
    });

    //fetch all APIs from ScrAPIr
    fetch('https://superapi-52bc2.firebaseio.com/apis.json')
        .then(response => { return response.json() })
        .then(scrapirApis => { apis = scrapirApis; });

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }
    // var id = url;

    if(validURL(id)){
        id = id.substring(id.lastIndexOf("/") + 1, id.length);
    }

    console.log(id)

    var promise =  fetch("https://query.wikidata.org/sparql?format=json&query=SELECT%20%3Fitem%20%3FitemLabel%20%3Fproperty%20%3FpropertyLabel%20WHERE%7B%20%20%20%0A%20%20%20%20%20%3Fitem%20%3Fpredicate%20%22"+id+"%22%20.%0A%20%20%20%20%20%3Fproperty%20wikibase%3AdirectClaim%20%3Fpredicate%20.%0A%20%20%20%20%20%3Fproperty%20wikibase%3ApropertyType%20wikibase%3AExternalId.%0A%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22%20%0A%20%20%20%7D%20%0A%7D")
    .then(response => {return response.json()})
    .then(data => {
        // console.log("data: ", data)
        let results = data.results.bindings
        var itemUrl= results[0].item.value;
        var itemID = itemUrl.substring(itemUrl.lastIndexOf("/") + 1, itemUrl.length);
        // var pLabel = results[0].propertyLabel.value;
        // return getShapirFunctions(itemID);
        return itemID;
    })
    .then(itemID=>{
        return fetch('https://superapi-52bc2.firebaseio.com/abstractions.json')
        .then(response => { return response.json() })
        .then(data => {
            sites = Object.keys(data)
            return sites;
        }).then(sites => {
            var lang = "en", obj = {}, objItem = {};
            var promiseItem= fetch("https://query.wikidata.org/sparql?format=json&query=select%20?wdLabel%20?ps_Label%20?ps_%20?wdpqLabel%20?pq_Label%20{VALUES%20(?company)%20{(wd:" + itemID + ")}?company%20?p%20?statement%20.?statement%20?ps%20?ps_%20.?wd%20wikibase:claim%20?p.?wd%20wikibase:statementProperty%20?ps.OPTIONAL%20{?statement%20?pq%20?pq_%20.?wdpq%20wikibase:qualifier?pq%20.}SERVICE%20wikibase:label%20{%20bd:serviceParam%20wikibase:language%20%22" + lang + "%22%20}}%20ORDER%20BY%20?wd%20?statement%20?ps_")
                .then(response => { return response.json() })
                .then(data => {
                    // console.log("DATA: ", data)
                    let results = data.results.bindings;
                    for (let i = 0; i < results.length; ++i) {
                        var input = results[i].wdLabel.value;
                        var firstWord = true;
                        var output = input

                        if (output in obj) {
                            obj[output].push({
                                id: results[i].ps_.value,
                                value: results[i].ps_Label.value
                            });
                        } else {
                            obj[output] = [];
                            obj[output].push({
                                id: results[i].ps_.value,
                                value: results[i].ps_Label.value
                            });
                        }
                    }

                    for (const [key, value] of Object.entries(obj)) {
                        if (value.length == 1) {
                            let idQ = value[0].id;
                            if (idQ.includes("http://www.wikidata.org/entity/Q")) {
                                let id = idQ.split("/").reverse()[0];
                                Object.defineProperty(objItem, key, {
                                    configurable: true,
                                    get: async function () {
                                        return await wikidata(id, lang);
                                    }
                                });
                            } else {
                                objItem[key] = value[0].value;
                            }
                        } else {
                            let idQ = value[0].id;
                            if (idQ.includes("http://www.wikidata.org/entity/Q")) {
                                let arrPromises = []
                                Object.defineProperty(objItem, key, {
                                    configurable: true,
                                    get: function () {
                                        for (let i = 0; i < value.length; ++i) {
                                            idQ = value[i].id;
                                            let id = idQ.split("/").reverse()[0];
                                            arrPromises.push(wikidata(id, lang))
                                        }
                                        return arrPromises;
                                    }
                                });
                            } else {
                                objItem[key] = [];
                                for (let i = 0; i < value.length; ++i) {
                                    objItem[key].push(value[i].value);
                                }
                            }
                            // console.log(objItem)
                        }
                    }
                    return objItem;
                    // })
                })
                .then((properties) => {
                    // console.log("Properties: ", properties)

                    var exID = {};
                    return fetch("https://raw.githubusercontent.com/tarfahalrashed/Shapir/main/functions/data.json")//change this to github url of the json file
                        .then(response => { return response.json() })
                        .then(data => {
                            Object.keys(data).forEach(key => {
                                var k = data[key]["pLabel"];
                                var p = data[key]["p"]
                                exID[k] = p.substring(p.lastIndexOf("/") + 1, p.length);
                            })
                            return exID;

                        }).then(exID => {
                            Object.keys(properties).forEach((key, index, arr) => {
                                for (var i = 0; i < sites.length; ++i) {
                                    var pLabel = key.toLowerCase();
                                    if (pLabel.includes(sites[i])) {
                                        create_property_container(key, exID[key], properties[key], sites[i]);
                                    }
                                    // console.log(key);
                                    // if(!arr[index + 1]){

                                    // }
                                }
                            });

                            // setTimeout(function(){
                                // console.log("end: ", dataTypes);

                            return dataTypes;
                            // }, 1000);

                        });

                });

            return promiseItem;
        })
    });

    console.log("promise: ", promise)
    return promise;

});//include shapirW
}



function create_property_container(propertylabel, propertyid, propertyvalue, site) {

    var similarity = 0, tempSimialrity, apiEndpoint, mainType, button, code, value, url, title;

    if (propertyvalue.length > 0) {
        value = propertyvalue[0];
    } else {
        value = propertyvalue;
    }


    for (const [key, value] of Object.entries(apis)) {
        url = apis[key].url;
        title = apis[key].title;

        if (url.includes(site)) {
            //get the descriptiosn of these API endpoints
            tempSimialrity = checkSimilarity(propertylabel.toLowerCase(), title.toLowerCase())
            if (similarity < tempSimialrity) {
                similarity = tempSimialrity;
                apiEndpoint = title; //to get the type with this endpoint from this site
            }
        }
    }
    // console.log("This is  most similar endpoint: ", apiEndpoint);
    //get the type in this with this endpoint
    fetch('https://superapi-52bc2.firebaseio.com/abstractions/' + site + '/objects.json')
        .then(response => { return response.json() })
        .then(objects => {
            Object.keys(objects).forEach(object => {
                if (objects[object].construct.self) {
                    if (objects[object].construct.self.endpoint == apiEndpoint) {
                        mainType = object;
                        // console.log("This is the type: ", mainType)
                        //if this type has getter properties show buttons of them with the function call
                        var properties = objects[object].properties;
                        for (var i = 0; i < properties.length; ++i) {
                            // console.log(properties[i])
                            if (properties[i].type) {
                                console.log(properties[i].property); //I should add these types to an array of types to get them from other sites
                                // create()
                                let prop = properties[i].property;
                                Object.defineProperty(dataTypes, prop, {
                                    get: function() {
                                        return getDataFromShapir(site, mainType, value, prop);
                                    }
                                });
                                // $(".wikibase-title #buttons").append('&nbsp;<button  id="' + value + '" name="' + site + '" value="' + mainType + '" type="button" class="btn btn-primary btn-sm"  onclick="getDataFromShapir(this)" >Get ' + properties[i].property + 's</button>');
                            }
                        }
                    }
                }
            })

            // return dataTypes;
        })

        // .then(type => {

        //     //button = '&nbsp;&nbsp;<button  id="'+value+'" name="'+site+'" value="'+type+'" type="button" onclick="getDataFromShapir(this)" >Get Data</button> '
        //     //code   = '<pre id="pre-'+value+'" style="display:none; max-height: 300px; overflow-y: auto;"><code id="code-'+value+'"></code></pre>';


        //     //[1] get the types for this site
        //     //[2] get the sites that contains similar types
        //     fetch('https://superapi-52bc2.firebaseio.com/abstractions.json')
        //         .then(response => { return response.json() })
        //         .then(data => {
        //             // console.log("This is the site: ", site);
        //             // console.log("Types for the site: ", Object.keys(data[site].objects))
        //             var siteTypes = Object.keys(data[site].objects);
        //             var similarSites = [];

        //             Object.keys(data).forEach(anotherSite => {
        //                 if (anotherSite != site) {//skip the given site and look at other site
        //                     var siteObjects = Object.keys(data[anotherSite].objects);
        //                     for (var i = 0; i < siteObjects.length; ++i) {
        //                         if (siteTypes.includes(siteObjects[i])) {
        //                             // var otherSiteButton = '<button  id="'+site+'-'+anotherSite+'" type="button" onclick="searchShapir(this)" >'+anotherSite+'</button> ';
        //                             // $(propertyDiv).find(".wikibase-snakview-value").append(otherSiteButton);
        //                             // $(propertyDiv).find(".wikibase-snakview-value").append("&nbsp;&nbsp;")

        //                             if (!similarSites.includes(anotherSite)) {//don't add the site to the array twice
        //                                 similarSites.push(anotherSite)
        //                             }
        //                         }
        //                     }
        //                 }
        //             });
        //             // console.log("Similar sites: ",similarSites);
        //             return propertyid;
        //         })
        //     // console.log("property_section AFTER: ", propertyDiv)

        // })
}


function getDataFromShapir(name, value, id, property){

    // console.log("name: ", name)
    // console.log("value: ", value)
    // console.log("id: ", id)
    // console.log("property: ", property)

    // import shapir from "https://shapir.org/shapir.js";
    // import shapir, {include, uri} from "./shapir.js";


	shapir().then(async() => {
		var entity = await window[name][value](id);
		var type = property;//$("#"+id).text().split("Get ")[1];
		// type = type.split("s")[0];
        return entity[type]; //get the types in the 2nd layer

		// setTimeout(function(){
        //     console.log("get data: ", typeData)
		// }, 1000);
	});

}


// Below are cosine similarity functions
function wordCountMap(str) {
    let words = str.split(' ');
    let wordCount = {};
    words.forEach((w) => {
        wordCount[w] = (wordCount[w] || 0) + 1;
    });
    return wordCount;
}

function addWordsToDictionary(wordCountmap, dict) {
    for (let key in wordCountmap) {
        dict[key] = true;
    }
}

function wordMapToVector(map, dict) {
    let wordCountVector = [];
    for (let term in dict) {
        wordCountVector.push(map[term] || 0);
    }
    return wordCountVector;
}

function dotProduct(vecA, vecB) {
    let product = 0;
    for (let i = 0; i < vecA.length; i++) {
        product += vecA[i] * vecB[i];
    }
    return product;
}

function magnitude(vec) {
    let sum = 0;
    for (let i = 0; i < vec.length; i++) {
        sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
}

function cosineSimilarity(vecA, vecB) {
    return dotProduct(vecA, vecB) / (magnitude(vecA) * magnitude(vecB));
}

function textCosineSimilarity(txtA, txtB) {
    const wordCountA = wordCountMap(txtA);
    const wordCountB = wordCountMap(txtB);
    let dict = {};
    addWordsToDictionary(wordCountA, dict);
    addWordsToDictionary(wordCountB, dict);
    const vectorA = wordMapToVector(wordCountA, dict);
    const vectorB = wordMapToVector(wordCountB, dict);
    return cosineSimilarity(vectorA, vectorB);
}


function getSimilarityScore(val) {
    return Math.round(val * 100)
}

function checkSimilarity(sentence1, sentence2) {
    // console.log(sentence1+': '+sentence2)
    const text1 = sentence1;
    const text2 = sentence2;
    const similarity = getSimilarityScore(textCosineSimilarity(text1, text2));
    return similarity;
}




