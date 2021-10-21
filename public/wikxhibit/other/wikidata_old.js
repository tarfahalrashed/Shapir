// let script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = 'js/jquery-3.6.0.min.js';
// document.getElementsByTagName('head')[0].appendChild(script);
"use strict";
// Default Language
let lang = "en";



export async function lookUpWikidata(service, id, lang){

    // [1] get the item that cotains this id with this value
    // [2] show the label and description of this item (label + description)
    // [3] get all the other IDs
    // [4] compare sites names in Shapir with all properties ids
    // [5] create buttons of these sites
    // [6] also provide ways to search for the label on all the sites that provide search function!

    return fetch("/s2v")//change this to github url of the json file
    .then(response => {return response.json()})
    .then(data => {
        var last="";
        var promise =  new Promise((resolve, reject) => {
            Object.keys(data).forEach(key => {
                var p = "";
                var label = data[key]["pLabel"];
                if(label == service){
                    console.log("YES")
                    p = data[key]["p"]
                    last = p.substring(p.lastIndexOf("/") + 1, p.length);
                    resolve(last);
                    return false;
                }
            })
        });
        promise.then(p =>{
            console.log("p: ", p)
            fetch("https://query.wikidata.org/sparql?format=json&query=SELECT%20?item%20%3FitemLabel%20WHERE%20%7B%20%3Fitem%20wdt%3A"+p+"%20%22"+id+"%22.%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D,en%22.%20%7D%20%7D#/")
            .then(response => {return response.json()})
            .then(data => {
                console.log("data2: ", data)
                let results = data.results.bindings
                var itemUrl= results[0].item.value;
                var itemID = itemUrl.substring(itemUrl.lastIndexOf("/") + 1, itemUrl.length);
                // return await wikidata(itemID, "en");
                let obj ={}, objItem={};
                return fetch("https://query.wikidata.org/sparql?format=json&query=SELECT%20?itemLabel%20?itemDescription%20?itemAltLabel{VALUES%20(?item)%20{(wd:"+itemID+")}SERVICE%20wikibase:label%20{%20bd:serviceParam%20wikibase:language%20%22"+lang+"%22%20}}")
                .then(response => {return response.json()})
                .then(data => {
                    let results = data.results.bindings
                    if(results[0].itemLabel){
                        objItem["label"]= results[0].itemLabel.value;
                    }
                    if(results[0].itemDescription){
                        objItem["description"]= results[0].itemDescription.value;
                    }
                    if(results[0].itemAltLabel){
                        objItem["aliases"]= results[0].itemAltLabel.value;
                    }
                    objItem["itemID"]= itemID;
                    objItem["itemURL"]= "https://www.wikidata.org/wiki/"+itemID;

                    return objItem;
                }).then((objItem)=>{
                    return fetch("https://query.wikidata.org/sparql?format=json&query=select%20?wdLabel%20?ps_Label%20?ps_%20?wdpqLabel%20?pq_Label%20{VALUES%20(?company)%20{(wd:"+itemID+")}?company%20?p%20?statement%20.?statement%20?ps%20?ps_%20.?wd%20wikibase:claim%20?p.?wd%20wikibase:statementProperty%20?ps.OPTIONAL%20{?statement%20?pq%20?pq_%20.?wdpq%20wikibase:qualifier?pq%20.}SERVICE%20wikibase:label%20{%20bd:serviceParam%20wikibase:language%20%22"+lang+"%22%20}}%20ORDER%20BY%20?wd%20?statement%20?ps_")
                    .then(response => {return response.json()})
                    .then(data => {
                        let results = data.results.bindings;
                        // console.log("results: ", results);
                        for(let i=0; i<results.length; ++i){
                            var input = results[i].wdLabel.value;
                            // console.log("input: ", input)
                            var firstWord = true;
                            var output = input.replace(/(\w+)(?:\s+|$)/g, function(_, word) {
                                if(firstWord){
                                    firstWord = false;
                                    return word;
                                }else{
                                    return word.charAt(0).toUpperCase() + word.substr(1);
                                }
                            });
                            // console.log("output: ", output)

                            if(output in obj){
                                obj[output].push({
                                    id: results[i].ps_.value,
                                    value: results[i].ps_Label.value
                                });
                            }else{
                                obj[output]= [];
                                obj[output].push({
                                    id: results[i].ps_.value,
                                    value: results[i].ps_Label.value
                                });
                            }
                        }

                        for (const [key, value] of Object.entries(obj)) {
                            if(value.length == 1){
                                let idQ = value[0].id;
                                if(idQ.includes("http://www.wikidata.org/entity/Q")){
                                    let id = idQ.split("/").reverse()[0];
                                    Object.defineProperty(objItem, key, {
                                        configurable: true,
                                        get: async function(){
                                            return await wikidata(id, lang);
                                        }
                                    });
                                }else{
                                    objItem[key]= value[0].value;
                                }
                            }else{
                                let idQ = value[0].id;
                                if(idQ.includes("http://www.wikidata.org/entity/Q")){
                                    let arrPromises = []
                                    Object.defineProperty(objItem, key, {
                                        configurable: true,
                                        get: function(){
                                            for(let i=0; i<value.length; ++i){
                                                idQ = value[i].id;
                                                let id = idQ.split("/").reverse()[0];
                                                arrPromises.push(wikidata(id, lang))
                                            }
                                            return arrPromises;
                                            // return Promise.all(arrPromises);
                                        }
                                    });
                                }else{
                                    objItem[key]= [];
                                    for(let i=0; i<value.length; ++i){
                                        objItem[key].push(value[i].value);
                                    }
                                }
                                // console.log(objItem)
                            }
                        }
                        return objItem;
                    })
                }).then((result)=>{
                    // console.log("OBJ: ", result)
                    return result;
                });

                // }

            });
        })
    })

}



export async function wikidata(itemID, lang){

    // console.log(itemID)
    let obj ={}, objItem={};
    return fetch("https://query.wikidata.org/sparql?format=json&query=SELECT%20?itemLabel%20?itemDescription%20?itemAltLabel{VALUES%20(?item)%20{(wd:"+itemID+")}SERVICE%20wikibase:label%20{%20bd:serviceParam%20wikibase:language%20%22"+lang+"%22%20}}")
    .then(response => {return response.json()})
    .then(data => {
        let results = data.results.bindings
        if(results[0].itemLabel){
            objItem["label"]= results[0].itemLabel.value;
        }
        if(results[0].itemDescription){
            objItem["description"]= results[0].itemDescription.value;
        }
        if(results[0].itemAltLabel){
            objItem["aliases"]= results[0].itemAltLabel.value;
        }
        objItem["itemID"]= itemID;
        objItem["itemURL"]= "https://www.wikidata.org/wiki/"+itemID;

        return objItem;

    }).then((objItem)=>{
        return fetch("https://query.wikidata.org/sparql?format=json&query=select%20?wdLabel%20?ps_Label%20?ps_%20?wdpqLabel%20?pq_Label%20{VALUES%20(?company)%20{(wd:"+itemID+")}?company%20?p%20?statement%20.?statement%20?ps%20?ps_%20.?wd%20wikibase:claim%20?p.?wd%20wikibase:statementProperty%20?ps.OPTIONAL%20{?statement%20?pq%20?pq_%20.?wdpq%20wikibase:qualifier?pq%20.}SERVICE%20wikibase:label%20{%20bd:serviceParam%20wikibase:language%20%22"+lang+"%22%20}}%20ORDER%20BY%20?wd%20?statement%20?ps_")
        .then(response => {return response.json()})
        .then(data => {
            let results = data.results.bindings;
            for(let i=0; i<results.length; ++i){
                let input = results[i].wdLabel.value;
                let firstWord = true;
                let output = input.replace(/(\w+)(?:\s+|$)/g, function(_, word) {
                    if(firstWord){
                        firstWord = false;
                        return word;
                    }else{
                        return word.charAt(0).toUpperCase() + word.substr(1);
                    }
                });

                if(output in obj){
                    // console.log(results[i].ps_Label.value)
                    if(Object.values(obj).indexOf(results[i].ps_Label.value)== -1) {//make sure that values are unique
                        obj[output].push({
                            id: results[i].ps_.value,
                            value: results[i].ps_Label.value
                        });
                    }
                }else{
                    obj[output]= [];
                    obj[output].push({
                        id: results[i].ps_.value,
                        value: results[i].ps_Label.value
                    });
                }
            }

            for (const [key, value] of Object.entries(obj)) {
                if(value.length == 1){
                    let idQ = value[0].id;
                    if(idQ.includes("http://www.wikidata.org/entity/Q")){
                        let id = idQ.split("/").reverse()[0];
                        Object.defineProperty(objItem, key, {
                            configurable: true,
                            get: async function(){
                                return await wikidata(id, lang);
                            }
                        });
                    }else{
                        objItem[key]= value[0].value;
                    }
                }else{
                    let idQ = value[0].id;
                    if(idQ.includes("http://www.wikidata.org/entity/Q")){
                        let arrPromises = []
                        Object.defineProperty(objItem, key, {
                            configurable: true,
                            get: function(){
                                for(let i=0; i<value.length; ++i){
                                    idQ = value[i].id;
                                    let id = idQ.split("/").reverse()[0];
                                    arrPromises.push(wikidata(id, lang))
                                }
                                return arrPromises;
                                // return Promise.all(arrPromises);
                            }
                        });
                    }else{
                        objItem[key]= [];
                        for(let i=0; i<value.length; ++i){
                            objItem[key].push(value[i].value);
                        }
                    }
                    // console.log(objItem)
                }
            }
            return objItem;
        })
    }).then((result)=>{
        // console.log("OBJ: ", result)
        return result;
    });

}





// module.exports = {
//     wikidata : _wikidata,
//     lookUpWikidata : _lookUpWikidata
// };
// module.exports = {wikidata,lookUpWikidata};

// module.exports
// export default {wikidata,lookUpWikidata};
