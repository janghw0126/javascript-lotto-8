import { Random, Console } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async run() {
    while(true){
      try{
         const input = await Console.readLineAsync( "구입금액을 입력해 주세요.\n");
         const purchaseAmount = this.validatePurchaseAmount(input);
         const lottos = this.LottoGenerator(purchaseAmount);
      }catch(error){
        Console.print(error.message);
      }
    }
  }

  validatePurchaseAmount(input){
    if(isNaN(input))  throw new Error("[ERROR] 숫자가 아닌 문자를 입력 받았습니다.");
    if(input%1000 !== 0) throw new Error("[ERROR] 1000원 단위로 입력 받지 않았습니다.");
    if(input<=0)  throw new Error("[ERROR] 0 이하의 금액을 입력받았습니다.")
    
    return input;

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
}


export default App;
