$(document).ready(function(){
  var deckId;
  var dealerCards;
  var playerCards;
  var betAmount = 0;
  var total = 500;
  var cards = 0;
  var hitCard1;
  var hitCard2;
  var hitCard3;
  var hitVal1;
  var hitVal2;
  var hitVal3;

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
    .css("color", "white").css("font-size", "2rem").show().fadeOut(2500);
  }

  function reload(){
    setTimeout(function(){$(".dealerArea1").empty();
    $(".dealerArea2").empty();
    $(".dealerArea3").empty();
    $(".dealerArea4").empty();
    $(".dealerArea5").empty();
    $(".dealerTotal").empty();
    $(".cardArea1").empty();
    $(".cardArea2").empty();
    $(".cardArea3").empty();
    $(".cardArea4").empty();
    $(".cardArea5").empty();
    $(".playerTotal").empty();
    cards = 0;
    dealerCardTotal = 0;}, 2000);
    if (total === 0) {
      alertUser("<br><h1>You lost your ass!!!</h1><br><h1>Please enter your credit info or refresh page</h1>");
    }
  }
  function push(){
    betAmount = 0;
    renderTotalAmount();
    renderBetAmount();
    alertUser("<br><h1>PUSH</h1>")
    reload();
  }
  function dealerWon(){
    changeTotal(-betAmount);
    betAmount = 0;
    renderBetAmount();
    alertUser("<br><h1>DEALER WON...</h1>")
    reload();
  }
  function youWin(){
    changeTotal(betAmount);
    betAmount = 0;
    renderBetAmount();
    alertUser("<br><h1>YOU WIN!!</h1>")
    reload();
  }
  function dealerBust(){
    changeTotal(betAmount);
    betAmount = 0;
    renderBetAmount();
    alertUser("<br><h1>DEALER</h1><br><h1>BUST!!!</h1>")
    reload();
  }
  function dealerGot21(){
    changeTotal(-betAmount);
    betAmount = 0;
    renderBetAmount();
    alertUser("<br><h1>DEALER GOT<br><h1>21...</h1>")
    reload();
  }
  function youBust(){
    changeTotal(-betAmount);
    betAmount = 0;
    renderBetAmount();
    alertUser("<br><br><h1>BUST!!!</h1>")
    reload();
  }
  function youGot21(){
    changeTotal(betAmount);
    betAmount = 0;
    renderBetAmount();
    alertUser("<br><br><h1>21!!!</h1>")
    reload();
  }
  $(".chips").click(function(){
      var amount = $(this).data("amount");
      if (total < betAmount + amount) {
        alertUser("<br><h1>You have no more money!</h1>")
        return;
      }
      betAmount += amount;
      renderBetAmount();
    });
    renderTotalAmount();

  $.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6" ,function(data){
    console.log(data);
    deckId = data.deck_id;
    console.log(deckId);
  });

  //                    DEAL CARDS

  $(".deal").click(function(event){

    //                    GET DEALER CARDS

    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=2", function(data){
      var dealerCard1 = data.cards[0].image;
      var dealerCard2 = data.cards[1].image;
      var dealerNum1 = getCardPoints(data.cards[0].value);
      var dealerNum2 = getCardPoints(data.cards[1].value);

      dealerCards = parseInt(dealerNum1) + parseInt(dealerNum2);
      $(".dealerTotal").html("<p>" + dealerCards + "</p>");
      $(".dealerArea1").html("<img src=" + dealerCard1 + " width=130 background-color: rgba(0,0,0,.5)>" );
      $(".dealerArea2").html("<img src=" + dealerCard2 + " width=130>" );
      if (dealerCards === 21) {
        changeTotal(-betAmount);
        betAmount = 0;
        renderBetAmount();
        alertUser( "<br><h1>AWWW SAD PANDA!!!</h1><br><h1>DEALER GOT 21...</h1>")
        reload();
      }
      else if ((playerCards < 21 && playerCards >= 19 ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            youWin();
          }else if(playerCards < dealerCards) {
            dealerWon();
          }else if (playerCards === dealerCards) {
            push();
          }
        }
        //                    GET PLAYER CARDS

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
        changeTotal(betAmount * 2);
        betAmount = 0;
        renderBetAmount();
        alertUser("<br><h1>BLACKJACK!!!<h1><br><h1>WINNER WINNER CHICKEN DINNER!!!</h1>")
        reload();
      }else if (playerCards > 21) {
        youBust();
      }else if ((playerCards === dealerCards) && (dealerCards >= 17)) {
        push();
      }else if ((playerCards > dealerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            youWin();
          }else if(playerCards < dealerCards) {
            dealerWon();
          }else if (playerCards === dealerCards) {
            push();
          }
        }
      });
    });
  });

  //                    GET PLAYER HIT CARDS

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
      youGot21();
    }else if (playerCards > 21) {
      youBust();
    }else if ((playerCards === dealerCards) && (dealerCards >= 17)) {
      push();
    }else if ((playerCards > dealerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
        if (playerCards > dealerCards) {
          youWin();
        }else if (playerCards === dealerCards) {
          push();
        }
      }
    });
  }else if (cards === 1) {
    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
      hitCard2 = data.cards[0].image;
      hitVal2 = getCardPoints(data.cards[0].value);
      $(".cardArea4").html("<img src=" + hitCard2 + " width=130>" );
      cards += 1;
      playerCards += parseInt(hitVal2);
      $(".playerTotal").html("<p>" + playerCards + "</p>");
      if (playerCards === 21) {
        youGot21();
      }else if (playerCards > 21) {
        youBust();
      }else if ((playerCards === dealerCards) && (dealerCards >= 17)) {
        push();
      }else if ((playerCards > dealerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            youWin();
          }else if (playerCards === dealerCards) {
            push();
          }
        }
      });
  }else if (cards === 2) {
    $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
      hitCard3 = data.cards[0].image;
      hitVal3 = getCardPoints(data.cards[0].value);
      $(".cardArea5").html("<img src=" + hitCard3 + " width=130>" );
      cards += 1;
      playerCards += parseInt(hitVal3);
      $(".playerTotal").html("<p>" + playerCards + "</p>");
      if (playerCards === 21) {
        youGot21();
      }else if (playerCards > 21) {
        youBust();
      }else if ((playerCards === dealerCards) && (dealerCards >= 17)) {
        push();
      }else if ((playerCards > dealerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            youWin();
          }else if (playerCards === dealerCards) {
            push();
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
        dealerGot21();
      }else if (dealerCards > 21) {
        dealerBust();
      }else if ((playerCards === dealerCards) && (dealerCards >= 17)) {
        push();
      }
      if ((playerCards > dealerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            youWin();
          }else if(playerCards < dealerCards) {
            dealerWon();
          }else if (playerCards === dealerCards) {
            push();
          }
        }
      if ((dealerCards > playerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
          if (playerCards > dealerCards) {
            youWin();
          }else if(playerCards < dealerCards) {
            dealerWon();
          }else if (playerCards === dealerCards) {
            push();
          }
        }
        if (dealerCardTotal === 1 && dealerCards < 17 ) {
          $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
            dealerCard2 = data.cards[0].image;
            dealerVal2 = getCardPoints(data.cards[0].value);
            $(".dealerArea4").html("<img src=" + dealerCard2 + " width=130>" );
            dealerCardTotal += 1;
            dealerCards += parseInt(dealerVal2);
            $(".dealerTotal").html("<p>" + dealerCards + "</p>");
            if (dealerCards === 21) {
              dealerGot21();
              return;
            }else if (dealerCards > 21) {
              dealerBust();
            }else if ((playerCards === dealerCards) && (dealerCards >= 17)) {
              push();
              return;
            }
            if ((playerCards > dealerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
                if (playerCards > dealerCards) {
                  youWin();
                }else if (playerCards === dealerCards) {
                  push();
                  return;
                }
              }
            if ((dealerCards > playerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
                if (playerCards > dealerCards) {
                  youWin();
                }else if(playerCards < dealerCards) {
                  dealerWon();
                }else if (playerCards === dealerCards) {
                  push();
                }
              }
            if (dealerCardTotal === 2 && dealerCards < 17 ) {
              $.get("http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", function(data){
                dealerCard3 = data.cards[0].image;
                dealerVal3 = getCardPoints(data.cards[0].value);

                $(".dealerArea5").html("<img src=" + dealerCard3 + " width=130>" );
                dealerCardTotal += 1;
                dealerCards += parseInt(dealerVal3);
                $(".dealerTotal").html("<p>" + dealerCards + "</p>");
                if (dealerCards === 21) {
                  dealerGot21();
                }else if (dealerCards > 21) {
                  dealerBust();
                }else if ((playerCards === dealerCards) && (dealerCards >= 17)) {
                  push();
                }
              if ((dealerCards > playerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
                  if (playerCards > dealerCards) {
                    youWin();
                  }else if(playerCards < dealerCards) {
                    dealerWon();
                  }else if (playerCards === dealerCards) {
                    push();
                  }
                }
              if ((dealerCards > playerCards ) && (dealerCards < 21 && dealerCards >= 17)) {
                  if (playerCards > dealerCards) {
                    youWin();
                  }else if(playerCards < dealerCards) {
                    dealerWon();
                  }else if (playerCards === dealerCards) {
                    push();
                  }
                }
              });
            };
          });
        };
      });
    };
  });
});
