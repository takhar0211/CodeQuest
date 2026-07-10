import type { Course, LanguageId } from "@/lib/types";

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

const cppToPython: Course = {
  id: "cpp-to-python",
  knownLang: "cpp",
  targetLang: "python",
  title: "C++ → Python",
  modules: [
    {
      id: "cpp-py-variables",
      title: "Variables & Types",
      tagline: "From declared types to whatever-you-assign.",
      icon: "🏰",
      level: "beginner",
      order: 1,
      requires: [],
      rewardXp: 60,
      lessons: [
        {
          id: "lesson-cpp-vars",
          title: "Letting go of static types",
          intro:
            "C++ is statically typed: every variable wears its type like armor. Python is dynamically typed — a name is just a label, and you can rebind it to any kind of value. No `int`, no `;`, no `{}`. Blocks are defined by indentation (4 spaces is the standard).",
          comparisons: [
            {
              concept: "Declaring a variable",
              knownCode: "int count = 0;\ncount = count + 1;",
              targetCode: "count = 0\ncount = count + 1",
              note: "No type, no semicolon. Just a name and a value.",
            },
            {
              concept: "Constants",
              knownCode: "const double PI = 3.14159;",
              targetCode: "PI = 3.14159  # convention: ALL_CAPS = don't reassign",
              note: "Python doesn't enforce constants. The convention is the contract.",
            },
            {
              concept: "Common scalar types",
              knownCode:
                'std::string name = "Ada";\nint age = 36;\nbool active = true;\nint* nothing = nullptr;',
              targetCode:
                'name = "Ada"\nage = 36\nactive = True\nnothing = None',
              note: "`true/false/nullptr` → `True/False/None`. Booleans are capitalized.",
            },
            {
              concept: "Type checks at runtime",
              knownCode:
                "// Type known at compile time\nstatic_assert(std::is_integral_v<decltype(age)>);",
              targetCode:
                'print(type(age))        # <class \'int\'>\nprint(isinstance(age, int))  # True',
              note: "All Python type info is runtime — there is no compile step.",
            },
          ],
          realWorld:
            "Modern Python codebases often layer type hints (`age: int = 36`) and run `mypy` or `pyright` for static checks. They're optional, but indistinguishable from production-quality code in most teams.",
          exercise: {
            id: "ex-cpp-vars",
            prompt:
              "Declare `greeting` set to the string \"world\" and print it.",
            starterCode: "# Declare greeting and print it\n",
            solution: 'greeting = "world"\nprint(greeting)',
            expectedOutputIncludes: "world",
            xp: 20,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-var-1",
          prompt: "How do you end a statement in Python?",
          choices: [
            "With a semicolon `;`",
            "With a newline (no terminator)",
            "With a period `.`",
            "With `end;`",
          ],
          correctIndex: 1,
          explanation:
            "Newlines terminate statements. Semicolons are legal to join lines but almost never used.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-var-2",
          prompt: "C++'s `nullptr` corresponds to Python's…",
          choices: ["null", "void", "None", "nil"],
          correctIndex: 2,
          explanation: "`None` is the singleton 'no value'. Note the capital N.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-var-3",
          prompt: "Why does this Python code fail?",
          brokenCode: "int age = 36\nprint(age)",
          choices: [
            "Missing semicolon",
            "`int` is a type, not a declaration keyword — drop it",
            "`print` needs parentheses around `age`",
            "Variable names can't be 'age'",
          ],
          correctIndex: 1,
          explanation:
            "There's no type prefix in Python. Just `age = 36`. `int(x)` would *convert* x to an int.",
          xp: 15,
        },
      ],
    },
    {
      id: "cpp-py-conditionals",
      title: "Conditionals",
      tagline: "No parens, no braces — indentation makes the block.",
      icon: "🛡️",
      level: "beginner",
      order: 2,
      requires: ["cpp-py-variables"],
      rewardXp: 70,
      lessons: [
        {
          id: "lesson-cpp-cond",
          title: "Branching, the Python way",
          intro:
            "Drop the parentheses around the condition and replace `{}` with a `:` followed by an indented block. `else if` collapses to `elif`. Logical operators are words (`and`, `or`, `not`) instead of `&&`, `||`, `!`.",
          comparisons: [
            {
              concept: "if / else if / else",
              knownCode:
                'if (score > 90) {\n  std::cout << "A";\n} else if (score > 75) {\n  std::cout << "B";\n} else {\n  std::cout << "C";\n}',
              targetCode:
                "if score > 90:\n    print('A')\nelif score > 75:\n    print('B')\nelse:\n    print('C')",
              note: "`elif`, not `else if`. The colon is mandatory.",
            },
            {
              concept: "Logical operators",
              knownCode:
                "if (x > 0 && y > 0 && !done) {\n  // ...\n}",
              targetCode: "if x > 0 and y > 0 and not done:\n    ...",
              note: "Python reads almost like English. `...` is a real no-op (the Ellipsis literal).",
            },
            {
              concept: "Truthiness",
              knownCode:
                "if (!name.empty()) {\n  // string has content\n}",
              targetCode: "if name:\n    # non-empty string is truthy\n    ...",
              note: "Empty containers, 0, None, and False are all falsy. Everything else is truthy.",
            },
          ],
          realWorld:
            "Pythonic style prefers truthiness checks (`if items:`) over explicit length checks (`if len(items) > 0:`). Linters like Ruff will flag the latter.",
          exercise: {
            id: "ex-cpp-cond",
            prompt:
              "Given `n = 7`, print 'even' if n is divisible by 2, otherwise 'odd'.",
            starterCode: "n = 7\n# Your branch here\n",
            solution:
              "n = 7\nif n % 2 == 0:\n    print('even')\nelse:\n    print('odd')",
            expectedOutputIncludes: "odd",
            xp: 25,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-cond-1",
          prompt: "Python's equivalent of `else if` is…",
          choices: ["else if", "elseif", "elif", "elsif"],
          correctIndex: 2,
          explanation: "`elif` — one keyword.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-cond-2",
          prompt: "Which is the correct way to combine conditions in Python?",
          choices: [
            "if x > 0 && y > 0:",
            "if x > 0 and y > 0:",
            "if (x > 0) and (y > 0):",
            "Both B and C work",
          ],
          correctIndex: 3,
          explanation:
            "Python uses `and`/`or`/`not`. Parens are optional but legal.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-cond-3",
          prompt: "Why does this raise an IndentationError?",
          brokenCode: "if score > 90:\nprint('A')",
          choices: [
            "Missing `then` keyword",
            "The body of the `if` must be indented",
            "Missing semicolon",
            "Need `do:` after `if`",
          ],
          correctIndex: 1,
          explanation:
            "After `:`, the next line(s) must be indented to form the block.",
          xp: 15,
        },
      ],
    },
    {
      id: "cpp-py-loops",
      title: "Loops",
      tagline: "`for (int i = 0; i < n; ++i)` is rarely the answer.",
      icon: "🌀",
      level: "beginner",
      order: 3,
      requires: ["cpp-py-conditionals"],
      rewardXp: 80,
      lessons: [
        {
          id: "lesson-cpp-loops",
          title: "Iteration without indices",
          intro:
            "Python's `for` is C++'s *range-based* `for` — it iterates *values*, not indices. When you genuinely need an index, use `range(n)` (a lazy sequence) or `enumerate(xs)` (pairs of index + value). List comprehensions replace many small loops entirely.",
          comparisons: [
            {
              concept: "Iterate values",
              knownCode:
                "for (const auto& word : words) {\n  std::cout << word << '\\n';\n}",
              targetCode: "for word in words:\n    print(word)",
              note: "Direct equivalent of range-based `for`.",
            },
            {
              concept: "Counted loop",
              knownCode:
                "for (int i = 0; i < 5; ++i) {\n  std::cout << i;\n}",
              targetCode: "for i in range(5):\n    print(i)",
              note: "`range(5)` produces 0, 1, 2, 3, 4 — `range(a, b)` for [a, b).",
            },
            {
              concept: "Index + value",
              knownCode:
                "for (size_t i = 0; i < xs.size(); ++i) {\n  std::cout << i << ' ' << xs[i] << '\\n';\n}",
              targetCode: "for i, x in enumerate(xs):\n    print(i, x)",
            },
            {
              concept: "Transform a sequence",
              knownCode:
                "std::vector<int> doubled;\nfor (int x : nums) doubled.push_back(x * 2);",
              targetCode: "doubled = [x * 2 for x in nums]",
              note: "List comprehension — concise and idiomatic.",
            },
          ],
          realWorld:
            "Pythonic code rarely uses bare indices. If you find yourself writing `for i in range(len(xs))`, reach for `enumerate(xs)` instead — it's the most common code review comment in Python.",
          exercise: {
            id: "ex-cpp-loops",
            prompt: "Print each number from 1 to 5 (inclusive), one per line.",
            starterCode: "# Print 1 through 5\n",
            solution: "for i in range(1, 6):\n    print(i)",
            expectedOutputIncludes: "1\n2\n3\n4\n5",
            xp: 30,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-loop-1",
          prompt: "Which call generates the numbers 0 through 9?",
          choices: ["range(10)", "range(0, 10)", "range(1, 10)", "Both A and B"],
          correctIndex: 3,
          explanation:
            "`range(n)` is shorthand for `range(0, n)`. Both produce 0..9. `range(1, 10)` starts at 1.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-loop-2",
          prompt:
            "Python equivalent of `for (auto& x : nums) total += x;` (sum) ?",
          choices: [
            "total = nums.sum()",
            "total = sum(nums)",
            "for x in nums: total += x",
            "Both B and C work",
          ],
          correctIndex: 3,
          explanation:
            "`sum()` is the built-in, but the explicit loop is also valid.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-loop-3",
          prompt: "Why does this print 0 1 2 3 4 instead of the words?",
          brokenCode:
            "words = ['axe', 'bow', 'wand']\nfor i in range(len(words)):\n    print(i)",
          choices: [
            "`range` is broken",
            "We're iterating indices and printing them; print `words[i]` instead — or just `for w in words: print(w)`",
            "`len()` returns the wrong value",
            "Need to use `for...of`",
          ],
          correctIndex: 1,
          explanation:
            "The loop iterates *indices*. Switch to `for w in words:` for the Pythonic version.",
          xp: 15,
        },
      ],
    },
    {
      id: "cpp-py-functions",
      title: "Functions",
      tagline: "No return type, no headers, no overloading.",
      icon: "⚔️",
      level: "beginner",
      order: 4,
      requires: ["cpp-py-loops"],
      rewardXp: 90,
      lessons: [
        {
          id: "lesson-cpp-fn",
          title: "Defining functions in Python",
          intro:
            "Functions are introduced with `def`, return nothing by default (implicit `None`), and have no type annotations unless you opt in. Default arguments, keyword arguments, and `*args`/`**kwargs` give Python a flexibility C++ usually achieves with overloading.",
          comparisons: [
            {
              concept: "A named function",
              knownCode:
                'std::string greet(const std::string& name) {\n  return "Hello, " + name + "!";\n}',
              targetCode:
                "def greet(name):\n    return f'Hello, {name}!'",
              note: "f-strings interpolate with `{expr}` — like `std::format`.",
            },
            {
              concept: "Lambda / inline function",
              knownCode: "auto double_it = [](int x) { return x * 2; };",
              targetCode: "double_it = lambda x: x * 2",
              note: "Python lambdas are single-expression only. Use `def` for anything bigger.",
            },
            {
              concept: "Default arguments",
              knownCode: "int add(int a, int b = 1) { return a + b; }",
              targetCode: "def add(a, b=1):\n    return a + b",
            },
            {
              concept: "Keyword arguments",
              knownCode:
                "// In C++ you'd use named struct fields or builders\nFoo foo;\nfoo.x = 1;\nfoo.y = 2;\nbar(foo);",
              targetCode: "bar(x=1, y=2)",
              note: "Pass arguments by name — clearer at the call site and order-independent.",
            },
          ],
          realWorld:
            "Type hints (`def add(a: int, b: int = 1) -> int:`) are widely adopted in production Python and let `mypy`/`pyright` give you C++-style safety without sacrificing flexibility.",
          exercise: {
            id: "ex-cpp-fn",
            prompt:
              "Define a function `square(n)` that returns n squared. Print `square(6)`.",
            starterCode: "# def square ...\n",
            solution:
              "def square(n):\n    return n * n\nprint(square(6))",
            expectedOutputIncludes: "36",
            xp: 30,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-fn-1",
          prompt: "What does a Python function return if there's no `return`?",
          choices: ["0", "undefined", "None", "An empty string"],
          correctIndex: 2,
          explanation: "Implicit `None`. Comparable to a `void` return in C++.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-fn-2",
          prompt: "Python equivalent of C++'s `auto f = [](int x){ return x+1; };`?",
          choices: [
            "f = lambda x: x + 1",
            "def f(x): return x + 1",
            "Both work",
            "Neither",
          ],
          correctIndex: 2,
          explanation:
            "Both are valid. Pick `lambda` only for tiny one-liners passed inline.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-fn-3",
          prompt: "Why does this print None?",
          brokenCode:
            "def add(a, b):\n    a + b\n\nprint(add(2, 3))",
          choices: [
            "Python can't add ints",
            "Missing `return` — the function computes a + b and discards it",
            "Missing semicolons",
            "Should be `def add(a, b) -> int:`",
          ],
          correctIndex: 1,
          explanation:
            "Without `return`, the function returns the implicit `None`. Add `return a + b`.",
          xp: 15,
        },
      ],
    },
    {
      id: "cpp-py-lists",
      title: "Lists & Vectors",
      tagline: "`std::vector` → `list`, with a million tricks.",
      icon: "📜",
      level: "beginner",
      order: 5,
      requires: ["cpp-py-functions"],
      rewardXp: 90,
      lessons: [
        {
          id: "lesson-cpp-lists",
          title: "Working with Python lists",
          intro:
            "Python's `list` is a dynamic, heterogeneous sequence — closest to `std::vector<std::any>` but without the type gymnastics. Indexing is zero-based, slicing is a superpower, and methods like `append`, `pop`, and `sort` mutate in place.",
          comparisons: [
            {
              concept: "Create and append",
              knownCode:
                "std::vector<int> xs = {1, 2, 3};\nxs.push_back(4);",
              targetCode: "xs = [1, 2, 3]\nxs.append(4)",
            },
            {
              concept: "Slicing",
              knownCode:
                "std::vector<int> firstTwo(xs.begin(), xs.begin() + 2);",
              targetCode: "first_two = xs[:2]",
              note: "Slicing always returns a *new* list — it never mutates.",
            },
            {
              concept: "Length",
              knownCode: "auto n = xs.size();",
              targetCode: "n = len(xs)",
              note: "`len()` is a free function. The vast majority of containers support it.",
            },
            {
              concept: "Filter + map",
              knownCode:
                "std::vector<int> evens;\nfor (int x : xs) if (x % 2 == 0) evens.push_back(x);",
              targetCode: "evens = [x for x in xs if x % 2 == 0]",
              note: "List comprehensions replace push-back loops 90% of the time.",
            },
          ],
          realWorld:
            "When performance matters and the elements are homogeneous (all ints, all floats), reach for `array.array` or `numpy.ndarray`. `list` is for flexibility, not raw speed.",
          exercise: {
            id: "ex-cpp-lists",
            prompt:
              "Given `nums = [1, 2, 3, 4, 5]`, build `evens` containing only even numbers and print it.",
            starterCode:
              "nums = [1, 2, 3, 4, 5]\n# Build evens and print\n",
            solution:
              "nums = [1, 2, 3, 4, 5]\nevens = [x for x in nums if x % 2 == 0]\nprint(evens)",
            expectedOutputIncludes: "[2, 4]",
            xp: 35,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-list-1",
          prompt: "C++'s `xs.size()` corresponds to Python's…",
          choices: ["xs.size()", "xs.length", "len(xs)", "size(xs)"],
          correctIndex: 2,
          explanation: "`len()` is the universal way to get a sequence's length.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-list-2",
          prompt: "Why does this print [1, 2, 3] instead of [2, 3]?",
          brokenCode:
            "xs = [1, 2, 3]\nxs[1:]\nprint(xs)",
          choices: [
            "Slicing returns a *new* list — the original isn't mutated",
            "Need parentheses around the slice",
            "Use `xs.slice(1)` instead",
            "`xs[1:]` is a syntax error",
          ],
          correctIndex: 0,
          explanation:
            "`xs[1:]` returns a copy. To drop the first element in place, use `del xs[0]` or reassign: `xs = xs[1:]`.",
          xp: 15,
        },
      ],
    },
    {
      id: "cpp-py-dicts",
      title: "Maps & Dicts",
      tagline: "`std::unordered_map` → `dict`, batteries included.",
      icon: "📦",
      level: "intermediate",
      order: 6,
      requires: ["cpp-py-lists"],
      rewardXp: 100,
      lessons: [
        {
          id: "lesson-cpp-dicts",
          title: "Key-value containers",
          intro:
            "Python's `dict` is an insertion-ordered hash map — like `std::unordered_map` but heterogeneous and built into the syntax. Literals use `{}`, lookups use `[]`, and iteration gives you keys by default (or `.items()` for pairs).",
          comparisons: [
            {
              concept: "Create",
              knownCode:
                'std::unordered_map<std::string, int> ages = {\n  {"Ada", 36},\n  {"Bob", 41}\n};',
              targetCode: 'ages = {"Ada": 36, "Bob": 41}',
            },
            {
              concept: "Access (with default)",
              knownCode:
                'auto it = ages.find("Ada");\nint age = (it != ages.end()) ? it->second : 0;',
              targetCode: "age = ages.get('Ada', 0)",
              note: "`.get(key, default)` is the safe accessor. `ages['Ada']` raises `KeyError` if missing.",
            },
            {
              concept: "Iterate",
              knownCode:
                "for (const auto& [k, v] : ages) {\n  std::cout << k << ' ' << v << '\\n';\n}",
              targetCode: "for k, v in ages.items():\n    print(k, v)",
              note: "Structured bindings (C++17) ↔ tuple unpacking — same vibe.",
            },
            {
              concept: "Merge",
              knownCode:
                "for (const auto& [k, v] : b) a[k] = v;",
              targetCode: "merged = {**a, **b}\n# or in 3.9+: merged = a | b",
            },
          ],
          realWorld:
            "Pre-3.7 Python dicts did *not* preserve insertion order — that guarantee is recent. Modern code relies on it heavily (think JSON serialization, config files).",
          exercise: {
            id: "ex-cpp-dicts",
            prompt:
              "Given `user = {'name': 'Ada', 'age': 36}`, print just the name.",
            starterCode:
              "user = {'name': 'Ada', 'age': 36}\n# Print the name\n",
            solution:
              "user = {'name': 'Ada', 'age': 36}\nprint(user['name'])",
            expectedOutputIncludes: "Ada",
            xp: 35,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-dict-1",
          prompt:
            "Safely fetch `ages['Ada']` with default 0 if missing — Pythonic way?",
          choices: [
            "ages['Ada'] || 0",
            "ages.get('Ada', 0)",
            "ages.find('Ada', 0)",
            "try: ages['Ada'] except: 0",
          ],
          correctIndex: 1,
          explanation:
            "`.get(key, default)` is the idiomatic safe accessor.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-dict-2",
          prompt: "Why does this raise KeyError?",
          brokenCode:
            "ages = {'Ada': 36}\nprint(ages['Bob'])",
          choices: [
            "`Bob` is not in the dict; use `ages.get('Bob')` for a `None` return",
            "Dict keys must be ints",
            "Need to import dict",
            "Missing quotes",
          ],
          correctIndex: 0,
          explanation:
            "`[]` raises if missing. Use `.get()` (returns None) or check with `in`.",
          xp: 15,
        },
      ],
    },
    {
      id: "cpp-py-classes",
      title: "Classes",
      tagline: "No headers, no destructors, no pointers — just behavior.",
      icon: "👑",
      level: "intermediate",
      order: 7,
      requires: ["cpp-py-dicts"],
      rewardXp: 120,
      lessons: [
        {
          id: "lesson-cpp-classes",
          title: "Classes & instances",
          intro:
            "Python classes look like C++ classes minus the ceremony: no `.h` file, no `public:`/`private:`, no destructor (the GC handles it), and `self` is an explicit first parameter on every method (it's like `this` made visible). Construction runs `__init__`.",
          comparisons: [
            {
              concept: "Define a class",
              knownCode:
                "class Hero {\npublic:\n  Hero(std::string n) : name(std::move(n)) {}\n  std::string greet() const {\n    return \"Hi, \" + name;\n  }\nprivate:\n  std::string name;\n};",
              targetCode:
                "class Hero:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        return f'Hi, {self.name}'",
              note: "By convention, `_name` is 'private' (don't touch from outside). Python doesn't truly enforce it.",
            },
            {
              concept: "Instantiate",
              knownCode:
                'Hero h("Ada");\nstd::cout << h.greet() << \'\\n\';',
              targetCode: "h = Hero('Ada')\nprint(h.greet())",
              note: "No `new` keyword. No `delete` — GC reclaims memory.",
            },
            {
              concept: "Inheritance",
              knownCode:
                "class Mage : public Hero {\npublic:\n  Mage(std::string n, std::string s)\n    : Hero(std::move(n)), spell(std::move(s)) {}\n  std::string spell;\n};",
              targetCode:
                "class Mage(Hero):\n    def __init__(self, name, spell):\n        super().__init__(name)\n        self.spell = spell",
            },
          ],
          realWorld:
            "For data-only classes, modern Python reaches for `@dataclass` — auto-generates `__init__`, `__repr__`, equality, and more. It's the closest thing to a C++ struct.",
          exercise: {
            id: "ex-cpp-classes",
            prompt:
              "Define a class `Counter` with `count` starting at 0 and an `inc()` method. Print `c.count` after two `inc()` calls.",
            starterCode: "# class Counter ...\n",
            solution:
              "class Counter:\n    def __init__(self):\n        self.count = 0\n    def inc(self):\n        self.count += 1\nc = Counter()\nc.inc()\nc.inc()\nprint(c.count)",
            expectedOutputIncludes: "2",
            xp: 45,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-cls-1",
          prompt: "C++'s constructor `Hero(...)` corresponds to Python's…",
          choices: ["init()", "__init__()", "constructor()", "Hero()"],
          correctIndex: 1,
          explanation:
            "`__init__` runs after the instance is created. There is also `__new__` for advanced cases.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-cls-2",
          prompt: "What is `self` in a Python method?",
          choices: [
            "A keyword like C++'s `this`",
            "An explicit first parameter referencing the instance",
            "A reserved name you can't rename",
            "A class-level constant",
          ],
          correctIndex: 1,
          explanation:
            "`self` is *just a parameter* by convention. You could legally call it anything — but don't.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-cls-3",
          prompt: "Why does this raise TypeError: missing 'self'?",
          brokenCode:
            "class H:\n    def greet():\n        return 'hi'\n\nH().greet()",
          choices: [
            "Methods must list `self` as their first parameter",
            "Need `static` keyword",
            "Use `def __greet__`",
            "Should be `class H():`",
          ],
          correctIndex: 0,
          explanation:
            "Bound methods receive the instance automatically as the first argument, so `self` (or any first param) must be listed.",
          xp: 15,
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
