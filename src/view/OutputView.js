import { Console } from "@woowacourse/mission-utils";
import { PRIZE } from "../utils/constants.js";

const OutputView = {
  // 구매한 로또 목록 출력
  printLottos(lottos) {
    Console.print(`${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => Console.print(lotto.toString()));
    Console.print("");
  },

  // 당첨 통계 및 수익률 출력
  printResult(result, totalPrize, profitRate) {
    Console.print("\n당첨 통계\n---");

    // 등수별 결과 출력
    for (let key in result) {
      const label = key === "5+bonus" ? "5개 일치, 보너스 볼 일치" : `${key}개 일치`;
      const prize = PRIZE[key].toLocaleString();
      const count = result[key];
      Console.print(`${label} (${prize}원) - ${count}개`);
    }

    // 총 수익률 출력
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
  },
};

export default OutputView;
