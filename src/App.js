import { Random, Console } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async run() {
    const purchaseAmount = await this.readPurchaseAmount();
    const lottos = this.LottoGenerator(purchaseAmount);

    const winningNumbers = await this.readWinningNumbers();
      
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
}


export default App;
