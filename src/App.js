import { Random, Console } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
import Validator from "./utils/Validator.js";
import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";
import { LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER, LOTTO_NUMBER_COUNT, LOTTO_PRICE, PRIZE } from "./utils/constants.js";

class App {
  async run() {
    const purchaseAmount = await this.getPurchaseAmount();
    
    const lottos = this.generateLottos(purchaseAmount);
    OutputView.printLottos(lottos);

    const winningNumbers = await this.getWinningNumbers();
    const bonusNumber = await this.getBonusNumber(winningNumbers);

    const result = this.calculateWinningResult(lottos, winningNumbers, bonusNumber);

    const totalPrize = this.calculateTotalPrize(result);
    const profitRate = ((totalPrize / purchaseAmount) * 100).toFixed(1);

    OutputView.printResult(result, totalPrize, profitRate);
  }

  // 구입 금액 입력 및 검증
  async getPurchaseAmount() {
    while (true) {
      try {
        const input = await InputView.readPurchaseAmount();
        return Validator.validatePurchaseAmount(input);
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  // 당첨 번호 입력 및 검증
  async getWinningNumbers() {
    while (true) {
      try {
        const input = await InputView.readWinningNumbers();
        return Validator.validateWinningNumbers(input);
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  // 보너스 번호 입력 및 검증
  async getBonusNumber(winningNumbers) {
    while (true) {
      try {
        const input = await InputView.readBonusNumber();
        return Validator.validateBonusNumber(input, winningNumbers);
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  // 로또 발행
  generateLottos(amount) {
    const count = amount / LOTTO_PRICE;
    const lottos = [];
    for (let i = 0; i < count; i++) {
      const numbers = Random.pickUniqueNumbersInRange(
        LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER, LOTTO_NUMBER_COUNT
      ).sort((a, b) => a - b);
      lottos.push(new Lotto(numbers));
    }
    return lottos;
  }

  // 당첨 결과 계산
  calculateWinningResult(lottos, winningNumbers, bonusNumber) {
    const result = { 3: 0, 4: 0, 5: 0, "5+bonus": 0, 6: 0 };
    for (let lotto of lottos) {
      const match = lotto.countMatches(winningNumbers);
      const hasBonus = lotto.hasBonus(bonusNumber);
      if (match === 6) result[6]++;
      else if (match === 5 && hasBonus) result["5+bonus"]++;
      else if (match === 5) result[5]++;
      else if (match === 4) result[4]++;
      else if (match === 3) result[3]++;
    }
    return result;
  }

  // 총 상금 계산
  calculateTotalPrize(result) {
    return Object.entries(result).reduce(
      (sum, [key, count]) => sum + PRIZE[key] * count, 0
    );
  }
}

export default App;
