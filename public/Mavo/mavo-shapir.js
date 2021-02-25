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
            //constructing one of my global functions from all the mv-source- attributes
            let ret = await window[this.service][this.action](this.params);
            return ret;
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
