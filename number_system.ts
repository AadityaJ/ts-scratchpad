type booleanString = "true" | "false";

interface RealNumber{
    prevNum: any;
    isZero: booleanString;
};

type Next<T extends RealNumber> = {
    prevNum: T;
    isZero: "false";
};
type Prev<T extends RealNumber> = T["prevNum"];
type IsZero<T extends RealNumber> = T["isZero"];

type _0_ = {prevNum: undefined, isZero: "true"};
type _1_ = Next<_0_>;
type _2_ = Next<_1_>;
type _3_ = Next<_2_>;

export type Add<T1 extends RealNumber, T2 extends RealNumber> = {true: T2, false: Next<Add<Prev<T1>, T2>> }[IsZero<T1>];
type MultBase<T1 extends RealNumber, T2 extends RealNumber, T3 extends RealNumber> =  { true: T3, false: MultBase<Prev<T1>, T2, Add<T3, T2>>}[IsZero<T1>];
export type Mult<T1 extends RealNumber, T2 extends RealNumber> =  MultBase<T1, T2, _0_>;

const Zero: _0_ = {
    prevNum: undefined,
    isZero: "true",
};
const One: _1_ = {
    prevNum: Zero,
    isZero: "false",
};
const Two: _2_ = {
    prevNum: One,
    isZero: "false",
};
const Three: _3_ = {
    prevNum: Two,
    isZero: "false",
};

const OnePlusOne: Add<_1_, _1_> = {
    prevNum: One,
    isZero: "false",
};

const OnePlusThree: Add<_1_, _3_> = {
    prevNum: Three,
    isZero: "false",
};

const OneIntoTwo: Mult<_1_, _2_> = {
    prevNum: One,
    isZero: "false",
};

type StringBoolean = "true" | "false";
interface ElementInVector{
    value: any;
    prev: any;
    isLast: StringBoolean;
};

type Push<U extends ElementInVector, T extends string> = {value: T, prev: U, isLast: "false"};
type Pop<U extends ElementInVector> = U["prev"];
type Find<U extends ElementInVector>  = ;

type vect1 = { value: "0", prev: undefined, isLast: "true"};
type vect2 = Push<vect1, "1">;
type vect3 = Push<vect2, "2">;
type vect4 = Push<vect3, "3">;
type vect5 = Pop<vect4>;

const Val1: vect4["value"] = "3";
const Val2: vect5["value"] = "2";
