jQuery("#credits").on("click", function() {
  var message = "Game created by Jay Sardesai";
  jQuery("#credits").append(
    "<p>" + message + "</p>"
  );
});
jQuery("#creditsbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<div>" + "This game was created by Jay Sardesai" + "</div>"
 );
});
