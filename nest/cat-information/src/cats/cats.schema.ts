import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'; // 스키마에 대한 유요성 검사를 위한 라이브러리
// 각 데코레이터를 필드에 적용하고 각 필드에 적용한 유효성 검사를 수행하려면 new ValidationPipe() 인스턴스를 파이프 미들웨어로 등록해야 한다.

const options: SchemaOptions = {
  timestamps: true, // 이 옵션을 활성화(true) 해주면 이 스키마에 대한 Document가 MongoDB의 Collection에 생성될 때 자동으로 updatedAt과 createdAt을 생성하여 함께 저장한다.
};

@Schema(options) // 이 클래스를 스키마로 정의하는 데코레이터, 인자로 스키마 옵션 객체를 대입할 수 있다.
export class Cat extends Document {
  // 이 Cat이라는 클래스가 Mongoose에서 하나의 Document가 될 Schema이기 때문에 mongoose의 Document 클래스를 상속받는다.

  // 각 Prop(Field)에 대해 @Prop() 데코레이터를 붙여서 Prop임을 정의한다.
  // @Prop() 데코레이터의 인자로 옵션 객체를 대입해서 해당 Prop에 대한 제약 사항 옵션을 정의할 수 있다.
  @Prop({
    required: true, // 반드시 값이 있어야 한다는 옵션(RDBMS의 Not Null과 같다.)이다.
    unique: true, // 해당 Collection에 하나만 존재할 수 있는 고유한 값이어야 한다는 옵션이다.
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string }; // Virtual Field로 사용할 필드(실제 DB에 존재하는 필드가 아닌 가상 필드이다.)
  // ! DB에 해당 필드가 실제로 생성되지 않으려면 readOnly 키워드로 추가해야 한다.
}

export const CatSchema = SchemaFactory.createForClass(Cat); // Nestjs/common에서 제공하는 SchemaFactory의 createForClass() 메서드에 위 스키마가 될 Cat 클래스를 대입해서 해당 클래스를 스키마로 만든다.
// 즉, CatSchema가 Cat의 최종적인 Schema가 되는 것이다.

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  // 화살표 함수에는 this. 문법을 사용할 수 없다.
  // ! 여기에서의 실직적인 스키마인 CatSchema에 virtual() 메서드를 사용해서 Virtual Field로 사용될 필드를 지정하고 get() 메서드에 익명함수를 선언하고 인자로 해당 Entity 타입의 인자를 받아 반환할 필드만을 가진 객체를 생성해 반환한다.
  // DB에 생성 후 반환되는 데이터 중 password를 제외한 데이터만을 반환하기 위해 Virtual field를 사용한다.
  // CatSchema.virtual('readOnlyData') 처럼 가장 필드로 사용할 필드를 지정하고 return에 반환하고자 하는 필드만을 가진 객체를 반환한다.

  return {
    // 아래의 this는 해당 Entity의 인스턴스이다.(인자로 받은 Cat 타입의 this)
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
