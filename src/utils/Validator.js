import {
  LOTTO_PRICE,
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBER_COUNT,
  MESSAGE,
} from './constants.js';

// 입력값 검증 객체
const Validator = {
  // 구입 금액 유효성 검증
  validatePurchaseAmount(input) {
    if (input === '') throw new Error(MESSAGE.ERROR_EMPTY);
    if (isNaN(input)) throw new Error(MESSAGE.ERROR_NOT_NUMBER);
    const amount = Number(input);
    if (amount <= 0) throw new Error(MESSAGE.ERROR_NON_POSITIVE);
    if (amount % LOTTO_PRICE !== 0)
      throw new Error(MESSAGE.ERROR_INVALID_AMOUNT);
    return amount;
  },

  // 당첨 번호 유효성 검증
  validateWinningNumbers(input) {
    if (input === '') throw new Error(MESSAGE.ERROR_EMPTY);
    if (!input.includes(',')) throw new Error(MESSAGE.ERROR_INVALID_FORMAT);
    if (/[^0-9,]/.test(input)) throw new Error(MESSAGE.ERROR_NOT_NUMBER);

    const numbers = input.split(',').map(Number);
    if (numbers.length !== LOTTO_NUMBER_COUNT)
      throw new Error(MESSAGE.ERROR_INVALID_COUNT);
    if (numbers.some((n) => n < LOTTO_MIN_NUMBER || n > LOTTO_MAX_NUMBER))
      throw new Error(MESSAGE.ERROR_INVALID_RANGE);
    if (new Set(numbers).size !== numbers.length)
      throw new Error(MESSAGE.ERROR_DUPLICATE);

    return numbers;
  },

  // 보너스 번호 유효성 검증
  validateBonusNumber(input, winningNumbers) {
    if (/[^0-9,]/.test(input)) throw new Error(MESSAGE.ERROR_NOT_NUMBER);
    const bonus = Number(input);
    if (bonus < LOTTO_MIN_NUMBER || bonus > LOTTO_MAX_NUMBER)
      throw new Error(MESSAGE.ERROR_INVALID_RANGE);
    if (winningNumbers.includes(bonus))
      throw new Error(MESSAGE.ERROR_DUPLICATE_BONUS);
    return bonus;
  },
};

export default Validator;
