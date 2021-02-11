var config = {
  apiKey: "AIzaSyBaJakjjAHw0wvBtELAtDLPmhq1piGWwqQ",
  authDomain: "superapi-52bc2.firebaseapp.com",
  databaseURL: "https://superapi-52bc2.firebaseio.com",
  projectId: "superapi-52bc2",
  storageBucket: "superapi-52bc2.appspot.com",
  messagingSenderId: "859121565515"
};


//NEW
function openNav(i) {
  closeNav();
  closeNavType();
  closeNavMethod();

  document.getElementById("mySidenav").style.width = "430px";
  console.log("the name of the property: ", i.getAttribute("id"))
  document.getElementById('property-name').value= i.getAttribute("id")
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";

  document.getElementById("property-div").reset();
  $("#property-type").hide();
  document.getElementById("properties-type").value = "string";
}


function openNavType(id) {
  closeNav();
  closeNavType();
  closeNavMethod();

  document.getElementById("mySidenavType").style.width = "430px";
  document.getElementById("mySidenavType").style.padding = "20px";
  //console.log("the name of the property: ", i.getAttribute("id"));
  //document.getElementById('type-name').value= i.getAttribute("id")
  console.log("THE type: ", id);

  $("#typeN").text(id);
  $("#siteN").text(site);

  $("#selected_type").text(id);

  // $("#apis-type").empty();

  $("#accordion").empty()
  for(var i=0; i<scrapirAPIs.length; ++i){
    var urlText = scrapirAPIs[i].url;
      if(urlText.includes(site)){
        noSpacesTitle = scrapirAPIs[i].title.split(' ').join('');
        $("#accordion").append('<div class="card"><div class="card-header pointer-cursor d-flex justify-content-between align-items-center collapsed" data-toggle="collapse" data-target="#'+noSpacesTitle+'">'+scrapirAPIs[i].title+'<button type="button" class="btn btn-grey" id="'+scrapirAPIs[i].title+'" onclick="urlHasBeenChosen(this)"  style="float: right;">select</button> </div><div id="'+noSpacesTitle+'" class="collapse" data-parent="#accordion"><div class="card-body" id="cardBody'+noSpacesTitle+'"> </div></div></div>')
        
        $("#cardBody"+noSpacesTitle).append('<label><B>API URL:</B></label><p>'+scrapirAPIs[i].url+'<p>')
        $("#cardBody"+noSpacesTitle).append('<label><B>Parameters:</B></label><p>'+scrapirAPIs[i].params+'<p>')
        $("#cardBody"+noSpacesTitle).append('<label><B>Response Fields:</B></label><p>'+scrapirAPIs[i].res+'<p>')

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

  document.getElementById("mySidenavMethod").style.width = "430px";

  methodName= elem.id.split('.')[1];
  methodParent= elem.id.split('.')[0];//id.split('OBJ')[1];

  console.log("the name of the method: ", methodName)
  console.log("the value of the method's parent: ",methodParent)
  document.getElementById('meth-name').value= methodName;

  // $("#apis-url-method").empty();
  $("#accordion-method").empty();

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


once=false
var scrapirAPIs = [];
var allSchemaTypesButActions = [];

// window.onload = function () {
function fetchSchemaTypes(){

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

  websites=['4shared', 'abc', 'abcnews', 'about', 'aboutads', 'abril', 'academia', 'accounts', 'addthis', 'addtoany', 'adobe', 'adssettings', 'afternic', 'akamaihd', 'alibaba', 'aliexpress', 'allaboutcookies', 'amazon', 'amzn', 'android', 'answers', 'aol', 'ap', 'apache', 'apple', 'archive', 'archives', 'arxiv', 'asus', 'bandcamp', 'bbc', 'berkeley', 'biblegateway', 'biglobe', 'billboard', 'bing', 'bit', 'bitly', 'blackberry', 'bloglovin', 'bloomberg', 'booking', 'books', 'boston', 'box', 'bp', 'bp1', 'bp2', 'brandbucket', 'britannica', 'bt', 'businessinsider', 'buydomains', 'buzzfeed', 'calameo', 'cambridge', 'canva', 'cbc', 'cbslocal', 'cbsnews', 'cdc', 'change', 'channel4', 'chicagotribune', 'chinadaily', 'chron', 'cia', 'cloudflare', 'cmu', 'cnbc', 'cnet', 'cnn', 'code', 'columbia', 'consumerreports', 'cornell', 'corriere', 'cpanel', 'creativecommons', 'csmonitor', 'dailymail', 'dailymotion', 'dan', 'daum', 'de', 'debian', 'deezer', 'dell', 'depositfiles', 'detik', 'developers', 'dictionary', 'digg', 'digitaltrends', 'discovery', 'disney', 'disqus', 'docs', 'doubleclick', 'draft', 'dreniq', 'drive', 'dropbox', 'dw', 'e-monsite', 'e-recht24', 'ea', 'ebay', 'economist', 'ed', 'ehow', 'elmundo', 'elpais', 'elsevier', 'en', 'enable-javascript', 'engadget', 'eonline', 'epa', 'es', 'espn', 'etsy', 'europa', 'eventbrite', 'evernote', 'example', 'express', 'facebook', 'fandom', 'fastcompany', 'fb', 'fda', 'feedburner', 'feedproxy', 'fifa', 'files', 'finance', 'forbes', 'forms', 'fortune', 'foursquare', 'foxnews', 'fr', 'ft', 'ftc', 'get', 'ggpht', 'giphy', 'github', 'gizmodo', 'globo', 'gmail', 'gnu', 'godaddy', 'gofundme', 'goo', 'goodreads', 'google', 'googleblog', 'googleusercontent', 'gravatar', 'greenpeace', 'groups', 'gstatic', 'guardian', 'harvard', 'hatena', 'hm', 'hollywoodreporter', 'house', 'hp', 'huawei', 'huffingtonpost', 'huffpost', 'hugedomains', 'ibm', 'icann', 'id', 'ietf', 'ig', 'ign', 'ikea', 'imageshack', 'imdb', 'inc', 'independent', 'indiatimes', 'instagram', 'instructables', 'intel', 'ipv4', 'iso', 'issuu', 'istockphoto', 'it', 'iubenda', 'ja', 'jimdofree', 'khanacademy', 'kickstarter', 'last', 'latimes', 'lefigaro', 'lemonde', 'lifehacker', 'line', 'linkedin', 'list-manage', 'live', 'liveinternet', 'loc', 'lonelyplanet', 'm', 'mail', 'maps', 'marketingplatform', 'marketwatch', 'marriott', 'mashable', 'mayoclinic', 'mediafire', 'medium', 'mega', 'megaupload', 'merriam-webster', 'metro', 'microsoft', 'mirror', 'mit', 'mixcloud', 'mozilla', 'msn', 'my', 'myaccount', 'myspace', 'mysql', 'namecheap', 'narod', 'nasa', 'nationalgeographic', 'nature', 'naver', 'nba', 'nbcnews', 'netflix', 'netvibes', 'networkadvertising', 'news', 'newsweek', 'newyorker', 'nginx', 'nicovideo', 'nih', 'nikkei', 'noaa', 'nokia', 'npr', 'nvidia', 'nydailynews', 'nypost', 'nytimes', 'office', 'ok', 'opera', 'oracle', 'orange', 'oreilly', 'oup', 'over-blog-kiwi', 'ovh', 'ox', 'parallels', 'paypal', 'pbs', 'pcmag', 'pexels', 'photobucket', 'photos', 'php', 'picasa', 'picasaweb', 'pinterest', 'pixabay', 'pl', 'play', 'playstation', 'plesk', 'plos', 'plus', 'policies', 'politico', 'prestashop', 'princeton', 'privacyshield', 'prnewswire', 'psu', 'psychologytoday', 'pt', 'public-api', 'qq', 'quora', 'rakuten', 'rapidshare', 'rediff', 'repubblica', 'researchgate', 'reuters', 'reverbnation', 'ria', 'rollingstone', 'rottentomatoes', 'rt', 'ru', 'samsung', 'sapo', 'sciencedaily', 'sciencedirect', 'sciencemag', 'scientificamerican', 'scoop', 'scribd', 'search', 'secureserver', 'sedo', 'sendspace', 'sfgate', 'shop-pro', 'shopify', 'shutterstock', 'si', 'sina', 'sites', 'sky', 'skype', 'slate', 'slideshare', 'smh', 'so-net', 'softpedia', 'soratemplates', 'soundcloud', 'spiegel', 'sports', 'spotify', 'springer', 'sputniknews', 'ssl-images-amazon', 'stackoverflow', 'standard', 'stanford', 'state', 'statista', 'steampowered', 'storage', 'stuff', 'support', 'surveymonkey', 't', 'tabelog', 'target', 'teamviewer', 'techcrunch', 'techradar', 'ted', 'telegram', 'telegraph', 'terra', 'theatlantic', 'thedailybeast', 'thefreedictionary', 'theglobeandmail', 'theguardian', 'themeforest', 'thestar', 'thesun', 'thetimes', 'theverge', 'thoughtco', 'time', 'timeout', 'tinyurl', 'tools', 'translate', 'tripadvisor', 'trustpilot', 'twitch', 'twitter', 'ubuntu', 'ucoz', 'umich', 'un', 'unesco', 'uol', 'urbandictionary', 'usatoday', 'usgs', 'usnews', 'utexas', 'variety', 'vchecks', 'venturebeat', 'viagens', 'vice', 'video', 'vimeo', 'vk', 'vox', 'w3', 'wa', 'walmart', 'washington', 'washingtonpost', 'weather', 'webmd', 'weibo', 'welt', 'whatsapp', 'whitehouse', 'who', 'wikia', 'wikihow', 'wikimedia', 'wiktionary', 'wiley', 'windowsphone', 'wired', 'wordpress', 'worldbank', 'wp', 'wsj', 'www', 'xbox', 'xing', 'xinhuanet', 'yadi', 'yahoo', 'yale', 'yandex', 'yelp', 'youronlinechoices', 'youtu', 'youtube', 'ytimg', 'zeit', 'zendesk', 'ziddu'];

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

  if(!once){
    firebase.initializeApp(config);
    once=true

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
    });

    $(".selectpicker").selectpicker();

    for(var i=0; i<websites.length; ++i){
      $("#sites-name").append("<option id="+websites[i]+">"+websites[i]+"</option>");
    }

    var actionStrings= ["TouristAttraction", "InteractionCounter", "ActionStatusType", "ActiveActionStatus", "CompletedActionStatus", "FailedActionStatus", "PotentialActionStatus", "ActionAccessSpecification"]

    firebase.database().ref('/schema/').once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        type= childSnapshot.val().title.split(' ').join('')
        // $("#schema-types").append("<option id="+type+">"+childSnapshot.val().title+"</option>");
        var title=childSnapshot.val().title;
        if((title.includes("action") || title.includes("Action")) && !actionStrings.includes(childSnapshot.val().title)){
          allMethods.push(childSnapshot.val().title)
          $("#method-select").append("<option value="+childSnapshot.val().title+">"+childSnapshot.val().title+"</option>");
        }else{
          $("#type-select").append("<option id="+type+">"+childSnapshot.val().title+"</option>");
          $("#type-select2").append("<option id="+type+">"+childSnapshot.val().title+"</option>");

          // $("#method-result-type").append("<option id="+type+">"+childSnapshot.val().title+"</option>");
          
          // allSchemaTypesButActions.push(childSnapshot.val().title);
        }
      });
    });


    $("#apis-url").empty();
    for(var i=0; i<scrapirAPIs.length; ++i){
      var urlText = scrapirAPIs[i].url;
      if(urlText.includes(site)){
        $("#apis-url").append("<option data-subtext='"+scrapirAPIs[i].url+"' id="+JSON.stringify(scrapirAPIs[i].title)+">"+scrapirAPIs[i].title+"</option>");
      }
    }

    // firebase.database().ref('/apis/').once('value').then(function(snapshot) {
    //   snapshot.forEach(function(childSnapshot) {
    //     type= childSnapshot.val().title.split(' ').join('')
    //     scrapirAPIs
    //     $("#apis-url").append("<option data-subtext='"+childSnapshot.val().url+"' id="+JSON.stringify(childSnapshot.val().title)+">"+childSnapshot.val().title+"</option>");
    //   });
    // });

    // sites that people have chose already
    // firebase.database().ref('/functions/').once('value').then(function(snapshot) {
    //   snapshot.forEach(function(childSnapshot) {
    //     console.log(childSnapshot.key)
    //     $("#sites").append("<option id="+JSON.stringify(childSnapshot.key)+">"+childSnapshot.key+"</option>");
    //   });
    // });

    setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
    }, 6000);

  }
	
}

var arrFields=[], wooSchema={}, site="", temp={};

function siteHasBeenChosen(select){
  
  $("#step3").show();

  $("#site-objects").empty();
  site = select.options[select.selectedIndex].getAttribute("id");

  temp = { "objects":{}, "functions":[] };

  firebase.database().ref('/abstractions/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      if(site == childSnapshot.key){
        arrFields = childSnapshot.val().objects;
        for(obj in arrFields){
          $("#site-objects").append('<a class="code" style="color: tomato; cursor: pointer; padding: 5px; font-size:1.2em" id="'+obj+'" onclick="typeHasBeenChosen2(this)">'+obj+'</a>&nbsp;&nbsp;&nbsp;&nbsp;');
        }
      }
    });
  });


  // var table = document.createElement('table');
  // table.setAttribute('id', type);
  // table.setAttribute('class', 'table table-borderless');
  // var tbody= document.createElement('tbody');
  // table.append(tbody)

  // $("#tableSiteDiv").append(table)

  $("#site-table tbody").append('<tr data-tt-id="'+site+'" data-tt-parent-id="'+site+'" data-tt-branch="true"><td id="butt-td"><a href="javascript:;" id="'+site+'" class="btn btn-info" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onClick="getButtonIDSite(this.id)">'+site+'</a></td><td id="type-td"><code class="">site</code></td> <td></td></tr>')
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

function getAllMethods(schemaType){

  firebase.database().ref('/schema/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) { 
      if(childSnapshot.val().title.split(' ').join('') == schemaType){
        if(childSnapshot.val().methods){
          var mName = Object.keys(childSnapshot.val().methods)
          for(var i=0; i<mName.length; ++i){
            console.log("mName[i]: ", mName[i])
            allMethods.push(mName[i])
            methodsInfo.push({
              name: mName[i].title,
              params: mName[i].parameters,
              description: mName[i].description
           });
          }
        }
      }
    });
  });

}


function resultTypeHasBeenChosen(select){

  var ttt = select.options[select.selectedIndex].getAttribute("id");
  console.log("resultTypeHasBeenChosen id: ", ttt);

  // propList = temp.objects[ttt].properties;

  // console.log("final response XX", resProplist);
  // console.log("final properties ", propList);

  // // temp.objects[getter].properties

  // // APPEND the above arrays to the table2
  // $("#table2 tbody").empty()

  // for(var i=0; i<resProplist.length || i<propList.length ; ++i){
  //   if(resProplist[i] === undefined){
  //     var r = ''
  //   }else{
  //     var r = resProplist[i]
  //   }

  //   if(propList[i] === undefined){
  //     var p = ''
  //   }else{
  //     var p = '<div class="redips-drag">'+propList[i]+'</div>'
  //   }
    
  //   $("#table2 tbody").append('<tr><td class="redips-mark">'+r+'</td><td>'+p+'</td></tr>');

  // }

  // /* enable strict mode */
  // 'use strict';

  //   // create redips container
  //   let redips = {},
  //   counter = 0;

  // // redips initialization
  // //redips.init = function () {
  //   // reference to the REDIPS.drag library
  //   let rd = REDIPS.drag;
  //   // initialization
  //   rd.init();
  //   // set mode option to "shift"
  //   rd.dropMode = 'shift';
  //   // set animation loop pause
  //   rd.animation.pause = 20;
  //   // enable shift.animation
  //   rd.shift.animation = true;
  //   // set TD for overflow elements (initially)
  //   rd.shift.overflow = document.getElementById('overflow');
  //   // add counter to cloned element name
  //   // (after cloned DIV element is dropped to the table)
  //   rd.event.clonedDropped = function () {
  //     // increase counter
  //     counter++;
  //     // append to the DIV element name
  //     rd.obj.innerHTML += counter;
  //   };
  // //};

  // //set current table
  // redips.setTable = function (e) {
  //   let value = e.options[e.selectedIndex].value,
  //     tables = document.getElementById('redips-drag').getElementsByTagName('table'),
  //     i;
  //   // loop goes through all fetched tables within drag container
  //   for (i = 0; i < tables.length; i++) {
  //     // skip mini table
  //     if (tables[i].id === 'mini') {
  //       continue;
  //     }
  //     // show selected table
  //     else if (tables[i].id === value) {
  //       tables[i].style.display = '';
  //     }
  //     // hide all other tables
  //     else {
  //       tables[i].style.display = 'none';
  //     }
  //   }
  // };

  // // set shift mode
  // redips.shiftMode = function (radio) {
  //   REDIPS.drag.shift.mode = radio.value;
  // };

  // // set overflow
  // redips.overflow = function (radio) {
  //   if (radio.value === 'user') {
  //     REDIPS.drag.shift.overflow = document.getElementById('overflow');
  //   }
  //   else {
  //     REDIPS.drag.shift.overflow = radio.value;
  //   }
  // };

  // // enable / disable animation
  // redips.shiftAnimation = function (chk) {
  //   REDIPS.drag.shift.animation = chk.checked;
  // };

  // // enable / disable shift after element is deleted
  // redips.shiftAfter = function (chk) {
  //   REDIPS.drag.shift.after = chk.value;
  // };

  // // toggles trash_ask parameter defined at the top
  // redips.toggleConfirm = function (chk) {
  //   if (chk.checked === true) {
  //     REDIPS.drag.trash.question = 'Are you sure you want to delete DIV element?';
  //   }
  //   else {
  //     REDIPS.drag.trash.question = null;
  //   }
  // };

  // // add onload event listener
  // if (window.addEventListener) {
  //   window.addEventListener('load', redips.init, false);
  // }
  // else if (window.attachEvent) {
  //   window.attachEvent('onload', redips.init);
  // }


  // $("#methodMapLabel").show();
}


function idHasBeenChosed(){
  $("#mapLabel").show()
}


var currentURLGetter = "", propList=[], resProplist=[];


function urlHasBeenChosen(select){

  $("#idLabel").show()
  
  var resFields;
  var apiTitle = select.getAttribute("id");//.options[select.selectedIndex].getAttribute("id");
  console.log("apiTitle: ", apiTitle);

  currentURLGetter = apiTitle
  
  ob={
    [currentType]:{
      "apiEndpoint":apiTitle,
      "fields":[]
    }
  }
  // ob.currentType.apiEndpoint=apiTitle;
  console.log("OBJ: ", ob)

  firebase.database().ref('/apis/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      if(childSnapshot.val().title==apiTitle){
        console.log("par: ",childSnapshot.val().parameters) //choose which one you want to send as parameter to the function
        console.log("res: ", childSnapshot.val().responses)
        resFields = childSnapshot.val().responses;
        reqParam  = childSnapshot.val().parameters;
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

        for(var i=0; i<reqParam.length; ++i){
          if(reqParam[i].displayed && reqParam[i].displayed==true){
            $("#type-id").append('<option id="'+reqParam[i].name+'">'+reqParam[i].name+'</option>');
          }else if(!reqParam[i].displayed){
            $("#type-id").append('<option id="'+reqParam[i].name+'">'+reqParam[i].name+'</option>');
          }else{
            // do nothing
          }
        }

        console.log("typePropertyType[currentType]: ", typePropertyType[currentType])

        propList=[]
        for(var j=0; j<typePropertyType[currentType].length; ++j){
          if(typePropertyType[currentType][j].type=="string" || typePropertyType[currentType][j].type=="integer" || typePropertyType[currentType][j].type=="date" || typePropertyType[currentType][j].type=="boolean"){
            //push it
            propList.push(typePropertyType[currentType][j].name)
          }else{
            //skip it
          }
        }

        // propList = temp.objects[currentType].properties;

        console.log("final response ", resProplist);
        console.log("final properties ", propList);

        // temp.objects[getter].properties

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

        // for(var i=0; i<reqParam.length; ++i){
        //   $("#type-id").append('<option id="'+reqParam[i].name+'">'+reqParam[i].name+'</option>');
        // }


        console.log("typePropertyType[currentType]: ", typePropertyType[currentType])

        propList=[]
        for(var j=0; j<typePropertyType[currentType].length; ++j){
          if(typePropertyType[currentType][j].type=="string" || typePropertyType[currentType][j].type=="integer" || typePropertyType[currentType][j].type=="date" || typePropertyType[currentType][j].type=="boolean"){
            //push it
            propList.push(typePropertyType[currentType][j].name)
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

function saveTypeConfig(){
  //save construct -> self -> endpoint: name of api endint
  //                       -> id: chosen id 
  var selector = document.getElementById("type-id");
  var idValue = selector[selector.selectedIndex].value;

  temp.objects[currentType].construct.self.endpoint= currentURLGetter; //get the value of the chosen API
  temp.objects[currentType].construct.self.id= idValue; //get the value of the chosen ID
  temp.objects[currentType].properties=[]

  var table = document.getElementById("table1");
  for (var i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    if(row.cells[1].getElementsByClassName('redips-drag').length==0){
    }else{
      console.log("col[0]: ", row.cells[0].textContent);
      console.log("col[1]: ", row.cells[1].getElementsByClassName('redips-drag').item(0).innerHTML)
      var f=row.cells[0].textContent
      var p=row.cells[1].getElementsByClassName('redips-drag').item(0).innerHTML
      
      temp.objects[currentType].properties.push({
        field:f,
        property:p
      })
    }
 
  }

  console.log("temp after save", temp.objects[currentType]);
  // save properties -> .properties[]
  // get object->properties->push({field:..., property:... })
  // if property of type object, then object->properties->push({type:..., property:... })
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

var firstType=false, secondType=false, typeList=[], tempObj={}, tempAct={}, tempObjAct={}, gettersList=[];

function typeHasBeenChosen(select){

  $("#prop-list").show();

  allProperties=[]
  properties=[]
  allSchemaTypes=[]
  
  var type = select.options[select.selectedIndex].getAttribute("id");
  var child = type
  var parent = select.getAttribute("id").split('-')[1]
  console.log("Parent: ", parent)
  console.log("Child: ", child)

  currentType = child
  typeList.push(type);

  gettersList.push(type)

  typePropertyType[currentType]=[];

  // tempObj={}
  tempObj[type]={"properties":[], "construct":{"self":{"endpoint":"", "id":""}}, "methods":[]}

  firebase.database().ref('/schema/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) { 
      allSchemaTypes.push(childSnapshot.val().title.split(' ').join(''))
      if(childSnapshot.val().title.split(' ').join('') == type){
        getAllOfProperties(type);
 
        $("#schema-desc").show()

        $.ajax({
            url: childSnapshot.val().format,
            type: 'GET',
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

            }
        });
 
      }
    });
  });


  if(!firstType){
    firstType=true;
    $("#schema-"+type).empty()
    var row = '<tr data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" id="'+type+'" class="btn btn-warning" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onClick="openNavType(this.id)">'+type+'</a></td><td id="type-td"><code class="">type</code></td><td></td></tr>';
  }else{
    $("#schema-"+type).empty()
    var row = '<tr data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" id="'+type+'" class="btn btn-warning" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onClick="openNavType(this.id)">'+type+'</a></td><td id="type-td"><code class="">type</code></td><td></td></tr>';
  }

  // var node = $("#types-table").treetable("node", parent);
  // $("#types-table").treetable("loadBranch",node , row);

  var table = document.createElement('table');
  table.setAttribute('id', type);
  table.setAttribute('class', 'table table-borderless');
  var tbody= document.createElement('tbody');
  table.append(tbody)

  $("#tableDiv").append(table)

  $("#"+type+" tbody").append('<tr data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" id="'+type+'" class="btn btn-warning" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onClick="openNavType(this.id)">'+type+'</a></td><td id="type-td"><code class="">type</code></td><td></td></tr>')

  $("#"+type+" tbody").append('<tr id="'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style="display: inline-block; width:150px; text-align:center;"><select style="display:inline; width:150px; height: 30px; text-align:center; padding: 4px 1px;" id="'+type+'_property-select" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-grey" onchange="propertyHasBeenChosen(this)"><option style="width:150px; height: 30px;" value="" selected>Add Property</option></select></div></td><td><div style="display: inline-block; width:150px; text-align:center;"><select id="'+type+'_method-select" style="display:inline; width:150px; height: 30px; text-align:center; padding: 4px 1px;" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-grey" onchange="methodHasBeenChosen(this)"><option value="" selected>Add Method</option></select></div></td><td></td></tr>')

  //ADD METHOD UNDER TYPE
  // $("#"+type+" tbody").append('<tr id="'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style="display: inline-block; width:150px; text-align:center;"><select style="display:inline; width:150px; height: 30px; text-align:center; padding: 4px 1px;" id="'+type+'_property-select" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-default" onchange="propertyHasBeenChosen(this)"><option style="width:150px; height: 30px;" value="" selected>Add Property</option></select></div></td><td id="type-td"></td><td></td></tr>')
  
  jQuery('.selectpicker').selectpicker('refresh');

  setTimeout(() => {
    // console.log("Returned Properties: ", allProperties);
    // console.log("Returned PropertiesINFO: ", propertiesInfo);
    $(".selectpicker").selectpicker();

    for(var i=0; i<allSchemaTypes.length; ++i){
      $("#schema-"+type).append("<option id="+allSchemaTypes[i]+">"+allSchemaTypes[i]+"</option>");
    }

    //remove the properties from the
    $("#"+type+"_property-select").empty();
    $("#"+type+"_property-select").append("<option selected>Add Property</option>");

    console.log("ALL: ", allProperties)

    for(var i=0; i<allProperties.length; ++i){
      // $("#property-"+type).append("<option id="+allProperties[i]+">"+allProperties[i]+"</option>");
      $("#"+type+"_property-select").append("<option value="+allProperties[i]+">"+allProperties[i]+"</option>");
      // $("#property-res-select").append("<option id="+allProperties[i]+">"+allProperties[i]+"</option>");
    }

    for(var i=0; i<allMethods.length; ++i){
      $("#"+type+"_method-select").append("<option value="+allMethods[i]+">"+allMethods[i]+"</option>");
      $("#method-select").append("<option value="+allMethods[i]+">"+allMethods[i]+"</option>");
    }

    jQuery('.selectpicker').selectpicker('refresh');

  }, 3000);

}


function saveWoOSchema(){
  //site
  //typeList
  //temp[type].properies
  //ob = '{"VideoObject": {"apiEndpoint": "YouTube API", "fields":[{"field": "title", "property": "name"}, {"field": "description", "property": "description"}], "parameters":[{"param":"q", "input":"keywords"}] }}'
  //var temp={ "objects":{}, "functions":{} };
  temp.objects= tempObj;
  console.log("temp.objects: ", Object.keys(temp.objects))
  console.log("final temp: ", temp)

  //$("#getters").empty();
  //get the getters list
  //for(var i=0; i<gettersList.length; ++i){
    //all objects
    //all properties of type object
    //$("#getters").append("<option value="+gettersList[i]+">"+gettersList[i]+"</option>");
  //}

  console.log("gettersList: ", gettersList)

  var as = document.getElementsByTagName("A")
  var objs= gettersList;//Object.keys(temp.objects);
  
  for (let j in objs) {
    for(let a in as){
      if(as[a].id == objs[j]){
        // console.log("PLEAE: ",as[a])
        as[a].style.border = "3px solid #f90a69";
      }
    }
  }

  for(let m in methodsImp){
    for(let a in as){
      if(as[a].innerHTML == methodsImp[m]){
        // console.log("PLEAE: ",as[a])
        as[a].style.border = "3px solid #f90a69";
      }
    }
  }

  $("#impText").show();
  
  //Populate available objects 
  $("#method-result-type").empty();
  $("#method-result-type").append("<option selected>The type of the result</option>");

  var definedObj = Object.keys(temp.objects);
  for(var i=0; i<definedObj.length; ++i){
    $("#method-result-type").append("<option id="+definedObj[i]+">"+definedObj[i]+"</option>"); 
  }


  jQuery('.selectpicker').selectpicker('refresh');

  //show the setters options

  //show the methods list

  // { Person: { properties:[ {property: p},{}, {} ] }  }

  // tempObj={}
  // tempObj[currentType]={"properties":[], "construct":{}, "methods":[]}

  // Create a new post reference with an auto-generated id
  // var siteRef = firebase.database().ref('/abstractions/'+site);
  // var newSiteRef = siteRef.push();
  // newSiteRef.set({
  //   "objects":{}, 
  //   "functions":{}
  // });

  // console.log("typeList: ", typeList)
  // console.log("temp: ", temp)
}

function typeHasBeenChosen2(select){
  console.log("arrFields: ", arrFields) //call parHasBeenChosen()

  allProperties=[]
  properties=[]
  allSchemaTypes=[]
  
  var type = select.id
  var child = type
  var parent = select//.getAttribute("id").split('-')[1]
  console.log("Parent: ", parent)
  console.log("Child: ", child)

  currentType = child

  firebase.database().ref('/schema/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) { 
      allSchemaTypes.push(childSnapshot.val().title.split(' ').join(''))
      if(childSnapshot.val().title.split(' ').join('') == type){
        getAllOfProperties(type);
        getAllMethods(type);
      }
    });
  });

  if(!firstType){
    firstType=true;

    $("#schema-"+type).empty()
    var row = '<tr data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td"><a href="javascript:;" id="'+type+'" class="btn btn-warning" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onClick="getButtonID(this.id)">'+type+'</a></td><td id="type-td"><code class="">type</code></td></tr>';

  }else{
    $("#schema-"+type).empty()
    var row = '<tr data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td"><a href="javascript:;" id="'+type+'" class="btn btn-warning" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onClick="getButtonID(this.id)">'+type+'</a></td><td id="type-td"><code class="">type</code></td></tr>';
  }

  var table = document.createElement('table');
  table.setAttribute('id', type);
  table.setAttribute('class', 'table table-borderless');
  var tbody= document.createElement('tbody');
  table.append(tbody)

  $("#tableDiv").append(table)

  $("#"+type+" tbody").append('<tr data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td"><a href="javascript:;" id="'+type+'" class="btn btn-warning" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onClick="getButtonID(this.id)">'+type+'</a></td><td id="type-td"><code class="">type</code></td></tr>')

  var typeProperties =  arrFields[type].properties;
  console.log("typeProperties: ", typeProperties) 

  for(p in typeProperties){
    console.log("properties: ", typeProperties[p].property) 
    propertyHasBeenChosen2(typeProperties[p].property)
  }


  jQuery('.selectpicker').selectpicker('refresh');

  setTimeout(() => {
    $(".selectpicker").selectpicker();

    for(var i=0; i<allSchemaTypes.length; ++i){
      $("#schema-"+type).append("<option id="+allSchemaTypes[i]+">"+allSchemaTypes[i]+"</option>");
    }

    //remove the properties from the
    $("#property-select").empty();

    // console.log("ALL: ", allProperties)

    for(var i=0; i<allProperties.length; ++i){
      // $("#property-"+type).append("<option id="+allProperties[i]+">"+allProperties[i]+"</option>");
      $("#property-select").append("<option value="+allProperties[i]+">"+allProperties[i]+"</option>");
      // $("#property-res-select").append("<option id="+allProperties[i]+">"+allProperties[i]+"</option>");
    }

    // for(var i=0; i<allMethods.length; ++i){
    //   $("#method-select").append("<option value="+allMethods[i]+">"+allMethods[i]+"</option>");
    // }

    jQuery('.selectpicker').selectpicker('refresh');

  }, 1000);

}

function propertyHasBeenChosen2(select){
  $("#schema-"+type).empty()
  $("#property-"+type).empty()
  // console.log("select: ",select.getAttribute("id"))
  var property = select//.options[select.selectedIndex].getAttribute("value");
  // if(select.options[select.selectedIndex].getAttribute("id")=="new"){
  //   isNew=true;
  // }
  var typeP, descP;

  propertyList.push(property)

  var child = property
  var parent = ""//select.getAttribute("id").split('-')[1]

  // var row = '<tr data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td"><img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" class="btn btn-default disabled" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;;">'+property+'</a></td><td id="type-td"><code class="">'+typeP+'</code></td><td>'+descP+'</td></tr>';

  // if(isNew){
  //   $("#"+currentType+" tbody").append('<tr id="'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" class="btn btn-default" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;;" id="nav-toggle"  onclick="newProperty(this)">'+property+'</a></td></tr>')
  // }else{
    for(var i=0; i<propertiesInfo.length; ++i){
    if(propertiesInfo[i]['name'] == property){
      typeP = propertiesInfo[i]['type']
      descP = propertiesInfo[i]['description']
    }
  }
    $("#"+currentType+" tbody").append('<tr id="'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" class="btn btn-default disabled" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;">'+property+'</a></td><td id="type-td"><code class="">'+typeP+'</code></td><td>'+descP+'</td></tr>')
  // }

  // var node = $("#types-table").treetable("node", parent);
  // $("#types-table").treetable("loadBranch", node , row);

  // var node = $("#"+currentType).treetable("node", parent);
  // $("#"+currentType).treetable("loadBranch", node , row);
}

var currentSite=""


function websiteHasBeenChosen(select){
  var type = select.options[select.selectedIndex].getAttribute("id");

}


function mapAPIObjectToSchemaObject(){
//create new paht for this (e.g. abstractions)
  //current site
  // ...current type
  //    ...fields:[{field:"", property:""},{...},...]

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

  if(!firstType){
    firstType=true;
    // document.getElementById("firstType").remove();
    $("#schema-"+type).empty()
    // $("#types-table tbody").empty()
    // var row = '<tr data-tt-id="'+child+'" data-tt-branch="true"><td id="butt-td"><a href="javascript:;" class="btn btn-warning disabled" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;;">'+type+'</a></td><td id="type-td"><code class="">type</code></td><td><div class="row"><div class="col-xs-3"><select id="schema-'+type+'" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-white" style="overflow:scroll;" onchange="typeHasBeenChosen(this)"><option selected>Add a Type</option></select></div><div class="col-xs-3"><select id="property-'+type+'" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-white" style="overflow:scroll; max-height: 20px;" onchange="propertyHasBeenChosen(this)"><option selected>Add a Property</option></select></div></div></td></tr>';
    var row = '<tr data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td"><a href="javascript:;" id="'+type+'" class="btn btn-warning" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onClick="getButtonID(this.id)">'+type+'</a></td><td id="type-td"><code class="">type</code></td></tr>';
  }else{
    $("#schema-"+type).empty()
    // var row = '<tr data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td"><img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" class="btn btn-warning disabled" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;">'+type+'</a></td><td id="type-td"><code class="">type</code></td><td><div class="row"><div class="col-xs-3"><select id="schema-'+type+'" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-white" style="overflow:scroll;" onchange="typeHasBeenChosen(this)"><option selected>Add a Type</option></select></div><div class="col-xs-3"><select id="property-'+type+'" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-white" style="overflow:scroll; max-height: 20px;" onchange="propertyHasBeenChosen(this)"><option selected>Add a Property</option></select></div></div></td></tr>';
    var row = '<tr data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td"><a href="javascript:;" id="'+type+'" class="btn btn-warning" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onClick="getButtonID(this.id)">'+type+'</a></td><td id="type-td"><code class="">type</code></td></tr>';
  }

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


var currentType="", propertyList=[], isNew=false, elem="property", isNewM=false, typePropertyType={};

function propertyHasBeenChosen(select){
  $("#schema-"+type).empty()
  $("#property-"+type).empty()

  // $('select[name=selValue]').val(1);
  // $('.selectpicker').selectpicker('refresh')

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
        $('<tr id="'+thisType+'_'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" class="btn btn-default" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" id="'+thisType+'.'+child+'"  onclick="openNav(this)">'+property+'</a></td></tr>').insertBefore(trs[t]);
        break;
      }
    }
  }else{
    for(var i=0; i<propertiesInfo.length; ++i){
      if(propertiesInfo[i]['name'] == property){
        typeP = propertiesInfo[i]['type']
        descP = propertiesInfo[i]['description']
      }
    }

    for(let t in trs){
      if(trs[t].id == thisType){
        $('<tr id="'+thisType+'_'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a href="javascript:;" class="btn btn-default" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" id="'+thisType+'.'+child+'"  onclick="openNav(this)">'+property+'</a></td><td id="type-td"><code id="code-type" class="">'+typeP+'</code></td><td>'+descP+'</td></tr>').insertBefore(trs[t]);
        break;
      }
    }
  }

  console.log("tempObj properties: ", tempObj[thisType].properties);
  propList= tempObj[thisType].properties; //NEED TO BE FIXED 

  typePropertyType[thisType].push({
    name:property,
    type: typeP
  });

  console.log("typePropertyType: ", typePropertyType);

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

  var row = document.getElementById(type_name);
  row.cells.namedItem("type-td").innerHTML= '<code id="code-type" class="">['+currentObjType+']</code>'
  
}

var methodsImp=[]
function methodHasBeenChosen(select){
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
    $("#site-table tbody").append('<tr id="'+child+'" data-tt-id="method-site" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a id="method-siteM" class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px; color:white;" id="'+thisType+'.'+method+'" onclick="newMethed(this)">'+method+'</a></td><td id="type-td"><code class="">method</code></td><td></td></tr>')
  }else{
    if(isNewM){
      if(thisType==""){
        // tempAct[method]= {"query":"", "result":"", "name":""};
        tempAct[method]= {"endpoint":"", "object":"", "name":"", "type":method};
        temp.functions.push(tempAct[method]);
        $("#site-table tbody").append('<tr id="'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px; color:white;" id="'+thisType+'.'+method+'" onclick="newMethed(this)">'+method+'</a></td><td id="type-td"><code class="">method</code></td><td></td></tr>')
      }else{
        // tempObjAct[method]= {"query":"", "result":"", "name":""};
        tempObjAct[method]= {"endpoint":"", "object":"", "name":"", "type":method};
        tempObj[thisType].methods.push(tempObjAct[method]);
        
        console.log("tempObj[thisType]: ", tempObj[thisType])

          for(let t in trs){
            if(trs[t].id == thisType){
              $('<tr id="'+thisType+'_'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px; color:white;" id="'+thisType+'.'+method+'" onclick="newMethed(this)">'+method+'</a></td><td id="type-td"><code class="">method</code></td></tr>').insertBefore(trs[t]);
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

// endpoint: 
// "Seatgeek Venue Search"
// name: 
// "searchVenues"
// object: 
// "EventVenue"
// params
// 0: 
// "Search"
// type: 
// "SearchAction"


          temp.functions.push(tempAct[method]);
          
          $("#site-table tbody").append('<tr id="'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a id="methodSite.'+method+'" value="testVal" href="javascript:;" class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onclick="openNavMethod(this)">'+method+'</a></td><td id="type-td"><code class="">method</code></td><td>'+descP+'</td><td></td></tr>')
        }else{
          // tempObjAct[method]= {"query":"", "result":"", "name":""};
          tempObjAct[method]= {"endpoint":"", "object":"", "name":"", "type":method};
          // tempObj[thisType].methods = tempObjAct;
          tempObj[thisType].methods.push(tempObjAct[method]);
        
        console.log("tempObj[thisType]: ", tempObj[thisType])

          for(let t in trs){
            if(trs[t].id == thisType){
              $('<tr id="'+thisType+'_'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px; color:white;" id="'+thisType+'.'+method+'" onclick="openNavMethod(this)">'+method+'</a></td><td id="type-td"><code class="">method</code></td></tr>').insertBefore(trs[t]);
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
}


function siteMethodHasBeenChosen(select){
  //add it to an array of methods to be implemented 
  $("#schema-"+type).empty()
  $("#property-"+type).empty()

  $("#type-list").show();

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

  $("#site-table tbody").append('<tr id="'+child+'" data-tt-id="'+child+'" data-tt-parent-id="'+parent+'" data-tt-branch="true"><td id="butt-td">&nbsp;&nbsp;<img src="assets/img/new/arrow.png" width="15px"/><a id="methodSite.'+method+'" value="testVal" href="javascript:;" class="btn btn-purple" style="width:150px; height: 30px;text-align:center; padding: 4px 1px;" onclick="openNavMethod(this)">'+method+'</a></td><td id="type-td"><code class="">method</code></td><td></td><td></td></tr>')

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


function addRow() {
  $("#requestTabel tbody").append('<tr><td><input class="form-control" type="text" id="name" style="width:85px" onchange="urlBlur()" placeholder=""></td><td><input class="form-control" type="text" id="value" style="width:85px" onchange="urlBlur()" placeholder=""></td><td><textarea class="form-control" type="text" id="listOfValues" placeholder=""rows="1" onchange="urlBlurNoCall()"></textarea></td><td><div><input id="displayedName" class="form-control" type="text" onchange="urlBlurNoCall()"></div></td><td><textarea class="form-control" type="text" id="desc" rows="1" onchange="urlBlurNoCall()"></textarea></td><td><select class="form-control" id="type" style="height:30px" onchange="urlBlurNoCall()"><option value="string">String</option><option value="int">Integer</option><option value="date">Date</option><option value="date-time">DateTime</option></select></td><td><input id="required"  value="" class="checkbox-style" name="" type="checkbox"  onchange="urlBlurNoCall()" autocomplete="off" checked/></td><td><input id="displayed"  value="" class="checkbox-style" name="" type="checkbox"  onchange="urlBlurNoCall()" autocomplete="off" checked/></td><td><input type="image" src="images/del.png" style="width:18px"onclick="deleteRow(this)"</td></tr>');
  // urlBlurNoCall();
}


function clearTable(){

  $('#requestTabel tbody').empty();

  // if(optionalParam.length>0){
  //   for(var i=0; i < optionalParam.length; ++i){
  //     $("#optionalP").append('<button id="'+optionalParam[i].name+'" class="button button-mini button-circle button-border button-teal" data-tooltip="'+optionalParam[i].descrip+'" style="text-transform:none; padding: 0 6px; " onclick="addReqRow(this)">'+optionalParam[i].name+'</button>');
  //   }
  // }

  $("#requestTabel tbody").append('<tr id="firstTR"><td><input class="form-control" type="text" id="name"  style="width:85px" onchange="urlBlur()" placeholder="Request parameter"></td><td><input class="form-control" type="text" id="value"  style="width:85px" onchange="urlBlur()" placeholder="Parameter default value"></td><td><textarea class="form-control" type="text" id="listOfValues" placeholder="Value1, Value2, ..."rows="1" onchange="urlBlurNoCall()"></textarea></td><td><input id="displayedName" class="form-control" type="text" placeholder="" onchange="urlBlurNoCall()"></td><td><textarea class="form-control" type="text" id="desc" placeholder="" rows="1" onchange="urlBlurNoCall()"></textarea></td><td><select class="form-control" id="type" style="height:30px" onchange="urlBlurNoCall()"><option value="string">String</option><option value="int">Integer</option><option value="date-time">Boolean</option><option value="date">Date</option><option value="date-time">DateTime</option></select></td><td><input id="required"  value="" class="checkbox-style" name="" type="checkbox"  onchange="urlBlurNoCall()" autocomplete="off" checked/></td><td><input id="displayed"  value="" class="checkbox-style" name="" type="checkbox"  onchange="urlBlurNoCall()" autocomplete="off" checked/></td><td><input type="image" src="images/del.png" style="width:18px"onclick="deleteRow(this)"/></td></tr>');

  // urlBlurNoCall();
}



function deleteRow(row) {

  var i = row.parentNode.parentNode.rowIndex;
  document.getElementById('requestTabel').deleteRow(i);

  var paramName = row.parentNode.parentNode.childNodes[0].childNodes[0].value;
  //console.log("paramName: ", paramName);


  // if($('#optionalP').is(':empty')) {
  //   console.log("optional parameters DO NO exit");
  //   //do nothing
  // }else{
  //   if(optionalParam.length > 0){
  //     for(var i=0; i < optionalParam.length; ++i){
  //       if(paramName == optionalParam[i].name){
  //         //add it back to list of oprional parameters
  //         $("#optionalP").append('<button id="'+optionalParam[i].name+'" class="button button-mini button-circle button-border button-teal" data-tooltip="'+optionalParam[i].descrip+'" style="text-transform:none; padding: 0 6px; " onclick="addReqRow(this)">'+optionalParam[i].name+'</button>');
  //       }
  //     }
  //   }else if(duplicates.length > 0){
  //     for(var j=0; j < duplicates.length; ++j){
  //       if(paramName == duplicates[j]){
  //         //add it back to list of oprional parameters
  //         $("#optionalP").append('<button id="'+duplicates[j]+'" class="button button-mini button-circle button-border button-teal" data-tooltip="" style="text-transform:none; padding: 0 6px; " onclick="addReqRow(this)">'+duplicates[j]+'</button>');
  //       }
  //     }
  //   }
  // }

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

