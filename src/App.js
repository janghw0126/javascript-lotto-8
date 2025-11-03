import { Random, Console } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async run() {
    const purchaseAmount = await this.readPurchaseAmount();
    const lottos = this.LottoGenerator(purchaseAmount);

    const winningNumbers = await this.readWinningNumbers();
    const bonusNumber = await this.readbonusNumber(winningNumbers);
    const totalPrize = this.calculateWinningResult(lottos,winningNumbers,bonusNumber);

    this.calculateProfit(purchaseAmount, totalPrize);
  }


  async readPurchaseAmount() {
    while (true) {
      try {
        const input = await Console.readLineAsync("구입금액을 입력해 주세요.\n");
        const purchaseAmount = this.validatePurchaseAmount(input);
        Console.print("");
        return purchaseAmount;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  validatePurchaseAmount(input){
    if (input === "") throw new Error("[ERROR] 빈 값을 입력받았습니다.");
    if (isNaN(input)) throw new Error("[ERROR] 숫자가 아닌 문자를 입력 받았습니다.");
  
    const amount = Number(input);

    if (amount <= 0) throw new Error("[ERROR] 0 이하의 금액을 입력받았습니다.");
    if (amount % 1000 !== 0) throw new Error("[ERROR] 1000원 단위로 입력 받지 않았습니다.");

    return amount;
  }

  LottoGenerator(purchaseAmount){
    const lottoCount = purchaseAmount/1000;
    let lottos = [];

    for(let i = 0 ; i< lottoCount ; i++){
       let lotto = Random.pickUniqueNumbersInRange(1, 45, 6);
       lotto.sort((a,b) => a - b);
       lotto = new Lotto(lotto);
       lottos.push(lotto);
    }

    Console.print(`${lottoCount}개를 구매했습니다.`);
    lottos.forEach((lotto) => Console.print(lotto.toString()));

    return lottos;

  }

  async readWinningNumbers() {
    while (true) {
      try {
        const input2 = await Console.readLineAsync("당첨 번호를 입력해 주세요.\n");
        const winningNumbers = this.validateWinningNumbers(input2);
        return winningNumbers; 
      } catch (error) {
        Console.print(error.message);
      }
    }
  }


  validateWinningNumbers(input2){
    if(input2=="") throw new Error("[ERROR] 빈 값을 입력하였습니다.");
    if(!input2.includes(",")) throw new Error("[ERROR] 쉼표를 기준으로 구분하지 않았습니다.");
    if(/[^0-9,]/.test(input2)) throw new Error("[ERROR] 숫자가 아닌 문자를 입력하였습니다.");

    const winningNumbers = input2.split(",").map(Number);

    if(winningNumbers.length !== 6) 
      throw new Error("[ERROR] 6개 미만 또는 초과 입력하였습니다.");

    if (winningNumbers.some((num) => num < 1 || num > 45))
      throw new Error("[ERROR] 숫자가 1~45 범위를 벗어났습니다.");

    if (winningNumbers.some((num) => winningNumbers.indexOf(num) !== winningNumbers.lastIndexOf(num)))
      throw new Error("[ERROR] 중복된 숫자가 포함되어 있습니다.");

    return winningNumbers;
  }

  async readbonusNumber(winningNumbers){
    while(true){
      try{
        const input3 = await Console.readLineAsync("보너스 번호를 입력해 주세요.");
        const bonusNumber = this.validateBonusNumber(input3, winningNumbers);
        return bonusNumber;
      }
      catch(error){
        Console.print(error.message);
      }
    }
  }

  validateBonusNumber(input3, winningNumbers){
    if (/[^0-9,]/.test(input3)) throw new Error("[ERROR] 숫자가 아닌 문자를 입력하였습니다.");

    const bonusNumber = Number(input3);
    if (bonusNumber < 1 || bonusNumber > 45)  throw new Error("[ERROR] 숫자가 1~45 범위를 벗어났습니다.");
    if (winningNumbers.forEach((num)=> num=== Number(bonusNumber)))
      throw new Error("[ERROR] 당첨 번호와 중복되었습니다.");
    
    return bonusNumber;

  }

  calculateWinningResult(lottos,winningNumbers,bonusNumber){
    const result = {
      3: 0,        
      4: 0,        
      5: 0,       
      "5+bonus": 0, 
      6: 0,        
    };

    for (let lotto of lottos) {
      const matchCount = lotto.countMatches(winningNumbers);
      const hasBonus = lotto.hasBonus(bonusNumber);

      if (matchCount === 6) result[6]++;
      else if (matchCount === 5 && hasBonus) result["5+bonus"]++;
      else if (matchCount === 5) result[5]++;
      else if (matchCount === 4) result[4]++;
      else if (matchCount === 3) result[3]++;
    }
    // 결과 출력
    Console.print("\n당첨 통계\n---");

    // 상금 테이블
    const PRIZE = {
      3: 5000,
      4: 50000,
      5: 1500000,
      "5+bonus": 30000000,
      6: 2000000000,
    };

    let totalPrize = 0;
    for (let key in result) {
      const count = result[key];
      const prize = PRIZE[key];
      const label = key === "5+bonus" ? "5개 일치, 보너스 볼 일치" : `${key}개 일치`;
      Console.print(`${label} (${prize.toLocaleString()}원) - ${count}개`);
      totalPrize += prize * count;
    }

    return totalPrize; // 이걸 이용해서 수익률 계산 함수로 넘길 수 있음
  }

  calculateProfit(purchaseAmount, totalPrize) {
    const profitRate = ((totalPrize / purchaseAmount) * 100).toFixed(2);
    Console.print(`\n총 수익률은 ${profitRate}%입니다.`);
  }

}


export default App;
