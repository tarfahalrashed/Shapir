import {wikidata, lookUpWikidata} from "./wikidata.js";

// Mavo.dependencies.push(wiki());
var firstTime = true;

Mavo.Backend.register($.Class({
    extends: Mavo.Backend,
    id: "Wikidata",
    constructor: function(url, o) {
        this.permissions.on(["read"]);
        this.update(url, o);
        // this.ready = wiki();
    },

    update: function(url, o) {
        this.super.update.call(this, url, o);
        Object.assign(this, o);
    },

    get: async function(url) {
        if(this.service){
            //look for the item that contains this ID (it can be a wikidata id OR any ID)
            return lookUpWikidata(this.service, this.id, "en")
            // .then(itemQ => {
            //     console.log("itemQ: ", itemQ);
            //     return await module.exports.wikidata(itemQ, "en");
            // });
        }else{ //get a specific item from wikidata
            return await wikidata(this.item, this.language);
        }
    },

    static: {
        // Mandatory and very important! This determines when your backend is used.
        // value: The mv-storage/mv-source/mv-init value
        test: function(value) {
            return value.includes("wikidata");
        }
    }
}));
