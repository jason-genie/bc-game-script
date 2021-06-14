
var config = {
  bet: { label: 'Bet', value: currency.minAmount * 2, type: 'number' },
  payout: { label: 'Payout', value: 2.1, type: 'number' },
  streak: { label: 'Number of red streaks', value: 5, type: 'number' },
  maxStreak: { label: 'Max of red streaks', value: 20, type: 'number' }
}
  


function main () {
  var loseCount = 0;
  var betCount = 0;
  var betAmount = config.bet.value;
  var maxLosecount = 0 ;

  game.onBet = function () {
    game.bet(betAmount, config.payout.value).then(function(payout) {
      betCount++;
      if (payout > 1) {
        betAmount = config.bet.value;
        loseCount = 0;
        log.success("Won");
      } else {
        log.error("Lost " + betAmount);
        loseCount++;
        if(loseCount == config.streak.value){
          betAmount *= (config.streak.value * 10);
        }
        if (loseCount > config.streak.value){
          betAmount *= 2;
        }
        if (loseCount == config.maxStreak.value){
          betAmount = config.bet.value;
        }
        if( maxLosecount < loseCount){
          maxLosecount = loseCount;
        }
      }
      console.log(
          " betCount " + betCount +
          " betAmount " + betAmount +
          " loseCount " + loseCount + 
          " maxLosecount " + maxLosecount
        );
    });
  }
}

