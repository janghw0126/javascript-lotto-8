export const LOTTO_PRICE = 1000;
export const LOTTO_NUMBER_COUNT = 6;
export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;

// 당첨 등수별 상금
export const PRIZE = {
  3: 5000,
  4: 50000,
  5: 1500000,
  "5+bonus": 30000000,
  6: 2000000000,
};

// 사용자 입력 및 에러 메시지 상수
export const MESSAGE = {
  // 입력 관련 메시지
  INPUT_PURCHASE: "구입금액을 입력해 주세요.\n",
  INPUT_WINNING: "당첨 번호를 입력해 주세요.\n",
  INPUT_BONUS: "보너스 번호를 입력해 주세요.",

  // 에러 메시지
  ERROR_EMPTY: "[ERROR] 빈 값을 입력하였습니다.",
  ERROR_NOT_NUMBER: "[ERROR] 숫자가 아닌 문자를 입력하였습니다.",
  ERROR_INVALID_AMOUNT: "[ERROR] 1000원 단위로 입력 받지 않았습니다.",
  ERROR_NON_POSITIVE: "[ERROR] 0 이하의 금액을 입력받았습니다.",
  ERROR_INVALID_FORMAT: "[ERROR] 쉼표를 기준으로 구분하지 않았습니다.",
  ERROR_INVALID_RANGE: "[ERROR] 숫자가 1~45 범위를 벗어났습니다.",
  ERROR_DUPLICATE: "[ERROR] 중복된 숫자가 포함되어 있습니다.",
  ERROR_DUPLICATE_BONUS: "[ERROR] 당첨 번호와 중복되었습니다.",
  ERROR_INVALID_COUNT: "[ERROR] 6개 미만 또는 초과 입력하였습니다.",
};
