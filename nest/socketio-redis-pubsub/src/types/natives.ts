// Note: Jest - Cannot Unit Test
export type StringMap = { [key: string]: string };
export type NullableStringMap = { [key: string]: string | null | undefined };
export type StringArrayMap = { [key: string]: string[] };
export type AnyArrayMap = { [key: string]: any[] };
export type NumberMap = { [key: string]: number };
export type BooleanMap = { [key: string]: boolean };
export type AnyMap = { [key: string]: any };
export type Map<T> = { [key: string]: T };

export type Optional<T> = T | null | undefined;
export type Nullable<T> = T | null;
export type Interface<T> = { [P in keyof T]: T[P] };

export type FlagExcludedType<Base, Type> = {
  [Key in keyof Base]: Base[Key] extends Type ? never : Key;
};
export type AllowedNames<Base, Type> = FlagExcludedType<Base, Type>[keyof Base];
export type OmitType<Base, Type> = Pick<Base, AllowedNames<Base, Type>>;
// eslint-disable-next-line @typescript-eslint/ban-types
export type ConstructorType<T> = OmitType<T, Function>;
// eslint-disable-next-line @typescript-eslint/ban-types
export type Fields<Base> = Pick<Base, AllowedNames<Base, Function>>;
