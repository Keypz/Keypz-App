var page = 0;

function getnearEvents(page) {

  $('#events-panel').show();
  $('#attraction-panel').hide();

  if (page < 0) {
    page = 0;
    return;
  }
  if (page > 0) {
    if (page > getnearEvents.json.page.totalPages-1) {
      page=0;
      return;
    }
  }
  
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=ffAGGpR07MXTUwMB3ZcwknFfqo6GeYWW&source=ticketmaster&classificationName=sport&marketId=202&size=4&page="+page,
    async:true,
    dataType: "json",
    success: function(json) {
          getnearEvents.json = json;
  			  shownearEvents(json);
  		   },
    error: function(xhr, status, err) {
  			  console.log(err);
  		   }
  });
}

function shownearEvents(json) {
  var items = $('#near-events .list-group-item');
  items.hide();
  var events = json._embedded.events;
  var item = items.first();
  for (var i=0;i<events.length;i++) {
    item.children('.list-group-item-heading').text(events[i].name);
    item.children('.list-group-item-text').text(events[i].dates.start.localDate);
    item.children('.list-group-item img').text(events[i].images[0].url);
    try {
      item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
    } catch (err) {
      console.log(err);
    }
    item.show();
    item.off("click");
    item.click(events[i], function(eventObject) {
      console.log(eventObject.data);
      try {
        getAttraction(eventObject.data._embedded.attractions[0].id);
      } catch (err) {
      console.log(err);
      }
    });
    item=item.next();
  }
}

getnearEvents(page);


$('#prev.near').click(function() {
  getnearEvents(--page);
});

$('#next.near').click(function() {
  getnearEvents(++page);
});


function getAttraction(id) {
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/attractions/"+id+".json?apikey=ffAGGpR07MXTUwMB3ZcwknFfqo6GeYWW&source=ticketmaster&classificationName=sport&marketId=202",
    async:true,
    dataType: "json",
    success: function(json) {
          showAttraction(json);
  		   },
    error: function(xhr, status, err) {
  			  console.log(err);
  		   }
  });
}

function showAttraction(json) {
  $('#events-panel').hide();
  $('#attraction-panel').show();
  
  $('#attraction-panel').click(function() {
    getnearEvents(page);
  });
  
  $('#attraction .list-group-item-heading').first().text(json.name);
  $('#attraction img').first().attr('src',json.images[0].url);
  $('#classification').text(json.classifications[0].segment.name + " - " + json.classifications[0].genre.name + " - " + json.classifications[0].subGenre.name);
}



function getMusicGenres(page) {
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/classifications/KZFzniwnSyZfZ7v7nJ?apikey=ffAGGpR07MXTUwMB3ZcwknFfqo6GeYWW",
    async:true,
    dataType: "json",
    success: function(json) {
          showMusicGenres(json);
  		   },
    error: function(xhr, status, err) {
  			  console.log(err);
  		   }
  });
}

function showMusicGenres(json) {
  $('li.genre').text(json.classifications[0].genre.name);
}

