$(document).ready(function() {
  $(document).one("scroll", function() {
    var toReadCount = $(".to-read-book").length;
    $("#to-read-count").append(toReadCount);
  });
  $(document).one("scroll", function() {
    var finishedCount = $(".finished-book").length;
    $("#finished-count").append(finishedCount);
  });
});
