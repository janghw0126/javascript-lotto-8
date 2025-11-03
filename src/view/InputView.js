import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../utils/constants.js';

const InputView = {
  // 구입 금액 입력
  async readPurchaseAmount() {
    return await Console.readLineAsync(MESSAGE.INPUT_PURCHASE);
  },

  // 당첨 번호 입력
  async readWinningNumbers() {
    return await Console.readLineAsync(MESSAGE.INPUT_WINNING);
  },

  // 보너스 번호 입력
  async readBonusNumber() {
    return await Console.readLineAsync(MESSAGE.INPUT_BONUS);
  },
};

export default InputView;
