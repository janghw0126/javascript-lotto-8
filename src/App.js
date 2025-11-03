import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    while(true){
      try{
         const input = await Console.readLineAsync( "구입금액을 입력해 주세요.\n");
      }catch(error){
        Console.print(error.message);
      }
    }
  }
}


export default App;
