let myInt: number = 500;
const myFloat: number = 4.5;
let myString: string = 'Hello, World';
let myBool: boolean = true;
let myArray: number[] = [1, 2, 3, 4];
let myArray2: string[] = ["a", "b", "c"];

let myTemplateString: string = `
Multilinea
"" commilla doble, '' comilla simple
inyectar valores ${myBool}
`;

type myDuple = [number, number];
let coordinate: myDuple = [1013452, 1815235];

type ID = string | number;

interface UserInterface {
  id: ID;
  name: string;
  lastName: string;
  sayHello(): void;
}

class User implements UserInterface {
  public id: ID;
  public name: string;
  public lastName: string;

  constructor(id: ID, name: string, lastName: string) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
  }

  sayHello() {
    console.log("Hello!");
  }
}

const u = new User(1, "John", "Doe");

interface genericType<T> {
  value: T;
}

let a: genericType<string> = { value: "Hello" };
let b: genericType<number> = { value: 123 };

console.log(myInt, myFloat, myString, myBool, myArray, myArray2, coordinate);
console.log(myTemplateString);
console.log(u);
console.log(a, b)
