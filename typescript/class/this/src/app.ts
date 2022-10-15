// class Department {
//   name: string;

//   constructor(n: string) {
//     this.name = n; // ! this는 이 클래스(청사진)로 생성될 인스턴스를 가리킨다.
//   }
//   describe() {
//     console.log("Department: " + this.name); // ! 마찬가지로 this는 이 클래스로 생성될 인스턴스를 가리킨다.
//   }
// }

// const accounting = new Department("Accounting");
// console.log(accounting.name); // Accounting 출력
// accounting.describe(); // Department: Accounting 출력

// const accountingCopy = { describe: accounting.describe };
// accountingCopy.describe(); // undefined 출력
// ! 그 이유는 accountingCopy의 describe 속성에 accounting 인스턴스의 describe() 메서드를 지정했고 이 메서드가 해당 속성에 정의는 됐기 때문에 호출해도 정상 실행 된다.
// ! 하지만 메서드 실행 구문의 this.name을 찾지 못한다.
// ! 왜냐하면 Class의 this는 해당 Class로 생성한 인스턴스를 가리키기 때문에 this는 Department 클래스로 생성하지 않은 accountingCopy 객체의 this.name을 찾지 못하는 것이다.
// ! 이런 상황을 방지하기 위해 타입스크립트에서는 Class의 메서드에서 사용되는 this에 해당 Class를 타입으로 지정해서 this가 해당 Class로 생성된 인스턴스임을 지정할 수 있다.
// 그럼 아래와 같이 작성할 수 있다.

class Department {
  name: string;

  constructor(n: string) {
    this.name = n; // ! this는 이 클래스(청사진)로 생성될 인스턴스를 가리킨다.
  }
  describe(this: Department) {
    console.log("Department: " + this.name); // ! 마찬가지로 this는 이 클래스로 생성될 인스턴스를 가리킨다.
  }
}

const accounting = new Department("Accounting");
console.log(accounting.name); // Accounting 출력
accounting.describe(); // Department: Accounting 출력

// const accountingCopy = { describe: accounting.describe };
// accountingCopy.describe();
// accountingCopy의 describe 속성에 지정된 accounting의 describe 메서드의 this에 Department 클래스를 지정했으므로
// 해당 클래스로 생성하지 않은 accountingCopy에서 describe() 메서드의 this는 Department 클래스 타입이 아니기 때문에 에러가 발생한다.
// !  즉, 클래스의 this에 해당 클래스를 타입으로 지정하는 것은 해당 클래스로 생성한 인스턴스인지 체크하도록 타입스크립트에게 알려주는 것이다.
