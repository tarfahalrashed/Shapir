var config = {
  apiKey: "AIzaSyBaJakjjAHw0wvBtELAtDLPmhq1piGWwqQ",
  authDomain: "superapi-52bc2.firebaseapp.com",
  databaseURL: "https://superapi-52bc2.firebaseio.com",
  projectId: "superapi-52bc2",
  storageBucket: "superapi-52bc2.appspot.com",
  messagingSenderId: "859121565515"
};


/******************* doc.html *******************/

var abstractObj={} //=>{site:object}
function docOnLoad(){
  firebase.initializeApp(config);

  function loadSelect(){

    return firebase.database().ref('/abstractions/').once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        // console.log("site object: ", childSnapshot.key)
        $("#sites").append("<option id="+childSnapshot.key+">"+childSnapshot.key+"</option>");
        var key = childSnapshot.key;
        abstractObj[key] = childSnapshot.val();
      });
    });

  }

    loadSelect().then(()=>{
      // console.log("abstractObj: ", abstractObj)
      jQuery('.selectpicker').selectpicker('refresh');
    })

}


var functions="", objects="";

function abstractionSiteHasBeenChosen(select){
  //empty codes
  document.getElementById('function').innerHTML=""
  document.getElementById('object').innerHTML=""

  site = select.options[select.selectedIndex].getAttribute("id");
  // console.log("value: ", abstractObj[site]);
  functions= abstractObj[site].functions;
  objects= abstractObj[site].objects;

  for(var i=0; i<functions.length; ++i){
    var endpoint = abstractObj[site].functions[i].endpoint
    var name = abstractObj[site].functions[i].name
    var object = abstractObj[site].functions[i].object
    var arry = abstractObj[site].functions[i].array

    if(arry){
      var objectStr = 'a list of '+abstractObj[site].functions[i].object;
    }else{
      var objectStr = object
    }

    var params=[]
    firebase.database().ref('/apis/'+endpoint).once('value').then(function(snapshot) {
      params = snapshot.val().parameters;
      // console.log("params! ", params)
    }).then(()=>{
      var func = site+'.'+ name+'({';
      for(var p=0; p< params.length; ++p){
        if(params[p].displayed==true){
          // console.log(params[p].name)
          // console.log(params[p].value)
          func+=JSON.stringify(params[p].name);
          func+=':';
          func+=JSON.stringify(params[p].value);
          if(p+1<params.length){
            func+=', ';
          }
        }
      }
      func+='})';

      $("#functions").show();
      document.getElementById('function').innerHTML += func + '&nbsp; //return ' + objectStr;
      document.getElementById('function').innerHTML += '\n\n';
      Prism.highlightElement($('#function')[0]);
    })

  }//end of functions

  $("#objects").show();

  for(o in objects){

    // var div = document.getElementById('object'),
    // clone = div.cloneNode(true); // true means clone all childNodes and all event handlers
    // clone.id = o;
    // document.getElementById('preObjects').appendChild(clone);

    // $("#objects").append('<pre style="display: inline;" class="language-javascript"><code id="'+o+'" class="language-javascript"></code></pre>')

    // console.log(objects[o]);
    document.getElementById('object').innerHTML += '\n';
    document.getElementById('object').innerHTML += '//'+o;
    document.getElementById('object').innerHTML += '\n';

    var oName= o[0].toLowerCase() + o.slice(1);
    //get
    var func = site+'.'+ o +'("ID")';
    document.getElementById('object').innerHTML += 'var '+oName+' = '+func + '&nbsp; //return a specific ' + o + ' from '+ site;
    document.getElementById('object').innerHTML += '\n\n';

    var properties = objects[o].properties;
    document.getElementById('object').innerHTML += '//'+o+' propertiesto get and set\n';
    //properties
    for(p in properties){
      document.getElementById('object').innerHTML += oName+'.'+properties[p].property +'\n';
    }

    //if methods or delete
    if(objects[o].delete || objects[o].methods){
      var methods = objects[o].methods;
      document.getElementById('object').innerHTML += '//'+o+' methods \n';
    }

    //Delete
    if(objects[o].delete){
      document.getElementById('object').innerHTML += oName+'.delete() &nbsp; //delete this ' + o + ' from '+ site+ '\n';
    }

    //methods
    if(objects[o].methods){
      for(m in methods){//for each method
        var mEndpoint = methods[m].endpoint
        var mParams=[];
        firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
          mParams = snapshot.val().parameters;
        }).then(()=>{
          if(mParams.length==1 && mParams[0].name==objects[o].id){// if the param passed is the id (need to chnage shapir code)
            var args='()';
          }else{
            var args =''
            args += '({';
            for(var p=0; p< mParams.length; ++p){
              if(mParams[p].displayed==true){
                // console.log(mParams[p].name)
                // console.log(mParams[p].value)
                args+=JSON.stringify(mParams[p].name);
                args+=':';
                args+=JSON.stringify(mParams[p].value);
                if(p+1<mParams.length){
                  args+=', ';
                }
              }
            }
            args+='})';
          }

          document.getElementById('object').innerHTML += oName+'.' + methods[m].name + args  +'\n';
        })

      }//loop methods
    }

    //Create
    // if(objects[o].add){
    //   // console.log("add: ", objects[o].add)
    //   var aEndpoint = objects[o].add.endpoint
    //   var aParams=[];
    //   firebase.database().ref('/apis/'+aEndpoint).once('value').then(function(snapshot) {
    //     aParams = snapshot.val().parameters;
    //     // console.log("aParams! ", aParams)
    //   }).then(()=>{
    //       var args =''
    //       args += '({';
    //       for(var p=0; p< aParams.length; ++p){
    //         if(aParams[p].displayed==true){
    //           // console.log(aParams[p].name)
    //           // console.log(aParams[p].value)
    //           args+=JSON.stringify(aParams[p].name);
    //           args+=':';
    //           args+=JSON.stringify(aParams[p].value);
    //           if(p+1<aParams.length){
    //             args+=', ';
    //           }
    //         }
    //     }
    //     args+='})';
    //     document.getElementById('object').innerHTML += site+'.'+o+'.create'+args +'\n';
    //   })
    // }


    //Search site for object(s)
    // document.getElementById('object').innerHTML += '//Search '+site+' for '+o+ '\n';

    Prism.highlightElement($('#object')[0]);

  }//end of objects

}

/******************* doc.html *******************/



function showOrHideExample(){

  if($("#json").is(":hidden")){
    $("#json").show();
    document.getElementById("exampleLink").innerText="(hide)";
  }else{
    $("#json").hide();
    document.getElementById("exampleLink").innerText="(show)";
  }

}


//NEW
function openNav(id) {

  closeNav();
  closeNavType();
  closeNavMethod();

  var typeName = id.split('.')[0]
  var propName = id.split('.')[1]

  $("#properties-type").empty();
  $("#properties-type").append("<option selected>Add Property</option>");

  var types = allTheType[typeName][propName].types;

  for(var i=0; i<types.length; ++i){
    $("#properties-type").append('<option value="'+types[i]+'">'+types[i]+'</option>')
  }

  document.getElementById("mySidenav").style.width = "550px";
  document.getElementById('property-name').innerHTML= id.split('.')[1];
  document.getElementById('property-description').innerHTML= allTheType[typeName][propName].desc.replace(/(<([^>]+)>)/gi, "");;

  jQuery('.selectpicker').selectpicker('refresh');

}


function closeNav() {
  document.getElementById("mySidenav").style.width = "0";

  document.getElementById("property-div").reset();
  $("#property-type").hide();
  // document.getElementById("properties-type").value = "string";
}


var clickedType=""

function openNavType(id) {
  closeNav();
  closeNavType();
  closeNavMethod();

  document.getElementById("mySidenavType").style.width = "550px";
  document.getElementById("mySidenavType").style.padding = "10px";
  // console.log("the name of the type: ", id.getAttribute("id"));
  //document.getElementById('type-name').value= i.getAttribute("id")
  console.log("THE type: ", id);
  clickedType = id

  $("#typeN").text(id);
  // $("#siteN").text(site);

  //get tab
  var siteC = site.charAt(0).toUpperCase() + site.slice(1)
  $("#sel_siteTitle").text(siteC);
  $("#sel_obTitle").text(id);
  $("#sel_site").text(siteC);
  $("#sel_ob").text(id);
  $("#selected_type").text(id);
  $("#sel_typeMap").text(id);

  //update tab
  $("#sel_siteTitle_up").text(siteC);
  $("#sel_obTitle_up").text(id);
  $("#sel_site_up").text(siteC);
  $("#sel_ob_up").text(id);
  $("#selected_type_up").text(id);

  //remove tab
  $("#sel_siteTitle_re").text(siteC);
  $("#sel_obTitle_re").text(id);
  $("#sel_site_re").text(siteC);
  $("#sel_ob_re").text(id);
  $("#selected_type_re").text(id);

   //add tab
   $("#sel_siteTitle_add").text(siteC);
   $("#sel_obTitle_add").text(id);
   $("#sel_site_add").text(siteC);
   $("#sel_ob_add").text(id);
   $("#selected_type_add").text(id);

  // $("#apis-type").empty();

  $("#accordion").empty()
  $("#accordion-add").empty()
  $("#accordion-remove").empty()
  $("#accordion-update").empty()

  $("#idLabel").hide();
  $("#mapLabel").hide();


  for(var i=0; i<scrapirAPIs.length; ++i){
    var urlText = scrapirAPIs[i].url;
      if(urlText.includes(site)){
        noSpacesTitle = scrapirAPIs[i].title.split(' ').join('');
        $("#accordion").append('<div class="card"><div class="card-header pointer-cursor d-flex justify-content-between align-items-center collapsed" data-toggle="collapse" data-target="#'+noSpacesTitle+'">'+scrapirAPIs[i].title+'<button type="button" class="btn btn-grey" id="'+scrapirAPIs[i].title+'" onclick="urlHasBeenChosen(this)"  style="float: right;">select</button> </div><div id="'+noSpacesTitle+'" class="collapse" data-parent="#accordion"><div class="card-body" id="cardBody'+noSpacesTitle+'"> </div></div></div>')
        $("#cardBody"+noSpacesTitle).append('<label><B>API URL:</B></label><p>'+scrapirAPIs[i].url+'<p>')


        $("#accordion-add").append('<div class="card"><div class="card-header pointer-cursor d-flex justify-content-between align-items-center collapsed" data-toggle="collapse" data-target="#'+noSpacesTitle+'">'+scrapirAPIs[i].title+'<button type="button" class="btn btn-grey" id="'+scrapirAPIs[i].title+'" onclick="urlHasBeenChosenAdd(this)"  style="float: right;">select</button> </div><div id="'+noSpacesTitle+'" class="collapse" data-parent="#accordion-add"><div class="card-body" id="cardBodyAdd'+noSpacesTitle+'"> </div></div></div>')
        $("#cardBodyAdd"+noSpacesTitle).append('<label><B>API URL:</B></label><p>'+scrapirAPIs[i].url+'<p>')
        // $("#cardBodyAdd"+noSpacesTitle).append('<label><B>Parameters:</B></label><p>'+scrapirAPIs[i].params+'<p>')
        // $("#cardBodyAdd"+noSpacesTitle).append('<label><B>Response Fields:</B></label><p>'+scrapirAPIs[i].res+'<p>')

        $("#accordion-remove").append('<div class="card"><div class="card-header pointer-cursor d-flex justify-content-between align-items-center collapsed" data-toggle="collapse" data-target="#'+noSpacesTitle+'">'+scrapirAPIs[i].title+'<button type="button" class="btn btn-grey" id="'+scrapirAPIs[i].title+'" onclick="urlHasBeenChosenRemove(this)"  style="float: right;">select</button> </div><div id="'+noSpacesTitle+'" class="collapse" data-parent="#accordion-remove"><div class="card-body" id="cardBodyRemove'+noSpacesTitle+'"> </div></div></div>')
        $("#cardBodyRemove"+noSpacesTitle).append('<label><B>API URL:</B></label><p>'+scrapirAPIs[i].url+'<p>')
        // $("#cardBodyRemove"+noSpacesTitle).append('<label><B>Parameters:</B></label><p>'+scrapirAPIs[i].params+'<p>')
        // $("#cardBodyRemove"+noSpacesTitle).append('<label><B>Response Fields:</B></label><p>'+scrapirAPIs[i].res+'<p>')

        $("#accordion-update").append('<div class="card"><div class="card-header pointer-cursor d-flex justify-content-between align-items-center collapsed" data-toggle="collapse" data-target="#'+noSpacesTitle+'">'+scrapirAPIs[i].title+'<button type="button" class="btn btn-grey" id="'+scrapirAPIs[i].title+'" onclick="urlHasBeenChosenUpdate(this)"  style="float: right;">select</button> </div><div id="'+noSpacesTitle+'" class="collapse" data-parent="#accordion-update"><div class="card-body" id="cardBodyUpdate'+noSpacesTitle+'"> </div></div></div>')
        $("#cardBodyUpdate"+noSpacesTitle).append('<label><B>API URL:</B></label><p>'+scrapirAPIs[i].url+'<p>')
        // $("#cardBodyUpdate"+noSpacesTitle).append('<label><B>Parameters:</B></label><p>'+scrapirAPIs[i].params+'<p>')
        // $("#cardBodyUpdate"+noSpacesTitle).append('<label><B>Response Fields:</B></label><p>'+scrapirAPIs[i].res+'<p>')

        if(scrapirAPIs[i].params){
          $("#cardBody"+noSpacesTitle).append('<label><B>Parameters:</B></label><p>'+scrapirAPIs[i].params+'<p>');
          $("#cardBodyRemove"+noSpacesTitle).append('<label><B>Parameters:</B></label><p>'+scrapirAPIs[i].params+'<p>');
          $("#cardBodyUpdate"+noSpacesTitle).append('<label><B>Parameters:</B></label><p>'+scrapirAPIs[i].params+'<p>')
        }
        if(scrapirAPIs[i].res){
          $("#cardBody"+noSpacesTitle).append('<label><B>Response Fields:</B></label><p>'+scrapirAPIs[i].res+'<p>');
          $("#cardBodyRemove"+noSpacesTitle).append('<label><B>Response Fields:</B></label><p>'+scrapirAPIs[i].res+'<p>');
          $("#cardBodyUpdate"+noSpacesTitle).append('<label><B>Response Fields:</B></label><p>'+scrapirAPIs[i].res+'<p>');
        }


        // $("#apis-type").append("<option data-subtext='"+scrapirAPIs[i].url+"' id="+JSON.stringify(scrapirAPIs[i].title)+">"+scrapirAPIs[i].title+"</option>");
      }
  }

  // <ul id="params">
  // <li><span>Parameters</span>
  //   <ul >
  //     <li>Water</li>
  //     <li>Coffee</li>
  //     <li><span class="caret">Tea</span>
  //   </ul>
  // <li>
  // </ul>


  setTimeout(() => {
    jQuery('.selectpicker').selectpicker('refresh');
  }, 2000);

}

function closeNavType() {
  document.getElementById("mySidenavType").style.width = "0";
  document.getElementById("mySidenavType").style.padding = "0";
}

var methodName="", methodParent="";

function openNavMethod(elem) {
  closeNav();
  closeNavType();
  closeNavMethod();

  document.getElementById("mySidenavMethod").style.width = "550px";

  methodName= elem.id.split('.')[1];
  methodParent= elem.id.split('.')[0];//id.split('OBJ')[1];

  console.log("the name of the method: ", methodName)
  console.log("the value of the method's parent: ",methodParent)
  document.getElementById('meth-name').value= methodName;

  // $("#apis-url-method").empty();
  $("#accordion-method").empty();


  $("#sel_site_meth").text(site.charAt(0).toUpperCase() + site.slice(1));
  $("#sel_ob_meth").text(methodName);

  for(var i=0; i<scrapirAPIs.length; ++i){
    var urlText = scrapirAPIs[i].url;
    if(urlText.includes(site)){
      // $("#apis-url-method").append("<option data-subtext='"+scrapirAPIs[i].url+"' id="+JSON.stringify(scrapirAPIs[i].title)+">"+scrapirAPIs[i].title+"</option>");
      var noSpacesTitle = scrapirAPIs[i].title.split(' ').join('');
      $("#accordion-method").append('<div class="card"><div class="card-header pointer-cursor d-flex justify-content-between align-items-center collapsed" data-toggle="collapse" data-target="#'+noSpacesTitle+'">'+scrapirAPIs[i].title+'<button type="button" class="btn btn-grey" id="'+scrapirAPIs[i].title+'" onclick="urlHasBeenChosenForMethod(this)"  style="float: right;">select</button> </div><div id="'+noSpacesTitle+'" class="collapse" data-parent="#accordion-method"><div class="card-body" id="cardBodyM'+noSpacesTitle+'"> </div></div></div>')

      $("#cardBodyM"+noSpacesTitle).append('<label><B>API URL:</B></label><p>'+scrapirAPIs[i].url+'<p>')
      $("#cardBodyM"+noSpacesTitle).append('<label><B>Parameters:</B></label><p>'+scrapirAPIs[i].params+'<p>')
      $("#cardBodyM"+noSpacesTitle).append('<label><B>Response Fields:</B></label><p>'+scrapirAPIs[i].res+'<p>')

    }
  }

  setTimeout(() => {
    jQuery('.selectpicker').selectpicker('refresh');
  }, 2000);

}


function closeNavMethod() {
  document.getElementById("mySidenavMethod").style.width = "0";
}



$("button").click(function() {
  console.log("VAL: ", $(this).val());
  // alert(fired_button);
});



var status = "success"

function responseMessage(response, status){
  //JSON Response Using JSONEDITOR
  var container, options, json, editor;

  container = document.getElementById('jsoneditor2');

  options = {
    mode: 'view',
    // modes: ['code', 'form', 'text', 'tree','view'],
    // ace: ace,
    onError: function (err) {
      alert(err.toString());
    },
    onChange: function () {
      //console.log('change');
    },
    onModeChange: function (mode) {
      var treeMode = document.getElementById('treeModeSelection');
      var textMode = document.getElementById('textModeSelection');

      treeMode.style.display = textMode.style.display = 'none';

      if (mode === 'code' || mode === 'text') {
        textMode.style.display = 'inline';
      } else {
        treeMode.style.display = 'inline';
      }
    },
    indentation: 4,
    escapeUnicode: true,

    onTextSelectionChange: function(start, end, text) {
      var rangeEl = document.getElementById('textRange');
      rangeEl.innerHTML = 'start: ' + JSON.stringify(start) + ', end: ' + JSON.stringify(end);
      var textEl = document.getElementById('selectedText');
      textEl.innerHTML = text;
    },
    onSelectionChange: function(start, end) {
      var nodesEl = document.getElementById('selectedNodes');
      nodesEl.innerHTML = '';
      if (start) {
        nodesEl.innerHTML = ('start: '  + JSON.stringify(start));
        if (end) {
          nodesEl.innerHTML += ('<br/>end: '  + JSON.stringify(end));
        }
      }
    },
    onEvent: function(node, event) {
     if(status == "success"){
      if (event.type === 'click') {
        document.getElementById("toggRes").scrollIntoView();
        // console.log("clicked: ", node.path);
          var textEl = document.getElementById('selectedText');
         //  console.log("node.path: ",node.path);
         //  console.log("node: ",node);

          var paramValue = eval("response."+prettyPrintPath(node.path));
          // console.log(eval("response."+prettyPrintPath(node.path));
          var s1 = node.field;
          var s2 = prettyPrintPath(node.path);
          var xx1 = s1.concat("/");
          xx = xx1.concat(s2);

          if(fields_paths){

          }else{
            fields_paths=[];
          }
          var exists = false;

          for(var i=0; i<fields_paths.length; ++i){
            if(fields_paths[i] == xx){
              exists=true;
            }
          }

          if(exists){

          }else{
            fields_paths.push(xx);
            var safevalue= node.field;
            r1=prettyPrintPath(node.path).replace(/[0-9]/,'');
            r2=r1.replace('[','');
            r3=r2.replace(']','');

            var nameDefaule1 = node.field.split('_');
            for (var i = 0; i < nameDefaule1.length; i++) {
               nameDefaule1[i] = nameDefaule1[i].charAt(0).toUpperCase() + nameDefaule1[i].substring(1);
           }

          var nameDefaule = nameDefaule1.join(' ');
          $("#fields tbody").append('<tr id="'+xx+'"><td>'+node.field+'</td><td><input type="text" class="form-control" id="displayName'+s1+'" placeholder="" value="'+nameDefaule+'" onchange="urlBlurNoCall()" style="font-size:1em"></td> <td><input type="text" class="form-control" id="displayDesc'+s1+'" placeholder="" onchange="urlBlurNoCall()"> </td> <td><input id='+xx+' type="image" src="images/del.png" style="width:18px"onclick="printFunc(this)"> </td> </tr>');
          urlBlurNoCall();
      }//else does not exists

    }//end og if clicked
   }

       function hasNumbers(t){
         var regex = /\d/g;
         return regex.test(t);
       }

       function prettyPrintPath(path) {
         // console.log("Path: ",path);
                    var str = '';
                    for (var i=0; i<path.length; i++) {
                     //  console.log("Path: ",path[i]);
                      var element = path[i];
                      if (typeof element === 'number') {
                        if(i!=0){
                          str += '[' + element + ']'
                        }
                      } else if(element.includes(' ')) {
                        str += "['"+element+"']";
                       //  console.log(str)
                      }else {
                       //  console.log("str: ",str);

                        if (str.length > 0){
                          if(hasNumbers(element)){
                           str += '['+element+']';
                          }else{
                           str += '.';
                           str += element;
                          }
                        }else{
                         str += element;
                        }


                       //  if (str.length > 0)str += '.';
                       //  str += element;
                      }
                    }
                   //  console.log("str: ",str);
                    return str;
                  }
    }

  };

  $("#jsoneditor2").empty();

  if(status == "success"){
    json = response;
    var bgcolor = "#f2f9ee";
   }else{
     if(response.hasOwnProperty('responseText')){
       // if(IsJsonString(response.responseText)){
       //   json = flatten(JSON.parse(response.responseText));
       // }else{
       //   json = flatten(response.responseText);
       // }

       if(IsJsonString(response.responseText)){
         json = JSON.parse(response.responseText);
       }else{
         json = response.responseText;
       }

         function IsJsonString(str) {
             try {
                 JSON.parse(str);
             } catch (e) {
                 return false;
             }
             return true;
         }


         function flatten(obj) {
         var flattenedObj = {};
         Object.keys(obj).forEach(function(key){
             if (typeof obj[key] === 'object') {
                 $.extend(flattenedObj, flatten(obj[key]));
             } else {
                 flattenedObj[key] = obj[key];
             }
         });
         return flattenedObj;
         }

     }else{
       json = response;
     }
    var bgcolor = "#fceff1";
   }

   window.editor = new JSONEditor(container, options, json);
   document.getElementById('jsoneditor2').style.backgroundColor=bgcolor;
   window.editor.expandAll();

}


var ob={};

function addSchemaToFunctions(){
  // ob = '{"VideoObject": {"apiEndpoint": "Dailymotion Videos Search", "fields":[{"field": "title", "property": "name"}, {"field": "description", "property": "description"}]} }'
  console.log("objec: ", ob)
  // firebase.database().ref('functions/'+site).set(obj)
}


var once=false
var scrapirAPIs = [];
var allSchemaTypesButActions = [];

// window.onload = function () {
function fetchSchemaTypes(){

  $('.tool')
  .attr('data-toggle', 'tooltip')
  .attr('data-placement', 'right')
  .tooltip({
    trigger: 'manual'
  })
  .tooltip('show');

if(!once){
  once=true;

  firebase.initializeApp(config);

  websites=['4shared', 'abc', 'abcnews', 'about', 'aboutads', 'abril', 'academia', 'accounts', 'addthis', 'addtoany', 'adobe', 'adssettings', 'afternic', 'akamaihd', 'alibaba', 'aliexpress', 'allaboutcookies', 'amazon', 'amzn', 'android', 'answers', 'aol', 'ap', 'apache', 'apple', 'archive', 'archives', 'arxiv', 'asus', 'bandcamp', 'bbc', 'berkeley', 'biblegateway', 'biglobe', 'billboard', 'bing', 'bit', 'bitly', 'blackberry', 'bloglovin', 'bloomberg', 'booking', 'books', 'boston', 'box', 'bp', 'bp1', 'bp2', 'brandbucket', 'britannica', 'bt', 'businessinsider', 'buydomains', 'buzzfeed', 'calameo', 'cambridge', 'canva', 'cbc', 'cbslocal', 'cbsnews', 'cdc', 'change', 'channel4', 'chicagotribune', 'chinadaily', 'chron', 'cia', 'cloudflare', 'cmu', 'cnbc', 'cnet', 'cnn', 'code', 'columbia', 'consumerreports', 'cornell', 'corriere', 'cpanel', 'creativecommons', 'csmonitor', 'dailymail', 'dailymotion', 'dan', 'daum', 'de', 'debian', 'deezer', 'dell', 'depositfiles', 'detik', 'developers', 'dictionary', 'digg', 'digitaltrends', 'discovery', 'disney', 'disqus', 'docs', 'doubleclick', 'draft', 'dreniq', 'drive', 'dropbox', 'dw', 'e-monsite', 'e-recht24', 'ea', 'ebay', 'economist', 'ed', 'ehow', 'elmundo', 'elpais', 'elsevier', 'en', 'enable-javascript', 'engadget', 'eonline', 'epa', 'es', 'espn', 'etsy', 'europa', 'eventbrite', 'evernote', 'example', 'express', 'facebook', 'fandom', 'fastcompany', 'fb', 'fda', 'feedburner', 'feedproxy', 'fifa', 'files', 'finance', 'forbes', 'forms', 'fortune', 'foursquare', 'foxnews', 'fr', 'ft', 'ftc', 'get', 'ggpht', 'giphy', 'github', 'gizmodo', 'globo', 'gmail', 'gnu', 'godaddy', 'gofundme', 'goo', 'goodreads', 'google', 'googleblog', 'googleusercontent', 'gravatar', 'greenpeace', 'groups', 'gstatic', 'guardian', 'harvard', 'hatena', 'hm', 'hollywoodreporter', 'house', 'hp', 'huawei', 'huffingtonpost', 'huffpost', 'hugedomains', 'ibm', 'icann', 'id', 'ietf', 'ig', 'ign', 'ikea', 'imageshack', 'imdb', 'inc', 'independent', 'indiatimes', 'instagram', 'instructables', 'intel', 'ipv4', 'iso', 'issuu', 'istockphoto', 'it', 'iubenda', 'ja', 'jimdofree', 'khanacademy', 'kickstarter', 'last', 'latimes', 'lefigaro', 'lemonde', 'lifehacker', 'line', 'linkedin', 'list-manage', 'live', 'liveinternet', 'loc', 'lonelyplanet', 'm', 'mail', 'maps', 'marketingplatform', 'marketwatch', 'marriott', 'mashable', 'mayoclinic', 'mediafire', 'medium', 'mega', 'megaupload', 'merriam-webster', 'metro', 'microsoft', 'mirror', 'mit', 'mixcloud', 'mozilla', 'msn', 'my', 'myaccount', 'myspace', 'mysql', 'namecheap', 'narod', 'nasa', 'nationalgeographic', 'nature', 'naver', 'nba', 'nbcnews', 'netflix', 'netvibes', 'networkadvertising', 'news', 'newsweek', 'newyorker', 'nginx', 'nicovideo', 'nih', 'nikkei', 'noaa', 'nokia', 'npr', 'nvidia', 'nydailynews', 'nypost', 'nytimes', 'office', 'ok', 'opera', 'oracle', 'orange', 'oreilly', 'oup', 'over-blog-kiwi', 'ovh', 'ox', 'parallels', 'paypal', 'pbs', 'pcmag', 'pexels', 'photobucket', 'photos', 'php', 'picasa', 'picasaweb', 'pinterest', 'pixabay', 'pl', 'play', 'playstation', 'plesk', 'plos', 'plus', 'policies', 'politico', 'prestashop', 'princeton', 'privacyshield', 'prnewswire', 'psu', 'psychologytoday', 'pt', 'public-api', 'qq', 'quora', 'rakuten', 'rapidshare', 'rediff', 'repubblica', 'researchgate', 'reuters', 'reverbnation', 'ria', 'rollingstone', 'rottentomatoes', 'rt', 'ru', 'samsung', 'sapo', 'sciencedaily', 'sciencedirect', 'sciencemag', 'scientificamerican', 'scoop', 'scribd', 'search', 'secureserver', 'sedo', 'sendspace', 'sfgate', 'shop-pro', 'shopify', 'shutterstock', 'si', 'sina', 'sites', 'sky', 'skype', 'slate', 'slideshare', 'smh', 'so-net', 'softpedia', 'soratemplates', 'soundcloud', 'spiegel', 'sports', 'spotify', 'springer', 'sputniknews', 'ssl-images-amazon', 'stackoverflow', 'standard', 'stanford', 'state', 'statista', 'steampowered', 'storage', 'stuff', 'support', 'surveymonkey', 't', 'tabelog', 'target', 'teamviewer', 'techcrunch', 'techradar', 'ted', 'telegram', 'telegraph', 'terra', 'theatlantic', 'thedailybeast', 'thefreedictionary', 'theglobeandmail', 'theguardian', 'themeforest', 'thestar', 'thesun', 'thetimes', 'theverge', 'thoughtco', 'time', 'timeout', 'tinyurl', 'tools', 'translate', 'tripadvisor', 'trustpilot', 'twitch', 'twitter', 'ubuntu', 'ucoz', 'umich', 'un', 'unesco', 'unsplash', 'uol', 'urbandictionary', 'usatoday', 'usgs', 'usnews', 'utexas', 'variety', 'vchecks', 'venturebeat', 'viagens', 'vice', 'video', 'vimeo', 'vk', 'vox', 'w3', 'wa', 'walmart', 'washington', 'washingtonpost', 'weather', 'webmd', 'weibo', 'welt', 'whatsapp', 'whitehouse', 'who', 'wikia', 'wikihow', 'wikimedia', 'wiktionary', 'wiley', 'windowsphone', 'wired', 'wordpress', 'worldbank', 'wp', 'wsj', 'www', 'xbox', 'xing', 'xinhuanet', 'yadi', 'yahoo', 'yale', 'yandex', 'yelp', 'youronlinechoices', 'youtu', 'youtube', 'ytimg', 'zeit', 'zendesk', 'ziddu'];
  var allTypes = ["API Reference","About Page","Accept Action","Accounting Service","Achieve Action","Action","Add Action","Administrative Area","Adult Entertainment","Aggregate Offer","Aggregate Rating","Agree Action","Airport","Alignment Object","Allocate Action","Amusement Park","Anatomical Structure","Anatomical System","Animal Shelter","Apartment Complex","Append Action","Apply Action","Approved Indication","Aquarium","Arrive Action","Art Gallery","Artery","Article","Ask Action","Assess Action","Assign Action","Attorney","Audience","Audio Object","Authorize Action","Auto Body Shop","Auto Dealer","Auto Parts Store","Auto Rental","Auto Repair","Auto Wash","Automated Teller","Automotive Business","Bakery","Bank or Credit Union","Bar or Pub","Beach","Beauty Salon","Bed And Breakfast","Befriend Action","Bike Store","Blog","Blog Posting","Blood Test","Body of Water","Bone","Book","Book Format Type","Book Store","Bookmark Action","Borrow Action","Bowling Alley","Brain Structure","Brand","Brewery","Broadcast Event","Broadcast Service","Buddhist Temple","Bus Station","Bus Stop","Business Audience","Business Entity Type","Business Event","Business Function","Buy Action","Cafe or Coffee Shop","Campground","Canal","Cancel Action","Casino","Catholic Church","Cemetery","Check Action","Check in Action","Check Out Action","Checkout Page","Child Care","Childrens Event","Choose Action","Church","City","City Hall","Civic Structure","Class","Clip","Clothing Store","Code","Collection Page","College or University","Comedy Club","Comedy Event","Comment","Comment Action","Communicate Action","Computer Store","Confirm Action","Consume Action","Contact Page","Contact Point","Contact Point Option","Continent","Convenience Store","Cook Action","Corporation","Country","Courthouse","Create Action","Creative Work","Credit Card","Crematorium","D Dx Element","Dance Event","Dance Group","Data Catalog","Data Download","Dataset","Day of Week","Day Spa","Defence Establishment","Delete Action","Delivery Charge Specification","Delivery Event","Delivery Method","Demand","Dentist","Depart Action","Department Store","Diagnostic Lab","Diagnostic Procedure","Diet","Dietary Supplement","Disagree Action","Discover Action","Dislike Action","Distance","Donate Action","Dose Schedule","Download Action","Draw Action","Drink Action","Drug","Drug Class","Drug Cost","Drug Cost Category","Drug Legal Status","Drug Pregnancy Category","Drug Prescription Status","Drug Strength","Dry Cleaning or Laundry","Duration","Eat Action","Education Event","Educational Audience","Educational Organization","Electrician","Electronics Store","Elementary School","Embassy","Emergency Service","Employment Agency","Endorse Action","Energy","Entertainment Business","Enumeration","Episode","Event","Event Status Type","Event Venue","Exercise Action","Exercise Gym","Exercise Plan","Fast Food Restaurant","Festival","Film Action","Financial Service","Find Action","Fire Station","Florist","Follow Action","Food Establishment","Food Event","Furniture Store","Garden Store","Gas Station","Gated Residence Community","General Contractor","Geo Coordinates","Geo Shape","Give Action","Golf Course","Government Building","Government Office","Government Organization","Government Permit","Government Service","Grocery Store","HVAC Business","Hair Salon","Hardware Store","Health And Beauty Business","Health Club","High School","Hindu Temple","Hobby Shop","Home And Construction Business","Home Goods Store","Hospital","Hostel","Hotel","House Painter","Ice Cream Shop","Ignore Action","Image Gallery","Image Object","Imaging Test","Individual Product","Infectious Agent Class","Infectious Disease","Inform Action","Insert Action","Install Action","Insurance Agency","Intangible","Interact Action","Internet Cafe","Invite Action","Item Availability","Item List","Item Page","Jewelry Store","Job Posting","Join Action","Joint","Lake Body of Water","Landform","Landmarks or Historical Buildings","Language","Leave Action","Legislative Building","Lend Action","Library","Lifestyle Modification","Ligament","Like Action","Liquor Store","Listen Action","Literary Event","Local Business","Locker Delivery","Locksmith","Lodging Business","Lose Action","Lymphatic Vessel","Map","Marry Action","Mass","Maximum Dose Schedule","Media Object","Medical Audience","Medical Cause","Medical Clinic","Medical Code","Medical Condition","Medical Condition Stage","Medical Contraindication","Medical Device","Medical Device Purpose","Medical Entity","Medical Enumeration","Medical Evidence Level","Medical Guideline","Medical Guideline Contraindication","Medical Guideline Recommendation","Medical Imaging Technique","Medical Indication","Medical Intangible","Medical Observational Study","Medical Observational Study Design","Medical Organization","Medical Procedure","Medical Procedure Type","Medical Risk Calculator","Medical Risk Estimator","Medical Risk Factor","Medical Risk Score","Medical Scholarly Article","Medical Sign","Medical Sign or Symptom","Medical Specialty","Medical Study","Medical Study Status","Medical Symptom","Medical Test","Medical Test Panel","Medical Therapy","Medical Trial","Medical Trial Design","Medical Web Page","Medicine System","Mens Clothing Store","Middle School","Mobile Application","Mobile Phone Store","Mosque","Motel","Motorcycle Dealer","Motorcycle Repair","Mountain","Move Action","Movie","Movie Rental Store","Movie Theater","Moving Company","Muscle","Museum","Music Album","Music Event","Music Group","Music Playlist","Music Recording","Music Store","Music Venue","Music Video Object","NGO","Nail Salon","Nerve","News Article","Night Club","Notary","Nutrition Information","Ocean Body of Water","Offer","Offer Item Condition","Office Equipment Store","On Demand Event","On Site Pickup","Opening Hours Specification","Optician","Order","Order Action","Order Status","Organization","Organize Action","Outlet Store","Ownership Info","Paint Action","Painting","Palliative Procedure","Parcel Delivery","Parcel Service","Parent Audience","Park","Parking Facility","Pathology Test","Pawn Shop","Pay Action","Payment Charge Specification","Payment Method","People Audience","Perform Action","Performing Arts Theater","Performing Group","Permit","Person","Pet Store","Pharmacy","Photograph","Photograph Action","Physical Activity","Physical Activity Category","Physical Exam","Physical Therapy","Physician","Place","Place of Worship","Plan Action","Play Action","Playground","Plumber","Police Station","Pond","Post Office","Postal Address","Prepend Action","Preschool","Prevention Indication","Price Specification","Product","Product Model","Professional Service","Profile Page","Property","Psychological Treatment","Public Swimming Pool","Publication Event","Qualitative Value","Quantitative Value","Quantity","Quote Action","RV Park","Radiation Therapy","Radio Clip","Radio Episode","Radio Season","Radio Series","Radio Station","Rating","React Action","Read Action","Real Estate Agent","Receive Action","Recipe","Recommended Dose Schedule","Recycling Center","Register Action","Reject Action","Rent Action","Replace Action","Reply Action","Reported Dose Schedule","Reserve Action","Reservoir","Residence","Restaurant","Return Action","Review","Review Action","River Body of Water","Roofing Contractor","Rsvp Action","Sale Event","Schedule Action","Scholarly Article","School","Sculpture","Sea Body of Water","Search Action","Search Results Page","Season","Self Storage","Sell Action","Send Action","Series","Service","Service Channel","Share Action","Shoe Store","Shopping Center","Single Family Residence","Site Navigation Element","Ski Resort","Social Event","Software Application","Some Products","Specialty","Sporting Goods Store","Sports Activity Location","Sports Club","Sports Event","Sports Team","Stadium or Arena","State","Store","Structured Value","Subscribe Action","Subway Station","Superficial Anatomy","Synagogue","TV Clip","TV Episode","TV Season","TV Series","Table","Take Action","Tattoo Parlor","Taxi Stand","Tech Article","Television Station","Tennis Complex","Theater Event","Theater Group","Therapeutic Procedure","Thing","Tie Action","Tip Action","Tire Shop","Tourist Attraction","Tourist Information Center","Toy Store","Track Action","Trade Action","Train Station","Transfer Action","Travel Action","Travel Agency","Treatment Indication","Type And Quantity Node","Un Register Action","Unit Price Specification","Update Action","Use Action","User Blocks","User Checkins","User Comments","User Downloads","User Interaction","User Likes","User Page Visits","User Plays","User Plus Ones","User Tweets","Vein","Vessel","Veterinary Care","Video Gallery","Video Object","View Action","Visual Arts Event","Volcano","Vote Action","WP Ad Block","WP Footer","WP Header","WP Side Bar","Want Action","Warranty Promise","Warranty Scope","Watch Action","Waterfall","Wear Action","Web Application","Web Page","Web Page Element","Wholesale Store","Win Action","Winery","Write Action","Zoo"];
  var actionStrings= ["TouristAttraction", "InteractionCounter", "ActionStatusType", "ActiveActionStatus", "CompletedActionStatus", "FailedActionStatus", "PotentialActionStatus", "ActionAccessSpecification"]

  for(var i=0; i<websites.length; ++i){
    $("#sites-name").append("<option id="+websites[i]+">"+websites[i]+"</option>");
  }

  for(var i=0; i<allTypes.length; ++i){
    if((allTypes[i].includes("action") || allTypes[i].includes("Action")) && !actionStrings.includes(allTypes[i])){
      allMethods.push(allTypes[i])
      $("#method-select").append("<option value="+allTypes[i]+">"+allTypes[i]+"</option>");
    }else{
      type= allTypes[i].split(' ').join('')
      $("#type-select").append("<option id="+type+">"+allTypes[i]+"</option>");
      // $("#type-select2").append("<option id="+type+">"+childSnapshot.val().title+"</option>");
    }
  }

  jQuery('.selectpicker').selectpicker('refresh');

    firebase.database().ref('/apis/').once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        // if parameters, loop through them
        if(childSnapshot.val().parameters){
          var paramList=[];
          var pr = childSnapshot.val().parameters
          for(var i=0; i<pr.length; ++i){
            paramList.push(pr[i].name)
          }
        }else{
          var paramList = ""
        }

        // if responses, loop through them
        if(childSnapshot.val().responses){
          var resList=[];
          var sr = childSnapshot.val().responses
          for(var i=0; i<sr.length; ++i){
            resList.push(sr[i].displayedName)
          }
        }else{
          var resList = ""
        }

        scrapirAPIs.push({
            title: childSnapshot.val().title,
            url: childSnapshot.val().url,
            params: paramList,
            res: resList
          })
      });
    })

}
  // if(!once){
  //   once=true

    // firebase.database().ref('/apis/').once('value').then(function(snapshot) {
    //   snapshot.forEach(function(childSnapshot) {
    //     // if parameters, loop through them
    //     if(childSnapshot.val().parameters){
    //       var paramList=[];
    //       var pr = childSnapshot.val().parameters
    //       for(var i=0; i<pr.length; ++i){
    //         paramList.push(pr[i].name)
    //       }
    //     }else{
    //       var paramList = ""
    //     }

    //     // if responses, loop through them
    //     if(childSnapshot.val().responses){
    //       var resList=[];
    //       var sr = childSnapshot.val().responses
    //       for(var i=0; i<sr.length; ++i){
    //         resList.push(sr[i].displayedName)
    //       }
    //     }else{
    //       var resList = ""
    //     }

    //     scrapirAPIs.push({
    //         title: childSnapshot.val().title,
    //         url: childSnapshot.val().url,
    //         params: paramList,
    //         res: resList
    //       })
    //   });
    // })



    // firebase.database().ref('/schema/').once('value').then(function(snapshot) {
    //   snapshot.forEach(function(childSnapshot) {
    //     allTypes.push(childSnapshot.val().title)
    //     type= childSnapshot.val().title.split(' ').join('')
    //     // $("#schema-types").append("<option id="+type+">"+childSnapshot.val().title+"</option>");
    //     var title=childSnapshot.val().title;
    //     if((title.includes("action") || title.includes("Action")) && !actionStrings.includes(childSnapshot.val().title)){
    //       allMethods.push(childSnapshot.val().title)
    //       $("#method-select").append("<option value="+childSnapshot.val().title+">"+childSnapshot.val().title+"</option>");
    //     }else{
    //       $("#type-select").append("<option id="+type+">"+childSnapshot.val().title+"</option>");
    //       $("#type-select2").append("<option id="+type+">"+childSnapshot.val().title+"</option>");

    //       // $("#method-result-type").append("<option id="+type+">"+childSnapshot.val().title+"</option>");

    //       // allSchemaTypesButActions.push(childSnapshot.val().title);
    //     }
    //   });
    // });



    // $("#apis-url").empty();
    // for(var i=0; i<scrapirAPIs.length; ++i){
    //   var urlText = scrapirAPIs[i].url;
    //   if(urlText.includes(site)){
    //     $("#apis-url").append("<option data-subtext='"+scrapirAPIs[i].url+"' id="+JSON.stringify(scrapirAPIs[i].title)+">"+scrapirAPIs[i].title+"</option>");
    //   }
    // }


    // setTimeout(() => {
      // jQuery('.selectpicker').selectpicker('refresh');
    // }, 6000);

  // }//end of once

  // var array1 = ["title"],
  // array2 = ["description", "name"];

  // function getMatch(a, b) {
  //     var matches = [];
  //     for ( var i = 0; i < a.length; i++ ) {
  //         for ( var e = 0; e < b.length; e++ ) {
  //             if ( a[i] === b[e] ) return b[e];//matches.push( a[i] );
  //         }
  //     }
  //     return matches;
  // }

  // // console.log("MATCH: ", getMatch(array1, array2))

  // $.ajax({
  //   type: 'GET',
  //   //data: JSON.stringify(data),
  //   contentType: 'application/json',
  //   url: 'http://localhost:5000/synonyms/title',
  //     success: function(data) {
  //       console.log('success');
  //       var str = data.replace(/'/g, '"')
  //       var synonyms = JSON.parse(str)
  //       console.log(synonyms);
  //       console.log(synonyms.length);
  //       console.log("MATCH: ", getMatch(synonyms, array2))

  //       //get the one in the array of proprties
  //       //Then, push it to the array resProplist
  //       //what if there is more than one?? later deal with this case
  //       //have the two arrays, then show them in the ui somehow
  //     }
  // });

  // var videoRef = firebase.database().ref('schema/VideoObject');
  // videoRef.on('value', function(snapshot) {
  //   console.log(snapshot.val())
  //   firebase.database().ref('schema/VideoObject2').set(snapshot.val());
  // });

  // firebase.database().ref('abstractions/VideoObject2/').set(obj)
  // var adaFirstNameRef = adaRef.child('name/first');
  // var path = adaFirstNameRef.toString();
  // path is now 'https://sample-app.firebaseio.com/users/ada/name/first'


  // ob = '{"Book": {"apiEndpoint": "Google Books", "fields":[{"field": "title", "property": "name"}, {"field": "authors", "property": "author"}], "parameters":[{"param":"q", "input":"keywords"}] }'
  // ob = '{"sites": "youtube, dailymotion"}'
  // ob='{"parameters":[{"param":"q", "input":"keywords"}]}'

  // ob = '{"VideoObject": {"apiEndpoint": "YouTube API", "fields":[{"field": "title", "property": "name"}, {"field": "description", "property": "description"}], "parameters":[{"param":"q", "input":"keywords"}] }}'

  // ob = '{"VideoObject": {"apiEndpoint": "Dailymotion Videos Search", "fields":[{"field": "title", "property": "name"}, {"field": "description", "property": "description"}], "parameters":[{"param":"search", "input":"keywords"}] }}'


  // obj = JSON.parse(ob)

  // firebase.database().ref('abstractions/VideoObject/').set(obj)
  // firebase.database().ref('functions/dailymotion').set(obj)

//   youtube/VideoObject/parameters
//  apiEndpoint
//  fields

    // $.getJSON("data.json", function(json) {
    //   console.log(json);
    //   responseMessage(json, status)
    // });
      // document.getElementById("json").textContent = JSON.stringify(json, undefined, 2);
      // $("#json").append('<code cFlass="language-json load">'+JSON.stringify(json, undefined, 2)+'</code>')


/////end


  // websites= ['youtube.com', 'apple.com', 'www.google.com', 'support.google.com',
  //      'www.blogger.com', 'cloudflare.com', 'play.google.com',
  //      'microsoft.com', 'mozilla.org', 'wordpress.org', 'maps.google.com',
  //      'en.wikipedia.org', 'linkedin.com', 'youtu.be', 'docs.google.com',
  //      'adobe.com', 'accounts.google.com', 'vimeo.com',
  //      'drive.google.com', 'sites.google.com', 'europa.eu',
  //      'googleusercontent.com', 'plus.google.com', 'line.me',
  //      'es.wikipedia.org', 'github.com', 'amazon.com', 'bbc.co.uk',
  //      'vk.com', 'facebook.com', 'cnn.com', 'uol.com.br',
  //      'bp.blogspot.com', 'istockphoto.com', 'gstatic.com', 'nytimes.com',
  //      'feedburner.com', 'policies.google.com', 'imdb.com',
  //      'slideshare.net', 'fr.wikipedia.org', 'whatsapp.com', 'paypal.com',
  //      'issuu.com', 'pt.wikipedia.org', 'get.google.com', 'w3.org',
  //      'mail.ru', 'mail.google.com', 'google.fr', 't.me', 'jimdofree.com',
  //      'google.co.jp', 'hugedomains.com', 'bbc.com', 'theguardian.com',
  //      'nih.gov', 'creativecommons.org', 'forbes.com', 'globo.com',
  //      'dropbox.com', 'wikimedia.org', 'washingtonpost.com',
  //      'www.yahoo.com', 'google.de', 'myspace.com', 'reuters.com',
  //      'live.com', 'msn.com', 'google.com.br', 'news.google.com',
  //      'medium.com', 'google.es', 'dailymotion.com', 'opera.com',
  //      'developers.google.com', 'abril.com.br', 'books.google.com',
  //      'translate.google.com', 'office.com', 'dailymail.co.uk',
  //      'draft.blogger.com', 'elpais.com', 'google.it', 'rakuten.co.jp',
  //      'de.wikipedia.org', 'ft.com', 'cpanel.com', 'twitter.com',
  //      'fandom.com', 'tools.google.com', 'webmd.com', 'buydomains.com',
  //      'files.wordpress.com', 'mediafire.com', 'un.org', 'google.co.uk',
  //      'www.wikipedia.org', 'thesun.co.uk', 'wsj.com',
  //      'huffingtonpost.com', 'rt.com', 'news.yahoo.com',
  //      'independent.co.uk', 'goo.gl', 'telegram.me', 'bit.ly',
  //      'booking.com', 'steampowered.com', 'latimes.com', 'hatena.ne.jp',
  //      'telegraph.co.uk', 'wired.com', 'id.wikipedia.org',
  //      'ipv4.google.com', 'who.int', 'indiatimes.com', 'amazon.co.jp',
  //      'pinterest.com', 'wikia.com', 'bloomberg.com', 'ok.ru',
  //      'android.com', 'techcrunch.com', 'fb.com', 'ebay.com',
  //      'samsung.com', 'amazon.de', 'photos.google.com', 'google.pl',
  //      'aliexpress.com', 'nasa.gov', 'search.google.com', 'tinyurl.com',
  //      'aol.com', 'google.ru', 'aboutads.info', 'foxnews.com', 'time.com',
  //      'amazon.co.uk', '4shared.com', 'businessinsider.com',
  //      'terra.com.br', 'cnet.com', 'change.org', 'ig.com.br',
  //      'youronlinechoices.com', 'lefigaro.fr', 'themeforest.net',
  //      'usatoday.com', 'gravatar.com', 'picasaweb.google.com',
  //      'networkadvertising.org', 'scribd.com', 'www.gov.uk',
  //      'marketingplatform.google.com', 'mirror.co.uk', 'harvard.edu',
  //      'it.wikipedia.org', 'cpanel.net', 'myaccount.google.com',
  //      'dan.com', 'abcnews.go.com', 'archive.org', 'plesk.com', 'cdc.gov',
  //      'namecheap.com', 'trustpilot.com', 'forms.gle', 'doubleclick.net',
  //      'ja.wikipedia.org', 'adssettings.google.com', 'repubblica.it',
  //      'biglobe.ne.jp', 'news.com.au', 'nicovideo.jp', 'disqus.com',
  //      'hollywoodreporter.com', 'loc.gov', 'php.net', 'quora.com',
  //      'washington.edu', 'gizmodo.com', 'express.co.uk', 'discord.gg',
  //      'code.google.com', 'search.yahoo.com', 'enable-javascript.com',
  //      'smh.com.au', 'amazon.fr', 'lemonde.fr', 'netflix.com', 'yelp.com',
  //      'abc.net.au', 'ign.com', 'walmart.com', 'bandcamp.com',
  //      'weibo.com', 'nypost.com', 'imageshack.us', 'digg.com',
  //      'picasa.google.com', 'm.wikipedia.org', 'www.wix.com',
  //      'cbsnews.com', 'e-recht24.de', 'gnu.org', 'usnews.com',
  //      'berkeley.edu', 'nationalgeographic.com', 'mega.nz', 'espn.com',
  //      'alibaba.com', 'ria.ru', 'rottentomatoes.com', 'guardian.co.uk',
  //      'deezer.com', 'www.weebly.com', 'addtoany.com', 'scoop.it',
  //      'mozilla.com', 'nginx.org', 'depositfiles.com', 'wp.com',
  //      'spiegel.de', 'noaa.gov', 'liveinternet.ru', 'stackoverflow.com',
  //      'oup.com', 'pl.wikipedia.org', 'addthis.com', 'amazon.es',
  //      'afternic.com', 'skype.com', 'bp2.blogger.com', 'welt.de',
  //      'ietf.org', 'disney.com', 'hm.com', 'dw.com', 'eventbrite.com',
  //      '000webhost.com', 'wikihow.com', 'stanford.edu', 'rambler.ru',
  //      'hp.com', 'bitly.com', 'twitch.tv', 'google.co.in', 'pbs.org',
  //      'sciencemag.org', 'amzn.to', 'akamaihd.net', 'academia.edu',
  //      'soundcloud.com', 'secureserver.net', 'photos1.blogger.com',
  //      'target.com', 'surveymonkey.com', 'chaturbate.com', 'ibm.com',
  //      'blackberry.com', 'whitehouse.gov', 'engadget.com', 'nbcnews.com',
  //      'sciencedirect.com', 'buzzfeed.com', 'newyorker.com', 'naver.com',
  //      'britannica.com', 'wiley.com', 'newsweek.com', 'ovh.net', 'wa.me',
  //      'yahoo.co.jp', 'economist.com', 'greenpeace.org', 'mit.edu',
  //      't.co', 'nginx.com', 'netvibes.com', 'nydailynews.com', 'cbc.ca',
  //      'spotify.com', 'detik.com', 'huffpost.com', 'yandex.ru',
  //      'rapidshare.com', 'pixabay.com', 'xbox.com', 'yale.edu',
  //      'sfgate.com', 'princeton.edu', 'mashable.com', 'asus.com',
  //      'dell.com', 'icann.org', 'ggpht.com', 'privacyshield.gov',
  //      'ziddu.com', 'instructables.com', 'sedo.com', 'sapo.pt',
  //      'sciencedaily.com', 'rtve.es', 'sputniknews.com',
  //      'finance.yahoo.com', 'vox.com', 'cnil.fr', 'npr.org', 'nokia.com',
  //      'groups.google.com', 'ox.ac.uk', 'nature.com', 'ovh.com',
  //      'tripadvisor.com', 'cnbc.com', 'theatlantic.com', 'godaddy.com',
  //      'kickstarter.com', 'oracle.com', 'goodreads.com',
  //      'brandbucket.com', 'bing.com', 'vice.com', 'unesco.org',
  //      'elmundo.es', 'sendspace.com', 'gmail.com', 'photobucket.com',
  //      'apache.org', 'columbia.edu', 'playstation.com', 'google.nl',
  //      'ikea.com', 'ea.com', 'cambridge.org', 'thetimes.co.uk',
  //      'allaboutcookies.org', 'nikkei.com', 'box.com', 'ovh.co.uk',
  //      'metro.co.uk', 'theglobeandmail.com', 'ted.com', 'list-manage.com',
  //      'google.com.tw', 'mysql.com', 'ru.wikipedia.org', 'theverge.com',
  //      'cornell.edu', 'about.com', 'gofundme.com', 'google.co.id',
  //      'zendesk.com', 'www.over-blog.com', 'my.yahoo.com', 'utexas.edu',
  //      'psychologytoday.com', 'urbandictionary.com', 'ytimg.com',
  //      'abc.es', 'over-blog-kiwi.com', 'researchgate.net',
  //      'instagram.com', 'yadi.sk', 'bloglovin.com', 'corriere.it',
  //      'variety.com', 'shutterstock.com', 'google.ca', 'shopify.com',
  //      'goo.ne.jp', 'umich.edu', 'googleblog.com', 'chicagotribune.com',
  //      'storage.googleapis.com', 'mercurynews.com', 'cbslocal.com',
  //      'feedproxy.google.com', 'tes.com', 'ftc.gov', 'm.me', 'pexels.com',
  //      'espn.go.com', 'freepik.com', 'ubuntu.com', 'howstuffworks.com',
  //      'mystrikingly.com', 'last.fm', 'rediff.com', 'com.com',
  //      'oreilly.com', 'amazon.in', 'biblegateway.com', 'parallels.com',
  //      'cointernet.com.co', 'gooyaabitemplates.com', 'fortune.com',
  //      'dreniq.com', 'jstor.org', 'coursera.org', 'ap.org', 'ca.gov',
  //      'sina.com.cn', 'cisco.com', 'alexa.com', 'weather.com', 'psu.edu',
  //      'scientificamerican.com', 'qz.com', 'evernote.com', 'ieee.org',
  //      'soratemplates.com', 'lonelyplanet.com', 'blog.fc2.com',
  //      'so-net.ne.jp', 'naver.jp', 'cocolog-nifty.com', 'upenn.edu',
  //      'marriott.com', 'mhlw.go.jp', 'dreamstime.com', 'google.com.au',
  //      'pewresearch.org', 'si.edu', 'histats.com', 'rollingstone.com',
  //      'livescience.com', 'popsugar.com', 'inc.com', 'home.neustar',
  //      'eff.org', 'storage.canalblog.com', 'imageshack.com',
  //      'softonic.com', 'viglink.com', 'axs.com', 'entrepreneur.com',
  //      'airbnb.com', 'usgs.gov', 'redhat.com', 'pastebin.com',
  //      'amazon.ca', 'prezi.com', 'kinja.com', 'about.me',
  //      'arstechnica.com', 'stuff.co.nz', 'fastcompany.com', 'pcmag.com',
  //      'springer.com', 'fifa.com', 'iso.org', 'channel4.com', 'cmu.edu',
  //      'steamcommunity.com', 'khanacademy.org', 'salon.com',
  //      'transandfiestas.ga', 'excite.co.jp', 'fb.me', 'boston.com',
  //      'qq.com', 'arxiv.org', 'epa.gov', 'thoughtco.com', 'billboard.com',
  //      'daum.net', 'irs.gov', 'lycos.com', 'calameo.com',
  //      'businessinsider.com.au', 'www.canalblog.com', 'politico.com',
  //      'ucoz.ru', 'www.livejournal.com', 'lifehacker.com',
  //      'geocities.com', 'digitaltrends.com', 'ameblo.jp',
  //      'ssl-images-amazon.com', 'calendar.google.com', 'adweek.com',
  //      'indiegogo.com', 'standard.co.uk', 'megaupload.com', 'orange.fr',
  //      'nba.com', 'canva.com', 'sky.com', 'mayoclinic.org',
  //      'xinhuanet.com', 'narod.ru', 'bund.de', 'vkontakte.ru',
  //      'bp0.blogger.com', 'plos.org', 'video.google.com',
  //      'groups.yahoo.com']

}

var arrFields=[], wooSchema={}, site="", temp={};

function siteHasBeenChosen(select){

  $("#step1_hint").hide();

  $("#site-row2").show(); //types select
  $("#site-row3").show(); //methods select
  $("#step2").show();
  $("#site-objects").empty();

  site = select.options[select.selectedIndex].getAttribute("id");

  // $("#desc-site").show();
  document.getElementById('siteN').innerHTML= '<code>'+site.charAt(0).toUpperCase() + site.slice(1)+'</code>'
  temp = { "objects":{}, "functions":[] };

  // firebase.database().ref('/abstractions/').once('value').then(function(snapshot) {
  //   snapshot.forEach(function(childSnapshot) {
  //     if(site == childSnapshot.key){
  //       arrFields = childSnapshot.val().objects;
  //       for(obj in arrFields){
  //         $("#site-objects").append('<a class="code" style="color: tomato; cursor: pointer; padding: 5px; font-size:1.2em" id="'+obj+'" onclick="typeHasBeenChosen2(this)">'+obj+'</a>&nbsp;&nbsp;&nbsp;&nbsp;');
  //       }
  //     }
  //   });
  // });

  // var table = document.createElement('table');
  // table.setAttribute('id', type);
  // table.setAttribute('class', 'table table-borderless');
  // var tbody= document.createElement('tbody');
  // table.append(tbody)

  // $("#tableSiteDiv").append(table)

  // $("#site-table tbody").append('<tr><td><p id="schema_header" style="text-align:center">schema.org</p></td> <td><p id="api_header" style="text-align:center">API</p></td> </tr>');
  //methods menu
  // $("#site-table tbody").append('<tr id="'+site+'" data-tt-id="'+site+'" data-tt-parent-id="'+site+'" data-tt-branch="true"><td><div style="display: inline-block; width:150px; text-align:center;"><select id="'+site+'_method-select" style="display:inline; width:150px; height: 30px; text-align:center; padding: 4px 1px;" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-purple" onchange="methodHasBeenChosen(this)"><option value="" selected>Add Method</option></select></div></td><td></td></tr>')
}



var allProperties=[], allMethods=[], allSchemaTypes=[], propertiesInfo=[], methodsInfo=[], def, pType, pDesc;

function getAllOfProperties(schemaType){
  properties=[]

  firebase.database().ref('/schema/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      if(childSnapshot.val().title.split(' ').join('') == schemaType){
        // console.log(childSnapshot.val().title.split(' ').join(''))

        //allOf
        if(childSnapshot.val().allOf){
          getAllOfProperties(childSnapshot.val().allOf[0].ref.split('.json')[0])
        }
        if(childSnapshot.val().properties){
          var pName = Object.keys(childSnapshot.val().properties)
          // console.log("all prop: ", childSnapshot.val().properties)
          // console.log("all defs: ", childSnapshot.val().definitions)
          for(var i=0; i<pName.length; ++i){
            // console.log("prop: ",pName[i])
            if(childSnapshot.val().properties[pName[i]]['ref']){
              // console.log("ref: ", childSnapshot.val().properties[pName[i]]['ref'])
              def =  childSnapshot.val().properties[pName[i]]['ref'].split('definitions/')[1]
              if(childSnapshot.val().definitions[def]['type'] ===undefined){
                pType = "string"
              }else{
                pType = childSnapshot.val().definitions[def]['type']
              }

              if(childSnapshot.val().definitions[def]['description'] === undefined){
                pDesc = ""
              }else{
                pDesc = childSnapshot.val().definitions[def]['description']
              }
              // console.log("def type: ", childSnapshot.val().definitions[def]['type'])
            }else if(childSnapshot.val().properties[pName[i]]['items']){
              if(childSnapshot.val().properties[pName[i]]['items']['ref']){
                def =  childSnapshot.val().properties[pName[i]]['items']['ref'].split('definitions/')[1]
                if(childSnapshot.val().definitions[def]['type'] ===undefined){
                  pType = "string"
                }else{
                  pType = childSnapshot.val().definitions[def]['type']
                }

                if(childSnapshot.val().definitions[def]['description'] === undefined){
                  pDesc = ""
                }else{
                  pDesc = childSnapshot.val().definitions[def]['description']
                }
                // console.log("def type2: ", childSnapshot.val().definitions[def]['type'])
              }else if(childSnapshot.val().properties[pName[i]]['items']['type']){
                // console.log("def type3: ", childSnapshot.val().properties[pName[i]]['items']['type'])
                pType = childSnapshot.val().properties[pName[i]]['items']['type']
              }else{
                pType="string"
                pDesc = ""
              }
            }else {
              pType="string"
              pDesc = ""
            }

            propertiesInfo.push({
               name: pName[i],
               type: pType,
               description: pDesc
            });
          }

          allProperties = allProperties.concat(Object.keys(childSnapshot.val().properties))
          console.log("PROPERTIES: ", allProperties);
        }
      }
    });
  });


}


function resultTypeHasBeenChosen(select){

  var ttt = select.options[select.selectedIndex].getAttribute("id");
  console.log("resultTypeHasBeenChosen id: ", ttt);

}


function idHasBeenChosed(){
  $("#mapLabel").show();

  // $("#fields-select").empty();
  // $("#fields-select").append("<option selected>Choose field</option>");

  // for(var f=0; f<resProplist.length; ++f){
  //   $("#fields-select").append("<option id="+resProplist[f]+">"+resProplist[f]+"</option>");
  // }
  // jQuery('.selectpicker').selectpicker('refresh');
}


var currentURLGetter = "", propList=[], resProplist=[], apiURL, propListType=[];


function urlHasBeenChosen(select){

  $("#idLabel").show()

  var resFields;
  var apiTitle = select.getAttribute("id");
  console.log("apiTitle: ", apiTitle);
  currentURLGetter = apiTitle

  firebase.database().ref('/apis/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      if(childSnapshot.val().title==apiTitle){
        console.log("par: ",childSnapshot.val().parameters) //choose which one you want to send as parameter to the function
        console.log("res: ", childSnapshot.val().responses)
        resFields = childSnapshot.val().responses;
        reqParam  = childSnapshot.val().parameters;
        apiURL = childSnapshot.val().url;
        //Show a dropdown menu from the response fields to map them to the type properties

        var props= allProperties;
        var currentSimScore = 0;
        var mostSimilarProp=""
        resProplist=[]
        for(var i=0; i<resFields.length; ++i){
          currentSimScore = 0;
          mostSimilarProp=""
          //call noedjs /word2vec?prop=props&res=resFields[i].displayedName
          // $.get('/word2vec?prop='+props+'&res='+resFields[i].displayedName).success(function(response) {
          //   // $scope.final = response;
          //   console.log(response);
          // });
          // for(var j=0; j<props.length; ++j){
          //   newSimScore = similarity(resFields[i].displayedName, props[j])
          //   if(newSimScore > currentSimScore){
          //     currentSimScore = newSimScore;
          //     mostSimilarProp = props[j];
          //     //remove from props
          //   }
          // }

          resProplist.push(resFields[i].displayedName);
        }

        $("#type-id").empty();
        $("#type-id").append('<option selected>Choose the ID</option>')

        for(var i=0; i<reqParam.length; ++i){
          if(reqParam[i].displayed && reqParam[i].displayed==true){
            $("#type-id").append('<option id="'+reqParam[i].name+'">'+reqParam[i].name+'</option>');
          }else if(!reqParam[i].displayed){
            $("#type-id").append('<option id="'+reqParam[i].name+'">'+reqParam[i].name+'</option>');
          }else{
            // do nothing
          }
        }

        //change Current type
        console.log("typePropertyType[currentType]: ", typePropertyType[clickedType])

        propList=[]
        for(var j=0; j<typePropertyType[clickedType].length; ++j){
          if(propListType.indexOf(typePropertyType[clickedType][j].name) == -1){//if this property NOT of type object
            propList.push(typePropertyType[clickedType][j].name)
          }
        }

        console.log("final response ", resProplist);
        console.log("final properties ", propList);

        // APPEND the above arrays to the table1
        $("#table1 tbody").empty()

        for(var i=0; i<resProplist.length || i<propList.length ; ++i){
          if(resProplist[i] === undefined){
            var r = ''
          }else{
            var r = resProplist[i]
          }

          if(propList[i] === undefined){
            var p = ''
          }else{
            var p = '<div class="redips-drag">'+propList[i]+'</div>'
          }

          $("#table1 tbody").append('<tr><td class="redips-mark">'+r+'</td><td>'+p+'</td></tr>');

        }

        /* enable strict mode */
        'use strict';

        // create redips container
        let redips = {},
          counter = 0;

        // redips initialization
        //redips.init = function () {
          // reference to the REDIPS.drag library
          let rd = REDIPS.drag;
          // initialization
          rd.init();
          // set mode option to "shift"
          rd.dropMode = 'shift';
          // set animation loop pause
          rd.animation.pause = 20;
          // enable shift.animation
          rd.shift.animation = true;
          // set TD for overflow elements (initially)
          rd.shift.overflow = document.getElementById('overflow');
          // add counter to cloned element name
          // (after cloned DIV element is dropped to the table)
          rd.event.clonedDropped = function () {
            // increase counter
            counter++;
            // append to the DIV element name
            rd.obj.innerHTML += counter;
          };
        //};


        //set current table
        redips.setTable = function (e) {
          let value = e.options[e.selectedIndex].value,
            tables = document.getElementById('redips-drag').getElementsByTagName('table'),
            i;
          // loop goes through all fetched tables within drag container
          for (i = 0; i < tables.length; i++) {
            // skip mini table
            if (tables[i].id === 'mini') {
              continue;
            }
            // show selected table
            else if (tables[i].id === value) {
              tables[i].style.display = '';
            }
            // hide all other tables
            else {
              tables[i].style.display = 'none';
            }
          }
        };


        // set shift mode
        redips.shiftMode = function (radio) {
          REDIPS.drag.shift.mode = radio.value;
        };


        // set overflow
        redips.overflow = function (radio) {
          if (radio.value === 'user') {
            REDIPS.drag.shift.overflow = document.getElementById('overflow');
          }
          else {
            REDIPS.drag.shift.overflow = radio.value;
          }
        };


        // enable / disable animation
        redips.shiftAnimation = function (chk) {
          REDIPS.drag.shift.animation = chk.checked;
        };


        // enable / disable shift after element is deleted
        redips.shiftAfter = function (chk) {
          REDIPS.drag.shift.after = chk.value;
        };


        // toggles trash_ask parameter defined at the top
        redips.toggleConfirm = function (chk) {
          if (chk.checked === true) {
            REDIPS.drag.trash.question = 'Are you sure you want to delete DIV element?';
          }
          else {
            REDIPS.drag.trash.question = null;
          }
        };


        // add onload event listener
        if (window.addEventListener) {
          window.addEventListener('load', redips.init, false);
        }
        else if (window.attachEvent) {
          window.attachEvent('onload', redips.init);
        }


        $("#response-fields").show();
        for(var i=0; i<resFields.length; ++i){
          $("#select-response").append("<option id='"+resFields[i].displayedName+"'>"+resFields[i].displayedName+"</option>");
          $("#table-response tbody").append('<tr id="'+resFields[i].displayedName+'"><td>'+resFields[i].displayedName+'</td>  <td><select id="select-'+resFields[i].displayedName+'" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-white" style="overflow:scroll;" onchange=""></select></td>  <td>X</td></tr>');
        }

        //for each response field, find the most similar property and show them both in a row in a table table-response

        for(var i=0; i<resFields.length; ++i){
          for(var j=0; j<propertyList.length; ++j){
            $("#select-"+resFields[i].displayedName).append("<option value='"+propertyList[j]+"'>"+propertyList[j]+"</option>");
          }
        }


        $("#request-parameters").show();
        for(var i=0; i<reqParam.length; ++i){
          if(reqParam[i].displayedName && reqParam[i].displayedName!=""){
            $("#select-parameter").append("<option id='"+reqParam[i].displayedName+"'>"+reqParam[i].displayedName+"</option>");
          }
        }
      }
    });
  });

  setTimeout(() => {
    jQuery('.selectpicker').selectpicker('refresh');
  }, 500);

}



function urlHasBeenChosenAdd(select){

  // $("#idLabel-add").show()

  var resFields;
  var apiTitle = select.getAttribute("id");
  console.log("apiTitle: ", apiTitle);

  currentURLGetter = apiTitle;

  ob={
    [currentType]:{
      "apiEndpoint":apiTitle,
      "fields":[]
    }
  }
  console.log("OBJ: ", ob)

  firebase.database().ref('/apis/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      if(childSnapshot.val().title==apiTitle){
        console.log("par: ",childSnapshot.val().parameters) //choose which one you want to send as parameter to the function
        console.log("res: ", childSnapshot.val().responses)
        resFields = childSnapshot.val().responses;
        reqParam  = childSnapshot.val().parameters;
        resProplist=[]
        if(resFields){
        for(var i=0; i<resFields.length; ++i){
          currentSimScore = 0;
          mostSimilarProp=""
          resProplist.push(resFields[i].displayedName);
        }
      }


      // $("#type-id-add").empty();
      // $("#type-id-add").append('<option selected>Choose the ID</option>')

      // if(reqParam){
      //   for(var i=0; i<reqParam.length; ++i){
      //     if(reqParam[i].displayed && reqParam[i].displayed==true){
      //       $("#type-id-add").append('<option id="'+reqParam[i].name+'">'+reqParam[i].name+'</option>');
      //     }else if(!reqParam[i].displayed){
      //       $("#type-id-add").append('<option id="'+reqParam[i].name+'">'+reqParam[i].name+'</option>');
      //     }else{
      //       // do nothing
      //     }
      //   }
      // }

        //change Current type
        console.log("typePropertyType[currentType]: ", typePropertyType[clickedType])

        propList=[]
        for(var j=0; j<typePropertyType[clickedType].length; ++j){
          if(typePropertyType[clickedType][j].type=="string" || typePropertyType[clickedType][j].type=="integer" || typePropertyType[clickedType][j].type=="date" || typePropertyType[clickedType][j].type=="boolean"){
            //push it
            propList.push(typePropertyType[clickedType][j].name)
          }else{
            //skip it
          }
        }

        console.log("final response ", resProplist);
        console.log("final properties ", propList);

        //for each response field, find the most similar property and show them both in a row in a table table-response
        if(resFields){
          for(var i=0; i<resFields.length; ++i){
            for(var j=0; j<propertyList.length; ++j){
              $("#select-"+resFields[i].displayedName).append("<option value='"+propertyList[j]+"'>"+propertyList[j]+"</option>");
            }
          }
        }

        $("#request-parameters").show();
        for(var i=0; i<reqParam.length; ++i){
          if(reqParam[i].displayedName && reqParam[i].displayedName!=""){
            $("#select-parameter").append("<option id='"+reqParam[i].displayedName+"'>"+reqParam[i].displayedName+"</option>");
          }
        }
      }
    });
  });

  setTimeout(() => {
    jQuery('.selectpicker').selectpicker('refresh');
  }, 500);

}




function urlHasBeenChosenRemove(select){

  $("#idLabel-remove").show()

  var resFields;
  var apiTitle = select.getAttribute("id");
  console.log("apiTitle: ", apiTitle);

  currentURLGetter = apiTitle

  // ob={
  //   [currentType]:{
  //     "apiEndpoint":apiTitle,
  //     "fields":[]
  //   }
  // }
  // ob.currentType.apiEndpoint=apiTitle;
  // console.log("OBJ: ", ob)

  firebase.database().ref('/apis/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      if(childSnapshot.val().title==apiTitle){
        console.log("par: ",childSnapshot.val().parameters) //choose which one you want to send as parameter to the function
        console.log("res: ", childSnapshot.val().responses)
        resFields = childSnapshot.val().responses;
        reqParam  = childSnapshot.val().parameters;
        //Show a dropdown menu from the response fields to map them to the type properties
        // var props= allProperties;
        // var currentSimScore = 0;
        // var mostSimilarProp=""
        resProplist=[]
        if(resFields){
        for(var i=0; i<resFields.length; ++i){
          currentSimScore = 0;
          mostSimilarProp=""
          resProplist.push(resFields[i].displayedName);
        }
      }

      $("#type-id-remove").empty();
      $("#type-id-remove").append('<option selected>Choose the ID</option>')

      if(reqParam){
        for(var i=0; i<reqParam.length; ++i){
          if(reqParam[i].displayed && reqParam[i].displayed==true){
            $("#type-id-remove").append('<option id="'+reqParam[i].name+'">'+reqParam[i].name+'</option>');
          }else if(!reqParam[i].displayed){
            $("#type-id-remove").append('<option id="'+reqParam[i].name+'">'+reqParam[i].name+'</option>');
          }else{
            // do nothing
          }
        }
      }

        //change Current type
        console.log("typePropertyType[currentType]: ", typePropertyType[clickedType])

        propList=[]
        for(var j=0; j<typePropertyType[clickedType].length; ++j){
          if(typePropertyType[clickedType][j].type=="string" || typePropertyType[clickedType][j].type=="integer" || typePropertyType[clickedType][j].type=="date" || typePropertyType[clickedType][j].type=="boolean"){
            //push it
            propList.push(typePropertyType[clickedType][j].name)
          }else{
            //skip it
          }
        }

        // propList = temp.objects[currentType].properties;

        console.log("final response ", resProplist);
        console.log("final properties ", propList);

        // temp.objects[getter].properties

        // $("#response-fields").show();
        // for(var i=0; i<resFields.length; ++i){
        //   $("#select-response").append("<option id='"+resFields[i].displayedName+"'>"+resFields[i].displayedName+"</option>");
        //   $("#table-response tbody").append('<tr id="'+resFields[i].displayedName+'"><td>'+resFields[i].displayedName+'</td>  <td><select id="select-'+resFields[i].displayedName+'" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-white" style="overflow:scroll;" onchange=""></select></td>  <td>X</td></tr>');
        // }

        //for each response field, find the most similar property and show them both in a row in a table table-response
        if(resFields){
          for(var i=0; i<resFields.length; ++i){
            for(var j=0; j<propertyList.length; ++j){
              $("#select-"+resFields[i].displayedName).append("<option value='"+propertyList[j]+"'>"+propertyList[j]+"</option>");
            }
          }
        }

        $("#request-parameters").show();
        for(var i=0; i<reqParam.length; ++i){
          if(reqParam[i].displayedName && reqParam[i].displayedName!=""){
            $("#select-parameter").append("<option id='"+reqParam[i].displayedName+"'>"+reqParam[i].displayedName+"</option>");
          }
        }
      }
    });
  });

  setTimeout(() => {
    jQuery('.selectpicker').selectpicker('refresh');
  }, 500);

}


function urlHasBeenChosenUpdate(select){
  $("#idLabel-update").show()

  var resFields;
  var apiTitle = select.getAttribute("id");
  console.log("apiTitle: ", apiTitle);

  currentURLGetter = apiTitle;

  firebase.database().ref('/apis/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      if(childSnapshot.val().title==apiTitle){
        console.log("par: ",childSnapshot.val().parameters) //choose which one you want to send as parameter to the function
        console.log("res: ", childSnapshot.val().responses)
        resFields = childSnapshot.val().responses;
        reqParam  = childSnapshot.val().parameters;
        resProplist=[]
        if(resFields){
        for(var i=0; i<resFields.length; ++i){
          currentSimScore = 0;
          mostSimilarProp=""
          resProplist.push(resFields[i].displayedName);
        }
      }

      $("#type-id-update").empty();
      $("#type-id-update").append('<option selected>Choose the ID</option>')

      if(reqParam){
        for(var i=0; i<reqParam.length; ++i){
          if(reqParam[i].displayed && reqParam[i].displayed==true){
            $("#type-id-update").append('<option id="'+reqParam[i].name+'">'+reqParam[i].name+'</option>');
          }else if(!reqParam[i].displayed){
            $("#type-id-update").append('<option id="'+reqParam[i].name+'">'+reqParam[i].name+'</option>');
          }else{
            // do nothing
          }
        }
      }
        //change Current type
        console.log("typePropertyType[currentType]: ", typePropertyType[clickedType])

        propList=[]
        for(var j=0; j<typePropertyType[clickedType].length; ++j){
          if(typePropertyType[clickedType][j].type=="string" || typePropertyType[clickedType][j].type=="integer" || typePropertyType[clickedType][j].type=="date" || typePropertyType[clickedType][j].type=="boolean"){
            //push it
            propList.push(typePropertyType[clickedType][j].name)
          }else{
            //skip it
          }
        }

        console.log("final response ", resProplist);
        console.log("final properties ", propList);

        //for each response field, find the most similar property and show them both in a row in a table table-response
        if(resFields){
          for(var i=0; i<resFields.length; ++i){
            for(var j=0; j<propertyList.length; ++j){
              $("#select-"+resFields[i].displayedName).append("<option value='"+propertyList[j]+"'>"+propertyList[j]+"</option>");
            }
          }
        }

        $("#request-parameters").show();
        for(var i=0; i<reqParam.length; ++i){
          if(reqParam[i].displayedName && reqParam[i].displayedName!=""){
            $("#select-parameter").append("<option id='"+reqParam[i].displayedName+"'>"+reqParam[i].displayedName+"</option>");
          }
        }
      }
    });
  });

  setTimeout(() => {
    jQuery('.selectpicker').selectpicker('refresh');
  }, 500);

}

var urlAPI;

function urlHasBeenChosenForMethod(select){

  urlAPI = select.getAttribute("id")//.options[select.selectedIndex].getAttribute("id");
  console.log("urlAPI: ", urlAPI);

  firebase.database().ref('/apis/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      if(childSnapshot.val().title==urlAPI){
        console.log("par: ",childSnapshot.val().parameters) //choose which one you want to send as parameter to the function
        console.log("res: ", childSnapshot.val().responses)
        resFields = childSnapshot.val().responses;
        reqParam  = childSnapshot.val().parameters;
        apiURL = childSnapshot.val().url;
        //Show a dropdown menu from the response fields to map them to the type properties

        var props= allProperties;
        var currentSimScore = 0;
        var mostSimilarProp=""
        resProplist=[]
        for(var i=0; i<resFields.length; ++i){
          currentSimScore = 0;
          mostSimilarProp=""
          resProplist.push(resFields[i].displayedName);
        }


        console.log("typePropertyType[currentType]: ", typePropertyType[clickedType])

        propList=[]
        for(var j=0; j<typePropertyType[clickedType].length; ++j){
          if(typePropertyType[clickedType][j].type=="string" || typePropertyType[clickedType][j].type=="integer" || typePropertyType[clickedType][j].type=="date" || typePropertyType[clickedType][j].type=="boolean"){
            //push it
            propList.push(typePropertyType[clickedType][j].name)
          }else{
            //skip it
          }
        }

        // propList = temp.objects[currentType].properties;

        console.log("final response ", resProplist);
        console.log("final properties GGG ", propList);

        // temp.objects[getter].properties

        // APPEND the above arrays to the table2
        //$("#table2 tbody").empty()

        for(var i=0; i<resProplist.length || i<propList.length ; ++i){
          if(resProplist[i] === undefined){
            var r = ''
          }else{
            var r = resProplist[i]
          }

          if(propList[i] === undefined){
            var p = ''
          }else{
            var p = '<div class="redips-drag">'+propList[i]+'</div>'
          }

          //$("#table2 tbody").append('<tr><td class="redips-mark">'+r+'</td><td>'+p+'</td></tr>');

        }

      }
    });
  });


  setTimeout(() => {
    jQuery('.selectpicker').selectpicker('refresh');
  }, 500);

}


var firstSave=true;

function saveTypeConfig(){

  //save construct -> self -> endpoint: name of api endint
  //                       -> id: chosen id
  var selector = document.getElementById("type-id");
  var idValue = selector[selector.selectedIndex].value;

  temp.objects[clickedType].construct.self.endpoint= currentURLGetter; //get the value of the chosen API
  temp.objects[clickedType].construct.self.id= idValue; //get the value of the chosen ID
  temp.objects[clickedType].properties=[]

  //Go over the clicked table rows
  var typeTable = document.getElementById(clickedType);
  var typeTbody = typeTable.getElementsByTagName("TBODY")[0];
  var tableTrs = typeTbody.getElementsByTagName("TR");
  console.log("tableTrs: ", tableTrs)
  //Insert the API URL next to the type
  var rowType = document.getElementById(clickedType+'_row');
  var typeCell1 = rowType.insertCell(1);
  typeCell1.innerHTML =  '<a href="'+apiURL+'" target="_blank">'+apiURL+'</a>'

  //Insert a drop down menu next to each property (not method)
  for(var i=1; i<tableTrs.length; ++i){
    // console.log("tableTrs[i].id: ", tableTrs[i].id)
    if(propList.indexOf(tableTrs[i].id.split('_')[1]) == -1){//if a method and not a property
      continue;
    }else{
      let rowProperty = document.getElementById(tableTrs[i].id);
      let cellField1 = rowProperty.insertCell(1);

      // let div = document.getElementById('fields_');
      // clone = div.cloneNode(true); // true means clone all childNodes and all event handlers
      // clone.id = "fields_" + tableTrs[i].id;
      // $(clone).find('select').attr("id", "fields-select_"+tableTrs[i].id);
      // console.log("CLONE:", clone)
      // cellField1.appendChild(clone)
      cellField1.innerHTML =  '<div style="width:240px; text-align:center;"><select id="fields_'+tableTrs[i].id+'" class="form-control selectpicker " data-size="10" data-live-search="true" data-style="btn-grey" onchange=""><option selected>Choose field</option></select></div>';

      for(var f=0; f<resProplist.length; ++f){
        $("#fields_"+tableTrs[i].id).append("<option id="+resProplist[f]+">"+resProplist[f]+"</option>");
      }
    }
  }

  for(var f=0; f<resProplist.length; ++f){
    $("#fields-select").append("<option id="+resProplist[f]+">"+resProplist[f]+"</option>");
  }
  jQuery('.selectpicker').selectpicker('refresh');

//drop down of all resProplist excluding the id chosen idValue

  // console.log("final response ", resProplist);
  // console.log("final properties ", propList);

  // var table = document.getElementById("table1");
  // for (var i = 0, row; row = table.rows[i]; i++) {
  //   //iterate through table1 rows
  //   if(row.cells[1].getElementsByClassName('redips-drag').length==0){
  //     //do nothing
  //   }else{
  //     console.log("col[0]: ", row.cells[0].textContent);
  //     console.log("col[1]: ", row.cells[1].getElementsByClassName('redips-drag').item(0).innerHTML)
  //     var f=row.cells[0].textContent
  //     var p=row.cells[1].getElementsByClassName('redips-drag').item(0).innerHTML

  //     temp.objects[clickedType].properties.push({
  //       field:f,
  //       property:p
  //     })

  //     var row = document.getElementById(clickedType+'_'+row.cells[1].getElementsByClassName('redips-drag').item(0).innerHTML);
  //     var cell1 = row.insertCell(1);
  //     console.log("row: ", row);
  //     console.log("cell1: ", cell1);

  //     cell1.innerHTML =  '<a href="javascript:;" class="btn btn-default disabled" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onclick="">'+f+'</a>'

  //   }
  // }//end for loop

  //for each type


  console.log("temp after save", temp.objects[clickedType]);

  if(firstSave){
    firstSave = false;
    // console.log("FIRST TABLE: ", document.getElementsByTagName('TABLE')[0]);
    var ftable = document.getElementsByTagName('TABLE')[0]
    var ftbody = document.getElementsByTagName('TBODY')[0]
    var ftr = document.getElementsByTagName('TR')[0]

    $('<tr><td><h6 id="schema_header">Schema.org</h6></td> <td><h6 id="api_header">Web API</h6></td> </tr>').insertBefore(ftr);
  }

}



function saveAddConfig(){
  // var selector = document.getElementById("type-id-add");
  // var idValue = selector[selector.selectedIndex].value;
  temp.objects[clickedType].add.endpoint= currentURLGetter; //get the value of the chosen API
  // temp.objects[clickedType].remove.id= idValue; //get the value of the chosen ID

  console.log("temp after save", temp.objects[clickedType]);

}


function saveUpdateConfig(){
  var selector = document.getElementById("type-id-update");
  var idValue = selector[selector.selectedIndex].value;
  //[1] Go over the parameters of this chosen API end point
  //[2] For each parameter, we create:
  //    [2.1] we creat an object element and push it to the setters array
  //    the object element contains []

  // get haapi desc for currentURLGetter
  // then loop through the parameters

  console.log("reqParam: ", reqParam);
  var j=0;

  if(reqParam){
    for(var i=0; i<reqParam.length; ++i){
      if(reqParam[i].displayed && reqParam[i].displayed==true && reqParam[i]!=idValue){
        tempObjSet= {"endpoint":"", "field":"", "property":"", "id":"", };
        tempObjSet.endpoint= currentURLGetter;
        tempObjSet.id= idValue;
        tempObjSet.field= reqParam[i].name;
        tempObjSet.property= "";

        temp.objects[clickedType].setters.push(tempObjSet);
        // ++j;

      }else if(!reqParam[i].displayed && reqParam[i]!=idValue){
        tempObjSet= {"endpoint":"", "field":"", "property":"", "id":""};
        tempObjSet.endpoint= currentURLGetter;
        tempObjSet.id= idValue;
        tempObjSet.field= reqParam[i].name;
        tempObjSet.property= "";

        temp.objects[clickedType].setters.push(tempObjSet);
        // ++j;

      }else{
        // do nothing
      }
    }
  }

  console.log("temp after save", temp.objects[clickedType]);
}


function saveRemoveConfig(){
  var selector = document.getElementById("type-id-remove");
  var idValue = selector[selector.selectedIndex].value;
  temp.objects[clickedType].remove.endpoint= currentURLGetter; //get the value of the chosen API
  temp.objects[clickedType].remove.id= idValue; //get the value of the chosen ID

  console.log("temp after save", temp.objects[clickedType]);

}


function saveMethodConfig(){

  var u = urlAPI;//document.getElementById("apis-url-method");
  var r = document.getElementById("method-result-type");

  // console.log("U: ", u.options[u.selectedIndex].text)
  console.log("R: ", r.options[r.selectedIndex].text)
  // tempAct[method]= {"endpoint":"", "object":"", "name":"", "type":""};



  //if a site method,
  if(methodParent.includes('methodSite')){
    console.log("OBJECT: ", temp.functions.find( ({ type }) => type === methodName ))
    temp.functions.find( ({ type }) => type === methodName ).endpoint = u; //"TEST"//u.options[u.selectedIndex].text;
    temp.functions.find( ({ type }) => type === methodName ).object = r.options[r.selectedIndex].text;
    temp.functions.find( ({ type }) => type === methodName ).name = document.getElementById('meth-name').value;
    // temp.functions[methodName].type = "";"
  }else{
    // console.log("OBJECT: ", temp.objects[methodParent].methods.find( ({ type }) => type === methodName ))
    var rowType = document.getElementById(methodParent+'_'+methodName);
    var cell1 = rowType.insertCell(1);
    cell1.innerHTML =  '<a href="'+apiURL+'" target="_blank">'+apiURL+'</a>'

    temp.objects[methodParent].methods.find( ({ type }) => type === methodName ).endpoint = u; //u.options[u.selectedIndex].text;
    temp.objects[methodParent].methods.find( ({ type }) => type === methodName ).object = r.options[r.selectedIndex].text;
    temp.objects[methodParent].methods.find( ({ type }) => type === methodName ).name = document.getElementById('meth-name').value;
    // temp.objects[methodParent].methods[methodName].type = "";
  }

  console.log("temp after save", temp);

}


function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}


function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}



function resHasBeenChosen(select){
  console.log("res sel: ", select.options[select.selectedIndex].getAttribute("id"));
  var field = select.options[select.selectedIndex].getAttribute("id")
  //table with names, selectProperties, and delete
  $("#table-response tbody").append('<tr><td>'+field+'</td><td><select id="property-res-select" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-white" style="overflow:scroll;"></select></td></tr>');

}


function reqHasBeenChosen(select){
  console.log("res sel: ", select.options[select.selectedIndex].getAttribute("id"));
  var param = select.options[select.selectedIndex].getAttribute("id")
  //table with names, selectProperties, and delete
  $("#table-parameters tbody").append('<tr><td>'+param+'</td><td></td></tr>');
}


function methodRadioChecked(){
  if(document.getElementById('customRadio1').checked) {
    $("#method-site").show();
    $("#type-list").hide();
  }else if(document.getElementById('customRadio2').checked) {
    $("#method-site").hide();
    $("#type-list").show();
  }
}


var firstType=false, secondType=false, typeList=[], tempObj={}, tempAct={}, tempObjAct={}, gettersList=[]; tempObjSet={}, allTheType={}, listOfTypes=[], firstType=true;


function typeHasBeenChosen(select){

  $("#step2_hint").hide();

  $("#prop-list").show();
  $("#"+type+"_property-select").empty();
  $("#"+type+"_property-select").append("<option selected>Add Property</option>");

  allProperties=[]
  properties=[]
  allSchemaTypes=[]

  var type = select.options[select.selectedIndex].getAttribute("id");
  var child = type
  var parent = select.getAttribute("id").split('-')[1]
  console.log("Parent: ", parent)
  console.log("Child: ", child)

  listOfTypes.push(type)

  currentType = child
  typeList.push(type);

  gettersList.push(type)

  typePropertyType[currentType]=[], propsInfo={};

  // tempObj={}
  tempObj[type]={"properties":[], "construct":{"self":{"endpoint":"", "id":""}}, "add":{"endpoint":""}, "remove":{"endpoint":"", "id":""}, "setters":[], "methods":[]}

  firebase.database().ref('/schema/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      allSchemaTypes.push(childSnapshot.val().title.split(' ').join(''))
      if(childSnapshot.val().title.split(' ').join('') == type){
        //getAllOfProperties(type);

        $.ajax({
            url: '/schemaOrg/'+type,//childSnapshot.val().format,
            type: 'GET',
            crossDomain:true,
            dataType: "html",
            success: function(res) {
              document.getElementById("schemaURL").href = childSnapshot.val().format;
              document.getElementById("schemaURL").innerText = childSnapshot.val().format;
              document.getElementById("schemaDesc").innerText = $(res).find('.description')[0].innerHTML;

              if($(res).find('.ds-tab-content').length > 0){
                var str = $(res).find('.ds-tab-content')[3].innerHTML
                var mySubString = str.split('&lt;script type=\"application/ld+json\"&gt;').pop().split('&lt;/script&gt;')[0]; // returns 'two'
                document.getElementById('hereCode').innerHTML = mySubString
                // Refresh Prism to apply the style
                Prism.highlightElement($('#hereCode')[0]);
                $("#jsonld-schema").show();
                //console.log("mySubString: ", mySubString);
              }else{
                $("#jsonld-schema").hide()
              }

              var propTbody = $(res).find('.definition-table')[0].getElementsByTagName("TBODY")[0];
              var pTrs = propTbody.getElementsByTagName("TR")

              for(var i=0; i<pTrs.length; ++i){
                let aTypes=[];
                let obProp = {"types":[], "desc":""}
                if(pTrs[i].classList.contains('supertype')){
                  continue;
                }else{
                  let th = pTrs[i].getElementsByTagName("TH")[0];
                  let co = th.getElementsByTagName("CODE")[0];
                  let as = co.getElementsByTagName("A")[0].innerHTML;

                  let tdDesc = pTrs[i].getElementsByTagName("TD")[1].innerHTML;

                  let tdTypes = pTrs[i].getElementsByTagName("TD")[0]
                  let tdAs = tdTypes.getElementsByTagName("A");

                  for(var j=0; j<tdAs.length; ++j){
                    aTypes.push(tdAs[j].innerHTML)
                  }

                  obProp.desc= tdDesc;
                  obProp.types=aTypes;
                  propsInfo[as]= obProp

                  $("#"+type+"_property-select").append("<option value="+as+">"+as+"</option>");

                }
              }

              allTheType[type]=propsInfo;
              console.log("allTheType: ", allTheType);

              $("#schema-desc").show()

            }
        });

      }
    });
  });


  // if(!firstType){
  //   firstType=true;
  //   $("#schema-"+type).empty()
  //   var row = '<tr id="'+type+'_row" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" id="'+type+'" class="btn btn-warning" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onClick="openNavType(this.id)">'+type+'</a></td> </tr>';
  // }else{
  //   $("#schema-"+type).empty()
  //   var row = '<tr id="'+type+'_row" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" id="'+type+'" class="btn btn-warning" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onClick="openNavType(this.id)">'+type+'</a></td> </tr>';
  // }


  var table = document.createElement('table');
  table.setAttribute('id', type);
  table.setAttribute('class', 'table table-borderless');
  table.setAttribute('style', 'margin-bottom:0px');

  var tbody= document.createElement('tbody');
  table.append(tbody)

  $("#tableDiv").append(table)

  //OLD WITH ARROWS
  $("#"+type+" tbody").append('<tr id="'+type+'_row" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" id="'+type+'" class="btn btn-warning" style="width:240px; height: 30px;text-align:center; padding: 4px 1px;" onClick="openNavType(this.id)">'+type+'</a></td>      <td><button id="'+type+'_row_close" style="float:left" type="button" class="close" aria-label="Close" onclick="deleteRow(this)" ><span aria-hidden="true">&times;</span></button></td>  </tr>')

  //Next to each other
  if(firstType){
    firstType=false;
    $("#"+type+" tbody").append('<tr id="'+child+'"><td style="display:flex; flex-wrap:wrap;">  <div id="tar" class="item-hints"  style="margin-top:-20px"><div class="hint" data-position="4" style="margin-left: 43px;">  <div style="display:flex;">   <div style="display:flex;"><div style="width:120px; text-align:center;"><select id="'+type+'_property-select" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-default" onchange="propertyHasBeenChosen(this)"><option selected>Add Property</option></select></div>  &nbsp; <div style="width:120px; text-align:center; ">   <select id="'+type+'_method-select" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-default" onchange="methodHasBeenChosen(this)" style="width:150px; text-align:center;"><option selected>Add Method</option></select> </div>   </div>  <div  id="step3_hint" class="hint-content do--split-children" ><p>For each type you add, choose the properties and methods.</p></div></div></div> </td></tr>')
  }else{
    $("#"+type+" tbody").append('<tr id="'+child+'"><td style="display:flex; flex-wrap:wrap;">  <div style="display:flex; margin-left: 43px;"><div style="width:120px; text-align:center;"><select id="'+type+'_property-select" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-default" onchange="propertyHasBeenChosen(this)"><option selected>Add Property</option></select></div>  &nbsp; <div style="width:120px; text-align:center; ">   <select id="'+type+'_method-select" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-default" onchange="methodHasBeenChosen(this)" style="width:150px; text-align:center;"><option selected>Add Method</option></select> </div>   </div>  </div></div> </td></tr>')

  }

  jQuery('.selectpicker').selectpicker('refresh');

  setTimeout(() => {
    // console.log("Returned Properties: ", allProperties);
    // console.log("Returned PropertiesINFO: ", propertiesInfo);
    $(".selectpicker").selectpicker();

    for(var i=0; i<allSchemaTypes.length; ++i){
      $("#schema-"+type).append("<option id="+allSchemaTypes[i]+">"+allSchemaTypes[i]+"</option>");
    }

    //remove the properties from the
    // $("#"+type+"_property-select").empty();
    // $("#"+type+"_property-select").append("<option selected>Add Property</option>");

    // console.log("ALL: ", allProperties)

    // for(var i=0; i<allProperties.length; ++i){
    //   // $("#property-"+type).append("<option id="+allProperties[i]+">"+allProperties[i]+"</option>");
    //   $("#"+type+"_property-select").append("<option value="+allProperties[i]+">"+allProperties[i]+"</option>");
    //   // $("#property-res-select").append("<option id="+allProperties[i]+">"+allProperties[i]+"</option>");
    // }

    for(var i=0; i<allMethods.length; ++i){
      $("#"+type+"_method-select").append("<option value="+allMethods[i]+">"+allMethods[i]+"</option>");
      $("#method-select").append("<option value="+allMethods[i]+">"+allMethods[i]+"</option>");
    }

    jQuery('.selectpicker').selectpicker('refresh');

  }, 3000);

  var firstOption = $("#type-select option:first").val();
  $("#type-select").val(firstOption);

}


function saveWoOSchema(){
  $("#beforeDone").hide();
  $("#afterDone").show();

  temp.objects= tempObj;
  console.log("temp.objects: ", Object.keys(temp.objects))
  console.log("final temp: ", temp)
  console.log("gettersList: ", gettersList)

  var as = document.getElementsByTagName("A")
  var objs= gettersList;//Object.keys(temp.objects);

  //types
  for (let j in objs) {
    for(let a in as){
      if(as[a].id == objs[j]){
        as[a].style.border = "3px solid #f90a69";
      }
    }
  }

  //methods
  for(let m in methodsImp){
    for(let a in as){
      if(as[a].innerHTML == methodsImp[m]){
        // console.log("PLEAE: ",as[a])
        as[a].style.border = "3px solid #f90a69";
      }
    }
  }

  //properties of type Object
  for (let p in propType) {
    for(let a in as){
      if(as[a].innerHTML == propType[p]){
        as[a].style.border = "3px solid #f90a69";
      }
    }
  }


  //properties of type exisiting objects
  var hasType = false;
  for(p in propType){
    for(t in propType[p].types){
      // console.log("propType[p]: ", propType[p])
      // console.log("listOfTypes: ", listOfTypes)
      if(listOfTypes.indexOf(propType[p].types[t]) !== -1){
        propListType.push(propType[p].name)
        console.log("propListType: ", propListType)

        for(let a in as){
          if(as[a].innerHTML == propType[p].name){
            as[a].style.border = "3px solid #f90a69";
          }
        }
      }
    }
  }


  //Populate available objects
  $("#method-result-type").empty();
  $("#method-result-type").append("<option selected>The type of the result</option>");

  var definedObj = Object.keys(temp.objects);
  for(var i=0; i<definedObj.length; ++i){
    $("#method-result-type").append("<option id="+definedObj[i]+">"+definedObj[i]+"</option>");
  }


  jQuery('.selectpicker').selectpicker('refresh');

}



var currentSite=""

function websiteHasBeenChosen(select){
  var type = select.options[select.selectedIndex].getAttribute("id");

}



var siteIsClicked = false
function getButtonIDSite(id){
  siteIsClicked=true;
}

function getButtonID(id){

  siteIsClicked=false;
  openNavType(id);
  //UPDATE the type
  currentType = id;

  currentType=id;
  allProperties=[]
  properties=[]
  allSchemaTypes=[]

  var type = id;
  var child = type
  var parent = "";
  // console.log("Parent: ", parent)
  // console.log("Child: ", child)

  // firebase.database().ref('/schema/').once('value').then(function(snapshot) {
  //   snapshot.forEach(function(childSnapshot) {
  //     allSchemaTypes.push(childSnapshot.val().title.split(' ').join(''))
  //     if(childSnapshot.val().title.split(' ').join('') == type){
  //       getAllOfProperties(type)

  //     }
  //   });
  // });


  // $("#types-table tbody tr #first").hide()
  // document.getElementById("firstType").style.visibility = "hidden";

  // if(!firstType){
  //   firstType=true;
  //   // document.getElementById("firstType").remove();
  //   $("#schema-"+type).empty()
  //   // $("#types-table tbody").empty()
  //   // var row = '<tr data-tt-id="'+child+'" data-tt-branch="true"><td id="butt-td"><a href="javascript:;" class="btn btn-warning disabled" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;;">'+type+'</a></td><td id="type-td"><code class="">type</code></td><td><div class="row"><div class="col-xs-3"><select id="schema-'+type+'" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-white" style="overflow:scroll;" onchange="typeHasBeenChosen(this)"><option selected>Add a Type</option></select></div><div class="col-xs-3"><select id="property-'+type+'" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-white" style="overflow:scroll; max-height: 20px;" onchange="propertyHasBeenChosen(this)"><option selected>Add a Property</option></select></div></div></td></tr>';
  //   var row = '<tr data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td"><a href="javascript:;" id="'+type+'" class="btn btn-warning" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onClick="getButtonID(this.id)">'+type+'</a></td></tr>';
  // }else{
  //   $("#schema-"+type).empty()
  //   // var row = '<tr data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td"><img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" class="btn btn-warning disabled" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;">'+type+'</a></td><td id="type-td"><code class="">type</code></td><td><div class="row"><div class="col-xs-3"><select id="schema-'+type+'" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-white" style="overflow:scroll;" onchange="typeHasBeenChosen(this)"><option selected>Add a Type</option></select></div><div class="col-xs-3"><select id="property-'+type+'" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-white" style="overflow:scroll; max-height: 20px;" onchange="propertyHasBeenChosen(this)"><option selected>Add a Property</option></select></div></div></td></tr>';
  //   var row = '<tr data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td"><a href="javascript:;" id="'+type+'" class="btn btn-warning" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onClick="getButtonID(this.id)">'+type+'</a></td></tr>';
  // }

  // var node = $("#types-table").treetable("node", parent);
  // $("#types-table").treetable("loadBranch",node , row);

  jQuery('.selectpicker').selectpicker('refresh');

  setTimeout(() => {
    // console.log("Returned Properties: ", allProperties);
    // console.log("Returned PropertiesINFO: ", propertiesInfo);
    $(".selectpicker").selectpicker();

    for(var i=0; i<allSchemaTypes.length; ++i){
      $("#schema-"+type).append("<option id="+allSchemaTypes[i]+">"+allSchemaTypes[i]+"</option>");
    }

    //remove the properties from the
    $("#property-select").empty();

    for(var i=0; i<allProperties.length; ++i){
      $("#property-"+type).append("<option id="+allProperties[i]+">"+allProperties[i]+"</option>");
      $("#property-select").append("<option value="+allProperties[i]+">"+allProperties[i]+"</option>");
    }
    jQuery('.selectpicker').selectpicker('refresh');

  }, 1000);


}


$(document).ready(function (e) {

  //init selectpicker
  selectPickerType = $('.selectpicker').selectpicker({
    noneResultsText:'Click enter to add {0}',
    selectOnTab: true
  });

  //Types select
  $("#type-list").on('keydown', '.bs-searchbox .form-control', function (e) {
    if(e.keyCode == 13){
      // console.log("test: ",e.target.value)
      $("#type-select").append("<option id="+e.target.value+">"+e.target.value+"</option>");
      jQuery('.selectpicker').selectpicker('refresh');
      //Add method to schema.org type
      return false;
    }
  });

  //Properties select
  $("#property-list").on('keydown', '.bs-searchbox .form-control', function (e) {
    if(e.keyCode == 13){
      // console.log("test: ",e.target.value)
      $("#property-select").append("<option value="+e.target.value+" id='new'>"+e.target.value+"</option>");
      jQuery('.selectpicker').selectpicker('refresh');
      //Add property to schema.org type
      return false;
    }
  });

  //Methods select
  $("#method-list").on('keydown', '.bs-searchbox .form-control', function (e) {
    if(e.keyCode == 13){
      // console.log("test: ",e.target.value)
      $("#method-select").append("<option value="+e.target.value+" id='new'>"+e.target.value+"</option>");
      jQuery('.selectpicker').selectpicker('refresh');
      //Add method to schema.org type
      return false;
    }
  });

});


var currentType="", propertyList=[], isNew=false, elem="property", isNewM=false, typePropertyType={}, propType=[];

function propertyHasBeenChosen(select){

  $("#step3_hint").hide();

  $("#schema-"+type).empty()
  $("#property-"+type).empty()
  //show step4
  $("#connectDiv").show()

  var property = select.options[select.selectedIndex].getAttribute("value");
  if(select.options[select.selectedIndex].getAttribute("id")=="new"){
    isNew=true;
  }
  var typeP, descP;
  console.log("property: ",property);
  propertyList.push(property);

  tempObj[currentType].properties.push(property)

  var child = property
  var parent = select.getAttribute("id").split('-')[1];
  var thisType = select.getAttribute("id").split('_')[0];

  console.log("thisType: ", thisType);
  //all <tr> elements
  var trs = document.getElementsByTagName("TR")

  if(isNew){
    for(let t in trs){
      if(trs[t].id == thisType){
        // $('<tr id="'+thisType+'_'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" class="btn btn-default" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" id="'+thisType+'.'+child+'"  onclick="openNav(this)">'+property+'</a></td></tr>').insertBefore(trs[t]);
        $('<tr id="'+thisType+'_'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" class="btn btn-default" style="width:240px; height: 30px;text-align:center; padding: 4px 1px;" id="'+thisType+'.'+child+'"  onclick="openNav(this.id)">'+property+'</a></td>  <td><button id="'+thisType+'_'+child+'_close" style="float:left" type="button" class="close" aria-label="Close" onclick="deleteRow(this)" ><span aria-hidden="true">&times;</span></button></td> </tr>').insertBefore(trs[t]);
        break;
      }
    }
  }else{
    for(var i=0; i<allTheType.length; ++i){
      console.log("allTheType[i]: ", allTheType[i])
      if(allTheType[i]['name'] == property){
        typeP = allTheType[i]['type']
        descP = allTheType[i]['desc']
      }
    }


    for(let t in trs){
      if(trs[t].id == thisType){
        //PROPERTY HERE
        // $('<tr id="'+thisType+'_'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" class="btn btn-default" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" id="'+thisType+'.'+child+'"  onclick="openNav(this.id)">'+property+'</a></td> </tr>').insertBefore(trs[t]);

        //OLD
        $('<tr id="'+thisType+'_'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" class="btn btn-grey" style="width:240px; height: 30px;text-align:center; padding: 4px 1px;" id="'+thisType+'.'+child+'"  onclick="openNav(this.id)">'+property+'</a></td> <td><button id="'+thisType+'_'+child+'_close" style="float:left" type="button" class="close" aria-label="Close" onclick="deleteRow(this)" ><span aria-hidden="true">&times;</span></button></td> </tr>').insertBefore(trs[t]);
        // $('<tr id="'+thisType+'_'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" class="btn btn-default" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" id="'+thisType+'.'+child+'"  onclick="openNav(this)">'+property+'</a></td> <td></td> <td id="type-td"><code id="code-type" class="">'+typeP+'</code></td><td id="des">'+descP+'</td></tr>').insertBefore(trs[t]);

        break;
      }
    }
  }

  console.log("tempObj properties: ", tempObj[thisType].properties);
  propList= tempObj[thisType].properties; //NEED TO BE FIXED

  typeP = allTheType[thisType][property].types[0]
  descP = allTheType[thisType][property].desc
  var types = allTheType[thisType][property].types;

  typePropertyType[thisType].push({
    name: property,
    type: typeP
  });

  propType.push({
    type: thisType,
    name: property,
    types: types
  })

  console.log("typePropertyType: ", typePropertyType);
  console.log("propType: ", propType);


  var firstOption = $("#"+thisType+"_property-select option:first").val();
  $("#"+thisType+"_property-select").val(firstOption);
}


function propertyTypeHasBeenSelected(select){
  var t = select.options[select.selectedIndex].getAttribute("value");
  console.log("it is of type Type: ", t);

  //show a dropdown menue of all the types
  //if isNew submit, else change
  $("#property-type").show();

}

var currentObjType=""

function typeHasBeenChosenForProperty(select){
  var nameP = $("#property-name").val().split('.')[1]
  var typeP = select.options[select.selectedIndex].getAttribute("id");
  currentObjType = typeP

  var type_name = $("#property-name").val().split('.').join('_');
  var onlyType = type_name.split('_')[0]
  console.log("type_name: ", type_name)

  var row = document.getElementById(type_name);
  row.cells.namedItem("type-td").innerHTML= '<code id="code-type" class="">'+typeP+'</code>'

  gettersList.push(onlyType+'.'+nameP)

  console.log("getters list: ", getters)

   //update the type f the property for the current type
   console.log("types with properties: ", typePropertyType);
   // .push({
   //   name:property,
   //   type: typeP
   // });

  //Find index of specific object using findIndex method.
  var theType = typePropertyType[onlyType]
  // => typePropertyType[currentType].name == nameP

  objIndex = typePropertyType[onlyType].findIndex((obj => obj.name == nameP));

  //Log object to Console.
  console.log("Before update: ", typePropertyType[onlyType][objIndex])

  //Update object's name property.
  console.log("currentType")
  typePropertyType[onlyType][objIndex].type = typeP;

  //Log object to console again.
  console.log("After update: ", typePropertyType[onlyType][objIndex])
  console.log("types with properties AFTER: ", typePropertyType);

  // $("#code-type").text=typeP
  // {/* <td id="type-td"><code id="code-type" class="">string</code></td> */}
  // row[parseInt(cn,10)].innerHTML=content;
}


function isArray(select){
  var nameP = $("#property-name").val().split('.')[1]
  // var typeP = select.options[select.selectedIndex].getAttribute("id");

  var type_name = $("#property-name").val().split('.').join('_');

  // var row = document.getElementById(type_name);
  // row.cells.namedItem("type-td").innerHTML= '<code id="code-type" class="">['+currentObjType+']</code>'

}

var methodsImp=[]
function methodHasBeenChosen(select){

  $("#step3_hint").hide();

  //add it to an array of methods to be implemented
  $("#schema-"+type).empty()
  $("#property-"+type).empty()

  var method = select.options[select.selectedIndex].getAttribute("value");

  var child = method
  var parent = select.getAttribute("id").split('-')[1];
  var thisType = select.getAttribute("id").split('_')[0];

  console.log("method: ", method)
  console.log("thisType Meth: ", thisType)

  if(select.options[select.selectedIndex].getAttribute("id")=="new"){
    isNewM=true;
  }
  var typeP="", descP=""; //LET USER CREATE THIS
  // console.log("method: ",method)

  methodsImp.push(method)

  // var table = document.createElement('table');
  // table.setAttribute('id', method);
  // table.setAttribute('class', 'table table-borderless');
  // var tbody= document.createElement('tbody');
  // table.append(tbody)
  // $("#tableDiv").append(table)

  var trs = document.getElementsByTagName("TR")


  if(siteIsClicked){
    $("#site-table tbody").append('<tr id="'+child+'" data-tt-id="method-site" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a id="method-siteM" class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px; color:white;" id="'+thisType+'.'+method+'" onclick="newMethed(this)">'+method+'</a></td></tr>')
  }else{
    if(isNewM){
      if(thisType==""){
        // tempAct[method]= {"query":"", "result":"", "name":""};
        tempAct[method]= {"endpoint":"", "object":"", "name":"", "type":method};
        temp.functions.push(tempAct[method]);
        $("#site-table tbody").append('<tr id="'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px; color:white;" id="'+thisType+'.'+method+'" onclick="newMethed(this)">'+method+'</a></td></tr>')
      }else{
        // tempObjAct[method]= {"query":"", "result":"", "name":""};
        tempObjAct[method]= {"endpoint":"", "object":"", "name":"", "type":method};
        tempObj[thisType].methods.push(tempObjAct[method]);

        console.log("tempObj[thisType]: ", tempObj[thisType])

          for(let t in trs){
            if(trs[t].id == thisType){
              $('<tr id="'+thisType+'_'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px; color:white;" id="'+thisType+'.'+method+'" onclick="newMethed(this)">'+method+'</a></td></tr>').insertBefore(trs[t]);
              break;
            }
          }

      }
    }else{
      for(var i=0; i<methodsInfo.length; ++i){
        if(methodsInfo[i]['name'] == method){
          descP = methodsInfo[i]['description']
        }
      }

        if(currentType==""){
          // tempAct[method]= {"query":"", "result":"", "name":""};
          tempAct[method]= {"endpoint":"", "object":"", "name":"", "type":method};

          temp.functions.push(tempAct[method]);

          $("#site-table tbody").append('<tr id="'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a id="methodSite.'+method+'" value="testVal" href="javascript:;" class="btn btn-purple" style="width:240px; height: 30px;text-align:center; padding: 4px 1px;" onclick="openNavMethod(this)">'+method+'</a></td><td id="type-td"><code class="">method</code></td><td>'+descP+'</td></tr>')
        }else{
          // tempObjAct[method]= {"query":"", "result":"", "name":""};
          tempObjAct[method]= {"endpoint":"", "object":"", "name":"", "type":method};
          // tempObj[thisType].methods = tempObjAct;
          tempObj[thisType].methods.push(tempObjAct[method]);

        console.log("tempObj[thisType]: ", tempObj[thisType])

          for(let t in trs){
            if(trs[t].id == thisType){
              $('<tr id="'+thisType+'_'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a class="btn btn-purple" style="width:240px; height: 30px;text-align:center; padding: 4px 1px; color:white;" id="'+thisType+'.'+method+'" onclick="openNavMethod(this)">'+method+'</a></td>  <td><button id="'+thisType+'_'+child+'" style="float:left" type="button" class="close" aria-label="Close" onclick="deleteRow(this)" ><span aria-hidden="true">&times;</span></button></td> </tr>').insertBefore(trs[t]);
              break;
            }
          }

          // $("#"+thisType+" tbody").append('<tr id="'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a id="OBJ'+currentType+'" href="javascript:;" class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onclick="openNavMethod(this.id)">'+method+'</a></td><td id="type-td"><code class="">method</code></td><td>'+descP+'</td></tr>')
        }
      }
    }

    $("#methods").append('<option value="'+method+'">'+method+'</option>');
    jQuery('.selectpicker').selectpicker('refresh');

    var firstOption = $("#"+thisType+"_method-select option:first").val();
    $("#"+thisType+"_method-select").val(firstOption);

    var firstOption = $("#method-select option:first").val();
    $("#method-select").val(firstOption);

}


function siteMethodHasBeenChosen(select){
  //add it to an array of methods to be implemented
  $("#schema-"+type).empty()
  $("#property-"+type).empty()

  // $("#type-list").show();

  var method = select.options[select.selectedIndex].getAttribute("value");

  var child = method
  var parent = select.getAttribute("id").split('-')[1];
  var thisType = select.getAttribute("id").split('_')[0];

  console.log("method: ", method)
  console.log("thisType Meth: ", thisType)

  // if(select.options[select.selectedIndex].getAttribute("id")=="new"){
  //   isNewM=true;
  // }

  methodsImp.push(method)

  tempAct[method]= {"endpoint":"", "object":"", "name":"", "type":method};
  temp.functions.push(tempAct[method]);

  $("#site-table tbody").append('<tr id="'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a id="methodSite.'+method+'" value="testVal" href="javascript:;" class="btn btn-purple" style="width:240px; height: 30px;text-align:center; padding: 4px 1px;" onclick="openNavMethod(this)">'+method+'</a></td></tr>')

    // var typeP="", descP=""; //LET USER CREATE THIS
  // console.log("method: ",method)

   // var table = document.createElement('table');
  // table.setAttribute('id', method);
  // table.setAttribute('class', 'table table-borderless');
  // var tbody= document.createElement('tbody');
  // table.append(tbody)
  // $("#tableDiv").append(table)

  // var trs = document.getElementsByTagName("TR")

  // if(siteIsClicked){
  //   $("#site-table tbody").append('<tr id="'+child+'" data-tt-id="method-site" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a id="method-siteM" class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px; color:white;" id="'+thisType+'.'+method+'" onclick="newMethed(this)">'+method+'</a></td><td id="type-td"><code class="">method</code></td><td></td></tr>')
  // }else{
  //   if(isNewM){
  //     if(thisType==""){
  //       // tempAct[method]= {"query":"", "result":"", "name":""};
  //       tempAct[method]= {"endpoint":"", "object":"", "name":"", "type":method};
  //       temp.functions.push(tempAct);
  //       $("#site-table tbody").append('<tr id="'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px; color:white;" id="'+thisType+'.'+method+'" onclick="newMethed(this)">'+method+'</a></td><td id="type-td"><code class="">method</code></td><td></td></tr>')
  //     }else{
  //       // tempObjAct[method]= {"query":"", "result":"", "name":""};
  //       tempObjAct[method]= {"endpoint":"", "object":"", "name":"", "type":method};
  //       // tempObj[thisType].methods= tempObjAct;
  //       tempObj[thisType].methods.push(tempObjAct[method]);
  //       // $("#"+thisType+" tbody").append('<tr id="'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px; color:white;" id="nav-toggle" onclick="newMethed(this)">'+method+'</a></td><td id="type-td"><code class="">method</code></td></tr>')

  //         for(let t in trs){
  //           if(trs[t].id == thisType){
  //             $('<tr id="'+thisType+'_'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px; color:white;" id="'+thisType+'.'+method+'" onclick="newMethed(this)">'+method+'</a></td><td id="type-td"><code class="">method</code></td></tr>').insertBefore(trs[t]);
  //             break;
  //           }
  //         }

  //     }
  //   }else{
  //     for(var i=0; i<methodsInfo.length; ++i){
  //       if(methodsInfo[i]['name'] == method){
  //         descP = methodsInfo[i]['description']
  //       }
  //     }

  //       if(currentType==""){
  //         tempAct[method]= {"endpoint":"", "object":"", "name":"", "type":method};
  //         temp.functions.push(tempAct);

  //         $("#site-table tbody").append('<tr id="'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a id="methodSite.'+method+'" value="testVal" href="javascript:;" class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onclick="openNavMethod(this)">'+method+'</a></td><td id="type-td"><code class="">method</code></td><td>'+descP+'</td><td></td></tr>')
  //       }else{
  //         tempObjAct[method]= {"endpoint":"", "object":"", "name":"", "type":method};
  //         tempObj[thisType].methods.push(tempObjAct[method]);

  //         for(let t in trs){
  //           if(trs[t].id == thisType){
  //             $('<tr id="'+thisType+'_'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px; color:white;" id="'+thisType+'.'+method+'" onclick="openNavMethod(this)">'+method+'</a></td><td id="type-td"><code class="">method</code></td></tr>').insertBefore(trs[t]);
  //             break;
  //           }
  //         }

  //         // $("#"+thisType+" tbody").append('<tr id="'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a id="OBJ'+currentType+'" href="javascript:;" class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onclick="openNavMethod(this.id)">'+method+'</a></td><td id="type-td"><code class="">method</code></td><td>'+descP+'</td></tr>')
  //       }
  //     }
  //   }

    $("#methods").append('<option value="'+method+'">'+method+'</option>');
    jQuery('.selectpicker').selectpicker('refresh');

    var firstOption = $("#"+thisType+"_method-select option:first").val();
    $("#"+thisType+"_method-select").val(firstOption);
}


function newProperty(select){
  console.log("new property clicked: ", select.text)

  $("#method-div").hide()
  $("#property-div").show()

  $('#nav-toggle').click(function(e) {
    e.stopPropagation();
    $(".menu").toggleClass('bar')
  });
  // $('body').click(function(e) {
  //   if ($('.menu').hasClass('bar')) {
  //     $(".menu").toggleClass('bar')
  //   }
  // })
  document.getElementById('property-name').value= select.text;
}

function addNewProperty(){
  console.log("ENTERED")
  nameP = $("#property-name").val().split('.')[1]
  typeP = $("#properties-type").children(":selected").attr("value")
  descP = $("#property-desc").val()

  var row = document.getElementById(nameP);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  cell1.innerHTML = '<td id="type-td"><code class="">'+typeP+'</code></td>';
  cell2.innerHTML = '<td>'+descP+'</td>';

  //add the new property to the current type
  firebase.database().ref('/schema/'+currentType+'/properties/'+nameP+'/ref').set("#/definitions/"+nameP);
  firebase.database().ref('/schema/'+currentType+'/definitions/'+nameP).set({
    title: nameP,
    description: descP,
    type: typeP
  });

}

function newMethed(select){
  console.log("method select: ", select)

  $("#method-div").show()
  $("#property-div").hide()

  $('#nav-toggle').click(function(e) {
    e.stopPropagation();
    $(".menu").toggleClass('bar')
  });

  document.getElementById('method-name').value= select.text;
}


function addNewMethod(){
  var nameM = $("#method-name").val().split('()')[0]
  var descM = $("#method-desc").val()
  var par = $("#method-params").val()
  var paramsM = par.split(',')

  var row = document.getElementById(nameM);
  console.log("nameM: ", row)
  var cell = row.insertCell(2);
  cell.innerHTML = '<td>'+descM+'</td>';

  //add the new property to the current type
  firebase.database().ref('/schema/'+currentType+'/methods/'+nameM).set({
    title: nameM,
    description: descM,
    parameters: paramsM
  });

}



function deleteRow(row) {
  // console.log("row ID: ", row.id)
  var rowID = row.id.split('_close')[0];
  var tableID= rowID.split('_')[0]

  if(rowID.includes('_row')){//remove the whole type table
    document.getElementById(tableID).remove();
  }else{//remove this row
    var i = row.parentNode.parentNode.rowIndex;
    document.getElementById(tableID).deleteRow(i);
  }

}


function matchFeildsToProperties(select){

  console.log("API Title: ", currentURLGetter);


  fetch('https://scrapir.org/specs/'+currentURLGetter)
  .then(response => response.json())
  .then(data => {
    console.log(data.responses);

    var responses = data.responses;
    var fields = [];

    for(var i=0; i< responses.length; ++i){
      //fields.push(responses[i].displayedName)
      $.ajax({
        type: 'GET',
        //data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:5000/synonyms/'+responses[i].displayedName,
          success: function(data) {
            console.log('success');
            var str = data.replace(/'/g, '"')
            var synonyms = JSON.parse(str)
            console.log(synonyms);
            console.log(synonyms.length);
            console.log("MATCH: ", getMatch(synonyms, tempObj[currentType].properties))
            // if te word does not exists

            function getMatch(a, b) {
              var matches = [];
              for ( var i = 0; i < a.length; i++ ) {
                  for ( var e = 0; e < b.length; e++ ) {
                      if ( a[i] === b[e] ) return b[e];//matches.push( a[i] );
                  }
              }
              return matches;
            }
            //get the one in the array of proprties
            //Then, push it to the array resProplist
            //what if there is more than one?? later deal with this case
            //have the two arrays, then show them in the ui somehow
          }
      });
    }

  });


    // res = resp.responses
    // for(var i; i<res.length; ++i){
    //   console.log("resp: ", res[i])
    // }
    // var resp = await fetch('https://scrapir.org/specs/'+currentURLGetter).then(res =>
    //   console.log("API Responses", res.json())
    //   //call a functiopn that tske two arrays and match them together using the python code
    //   // for each field, find the closest property https://scrapir.org/synonyms?field=title  <= this will
    //     // return an array of the synonyms! then, compre this array to the properties array, if not found, get the most similar?? not sure yet
    //   // add a row in a table that matches the two
    //   // allow the user to change the value and remove the row
    //   //
    // );

  // })()


  // var array1 = ["title"],
  // array2 = ["description", "name"];

  // function getMatch(a, b) {
  //     var matches = [];
  //     for ( var i = 0; i < a.length; i++ ) {
  //         for ( var e = 0; e < b.length; e++ ) {
  //             if ( a[i] === b[e] ) return b[e];//matches.push( a[i] );
  //         }
  //     }
  //     return matches;
  // }

  // // console.log("MATCH: ", getMatch(array1, array2))

  // $.ajax({
  //   type: 'GET',
  //   //data: JSON.stringify(data),
  //   contentType: 'application/json',
  //   url: 'http://localhost:5000/synonyms/title',
  //     success: function(data) {
  //       console.log('success');
  //       var str = data.replace(/'/g, '"')
  //       var synonyms = JSON.parse(str)
  //       console.log(synonyms);
  //       console.log(synonyms.length);
  //       console.log("MATCH: ", getMatch(synonyms, array2))

  //       //get the one in the array of proprties
  //       //Then, push it to the array resProplist
  //       //what if there is more than one?? later deal with this case
  //       //have the two arrays, then show them in the ui somehow
  //     }
  // });


  //Match the fields to the properties
  // (1) run the query using the default values
	// (2) get the response fields as an array
	// (3) do the matching of fields to properties for the chosen type
}


var firsGetter = true, currentGetter="";
function curretGetterHasBeenSelected(select){

  var getter = select.options[select.selectedIndex].getAttribute("value");

  console.log("getter: ", getter)

  currentGetter=getter;

  if(firsGetter){
    $("#duplicetorT0").show();
    firsGetter=false;
    $("#duplicetorT0 .panel-heading .panel-title").html(getter);
    console.log($("#duplicetorT0 .panel-heading .panel-title").html())

  }else{
    // var divTitle = document.getElementById('panel-title'+i);
    var div = document.getElementById('duplicetorT'+i);
    clone = div.cloneNode(true); // true means clone all childNodes and all event handlers
    clone.id = "duplicetorT" + ++i;
    $(clone).find('h4').attr("id",getter);
    $(clone).find('h4').html(getter);
    div.parentNode.appendChild(clone);
  }

  if(getter.includes(".")){
    //get the type of the property
  }else{
    console.log("getter type: ", temp.objects[getter])
    console.log("getter porperties: ",temp.objects[getter].properties)
  }

  // firebase.database().ref('/apis/').once('value').then(function(snapshot) {
  //   snapshot.forEach(function(childSnapshot) {
  //     //get the api urls that has the site name!
  //     type = childSnapshot.val().title.split(' ').join('')
  //     $("#apis-url-types").append("<option data-subtext='"+childSnapshot.val().url+"' id="+JSON.stringify(childSnapshot.val().title)+">"+childSnapshot.val().title+"</option>");
  //   });
  // });


  $("#apis-url-types").empty();
  for(var i=0; i<scrapirAPIs.length; ++i){
    var urlText = scrapirAPIs[i].url;
    if(urlText.includes(site)){
      $("#apis-url-types").append("<option data-subtext='"+scrapirAPIs[i].url+"' id="+JSON.stringify(scrapirAPIs[i].title)+">"+scrapirAPIs[i].title+"</option>");
    }
  }

  setTimeout(() => {
    jQuery('.selectpicker').selectpicker('refresh');
  }, 4000);

}

var firsMethod = true, i = 0;
function curretnMethodHasBeenSelected(select){
  var method = select.options[select.selectedIndex].getAttribute("value");
  console.log("method: ", method)
  // $("#methods-imp").append('<div class="panel panel-info" data-sortable-id="ui-widget-12"><div class="panel-heading"><h4 class="panel-title">'+method+'</h4><div class="panel-heading-btn"><a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a></div></div><div class="panel-body" id="'+method+'"></div></div></div>')
  // console.log("div!!: ", document.getElementById("methods-imp"))
  // <div class="form-group row m-b-50"><label class="col-form-label ">Method Name</label><p>'+method+'</p><label class="col-form-label">API Endpoint</label><select id="apis-url" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-white" style="overflow:scroll;" onchange="urlHasBeenChosen(this)"><option selected>Look for the API URL</option></select></div>

  if(firsMethod){
    $("#duplicetor0").show();
    firsMethod=false;
    $("#duplicetor0 .panel-heading .panel-title").html(method);
    console.log($("#duplicetor0 .panel-heading .panel-title").html())
  }else{
    // var divTitle = document.getElementById('panel-title'+i);
    var div = document.getElementById('duplicetor'+i);
    clone = div.cloneNode(true); // true means clone all childNodes and all event handlers
    clone.id = "duplicetor" + ++i;
    $(clone).find('h4').attr("id",method);
    $(clone).find('h4').html(method);
    div.parentNode.appendChild(clone);
  }

}


// $(document).ready(function (e) {
//   var type_sel= $('#type-select')[0].id
//   console.log("type_sel: ", type_sel[0].id)
//   //init selectpicker
//   selectPickerType = $('.selectpicker').selectpicker({
//     noneResultsText:'{0} <input id="'+type_sel+'" type="button" value="add method" onclick="testX(this)"/>',
//     // 'Click enter to add {0}',
//     selectOnTab: true
//   });

// });


// function testX(select){
//   console.log("YEAG: ", select.id)
//   // var select_id = select.options[select.selectedIndex].getAttribute("id");
//   //Types select
//   // $("#type-list").on('keydown', '.bs-searchbox .form-control', function (e) {
//   //   if(e.keyCode == 13){
//       // console.log("test: ",e.target.value)
//       $("#"+select.id).append("<option id="+e.target.value+">"+e.target.value+"</option>");
//       jQuery('.selectpicker').selectpicker('refresh');
//       //Add method to schema.org type
//     //   return false;
//     // }
//   // });


//   //Properties select
//   $("#property-list").on('keydown', '.bs-searchbox .form-control', function (e) {
//     if(e.keyCode == 13){
//       // console.log("test: ",e.target.value)
//       $("#property-select").append("<option id="+e.target.value+">"+e.target.value+"</option>");
//       jQuery('.selectpicker').selectpicker('refresh');
//       //Add property to schema.org type
//       return false;
//     }
//   });

//   //Methods select
//   $("#method-list").on('keydown', '.bs-searchbox .form-control', function (e) {
//     if(e.keyCode == 13){
//       // console.log("test: ",e.target.value)
//       $("#method-select").append("<option id="+e.target.value+">"+e.target.value+"</option>");
//       jQuery('.selectpicker').selectpicker('refresh');
//       //Add method to schema.org type
//       return false;
//     }
//   });

// }



// function inputSel(select){
//   // $( "#test option:selected" ).text();
//   // console.log("select: ",select.options[select.selectedIndex].text)

//   console.log("select")
//     $("#meth").select2({
//     tags: true,
//     createTag: function (params) {
//       return {
//         id: params.term,
//         text: params.term,
//         newOption: true
//       }
//     },
//      templateResult: function (data) {
//       var $result = $("<span></span>");

//       $result.text(data.text);

//       if (data.newOption) {
//         $result.append(" <em>(new)</em>");

//       }
//       return $result;
//     }
//   });

// }

