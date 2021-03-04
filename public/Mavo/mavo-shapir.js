import shapir, {include} from "../shapir.js";

Mavo.dependencies.push(shapir());

Mavo.Backend.register($.Class({
    extends: Mavo.Backend,
    id: "Shapir",
    constructor: function(url, o) {
        this.permissions.on(["read"]);
        this.update(url, o);
        this.ready = shapir();
        // this.id //Add mv-source-id
        // this.search //Add mv-source-search
    },

    update: function(url, o) {
        this.super.update.call(this, url, o);
        Object.assign(this, o);
    },

    get: async function(url) {
        if (this.service){// I added this silly if to avoid returning anything if I used mv-value. Not the best way to handle this case

            if(this.identifier){ //Get an object by ID
                let ret = await window[this.service][this.action](this.identifier);
                return ret;
            }else{ //Search one or multiple sites
                if(this.service.includes(",")){//more than one site
                    let services = this.service.split(",").map(function (value) { return value.trim(); });
                    let promises = [];

                    services.map((service) => {
                        promises.push(window[service][this.action](this.search, this));
                        // I know that "this" includes "this.search" but my global function expects a positional argument for search and an object
                        // e.g. seatgeek.search('Music', {'city': 'New York', 'country': 'US'})
                    })

                    return Promise.all(promises).then(response => {return response})
                    .then(arrayOfResponses =>{
                        return [].concat.apply([], arrayOfResponses);
                    });

                }else{//just one site
                    let ret = await window[this.service][this.action](this.search, this);
                    return ret;
                }
            }
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
