jQuery(document).ready(function ($) {
  let req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      creadteCards(JSON.parse(req.responseText).record);
    }
  };
  req.open("GET", "https://api.jsonbin.io/v3/b/64f3790ce4033326cbd165e4", true);
  req.setRequestHeader(
    "X-Master-Key",
    "$2b$10$turoi0XKVJGUnDJ1p7iNseBQyMvIBmCajwIQNQf7wXXx9hmun/P4q"
  );
  req.send();

  // filters change

  $(
    "#event-length-min, #event-length-max, #location, #event-seat-cost-min, #event-seat-cost-max, #search, #event-size-min-slider, #event-size-max-slider"
  ).change(function () {
    var locationFilter = $("#location").children(":selected").attr("value");
    var searchText = $("#search").val();
    console.log("location", locationFilter);
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        let jsonData = JSON.parse(req.responseText).record;
        let filterData = jsonData.filter(
          (element) =>
            element.location == locationFilter &&
            element.name.includes(searchText)
        );
        creadteCards(filterData);
      }
    };
    req.open(
      "GET",
      "https://api.jsonbin.io/v3/b/64f3790ce4033326cbd165e4",
      true
    );
    req.setRequestHeader(
      "X-Master-Key",
      "$2b$10$turoi0XKVJGUnDJ1p7iNseBQyMvIBmCajwIQNQf7wXXx9hmun/P4q"
    );
    req.send();
  });
});

function creadteCards(data) {
  var html = "";
  $.each(data, function (key, value) {
    html += '<div class="event-card">';
    html += '<div class="card-image">';
    html += '<img src="' + value.image + '"/>';
    html += '<span class="host-name flex-row">';
    html += '<i class="fa-solid fa-user"></i>';
    html += "<p>" + value.host + " &#183; " + value.length + "</p>";
    html += '</span></div><div class="card-description">';
    html += '<h3 id="card-name">' + value.name + "</h3>";
    html += "<p>" + value.date + " &#183; " + value.location + "</p>";
    html += "</div></div>";
  });
  $("#cards-container").html(html);
}
