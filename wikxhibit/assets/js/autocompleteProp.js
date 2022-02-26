// https://github.com/ouisharelabs/wikidata-autocomplete

let allProperties, properties = [], propertiesIds = [], values = [], propsValues = [], chosenProperties = [], itemID="", lang = "en", type, numItems=10;

function initAuto(){
  var CORS_PROXY, getJSONWikidataSearchResults, timeoutSetter, wikidataSearch;

  CORS_PROXY = "";

  window.availableTags = [];

  window.taglist = function() {
    var arr;
    arr = [];
    availableTags.forEach(function(item) {
      return arr.push([item.label, item.desc, item.value]);
    });
    return arr;
  };

  window.queries = {};

  window.lastQuery = "";

  window.lastQueried = "";

  window.lang = "";

  $(function() {
    $('body').on('focus', '.property', function(){
    $(this).autocomplete({
      source: availableTags,
      select: function(event, ui) {
        $("#item").val(ui.item.label);
        $("#item-id").val(ui.item.id);
        $("#item-description").html(ui.item.desc);
        $("#item-icon").attr("src", "images/" + ui.item.icon);
        return false;
      }
    }).data("ui-autocomplete")._renderItem = function(ul, item) {
      console.log("item: ", item.value)
      propertiesIds.push(item.value)
      return $("<li>").append("<a id='"+item.label+"' href='javascript:;' onclick='propSelected(this)'>" + item.label + "<br>" + item.desc + "</a>").appendTo(ul);
    };
    return $('.property').on('keyup', function() {
      var lang;
      window.lastQuery = $('.property').val();
      if (!(window.lastQuery.length < 2 || (queries[window.lastQuery] != null) || /^Q[0-9]*$/.test(window.lastQuery) || window.timeout !== null)) {
        lang = "en";//$('#language').val();
        getJSONWikidataSearchResults(window.lastQuery, lang);
        queries[window.lastQuery] = {};
        timeoutSetter();
        return window.lastQueried = window.lastQuery;
      }
    });
});
  });//auto complete

  window.timeout = null;

  timeoutSetter = function() {
    var f;
    window.timeout = "not null";
    f = function() {
      // console.log(new Date());
      window.timeout = null;
      if (window.lastQueried !== window.lastQuery) {
        window.lastQueried = window.lastQuery;
        // console.log("QUERY SAVER!");
        // console.log(queries[window.lastQuery]);
        getJSONWikidataSearchResults(window.lastQuery, lang);
        return timeoutSetter();
      }
    };
    return setTimeout(f, 500);
  };

  wikidataSearch = function(query, language, format) {
    if (language == null) {
      language = "en";
    }
    if (format == null) {
      format = "json";
    }
    return "https://www.wikidata.org/w/api.php?action=wbsearchentities&type=property&language=" + language + "&format=" + format + "&search=" + query;
  };

  getJSONWikidataSearchResults = function(query, language) {

    return $.getJSON(CORS_PROXY + wikidataSearch(query, "en", "json"), function(data) {
      if (data.search != null) {
        return data.search.forEach(function(result) {
          var formatedResult;
          if (result.label != null) {
            formatedResult = {
              value: result.id,
              label: result.label,
              desc: result.description
            };

            availableTags.push(formatedResult);
            return queries[query][result.id] = result;
          }
        });
      }
    });
  };



}
// }).call(this);

function propSelected(e){
  console.log(e.id);
  document.getElementsByClassName("property")[0].value = e.id;
}

////////////////////////////////////////////////////////////////////////////////


function createHTML(){
    $("#htmlCode").show();

    if(itemID!=""){//single item app
        var code = ''

        code += '&lt;!doctype html>'
        code += '&lt;html lang="en">'
        code += '&#10;'

        code += '&lt;head>'
        code += '&nbsp;&nbsp; &lt;meta charset="utf-8">'
        code += '&nbsp;&nbsp; &lt;title>National Memorials&lt;/title>'
        code += '&nbsp;&nbsp; &lt;script src="https://get.mavo.io/stable/mavo.js">&lt;/script>'
        code += '&nbsp;&nbsp; &lt;link rel="stylesheet" href="https://get.mavo.io/stable/mavo.css">'
        code += '&nbsp;&nbsp; &lt;script type="module" src="https://shapir.org/mavo-shapir.js">&lt;/script>'
        code += '&nbsp;&nbsp; &lt;link href="memorials/style.css" rel="stylesheet">'
        code += '&lt;/head>'

        code += '&lt;body>'
        code += '&nbsp;&nbsp; &lt;main class="container">'

        code += '&nbsp;&nbsp; &lt;div mv-app="main" mv-source="shapir" mv-source-service="wikidata" mv-source-id="'+itemID+'" mv-source-language="'+lang+'">'
        code += '&#10;'

        for(var p=0; p<chosenProperties.length; ++p){
            if(chosenProperties[p].type == "notObject"){
                code += '&nbsp;&nbsp;&lt;p property="'+chosenProperties[p].property+'">&lt;/p>'
                code += '&#10;'
            }else{
                code += '&nbsp;&nbsp;&lt;div property="'+chosenProperties[p].property+'">'
                code += '&#10;'
                code += '&nbsp;&nbsp;&nbsp;&nbsp;&lt;p property="label">&lt;/p>'
                code += '&#10;'
                code += '&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- you can add other '+chosenProperties[p].property+' properties -->'
                code += '&#10;'
                code += '&nbsp;&nbsp;&lt;/div>'
                code += '&#10;'
            }
        }

        code += '&lt;/div>'

        document.getElementById("singleItemCode").innerHTML = code;
        Prism.highlightElement($('#singleItemCode')[0]);

    }else{//list of items app

        var code = '', imageCode=''; //new line in HTML
        code += '&lt;!doctype html>'
         code += '&#10;'
        code += '&lt;html lang="en">'
        code += '&#10;'

        code += '&lt;head>'
        code += '&#10;'
        code += '&nbsp;&nbsp;&lt;meta charset="utf-8">'
        code += '&#10;'
        code += '&nbsp;&nbsp;&lt;script src="https://get.mavo.io/stable/mavo.js">&lt;/script>'
        code += '&#10;'
        code += '&nbsp;&nbsp;&lt;link rel="stylesheet" href="https://get.mavo.io/stable/mavo.css">'
        code += '&#10;'
        code += '&nbsp;&nbsp;&lt;script type="module" src="https://shapir.org/mavo-shapir.js">&lt;/script>'
        code += '&#10;'
        // code += '&nbsp;&nbsp;&lt;link href="style.css" rel="stylesheet">'
        code += '&nbsp;&nbsp;&lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">'
        code += '&#10;'
        code += '&lt;/head>'
        code += '&#10;'
        code += '&#10;'

        code += '&lt;body>'
        code += '&#10;'
        code += '&nbsp;&nbsp; &lt;main class="container">'
        code += '&#10;'

        code += '&nbsp;&nbsp;&nbsp;&nbsp; &lt;div mv-app="main" mv-source="shapir" mv-source-service="wikidata" mv-source-language="'+lang+'" mv-source-numberOfItems="'+numItems+'" '
        for(var p=0; p<propsValues.length; ++p){
            code += 'mv-source-'+propsValues[p].property;
            code += '="'+propsValues[p].value +'"';
            code += '&nbsp;'

            if(p+1==propsValues.length){
                code += '>'
                code += '&#10;'

                code += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;div class="grid-container">'
                code += '&#10;'
                code += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;div property="items" mv-multiple class=" grid-item">'
                code += '&#10;'
                code += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;a href="[itemURL]" target="_blank" class="list-group-item list-group-item-action d-flex gap-3 py-3">'
                code += '&#10;'

                for(var p=0; p<chosenProperties.length; ++p){
                    if(chosenProperties[p].property == "image" || chosenProperties[p].property == "flagImage"){
                        code += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;img property="'+chosenProperties[p].property +'" width="20%">  &#10;'
                    }
                }

                code += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;div class="info">'
                code += '&#10;'

                //other properties not image
                for(var p=0; p<chosenProperties.length; ++p){
                    if(chosenProperties[p].property != "image" || chosenProperties[p].property != "flagImage"){
                        if(chosenProperties[p].type == "notObject"){
                            //if label
                            if(chosenProperties[p].property=="label")
                                code += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;h3 property="'+chosenProperties[p].property+'">&lt;/h3>'
                            else
                                code += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;p property="'+chosenProperties[p].property+'">&lt;/p>'
                            code += '&#10;'
                        }else{
                            code += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;div property="'+chosenProperties[p].property+'">'
                            code += '&#10;'
                            code += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;span property="label">&lt;/span>'
                            code += '&#10;'
                            code += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;!-- you can add other '+chosenProperties[p].property+' properties -->'
                            code += '&#10;'
                            code += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/div>'
                            code += '&#10;'
                        }
                    }
                }
                code += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/div>'
                code += '&#10;'
                code += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/a>'
                code += '&#10;'
                code += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/div>'
                code += '&#10;'
                code += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/div>'
                code += '&#10;'

                code += '&nbsp;&nbsp;&nbsp;&nbsp; &lt;/div>'
                code += '&#10;'
                code += '&nbsp;&nbsp; &lt;/main>'
                code += '&#10;'
                code += '&lt;/body>'
                code += '&#10;'
                code += '&lt;/html>'

                document.getElementById("singleItemCode").innerHTML = code;
                Prism.highlightElement($('#singleItemCode')[0]);
            }
        }

    }
}


function buildApp(){
    if($('#language').val()){
        lang = $('#idQ').val();
    }

    if($('#idQ').val()){//specific item
        itemID = $('#idQ').val();
        buildAppSingleItem(itemID, lang)
    }else{//list of items
        propsValues = [];
        getPropertiesValues();
        buildAppListItem(propsValues)
    }
}

function buildAppSingleItem(id, lang){
    import('https://wikxhibit.org/wikidata.js')
        .then((module) => {
            module.wikidata(id, lang).then(data=>{
                console.log(data)
                getPropertiesFromObj(data);
            })//wikidata
        });
}

function buildAppListItem(props){
    import('../../wikidata.js')
        .then((module) => {
            module.initWikidata();
            module.queryWikidata(propsValues).then(data=>{
                getPropertiesFromObj(data[0])
            })
        });

}

function getPropertiesFromObj(data){
    for (const [key, value] of Object.entries(data)) {
        console.log(key)
        if(typeof value === 'object'  && !Array.isArray(value) && value !== null){
            type = "object"
        }else{
            type = "notObject"
        }
        $("#options").append('<div id="option-'+key+'"><input type="checkbox" id="'+key+'" name="'+key+'_'+type+'" value="'+value+'" class="option">&nbsp;<label for="'+key+'">'+key+'</label></div>');
    }

    $('#options').show();

    $('#options').before(
        '</br>'
        +'</br>'
        +'<label class="title">Step 4. Choose the properties you want to show in your application</label>'
        +'</br>'
        +'<input id="search" type="text" style="font-size: 1.3em;  width:200px; display: inline;"class="form-control" placeholder="search properties"/>'
        +'&nbsp;<span><a href="" onclick="return false;" id="search-clear"><i class="fa fa-times"></a></span>'
    );

    $('#search').keyup(function(){
        var valThis = $(this).val().toLowerCase();
        $('input[type=checkbox]').each(function(){
            var text = $('label[for="'+$(this).attr('id')+'"]').text().toLowerCase();
            (text.indexOf(valThis) == 0) ? $(this).parent().show() : $(this).parent().hide();
        });
    });

    // Search clear button
    $("#search-clear").click(function(){
        $("#search").val("");
        $('input[type=checkbox]').each(function(){
            $(this).parent().show();
        });
    });

    //Chosen properties
    $(".option").change(function(){
        chosenProperties = new Array(); //clear array
        $(".option").each(function(){
            if( $(this).is(':checked')){
                chosenProperties.push({
                    property: $(this).attr("name").split("_")[0],
                    type: $(this).attr("name").split("_")[1],
                    value: $(this).val()
                });
            }
        });
        // console.log(chosenProperties)
    });

    $("#create-btn").show();

}

function getPropertiesValues() {
    propsValues= [];

    //get property name
    $('input[type="text"].property').each(function () {
        properties.push($(this).val())
    });
    //get property value
    $('input[type="text"].value').each(function () {
        values.push($(this).val())
    });

    for (var i = 0; i < properties.length; ++i) {
        let firstWord = true;
        let modifiedLabel = properties[i].replace(/(\w+)(?:\s+|$)/g, function (_, word) {
            if (firstWord) {
                firstWord = false;
                return word;
            } else {
                return word.charAt(0).toUpperCase() + word.substr(1);
            }
        });

        let propertyLabel = properties[i].split(" ").join("-")

        propsValues.push({
            id: propertiesIds[i],    //Q31
            label: modifiedLabel,    //e.g. instanceOf
            property: propertyLabel, //e.g. instance-of
            value: values[i]
        })
    }

    console.log("propsValues: ", propsValues);
}

function addPropertyRow() {
    $("#propertiesTable").append('<tr><td><input class="property form-control" type="text" style="font-size: 1.3em;" placeholder="Enter a property"></td><td><input class="value form-control" type="text" style="font-size: 1.3em;" placeholder="Enter a value"></td></tr>');
    // initAuto();
}