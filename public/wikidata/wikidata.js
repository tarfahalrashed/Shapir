// let script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = 'js/jquery-3.6.0.min.js';
// document.getElementsByTagName('head')[0].appendChild(script);

// Default Language
let lang = "en";

export async function wikidata(itemID, lang){
    // console.log(itemID)
    let obj ={}, objItem={};

    return fetch("https://query.wikidata.org/sparql?format=json&query=SELECT%20?itemLabel%20?itemDescription%20?itemAltLabel{VALUES%20(?item)%20{(wd:"+itemID+")}SERVICE%20wikibase:label%20{%20bd:serviceParam%20wikibase:language%20%22"+lang+"%22%20}}")
    .then(response => {return response.json()})
    .then(data => {
        let results = data.results.bindings
        objItem["label"]= results[0].itemLabel.value;
        objItem["description"]= results[0].itemDescription.value;
        objItem["aliases"]= results[0].itemAltLabel.value;
        objItem["itemID"]= itemID;

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
                            get: function(){
                                return wikidata(id, lang);
                                // new Promise(function (resolve, reject) {
                                //     try {
                                //         resolve(wikidata(id, lang));
                                //     }catch {
                                //         reject('Error');
                                //     }
                                // });
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
                                // return Promise.all(arrPromises)
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


            // }

            // console.log(objItem)


                // let idQ = results[i].ps_.value;
                // if(idQ.includes("http://www.wikidata.org/entity/Q")){
                //     let id = idQ.split("/").reverse()[0];
                //     let prop = results[i].wdLabel.value;
                    // console.log("prop: ", results[i].ps_Label.value)
                    // console.log("idQ: ", idQ)
                    // if prop exists
            //         Object.defineProperty(obj, prop, {
            //             configurable: true,
            //             get: function(){ //get one or moer values
            //                 return new Promise(function (resolve, reject) {
            //                     try {
            //                         resolve(wikidata(id, lang));
            //                     }catch {
            //                         reject('Error');
            //                     }
            //                 });
            //             }
            //         });
            //     }else{
            //         obj[results[i].wdLabel.value]= results[i].ps_Label.value;

            //         obj[results[i].wdLabel.value].push({
            //             id: results[i].ps_.value,
            //             value: results[i].ps_Label.value
            //         });

            //     }
            // }



                // let idQ = results[i].ps_.value;
                // if(idQ.includes("http://www.wikidata.org/entity/Q")){
                //     let id = idQ.split("/").reverse()[0];
                //     let prop = results[i].wdLabel.value;
                    // console.log("prop: ", results[i].ps_Label.value)
                    // console.log("idQ: ", idQ)
                    // if prop exists
            //         Object.defineProperty(obj, prop, {
            //             configurable: true,
            //             get: function(){ //get one or moer values
            //                 return new Promise(function (resolve, reject) {
            //                     try {
            //                         resolve(wikidata(id, lang));
            //                     }catch {
            //                         reject('Error');
            //                     }
            //                 });
            //             }
            //         });
            //     }else{
            //         obj[results[i].wdLabel.value]= results[i].ps_Label.value;
            //     }
            // }
