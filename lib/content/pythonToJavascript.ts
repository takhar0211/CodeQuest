import type { Course } from "@/lib/types";

export const pythonToJavascript: Course = {
  id: "python-to-javascript",
  knownLang: "python",
  targetLang: "javascript",
  title: "Python → JavaScript",
  modules: [
    // ===================== BEGINNER =====================
    { id: "py-js-variables", title: "Variables & Types", tagline: "let, const, and the semicolon surprise.", icon: "🏰", level: "beginner", order: 1, requires: [], rewardXp: 60,
      lessons: [
        { id: "lesson-py-js-vars-1", title: "let, const, and dynamic types", intro: "JS is dynamically typed like Python — no type declarations. Use `const` (immutable binding) by default, `let` for reassignment. Avoid `var` (legacy). JS has `null` AND `undefined`. All numbers are 64-bit doubles. Use `===` for strict equality (no type coercion).", comparisons: [
            { concept: "Declaration", knownCode: "count = 0\nname = 'Ada'\ndone = True", targetCode: "let count = 0;\nconst name = 'Ada';\nlet done = true;", note: "No types needed. `True/False/None` → `true/false/null`. Semicolons optional but standard." },
            { concept: "No integer type", knownCode: "a = 42\nb = 3.14\nc = 10 ** 100  # Big int", targetCode: "const a = 42;       // Double\nconst b = 3.14;     // Same type!\nconst c = 10n ** 100n; // BigInt", note: "JS has one number type (double). Use `n` suffix for BigInt." },
            { concept: "None → null/undefined", knownCode: "x = None\nif x is None: ...", targetCode: "let x = null;    // Intentional nothing\nlet y;           // undefined (never assigned)\nif (x === null) { ... }", note: "JS has both `null` and `undefined`. Python has only `None`." },
            { concept: "Equality", knownCode: "if a == b: ...  # Compares values", targetCode: "if (a === b) { ... }  // Strict equality\n// a == b does type coercion — avoid!", note: "Always use `===` and `!==` in JavaScript." },
          ], realWorld: "TypeScript adds Python-like type hints to JS but enforced at compile time. Many teams use it.",
          exercise: { id: "ex-py-js-vars-1", prompt: "Declare const `name` as 'Ada', let `age` as 36. Log them with a template literal.", starterCode: "// Declare and log\n", solution: "const name = 'Ada';\nlet age = 36;\nconsole.log(`${name} is ${age}`);", expectedOutputIncludes: "Ada is 36", xp: 20 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-py-js-var-1", prompt: "Python's `True` becomes JS…", choices: ["True", "true", "TRUE", "1"], correctIndex: 1, explanation: "JS booleans are lowercase: `true`, `false`.", xp: 10 },
        { kind: "mcq", id: "q-py-js-var-2", prompt: "Why `===` instead of `==`?", choices: ["Faster", "No type coercion — '5' == 5 is true!", "Required", "No difference"], correctIndex: 1, explanation: "`===` checks type AND value. `==` coerces types.", xp: 10 },
        { kind: "mcq", id: "q-py-js-var-3", prompt: "`None` becomes…", choices: ["none", "null", "undefined", "null or undefined (both exist)"], correctIndex: 3, explanation: "JS has both. `null` = intentional nothing. `undefined` = never assigned.", xp: 10 },
        { kind: "debug", id: "q-py-js-var-4", prompt: "Why does `'5' + 1` give '51'?", brokenCode: "console.log('5' + 1);  // '51' not 6!", choices: ["`+` with string does concatenation — use Number('5') + 1", "JS can't add", "Missing parseInt", "Bug in console.log"], correctIndex: 0, explanation: "String + anything = concatenation. Convert first.", xp: 15 },
        { kind: "mcq", id: "q-py-js-var-5", prompt: "Default variable declaration should be…", choices: ["var", "let", "const", "int"], correctIndex: 2, explanation: "`const` by default. `let` only when reassignment is needed. Never `var`.", xp: 10 },
      ],
    },
    { id: "py-js-controlflow", title: "Control Flow", tagline: "Braces and parens — welcome to C-family syntax.", icon: "🛡️", level: "beginner", order: 2, requires: ["py-js-variables"], rewardXp: 70,
      lessons: [
        { id: "lesson-py-js-cf-1", title: "Conditionals", intro: "JS uses braces `{}` for blocks and parens `()` around conditions. `elif` becomes `else if`. JS has truthiness: 6 falsy values. Optional chaining (`?.`) and nullish coalescing (`??`) replace many if-checks.", comparisons: [
            { concept: "if/elif/else", knownCode: "if score > 90:\n    print('A')\nelif score > 75:\n    print('B')\nelse:\n    print('C')", targetCode: "if (score > 90) {\n    console.log('A');\n} else if (score > 75) {\n    console.log('B');\n} else {\n    console.log('C');\n}" },
            { concept: "Truthiness comparison", knownCode: "if items:  # Non-empty = True\n    ...", targetCode: "if (items.length) { ... }\n// Note: [] is truthy in JS!\n// Empty string, 0, null, undefined, NaN are falsy", note: "Python `[]` is falsy. JS `[]` is truthy! Use `.length` check." },
            { concept: "Ternary", knownCode: "r = 'yes' if x > 0 else 'no'", targetCode: "const r = (x > 0) ? 'yes' : 'no';", note: "C-style ternary: `condition ? ifTrue : ifFalse`." },
            { concept: "Optional chaining", knownCode: "city = user.address.city if user and user.address else None", targetCode: "const city = user?.address?.city;", note: "`?.` returns undefined if any part is null/undefined." },
          ], realWorld: "`?.` and `??` are used in every modern JS codebase. They drastically reduce null-checking boilerplate.",
          exercise: { id: "ex-py-js-cf-1", prompt: "Use ternary to assign 'even' or 'odd' to result based on n=7. Log result.", starterCode: "const n = 7;\n// Ternary\n", solution: "const n = 7;\nconst result = (n % 2 === 0) ? 'even' : 'odd';\nconsole.log(result);", expectedOutputIncludes: "odd", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-py-js-cf-1", prompt: "Python's `elif` → JS…", choices: ["elif", "elseif", "else if", "elsif"], correctIndex: 2, explanation: "Two separate words: `else if`.", xp: 10 },
        { kind: "mcq", id: "q-py-js-cf-2", prompt: "Is `[]` truthy in JS?", choices: ["No — like Python", "Yes — only primitives can be falsy"], correctIndex: 1, explanation: "Arrays and objects are always truthy in JS (even empty ones).", xp: 10 },
        { kind: "mcq", id: "q-py-js-cf-3", prompt: "`??` vs `||`:", choices: ["Same", "`??` only checks null/undefined, `||` checks all falsy", "`||` is deprecated", "`??` is slower"], correctIndex: 1, explanation: "`0 ?? 5` = 0. `0 || 5` = 5. Big difference for valid falsy values.", xp: 10 },
        { kind: "debug", id: "q-py-js-cf-4", prompt: "Why is this always 'truthy'?", brokenCode: "if ('false') console.log('truthy');", choices: ["Non-empty strings are truthy — even 'false'", "if is broken", "Missing ===", "Quotes are wrong"], correctIndex: 0, explanation: "'false' is a non-empty string = truthy. Compare: `if (x === 'true')`.", xp: 15 },
        { kind: "mcq", id: "q-py-js-cf-5", prompt: "JS ternary syntax:", choices: ["x if cond else y", "cond ? x : y", "cond then x else y", "select(cond, x, y)"], correctIndex: 1, explanation: "C-family ternary: `condition ? valueIfTrue : valueIfFalse`.", xp: 10 },
      ],
    },
    { id: "py-js-loops", title: "Loops & Array Methods", tagline: "for...of, .map(), .filter(), .reduce().", icon: "🌀", level: "beginner", order: 3, requires: ["py-js-controlflow"], rewardXp: 80,
      lessons: [
        { id: "lesson-py-js-loops-1", title: "Modern iteration", intro: "Python's `for x in items:` → JS `for (const x of items)`. No `range()` — use classic for loops. List comprehensions → `.map()` + `.filter()`. Array methods are the idiomatic way to transform data in JS.", comparisons: [
            { concept: "for-each", knownCode: "for word in words:\n    print(word)", targetCode: "for (const word of words) {\n    console.log(word);\n}" },
            { concept: "range loop", knownCode: "for i in range(5):\n    print(i)", targetCode: "for (let i = 0; i < 5; i++) {\n    console.log(i);\n}", note: "No range(). Use classic C-style for loop." },
            { concept: "Comprehension → map/filter", knownCode: "squares = [x**2 for x in nums if x > 0]", targetCode: "const squares = nums\n    .filter(x => x > 0)\n    .map(x => x ** 2);", note: "Chain .filter() and .map() to replace comprehensions." },
            { concept: "sum → reduce", knownCode: "total = sum(nums)", targetCode: "const total = nums.reduce((acc, n) => acc + n, 0);" },
            { concept: "enumerate", knownCode: "for i, item in enumerate(items):\n    print(i, item)", targetCode: "items.forEach((item, i) => {\n    console.log(i, item);\n});", note: ".forEach() callback receives (value, index)." },
          ], realWorld: "Array methods (map/filter/reduce) dominate modern JS. They return new arrays (immutable pattern).",
          exercise: { id: "ex-py-js-loops-1", prompt: "Given [1,2,3,4,5], use .filter() and .map() to get squares of even numbers.", starterCode: "const nums = [1, 2, 3, 4, 5];\n// Filter and map\n", solution: "const nums = [1, 2, 3, 4, 5];\nconst result = nums.filter(x => x % 2 === 0).map(x => x ** 2);\nconsole.log(result);", expectedOutputIncludes: "4,16", xp: 30 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-py-js-loop-1", prompt: "`for x in items` → JS…", choices: ["for (x in items)", "for (const x of items)", "for x of items", "forEach(x, items)"], correctIndex: 1, explanation: "`for...of` for values. `for...in` for keys (avoid on arrays).", xp: 10 },
        { kind: "mcq", id: "q-py-js-loop-2", prompt: "Python comprehensions → JS…", choices: ["Comprehension syntax", ".map() and .filter() chains", "for loops only", "generators"], correctIndex: 1, explanation: "Array methods replace comprehensions with chaining.", xp: 10 },
        { kind: "debug", id: "q-py-js-loop-3", prompt: "Why does `for...in` give strings?", brokenCode: "const arr = [10, 20];\nfor (const i in arr) {\n    console.log(typeof i); // 'string'!\n}", choices: ["`for...in` gives keys as strings. Use `for...of` for values", "typeof is wrong", "Arrays don't have indices", "Missing const"], correctIndex: 0, explanation: "`for...in` iterates object keys. Array indices are string keys.", xp: 15 },
        { kind: "mcq", id: "q-py-js-loop-3b", prompt: ".reduce() accumulates into…", choices: ["An array", "A single value", "A boolean", "A Set"], correctIndex: 1, explanation: "Reduce folds an array into one value.", xp: 10 },
        { kind: "mcq", id: "q-py-js-loop-4", prompt: "JS has `range()`.", choices: ["True", "False — use classic for loop or Array.from"], correctIndex: 1, explanation: "No built-in range. Use `for (let i=0; i<n; i++)` or `Array.from({length: n}, (_, i) => i)`.", xp: 10 },
      ],
    },
    { id: "py-js-functions", title: "Functions & Closures", tagline: "Arrow functions, closures, and `this`.", icon: "⚔️", level: "beginner", order: 4, requires: ["py-js-loops"], rewardXp: 90,
      lessons: [
        { id: "lesson-py-js-fn-1", title: "Functions in JavaScript", intro: "JS has function declarations, function expressions, and arrow functions (`=>`). Arrow functions are concise and inherit `this`. Closures capture outer variables by reference (like Python). Default parameters work similarly. `...rest` = `*args`.", comparisons: [
            { concept: "def → function / arrow", knownCode: "def add(a, b):\n    return a + b", targetCode: "function add(a, b) {\n    return a + b;\n}\n// Or: const add = (a, b) => a + b;" },
            { concept: "lambda → arrow", knownCode: "square = lambda x: x ** 2", targetCode: "const square = x => x ** 2;", note: "Single expression → implicit return (no braces needed)." },
            { concept: "*args → ...rest", knownCode: "def log(*args):\n    print(*args)", targetCode: "function log(...args) {\n    console.log(...args);\n}" },
            { concept: "**kwargs", knownCode: "def config(**kwargs): ...", targetCode: "function config({ theme = 'dark', lang = 'en' } = {}) {\n    // Destructured object parameter\n}", note: "JS uses destructured objects instead of kwargs." },
            { concept: "f-string → template literal", knownCode: "f'Hello, {name}!'", targetCode: "`Hello, ${name}!`", note: "Backticks + `${}` for interpolation." },
          ], realWorld: "Arrow functions are everywhere in modern JS. Named function declarations for top-level, arrows for callbacks.",
          exercise: { id: "ex-py-js-fn-1", prompt: "Write a closure `counter()` that returns a function incrementing a count. Call it 3 times.", starterCode: "function counter() {\n    // ...\n}\n", solution: "function counter() {\n    let n = 0;\n    return () => ++n;\n}\nconst inc = counter();\nconsole.log(inc(), inc(), inc());", expectedOutputIncludes: "1 2 3", xp: 30 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-py-js-fn-1", prompt: "Python's `lambda` → JS…", choices: ["lambda", "Arrow function (=>)", "function*", "def"], correctIndex: 1, explanation: "Arrow: `x => x * 2`. No lambda keyword.", xp: 10 },
        { kind: "mcq", id: "q-py-js-fn-2", prompt: "`*args` → JS…", choices: ["*args", "...rest", "arguments", "params"], correctIndex: 1, explanation: "Rest params: `function f(...args)`. `arguments` is legacy.", xp: 10 },
        { kind: "mcq", id: "q-py-js-fn-3", prompt: "f-strings → JS…", choices: ["f'...'", "Template literals `...${}`", "'...'.format()", "String.format()"], correctIndex: 1, explanation: "Backtick strings with `${expression}` interpolation.", xp: 10 },
        { kind: "debug", id: "q-py-js-fn-4", prompt: "Why returns undefined?", brokenCode: "const f = (x) => { x * 2; };", choices: ["Missing `return` — braces need explicit return", "Arrow can't use braces", "x * 2 is void", "Missing semicolons"], correctIndex: 0, explanation: "With `{}`, must `return`. Without: `(x) => x * 2` returns implicitly.", xp: 15 },
        { kind: "mcq", id: "q-py-js-fn-5", prompt: "`**kwargs` → JS…", choices: ["**kwargs", "Destructured object parameter", "rest params", "No equivalent"], correctIndex: 1, explanation: "`function f({ key1, key2 } = {})` mimics kwargs.", xp: 10 },
      ],
    },
    { id: "py-js-collections", title: "Arrays & Objects", tagline: "JSON objects, destructuring, and spread.", icon: "📜", level: "beginner", order: 5, requires: ["py-js-functions"], rewardXp: 100,
      lessons: [
        { id: "lesson-py-js-col-1", title: "Collections in JS", intro: "Python lists → JS arrays. Python dicts → JS objects (or Map). Destructuring extracts values. Spread (`...`) copies and merges. Strings are similar but use `.length` (property) not `len()` function.", comparisons: [
            { concept: "list → Array", knownCode: "nums = [1, 2, 3]\nnums.append(4)", targetCode: "const nums = [1, 2, 3];\nnums.push(4);", note: ".push() not .append(). const allows mutation!" },
            { concept: "dict → Object", knownCode: "user = {'name': 'Ada', 'age': 36}", targetCode: "const user = { name: 'Ada', age: 36 };\nuser.name  // 'Ada'" },
            { concept: "Slicing", knownCode: "sub = items[1:4]\nrev = items[::-1]", targetCode: "const sub = items.slice(1, 4);\nconst rev = [...items].reverse();", note: "No `[1:4]` syntax. Use `.slice()`. Reverse is in-place — spread first." },
            { concept: "Destructuring", knownCode: "name, age = 'Ada', 36\nfirst, *rest = [1, 2, 3, 4]", targetCode: "const [name, age] = ['Ada', 36];\nconst [first, ...rest] = [1, 2, 3, 4];\nconst { x, y } = point;  // Object destructuring" },
            { concept: "Spread", knownCode: "merged = {**d1, **d2}\ncombined = [*l1, *l2]", targetCode: "const merged = { ...d1, ...d2 };\nconst combined = [...l1, ...l2];", note: "Python `**` and `*` → JS `...`" },
          ], realWorld: "Destructuring and spread are in every modern JS codebase.",
          exercise: { id: "ex-py-js-col-1", prompt: "Create user object {name: 'Ada', age: 36}. Destructure both. Log with template literal.", starterCode: "// Create and destructure\n", solution: "const user = { name: 'Ada', age: 36 };\nconst { name, age } = user;\nconsole.log(`${name} is ${age}`);", expectedOutputIncludes: "Ada is 36", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-py-js-col-1", prompt: "Python's `.append()` → JS…", choices: ["append()", "push()", "add()", "insert()"], correctIndex: 1, explanation: "`.push()` adds to the end of an array.", xp: 10 },
        { kind: "mcq", id: "q-py-js-col-2", prompt: "Python's `**dict` → JS…", choices: ["**dict", "...obj (spread)", "Object.assign()", "Both B and C"], correctIndex: 3, explanation: "Both spread and Object.assign merge objects.", xp: 10 },
        { kind: "mcq", id: "q-py-js-col-3", prompt: "`len(x)` → JS…", choices: ["len(x)", "x.length", "x.size()", "x.count()"], correctIndex: 1, explanation: "`.length` is a property (no parentheses) for arrays and strings.", xp: 10 },
        { kind: "debug", id: "q-py-js-col-4", prompt: "Why doesn't slice modify the array?", brokenCode: "const a = [1,2,3];\na.slice(1);\nconsole.log(a);  // Still [1,2,3]!", choices: ["slice returns a new array — assign it or use splice for mutation", "slice is wrong", "a is const", "Missing index"], correctIndex: 0, explanation: "`.slice()` is non-mutating. `.splice()` mutates.", xp: 15 },
        { kind: "mcq", id: "q-py-js-col-5", prompt: "Python `d.get('key', default)` → JS…", choices: ["d.get('key')", "d.key ?? default", "d['key'] || default", "Both B and C (with subtle difference)"], correctIndex: 3, explanation: "`??` is safer (only null/undefined), `||` also triggers on `0` and `''`.", xp: 10 },
      ],
    },
    // ===================== INTERMEDIATE =====================
    { id: "py-js-oop", title: "Classes & Prototypes", tagline: "ES6 classes — familiar but with `this` gotchas.", icon: "👑", level: "intermediate", order: 1, requires: [], rewardXp: 120,
      lessons: [
        { id: "lesson-py-js-oop-1", title: "JS classes", intro: "JS classes (ES6+) look like Python's but with key differences: `constructor()` instead of `__init__`, no explicit `self` (use `this`), `#field` for private, and `this` is dynamic (determined by how a method is called).", comparisons: [
            { concept: "Class", knownCode: "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f'{self.name} barks!'", targetCode: "class Dog {\n    constructor(name) {\n        this.name = name;\n    }\n    bark() {\n        return `${this.name} barks!`;\n    }\n}" },
            { concept: "Private", knownCode: "class Foo:\n    def __init__(self):\n        self._private = 1  # Convention", targetCode: "class Foo {\n    #private = 1;  // Truly private (ES2022)\n}" },
            { concept: "Inheritance", knownCode: "class Puppy(Dog):\n    def __init__(self, name):\n        super().__init__(name)", targetCode: "class Puppy extends Dog {\n    constructor(name) {\n        super(name);\n    }\n}" },
          ], realWorld: "Many JS devs prefer functions + closures over classes. React uses function components exclusively now.",
          exercise: { id: "ex-py-js-oop-1", prompt: "Create class `Counter` with #count, inc(), getCount(). Test it.", starterCode: "class Counter {\n    // ...\n}\n", solution: "class Counter {\n    #count = 0;\n    inc() { this.#count++; }\n    getCount() { return this.#count; }\n}\nconst c = new Counter();\nc.inc(); c.inc();\nconsole.log(c.getCount());", expectedOutputIncludes: "2", xp: 35 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-py-js-oop-1", prompt: "Python's `__init__` → JS…", choices: ["init()", "constructor()", "__init__()", "new()"], correctIndex: 1, explanation: "`constructor()` runs on `new ClassName()`.", xp: 10 },
        { kind: "mcq", id: "q-py-js-oop-2", prompt: "Python's `self` → JS…", choices: ["self", "this (implicit)", "me", "cls"], correctIndex: 1, explanation: "`this` is implicit — not in the parameter list.", xp: 10 },
        { kind: "debug", id: "q-py-js-oop-3", prompt: "Why does `this` become undefined?", brokenCode: "class T {\n    constructor() { this.x = 1; }\n    show() { console.log(this.x); }\n}\nsetTimeout(new T().show, 0);", choices: ["Method reference loses this — use arrow or .bind()", "setTimeout is wrong", "Missing new", "show is async"], correctIndex: 0, explanation: "Pass `() => t.show()` or `t.show.bind(t)` to preserve `this`.", xp: 15 },
        { kind: "mcq", id: "q-py-js-oop-4", prompt: "JS `#field` is like Python's…", choices: ["_field (convention)", "__field (name mangling)", "Truly private — no Python equivalent enforcement", "property"], correctIndex: 2, explanation: "`#` is truly private at the language level. Python's _ and __ are conventions.", xp: 10 },
        { kind: "mcq", id: "q-py-js-oop-5", prompt: "JS `this` is determined…", choices: ["At class definition", "At method call time (dynamic)", "By the constructor", "By the import"], correctIndex: 1, explanation: "Unlike Python's explicit `self`, JS `this` depends on call context.", xp: 10 },
      ],
    },
    { id: "py-js-errors", title: "Error Handling", tagline: "try/catch + async error patterns.", icon: "🔥", level: "intermediate", order: 2, requires: ["py-js-oop"], rewardXp: 110,
      lessons: [
        { id: "lesson-py-js-err-1", title: "Exceptions in JS", intro: "Python's `try/except/finally` → JS `try/catch/finally`. `raise` → `throw new Error()`. No `with` statement — use `try/finally`. For async: `.catch()` or `try/catch` with `await`.", comparisons: [
            { concept: "try/except → try/catch", knownCode: "try:\n    val = int(s)\nexcept ValueError as e:\n    print(e)", targetCode: "try {\n    const val = parseInt(s);\n    if (isNaN(val)) throw new Error('invalid');\n} catch (e) {\n    console.error(e.message);\n}", note: "parseInt returns NaN on failure — doesn't throw." },
            { concept: "raise → throw", knownCode: "raise ValueError('bad')", targetCode: "throw new Error('bad');", note: "Always throw Error objects for stack traces." },
            { concept: "with → try/finally", knownCode: "with open('f') as f:\n    data = f.read()", targetCode: "let handle;\ntry {\n    handle = openFile('f');\n} finally {\n    handle?.close();\n}", note: "JS has no context managers. Use try/finally." },
          ], realWorld: "In Node.js, unhandled promise rejections crash the process. Always handle async errors.",
          exercise: { id: "ex-py-js-err-1", prompt: "Write safeParse(json) returning parsed value or null on error.", starterCode: "function safeParse(json) {\n    // ...\n}\n", solution: "function safeParse(json) {\n    try {\n        return JSON.parse(json);\n    } catch (e) {\n        return null;\n    }\n}\nconsole.log(safeParse('bad'));", expectedOutputIncludes: "null", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-py-js-err-1", prompt: "Python's `except` → JS…", choices: ["except", "catch", "handle", "rescue"], correctIndex: 1, explanation: "JS uses `catch(error)`.", xp: 10 },
        { kind: "mcq", id: "q-py-js-err-2", prompt: "Python's `raise` → JS…", choices: ["raise", "throw", "error", "abort"], correctIndex: 1, explanation: "`throw new Error('message')`.", xp: 10 },
        { kind: "debug", id: "q-py-js-err-3", prompt: "Why doesn't parseInt throw on bad input?", brokenCode: "const n = parseInt('abc');  // NaN, not error!", choices: ["parseInt returns NaN — check with isNaN()", "parseInt is deprecated", "Missing try", "abc is valid"], correctIndex: 0, explanation: "Unlike Python's `int()`, JS `parseInt` returns NaN. Check with `isNaN()`.", xp: 15 },
        { kind: "mcq", id: "q-py-js-err-3b", prompt: "Python has `with`. JS has…", choices: ["with statement", "No equivalent — use try/finally", "using statement", "context managers"], correctIndex: 1, explanation: "JS has no context managers. Use try/finally for cleanup.", xp: 10 },
        { kind: "mcq", id: "q-py-js-err-4", prompt: "Async error handling:", choices: [".catch() or try/catch with await", "except clause", "throws declaration", "error callback only"], correctIndex: 0, explanation: "Both `.catch()` and `try/catch` with `await` work.", xp: 10 },
      ],
    },
    { id: "py-js-modules", title: "Modules & npm", tagline: "import/export and the npm ecosystem.", icon: "📦", level: "intermediate", order: 3, requires: ["py-js-errors"], rewardXp: 100,
      lessons: [
        { id: "lesson-py-js-mod-1", title: "ES Modules and npm", intro: "Python's `import` → JS `import`/`export`. pip → npm. requirements.txt → package.json. Every file is a module. Named exports use `{}`, default exports don't.", comparisons: [
            { concept: "Import", knownCode: "import math\nfrom os.path import join", targetCode: "import math from 'math-lib';\nimport { join } from 'path';" },
            { concept: "Export", knownCode: "# Just define at module level", targetCode: "export function add(a, b) { return a + b; }\nexport default class App { }" },
            { concept: "pip → npm", knownCode: "pip install requests\n# requirements.txt", targetCode: "// npm install axios\n// package.json tracks deps" },
          ], realWorld: "npm has 2M+ packages. package-lock.json ensures reproducible installs.",
          exercise: { id: "ex-py-js-mod-1", prompt: "Write a module exporting function add and const PI. Show import.", starterCode: "// math.js\n", solution: "// math.js\nexport const PI = 3.14159;\nexport function add(a, b) { return a + b; }\n\n// main.js\n// import { add, PI } from './math.js';", expectedOutputIncludes: "export", xp: 20 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-py-js-mod-1", prompt: "pip → JS…", choices: ["npm", "webpack", "babel", "node"], correctIndex: 0, explanation: "npm (or yarn, pnpm) manages JS packages.", xp: 10 },
        { kind: "mcq", id: "q-py-js-mod-2", prompt: "requirements.txt → JS…", choices: ["modules.txt", "package.json", "index.js", "tsconfig.json"], correctIndex: 1, explanation: "package.json lists dependencies and project metadata.", xp: 10 },
        { kind: "debug", id: "q-py-js-mod-3", prompt: "Why does this import fail?", brokenCode: "import add from './math.js';\n// math.js: export function add() { }", choices: ["Named export needs braces: import { add }", "add doesn't exist", "Wrong path", "Missing npm install"], correctIndex: 0, explanation: "Named exports require `{ }`. Only `export default` imports without braces.", xp: 15 },
        { kind: "mcq", id: "q-py-js-mod-4", prompt: "Python's `__init__.py` → JS…", choices: ["index.js (convention)", "__init__.js", "main.js", "package.json"], correctIndex: 0, explanation: "`index.js` is the conventional entry point for a directory.", xp: 10 },
      ],
    },
    { id: "py-js-functional", title: "Functional Patterns", tagline: "Comprehensions → method chains.", icon: "⚡", level: "intermediate", order: 4, requires: ["py-js-modules"], rewardXp: 130,
      lessons: [
        { id: "lesson-py-js-func-1", title: "Functional JS", intro: "Python comprehensions → JS array method chains. Both languages support closures and higher-order functions. JS adds currying patterns, pipe/compose, and Object.freeze for immutability.", comparisons: [
            { concept: "Comprehension → chain", knownCode: "[x**2 for x in nums if x > 0]", targetCode: "nums.filter(x => x > 0).map(x => x ** 2)" },
            { concept: "sum/min/max", knownCode: "sum(nums)\nmin(nums)\nmax(nums)", targetCode: "nums.reduce((a, b) => a + b, 0)\nMath.min(...nums)\nMath.max(...nums)" },
            { concept: "sorted + key", knownCode: "sorted(items, key=len)", targetCode: "items.sort((a, b) => a.length - b.length);", note: "JS sort is in-place. Use `[...items].sort(...)` for immutable." },
          ], realWorld: "Functional patterns dominate React, Redux, and modern JS frameworks.",
          exercise: { id: "ex-py-js-func-1", prompt: "Write a `pipe` function composing left-to-right. Test: pipe(x=>x*2, x=>x+1)(3) → 7.", starterCode: "const pipe = (...fns) => ???;\n", solution: "const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);\nconsole.log(pipe(x => x * 2, x => x + 1)(3));", expectedOutputIncludes: "7", xp: 40 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-py-js-func-1", prompt: "Python comprehensions → JS…", choices: ["Comprehension syntax", "map/filter/reduce chains", "for loops", "generators only"], correctIndex: 1, explanation: "Method chaining replaces comprehension syntax.", xp: 10 },
        { kind: "mcq", id: "q-py-js-func-2", prompt: "Python `sorted()` returns new list. JS `.sort()` is…", choices: ["Also returns new array", "In-place mutation", "Deprecated", "Async"], correctIndex: 1, explanation: "JS sort mutates! Use `[...arr].sort()` for non-mutating.", xp: 10 },
        { kind: "debug", id: "q-py-js-func-3", prompt: "Why does sort give wrong numbers?", brokenCode: "[10, 2, 30].sort()  // [10, 2, 30] → wrong!", choices: ["Default sort is lexicographic — use .sort((a,b) => a-b)", "sort is broken", "Arrays can't sort numbers", "Missing comparator type"], correctIndex: 0, explanation: "Without comparator, sort converts to strings: '10' < '2'. Use numeric comparator.", xp: 15 },
        { kind: "mcq", id: "q-py-js-func-4", prompt: "Python `sum()` → JS…", choices: ["sum()", "Math.sum()", ".reduce((a,b) => a+b, 0)", "Array.sum()"], correctIndex: 2, explanation: "No built-in sum. Use reduce.", xp: 10 },
        { kind: "mcq", id: "q-py-js-func-5", prompt: "Object.freeze() does…", choices: ["Deep freeze", "Shallow immutability only", "Deletes object", "Makes const"], correctIndex: 1, explanation: "Prevents modification of own properties. Nested objects are NOT frozen.", xp: 10 },
      ],
    },
    // ===================== ADVANCED =====================
    { id: "py-js-async", title: "Async Programming", tagline: "Event loop — different from asyncio.", icon: "🔄", level: "advanced", order: 1, requires: [], rewardXp: 170,
      lessons: [
        { id: "lesson-py-js-async-1", title: "Event loop and async/await", intro: "Both Python and JS have async/await, but the models differ. JS is single-threaded with a built-in event loop — ALL I/O is async. Python's asyncio is opt-in. JS Promises = Python coroutines. `Promise.all()` = `asyncio.gather()`.", comparisons: [
            { concept: "async/await", knownCode: "async def fetch_data():\n    data = await get_data()\n    return data\nasyncio.run(fetch_data())", targetCode: "async function fetchData() {\n    const data = await getData();\n    return data;\n}\nfetchData().then(console.log);" },
            { concept: "gather → Promise.all", knownCode: "results = await asyncio.gather(task1(), task2())", targetCode: "const [r1, r2] = await Promise.all([task1(), task2()]);" },
            { concept: "Event loop", knownCode: "# asyncio.run() starts the loop", targetCode: "// JS event loop is always running\n// setTimeout, fetch, etc. are automatically async", note: "JS doesn't need asyncio.run() — the event loop is built-in." },
          ], realWorld: "Node.js handles thousands of concurrent connections on one thread. asyncio serves a similar purpose for Python.",
          exercise: { id: "ex-py-js-async-1", prompt: "Write async function that awaits a Promise resolving to 'hello'. Log result.", starterCode: "// async function ...\n", solution: "async function greet() {\n    const msg = await Promise.resolve('hello');\n    console.log(msg);\n}\ngreet();", expectedOutputIncludes: "hello", xp: 40 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-py-js-async-1", prompt: "Python's asyncio.run() → JS…", choices: ["asyncio.run()", "Not needed — event loop is built-in", "EventLoop.start()", "process.run()"], correctIndex: 1, explanation: "JS event loop runs automatically. Just call async functions.", xp: 10 },
        { kind: "mcq", id: "q-py-js-async-2", prompt: "asyncio.gather → JS…", choices: ["Promise.gather()", "Promise.all()", "async.gather()", "await.all()"], correctIndex: 1, explanation: "`Promise.all([...])` runs promises concurrently.", xp: 10 },
        { kind: "debug", id: "q-py-js-async-3", prompt: "Why does '2' print before '1'?", brokenCode: "setTimeout(() => console.log('1'), 0);\nconsole.log('2');", choices: ["setTimeout is async — sync code runs first", "setTimeout is broken", "console.log is async", "Numbers are wrong"], correctIndex: 0, explanation: "Even 0ms setTimeout is a macrotask. Synchronous code runs first.", xp: 15 },
        { kind: "mcq", id: "q-py-js-async-3b", prompt: "JS is… threaded.", choices: ["Multi", "Single (with event loop)", "Variable", "Dual"], correctIndex: 1, explanation: "One thread. Async I/O via event loop. Web Workers for CPU-bound.", xp: 10 },
        { kind: "mcq", id: "q-py-js-async-4", prompt: "async function always returns…", choices: ["undefined", "A Promise", "A value", "void"], correctIndex: 1, explanation: "Async functions wrap return value in a Promise.", xp: 10 },
      ],
    },
    { id: "py-js-memory", title: "Runtime & Performance", tagline: "V8, GC, and optimization.", icon: "🧠", level: "advanced", order: 2, requires: ["py-js-async"], rewardXp: 150,
      lessons: [
        { id: "lesson-py-js-mem-1", title: "V8 vs CPython", intro: "JS (V8) uses JIT compilation — much faster than CPython for compute. V8 has generational GC (mark-and-sweep). Common leaks: closures, timers, event listeners. V8 optimizes for consistent object shapes (hidden classes).", comparisons: [
            { concept: "Performance", knownCode: "# CPython: interpreter only\n# 10-50x slower than V8 for compute", targetCode: "// V8: JIT compiles hot code to native\n// Generally 5-20x faster than CPython" },
            { concept: "GC", knownCode: "# Reference counting + cyclic GC", targetCode: "// Mark-and-sweep (generational)\n// Young gen (Scavenger) + Old gen", note: "Both have GC. V8's is generally faster." },
          ], realWorld: "Use Chrome DevTools for profiling. WeakRef/WeakMap for GC-friendly caches.",
          exercise: { id: "ex-py-js-mem-1", prompt: "Explain in a comment why setInterval without clearInterval leaks.", starterCode: "// Explain:\n", solution: "// setInterval keeps callback + closure alive forever.\n// Without clearInterval, referenced objects can never be GC'd.\nconst id = setInterval(() => console.log('tick'), 1000);\n// Fix: clearInterval(id) when done", expectedOutputIncludes: "", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-py-js-mem-1", prompt: "V8 JIT makes JS… than CPython.", choices: ["Slower", "5-20x faster for compute", "Same speed", "Slower for I/O"], correctIndex: 1, explanation: "V8 JIT-compiles hot code. CPython interprets bytecode.", xp: 10 },
        { kind: "mcq", id: "q-py-js-mem-2", prompt: "Common JS memory leak:", choices: ["const", "Forgotten timers/listeners", "Arrow functions", "Template literals"], correctIndex: 1, explanation: "setInterval, addEventListener without cleanup = leak.", xp: 10 },
        { kind: "debug", id: "q-py-js-mem-3", prompt: "Why is this slow?", brokenCode: "const obj = {};\nfor (let i = 0; i < 10000; i++) {\n    obj['prop' + i] = i;\n}", choices: ["Dynamic property names defeat V8's hidden class optimization", "Objects have size limits", "const prevents optimization", "Loops are slow"], correctIndex: 0, explanation: "V8 optimizes consistent shapes. Dynamic properties cause deoptimization.", xp: 15 },
        { kind: "mcq", id: "q-py-js-mem-3b", prompt: "WeakRef allows…", choices: ["Weak typing", "References that don't prevent GC", "Weak encryption", "Thread safety"], correctIndex: 1, explanation: "WeakRef holds a reference the GC can collect.", xp: 10 },
        { kind: "mcq", id: "q-py-js-mem-4", prompt: "Both Python and JS have…", choices: ["Manual memory management", "Garbage collection", "RAII", "Smart pointers"], correctIndex: 1, explanation: "Both use GC — different implementations but same concept.", xp: 10 },
      ],
    },
    { id: "py-js-advanced", title: "Advanced Patterns", tagline: "Generators, proxies, and metaprogramming.", icon: "✨", level: "advanced", order: 3, requires: ["py-js-memory"], rewardXp: 200,
      lessons: [
        { id: "lesson-py-js-adv-1", title: "Generators, proxies, symbols", intro: "Python generators → JS generators (`function*`, `yield`). Python decorators → no direct equivalent (use higher-order functions). JS has Proxy for metaprogramming (like `__getattr__`). Symbols are unique keys.", comparisons: [
            { concept: "Generator", knownCode: "def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b", targetCode: "function* fibonacci() {\n    let [a, b] = [0, 1];\n    while (true) {\n        yield a;\n        [a, b] = [b, a + b];\n    }\n}" },
            { concept: "__getattr__ → Proxy", knownCode: "class DotDict:\n    def __getattr__(self, name):\n        return self[name]", targetCode: "const handler = {\n    get(target, prop) {\n        return target[prop] ?? 'default';\n    }\n};\nconst p = new Proxy({}, handler);" },
          ], realWorld: "Vue.js uses Proxies for reactivity. Generators power async iterators in Node.js.",
          exercise: { id: "ex-py-js-adv-1", prompt: "Write a generator yielding fibonacci numbers. Print first 8.", starterCode: "function* fibonacci() {\n    // ...\n}\n", solution: "function* fibonacci() {\n    let [a, b] = [0, 1];\n    while (true) {\n        yield a;\n        [a, b] = [b, a + b];\n    }\n}\nlet count = 0;\nfor (const n of fibonacci()) {\n    console.log(n);\n    if (++count >= 8) break;\n}", expectedOutputIncludes: "0\n1\n1\n2\n3\n5\n8\n13", xp: 50 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-py-js-adv-1", prompt: "Python `yield` → JS…", choices: ["yield (same keyword)", "return", "emit", "produce"], correctIndex: 0, explanation: "Both use `yield`. JS needs `function*` declaration.", xp: 10 },
        { kind: "mcq", id: "q-py-js-adv-2", prompt: "Python `__getattr__` → JS…", choices: ["__getattr__", "Proxy handler get trap", "Object.defineProperty", "Symbol"], correctIndex: 1, explanation: "Proxy `get` trap intercepts property access like `__getattr__`.", xp: 10 },
        { kind: "mcq", id: "q-py-js-adv-3", prompt: "Python decorators → JS…", choices: ["@decorator (same)", "Higher-order functions (wrapping)", "Annotations", "Symbols"], correctIndex: 1, explanation: "JS has no decorator syntax (TC39 proposal exists). Use HOFs.", xp: 10 },
        { kind: "debug", id: "q-py-js-adv-4", prompt: "Why does generator produce nothing?", brokenCode: "function* nums() {\n    return [1, 2, 3];\n}", choices: ["return ends generator. Use yield or yield*", "function* is wrong", "Arrays can't be returned", "Missing call"], correctIndex: 0, explanation: "`return` marks done. Use `yield* [1,2,3]` to yield each.", xp: 15 },
        { kind: "mcq", id: "q-py-js-adv-5", prompt: "Symbols provide…", choices: ["String encryption", "Unique, collision-free keys", "Type safety", "Constants"], correctIndex: 1, explanation: "Each Symbol is unique. Used for metaprogramming (Symbol.iterator, etc.).", xp: 10 },
      ],
    },
  ],
};
