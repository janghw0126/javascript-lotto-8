import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    while(true){
      try{
         const input = await Console.readLineAsync( "구입금액을 입력해 주세요.\n");
         const purchaseAmount = this.validatePurchaseAmount(input);
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
}


export default App;
