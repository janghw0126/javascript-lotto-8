class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }
  
  // 로또 번호 배열을 문자열 형태로 표현
  toString(){
    return `[${this.#numbers.join(", ")}]`;
  }
}

export default Lotto;
