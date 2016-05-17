$(document).ready(function(){
  var deckId;
  $.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6" ,function(data){
    console.log(data);
    deckId = data.deck_id;
    console.log(deckId);
  });

  //                    GET PLAYER CARDS

  $(".deal").click(function(){
    var dealerCards;
    var playerCards;
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
      var playerCards = parseInt(playerCard1) + parseInt(playerCard2);
      $(".playerTotal").html("<p>" + playerCards + "</p>");
      $(".cardArea1").html("<img src=" + card1 + " width=130>" );
      $(".cardArea2").html("<img src=" + card2 + " width=130>" );

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
      var dealerCards = parseInt(dealerNum1) + parseInt(dealerNum2);
      $(".dealerTotal").html("<p>" + dealerCards + "</p>");
      $(".dealerArea1").html("<img src=" + dealerCard1 + " width=130>" ); $(".dealerArea2").html("<img src=" + dealerCard2 + " width=130>" );
    });
    // if (dealerCards > playerCards) {
    //   alert("YOU LOST YOUR ASS!!!");
    // }else {
    //   alert("WINNER WINNER CHICKEN CHICKEN DINNER!!!");
    // }
  });


$(".hit").click(function(){
$.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
  console.log(data);
  var hitCard1 = data.cards[0].image;
  console.log(hitCard1);
  $(".cardArea3").html("<img src=" + hitCard1 + " width=130>" );
  var hitCard2 = data.cards[0].image;
  console.log(hitCard2);
  $(".cardArea4").html("<img src=" + hitCard2 + " width=130>" );
  var hitCard3 = data.cards[0].image;
  console.log(hitCard3);
  $(".cardArea5").html("<img src=" + hitCard3 + " width=130>" );

  });
});

  //                    ADD CHIPS

  var num1 = 0;
  var sum = 0;
  $(".chips").click(function(){
    num1 = $(this).data("amount");
    sum += num1;
    $('#betAmount').val(sum);

  });
});
