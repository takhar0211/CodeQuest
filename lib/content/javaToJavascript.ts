import type { Course } from "@/lib/types";

export const javaToJavascript: Course = {
  id: "java-to-javascript",
  knownLang: "java",
  targetLang: "javascript",
  title: "Java → JavaScript",
  modules: [
    // ===================== BEGINNER =====================
    { id: "java-js-variables", title: "Variables & Types", tagline: "Drop the types — dynamic typing awaits.", icon: "🏰", level: "beginner", order: 1, requires: [], rewardXp: 60,
      lessons: [
        { id: "lesson-java-js-vars-1", title: "let, const, and dynamic types", intro: "JavaScript is dynamically typed — `let x = 42` just works, no type needed. `const` prevents reassignment (like `final`). `let` is mutable. Avoid `var` (legacy, function-scoped). JS has 7 primitives: number, string, boolean, null, undefined, symbol, bigint. All numbers are 64-bit doubles.", comparisons: [
            { concept: "Declarations", knownCode: "int count = 0;\nfinal String NAME = \"Ada\";\nboolean ok = true;", targetCode: "let count = 0;\nconst NAME = 'Ada';\nlet ok = true;", note: "No types. `const` ≈ `final`. Use `const` by default." },
            { concept: "No integer type", knownCode: "int a = 5;\nlong b = 5000000000L;\ndouble c = 3.14;", targetCode: "const a = 5;      // All numbers are doubles\nconst b = 5000000000;\nconst c = 3.14;", note: "One number type. Use `BigInt` for arbitrary precision." },
            { concept: "null vs undefined", knownCode: "String s = null;", targetCode: "let s = null;       // Explicit nothing\nlet t;               // undefined (never assigned)\nlet u = undefined;   // Also valid", note: "JS has both `null` AND `undefined`. Java has only `null`." },
            { concept: "Type coercion", knownCode: "// Java: type-safe, no coercion", targetCode: "\"5\" + 1  // \"51\" (string concat!)\n\"5\" - 1  // 4 (coerced to number)\n\"5\" === 5  // false (strict equality)", note: "Always use `===` (strict) not `==` (coercing). This is critical." },
          ], realWorld: "TypeScript adds Java-like static types on top of JS. Many teams use it for large codebases.",
          exercise: { id: "ex-java-js-vars-1", prompt: "Declare a const `name` as 'Ada' and let `age` as 36. Log both.", starterCode: "// Declare and log\n", solution: "const name = 'Ada';\nlet age = 36;\nconsole.log(`${name} is ${age}`);", expectedOutputIncludes: "Ada", xp: 20 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-js-var-1", prompt: "Java's `final` is JS's…", choices: ["final", "const", "let", "static"], correctIndex: 1, explanation: "`const` prevents reassignment, like `final`.", xp: 10 },
        { kind: "mcq", id: "q-java-js-var-2", prompt: "Why should you use `===` instead of `==`?", choices: ["Faster", "No type coercion — `'5' == 5` is true, `'5' === 5` is false", "Required by spec", "No difference"], correctIndex: 1, explanation: "`===` checks type AND value. `==` coerces types before comparing.", xp: 10 },
        { kind: "mcq", id: "q-java-js-var-3", prompt: "JS has… number type(s).", choices: ["Two (int, double)", "One (64-bit double)", "Three (int, float, double)", "Many"], correctIndex: 1, explanation: "All numbers are IEEE 754 doubles. Use `BigInt` for large integers.", xp: 10 },
        { kind: "debug", id: "q-java-js-var-4", prompt: "Why does `\"5\" + 1` equal `\"51\"`?", brokenCode: "console.log(\"5\" + 1);  // \"51\" not 6!", choices: ["`+` with a string does concatenation, not addition", "Numbers are strings", "console.log is wrong", "Missing parseInt"], correctIndex: 0, explanation: "String + anything = string concatenation. Use `Number('5') + 1` for math.", xp: 15 },
        { kind: "mcq", id: "q-java-js-var-5", prompt: "Difference between `null` and `undefined`:", choices: ["Same thing", "`null` is intentional absence, `undefined` is unassigned", "`undefined` is an error", "`null` doesn't exist in JS"], correctIndex: 1, explanation: "`undefined`: never assigned. `null`: explicitly set to nothing.", xp: 10 },
      ],
    },
    { id: "java-js-controlflow", title: "Control Flow", tagline: "Same braces — but truthiness changes everything.", icon: "🛡️", level: "beginner", order: 2, requires: ["java-js-variables"], rewardXp: 70,
      lessons: [
        { id: "lesson-java-js-cf-1", title: "Conditionals and truthiness", intro: "JS `if/else` looks identical to Java. Key difference: JS has truthiness. Six falsy values: `false`, `0`, `''`, `null`, `undefined`, `NaN`. Everything else is truthy — including empty arrays `[]` and objects `{}`. Optional chaining (`?.`) and nullish coalescing (`??`) are game-changers.", comparisons: [
            { concept: "if/else", knownCode: "if (score > 90) {\n    System.out.println(\"A\");\n}", targetCode: "if (score > 90) {\n    console.log('A');\n}", note: "Nearly identical! `console.log` replaces `System.out.println`." },
            { concept: "Truthiness", knownCode: "if (name != null && !name.isEmpty()) { ... }", targetCode: "if (name) { ... }  // Checks for null, undefined, and empty string", note: "Truthiness replaces many explicit null/empty checks." },
            { concept: "Optional chaining", knownCode: "if (user != null && user.getAddress() != null) {\n    city = user.getAddress().getCity();\n}", targetCode: "const city = user?.address?.city;", note: "`?.` returns undefined instead of throwing if anything is null/undefined." },
            { concept: "Nullish coalescing", knownCode: "String name = (s != null) ? s : \"default\";", targetCode: "const name = s ?? 'default';", note: "`??` only checks null/undefined. `||` checks all falsy values." },
          ], realWorld: "`?.` and `??` eliminate most NullPointerException scenarios. Every modern JS codebase uses them.",
          exercise: { id: "ex-java-js-cf-1", prompt: "Given `user = {name: 'Ada'}`, use optional chaining to safely access `user.address.city` with fallback 'Unknown'.", starterCode: "const user = {name: 'Ada'};\n// Safe access\n", solution: "const user = {name: 'Ada'};\nconst city = user?.address?.city ?? 'Unknown';\nconsole.log(city);", expectedOutputIncludes: "Unknown", xp: 30 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-js-cf-1", prompt: "Which is truthy in JS?", choices: ["0", "''", "null", "[]"], correctIndex: 3, explanation: "Empty array is truthy! Only 6 values are falsy.", xp: 10 },
        { kind: "mcq", id: "q-java-js-cf-2", prompt: "`??` differs from `||` because…", choices: ["Same thing", "`??` only triggers on null/undefined, `||` on any falsy", "`??` is deprecated", "`||` doesn't work with strings"], correctIndex: 1, explanation: "`0 ?? 5` = 0 (not nullish). `0 || 5` = 5 (falsy).", xp: 10 },
        { kind: "debug", id: "q-java-js-cf-3", prompt: "Why does this log 'truthy'?", brokenCode: "if ([]) console.log('truthy');", choices: ["Empty array is truthy in JS", "if always evaluates to true", "[] is not empty", "Bug in console.log"], correctIndex: 0, explanation: "Arrays and objects are always truthy, even when empty.", xp: 15 },
        { kind: "mcq", id: "q-java-js-cf-3b", prompt: "`user?.name` returns `undefined` if…", choices: ["name is undefined", "user is null or undefined", "Both A and B", "Neither"], correctIndex: 2, explanation: "Optional chaining short-circuits on null/undefined at any point.", xp: 10 },
        { kind: "mcq", id: "q-java-js-cf-4", prompt: "JS output function is…", choices: ["System.out.println()", "print()", "console.log()", "echo()"], correctIndex: 2, explanation: "`console.log()` for output. `console.error()` for errors.", xp: 10 },
      ],
    },
    { id: "java-js-loops", title: "Loops & Array Methods", tagline: "`for...of`, `.map()`, `.filter()`, `.reduce()`.", icon: "🌀", level: "beginner", order: 3, requires: ["java-js-controlflow"], rewardXp: 80,
      lessons: [
        { id: "lesson-java-js-loops-1", title: "Modern iteration", intro: "JS has classic for loops (same as Java), `for...of` (like enhanced for), and powerful array methods (`.map()`, `.filter()`, `.reduce()`). Array methods are the idiomatic way — they replace Java Streams with less boilerplate.", comparisons: [
            { concept: "Enhanced for → for...of", knownCode: "for (String word : words) {\n    System.out.println(word);\n}", targetCode: "for (const word of words) {\n    console.log(word);\n}", note: "`of` not `in`! `for...in` gives keys (as strings)." },
            { concept: "Stream API → Array methods", knownCode: "list.stream()\n    .filter(x -> x > 0)\n    .map(x -> x * 2)\n    .collect(Collectors.toList())", targetCode: "const result = list\n    .filter(x => x > 0)\n    .map(x => x * 2);", note: "No `.stream()` or `.collect()` needed. Arrays have methods built-in." },
            { concept: "Stream.reduce → Array.reduce", knownCode: "nums.stream().reduce(0, Integer::sum)", targetCode: "const sum = nums.reduce((acc, n) => acc + n, 0);" },
          ], realWorld: "Array methods (map/filter/reduce) are used everywhere in React, Node.js, and modern JS. Master them.",
          exercise: { id: "ex-java-js-loops-1", prompt: "Given [1,2,3,4,5], use .filter() and .map() to get doubled even numbers.", starterCode: "const nums = [1, 2, 3, 4, 5];\n// Filter evens, then double\n", solution: "const nums = [1, 2, 3, 4, 5];\nconst result = nums.filter(x => x % 2 === 0).map(x => x * 2);\nconsole.log(result);", expectedOutputIncludes: "4,8", xp: 30 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-js-loop-1", prompt: "Java's enhanced for → JS…", choices: ["for...in", "for...of", "forEach", "for (var x : items)"], correctIndex: 1, explanation: "`for...of` iterates values. `for...in` iterates keys (avoid for arrays).", xp: 10 },
        { kind: "mcq", id: "q-java-js-loop-2", prompt: "Java Streams are replaced by JS…", choices: ["Streams API", "Array methods (map/filter/reduce)", "For loops only", "Generators"], correctIndex: 1, explanation: "Array methods are built-in and don't need `.stream()` or `.collect()`.", xp: 10 },
        { kind: "mcq", id: "q-java-js-loop-3", prompt: "`.reduce()` accumulates values into…", choices: ["An array", "A single result", "A boolean", "A Map"], correctIndex: 1, explanation: "Reduce folds an array into one value using an accumulator function.", xp: 10 },
        { kind: "debug", id: "q-java-js-loop-4", prompt: "Why does `for...in` give string keys?", brokenCode: "const arr = [10, 20, 30];\nfor (const i in arr) console.log(typeof i);  // 'string'!", choices: ["`for...in` iterates object keys (strings) — use `for...of` for values", "Arrays don't have types", "in operator is broken", "Missing const"], correctIndex: 0, explanation: "`for...in` gives keys as strings ('0', '1', '2'). Use `for...of` for array values.", xp: 15 },
        { kind: "mcq", id: "q-java-js-loop-5", prompt: "`.map()` returns…", choices: ["undefined", "A new array with transformed elements", "The original array, modified", "A boolean"], correctIndex: 1, explanation: "`.map()` creates a new array — it never mutates the original.", xp: 10 },
      ],
    },
    { id: "java-js-functions", title: "Functions & Closures", tagline: "Arrow functions, closures, and no overloading.", icon: "⚔️", level: "beginner", order: 4, requires: ["java-js-loops"], rewardXp: 90,
      lessons: [
        { id: "lesson-java-js-fn-1", title: "Functions are first-class", intro: "JS has free functions, arrow functions (`=>`), and closures. Functions are values — pass them, store them, return them. No method overloading — use default params or rest params (`...args`). Arrow functions inherit `this` from their enclosing scope.", comparisons: [
            { concept: "Method → Function", knownCode: "public static int add(int a, int b) {\n    return a + b;\n}", targetCode: "function add(a, b) {\n    return a + b;\n}\n// Or: const add = (a, b) => a + b;" },
            { concept: "Lambda → Arrow", knownCode: "x -> x * 2", targetCode: "x => x * 2", note: "Arrow: implicit return for single expressions. No functional interface needed." },
            { concept: "Overloading → Default params", knownCode: "void log(String msg) { ... }\nvoid log(String msg, int level) { ... }", targetCode: "function log(msg, level = 0) {\n    console.log(`[${level}] ${msg}`);\n}" },
            { concept: "Closures", knownCode: "// Java: effectively-final captured variables", targetCode: "function counter() {\n    let n = 0;\n    return () => ++n;\n}\nconst inc = counter();\ninc(); // 1\ninc(); // 2", note: "JS closures capture by reference. Variables can be mutated." },
          ], realWorld: "Arrow functions are used everywhere in modern JS — callbacks, event handlers, React components.",
          exercise: { id: "ex-java-js-fn-1", prompt: "Write a `counter` closure. Each call should return the next number. Start from 1.", starterCode: "function counter() {\n    // Return a function\n}\n", solution: "function counter() {\n    let n = 0;\n    return () => ++n;\n}\nconst inc = counter();\nconsole.log(inc()); // 1\nconsole.log(inc()); // 2", expectedOutputIncludes: "1", xp: 30 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-js-fn-1", prompt: "`(a, b) => a + b` is a JS…", choices: ["Method", "Arrow function", "Lambda expression", "Both B and C"], correctIndex: 3, explanation: "Arrow functions are JS's lambda expressions.", xp: 10 },
        { kind: "mcq", id: "q-java-js-fn-2", prompt: "Does JS support method overloading?", choices: ["Yes", "No — use default params or ...rest", "Only for constructors", "Only with TypeScript"], correctIndex: 1, explanation: "JS functions have dynamic arity. Use defaults and rest params.", xp: 10 },
        { kind: "mcq", id: "q-java-js-fn-3", prompt: "JS closures capture variables by…", choices: ["Value only", "Reference (can mutate)", "Copy-on-write", "Not at all"], correctIndex: 1, explanation: "JS closures capture by reference. Unlike Java's 'effectively final' restriction.", xp: 10 },
        { kind: "debug", id: "q-java-js-fn-4", prompt: "Why does this return undefined?", brokenCode: "const add = (a, b) => {\n    a + b;\n};", choices: ["Missing `return` — braces require explicit return", "Arrow can't use braces", "a + b is invalid", "Missing semicolons"], correctIndex: 0, explanation: "With `{}`, you must `return`. Without `{}`, the expression is implicitly returned.", xp: 15 },
        { kind: "mcq", id: "q-java-js-fn-5", prompt: "Template literals use…", choices: ["\"string\" + var", "`string ${var}`", "f\"string {var}\"", "'string' + var"], correctIndex: 1, explanation: "Backtick strings with `${expression}` interpolation.", xp: 10 },
      ],
    },
    { id: "java-js-collections", title: "Arrays & Objects", tagline: "JSON objects, destructuring, and spread.", icon: "📜", level: "beginner", order: 5, requires: ["java-js-functions"], rewardXp: 100,
      lessons: [
        { id: "lesson-java-js-col-1", title: "Arrays and objects", intro: "JS arrays are dynamic and heterogeneous. Objects are key-value maps (like HashMap but with JSON syntax). Destructuring extracts values concisely. Spread (`...`) copies and merges. `Map` and `Set` exist but plain objects/arrays are more common.", comparisons: [
            { concept: "ArrayList → Array", knownCode: "List<Integer> nums = new ArrayList<>(List.of(1, 2, 3));\nnums.add(4);", targetCode: "const nums = [1, 2, 3];\nnums.push(4);  // const allows mutation!" },
            { concept: "HashMap → Object", knownCode: "Map<String, Integer> m = new HashMap<>();\nm.put(\"Ada\", 36);", targetCode: "const m = { Ada: 36 };\nm.Bob = 25;\nconsole.log(m.Ada);  // 36" },
            { concept: "Destructuring", knownCode: "String name = user.getName();\nint age = user.getAge();", targetCode: "const { name, age } = user;\n// Array: const [first, ...rest] = [1, 2, 3];" },
            { concept: "Spread/merge", knownCode: "// Collections.addAll or Stream.concat", targetCode: "const merged = { ...obj1, ...obj2 };\nconst combined = [...arr1, ...arr2];" },
          ], realWorld: "Destructuring and spread are in virtually every JS codebase. They make code dramatically more concise.",
          exercise: { id: "ex-java-js-col-1", prompt: "Create object `user = {name: 'Ada', age: 36}`. Destructure name and age, then log them.", starterCode: "// Create and destructure\n", solution: "const user = { name: 'Ada', age: 36 };\nconst { name, age } = user;\nconsole.log(`${name} is ${age}`);", expectedOutputIncludes: "Ada", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-js-col-1", prompt: "`const arr = [1]; arr.push(2)` — works?", choices: ["No — const", "Yes — const prevents reassignment, not mutation", "Only with let", "Type error"], correctIndex: 1, explanation: "`const` freezes the binding, not the value. The array can still be mutated.", xp: 10 },
        { kind: "mcq", id: "q-java-js-col-2", prompt: "`{...a, ...b}` does what?", choices: ["Adds a and b", "Shallow merges objects a and b", "Deep copies a and b", "Destructures a and b"], correctIndex: 1, explanation: "Spread merges own-enumerable properties. Later keys override.", xp: 10 },
        { kind: "mcq", id: "q-java-js-col-3", prompt: "Destructuring `const {x, y} = point` is like Java's…", choices: ["Record deconstruction (Java 21+)", "getX() and getY() calls", "Pattern matching", "No equivalent"], correctIndex: 0, explanation: "Record patterns in Java 21+ are the closest equivalent.", xp: 10 },
        { kind: "debug", id: "q-java-js-col-4", prompt: "Why does `user.name` work but `user.first-name` doesn't?", brokenCode: "const user = { 'first-name': 'Ada' };\nconsole.log(user.first-name);  // NaN!", choices: ["Hyphens need bracket notation: `user['first-name']`", "Hyphens aren't allowed", "user is frozen", "Missing quotes"], correctIndex: 0, explanation: "`user.first-name` is interpreted as `user.first - name`. Use `user['first-name']`.", xp: 15 },
        { kind: "mcq", id: "q-java-js-col-5", prompt: "`const [a, ...rest] = [1,2,3,4]` gives…", choices: ["a=1, rest=[2,3,4]", "a=[1], rest=[2,3,4]", "Error", "a=1, rest=2"], correctIndex: 0, explanation: "Array destructuring: first element → `a`, rest → `rest` array.", xp: 10 },
      ],
    },
    // ===================== INTERMEDIATE =====================
    { id: "java-js-oop", title: "Classes & Prototypes", tagline: "ES6 classes and the `this` problem.", icon: "👑", level: "intermediate", order: 1, requires: [], rewardXp: 120,
      lessons: [
        { id: "lesson-java-js-oop-1", title: "JS classes", intro: "JS classes (ES6+) look like Java but are syntactic sugar over prototypes. `constructor` replaces Java constructors. `#field` for private (ES2022+). `this` is dynamic — determined by how a method is called, not where it's defined. This is JS's biggest OOP footgun.", comparisons: [
            { concept: "Class", knownCode: "public class Dog {\n    private String name;\n    public Dog(String name) { this.name = name; }\n    public String bark() { return name + \" barks!\"; }\n}", targetCode: "class Dog {\n    #name;  // Private field\n    constructor(name) {\n        this.#name = name;\n    }\n    bark() {\n        return `${this.#name} barks!`;\n    }\n}" },
            { concept: "Extends", knownCode: "class Puppy extends Dog { ... }", targetCode: "class Puppy extends Dog {\n    constructor(name) {\n        super(name);  // Must call super first\n    }\n}" },
          ], realWorld: "Many JS developers prefer functions + closures over classes. React moved from class to function components.",
          exercise: { id: "ex-java-js-oop-1", prompt: "Create class `Counter` with `#count = 0`, `inc()`, `getCount()`. Increment twice, log count.", starterCode: "class Counter {\n    // ...\n}\n", solution: "class Counter {\n    #count = 0;\n    inc() { this.#count++; }\n    getCount() { return this.#count; }\n}\nconst c = new Counter();\nc.inc(); c.inc();\nconsole.log(c.getCount());", expectedOutputIncludes: "2", xp: 35 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-js-oop-1", prompt: "`#field` in JS makes it…", choices: ["Protected", "Truly private (ES2022+)", "Static", "Read-only"], correctIndex: 1, explanation: "`#` prefix is truly private — not accessible outside the class.", xp: 10 },
        { kind: "debug", id: "q-java-js-oop-2", prompt: "Why does `this` become undefined?", brokenCode: "class Timer {\n    constructor() { this.s = 0; }\n    tick() { this.s++; }\n}\nsetTimeout(new Timer().tick, 100);", choices: ["Method reference loses `this` — use arrow or .bind()", "setTimeout is wrong", "Missing new", "tick is async"], correctIndex: 0, explanation: "Passing `obj.method` as callback detaches `this`. Fix: `() => t.tick()` or `t.tick.bind(t)`.", xp: 15 },
        { kind: "mcq", id: "q-java-js-oop-3", prompt: "JS classes are sugar over…", choices: ["Interfaces", "Prototypal inheritance", "Abstract classes", "Structs"], correctIndex: 1, explanation: "Under the hood, JS uses prototype chains for inheritance.", xp: 10 },
        { kind: "mcq", id: "q-java-js-oop-4", prompt: "Java's `this` vs JS `this`:", choices: ["Same thing", "Java: always the instance. JS: depends on how method is called", "JS: always the class", "Java: dynamic like JS"], correctIndex: 1, explanation: "JS `this` is dynamic — determined at call time, not definition time.", xp: 10 },
        { kind: "mcq", id: "q-java-js-oop-5", prompt: "How to ensure `this` in a callback?", choices: ["Use arrow function or .bind()", "Use var instead of const", "Add static keyword", "Use self keyword"], correctIndex: 0, explanation: "Arrow functions inherit `this` from scope. `.bind()` locks `this`.", xp: 10 },
      ],
    },
    { id: "java-js-errors", title: "Error Handling", tagline: "No checked exceptions — plus async errors.", icon: "🔥", level: "intermediate", order: 2, requires: ["java-js-oop"], rewardXp: 110,
      lessons: [
        { id: "lesson-java-js-err-1", title: "Exceptions and async errors", intro: "JS uses `try/catch/finally` — same structure. No checked exceptions. You can throw anything (but should throw `Error` objects). Async errors need `.catch()` or `try/catch` with `await`. Unhandled promise rejections crash Node.js.", comparisons: [
            { concept: "try/catch", knownCode: "try {\n    risky();\n} catch (Exception e) {\n    System.err.println(e.getMessage());\n}", targetCode: "try {\n    risky();\n} catch (error) {\n    console.error(error.message);\n}", note: "JS catch doesn't filter by type — check with `instanceof` inside." },
            { concept: "Throw", knownCode: "throw new RuntimeException(\"fail\");", targetCode: "throw new Error('fail');", note: "Always throw `Error` objects for stack traces." },
            { concept: "try-with-resources → finally", knownCode: "try (var r = getResource()) { ... }", targetCode: "let resource;\ntry {\n    resource = getResource();\n} finally {\n    resource?.close();\n}", note: "JS has no try-with-resources. Use `finally` or wrapper patterns." },
          ], realWorld: "In Node.js, unhandled promise rejections cause `process.exit(1)`. Always handle async errors.",
          exercise: { id: "ex-java-js-err-1", prompt: "Write a `safeParse(json)` function using try/catch that returns null on invalid JSON.", starterCode: "function safeParse(json) {\n    // ...\n}\n", solution: "function safeParse(json) {\n    try {\n        return JSON.parse(json);\n    } catch (e) {\n        return null;\n    }\n}\nconsole.log(safeParse('invalid'));", expectedOutputIncludes: "null", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-js-err-1", prompt: "Does JS have checked exceptions?", choices: ["Yes", "No — all exceptions are unchecked", "Only with TypeScript", "Only for async"], correctIndex: 1, explanation: "JS never forces you to catch or declare exceptions.", xp: 10 },
        { kind: "mcq", id: "q-java-js-err-2", prompt: "Can you throw a string in JS?", choices: ["No", "Yes, but shouldn't — no stack trace", "Only in strict mode", "Only Error objects"], correctIndex: 1, explanation: "JS lets you throw anything. Always use `new Error()` for stack traces.", xp: 10 },
        { kind: "debug", id: "q-java-js-err-3", prompt: "Why does this crash Node.js?", brokenCode: "fetch('https://bad.url').then(r => r.json());", choices: ["Unhandled promise rejection — add .catch()", "fetch is synchronous", "json() is wrong", "URL is wrong"], correctIndex: 0, explanation: "Always add `.catch()` or use `try/catch` with `await`.", xp: 15 },
        { kind: "mcq", id: "q-java-js-err-3b", prompt: "JS `finally` runs…", choices: ["Only on error", "Only on success", "Always", "Never in async"], correctIndex: 2, explanation: "`finally` always runs, regardless of error — same as Java.", xp: 10 },
        { kind: "mcq", id: "q-java-js-err-4", prompt: "Async error handling uses…", choices: [".catch() or try/catch with await", "throws declaration", "checked exceptions", "error() callback only"], correctIndex: 0, explanation: "Both patterns work for Promise error handling.", xp: 10 },
      ],
    },
    { id: "java-js-modules", title: "Modules & npm", tagline: "import/export and the npm ecosystem.", icon: "📦", level: "intermediate", order: 3, requires: ["java-js-errors"], rewardXp: 100,
      lessons: [
        { id: "lesson-java-js-mod-1", title: "ES Modules and npm", intro: "JS uses `import`/`export` (ES Modules). npm manages dependencies from the npm registry (2M+ packages). `package.json` is the project manifest. No compilation step — JS is interpreted (or JIT-compiled by V8).", comparisons: [
            { concept: "Import", knownCode: "import java.util.List;\nimport com.myapp.Utils;", targetCode: "import { List } from './list.js';\nimport Utils from './utils.js';", note: "Named exports: `{ }`. Default exports: no braces." },
            { concept: "Export", knownCode: "// Public class in a .java file", targetCode: "export function add(a, b) { return a + b; }\nexport default class App { ... }" },
            { concept: "Package manager", knownCode: "// Maven: pom.xml dependencies", targetCode: "// npm install express\n// package.json tracks dependencies" },
          ], realWorld: "npm is the largest package registry in the world. `package-lock.json` ensures reproducible builds.",
          exercise: { id: "ex-java-js-mod-1", prompt: "Write a module exporting function `greet(name)` and constant VERSION. Show import syntax.", starterCode: "// greet.js\n", solution: "// greet.js\nexport const VERSION = '1.0';\nexport function greet(name) {\n    return `Hello, ${name}!`;\n}\n// import { greet, VERSION } from './greet.js';", expectedOutputIncludes: "export", xp: 20 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-js-mod-1", prompt: "Java packages → JS…", choices: ["Packages", "ES Modules (import/export)", "Namespaces", "Classes"], correctIndex: 1, explanation: "Each file is a module with `import`/`export`.", xp: 10 },
        { kind: "mcq", id: "q-java-js-mod-2", prompt: "Maven/Gradle → JS…", choices: ["webpack", "npm", "babel", "eslint"], correctIndex: 1, explanation: "npm (or yarn, pnpm) manages JS dependencies.", xp: 10 },
        { kind: "debug", id: "q-java-js-mod-3", prompt: "Why does this fail?", brokenCode: "import add from './math.js';\n// math.js has: export function add(a, b) { ... }", choices: ["Named export needs braces: `import { add }`", "add doesn't exist", "Missing npm install", "Wrong extension"], correctIndex: 0, explanation: "Named exports use `{ }`. Only `export default` imports without braces.", xp: 15 },
        { kind: "mcq", id: "q-java-js-mod-4", prompt: "`package.json` is like…", choices: ["pom.xml / build.gradle", "Main.java", "classpath", "MANIFEST.MF"], correctIndex: 0, explanation: "It defines project metadata, dependencies, and scripts.", xp: 10 },
      ],
    },
    { id: "java-js-functional", title: "Functional Patterns", tagline: "Higher-order functions and immutability.", icon: "⚡", level: "intermediate", order: 4, requires: ["java-js-modules"], rewardXp: 130,
      lessons: [
        { id: "lesson-java-js-func-1", title: "Functional JavaScript", intro: "JS excels at functional programming. Functions are first-class, closures are natural, and array methods encourage immutable pipelines. Key patterns: pure functions, immutability (spread + Object.freeze), composition, and currying.", comparisons: [
            { concept: "Stream chain → Method chain", knownCode: "nums.stream()\n    .filter(x -> x > 0)\n    .map(x -> x * 2)\n    .collect(Collectors.toList())", targetCode: "const result = nums\n    .filter(x => x > 0)\n    .map(x => x * 2);", note: "No `.stream()` or `.collect()`. Built into arrays." },
            { concept: "Functional interface → Just a function", knownCode: "Function<Integer, Integer> fn = x -> x * 2;", targetCode: "const fn = x => x * 2;  // No type needed", note: "JS doesn't need functional interface types." },
            { concept: "Currying", knownCode: "// Complex in Java", targetCode: "const multiply = a => b => a * b;\nconst double = multiply(2);\ndouble(5); // 10" },
          ], realWorld: "React, Redux, and functional programming patterns dominate modern JS development.",
          exercise: { id: "ex-java-js-func-1", prompt: "Write a `pipe` function that composes functions left-to-right. Test: pipe(x=>x*2, x=>x+1)(3) → 7.", starterCode: "const pipe = (...fns) => ???;\n", solution: "const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);\nconsole.log(pipe(x => x * 2, x => x + 1)(3));", expectedOutputIncludes: "7", xp: 45 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-js-func-1", prompt: "JS doesn't need functional interfaces because…", choices: ["It has interfaces", "Functions are already first-class values", "It uses classes", "It has generics"], correctIndex: 1, explanation: "Any function can be passed around — no wrapper type needed.", xp: 10 },
        { kind: "mcq", id: "q-java-js-func-2", prompt: "`Object.freeze(obj)` does…", choices: ["Deep clone", "Shallow immutability", "Delete", "Nothing"], correctIndex: 1, explanation: "Prevents adding/modifying/deleting properties (shallow only).", xp: 10 },
        { kind: "mcq", id: "q-java-js-func-3", prompt: "Currying: `a => b => a + b` creates…", choices: ["An error", "A chain of single-argument functions", "A multi-arg function", "A class"], correctIndex: 1, explanation: "Each call returns a new function until all args are provided.", xp: 10 },
        { kind: "debug", id: "q-java-js-func-4", prompt: "Why doesn't `.sort()` work as expected?", brokenCode: "[10, 2, 30, 1].sort()  // [1, 10, 2, 30] — wrong!", choices: ["Default sort converts to strings — use `.sort((a,b) => a-b)` for numeric sort", "sort is broken", "Array is immutable", "Missing comparator type"], correctIndex: 0, explanation: "`.sort()` without comparator sorts as strings. '10' < '2' lexicographically.", xp: 15 },
        { kind: "mcq", id: "q-java-js-func-5", prompt: "A pure function has…", choices: ["No parameters", "No side effects and deterministic output", "No return value", "No closures"], correctIndex: 1, explanation: "Same inputs → same output, no side effects.", xp: 10 },
      ],
    },
    // ===================== ADVANCED =====================
    { id: "java-js-async", title: "Async Programming", tagline: "Event loop, Promises, and async/await.", icon: "🔄", level: "advanced", order: 1, requires: [], rewardXp: 170,
      lessons: [
        { id: "lesson-java-js-async-1", title: "The event loop", intro: "JS is single-threaded with an event loop. Async operations (I/O, timers, network) are non-blocking. Promises represent eventual values. `async/await` makes async code look synchronous. This is fundamentally different from Java's multi-threaded model.", comparisons: [
            { concept: "Thread → Event loop", knownCode: "Thread t = new Thread(() -> task());\nt.start();", targetCode: "// JS is single-threaded — no Thread class\n// Async operations use the event loop\nsetTimeout(() => task(), 0);", note: "JS doesn't have threads (Web Workers are separate). It has async I/O." },
            { concept: "CompletableFuture → Promise", knownCode: "CompletableFuture.supplyAsync(() -> compute())\n    .thenApply(r -> process(r))\n    .thenAccept(System.out::println);", targetCode: "computeAsync()\n    .then(r => process(r))\n    .then(console.log)\n    .catch(console.error);" },
            { concept: "Async/await", knownCode: "// Java has no direct equivalent\nvar future = CompletableFuture.supplyAsync(this::compute);\nvar result = future.get();", targetCode: "const result = await computeAsync();\nconsole.log(result);", note: "`await` pauses the function until the Promise resolves." },
          ], realWorld: "Node.js handles thousands of concurrent connections on one thread via the event loop. Java needs threads for each.",
          exercise: { id: "ex-java-js-async-1", prompt: "Write an async function that returns 'hello' after resolving a Promise. Call it and log the result.", starterCode: "// async function greetAsync() { ... }\n", solution: "async function greetAsync() {\n    return new Promise(resolve => {\n        resolve('hello');\n    });\n}\ngreetAsync().then(msg => console.log(msg));", expectedOutputIncludes: "hello", xp: 40 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-js-async-1", prompt: "JS is… threaded.", choices: ["Multi", "Single (with event loop)", "Variable", "Dual"], correctIndex: 1, explanation: "One thread, non-blocking I/O via the event loop.", xp: 10 },
        { kind: "mcq", id: "q-java-js-async-2", prompt: "`async function` always returns…", choices: ["void", "A Promise", "A value", "undefined"], correctIndex: 1, explanation: "Async functions wrap their return value in a Promise.", xp: 10 },
        { kind: "mcq", id: "q-java-js-async-3", prompt: "`Promise.all()` does…", choices: ["Runs sequentially", "Waits for all promises to resolve", "Cancels on first failure", "Creates threads"], correctIndex: 1, explanation: "Resolves when all fulfill. Rejects if any one rejects.", xp: 10 },
        { kind: "debug", id: "q-java-js-async-4", prompt: "Why does '2' print before '1'?", brokenCode: "setTimeout(() => console.log('1'), 0);\nconsole.log('2');", choices: ["setTimeout is async — synchronous code ('2') runs first", "Math error", "setTimeout is broken", "console.log is async"], correctIndex: 0, explanation: "Even with 0ms delay, setTimeout is a macrotask. Synchronous code runs first.", xp: 15 },
        { kind: "mcq", id: "q-java-js-async-5", prompt: "Microtasks (Promises) run before…", choices: ["Synchronous code", "Macrotasks (setTimeout, I/O)", "Nothing", "Garbage collection"], correctIndex: 1, explanation: "After call stack: microtasks first, then one macrotask.", xp: 10 },
      ],
    },
    { id: "java-js-memory", title: "Runtime & Performance", tagline: "V8 engine, GC, and optimization.", icon: "🧠", level: "advanced", order: 2, requires: ["java-js-async"], rewardXp: 150,
      lessons: [
        { id: "lesson-java-js-mem-1", title: "V8 and memory", intro: "JS runs on engines like V8 (Chrome, Node.js). V8 uses mark-and-sweep GC and JIT compilation. Common memory leaks: closures, forgotten timers/listeners, detached DOM nodes. V8 optimizes for consistent object shapes (hidden classes).", comparisons: [
            { concept: "GC", knownCode: "// JVM: generational GC with G1/ZGC", targetCode: "// V8: generational mark-and-sweep\n// Young gen (Scavenger) + Old gen\n// Similar concepts!", note: "V8's GC is simpler than JVM but effective for JS workloads." },
            { concept: "JIT", knownCode: "// JVM: C1/C2 tiered compilation", targetCode: "// V8: Ignition (interpreter) → TurboFan (JIT)\n// Optimizes hot functions to native code", note: "Both JVM and V8 JIT-compile hot code. V8 is faster to start." },
          ], realWorld: "Use Chrome DevTools Performance and Memory tabs for profiling. WeakRef/WeakMap for GC-friendly caches.",
          exercise: { id: "ex-java-js-mem-1", prompt: "Write a comment explaining why setInterval without clearInterval is a memory leak.", starterCode: "// Explain the leak:\n", solution: "// setInterval creates a repeating timer that holds a reference to the callback\n// and its closure. Without clearInterval, it runs forever, preventing GC\n// from collecting referenced objects.\nconst id = setInterval(() => console.log('tick'), 1000);\n// Fix: clearInterval(id) when done", expectedOutputIncludes: "", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-js-mem-1", prompt: "V8 uses… for GC.", choices: ["Reference counting", "Mark-and-sweep (generational)", "Manual free", "RAII"], correctIndex: 1, explanation: "V8 has young/old gen, similar to JVM's generational GC.", xp: 10 },
        { kind: "mcq", id: "q-java-js-mem-2", prompt: "Common JS memory leak source:", choices: ["Using const", "Forgotten timers/event listeners", "Template literals", "Arrow functions"], correctIndex: 1, explanation: "setInterval, addEventListener without cleanup hold references indefinitely.", xp: 10 },
        { kind: "debug", id: "q-java-js-mem-3", prompt: "Why is this a performance anti-pattern?", brokenCode: "const obj = {};\nfor (let i = 0; i < 1000; i++) {\n    obj['prop' + i] = i;  // Dynamic properties!\n}", choices: ["Adding dynamic properties defeats V8's hidden class optimization", "Loops are slow", "obj needs const", "Missing type"], correctIndex: 0, explanation: "V8 optimizes objects with consistent shapes. Dynamic properties deoptimize.", xp: 15 },
        { kind: "mcq", id: "q-java-js-mem-3b", prompt: "V8's TurboFan is a…", choices: ["Garbage collector", "JIT compiler for hot code", "Debugger", "Package manager"], correctIndex: 1, explanation: "TurboFan optimizes frequently-run functions to native code.", xp: 10 },
        { kind: "mcq", id: "q-java-js-mem-4", prompt: "`WeakRef` in JS allows…", choices: ["Weak typing", "References that don't prevent garbage collection", "Weak encryption", "Thread safety"], correctIndex: 1, explanation: "WeakRef holds a reference that the GC can still collect.", xp: 10 },
      ],
    },
    { id: "java-js-advanced", title: "Advanced Patterns", tagline: "Proxies, generators, and metaprogramming.", icon: "✨", level: "advanced", order: 3, requires: ["java-js-memory"], rewardXp: 200,
      lessons: [
        { id: "lesson-java-js-adv-1", title: "Generators, proxies, and symbols", intro: "JS generators (`function*`) yield values lazily — like Java's iterator but with `yield`. Proxies intercept object operations (get, set, delete) — like Java's InvocationHandler but more powerful. Symbols are unique keys for metaprogramming.", comparisons: [
            { concept: "Iterator → Generator", knownCode: "class FibIterator implements Iterator<Integer> {\n    // ... hasNext(), next() ...\n}", targetCode: "function* fibonacci() {\n    let [a, b] = [0, 1];\n    while (true) {\n        yield a;\n        [a, b] = [b, a + b];\n    }\n}", note: "Generators make iterators trivial. `yield` suspends and resumes." },
            { concept: "Dynamic proxy → Proxy", knownCode: "Proxy.newProxyInstance(loader, interfaces, handler)", targetCode: "const handler = {\n    get(target, prop) {\n        return prop in target ? target[prop] : 'default';\n    }\n};\nconst p = new Proxy({}, handler);", note: "JS Proxies are more powerful — intercept 13+ operations." },
          ], realWorld: "Vue.js uses Proxies for reactivity. Generators power async iteration in Node.js streams.",
          exercise: { id: "ex-java-js-adv-1", prompt: "Write a generator that yields squares of 1 through 5. Print them.", starterCode: "function* squares(n) {\n    // ...\n}\n", solution: "function* squares(n) {\n    for (let i = 1; i <= n; i++) {\n        yield i * i;\n    }\n}\nfor (const s of squares(5)) console.log(s);", expectedOutputIncludes: "1\n4\n9\n16\n25", xp: 45 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-js-adv-1", prompt: "`function*` declares a…", choices: ["Async function", "Generator function", "Constructor", "Static method"], correctIndex: 1, explanation: "The asterisk marks a generator. `yield` produces values lazily.", xp: 10 },
        { kind: "mcq", id: "q-java-js-adv-2", prompt: "JS Proxies can intercept…", choices: ["Only get/set", "Any object operation (get, set, delete, has, etc.)", "Only function calls", "Only property access"], correctIndex: 1, explanation: "Proxies support 13+ traps: get, set, deleteProperty, has, apply, construct, etc.", xp: 10 },
        { kind: "mcq", id: "q-java-js-adv-3", prompt: "Symbols are used for…", choices: ["String encryption", "Unique, collision-free object keys", "Math operations", "Type annotations"], correctIndex: 1, explanation: "Symbols are unique identifiers, used for metaprogramming like `Symbol.iterator`.", xp: 10 },
        { kind: "debug", id: "q-java-js-adv-4", prompt: "Why does this generator produce nothing?", brokenCode: "function* nums() {\n    return [1, 2, 3];\n}\nfor (const n of nums()) console.log(n);", choices: ["`return` ends the generator. Use `yield` or `yield*` instead", "for...of doesn't work", "Missing function call", "Array can't be returned"], correctIndex: 0, explanation: "`return` marks the generator as done. Use `yield* [1,2,3]` to yield each value.", xp: 15 },
        { kind: "mcq", id: "q-java-js-adv-5", prompt: "`yield*` delegates to…", choices: ["Another thread", "Another generator or iterable", "A promise", "A callback"], correctIndex: 1, explanation: "`yield*` forwards iteration to another iterable.", xp: 10 },
      ],
    },
  ],
};
