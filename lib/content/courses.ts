import type { Course, LanguageId } from "@/lib/types";
import { cppToPython } from "./cppToPython";

const pythonToJs: Course = {
  id: "python-to-javascript",
  knownLang: "python",
  targetLang: "javascript",
  title: "Python → JavaScript",
  modules: [
    {
      id: "py-js-variables",
      title: "Variables & Types",
      tagline: "Declare values without forgetting what you knew.",
      icon: "🏰",
      level: "beginner",
      order: 1,
      requires: [],
      rewardXp: 60,
      lessons: [
        {
          id: "lesson-variables",
          title: "Declaring variables",
          intro:
            "In Python you just assign — `x = 10`. In JavaScript you use `let`, `const`, or (legacy) `var`. `const` is for values that won't be reassigned; `let` is for ones that will. There is no `def` for variables.",
          comparisons: [
            {
              concept: "A mutable variable",
              knownCode: "count = 0\ncount = count + 1",
              targetCode: "let count = 0;\ncount = count + 1;",
              note: "JavaScript ends statements with a semicolon (optional, but standard).",
            },
            {
              concept: "An immutable binding",
              knownCode: "PI = 3.14159  # convention only",
              targetCode: "const PI = 3.14159; // enforced by the language",
              note: "`const` in JS prevents *reassignment* but not deep mutation of objects/arrays.",
            },
            {
              concept: "Strings, numbers, booleans, null",
              knownCode: 'name = "Ada"\nage = 36\nactive = True\nnothing = None',
              targetCode:
                'const name = "Ada";\nconst age = 36;\nconst active = true;\nconst nothing = null;',
              note: "`True/False/None` → `true/false/null`. JS also has `undefined` for \"never set\".",
            },
          ],
          realWorld:
            "Most production JS code prefers `const` by default and only reaches for `let` when reassignment is needed — this catches bugs and signals intent.",
          exercise: {
            id: "ex-variables",
            prompt:
              "Declare an immutable greeting `hello` set to the string \"world\" and log it. Use `const`.",
            starterCode:
              '// Declare hello as a const and log it.\n',
            solution: 'const hello = "world";\nconsole.log(hello);',
            expectedOutputIncludes: "world",
            xp: 20,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-var-1",
          prompt: "Which JS keyword should you reach for first by default?",
          choices: ["var", "let", "const", "def"],
          correctIndex: 2,
          explanation:
            "Prefer `const`; fall back to `let` when you actually need to reassign. `var` is legacy. `def` is Python.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-var-2",
          prompt: "Python's `None` maps most closely to JavaScript's…",
          choices: ["undefined", "null", "NaN", "0"],
          correctIndex: 1,
          explanation:
            "`null` is the explicit \"nothing\" value. `undefined` means \"never assigned\".",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-var-3",
          prompt: "What is wrong with this code?",
          brokenCode: "const x = 1;\nx = 2;\nconsole.log(x);",
          choices: [
            "Nothing — it prints 2",
            "`const` cannot be reassigned",
            "You need `var` instead of `const`",
            "Semicolons are missing",
          ],
          correctIndex: 1,
          explanation:
            "`const` bindings cannot be reassigned. Use `let` if `x` should change.",
          xp: 15,
        },
      ],
    },
    {
      id: "py-js-conditionals",
      title: "Conditionals",
      tagline: "`if/elif/else` becomes `if/else if/else`.",
      icon: "🛡️",
      level: "beginner",
      order: 2,
      requires: ["py-js-variables"],
      rewardXp: 70,
      lessons: [
        {
          id: "lesson-conditionals",
          title: "Branching logic",
          intro:
            "JavaScript wraps conditions in parentheses and uses curly braces instead of indentation. `elif` becomes `else if`. Equality is `===` (strict) — `==` does type coercion and surprises you.",
          comparisons: [
            {
              concept: "if / elif / else",
              knownCode:
                "if score > 90:\n    print('A')\nelif score > 75:\n    print('B')\nelse:\n    print('C')",
              targetCode:
                "if (score > 90) {\n  console.log('A');\n} else if (score > 75) {\n  console.log('B');\n} else {\n  console.log('C');\n}",
              note: "Always `===` and `!==` in JS unless you have a good reason to use `==`.",
            },
            {
              concept: "Truthiness",
              knownCode:
                "if not name:\n    print('no name')",
              targetCode: "if (!name) {\n  console.log('no name');\n}",
              note: "JS falsy values: `false`, `0`, `''`, `null`, `undefined`, `NaN`.",
            },
          ],
          realWorld:
            "Linters like ESLint warn on `==`. Most JS codebases enforce `===` to dodge type-coercion bugs (`'0' == 0` is true, but `'0' === 0` is false).",
          exercise: {
            id: "ex-conditionals",
            prompt:
              "Given a variable `n = 7`, log 'even' if n is divisible by 2, otherwise 'odd'.",
            starterCode: "const n = 7;\n// Your branch here\n",
            solution:
              "const n = 7;\nif (n % 2 === 0) {\n  console.log('even');\n} else {\n  console.log('odd');\n}",
            expectedOutputIncludes: "odd",
            xp: 25,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cond-1",
          prompt: "Which equality operator should you prefer in JS?",
          choices: ["=", "==", "===", "is"],
          correctIndex: 2,
          explanation: "`===` compares without coercion. `is` is Python.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cond-2",
          prompt: "This always logs 'yes'. Why?",
          brokenCode:
            "const flag = 'false';\nif (flag) {\n  console.log('yes');\n} else {\n  console.log('no');\n}",
          choices: [
            "Strings are case-sensitive",
            "Any non-empty string is truthy in JS",
            "`flag` was hoisted",
            "Missing semicolons",
          ],
          correctIndex: 1,
          explanation:
            "`'false'` is a non-empty string, which is truthy. Compare explicitly: `flag === 'true'`.",
          xp: 15,
        },
      ],
    },
    {
      id: "py-js-loops",
      title: "Loops",
      tagline: "`for x in xs` has a few JS dialects.",
      icon: "🌀",
      level: "beginner",
      order: 3,
      requires: ["py-js-conditionals"],
      rewardXp: 80,
      lessons: [
        {
          id: "lesson-loops",
          title: "Iterating in JavaScript",
          intro:
            "Python's `for x in xs` becomes `for (const x of xs)` in JS. There's also `for...in` (iterates *keys* — confusing!), classic `for (let i=0; i<n; i++)`, and array methods like `.forEach` / `.map`.",
          comparisons: [
            {
              concept: "For each element",
              knownCode: "for word in words:\n    print(word)",
              targetCode: "for (const word of words) {\n  console.log(word);\n}",
              note: "Use `of`, not `in`. `for...in` iterates object keys.",
            },
            {
              concept: "Range loop",
              knownCode: "for i in range(5):\n    print(i)",
              targetCode: "for (let i = 0; i < 5; i++) {\n  console.log(i);\n}",
              note: "JS has no built-in `range`. Closest stdlib trick: `Array.from({length: 5}, (_, i) => i)`.",
            },
            {
              concept: "Functional iteration",
              knownCode:
                "doubled = [x * 2 for x in nums]",
              targetCode: "const doubled = nums.map(x => x * 2);",
              note: "List comprehensions → `.map`, `.filter`, `.reduce`.",
            },
          ],
          realWorld:
            "Modern JS code overwhelmingly uses `for...of` and array methods over index loops — they read better and avoid off-by-one bugs.",
          exercise: {
            id: "ex-loops",
            prompt:
              "Log each number from 1 to 5 (inclusive). Any loop style is fine.",
            starterCode: "// Print 1, 2, 3, 4, 5\n",
            solution:
              "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
            expectedOutputIncludes: "1\n2\n3\n4\n5",
            xp: 30,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-loop-1",
          prompt: "Which JS loop is closest to Python's `for x in xs`?",
          choices: ["for...in", "for...of", "while", "do...while"],
          correctIndex: 1,
          explanation: "`for...of` iterates values; `for...in` iterates keys (confusingly).",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-loop-2",
          prompt: "Python list comprehension `[x*2 for x in nums]` maps to…",
          choices: ["nums.forEach()", "nums.map()", "nums.filter()", "nums.reduce()"],
          correctIndex: 1,
          explanation: "`map` transforms each element. `forEach` returns nothing.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-loop-3",
          prompt: "Why does this print numbers like '0', '1' as strings?",
          brokenCode:
            "const arr = [10, 20, 30];\nfor (const i in arr) {\n  console.log(i);\n}",
          choices: [
            "`for...in` iterates keys (which are string indices)",
            "Numbers are always strings in JS",
            "Missing `let`",
            "`arr` should be a Set",
          ],
          correctIndex: 0,
          explanation:
            "`for...in` gives keys. To iterate values use `for...of`.",
          xp: 15,
        },
      ],
    },
    {
      id: "py-js-functions",
      title: "Functions",
      tagline: "`def` becomes `function` — or an arrow.",
      icon: "⚔️",
      level: "beginner",
      order: 4,
      requires: ["py-js-loops"],
      rewardXp: 90,
      lessons: [
        {
          id: "lesson-functions",
          title: "Defining and passing functions",
          intro:
            "JS has function declarations (`function name() {}`) and expressions (`const name = () => {}`). Arrow functions are concise and inherit `this` from their lexical scope. Functions are first-class — pass them like values.",
          comparisons: [
            {
              concept: "Named function",
              knownCode:
                "def greet(name):\n    return f'Hello, {name}!'",
              targetCode:
                "function greet(name) {\n  return `Hello, ${name}!`;\n}",
              note: "Template literals use backticks and `${...}` instead of f-strings.",
            },
            {
              concept: "Lambda / arrow function",
              knownCode: "double = lambda x: x * 2",
              targetCode: "const double = x => x * 2;",
              note: "Single-expression arrow → implicit return. Multi-line needs `{}` and `return`.",
            },
            {
              concept: "Default arguments",
              knownCode: "def add(a, b=1):\n    return a + b",
              targetCode: "function add(a, b = 1) {\n  return a + b;\n}",
            },
          ],
          realWorld:
            "Arrow functions dominate callbacks (`.map(x => …)`, event handlers). Named `function` declarations are still common at the module top level because they're hoisted.",
          exercise: {
            id: "ex-functions",
            prompt:
              "Write an arrow function `square` that returns its argument squared. Log `square(6)`.",
            starterCode: "// const square = ...\n",
            solution:
              "const square = x => x * x;\nconsole.log(square(6));",
            expectedOutputIncludes: "36",
            xp: 30,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-fn-1",
          prompt: "Which is a valid one-line arrow function returning n + 1?",
          choices: [
            "const f = n => { n + 1 };",
            "const f = n => n + 1;",
            "const f = (n) -> n + 1;",
            "const f = lambda n: n + 1;",
          ],
          correctIndex: 1,
          explanation:
            "With braces you must `return`. Without braces, the expression is the return value.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-fn-2",
          prompt: "Python f-strings `f\"Hi {name}\"` → JS uses…",
          choices: [
            "Template literals: `Hi ${name}`",
            "Format strings: '%s' % name",
            ".format(name)",
            "string.interpolate",
          ],
          correctIndex: 0,
          explanation: "Backticks + `${...}`.",
          xp: 10,
        },
      ],
    },
    {
      id: "py-js-arrays",
      title: "Lists & Arrays",
      tagline: "From `list` to `Array`, with new powers.",
      icon: "📜",
      level: "beginner",
      order: 5,
      requires: ["py-js-functions"],
      rewardXp: 90,
      lessons: [
        {
          id: "lesson-arrays",
          title: "Array essentials",
          intro:
            "JS arrays are zero-indexed (like Python lists), heterogeneous, and dynamic. Methods cluster around `.push/.pop`, `.map/.filter/.reduce`, and `.slice/.splice` (slice = copy, splice = mutate).",
          comparisons: [
            {
              concept: "Create and append",
              knownCode: "xs = [1, 2, 3]\nxs.append(4)",
              targetCode: "const xs = [1, 2, 3];\nxs.push(4);",
              note: "`xs` is `const` but mutation is fine — `const` only forbids reassignment.",
            },
            {
              concept: "Slicing",
              knownCode: "first_two = xs[:2]",
              targetCode: "const firstTwo = xs.slice(0, 2);",
            },
            {
              concept: "Length",
              knownCode: "n = len(xs)",
              targetCode: "const n = xs.length;",
            },
            {
              concept: "Filter + map",
              knownCode:
                "evens = [x for x in xs if x % 2 == 0]",
              targetCode:
                "const evens = xs.filter(x => x % 2 === 0);",
            },
          ],
          realWorld:
            "`.map`, `.filter`, `.reduce` (and `.some` / `.every` / `.find`) are the bread and butter of working with arrays in any real codebase.",
          exercise: {
            id: "ex-arrays",
            prompt:
              "Given `const nums = [1, 2, 3, 4, 5]`, build `evens` containing only even numbers and log it.",
            starterCode:
              "const nums = [1, 2, 3, 4, 5];\n// const evens = ...\n",
            solution:
              "const nums = [1, 2, 3, 4, 5];\nconst evens = nums.filter(x => x % 2 === 0);\nconsole.log(evens);",
            expectedOutputIncludes: "[2,4]",
            xp: 35,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-arr-1",
          prompt: "Python's `len(xs)` becomes…",
          choices: ["xs.size()", "xs.length", "len(xs)", "xs.count"],
          correctIndex: 1,
          explanation: "`.length` is a property, not a method — no parentheses.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-arr-2",
          prompt: "Why does this fail to remove the first element?",
          brokenCode:
            "const xs = [1, 2, 3];\nxs.slice(1);\nconsole.log(xs);",
          choices: [
            "`slice` returns a copy and doesn't mutate",
            "Should be `xs.slice(-1)`",
            "Arrays are immutable",
            "Need to assign with `const`",
          ],
          correctIndex: 0,
          explanation:
            "`slice` is non-mutating. Use `.shift()` to remove the first element in place.",
          xp: 15,
        },
      ],
    },
    {
      id: "py-js-objects",
      title: "Objects & Dicts",
      tagline: "Python dicts ≈ JS objects (mostly).",
      icon: "📦",
      level: "intermediate",
      order: 6,
      requires: ["py-js-arrays"],
      rewardXp: 100,
      lessons: [
        {
          id: "lesson-objects",
          title: "Key-value structures",
          intro:
            "Python dicts have string-or-anything keys. JS objects use string (or symbol) keys; for arbitrary keys, use `Map`. Object literals are compact and ubiquitous.",
          comparisons: [
            {
              concept: "Create",
              knownCode:
                'user = {"name": "Ada", "age": 36}',
              targetCode:
                'const user = { name: "Ada", age: 36 };',
              note: "Bare-word keys; quote them only if they have spaces or special chars.",
            },
            {
              concept: "Access",
              knownCode: 'user["name"]\nuser.get("email")',
              targetCode: 'user.name;\nuser["name"]; // also works',
            },
            {
              concept: "Iterate",
              knownCode:
                "for k, v in user.items():\n    print(k, v)",
              targetCode:
                "for (const [k, v] of Object.entries(user)) {\n  console.log(k, v);\n}",
            },
            {
              concept: "Spread / merge",
              knownCode: "merged = {**a, **b}",
              targetCode: "const merged = { ...a, ...b };",
            },
          ],
          realWorld:
            "Destructuring (`const { name } = user`) is one of the highest-leverage syntax features in modern JS — start using it immediately.",
          exercise: {
            id: "ex-objects",
            prompt:
              "Given `const user = { name: 'Ada', age: 36 }`, destructure `name` and log it.",
            starterCode:
              "const user = { name: 'Ada', age: 36 };\n// destructure here\n",
            solution:
              "const user = { name: 'Ada', age: 36 };\nconst { name } = user;\nconsole.log(name);",
            expectedOutputIncludes: "Ada",
            xp: 35,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-obj-1",
          prompt: "Python's `{**a, **b}` is JS's…",
          choices: ["{ a, b }", "{ ...a, ...b }", "Object.merge(a, b)", "a + b"],
          correctIndex: 1,
          explanation: "Spread `...` flattens own-enumerable properties.",
          xp: 10,
        },
      ],
    },
    {
      id: "py-js-classes",
      title: "Classes",
      tagline: "ES6 classes feel familiar — until `this` shows up.",
      icon: "👑",
      level: "intermediate",
      order: 7,
      requires: ["py-js-objects"],
      rewardXp: 120,
      lessons: [
        {
          id: "lesson-classes",
          title: "Classes & instances",
          intro:
            "JS classes are syntactic sugar over prototypes. `__init__` becomes `constructor`. Methods don't take `self` explicitly — they use `this`, which is bound at call site (this is the famous JS footgun).",
          comparisons: [
            {
              concept: "Define a class",
              knownCode:
                "class Hero:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        return f'Hi, {self.name}'",
              targetCode:
                "class Hero {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return `Hi, ${this.name}`;\n  }\n}",
              note: "No `self` — methods get `this` automatically.",
            },
            {
              concept: "Instantiate",
              knownCode: "h = Hero('Ada')\nprint(h.greet())",
              targetCode:
                "const h = new Hero('Ada');\nconsole.log(h.greet());",
              note: "`new` is required — forgetting it is a common bug.",
            },
            {
              concept: "Inheritance",
              knownCode:
                "class Mage(Hero):\n    def __init__(self, name, spell):\n        super().__init__(name)\n        self.spell = spell",
              targetCode:
                "class Mage extends Hero {\n  constructor(name, spell) {\n    super(name);\n    this.spell = spell;\n  }\n}",
            },
          ],
          realWorld:
            "Many JS codebases prefer plain functions + objects over classes. Classes are common in older OOP-style codebases, React class components (deprecated), and frameworks like NestJS.",
          exercise: {
            id: "ex-classes",
            prompt:
              "Define a `class Counter` with a `count` field starting at 0, an `inc()` method, and log `c.count` after calling `inc` twice.",
            starterCode: "// class Counter { ... }\n",
            solution:
              "class Counter {\n  constructor() {\n    this.count = 0;\n  }\n  inc() {\n    this.count += 1;\n  }\n}\nconst c = new Counter();\nc.inc();\nc.inc();\nconsole.log(c.count);",
            expectedOutputIncludes: "2",
            xp: 45,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cls-1",
          prompt: "What's the JS equivalent of Python's `__init__`?",
          choices: ["init()", "constructor()", "new()", "create()"],
          correctIndex: 1,
          explanation: "`constructor` runs on `new ClassName(...)`.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cls-2",
          prompt: "Why does `h.greet` (without parens) not print the greeting?",
          brokenCode:
            "class H { greet() { return 'hi'; } }\nconst h = new H();\nconsole.log(h.greet);",
          choices: [
            "Methods need to be called with ()",
            "Need `new` again",
            "`greet` is private",
            "`class` should be `function`",
          ],
          correctIndex: 0,
          explanation: "Without `()` you log the function itself, not its return value.",
          xp: 15,
        },
      ],
    },
  ],
};

const jsToPython: Course = {
  id: "javascript-to-python",
  knownLang: "javascript",
  targetLang: "python",
  title: "JavaScript → Python",
  modules: [
    {
      id: "js-py-variables",
      title: "Variables & Indentation",
      tagline: "No braces, no semicolons — just whitespace.",
      icon: "🏰",
      level: "beginner",
      order: 1,
      requires: [],
      rewardXp: 60,
      lessons: [
        {
          id: "lesson-vars",
          title: "How Python shapes a program",
          intro:
            "Python uses indentation for blocks — no `{}`. Assignments are bare (`x = 10`). There is no `let`/`const`; convention (ALL_CAPS) signals constants.",
          comparisons: [
            {
              concept: "Variables",
              knownCode: "let x = 10;\nconst PI = 3.14;",
              targetCode: "x = 10\nPI = 3.14  # convention only",
            },
            {
              concept: "Block of code",
              knownCode: "if (x > 0) {\n  console.log('positive');\n}",
              targetCode: "if x > 0:\n    print('positive')",
              note: "Four spaces is the convention. Be consistent — Python is strict.",
            },
          ],
          realWorld:
            "Tools like Black/Ruff format Python automatically — most teams enforce them.",
          exercise: {
            id: "ex-vars-py",
            prompt: "Set `greeting` to 'world' and print it.",
            starterCode: "# Your code here\n",
            solution: "greeting = 'world'\nprint(greeting)",
            expectedOutputIncludes: "world",
            xp: 20,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-jspy-1",
          prompt: "Python signals a block of code with…",
          choices: ["Braces {}", "Indentation", "Keyword `do`", "Semicolons"],
          correctIndex: 1,
          explanation: "Indentation is part of the syntax.",
          xp: 10,
        },
      ],
    },
  ],
};


export const COURSES: Course[] = [pythonToJs, jsToPython, cppToPython];

export function findCourse(
  known: LanguageId,
  target: LanguageId,
): Course | undefined {
  return COURSES.find(
    (c) => c.knownLang === known && c.targetLang === target,
  );
}
