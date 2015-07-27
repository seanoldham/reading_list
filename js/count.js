$(document).ready(function() {
  $(document).one("scroll", function() {
    var toReadCount = $(".to-read-book").length;
    var finishedCount = $(".finished-book").length;
    $("#to-read-count").append(toReadCount);
    $("#finished-count").append(finishedCount);
  });
});
