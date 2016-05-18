$(document).ready(function(){
  var deckId;
  var dealerCards;
  var playerCards;
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
        $(".alert").html("<h1>BLACKJACK!!!<h1><br><h1>WINNER WINNER CHICKEN DINNER!!!</h1>")
        .css("background-color", "#41020d").css("text-align", "center")
        .css("color", "white").css("font-size", "2rem");
        setTimeout(function(){
          location.reload()}, 3000);

      }else if ((playerCards < 21 && playerCards > 15 ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            $("#betAmount").change(function(){
              newTotal += $("#betAmount").val(sum);
              $("#total").append(newTotal);
            });
            $(".alert").html("<br><h1>YOU WIN!!</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);

          }else if(playerCards < dealerCards) {
            $(".alert").html("<br><h1>DEALER WON...</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);
          }else if (playerCards === dealerCards) {
            $(".alert").html("<br><h1>PUSH</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);
          }
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
        $(".alert").html( "<br><h1>AWWW SAD PANDA!!!</h1><br><h1>DEALER GOT 21...</h1>")
        .css("background-color", "#41020d").css("text-align", "center")
        .css("color", "white").css("font-size", "2rem");
        setTimeout(function(){
          location.reload()}, 3000);

      }else if ((playerCards < 21 && playerCards >= 19 ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            $("#betAmount").change(function(){
              newTotal += $("#betAmount").val(sum);
              $("#total").append(newTotal);
            });
            $(".alert").html("<br><h1>YOU WIN!!</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);

          }else if(playerCards < dealerCards) {
            $(".alert").html("<br><h1>DEALER WON...</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);
          }else if (playerCards === dealerCards) {
            $(".alert").html("<br><h1>PUSH</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);
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
    playerCards += parseInt(hitVal1);
    $(".playerTotal").html("<p>" + playerCards + "</p>");
    if (playerCards === 21) {
      $(".alert").html("<br><br><h1>21!!!</h1>")
      .css("background-color", "#41020d").css("text-align", "center")
      .css("color", "white").css("font-size", "2rem");
      setTimeout(function(){
        location.reload()}, 3000);

    }else if (playerCards > 21) {
      $(".alert").html("<br><br><h1>BUST!!!</h1>")
      .css("background-color", "#41020d").css("text-align", "center")
      .css("color", "white").css("font-size", "2rem");
      setTimeout(function(){
        location.reload()}, 3000);

    }else if ((playerCards < 21 && playerCards > 15 ) && (dealerCards < 21 && dealerCards >= 17)) {
        if (playerCards > dealerCards) {
          $("#betAmount").change(function(){
            newTotal += $("#betAmount").val(sum);
            $("#total").append(newTotal);
          });
          $(".alert").html("<br><h1>YOU WIN!!</h1>")
          .css("background-color", "#41020d").css("text-align", "center")
          .css("color", "white").css("font-size", "2rem");
          setTimeout(function(){
            location.reload()}, 3000);

        }else if(playerCards < dealerCards) {
          $(".alert").html("<br><h1>DEALER WON...</h1>")
          .css("background-color", "#41020d").css("text-align", "center")
          .css("color", "white").css("font-size", "2rem");
          setTimeout(function(){
            location.reload()}, 3000);
        }else if (playerCards === dealerCards) {
          $(".alert").html("<br><h1>PUSH</h1>")
          .css("background-color", "#41020d").css("text-align", "center")
          .css("color", "white").css("font-size", "2rem");
          setTimeout(function(){
            location.reload()}, 3000);
        }
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
      playerCards += parseInt(hitVal1) + parseInt(hitVal2);
      $(".playerTotal").html("<p>" + playerCards + "</p>");
      if (playerCards === 21) {
        $(".alert").html("<br><br><h1>21!!!</h1>")
        .css("background-color", "#41020d").css("text-align", "center")
        .css("color", "white").css("font-size", "2rem");
        setTimeout(function(){
          location.reload()}, 3000);

      }else if (playerCards > 21) {
        $(".alert").html("<br><br><h1>BUST!!!</h1>")
        .css("background-color", "#41020d").css("text-align", "center")
        .css("color", "white").css("font-size", "2rem");
        setTimeout(function(){
          location.reload()}, 3000);

      }else if ((playerCards < 21 && playerCards > 15 ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            $("#betAmount").change(function(){
              newTotal += $("#betAmount").val(sum);
              $("#total").append(newTotal);
            });
            $(".alert").html("<br><h1>YOU WIN!!</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);

          }else if(playerCards < dealerCards) {
            $(".alert").html("<br><h1>DEALER WON...</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);
          }else if (playerCards === dealerCards) {
            $(".alert").html("<br><h1>PUSH</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);
          }
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
      playerCards += parseInt(hitVal1) + parseInt(hitVal2) + parseInt(hitVal3);
      $(".playerTotal").html("<p>" + playerCards + "</p>");
      if (playerCards === 21) {
        $(".alert").html("<br><br><h1>21!!!</h1>")
        .css("background-color", "#41020d").css("text-align", "center")
        .css("color", "white").css("font-size", "2rem");
        setTimeout(function(){
          location.reload()}, 3000);

      }else if (playerCards > 21) {
        $(".alert").html("<br><br><h1>BUST!!!</h1>")
        .css("background-color", "#41020d").css("text-align", "center")
        .css("color", "white").css("font-size", "2rem");
        setTimeout(function(){
          location.reload()}, 3000);

      }else if ((playerCards < 21 && playerCards > 15 ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            $("#betAmount").change(function(){
              newTotal += $("#betAmount").val(sum);
              $("#total").append(newTotal);
            });
            $(".alert").html("<br><h1>YOU WIN!!</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);

          }else if(playerCards < dealerCards) {
            $(".alert").html("<br><h1>DEALER WON...</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);
          }else if (playerCards === dealerCards) {
            $(".alert").html("<br><h1>PUSH</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);
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
      dealerVal1 = data.cards[0].value;
      if (dealerVal1 === "KING") {
        dealerVal1 = 10;
      } else if (dealerVal1 === "QUEEN") {
         dealerVal1 = 10;
      } else if (dealerVal1 === "JACK") {
        dealerVal1 = 10;
      }
      if (dealerVal1 === "ACE") {
        dealerVal1 = 11;
      }
      $(".dealerArea3").html("<img src=" + dealerCard1 + " width=130>" );
      dealerCardTotal += 1;
      dealerCards += parseInt(dealerVal1);
      $(".dealerTotal").html("<p>" + dealerCards + "</p>");
      if (dealerCards === 21) {
        $(".alert").html("<br><h1>DEALER GOT<br><h1>21...</h1>")
        .css("background-color", "#41020d").css("text-align", "center")
        .css("color", "white").css("font-size", "2rem");
        setTimeout(function(){
          location.reload()}, 3000);
      }else if (dealerCards > 21) {
        $(".alert").html("<br><br><h1>BUST!!!</h1>")
        .css("background-color", "#41020d").css("text-align", "center")
        .css("color", "white").css("font-size", "2rem");
        setTimeout(function(){
          location.reload()}, 3000);
        }
      if (dealerCardTotal === 1 && dealerCards < 17 ) {
        $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
          dealerCard2 = data.cards[0].image;
          dealerVal2 = data.cards[0].value;
          if (dealerVal2 === "KING") {
            dealerVal2 = 10;
          } else if (dealerVal2 === "QUEEN") {
             dealerVal2 = 10;
          } else if (dealerVal2 === "JACK") {
            dealerVal2 = 10;
          }
          if (dealerVal2 === "ACE") {
            dealerVal2 = 11;
          }
          $(".dealerArea4").html("<img src=" + dealerCard2 + " width=130>" );
          dealerCardTotal += 1;
          dealerCards += parseInt(dealerVal1) + parseInt(dealerVal2);
          $(".dealerTotal").html("<p>" + dealerCards + "</p>");
          if (dealerCards === 21) {
            $(".alert").html("<br><h1>DEALER GOT<br><h1>21...</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);
          }else if (dealerCards > 21) {
            $(".alert").html("<br><br><h1>BUST!!!</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);
            }
        });
      };

      if (dealerCardTotal === 2 && dealerCards < 17 ) {
        $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
          dealerCard3 = data.cards[0].image;
          dealerVal3 = data.cards[0].value;
          if (dealerVal3 === "KING") {
            dealerVal3 = 10;
          } else if (dealerVal3 === "QUEEN") {
             dealerVal3 = 10;
          } else if (dealerVal3 === "JACK") {
            dealerVal3 = 10;
          }
          if (dealerVal3 === "ACE") {
            dealerVal3 = 11;
          }
          $(".dealerArea5").html("<img src=" + dealerCard3 + " width=130>" );
          dealerCardTotal += 1;
          dealerCards += parseInt(dealerVal1) + parseInt(dealerVal2) + parseInt(dealerVal3);
          $(".dealerTotal").html("<p>" + dealerCards + "</p>");
          if (dealerCards === 21) {
            $(".alert").html("<br><h1>DEALER GOT<br><h1>21...</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);
          }else if (dealerCards > 21) {
            $(".alert").html("<br><br><h1>BUST!!!</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);
            }
        });
      };
      if ((playerCards < 21 && playerCards > 13 ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            $("#betAmount").change(function(){
              newTotal += $("#betAmount").val(sum);
              $("#total").append(newTotal);
            });
            $(".alert").html("<br><h1>YOU WIN!!</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);

          }else if(playerCards < dealerCards) {
            $(".alert").html("<br><h1>DEALER WON...</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);
          }else if (playerCards === dealerCards) {
            $(".alert").html("<br><h1>PUSH</h1>")
            .css("background-color", "#41020d").css("text-align", "center")
            .css("color", "white").css("font-size", "2rem");
            setTimeout(function(){
              location.reload()}, 3000);
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
