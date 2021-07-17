import shapir, {include} from "./shapir.js";
import { html, define } from 'https://unpkg.com/hybrids@^5';

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
        var el = document.getElementsByTagName('video-object')[0];

        const id= el.getAttribute('idd');
        const service = el.getAttribute('service')
        const type = el.getAttribute('type')
        // console.log(Object.values(el.getAttribute('id')));
        let ret = await window[service][type](id);
        // console.log(ret)

        return ret;
        // if (service){// I added this silly if to avoid returning anything if I used mv-value. Not the best way to handle this case

        //     if(this.id !="Shapir"){ //Get an object by ID (for search ignore this.id="Shapir")
        //         let ret = await window[service][type](id);
        //         console.log(ret)
        //         return ret;
        //     }else{ //Search one or multiple sites
        //         if(this.service.includes(",")){//more than one site
        //             let services = this.service.split(",").map(function (value) { return value.trim(); });
        //             let promises = [];

        //             services.map((service) => {
        //                 promises.push(window[service]['search'](this.search, this));
        //                 // I know that "this" includes "this.search" but my global function expects a positional argument for search and an object
        //                 // e.g. seatgeek.search('Music', {'city': 'New York', 'country': 'US'})
        //                 // My global function already checks if the passed parameters are correct (can be used with the API endpoint).
        //                 // So sending "this" is fine because the function will only take the relevant parameters and ignore the rest
        //             })

        //             return Promise.all(promises).then(response => {return response})
        //             .then(arrayOfResponses =>{
        //                 return [].concat.apply([], arrayOfResponses);
        //             });

        //         }else{//just one site
        //             let ret = await window[this.service]['search'](this.search, this);
        //             return ret;
        //         }
        //     }
        // }
    },

    static: {
        // Mandatory and very important! This determines when your backend is used.
        // value: The mv-storage/mv-source/mv-init value
        test: function(value) {
            return value.startsWith("shapir");
        }
    }
}));
