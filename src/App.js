import { Random, Console } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

const LOTTO_PRICE = 1000;
const LOTTO_NUMBER_COUNT = 6;
const LOTTO_MIN_NUMBER = 1;
const LOTTO_MAX_NUMBER = 45;

const PRIZE = {
  3: 5000,
  4: 50000,
  5: 1500000,
  "5+bonus": 30000000,
  6: 2000000000,
};

const MESSAGE = {
  INPUT_PURCHASE: "구입금액을 입력해 주세요.\n",
  INPUT_WINNING: "당첨 번호를 입력해 주세요.\n",
  INPUT_BONUS: "보너스 번호를 입력해 주세요.",
  ERROR_EMPTY: "[ERROR] 빈 값을 입력받았습니다.",
  ERROR_NOT_NUMBER: "[ERROR] 숫자가 아닌 문자를 입력 받았습니다.",
  ERROR_INVALID_AMOUNT: "[ERROR] 1000원 단위로 입력 받지 않았습니다.",
  ERROR_NON_POSITIVE: "[ERROR] 0 이하의 금액을 입력받았습니다.",
  ERROR_INVALID_FORMAT: "[ERROR] 쉼표를 기준으로 구분하지 않았습니다.",
  ERROR_INVALID_RANGE: "[ERROR] 숫자가 1~45 범위를 벗어났습니다.",
  ERROR_DUPLICATE: "[ERROR] 중복된 숫자가 포함되어 있습니다.",
  ERROR_DUPLICATE_BONUS: "[ERROR] 당첨 번호와 중복되었습니다.",
  ERROR_INVALID_COUNT: "[ERROR] 6개 미만 또는 초과 입력하였습니다.",
};

class App {
  async run() {
    const purchaseAmount = await this.readPurchaseAmount();
    const lottos = this.generateLottos(purchaseAmount);

    const winningNumbers = await this.readWinningNumbers();
    const bonusNumber = await this.readbonusNumber(winningNumbers);
    const totalPrize = this.calculateWinningResult(lottos,winningNumbers,bonusNumber);

    this.calculateProfit(purchaseAmount, totalPrize);
    
  }

  // 구입 금액 입력
  async readPurchaseAmount() {
    while (true) {
      try {
        const input = await Console.readLineAsync(MESSAGE.INPUT_PURCHASE);
        const purchaseAmount = this.validatePurchaseAmount(input);
        Console.print("");
        return purchaseAmount;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  // 구입 금액 유효성 검사
  validatePurchaseAmount(input) {
    if (input === "") throw new Error(MESSAGE.ERROR_EMPTY);
    if (isNaN(input)) throw new Error(MESSAGE.ERROR_NOT_NUMBER);

    const amount = Number(input);

    if (amount <= 0) throw new Error(MESSAGE.ERROR_NON_POSITIVE);
    if (amount % LOTTO_PRICE !== 0) throw new Error(MESSAGE.ERROR_INVALID_AMOUNT);

    return amount;
  }

  // 로또 발행
  generateLottos(purchaseAmount) {
    const lottoCount = purchaseAmount / LOTTO_PRICE;
    let lottos = [];

    for (let i = 0; i < lottoCount; i++) {
      let lotto = Random.pickUniqueNumbersInRange(LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER, LOTTO_NUMBER_COUNT);
      lotto.sort((a, b) => a - b);
      lotto = new Lotto(lotto);
      lottos.push(lotto);
    }

    Console.print(`${lottoCount}개를 구매했습니다.`);
    lottos.forEach((lotto) => Console.print(lotto.toString()));
    Console.print("");

    return lottos;
  }

  // 당첨 번호 입력
  async readWinningNumbers() {
    while (true) {
      try {
        const input = await Console.readLineAsync(MESSAGE.INPUT_WINNING);
        Console.print("");
        const winningNumbers = this.validateWinningNumbers(input);
        return winningNumbers;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  // 당첨 번호 유효성 검사
  validateWinningNumbers(input) {
    if (input === "") throw new Error(MESSAGE.ERROR_EMPTY);
    if (!input.includes(",")) throw new Error(MESSAGE.ERROR_INVALID_FORMAT);
    if (/[^0-9,]/.test(input)) throw new Error(MESSAGE.ERROR_NOT_NUMBER);

    const winningNumbers = input.split(",").map(Number);

    if (winningNumbers.length !== LOTTO_NUMBER_COUNT)
      throw new Error(MESSAGE.ERROR_INVALID_COUNT);

    if (winningNumbers.some((num) => num < LOTTO_MIN_NUMBER || num > LOTTO_MAX_NUMBER))
      throw new Error(MESSAGE.ERROR_INVALID_RANGE);

    if (winningNumbers.some((num) => winningNumbers.indexOf(num) !== winningNumbers.lastIndexOf(num)))
      throw new Error(MESSAGE.ERROR_DUPLICATE);

    return winningNumbers;
  }

  // 보너스 번호 입력
  async readbonusNumber(winningNumbers) {
    while (true) {
      try {
        const input = await Console.readLineAsync(MESSAGE.INPUT_BONUS);
        const bonusNumber = this.validateBonusNumber(input, winningNumbers);
        return bonusNumber;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  // 보너스 번호 유효성 검사
  validateBonusNumber(input, winningNumbers) {
    if (/[^0-9,]/.test(input)) throw new Error(MESSAGE.ERROR_NOT_NUMBER);

    const bonusNumber = Number(input);
    if (bonusNumber < LOTTO_MIN_NUMBER || bonusNumber > LOTTO_MAX_NUMBER)
      throw new Error(MESSAGE.ERROR_INVALID_RANGE);
    if (winningNumbers.includes(bonusNumber))
      throw new Error(MESSAGE.ERROR_DUPLICATE_BONUS);

    return bonusNumber;
  }

  // 당첨 결과 계산
  calculateWinningResult(lottos, winningNumbers, bonusNumber) {
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

    Console.print("\n당첨 통계\n---");

    let totalPrize = 0;
    for (let key in result) {
      const count = result[key];
      const prize = PRIZE[key];
      const label = key === "5+bonus" ? "5개 일치, 보너스 볼 일치" : `${key}개 일치`;
      Console.print(`${label} (${prize.toLocaleString()}원) - ${count}개`);
      totalPrize += prize * count;
    }

    return totalPrize;
  }

  // 수익률 계산 및 출력
  calculateProfit(purchaseAmount, totalPrize) {
    const profitRate = ((totalPrize / purchaseAmount) * 100).toFixed(1);
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
  }
}

export default App;
