var page = 0;

function getmusicEvents(page) {

  $('.music-panel,.sport-panel,.container.head-pad.banner').show();
  $('#attraction-panel').hide();

  if (page < 0) {
    page = 0;
    return;
  }
  if (page > 0) {
    if (page > getmusicEvents.json.page.totalPages-1) {
      page=0;
      return;
    }
  }
  
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=ffAGGpR07MXTUwMB3ZcwknFfqo6GeYWW&source=ticketmaster&classificationName=music&marketId=202&size=4&page="+page,
    async:true,
    dataType: "json",
    success: function(json) {
          getmusicEvents.json = json;
  			  showmusicEvents(json);
  		   },
    error: function(xhr, status, err) {
  			  console.log(err);
  		   }
  });
}

function showmusicEvents(json) {
  var items = $('#events .list-group-item');
  items.hide();
  var events = json._embedded.events;
  var item = items.first();
  for (var i=0;i<events.length;i++) {
    item.children('.list-group-item-heading').text(events[i].name);
    item.children('.list-group-item-text').text(events[i].dates.start.localDate);
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

getmusicEvents(page);

var page = 0;

function getsportEvents(page) {

  $('#events-panel').show();
  $('#attraction-panel').hide();

  if (page < 0) {
    page = 0;
    return;
  }
  if (page > 0) {
    if (page > getsportEvents.json.page.totalPages-1) {
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
          getsportEvents.json = json;
  			  showsportEvents(json);
  		   },
    error: function(xhr, status, err) {
  			  console.log(err);
  		   }
  });
}

function showsportEvents(json) {
  var items = $('#sport-events .list-group-item');
  items.hide();
  var events = json._embedded.events;
  var item = items.first();
  for (var i=0;i<events.length;i++) {
    item.children('.list-group-item-heading').text(events[i].name);
    item.children('.list-group-item-text').text(events[i].dates.start.localDate);
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

getsportEvents(page);


$('#prev.music').click(function() {
  getmusicEvents(--page);
});

$('#next.music').click(function() {
  getmusicEvents(++page);
});

$('#prev.sport').click(function() {
  getsportEvents(--page);
});

$('#next.sport').click(function() {
  getsportEvents(++page);
});


function getAttraction(id) {
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/attractions/"+id+".json?apikey=ffAGGpR07MXTUwMB3ZcwknFfqo6GeYWW&source=ticketmaster&classificationName=music&marketId=202",
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
  $('.music-panel,.sport-panel,.container.head-pad.banner').hide();
  $('#attraction-panel').show();
  
  $('#attraction-panel').click(function() {
    getmusicEvents(page);
    getsportEvents(page);
  });
  
  $('#attraction .list-group-item-heading').first().text(json.name);
  $('#attraction img').first().attr('src',json.images[0].url);
  $('#classification').text(json.classifications[0].segment.name + " - " + json.classifications[0].genre.name + " - " + json.classifications[0].subGenre.name);
}
