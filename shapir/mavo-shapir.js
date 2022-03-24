import {initWikidata, wikidata, queryWikidata} from "https://wikxhibit.org/wikidata.js";
import shapir, {include} from "./shapir.js";

Mavo.dependencies.push(shapir());

export default class Shapir extends Mavo.Backend {
    constructor (url, o) {
        super(url, o);

        this.permissions.on(["read"]);
        this.update(url, o);
        this.ready = shapir();
    }

    update (url, o) {
        super.update(url, o);
        Object.assign(this, o);
    }

    async get (url) {
        if(this.source=="wikxhibit"){
            initWikidata();

            if (this.id != "Shapir") {
                if(this.language)
                    return await wikidata(this.id, this.language);
                else
                    return await wikidata(this.id, "en");
            }
            else {
                // query wikidata with parameters
                return await queryWikidata(this);
            }
        }else{
            if (this.service) { // I added this silly if to avoid returning anything if I used mv-value. Not the best way to handle this case
                if (this.id != "Shapir" && this.service != "wikidata") { //Get an object by ID (for search ignore this.id="Shapir")
                    return await window[this.service][this.type](this.id);
                } else if (this.service == "wikidata") {
                    initWikidata();

                    if (this.id != "Shapir") {
                        if(this.language)
                            return await wikidata(this.id, this.language);
                        else
                            return await wikidata(this.id, "en");
                    }
                    else {
                        // query wikidata with parameters
                        return await queryWikidata(this);
                    }
                } else { // Search one or multiple sites
                    let services = this.service.split(",").map(value => value.trim());

                    if (services.length > 1) { // more than one site
                        let promises = services.map((service) => {
                            return window[service].search(this.search, this);
                        });

                        return Promise.all(promises).then(arrayOfResponses => {
                            // Flatten array of responses
                            return [].concat.apply([], arrayOfResponses);
                        });

                    }
                    else { // just one site
                        return await window[services[0]].search(this.search, this);
                    }
                }
            }
            else { // if uri is provided
                return await uri(this.uri, this.language || "en");
            }
        }

    }

    // Mandatory and very important! This determines when your backend is used.
    // value: The mv-storage/mv-source/mv-init value
    static test (value) {
        return value.startsWith("wikxhibit") || value.startsWith("shapir");
    }
};

Shapir.prototype.id = "Shapir";
Mavo.Backend.register(Shapir);