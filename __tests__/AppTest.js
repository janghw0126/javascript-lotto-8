import App from "../src/App";
import Validator from "../src/utils/Validator.js";

describe("로또 유효성 검증 테스트", () => {
  const app = new App();

  // 구입 금액 검증 테스트
  describe("구입 금액 검증 테스트", () => {
    test.each([
      [
        "1000원 단위로 입력 받지 않은 경우",
        "1500",
        "[ERROR] 1000원 단위로 입력 받지 않았습니다.",
      ],
      [
        "숫자가 아닌 문자로 입력받았을 경우",
        "eight-thousand",
        "[ERROR] 숫자가 아닌 문자를 입력하였습니다.",
      ],
      [
        "0 이하인 경우",
        "0",
        "[ERROR] 0 이하의 금액을 입력받았습니다.",
      ],
      [
        "빈 값 입력 시",
        "",
        "[ERROR] 빈 값을 입력하였습니다.",
      ],
    ])("%s 예외 발생", (_, input, expectedMessage) => {
      expect(() => Validator.validatePurchaseAmount(input)).toThrow(expectedMessage);
    });

    test("정상 입력 시 숫자로 반환된다.", () => {
      expect(Validator.validatePurchaseAmount("8000")).toBe(8000);
    });
  });

  // 당첨 번호 검증 테스트
  describe("당첨 번호 검증 테스트", () => {
    test.each([
      [
        "쉼표를 기준으로 구분하지 않은 경우",
        "1 2 3 4 5 6",
        "[ERROR] 쉼표를 기준으로 구분하지 않았습니다.",
      ],
      [
        "숫자가 아닌 문자로 입력받았을 경우",
        "1,2,three,4,5,6",
        "[ERROR] 숫자가 아닌 문자를 입력하였습니다.",
      ],
      [
        "숫자가 1~45 이외인 경우",
        "0,2,3,4,5,46",
        "[ERROR] 숫자가 1~45 범위를 벗어났습니다.",
      ],
      [
        "중복된 숫자가 있을 경우",
        "1,2,3,3,4,5",
        "[ERROR] 중복된 숫자가 포함되어 있습니다.",
      ],
      [
        "빈 값 입력 시",
        "",
        "[ERROR] 빈 값을 입력하였습니다.",
      ],
      [
        "6개 미만 입력 시",
        "1,2,3,4,5",
        "[ERROR] 6개 미만 또는 초과 입력하였습니다.",
      ],
      [
        "6개 초과 입력 시",
        "1,2,3,4,5,6,7",
        "[ERROR] 6개 미만 또는 초과 입력하였습니다.",
      ],
    ])("%s 예외 발생", (_, input, expectedMessage) => {
      expect(() => Validator.validateWinningNumbers(input)).toThrow(expectedMessage);
    });

    test("정상 입력 시 배열 반환", () => {
       expect(Validator.validateWinningNumbers("1,2,3,4,5,6")).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  // 보너스 번호 검증 테스트
  describe("보너스 번호 검증 테스트", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    test.each([
      [
        "숫자가 아닌 문자를 입력받았을 경우",
        "seven",
        "[ERROR] 숫자가 아닌 문자를 입력하였습니다.",
      ],
      [
        "숫자가 1~45 이외인 경우",
        "0",
        "[ERROR] 숫자가 1~45 범위를 벗어났습니다.",
      ],
      [
        "당첨 번호와 중복될 경우",
        "3",
        "[ERROR] 당첨 번호와 중복되었습니다.",
      ],
    ])("%s 예외 발생", (_, input, expectedMessage) => {
      expect(() => Validator.validateBonusNumber(input, winningNumbers)).toThrow(expectedMessage);
    });

    test("정상 입력 시 숫자로 반환된다.", () => {
      expect(Validator.validateBonusNumber("7", winningNumbers)).toBe(7);
    });
  });
});
