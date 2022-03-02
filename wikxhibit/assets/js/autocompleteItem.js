// I used the Wikidata autocomplete from https://github.com/ouisharelabs/wikidata-autocomplete

function initAutoItem() {

  var CORS_PROXY, getJSONWikidataSearchResults, timeoutSetter, wikidataSearch;

  CORS_PROXY = "";
  window.availableTags = [];
  window.taglist = function () {
    var arr;
    arr = [];
    availableTags.forEach(function (item) {
      return arr.push([item.label, item.desc, item.value]);
    });
    return arr;
  };

  window.queries = {};
  window.lastQuery = "";
  window.lastQueried = "";
  window.lang = "";

  $(function () {

    $('.value').on("focus", function () {
      $(this).autocomplete({
        source: availableTags,
        select: function (event, ui) {
          $("#item").val(ui.item.label);
          $("#item-id").val(ui.item.id);
          $("#item-description").html(ui.item.desc);
          // $("#item-icon").attr("src", "images/" + ui.item.icon);
          return false;
        }
      }).data("ui-autocomplete")._renderItem = function (ul, item) {
        // console.log("item: ", item.label);
        return $("<li>").append("<a id='" + item.label + "' href='javascript:;' onclick='itemSelected(this)'>" + item.label + "<br>" + item.desc + "</a>").appendTo(ul);
      };
      return $('.value').on('keyup', function () {
        var lang;
        window.lastQuery = $(this).val();
        if (!(window.lastQuery.length < 2 || (queries[window.lastQuery] != null) || /^Q[0-9]*$/.test(window.lastQuery) || window.timeout !== null)) {
          lang = "en";//$('#language').val();
          getJSONWikidataSearchResults(window.lastQuery, lang);
          queries[window.lastQuery] = {};
          timeoutSetter();
          return window.lastQueried = window.lastQuery;
        }
      });
    });
  });
  window.timeout = null;

  timeoutSetter = function () {
    var f;
    window.timeout = "not null";
    f = function () {
      // console.log(new Date());
      window.timeout = null;
      if (window.lastQueried !== window.lastQuery) {
        window.lastQueried = window.lastQuery;
        getJSONWikidataSearchResults(window.lastQuery, lang);
        return timeoutSetter();
      }
    };
    return setTimeout(f, 500);
  };

  wikidataSearch = function (query, language, format) {
    if (language == null) {
      language = "en";
    }
    if (format == null) {
      format = "json";
    }
    return "https://www.wikidata.org/w/api.php?action=wbsearchentities&type=item&language=" + language + "&format=" + format + "&search=" + query;
  };

  getJSONWikidataSearchResults = function (query, language) {

    return $.getJSON(CORS_PROXY + wikidataSearch(query, "en", "json"), function (data) {
      if (data.search != null) {
        return data.search.forEach(function (result) {
          var formatedResult;
          if (result.label != null) {
            formatedResult = {
              value: result.id,
              label: result.label,
              desc: result.description
            };

            availableTags.push(formatedResult);
            // queries[query][result.id] = result;
            return result;
          }
        });
      }
    });
  };

}


function itemSelected(e) {
  // document.getElementById('itemTags').value = e.id;
  document.activeElement.value = e.id;
}