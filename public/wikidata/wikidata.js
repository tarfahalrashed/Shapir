let lang = "en", externalIds = {}, sites = [], apis;

export async function wikidata(itemID, lang) {

    //fetch external identifiers
    fetch("https://raw.githubusercontent.com/tarfahalrashed/Shapir/main/functions/data.json")
        .then(response => { return response.json() })
        .then(data => {
            externalIds = data;
        })

    //fetch sites described by Shapir
    fetch('https://superapi-52bc2.firebaseio.com/abstractions.json')
        .then(response => { return response.json() })
        .then(data => {
            sites = Object.keys(data);
        })

    //fetch all apis from Shapir
    fetch('https://superapi-52bc2.firebaseio.com/apis.json')
        .then(response => { return response.json() })
        .then(scrapirApis => { apis = scrapirApis; });


    let obj = {}, objItem = {};
    return fetch("https://query.wikidata.org/sparql?format=json&query=SELECT%20?itemLabel%20?itemDescription%20?itemAltLabel{VALUES%20(?item)%20{(wd:" + itemID + ")}SERVICE%20wikibase:label%20{%20bd:serviceParam%20wikibase:language%20%22" + lang + "%22%20}}")
        .then(response => { return response.json() })
        .then(data => {
            let results = data.results.bindings
            if (results[0].itemLabel) {
                objItem["label"] = results[0].itemLabel.value;
            }
            if (results[0].itemDescription) {
                objItem["description"] = results[0].itemDescription.value;
            }
            if (results[0].itemAltLabel) {
                objItem["aliases"] = results[0].itemAltLabel.value;
            }
            objItem["itemID"] = itemID;
            objItem["itemURL"] = "https://www.wikidata.org/wiki/" + itemID;

            return objItem;

        }).then((objItem) => {
            return fetch("https://query.wikidata.org/sparql?format=json&query=select%20?wdLabel%20?ps_Label%20?ps_%20?wdpqLabel%20?pq_Label%20{VALUES%20(?company)%20{(wd:" + itemID + ")}?company%20?p%20?statement%20.?statement%20?ps%20?ps_%20.?wd%20wikibase:claim%20?p.?wd%20wikibase:statementProperty%20?ps.OPTIONAL%20{?statement%20?pq%20?pq_%20.?wdpq%20wikibase:qualifier?pq%20.}SERVICE%20wikibase:label%20{%20bd:serviceParam%20wikibase:language%20%22" + lang + "%22%20}}%20ORDER%20BY%20?wd%20?statement%20?ps_")
                .then(response => { return response.json() })
                .then(data => {
                    let results = data.results.bindings;
                    for (let i = 0; i < results.length; ++i) {
                        let input = results[i].wdLabel.value;
                        let firstWord = true;
                        let output = input.replace(/(\w+)(?:\s+|$)/g, function (_, word) {
                            if (firstWord) {
                                firstWord = false;
                                return word;
                            } else {
                                return word.charAt(0).toUpperCase() + word.substr(1);
                            }
                        });

                        if (output in obj) {
                            // console.log(results[i].ps_Label.value)
                            if (Object.values(obj).indexOf(results[i].ps_Label.value) == -1) {//make sure that values are unique
                                obj[output].push({
                                    id: results[i].ps_.value,
                                    value: results[i].ps_Label.value
                                });
                            }
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
                                        // return Promise.all(arrPromises);
                                    }
                                });
                            } else {
                                objItem[key] = [];
                                for (let i = 0; i < value.length; ++i) {
                                    objItem[key].push(value[i].value);
                                }
                            }
                        }
                    }
                    return objItem;
                })
        })
        .then(properties => {
            //go over properties
            for (const [key, value] of Object.entries(properties)) {
                let property = key;
                for (const [key1, value1] of Object.entries(externalIds)) {
                    let label = externalIds[key1].pLabel;
                    let firstWord = true;
                    let modifiedLabel = label.replace(/(\w+)(?:\s+|$)/g, function (_, word) {
                        if (firstWord) {
                            firstWord = false;
                            return word;
                        } else {
                            return word.charAt(0).toUpperCase() + word.substr(1);
                        }
                    });

                    if (property == modifiedLabel) {
                        for (var i = 0; i < sites.length; ++i) {
                            let currentSite = sites[i]
                            let pLabel = label.toLowerCase();
                            if (pLabel.includes(currentSite)) {
                                let pr = modifiedLabel.split('ID').join('');
                                pr = pr.charAt(0).toLowerCase() + pr.slice(1);

                                Object.defineProperty(objItem, pr, {
                                    configurable: true,
                                    get: function () {

                                        let similarity = 0, tempSimialrity, apiEndpoint, mainType, button, code, url, title, curValue;



                                        //get the type in this with this endpoint

                                        return new Promise((resolve, reject) => {
                                            fetch('https://superapi-52bc2.firebaseio.com/abstractions/' + currentSite + '/objects.json')
                                                .then(response => { return response.json() })
                                                .then(objects => {
                                                    if (value.length > 0) {
                                                        curValue = value[0];
                                                    } else {
                                                        curValue = value;
                                                    }

                                                    Object.keys(apis).forEach((key, index, arr) => {
                                                        url = apis[key].url;
                                                        title = apis[key].title;

                                                        if (url.includes(currentSite)) {
                                                            //get the descriptiosn of these API endpoints
                                                            tempSimialrity = checkSimilarity(label.toLowerCase(), title.toLowerCase())
                                                            if (similarity < tempSimialrity) {
                                                                similarity = tempSimialrity;
                                                                apiEndpoint = title;
                                                            }
                                                        }

                                                        if (!arr[index + 1]) {
                                                            Object.keys(objects).forEach(object => {
                                                                if (objects[object].construct.self) {
                                                                    if (objects[object].construct.self.endpoint == apiEndpoint) {
                                                                        mainType = object;
                                                                        resolve(window[currentSite][mainType](curValue));
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    });
                                                })
                                        });
                                    }
                                });
                            }
                        }
                    }
                }
            }
            return objItem;
        })
        .then((result) => {
            // console.log("WikirResult: ", result)
            return result;
        });

}


export function uri(id, lang) {

    if (validURL(id)) {
        id = id.substring(id.lastIndexOf("/") + 1, id.length);
    }

    return fetch("https://query.wikidata.org/sparql?format=json&query=SELECT%20%3Fitem%20%3FitemLabel%20%3Fproperty%20%3FpropertyLabel%20WHERE%7B%20%20%20%0A%20%20%20%20%20%3Fitem%20%3Fpredicate%20%22" + id + "%22%20.%0A%20%20%20%20%20%3Fproperty%20wikibase%3AdirectClaim%20%3Fpredicate%20.%0A%20%20%20%20%20%3Fproperty%20wikibase%3ApropertyType%20wikibase%3AExternalId.%0A%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22%20%0A%20%20%20%7D%20%0A%7D")
        .then(response => { return response.json() })
        .then(data => {
            let results = data.results.bindings
            var itemUrl = results[0].item.value;
            var itemID = itemUrl.substring(itemUrl.lastIndexOf("/") + 1, itemUrl.length);

            return wikidata(itemID, lang);
        })

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }
}

export async function queryWikidata(e) {
    let items = [], properties = [], searchTerm, lang,
        optionsLen = Object.keys(e.options).length;

    for (const [key, value] of Object.entries(e.options)) {
        --optionsLen;
        if (key != "service" && key != "format" && key != "mavo") {
            let property = key.split("-").join(" ");
            if (key == "search") {
                searchTerm = value;
            } else if (key == "language") {
                lang = value;
            } else {
                fetch("https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&search=" + property + "&language=en&type=property")
                    .then(response => { return response.json() })
                    .then(props => {
                        var listProps = props.search
                        for (var i = 0; i < listProps.length; ++i) {
                            if (listProps[i].match.text == property) {
                                properties.push({
                                    id: listProps[i].id,
                                    value: value
                                });
                            }
                        }
                    });

            }
        }

        if (optionsLen-1 == 0) {
            // setTimeout(function() {

            var query = 'https://query.wikidata.org/sparql?format=json&query=SELECT%20%3Fitem%20%3FitemLabel%20WHERE%7B%3Fitem%20rdfs%3Alabel%22'+searchTerm+'%22%40en.'
            // for(var i=0; i<properties.length; ++i){
                query +='%3Fitem%20wdt%3AP31%2Frdfs%3Alabel%22film%22%40en.'
                // if(i+1 == properties.length){
                    query +='SERVICE%20wikibase%3Alabel%20%7Bbd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%7D%7Dlimit%2020';
                // }
            // }

            return fetch(query)
                .then(response => { return response.json() })
                .then(data => {
                    let itemsIds = data.results.bindings;
                    for (var i = 0; i < itemsIds.length; ++i) {
                        var url = itemsIds[i].item.value;
                        let id = url.split("/").reverse()[0];
                        items.push(wikidata(id, lang));

                        if (i + 1 == itemsIds.length) {

                            console.log(Promise.all(items))
                            return Promise.all(items);
                        }

                    }
                });
                    // }, 1000);
        }
    }

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
    const text1 = sentence1;
    const text2 = sentence2;
    const similarity = getSimilarityScore(textCosineSimilarity(text1, text2));
    return similarity;
}
