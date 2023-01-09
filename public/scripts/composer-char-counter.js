$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    const maxChar = 140;
    const inputChar = $(this).val().length;
    const charCounter = maxChar - inputChar;
    console.log(charCounter)

    const $counterElement = $(this).parent().find(".counter");

    $counterElement.text(charCounter);

    if (charCounter < 0 || charCounter > 140) {
      console.log("ABC")
      // $counterElement.addClass("invalid");
      $counterElement.css("color","red")
    } else {
      $counterElement.css("color","black")
    }
  });
});
