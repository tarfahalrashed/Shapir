import {initWikidata, wikidata, uri, queryWikidata} from "https://wikxhibit.org/wikidata.js" //../wikxhibit/wikidata.js";
import shapir, {include} from "./shapir.js";

Mavo.dependencies.push(shapir());

Mavo.Backend.register($.Class({
    extends: Mavo.Backend,
    id: "Shapir",
    constructor: function(url, o) {
        this.permissions.on(["read"]);
        this.update(url, o);
        this.ready = shapir();
    },

    update: function(url, o) {
        this.super.update.call(this, url, o);
        Object.assign(this, o);
    },

    get: async function(url) {
        if (this.service){// I added this silly if to avoid returning anything if I used mv-value. Not the best way to handle this case

            if(this.id !="Shapir" && this.service!="wikidata"){ //Get an object by ID (for search ignore this.id="Shapir")
                let ret = await window[this.service][this.type](this.id);
                return ret;
            }else if(this.service=="wikidata"){
                if(this.id !="Shapir"){
                    initWikidata();
                    return await wikidata(this.id, this.language);

                }else{
                    // query wikidata with parameters
                    initWikidata();
                    return await queryWikidata(this);
                }
            }else{ //Search one or multiple sites
                if(this.service.includes(",")){//more than one site
                    let services = this.service.split(",").map(function (value) { return value.trim(); });
                    let promises = [];

                    services.map((service) => {
                        promises.push(window[service]['search'](this.search, this));
                    })

                    return Promise.all(promises).then(response => {return response})
                    .then(arrayOfResponses =>{
                        return [].concat.apply([], arrayOfResponses);
                    });

                }else{//just one site
                    let ret = await window[this.service]['search'](this.search, this);
                    return ret;
                }
            }
        }else{//if uri is provided
            if(this.language){
                var lang = this.language;
            }else{
                var lang = "en";
            }
            return await uri(this.uri, lang);
        }
    },

    static: {
        // Mandatory and very important! This determines when your backend is used.
        // value: The mv-storage/mv-source/mv-init value
        test: function(value) {
            return value.startsWith("shapir");
        }
    }
}));
