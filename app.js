$(document).ready(function(){
  var deckId;
  var dealerCards;
  var playerCards;
  function getCardPoints(cardName){
    if (cardName === "KING") {
      return  10;
    } else if (cardName === "QUEEN") {
       return  10;
    } else if (cardName === "JACK") {
      return  10;
    }else if (cardName === "ACE") {
      return 11;
    }else {
      return cardName;
    }
  }
  function alertUser(words){
    $(".alert").html(words)
    .css("background-color", "#41020d").css("text-align", "center")
    .css("color", "white").css("font-size", "2rem");
  }
  function reload(){
    setTimeout(function(){
      location.reload()}, 3000);
  }
  $.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6" ,function(data){
    console.log(data);
    deckId = data.deck_id;
    console.log(deckId);
  });

  //                    GET PLAYER CARDS

  $(".deal").click(function(event){
    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=2", function(data){
      console.log(data);
      var card1 = data.cards[0].image;
      var card2 = data.cards[1].image;
      var playerCard1 = getCardPoints(data.cards[0].value);
      var playerCard2 = getCardPoints(data.cards[1].value);

      playerCards = parseInt(playerCard1) + parseInt(playerCard2);
      $(".playerTotal").html("<p>" + playerCards + "</p>");
      $(".cardArea1").html("<img src=" + card1 + " width=130>" );
      $(".cardArea2").html("<img src=" + card2 + " width=130>" );
      if (playerCards === 21) {
        alertUser("<h1>BLACKJACK!!!<h1><br><h1>WINNER WINNER CHICKEN DINNER!!!</h1>")
        reload();

      }else if ((playerCards < 21 && playerCards > 15 ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            $("#betAmount").change(function(){
              newTotal += $("#betAmount").val(sum);
              $("#total").append(newTotal);
            });
            alertUser("<br><h1>YOU WIN!!</h1>")
            reload();

          }else if(playerCards < dealerCards) {
            alertUser("<br><h1>DEALER WON...</h1>")
            reload();
          }else if (playerCards === dealerCards) {
            alertUser("<br><h1>PUSH</h1>")
            reload();
          }
        }
    });

    //                    GET DEALER CARDS

    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=2", function(data){
      var dealerCard1 = data.cards[0].image;
      var dealerCard2 = data.cards[1].image;
      var dealerNum1 = getCardPoints(data.cards[0].value);
      var dealerNum2 = getCardPoints(data.cards[1].value);

      dealerCards = parseInt(dealerNum1) + parseInt(dealerNum2);
      $(".dealerTotal").html("<p>" + dealerCards + "</p>");
      $(".dealerArea1").html("<img src=" + dealerCard1 + " width=130>" );
      $(".dealerArea2").html("<img src=" + dealerCard2 + " width=130>" );
      if (dealerCards === 21) {
        alertUser( "<br><h1>AWWW SAD PANDA!!!</h1><br><h1>DEALER GOT 21...</h1>")
        reload();

      }else if ((playerCards < 21 && playerCards >= 19 ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            $("#betAmount").change(function(){
              newTotal += $("#betAmount").val(sum);
              $("#total").append(newTotal);
            });
            alertUser("<br><h1>YOU WIN!!</h1>")
            reload();

          }else if(playerCards < dealerCards) {
            alertUser("<br><h1>DEALER WON...</h1>")
            reload();
          }else if (playerCards === dealerCards) {
            alertUser("<br><h1>PUSH</h1>")
            reload();
          }
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
    hitVal1 = getCardPoints(data.cards[0].value);

    $(".cardArea3").html("<img src=" + hitCard1 + " width=130>" );
    cards += 1;
    playerCards += parseInt(hitVal1);
    $(".playerTotal").html("<p>" + playerCards + "</p>");
    if (playerCards === 21) {
      alertUser("<br><br><h1>21!!!</h1>")
      reload();

    }else if (playerCards > 21) {
      alertUser("<br><br><h1>BUST!!!</h1>")
      reload();

    }else if ((playerCards < 21 && playerCards > 15 ) && (dealerCards < 21 && dealerCards >= 17)) {
        if (playerCards > dealerCards) {
          $("#betAmount").change(function(){
            newTotal += $("#betAmount").val(sum);
            $("#total").append(newTotal);
          });
          alertUser("<br><h1>YOU WIN!!</h1>")
          reload();

        }else if(playerCards < dealerCards) {
          alertUser("<br><h1>DEALER WON...</h1>")
          reload();
        }else if (playerCards === dealerCards) {
          alertUser("<br><h1>PUSH</h1>")
          reload();
        }
      }
    });
  }else if (cards === 1) {
    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
      hitCard2 = data.cards[0].image;
      hitVal2 = getCardPoints(data.cards[0].value);

      $(".cardArea4").html("<img src=" + hitCard2 + " width=130>" );
      cards += 1;
      playerCards += parseInt(hitVal1) + parseInt(hitVal2);
      $(".playerTotal").html("<p>" + playerCards + "</p>");
      if (playerCards === 21) {
        alertUser("<br><br><h1>21!!!</h1>")
        reload();

      }else if (playerCards > 21) {
        alertUser("<br><br><h1>BUST!!!</h1>")
        reload();

      }else if ((playerCards < 21 && playerCards > 15 ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            $("#betAmount").change(function(){
              newTotal += $("#betAmount").val(sum);
              $("#total").append(newTotal);
            });
            alertUser("<br><h1>YOU WIN!!</h1>")
            reload();

          }else if(playerCards < dealerCards) {
            alertUser("<br><h1>DEALER WON...</h1>")
            reload();
          }else if (playerCards === dealerCards) {
            alertUser("<br><h1>PUSH</h1>")
            reload();
          }
        }

      });
  }else if (cards === 2) {
    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
      hitCard3 = data.cards[0].image;
      hitVal3 = getCardPoints(data.cards[0].value);

      $(".cardArea5").html("<img src=" + hitCard3 + " width=130>" );
      cards += 1;
      playerCards += parseInt(hitVal1) + parseInt(hitVal2) + parseInt(hitVal3);
      $(".playerTotal").html("<p>" + playerCards + "</p>");
      if (playerCards === 21) {
        alertUser("<br><br><h1>21!!!</h1>")
        reload();

      }else if (playerCards > 21) {
        alertUser("<br><br><h1>BUST!!!</h1>")
        reload();

      }else if ((playerCards < 21 && playerCards > 15 ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            $("#betAmount").change(function(){
              newTotal += $("#betAmount").val(sum);
              $("#total").append(newTotal);
            });
            alertUser("<br><h1>YOU WIN!!</h1>")
            reload();

          }else if(playerCards < dealerCards) {
            alertUser("<br><h1>DEALER WON...</h1>")
            reload();
          }else if (playerCards === dealerCards) {
            alertUser("<br><h1>PUSH</h1>")
            reload();
          }
        }
    });
  };
});

//                    GET DEALER HIT CARDS

var dealerCardTotal = 0;
var dealerCard1;
var dealerCard2;
var dealerCard3;
var dealerHit1;
var dealerHit2;
var dealerHit2;
// var dcard1;
$(".stay").on("click", function() {
  if (dealerCardTotal === 0 && dealerCards < 17) {
    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
      dealerCard1 = data.cards[0].image;
      dealerVal1 = getCardPoints(data.cards[0].value);

      $(".dealerArea3").html("<img src=" + dealerCard1 + " width=130>" );
      dealerCardTotal += 1;
      dealerCards += parseInt(dealerVal1);
      $(".dealerTotal").html("<p>" + dealerCards + "</p>");
      if (dealerCards === 21) {
        alertUser("<br><h1>DEALER GOT<br><h1>21...</h1>")
        reload();
      }else if (dealerCards > 21) {
        alertUser("<br><br><h1>BUST!!!</h1>")
        reload();
        }
      if (dealerCardTotal === 1 && dealerCards < 17 ) {
        $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
          dealerCard2 = data.cards[0].image;
          dealerVal2 = getCardPoints(data.cards[0].value);

          $(".dealerArea4").html("<img src=" + dealerCard2 + " width=130>" );
          dealerCardTotal += 1;
          dealerCards += parseInt(dealerVal1) + parseInt(dealerVal2);
          $(".dealerTotal").html("<p>" + dealerCards + "</p>");
          if (dealerCards === 21) {
            alertUser("<br><h1>DEALER GOT<br><h1>21...</h1>")
            reload();
          }else if (dealerCards > 21) {
            alertUser("<br><br><h1>BUST!!!</h1>")
            reload();
            }
        });
      };

      if (dealerCardTotal === 2 && dealerCards < 17 ) {
        $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
          dealerCard3 = data.cards[0].image;
          dealerVal3 = getCardPoints(data.cards[0].value);

          $(".dealerArea5").html("<img src=" + dealerCard3 + " width=130>" );
          dealerCardTotal += 1;
          dealerCards += parseInt(dealerVal1) + parseInt(dealerVal2) + parseInt(dealerVal3);
          $(".dealerTotal").html("<p>" + dealerCards + "</p>");
          if (dealerCards === 21) {
            alertUser("<br><h1>DEALER GOT<br><h1>21...</h1>")
            reload();
          }else if (dealerCards > 21) {
            alertUser("<br><br><h1>BUST!!!</h1>")
            reload();
            }
        });
      };
      if ((playerCards < 21 && playerCards > 13 ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            $("#betAmount").change(function(){
              newTotal += $("#betAmount").val(sum);
              $("#total").append(newTotal);
            });
            alertUser("<br><h1>YOU WIN!!</h1>")
            reload();

          }else if(playerCards < dealerCards) {
            alertUser("<br><h1>DEALER WON...</h1>")
            reload();
          }else if (playerCards === dealerCards) {
            alertUser("<br><h1>PUSH</h1>")
            reload();
          }
        }
    });
  };

});
  //                    TAKE BET

var betAmount = 0;
var total = 500;

function renderBetAmount(){
  $('#betAmount').val(betAmount);
}
function renderTotalAmount(){
  $("#total").val(total);
}
function changeTotal(amount){
  total += amount;
  renderTotalAmount();
}

$(".chips").click(function(){
    betAmount += $(this).data("amount");
    renderBetAmount();
  });
if (playerCards > dealerCards) {
  changeTotal(betAmount);
  betAmount = 0;
  renderBetAmount();
}else if (playerCards < dealerCards) {
  changeTotal(-betAmount);
  betAmount = 0;
  renderBetAmount();
}else if (playerCards === dealerCards) {
  renderTotalAmount();
  betAmount = 0;
}
// $(".win").click(function(){
//   changeTotal(betAmount);
//   betAmount = 0;
//   renderBetAmount();
// });
//
// $(".lose").click(function(){
//   changeTotal(-betAmount);
//   betAmount = 0;
//   renderBetAmount();
//   });

});
