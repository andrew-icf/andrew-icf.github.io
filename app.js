$(document).ready(function(){
  var deckId;
  $.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6" ,function(data){
    console.log(data);
    deckId = data.deck_id;
    console.log(deckId);
  });

  //                    GET PLAYER CARDS
  var dealerCards;
  var playerCards;
  $(".deal").click(function(event){
    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=2", function(data){
      console.log(data);
      var card1 = data.cards[0].image;
      var card2 = data.cards[1].image;
      var playerCard1 = data.cards[0].value;
      var playerCard2 = data.cards[1].value;

      if (playerCard1 === "KING") {
        playerCard1 = 10;
      } else if (playerCard1 === "QUEEN") {
         playerCard1 = 10;
      } else if (playerCard1 === "JACK") {
        playerCard1 = 10;
      }
      if (playerCard2 === "KING") {
        playerCard2 = 10;
      } else if (playerCard2 === "QUEEN") {
         playerCard2 = 10;
      } else if (playerCard2 === "JACK") {
        playerCard2 = 10;
      }
      if (playerCard1 === "ACE") {
        playerCard1 = 11;
      }
      if (playerCard2 === "ACE") {
        playerCard2 = 11;
      }
      playerCards = parseInt(playerCard1) + parseInt(playerCard2);
      $(".playerTotal").html("<p>" + playerCards + "</p>");
      $(".cardArea1").html("<img src=" + card1 + " width=130>" );
      $(".cardArea2").html("<img src=" + card2 + " width=130>" );
      if (playerCards === 21) {
        $(".alert").html("<h1>WINNER WINNER CHICKEN DINNER!!!</h1>")
        .css("background-color", "#02410E").css("text-align", "center")
        .css("color", "white").css("font-size", "2rem");
        setTimeout(function () {
        $(".cardArea1").empty();
        $(".cardArea2").empty();
        $(".dealerArea1").empty();
        $(".dealerArea2").empty();
        $(".playerTotal").empty();
        $(".dealerTotal").empty();
        $(".alert").empty()}, 2000);
      }
    });

    //                    GET DEALER CARDS

    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=2", function(data){
      var dealerCard1 = data.cards[0].image;
      var dealerCard2 = data.cards[1].image;
      var dealerNum1 = data.cards[0].value;
      var dealerNum2 = data.cards[1].value;

      if (dealerNum1 === "KING") {
        dealerNum1 = 10;
      } else if (dealerNum1 === "QUEEN") {
         dealerNum1 = 10;
      } else if (dealerNum1 === "JACK") {
        dealerNum1 = 10;
      }
      if (dealerNum2 === "KING") {
        dealerNum2 = 10;
      } else if (dealerNum2 === "QUEEN") {
         dealerNum2 = 10;
      } else if (dealerNum2 === "JACK") {
        dealerNum2 = 10;
      }
      if (dealerNum1 === "ACE") {
        dealerNum1 = 11;
      }
      if (dealerNum2 === "ACE") {
        dealerNum2 = 11;
      }
      dealerCards = parseInt(dealerNum1) + parseInt(dealerNum2);
      $(".dealerTotal").html("<p>" + dealerCards + "</p>");
      $(".dealerArea1").html("<img src=" + dealerCard1 + " width=130>" );
      $(".dealerArea2").html("<img src=" + dealerCard2 + " width=130>" );
      if (dealerCards === 21) {
        $(".alert").html("<h1>DEALER GOT 21... AWWW SAD PANDA!!!</h1>")
        .css("background-color", "#02410E").css("text-align", "center")
        .css("color", "white").css("font-size", "2rem");
        setTimeout(function () {
        $(".dealerArea1").empty();
        $(".dealerArea2").empty();
        $(".playerTotal").empty();
        $(".dealerTotal").empty();
        $(".alert").empty()}, 2000);
      }
    });
  });

  //                    GET PLAYER HIT CARDS

var cards = 0;
var hitCard1;
var hitCard2;
var hitCard3;
var hitVal1;
var hitVal2;
var hitVal3;
  $(".hit").on("click", function(){
    if(cards === 0){
  $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
    hitCard1 = data.cards[0].image;
    hitVal1 = data.cards[0].value;
    if (hitVal1 === "KING") {
      hitVal1 = 10;
    } else if (hitVal1 === "QUEEN") {
       hitVal1 = 10;
    } else if (hitVal1 === "JACK") {
      hitVal1 = 10;
    }
    if (hitVal1 === "ACE") {
      hitVal1 = 11;
    }
    $(".cardArea3").html("<img src=" + hitCard1 + " width=130>" );
    cards += 1;
    var pcard1 = playerCards + parseInt(hitVal1);
    $(".playerTotal").html("<p>" + pcard1 + "</p>");
    if (pcard1 === 21) {
      $(".alert").html("<h1>BLACKJACK!!!</h1>")
      .css("background-color", "#02410E").css("text-align", "center")
      .css("color", "white").css("font-size", "2rem");
      setTimeout(function () {
      $(".cardArea1").empty();
      $(".cardArea2").empty();
      $(".cardArea3").empty();
      $(".dealerArea1").empty();
      $(".dealerArea2").empty();
      $(".playerTotal").empty();
      $(".dealerTotal").empty();
      $(".alert").empty()}, 2000);
    }else if (pcard1 > 21) {
      $(".alert").html("<h1>BUSTED!!!</h1>")
      .css("background-color", "#02410E").css("text-align", "center")
      .css("color", "white").css("font-size", "2rem");
      setTimeout(function () {
      $(".cardArea1").empty();
      $(".cardArea2").empty();
      $(".cardArea3").empty();
      $(".dealerArea1").empty();
      $(".dealerArea2").empty();
      $(".playerTotal").empty();
      $(".dealerTotal").empty();
      $(".alert").empty()}, 2000);
    }
    });
  }else if (cards === 1) {
    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
      hitCard2 = data.cards[0].image;
      hitVal2 = data.cards[0].value;
      if (hitVal2 === "KING") {
        hitVal2 = 10;
      } else if (hitVal2 === "QUEEN") {
         hitVal2 = 10;
      } else if (hitVal2 === "JACK") {
        hitVal2 = 10;
      }
      if (hitVal2 === "ACE") {
        hitVal2 = 11;
      }
      $(".cardArea4").html("<img src=" + hitCard2 + " width=130>" );
      cards += 1;
      var pcard2 = playerCards + parseInt(hitVal1) + parseInt(hitVal2);
      $(".playerTotal").html("<p>" + pcard2 + "</p>");
      if (pcard2 === 21) {
        $(".alert").html("<h1>BLACKJACK!!!</h1>")
        .css("background-color", "#02410E").css("text-align", "center")
        .css("color", "white").css("font-size", "2rem");
        setTimeout(function () {
        $(".cardArea1").empty();
        $(".cardArea2").empty();
        $(".cardArea3").empty();
        $(".cardArea4").empty();
        $(".dealerArea1").empty();
        $(".dealerArea2").empty();
        $(".playerTotal").empty();
        $(".dealerTotal").empty();
        $(".alert").empty()}, 2000);
      }else if (pcard2 > 21) {
        // alert("BUSTED!!!");
        $(".alert").html("<h1>BUSTED!!!</h1>")
        .css("background-color", "#02410E").css("text-align", "center")
        .css("color", "white").css("font-size", "2rem");
        setTimeout(function () {
        $(".cardArea1").empty();
        $(".cardArea2").empty();
        $(".cardArea3").empty();
        $(".cardArea4").empty();
        $(".dealerArea1").empty();
        $(".dealerArea2").empty();
        $(".playerTotal").empty();
        $(".dealerTotal").empty();
        $(".alert").empty()}, 2000);
      }

      });
  }else if (cards === 2) {
    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
      hitCard3 = data.cards[0].image;
      hitVal3 = data.cards[0].value;
      if (hitVal3 === "KING") {
        hitVal3 = 10;
      } else if (hitVal3 === "QUEEN") {
         hitVal3 = 10;
      } else if (hitVal3 === "JACK") {
        hitVal3 = 10;
      }
      if (hitVal3 === "ACE") {
        hitVal3 = 11;
      }
      $(".cardArea5").html("<img src=" + hitCard3 + " width=130>" );
      cards += 1;
      var pcard3 = playerCards + parseInt(hitVal1) + parseInt(hitVal2) + parseInt(hitVal3);
      $(".playerTotal").html("<p>" + pcard3 + "</p>");
      if (pcard3 === 21) {
        $(".alert").html("<h1>BLACKJACK!!!</h1>")
        .css("background-color", "#02410E").css("text-align", "center")
        .css("color", "white").css("font-size", "2rem");
        setTimeout(function () {
        $(".cardArea1").empty();
        $(".cardArea2").empty();
        $(".cardArea3").empty();
        $(".cardArea4").empty();
        $(".cardArea5").empty();
        $(".dealerArea1").empty();
        $(".dealerArea2").empty();
        $(".playerTotal").empty();
        $(".dealerTotal").empty();
        $(".alert").empty()}, 2000);
      }else if (pcard3 > 21) {
        $(".alert").html("<h1>BUSTED!!!</h1>")
        .css("background-color", "#02410E").css("text-align", "center")
        .css("color", "white").css("font-size", "2rem");
        setTimeout(function () {
        $(".cardArea1").empty();
        $(".cardArea2").empty();
        $(".cardArea3").empty();
        $(".cardArea4").empty();
        $(".cardArea5").empty();
        $(".dealerArea1").empty();
        $(".dealerArea2").empty();
        $(".playerTotal").empty();
        $(".dealerTotal").empty();
        $(".alert").empty()}, 2000);
      }

    });
  };
});

  //                    ADD CHIPS

  var num1 = 0;
  var sum = 0;
  $(".chips").click(function(){
    num1 = $(this).data("amount");
    sum += num1;
    $('#betAmount').val(sum);

  });
  if (playerTotal > dealerTotal) {
    $("#total")
  }
});
