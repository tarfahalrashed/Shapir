CORS_PROXY = "http://127.0.0.1:3001/"

#DEVELOPMENT
window.availableTags = []
window.taglist = ->
  arr = []
  availableTags.forEach (item)->
    arr.push [item.label, item.desc, item.value]
  return arr

window.queries = {}
window.lastQuery = ""
window.lastQueried = ""
window.lang = ""

$ ->
  $("#tags").autocomplete(
    source: availableTags
    # focus: (event, ui) ->
    #   $("#item").val ui.item.label
    #   false
    select: (event, ui) ->
      # console.log ui.item
      # console.log ui.item.label
      $("#item").val ui.item.label
      $("#item-id").val ui.item.id
      $("#item-description").html ui.item.desc
      $("#item-icon").attr "src", "images/" + ui.item.icon
      false
  ).data("ui-autocomplete")._renderItem = (ul, item) ->
    $("<li>").append("<a>" + item.label + "<br>" + item.desc + "</a>").appendTo ul

  $('#tags').on 'keyup', ->
    window.lastQuery = $('#tags').val()
    unless window.lastQuery.length < 2 or queries[window.lastQuery]? or /^Q[0-9]*$/.test(window.lastQuery) or window.timeout != null
      lang = $('#language').val()
      getJSONWikidataSearchResults window.lastQuery, lang
      queries[window.lastQuery] = {}
      timeoutSetter()
      window.lastQueried = window.lastQuery

window.timeout = null
timeoutSetter = ->
  window.timeout = "not null"
  f = ->
    console.log new Date()
    window.timeout = null
    if window.lastQueried != window.lastQuery
      window.lastQueried = window.lastQuery
      console.log "QUERY SAVER!"
      console.log window.lastQuery
      getJSONWikidataSearchResults window.lastQuery, lang
      timeoutSetter()
    # console.log "NULLED!"
    # console.log window.lastQueried
    # console.log window.lastQuery
    # console.log window.lastQueried != window.lastQuery
  setTimeout(f, 500)

wikidataSearch = (query, language = "en", format="json")->
    return "https://www.wikidata.org/w/api.php?action=wbsearchentities&language=#{language}&format=#{format}&search=#{query}"

getJSONWikidataSearchResults = (query, language)->
  $.getJSON CORS_PROXY + wikidataSearch(query, language, "json") , (data)->
    if data.search?
      data.search.forEach (result)->
        if result.label?
          formatedResult =
            value: result.id
            label: result.label
            desc: result.description
            # icon: ""
          availableTags.push(formatedResult)
          queries[query][result.id] = result
