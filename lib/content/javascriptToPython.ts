import type { Course } from "@/lib/types";

export const javascriptToPython: Course = {
  id: "javascript-to-python",
  knownLang: "javascript",
  targetLang: "python",
  title: "JavaScript → Python",
  modules: [
    // ===================== BEGINNER =====================
    { id: "js-py-variables", title: "Variables & Types", tagline: "Drop the braces, semicolons, and let/const.", icon: "🏰", level: "beginner", order: 1, requires: [], rewardXp: 60,
      lessons: [
        { id: "lesson-js-py-vars-1", title: "Dynamic typing without ceremony", intro: "Python is dynamically typed like JS but simpler. No let/const/var — just assign. No semicolons. Indentation defines blocks. `True/False/None` are capitalized. `==` compares values (no coercion issues like JS). Python has `int` AND `float` — unlike JS's single number type.", comparisons: [
            { concept: "Declaration", knownCode: "let count = 0;\nconst name = 'Ada';\nlet done = true;", targetCode: "count = 0\nname = 'Ada'\ndone = True", note: "No keywords. No semicolons. `true` → `True`." },
            { concept: "Constants", knownCode: "const MAX = 100;", targetCode: "MAX = 100  # ALL_CAPS convention (not enforced)", note: "Python has no `const`. Convention only." },
            { concept: "Integer type", knownCode: "const a = 42;  // Double\nconst big = 2n ** 100n;  // BigInt", targetCode: "a = 42        # Real integer\nbig = 2 ** 100  # Arbitrary precision!", note: "Python ints have unlimited precision. No BigInt needed." },
            { concept: "Equality", knownCode: "a === b  // Strict\na == b   // Coercing (avoid!)", targetCode: "a == b   # Always value comparison\na is b   # Identity (same object)", note: "Python `==` is always safe. No coercion issues." },
          ], realWorld: "Python's simplicity is its strength. No let/const/var bikeshedding, no semicolons, no type coercion bugs.",
          exercise: { id: "ex-js-py-vars-1", prompt: "Assign name='Ada', age=36. Print with f-string.", starterCode: "# Declare and print\n", solution: "name = 'Ada'\nage = 36\nprint(f'{name} is {age}')", expectedOutputIncludes: "Ada is 36", xp: 20 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-py-var-1", prompt: "JS `true` → Python…", choices: ["true", "True", "TRUE", "1"], correctIndex: 1, explanation: "Python capitalizes: `True`, `False`, `None`.", xp: 10 },
        { kind: "mcq", id: "q-js-py-var-2", prompt: "JS `null` → Python…", choices: ["null", "nil", "None", "undefined"], correctIndex: 2, explanation: "Python uses `None`. No `undefined` concept.", xp: 10 },
        { kind: "mcq", id: "q-js-py-var-3", prompt: "Python `==` is like JS…", choices: ["==", "===", "Both", "Neither"], correctIndex: 1, explanation: "Python `==` always compares values correctly. No coercion.", xp: 10 },
        { kind: "debug", id: "q-js-py-var-4", prompt: "Why does this error?", brokenCode: "let x = 42", choices: ["Python doesn't use let/const — just `x = 42`", "Missing semicolon", "let is deprecated", "42 is invalid"], correctIndex: 0, explanation: "Python has no declaration keywords. Just assign.", xp: 15 },
        { kind: "mcq", id: "q-js-py-var-5", prompt: "Python integers are…", choices: ["64-bit doubles (like JS)", "Arbitrary precision", "32-bit signed", "Fixed size"], correctIndex: 1, explanation: "Python ints grow as needed. No overflow. No BigInt needed.", xp: 10 },
      ],
    },
    { id: "js-py-controlflow", title: "Control Flow", tagline: "Indentation IS the block — no braces.", icon: "🛡️", level: "beginner", order: 2, requires: ["js-py-variables"], rewardXp: 70,
      lessons: [
        { id: "lesson-js-py-cf-1", title: "Indentation-based blocks", intro: "Python uses indentation for blocks. No braces, no parentheses around conditions (optional). `else if` → `elif`. Truthiness is different: `[]`, `{}`, `0`, `''`, `None` are all falsy (unlike JS where `[]` and `{}` are truthy).", comparisons: [
            { concept: "if/else if/else", knownCode: "if (score > 90) {\n    console.log('A');\n} else if (score > 75) {\n    console.log('B');\n} else {\n    console.log('C');\n}", targetCode: "if score > 90:\n    print('A')\nelif score > 75:\n    print('B')\nelse:\n    print('C')" },
            { concept: "Truthiness", knownCode: "if ([]) { ... }   // truthy in JS!\nif ({}) { ... }   // truthy in JS!", targetCode: "if []:  # falsy in Python!\n    ...\nif {}:  # falsy in Python!", note: "Empty collections ARE falsy in Python (unlike JS)." },
            { concept: "Ternary", knownCode: "const r = x > 0 ? 'yes' : 'no';", targetCode: "r = 'yes' if x > 0 else 'no'", note: "Reads like English: `value_if_true if condition else value_if_false`." },
            { concept: "and/or/not", knownCode: "if (a && b || !c) { ... }", targetCode: "if a and b or not c:\n    ...", note: "Python uses words: `and`, `or`, `not`." },
          ], realWorld: "Python's truthiness for empty collections is more intuitive. `if items:` checks non-empty directly.",
          exercise: { id: "ex-js-py-cf-1", prompt: "Given n=7, print 'odd' or 'even' using Python ternary.", starterCode: "n = 7\n# Ternary\n", solution: "n = 7\nresult = 'odd' if n % 2 != 0 else 'even'\nprint(result)", expectedOutputIncludes: "odd", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-py-cf-1", prompt: "JS `else if` → Python…", choices: ["else if", "elseif", "elif", "elsif"], correctIndex: 2, explanation: "`elif` in Python.", xp: 10 },
        { kind: "mcq", id: "q-js-py-cf-2", prompt: "Is `[]` falsy in Python?", choices: ["No — like JS", "Yes — empty collections are falsy"], correctIndex: 1, explanation: "Python: empty list/dict/set/string and 0 and None are falsy.", xp: 10 },
        { kind: "mcq", id: "q-js-py-cf-3", prompt: "JS `&&` → Python…", choices: ["&&", "and", "&", "AND"], correctIndex: 1, explanation: "Python uses English words: `and`, `or`, `not`.", xp: 10 },
        { kind: "debug", id: "q-js-py-cf-4", prompt: "Why does this error?", brokenCode: "if (x > 5)\n    print('big')", choices: ["Missing colon `:` after condition", "Parentheses are wrong", "print is not a function", "Indentation error"], correctIndex: 0, explanation: "Python requires `:` after if, elif, else, for, while, def, class.", xp: 15 },
        { kind: "mcq", id: "q-js-py-cf-5", prompt: "Python ternary reads…", choices: ["condition ? a : b", "a if condition else b", "condition then a else b", "select(cond, a, b)"], correctIndex: 1, explanation: "Python: `value_if_true if condition else value_if_false`.", xp: 10 },
      ],
    },
    { id: "js-py-loops", title: "Loops & Comprehensions", tagline: "range(), enumerate(), and list comprehensions.", icon: "🌀", level: "beginner", order: 3, requires: ["js-py-controlflow"], rewardXp: 80,
      lessons: [
        { id: "lesson-js-py-loops-1", title: "Pythonic loops", intro: "JS's `for...of` → Python's `for x in items:`. Index loops use `range()`. `enumerate()` gives (index, value). List comprehensions `[expr for x in items if cond]` replace .map()/.filter(). They're more concise and faster.", comparisons: [
            { concept: "for...of → for...in", knownCode: "for (const word of words) {\n    console.log(word);\n}", targetCode: "for word in words:\n    print(word)" },
            { concept: "Index loop → range()", knownCode: "for (let i = 0; i < 5; i++) {\n    console.log(i);\n}", targetCode: "for i in range(5):\n    print(i)" },
            { concept: ".map/.filter → Comprehension", knownCode: "const result = nums\n    .filter(x => x > 0)\n    .map(x => x ** 2);", targetCode: "result = [x**2 for x in nums if x > 0]", note: "One line replaces chained method calls." },
            { concept: ".reduce → sum/builtins", knownCode: "const sum = nums.reduce((a, b) => a + b, 0);", targetCode: "total = sum(nums)", note: "Python has built-in `sum()`, `min()`, `max()`." },
            { concept: ".forEach(fn, i) → enumerate", knownCode: "items.forEach((item, i) => {\n    console.log(i, item);\n});", targetCode: "for i, item in enumerate(items):\n    print(i, item)" },
          ], realWorld: "List comprehensions are Python's killer feature. Faster than loops, more readable than method chains.",
          exercise: { id: "ex-js-py-loops-1", prompt: "Use a list comprehension to get squares of even nums from [1..6].", starterCode: "nums = [1, 2, 3, 4, 5, 6]\n# Comprehension\n", solution: "nums = [1, 2, 3, 4, 5, 6]\nresult = [x**2 for x in nums if x % 2 == 0]\nprint(result)", expectedOutputIncludes: "[4, 16, 36]", xp: 30 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-py-loop-1", prompt: "JS `for...of` → Python…", choices: ["for...of", "for x in items:", "for (x in items)", "forEach"], correctIndex: 1, explanation: "`for x in items:` (with colon, no parens).", xp: 10 },
        { kind: "mcq", id: "q-js-py-loop-2", prompt: ".map().filter() → Python…", choices: ["Method chains", "List comprehensions", "map() function only", "for loops"], correctIndex: 1, explanation: "`[expr for x in items if cond]` replaces chains.", xp: 10 },
        { kind: "mcq", id: "q-js-py-loop-3", prompt: ".reduce() for sum → Python…", choices: ["reduce()", "sum()", "accumulate()", "fold()"], correctIndex: 1, explanation: "Built-in `sum()`. Also `min()`, `max()`, `any()`, `all()`.", xp: 10 },
        { kind: "debug", id: "q-js-py-loop-4", prompt: "Why does range(5, 0) produce nothing?", brokenCode: "for i in range(5, 0):\n    print(i)  # Nothing!", choices: ["Need step -1: range(5, 0, -1)", "range takes one arg", "Missing colon", "5 > 0 is wrong"], correctIndex: 0, explanation: "Default step is +1. To count down, specify -1.", xp: 15 },
        { kind: "mcq", id: "q-js-py-loop-5", prompt: "`enumerate()` gives…", choices: ["Just indices", "(index, value) tuples", "Just values", "A dict"], correctIndex: 1, explanation: "`for i, val in enumerate(items):` — index and value.", xp: 10 },
      ],
    },
    { id: "js-py-functions", title: "Functions", tagline: "def, *args, **kwargs, and decorators.", icon: "⚔️", level: "beginner", order: 4, requires: ["js-py-loops"], rewardXp: 90,
      lessons: [
        { id: "lesson-js-py-fn-1", title: "Python functions", intro: "JS `function`/`=>` → Python `def`. Lambda is single-expression only. `*args` = `...rest`, `**kwargs` = destructured objects. f-strings replace template literals. Functions are first-class (same as JS).", comparisons: [
            { concept: "function → def", knownCode: "function add(a, b) {\n    return a + b;\n}", targetCode: "def add(a, b):\n    return a + b" },
            { concept: "Arrow → lambda", knownCode: "const sq = x => x ** 2;", targetCode: "sq = lambda x: x ** 2", note: "Lambdas are single-expression only. Use `def` for complex logic." },
            { concept: "...rest → *args/**kwargs", knownCode: "function log(...args) { console.log(...args); }", targetCode: "def log(*args, **kwargs):\n    print(*args)", note: "`**kwargs` captures keyword arguments — no JS equivalent." },
            { concept: "Template literal → f-string", knownCode: "`Hello, ${name}!`", targetCode: "f'Hello, {name}!'", note: "f-strings use `{expr}` not `${expr}`." },
          ], realWorld: "Python functions support named arguments by default: `func(name='Ada', age=36)`. Very powerful.",
          exercise: { id: "ex-js-py-fn-1", prompt: "Write greet(name='World') that prints 'Hello, {name}!'. Call with and without arg.", starterCode: "# def greet(...): ...\n", solution: "def greet(name='World'):\n    print(f'Hello, {name}!')\n\ngreet()\ngreet('Ada')", expectedOutputIncludes: "Hello, World!", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-py-fn-1", prompt: "JS arrow `=>` → Python…", choices: ["=>", "lambda", "->", "def"], correctIndex: 1, explanation: "`lambda x: x * 2` for single expressions. `def` for everything else.", xp: 10 },
        { kind: "mcq", id: "q-js-py-fn-2", prompt: "JS `...rest` → Python…", choices: ["...args", "*args", "rest", "spread"], correctIndex: 1, explanation: "`*args` collects positional args. `**kwargs` collects keyword args.", xp: 10 },
        { kind: "mcq", id: "q-js-py-fn-3", prompt: "Template `` `${x}` `` → Python…", choices: ["`${x}`", "f'{x}'", "'{}'.format(x)", "Both B and C"], correctIndex: 3, explanation: "f-strings (preferred) or .format() method.", xp: 10 },
        { kind: "debug", id: "q-js-py-fn-4", prompt: "Mutable default bug:", brokenCode: "def add(item, lst=[]):\n    lst.append(item)\n    return lst\nadd(1)  # [1]\nadd(2)  # [1, 2] — not [2]!", choices: ["Default mutable is shared across calls — use lst=None", "append is wrong", "Lists can't be defaults", "Missing return"], correctIndex: 0, explanation: "Mutable defaults are created once. Use `def f(lst=None): lst = lst or []`.", xp: 15 },
        { kind: "mcq", id: "q-js-py-fn-5", prompt: "Python supports named arguments:", choices: ["No", "Yes — func(name='Ada', age=36)", "Only with **kwargs", "Only with dataclasses"], correctIndex: 1, explanation: "All Python functions support keyword arguments by default.", xp: 10 },
      ],
    },
    { id: "js-py-collections", title: "Collections", tagline: "Lists, dicts, sets, tuples — batteries included.", icon: "📜", level: "beginner", order: 5, requires: ["js-py-functions"], rewardXp: 100,
      lessons: [
        { id: "lesson-js-py-col-1", title: "Built-in collections", intro: "JS arrays → Python lists. JS objects → Python dicts. Python also has tuples (immutable) and sets (unique values). Slicing `[1:4]` is a killer feature. No destructuring syntax differences — Python uses `a, b = 1, 2`.", comparisons: [
            { concept: "Array → list", knownCode: "const nums = [1, 2, 3];\nnums.push(4);", targetCode: "nums = [1, 2, 3]\nnums.append(4)", note: ".push() → .append()." },
            { concept: "Object → dict", knownCode: "const user = { name: 'Ada', age: 36 };", targetCode: "user = {'name': 'Ada', 'age': 36}", note: "Keys are always strings or hashable values. Quotes required." },
            { concept: "Destructuring → unpacking", knownCode: "const { name, age } = user;\nconst [a, ...rest] = [1, 2, 3];", targetCode: "name, age = user['name'], user['age']\na, *rest = [1, 2, 3]", note: "Python has tuple unpacking. No object destructuring syntax." },
            { concept: "Spread → unpacking", knownCode: "const merged = { ...a, ...b };\nconst combined = [...x, ...y];", targetCode: "merged = {**a, **b}\ncombined = [*x, *y]", note: "`**` for dicts, `*` for lists." },
            { concept: "Slicing", knownCode: "items.slice(1, 4);\nitems[items.length - 1];", targetCode: "items[1:4]\nitems[-1]  # Last element!", note: "Negative indices, step: `items[::2]`, `items[::-1]`." },
          ], realWorld: "Python slicing and negative indices are incredibly powerful. No other language matches this elegance.",
          exercise: { id: "ex-js-py-col-1", prompt: "Create dict scores = {'Alice': 90, 'Bob': 85}. Print Bob's score.", starterCode: "# Create and print\n", solution: "scores = {'Alice': 90, 'Bob': 85}\nprint(scores['Bob'])", expectedOutputIncludes: "85", xp: 20 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-py-col-1", prompt: "JS `.push()` → Python…", choices: ["push()", "append()", "add()", "insert()"], correctIndex: 1, explanation: "`.append()` adds to end.", xp: 10 },
        { kind: "mcq", id: "q-js-py-col-2", prompt: "JS `...spread` → Python…", choices: ["...spread", "* for lists, ** for dicts", "spread()", "copy()"], correctIndex: 1, explanation: "`[*a, *b]` and `{**a, **b}` for unpacking.", xp: 10 },
        { kind: "mcq", id: "q-js-py-col-3", prompt: "`items[-1]` returns…", choices: ["Error", "Last element", "First element", "Reversed list"], correctIndex: 1, explanation: "Negative indices count from end: -1 = last, -2 = second-to-last.", xp: 10 },
        { kind: "debug", id: "q-js-py-col-4", prompt: "Why does this fail?", brokenCode: "d = {}\nd.name = 'Ada'", choices: ["Python dicts use `d['name'] = 'Ada'`, not dot notation", "d is immutable", "name is reserved", "Missing import"], correctIndex: 0, explanation: "Python dicts use bracket notation. Dot notation is for object attributes.", xp: 15 },
        { kind: "mcq", id: "q-js-py-col-5", prompt: "Python has tuples. JS…", choices: ["Also has tuples", "Has no tuples — use arrays or Object.freeze", "Has frozen arrays", "Uses const arrays"], correctIndex: 1, explanation: "Python tuples are immutable. JS has no equivalent built-in.", xp: 10 },
      ],
    },
    // ===================== INTERMEDIATE =====================
    { id: "js-py-oop", title: "OOP & Classes", tagline: "self, __init__, and duck typing.", icon: "👑", level: "intermediate", order: 1, requires: [], rewardXp: 120,
      lessons: [
        { id: "lesson-js-py-oop-1", title: "Python classes", intro: "JS `constructor` → Python `__init__(self)`. `self` is explicit (like a visible `this`). No `#private` — use `_convention`. Multiple inheritance is supported. `@dataclass` auto-generates boilerplate. Duck typing replaces interfaces.", comparisons: [
            { concept: "Class", knownCode: "class Dog {\n    #name;\n    constructor(name) { this.#name = name; }\n    bark() { return `${this.#name} barks!`; }\n}", targetCode: "class Dog:\n    def __init__(self, name):\n        self._name = name\n    def bark(self):\n        return f'{self._name} barks!'" },
            { concept: "Extends → inherits", knownCode: "class Puppy extends Dog { constructor(name) { super(name); } }", targetCode: "class Puppy(Dog):\n    def __init__(self, name):\n        super().__init__(name)" },
            { concept: "@dataclass", knownCode: "// No direct JS equivalent", targetCode: "from dataclasses import dataclass\n@dataclass\nclass Point:\n    x: int\n    y: int", note: "Auto __init__, __repr__, __eq__. Like a record/DTO." },
          ], realWorld: "Python's duck typing: 'If it has a .read() method, it's file-like.' No interface declaration needed.",
          exercise: { id: "ex-js-py-oop-1", prompt: "Create @dataclass Point with x, y. Print Point(3, 4).", starterCode: "from dataclasses import dataclass\n# ...\n", solution: "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\nprint(Point(3, 4))", expectedOutputIncludes: "Point(x=3, y=4)", xp: 35 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-py-oop-1", prompt: "JS `constructor()` → Python…", choices: ["constructor()", "__init__(self)", "init(self)", "new()"], correctIndex: 1, explanation: "`__init__` initializes instances. `self` is explicit.", xp: 10 },
        { kind: "mcq", id: "q-js-py-oop-2", prompt: "JS `this` → Python…", choices: ["this", "self (explicit parameter)", "me", "cls"], correctIndex: 1, explanation: "`self` must be the first parameter of every instance method.", xp: 10 },
        { kind: "mcq", id: "q-js-py-oop-3", prompt: "JS `#private` → Python…", choices: ["#private", "_convention (not enforced)", "@private", "def __private"], correctIndex: 1, explanation: "Python uses `_` prefix convention. `__` triggers name mangling.", xp: 10 },
        { kind: "debug", id: "q-js-py-oop-4", prompt: "Why does print(Dog('Rex')) show '<Dog object>'?", brokenCode: "class Dog:\n    def __init__(self, name): self.name = name\nprint(Dog('Rex'))", choices: ["No __str__ method — add def __str__(self)", "name is private", "Missing new", "print doesn't work"], correctIndex: 0, explanation: "Add `__str__` to control what `print()` shows.", xp: 15 },
        { kind: "mcq", id: "q-js-py-oop-5", prompt: "@dataclass generates…", choices: ["Only __init__", "__init__, __repr__, __eq__ and more", "Only getters", "Nothing"], correctIndex: 1, explanation: "Dataclasses auto-generate boilerplate from type annotations.", xp: 10 },
      ],
    },
    { id: "js-py-errors", title: "Error Handling", tagline: "try/except, raise, and with.", icon: "🔥", level: "intermediate", order: 2, requires: ["js-py-oop"], rewardXp: 110,
      lessons: [
        { id: "lesson-js-py-err-1", title: "Python exceptions", intro: "JS `try/catch` → Python `try/except`. Python adds `else` block (runs if no exception). `with` (context managers) handles resource cleanup like JS's try/finally. EAFP pattern: try the operation, handle the exception.", comparisons: [
            { concept: "try/catch → try/except", knownCode: "try {\n    JSON.parse(s);\n} catch (e) {\n    console.error(e.message);\n}", targetCode: "try:\n    json.loads(s)\nexcept json.JSONDecodeError as e:\n    print(e)" },
            { concept: "throw → raise", knownCode: "throw new Error('bad');", targetCode: "raise ValueError('bad')", note: "No `new`. Python has specific exception types." },
            { concept: "finally → with", knownCode: "let f;\ntry { f = openFile(); } finally { f?.close(); }", targetCode: "with open('file.txt') as f:\n    data = f.read()\n# Automatically closed!", note: "`with` is cleaner than try/finally for resources." },
          ], realWorld: "Python's `with` statement is one of its best features for resource management.",
          exercise: { id: "ex-js-py-err-1", prompt: "Parse invalid JSON with json.loads and handle JSONDecodeError.", starterCode: "import json\n# Try to parse invalid JSON\n", solution: "import json\ntry:\n    json.loads('invalid')\nexcept json.JSONDecodeError:\n    print('Invalid JSON')", expectedOutputIncludes: "Invalid JSON", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-py-err-1", prompt: "JS `catch` → Python…", choices: ["catch", "except", "handle", "rescue"], correctIndex: 1, explanation: "`except ExceptionType as e:`.", xp: 10 },
        { kind: "mcq", id: "q-js-py-err-2", prompt: "JS `throw` → Python…", choices: ["throw", "raise", "emit", "error"], correctIndex: 1, explanation: "`raise ValueError('message')`.", xp: 10 },
        { kind: "mcq", id: "q-js-py-err-3", prompt: "JS try/finally → Python…", choices: ["try/finally (same) or with", "Only try/finally", "Only with", "using"], correctIndex: 0, explanation: "Python has both. `with` is preferred for resources.", xp: 10 },
        { kind: "debug", id: "q-js-py-err-4", prompt: "What's wrong with bare except?", brokenCode: "try:\n    risky()\nexcept:\n    pass", choices: ["Catches everything including KeyboardInterrupt — use except Exception", "pass is invalid", "Missing as", "risky needs args"], correctIndex: 0, explanation: "Bare `except:` catches SystemExit, KeyboardInterrupt. Use `except Exception:`.", xp: 15 },
        { kind: "mcq", id: "q-js-py-err-5", prompt: "Python's `else` in try block runs…", choices: ["On error", "When no exception occurs", "Always", "Never"], correctIndex: 1, explanation: "`try: ... except: ... else: (runs if no exception) ... finally: (always)`.", xp: 10 },
      ],
    },
    { id: "js-py-modules", title: "Modules & pip", tagline: "import, pip, and virtual environments.", icon: "📦", level: "intermediate", order: 3, requires: ["js-py-errors"], rewardXp: 100,
      lessons: [
        { id: "lesson-js-py-mod-1", title: "Python modules", intro: "Every `.py` file is a module. `import module` or `from module import func`. npm → pip. package.json → requirements.txt. Virtual environments (venv) isolate deps per project.", comparisons: [
            { concept: "import", knownCode: "import { join } from 'path';\nimport fs from 'fs';", targetCode: "from os.path import join\nimport os" },
            { concept: "npm → pip", knownCode: "npm install express", targetCode: "pip install flask" },
            { concept: "package.json → requirements.txt", knownCode: "// package.json dependencies", targetCode: "# requirements.txt\nflask==2.3.0\nrequests>=2.28" },
          ], realWorld: "Modern Python uses `pyproject.toml`. Poetry and uv are popular pip alternatives.",
          exercise: { id: "ex-js-py-mod-1", prompt: "Import `math` and print sqrt(144).", starterCode: "# Import and compute\n", solution: "import math\nprint(math.sqrt(144))", expectedOutputIncludes: "12", xp: 15 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-py-mod-1", prompt: "npm → Python…", choices: ["pip", "npm", "yarn", "apt"], correctIndex: 0, explanation: "pip installs from PyPI.", xp: 10 },
        { kind: "mcq", id: "q-js-py-mod-2", prompt: "package.json → Python…", choices: ["requirements.txt or pyproject.toml", "package.py", "setup.json", "modules.txt"], correctIndex: 0, explanation: "`requirements.txt` for deps. `pyproject.toml` for modern projects.", xp: 10 },
        { kind: "mcq", id: "q-js-py-mod-3", prompt: "node_modules → Python…", choices: ["py_modules", "venv/lib (virtual environment)", "packages/", ".modules/"], correctIndex: 1, explanation: "Virtual environments isolate deps per project.", xp: 10 },
        { kind: "debug", id: "q-js-py-mod-4", prompt: "Why does this fail?", brokenCode: "import { sqrt } from 'math'", choices: ["Python syntax: `from math import sqrt`", "math is not installed", "Braces are wrong", "Missing semicolon"], correctIndex: 0, explanation: "Python import syntax: `from module import name` (no braces, no quotes).", xp: 15 },
      ],
    },
    { id: "js-py-functional", title: "Functional Patterns", tagline: "Comprehensions, generators, and decorators.", icon: "⚡", level: "intermediate", order: 4, requires: ["js-py-modules"], rewardXp: 130,
      lessons: [
        { id: "lesson-js-py-func-1", title: "Comprehensions and generators", intro: "JS `.map().filter()` → Python comprehensions. Generator expressions `(expr for x in ...)` are lazy. `yield` creates generator functions. Python also has decorators — a pattern JS lacks.", comparisons: [
            { concept: ".filter().map() → comprehension", knownCode: "nums.filter(x => x > 0).map(x => x ** 2)", targetCode: "[x**2 for x in nums if x > 0]", note: "One line replaces chained calls. Faster too." },
            { concept: "Lazy iterator", knownCode: "// Generator function\nfunction* gen() { yield 1; yield 2; }", targetCode: "def gen():\n    yield 1\n    yield 2", note: "Same `yield` concept. Python uses `def`, not `function*`." },
            { concept: "Decorator", knownCode: "// No native decorator syntax\nfunction withLogging(fn) { return (...args) => { console.log('call'); return fn(...args); }; }", targetCode: "@with_logging\ndef my_func():\n    pass", note: "Python decorators have clean `@` syntax." },
          ], realWorld: "Comprehensions + generators + decorators = Python's three superpowers for clean, efficient code.",
          exercise: { id: "ex-js-py-func-1", prompt: "Write a decorator `uppercase` that uppercases a function's return. Apply to greet() returning 'hello'.", starterCode: "def uppercase(func):\n    pass\n\n# @uppercase ...\n", solution: "def uppercase(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper()\n    return wrapper\n\n@uppercase\ndef greet():\n    return 'hello'\n\nprint(greet())", expectedOutputIncludes: "HELLO", xp: 45 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-py-func-1", prompt: ".map().filter() → Python…", choices: ["Same method chains", "List comprehensions", "map() only", "for loops"], correctIndex: 1, explanation: "`[expr for x in items if cond]` replaces chains.", xp: 10 },
        { kind: "mcq", id: "q-js-py-func-2", prompt: "JS `function*` → Python…", choices: ["function*", "def with yield", "gen()", "async def"], correctIndex: 1, explanation: "Any `def` with `yield` becomes a generator.", xp: 10 },
        { kind: "mcq", id: "q-js-py-func-3", prompt: "Python's `@decorator` has native syntax. JS…", choices: ["Also has @decorator", "Uses higher-order functions (no @ syntax)", "Has @decorator in TypeScript", "Uses Proxy"], correctIndex: 1, explanation: "JS has a TC39 decorator proposal but it's not standard yet.", xp: 10 },
        { kind: "debug", id: "q-js-py-func-4", prompt: "Generator empty on second iteration:", brokenCode: "gen = (x for x in [1,2,3])\nlist(gen)  # [1,2,3]\nlist(gen)  # []!", choices: ["Generators are single-use — exhausted after first iteration", "gen is deleted", "list consumes it", "Missing yield"], correctIndex: 0, explanation: "Generators are iterators — once consumed, they're done.", xp: 15 },
        { kind: "mcq", id: "q-js-py-func-5", prompt: "Python sorted(items, key=fn) → JS…", choices: ["items.sort(fn)", "items.sort((a,b) => fn(a) - fn(b))", "sorted(items, fn)", "items.sorted(fn)"], correctIndex: 1, explanation: "JS sort needs a comparator function, not a key function.", xp: 10 },
      ],
    },
    // ===================== ADVANCED =====================
    { id: "js-py-async", title: "Async & Concurrency", tagline: "asyncio, the GIL, and multiprocessing.", icon: "🔄", level: "advanced", order: 1, requires: [], rewardXp: 170,
      lessons: [
        { id: "lesson-js-py-async-1", title: "Python async model", intro: "Both have async/await, but models differ. JS event loop is built-in and always running. Python's asyncio is opt-in (`asyncio.run()`). Python has the GIL — threads can't run Python code in parallel. Use multiprocessing for CPU parallelism.", comparisons: [
            { concept: "async/await", knownCode: "async function fetchData() {\n    const data = await getData();\n    return data;\n}", targetCode: "async def fetch_data():\n    data = await get_data()\n    return data\n\nasyncio.run(fetch_data())", note: "Must call `asyncio.run()` to start the event loop." },
            { concept: "Promise.all → gather", knownCode: "const [a, b] = await Promise.all([t1(), t2()]);", targetCode: "a, b = await asyncio.gather(task1(), task2())" },
            { concept: "setTimeout → asyncio.sleep", knownCode: "await new Promise(r => setTimeout(r, 1000));", targetCode: "await asyncio.sleep(1)" },
          ], realWorld: "Python: asyncio for I/O (FastAPI), multiprocessing for CPU. JS: everything is event-loop based.",
          exercise: { id: "ex-js-py-async-1", prompt: "Write async function that sleeps 0 seconds then returns 'done'. Run it.", starterCode: "import asyncio\n# async def ...\n", solution: "import asyncio\n\nasync def quick():\n    await asyncio.sleep(0)\n    return 'done'\n\nprint(asyncio.run(quick()))", expectedOutputIncludes: "done", xp: 40 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-py-async-1", prompt: "JS event loop is built-in. Python…", choices: ["Also built-in", "Needs asyncio.run() to start", "Has no event loop", "Uses threads"], correctIndex: 1, explanation: "Python's asyncio is opt-in. Must call `asyncio.run()`.", xp: 10 },
        { kind: "mcq", id: "q-js-py-async-2", prompt: "Promise.all → Python…", choices: ["Promise.all()", "asyncio.gather()", "concurrent.gather()", "async.all()"], correctIndex: 1, explanation: "`asyncio.gather(coro1(), coro2())`.", xp: 10 },
        { kind: "mcq", id: "q-js-py-async-3", prompt: "Python's GIL means…", choices: ["All threads are parallel", "Only one thread runs Python code at a time", "No threads exist", "GIL is a lock type"], correctIndex: 1, explanation: "GIL prevents parallel Python thread execution. Use multiprocessing for CPU.", xp: 10 },
        { kind: "debug", id: "q-js-py-async-4", prompt: "Why does this do nothing?", brokenCode: "async def main():\n    return 'hello'\nmain()  # Returns coroutine, not 'hello'!", choices: ["Must use asyncio.run(main())", "main can't be async", "Missing print", "return is wrong"], correctIndex: 0, explanation: "Calling async function returns a coroutine object. `asyncio.run()` executes it.", xp: 15 },
        { kind: "mcq", id: "q-js-py-async-5", prompt: "For CPU-bound parallelism, Python uses…", choices: ["threading", "asyncio", "multiprocessing", "event loop"], correctIndex: 2, explanation: "Separate processes bypass the GIL for true parallelism.", xp: 10 },
      ],
    },
    { id: "js-py-memory", title: "Memory & Performance", tagline: "CPython vs V8, profiling, optimization.", icon: "🧠", level: "advanced", order: 2, requires: ["js-py-async"], rewardXp: 150,
      lessons: [
        { id: "lesson-js-py-mem-1", title: "CPython internals", intro: "V8 (JS) uses JIT compilation — faster than CPython (interpreter-only). CPython uses reference counting + cyclic GC. For performance, use C extensions (NumPy), Cython, or PyPy. Python's strength is developer productivity, not raw speed.", comparisons: [
            { concept: "Performance", knownCode: "// V8: JIT, 5-20x faster than CPython", targetCode: "# CPython: interpreter only\n# Use NumPy for numeric performance\nimport numpy as np\narr = np.array([1,2,3]) * 2" },
            { concept: "GC", knownCode: "// V8: mark-and-sweep", targetCode: "# CPython: reference counting + cyclic GC\nimport gc\ngc.collect()  # Manual cycle collection" },
          ], realWorld: "Python's strength is ecosystem (NumPy, pandas, ML) and developer speed. Not raw performance.",
          exercise: { id: "ex-js-py-mem-1", prompt: "Use sys.getsizeof to print memory size of a list with 100 elements.", starterCode: "import sys\n# Size check\n", solution: "import sys\nbig = list(range(100))\nprint(sys.getsizeof(big))", expectedOutputIncludes: "", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-py-mem-1", prompt: "V8 is faster than CPython because…", choices: ["Better GC", "JIT compilation to native code", "More memory", "Better syntax"], correctIndex: 1, explanation: "V8 JIT-compiles hot functions. CPython interprets bytecode.", xp: 10 },
        { kind: "mcq", id: "q-js-py-mem-2", prompt: "For numeric performance, use…", choices: ["Loops", "NumPy (C extensions)", "Strings", "More RAM"], correctIndex: 1, explanation: "NumPy runs operations in optimized C code, bypassing Python overhead.", xp: 10 },
        { kind: "debug", id: "q-js-py-mem-3", prompt: "Why is this slow?", brokenCode: "result = []\nfor i in range(1000000):\n    result.append(i * 2)", choices: ["Use comprehension [i*2 for i in range(...)] — runs in optimized C", "append is slow", "range is slow", "Lists have limits"], correctIndex: 0, explanation: "Comprehensions are optimized at the bytecode level. Explicit loops are slower.", xp: 15 },
        { kind: "mcq", id: "q-js-py-mem-3b", prompt: "PyPy is…", choices: ["A package manager", "JIT-compiled Python (5-20x faster)", "A profiler", "A linter"], correctIndex: 1, explanation: "PyPy is an alternative Python implementation with JIT compilation.", xp: 10 },
        { kind: "mcq", id: "q-js-py-mem-4", prompt: "CPython's primary GC is…", choices: ["Mark-and-sweep", "Reference counting", "Generational", "Manual"], correctIndex: 1, explanation: "Reference counting is primary. Cyclic GC handles cycles.", xp: 10 },
      ],
    },
    { id: "js-py-advanced", title: "Advanced Patterns", tagline: "Decorators, metaclasses, and dunder magic.", icon: "✨", level: "advanced", order: 3, requires: ["js-py-memory"], rewardXp: 200,
      lessons: [
        { id: "lesson-js-py-adv-1", title: "Decorators and dunder methods", intro: "Python decorators (`@`) modify functions at definition. Dunder methods (`__add__`, `__getattr__`, `__iter__`) customize object behavior — like operator overloading. Metaclasses control class creation. Python's dynamism enables patterns impossible in JS.", comparisons: [
            { concept: "Higher-order function → Decorator", knownCode: "function withLogging(fn) {\n    return (...args) => { console.log('call'); return fn(...args); };\n}", targetCode: "def with_logging(fn):\n    def wrapper(*args, **kwargs):\n        print('call')\n        return fn(*args, **kwargs)\n    return wrapper\n\n@with_logging\ndef my_func(): pass" },
            { concept: "Proxy → __getattr__", knownCode: "new Proxy(obj, { get(t, p) { ... } })", targetCode: "class MyObj:\n    def __getattr__(self, name):\n        return f'{name} not found'", note: "Dunder methods are Python's operator overloading." },
            { concept: "@property", knownCode: "get x() { return this.#x; }", targetCode: "class Obj:\n    @property\n    def x(self):\n        return self._x", note: "Access `obj.x` like a field, runs a method." },
          ], realWorld: "Decorators power Flask/Django routes, pytest fixtures, and FastAPI endpoints.",
          exercise: { id: "ex-js-py-adv-1", prompt: "Create a class with __add__ to add two Points. Test Point(1,2) + Point(3,4).", starterCode: "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    # __add__ ...\n", solution: "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n        return Point(self.x + other.x, self.y + other.y)\n    def __repr__(self):\n        return f'Point({self.x}, {self.y})'\n\nprint(Point(1, 2) + Point(3, 4))", expectedOutputIncludes: "Point(4, 6)", xp: 50 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-py-adv-1", prompt: "JS has no native `@decorator` syntax. Python…", choices: ["Also doesn't", "Has @decorator — one of its best features", "Only for classes", "Only in Python 3.12+"], correctIndex: 1, explanation: "Decorators are a core Python feature, used everywhere.", xp: 10 },
        { kind: "mcq", id: "q-js-py-adv-2", prompt: "`__add__` enables…", choices: ["Addition method", "Operator overloading: obj1 + obj2", "String concatenation", "Array append"], correctIndex: 1, explanation: "Dunder methods let you define behavior for operators.", xp: 10 },
        { kind: "mcq", id: "q-js-py-adv-3", prompt: "JS Proxy → Python…", choices: ["Proxy", "__getattr__, __setattr__ (dunder methods)", "proxy module", "metaclass"], correctIndex: 1, explanation: "Python's dunder methods intercept attribute access/set/delete.", xp: 10 },
        { kind: "debug", id: "q-js-py-adv-4", prompt: "Why does greet.__name__ show 'wrapper'?", brokenCode: "def dec(fn):\n    def wrapper(): return fn()\n    return wrapper\n@dec\ndef greet(): pass\nprint(greet.__name__)", choices: ["Missing @functools.wraps(fn)", "Decorators always rename", "__name__ is wrong", "greet doesn't exist"], correctIndex: 0, explanation: "`@functools.wraps(fn)` preserves the original function's metadata.", xp: 15 },
        { kind: "mcq", id: "q-js-py-adv-5", prompt: "Python metaclasses control…", choices: ["Object instances", "Class creation itself", "Module loading", "Garbage collection"], correctIndex: 1, explanation: "Metaclasses customize how classes are created — a very advanced feature.", xp: 10 },
      ],
    },
  ],
};
