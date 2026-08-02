import type { Course } from "@/lib/types";

export const cppToPython: Course = {
  id: "cpp-to-python",
  knownLang: "cpp",
  targetLang: "python",
  title: "C++ → Python",
  modules: [
    // ===================== BEGINNER =====================
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
          id: "lesson-cpp-py-vars-1",
          title: "Letting go of static types",
          intro:
            "C++ is statically typed — every variable needs a type annotation at declaration. Python is dynamically typed: a name is just a label you stick on any value, and you can re-stick it on a completely different type later. There's no `int x`, no `std::string s`. Just `x = 42` and `s = 'hello'`. Python also has no semicolons — a newline ends a statement.",
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
              targetCode: "PI = 3.14159  # Convention: ALL_CAPS means 'don't touch'",
              note: "Python has no `const`. ALL_CAPS is just a convention — nothing enforces it.",
            },
            {
              concept: "Multiple assignment",
              knownCode: "int a = 1;\nint b = 2;\nint c = 3;",
              targetCode: "a, b, c = 1, 2, 3",
              note: "Tuple unpacking — very Pythonic.",
            },
          ],
          realWorld:
            "Python codebases increasingly use type hints (`count: int = 0`) for tooling like mypy, but they're purely optional and not enforced at runtime.",
          exercise: {
            id: "ex-cpp-py-vars-1",
            prompt:
              'Declare `greeting` set to the string "world" and print it.',
            starterCode: "# Declare greeting and print it\n",
            solution: 'greeting = "world"\nprint(greeting)',
            expectedOutputIncludes: "world",
            xp: 20,
          },
        },
        {
          id: "lesson-cpp-py-vars-2",
          title: "Type checking and conversion",
          intro:
            "In C++, you cast with `static_cast<int>(x)` or C-style `(int)x`. In Python, you call the type as a function: `int(x)`, `str(x)`, `float(x)`. To check a type at runtime, use `type(x)` or `isinstance(x, int)`. The `isinstance` approach is preferred because it respects inheritance.",
          comparisons: [
            {
              concept: "Type casting",
              knownCode: 'int n = static_cast<int>(3.7);\nstd::string s = std::to_string(42);',
              targetCode: "n = int(3.7)     # 3 (truncates)\ns = str(42)      # '42'",
              note: "`int()` truncates toward zero, just like C++ `static_cast<int>`.",
            },
            {
              concept: "Type checking",
              knownCode: "// C++ is statically typed — compiler checks types",
              targetCode: "type(x)             # <class 'int'>\nisinstance(x, int)  # True",
              note: "Prefer `isinstance()` over `type()` — it handles subclasses.",
            },
          ],
          realWorld:
            "In production Python, you rarely check types manually. Use type hints + mypy for static analysis.",
          exercise: {
            id: "ex-cpp-py-vars-2",
            prompt:
              'Convert the string "123" to an integer, add 7, and print the result.',
            starterCode: 's = "123"\n# Convert and add 7\n',
            solution: 's = "123"\nresult = int(s) + 7\nprint(result)',
            expectedOutputIncludes: "130",
            xp: 20,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-py-var-1",
          prompt: "How do you end a statement in Python?",
          choices: ["With a semicolon ;", "With a newline", "With a period .", "With end;"],
          correctIndex: 1,
          explanation: "Newlines terminate statements. Semicolons are allowed but non-idiomatic.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-var-2",
          prompt: "What is the Python equivalent of `const int X = 5;`?",
          choices: [
            "const X = 5",
            "final X = 5",
            "X = 5  (ALL_CAPS convention)",
            "immutable X = 5",
          ],
          correctIndex: 2,
          explanation: "Python has no `const`. ALL_CAPS is just a naming convention.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-var-3",
          prompt: "Which is the correct way to convert a float to int in Python?",
          choices: ["(int)3.7", "static_cast<int>(3.7)", "int(3.7)", "Integer.valueOf(3.7)"],
          correctIndex: 2,
          explanation: "Call the type as a function: `int(3.7)` returns 3.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-py-var-4",
          prompt: "Why does this code fail?",
          brokenCode: 'x = "hello"\ny = x + 5',
          choices: [
            "You can't add a string and an integer — Python doesn't coerce types",
            "Variables need type declarations",
            "Missing semicolons",
            "x is immutable",
          ],
          correctIndex: 0,
          explanation:
            "Python won't implicitly convert between types. Use `int(x)` or `str(5)` to match types.",
          xp: 15,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-var-5",
          prompt: "What does `a, b = 1, 2` do in Python?",
          choices: [
            "Syntax error",
            "Creates a tuple (1, 2) and assigns to a",
            "Assigns 1 to a and 2 to b via tuple unpacking",
            "Creates two constants",
          ],
          correctIndex: 2,
          explanation: "This is tuple unpacking — a powerful Python idiom.",
          xp: 10,
        },
      ],
    },
    {
      id: "cpp-py-controlflow",
      title: "Control Flow",
      tagline: "No parens, no braces — indentation makes the block.",
      icon: "🛡️",
      level: "beginner",
      order: 2,
      requires: ["cpp-py-variables"],
      rewardXp: 70,
      lessons: [
        {
          id: "lesson-cpp-py-cond-1",
          title: "Branching, the Python way",
          intro:
            "Drop the parentheses around the condition and replace `{}` with a `:` followed by an indented block. `else if` becomes `elif`. Python uses `and`, `or`, `not` instead of `&&`, `||`, `!`. There's no switch statement in older Python; Python 3.10+ has `match/case` (structural pattern matching).",
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
              knownCode: "if (x > 0 && y > 0 || !done) { ... }",
              targetCode: "if x > 0 and y > 0 or not done:\n    ...",
              note: "Python spells them out: `and`, `or`, `not`. Reads like English.",
            },
            {
              concept: "Ternary expression",
              knownCode: "int result = (x > 0) ? x : -x;",
              targetCode: "result = x if x > 0 else -x",
              note: "Python's ternary reads like prose: value_if_true if condition else value_if_false.",
            },
          ],
          realWorld:
            "Pythonic style prefers truthiness checks (`if items:`) over length checks (`if len(items) > 0:`).",
          exercise: {
            id: "ex-cpp-py-cond-1",
            prompt:
              "Given `n = 7`, print 'even' if n is divisible by 2, otherwise 'odd'.",
            starterCode: "n = 7\n# Your branch here\n",
            solution:
              "n = 7\nif n % 2 == 0:\n    print('even')\nelse:\n    print('odd')",
            expectedOutputIncludes: "odd",
            xp: 25,
          },
        },
        {
          id: "lesson-cpp-py-cond-2",
          title: "Match/case (Python 3.10+)",
          intro:
            "Python 3.10 introduced structural pattern matching with `match/case`. Unlike C++ `switch`, it doesn't fall through, can destructure objects, and supports guard clauses with `if`. It's more powerful than a simple switch — think of it like Rust's `match`.",
          comparisons: [
            {
              concept: "Switch / match",
              knownCode:
                'switch (cmd) {\n  case "quit": exit(0); break;\n  case "help": show_help(); break;\n  default: std::cout << "unknown";\n}',
              targetCode:
                "match cmd:\n    case 'quit':\n        exit(0)\n    case 'help':\n        show_help()\n    case _:\n        print('unknown')",
              note: "`_` is the wildcard (like `default`). No `break` needed — no fall-through.",
            },
            {
              concept: "Pattern matching with guard",
              knownCode: "// No direct equivalent in C++",
              targetCode:
                "match point:\n    case (x, y) if x > 0 and y > 0:\n        print('first quadrant')\n    case (x, y):\n        print(f'({x}, {y})')",
              note: "Guards (`if ...`) add conditions to patterns.",
            },
          ],
          realWorld:
            "Match/case is especially powerful for parsing command arguments, HTTP routes, and AST transformations.",
          exercise: {
            id: "ex-cpp-py-cond-2",
            prompt:
              "Write a match statement that prints 'red' for status 0, 'yellow' for status 1, 'green' for status 2, and 'unknown' for anything else. Use status = 2.",
            starterCode: "status = 2\n# match statement here\n",
            solution:
              "status = 2\nmatch status:\n    case 0:\n        print('red')\n    case 1:\n        print('yellow')\n    case 2:\n        print('green')\n    case _:\n        print('unknown')",
            expectedOutputIncludes: "green",
            xp: 30,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-py-cond-1",
          prompt: "What is the Python equivalent of `else if`?",
          choices: ["elseif", "elsif", "elif", "else if"],
          correctIndex: 2,
          explanation: "Python uses `elif`.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-cond-2",
          prompt: "What are the logical operators in Python?",
          choices: ["&&, ||, !", "and, or, not", "&, |, ~", "AND, OR, NOT"],
          correctIndex: 1,
          explanation: "Python uses English words: `and`, `or`, `not`.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-cond-3",
          prompt: "How do you write a ternary expression in Python?",
          choices: [
            "x > 0 ? x : -x",
            "x if x > 0 else -x",
            "if x > 0 then x else -x",
            "(x > 0) && x || -x",
          ],
          correctIndex: 1,
          explanation:
            "Python ternary: `value_if_true if condition else value_if_false`.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-py-cond-4",
          prompt: "Why does this code produce an error?",
          brokenCode: "x = 10\nif (x > 5)\n    print('big')",
          choices: [
            "Missing colon after the condition",
            "Parentheses are not allowed",
            "print should be printf",
            "x is not defined",
          ],
          correctIndex: 0,
          explanation:
            "Python requires a `:` at the end of `if`, `elif`, `else`, `for`, `while`, etc. Parentheses are optional but the colon is mandatory.",
          xp: 15,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-cond-5",
          prompt: "In Python's `match/case`, what is the wildcard pattern?",
          choices: ["default:", "case *:", "case _:", "otherwise:"],
          correctIndex: 2,
          explanation: "`_` is the wildcard — matches anything, like `default` in C++.",
          xp: 10,
        },
      ],
    },
    {
      id: "cpp-py-loops",
      title: "Loops & Iteration",
      tagline: "`for (int i=0; ...)` becomes `for i in range(...)`.",
      icon: "🌀",
      level: "beginner",
      order: 3,
      requires: ["cpp-py-controlflow"],
      rewardXp: 80,
      lessons: [
        {
          id: "lesson-cpp-py-loops-1",
          title: "For loops and range()",
          intro:
            "Python's `for` loop iterates over any iterable — lists, strings, ranges, files. There is no C-style `for (int i = 0; i < n; i++)`. Instead, use `range(n)` to generate numbers 0 through n-1. `range(start, stop, step)` mirrors the three parts of a C-style for loop. Python also has `while` loops with the same semantics as C++.",
          comparisons: [
            {
              concept: "Index loop",
              knownCode: "for (int i = 0; i < 5; i++) {\n    std::cout << i << std::endl;\n}",
              targetCode: "for i in range(5):\n    print(i)",
              note: "`range(5)` gives 0, 1, 2, 3, 4 — the stop value is exclusive.",
            },
            {
              concept: "Range with start and step",
              knownCode: "for (int i = 2; i <= 10; i += 2) {\n    std::cout << i;\n}",
              targetCode: "for i in range(2, 11, 2):\n    print(i)",
              note: "`range(start, stop, step)`. Remember stop is exclusive, so 11 to include 10.",
            },
            {
              concept: "Iterating a collection",
              knownCode:
                'std::vector<std::string> words = {"hi", "there"};\nfor (const auto& w : words) {\n    std::cout << w;\n}',
              targetCode: 'words = ["hi", "there"]\nfor w in words:\n    print(w)',
            },
            {
              concept: "While loop",
              knownCode: "int n = 10;\nwhile (n > 0) {\n    n--;\n}",
              targetCode: "n = 10\nwhile n > 0:\n    n -= 1",
              note: "Python has no `--` operator. Use `n -= 1`.",
            },
          ],
          realWorld:
            "Prefer `for x in items:` over `for i in range(len(items)):`. If you need the index too, use `enumerate(items)`.",
          exercise: {
            id: "ex-cpp-py-loops-1",
            prompt: "Print the numbers 1 through 5, one per line.",
            starterCode: "# Print 1, 2, 3, 4, 5\n",
            solution: "for i in range(1, 6):\n    print(i)",
            expectedOutputIncludes: "1\n2\n3\n4\n5",
            xp: 25,
          },
        },
        {
          id: "lesson-cpp-py-loops-2",
          title: "enumerate, zip, and loop idioms",
          intro:
            "Python has powerful loop helpers. `enumerate(xs)` gives `(index, value)` pairs. `zip(a, b)` iterates two sequences in parallel. `break` and `continue` work like C++. Python's `for...else` runs the `else` block only if the loop completes without `break` — there's no C++ equivalent.",
          comparisons: [
            {
              concept: "enumerate (index + value)",
              knownCode:
                "for (int i = 0; i < words.size(); i++) {\n    std::cout << i << \": \" << words[i];\n}",
              targetCode:
                "for i, word in enumerate(words):\n    print(f'{i}: {word}')",
              note: "`enumerate` is cleaner than manual indexing.",
            },
            {
              concept: "zip (parallel iteration)",
              knownCode:
                "for (int i = 0; i < names.size(); i++) {\n    std::cout << names[i] << \": \" << scores[i];\n}",
              targetCode:
                "for name, score in zip(names, scores):\n    print(f'{name}: {score}')",
              note: "`zip` stops at the shortest sequence.",
            },
            {
              concept: "for...else",
              knownCode: "// No C++ equivalent",
              targetCode:
                "for x in items:\n    if x == target:\n        print('found')\n        break\nelse:\n    print('not found')",
              note: "The `else` only runs if the loop didn't `break`.",
            },
          ],
          realWorld:
            "`enumerate` and `zip` are among the most-used builtins in any Python codebase. Master them early.",
          exercise: {
            id: "ex-cpp-py-loops-2",
            prompt:
              'Given `fruits = ["apple", "banana", "cherry"]`, print each fruit with its index like "0: apple".',
            starterCode: 'fruits = ["apple", "banana", "cherry"]\n# Use enumerate\n',
            solution:
              'fruits = ["apple", "banana", "cherry"]\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")',
            expectedOutputIncludes: "0: apple",
            xp: 30,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-py-loop-1",
          prompt: "What does `range(3)` produce?",
          choices: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3, 2, 1"],
          correctIndex: 1,
          explanation: "`range(n)` starts at 0 and stops before n.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-loop-2",
          prompt: "How do you get both index and value while iterating a list?",
          choices: [
            "for i in range(len(xs)): xs[i]",
            "for i, x in enumerate(xs):",
            "for i, x in zip(xs):",
            "for x.index in xs:",
          ],
          correctIndex: 1,
          explanation: "`enumerate(xs)` yields `(index, value)` tuples.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-loop-3",
          prompt: "Python has no `i++` or `i--`. What do you use instead?",
          choices: ["i += 1 / i -= 1", "i.inc() / i.dec()", "++i / --i", "increment(i)"],
          correctIndex: 0,
          explanation: "Use `i += 1` and `i -= 1`. The `++`/`--` operators don't exist.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-py-loop-4",
          prompt: "Why does this loop print nothing?",
          brokenCode: "for i in range(5, 0):\n    print(i)",
          choices: [
            "`range(5, 0)` is empty — start > stop with default step +1",
            "range only takes one argument",
            "Missing parentheses",
            "i is not defined",
          ],
          correctIndex: 0,
          explanation:
            "To count down, use `range(5, 0, -1)`. With step +1, start must be < stop.",
          xp: 15,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-loop-5",
          prompt: "When does the `else` clause of a `for...else` execute?",
          choices: [
            "Always after the loop",
            "Only if the loop body raised an exception",
            "Only if the loop completed without hitting `break`",
            "Only if the loop ran zero times",
          ],
          correctIndex: 2,
          explanation: "The `else` runs when the loop finishes normally (no `break`).",
          xp: 10,
        },
      ],
    },
    {
      id: "cpp-py-functions",
      title: "Functions & Lambdas",
      tagline: "`def` replaces return-type + function signature.",
      icon: "⚔️",
      level: "beginner",
      order: 4,
      requires: ["cpp-py-loops"],
      rewardXp: 90,
      lessons: [
        {
          id: "lesson-cpp-py-fn-1",
          title: "Defining functions",
          intro:
            "Python functions are declared with `def name(params):`. No return type, no parameter types (though you can add hints). Default arguments work like C++. Python supports `*args` (variadic positional) and `**kwargs` (variadic keyword) — far more flexible than C++ variadic templates.",
          comparisons: [
            {
              concept: "Function definition",
              knownCode: "int add(int a, int b) {\n    return a + b;\n}",
              targetCode: "def add(a, b):\n    return a + b",
              note: "No type annotations needed (but you can add them: `def add(a: int, b: int) -> int:`).",
            },
            {
              concept: "Default arguments",
              knownCode: "void greet(std::string name = \"World\") { ... }",
              targetCode: 'def greet(name="World"):\n    print(f"Hello, {name}!")',
            },
            {
              concept: "Variadic arguments",
              knownCode: "// C++ variadic templates are complex",
              targetCode:
                "def log(*args, **kwargs):\n    print(*args)\n    # kwargs is a dict of keyword args",
              note: "`*args` collects positional args as a tuple; `**kwargs` collects keyword args as a dict.",
            },
          ],
          realWorld:
            "Type hints (`def add(a: int, b: int) -> int:`) are standard in production Python. They don't affect runtime but enable mypy and IDE support.",
          exercise: {
            id: "ex-cpp-py-fn-1",
            prompt:
              'Write a function `greet(name)` that returns `"Hello, {name}!"`. Print `greet("Ada")`.',
            starterCode: "# def greet(name): ...\n",
            solution:
              'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Ada"))',
            expectedOutputIncludes: "Hello, Ada!",
            xp: 25,
          },
        },
        {
          id: "lesson-cpp-py-fn-2",
          title: "Lambdas and higher-order functions",
          intro:
            "Python lambdas are limited to a single expression: `lambda x: x * 2`. They can't contain statements. For anything complex, use `def`. Higher-order functions like `map()`, `filter()`, and `sorted()` accept callables. List comprehensions are often preferred over `map`/`filter`.",
          comparisons: [
            {
              concept: "Lambda function",
              knownCode: "auto square = [](int x) { return x * x; };",
              targetCode: "square = lambda x: x * x",
              note: "Python lambdas are single-expression only — no statements.",
            },
            {
              concept: "Higher-order: map",
              knownCode:
                "std::vector<int> result;\nstd::transform(v.begin(), v.end(), std::back_inserter(result), [](int x){ return x*2; });",
              targetCode: "result = list(map(lambda x: x * 2, v))\n# Or: result = [x * 2 for x in v]",
              note: "List comprehensions are generally preferred over `map()` in Python.",
            },
            {
              concept: "Sorting with a key",
              knownCode:
                'std::sort(words.begin(), words.end(),\n  [](const std::string& a, const std::string& b) {\n    return a.size() < b.size();\n  });',
              targetCode: "words.sort(key=lambda w: len(w))\n# Or: words.sort(key=len)",
              note: "`key` extracts a comparison value. Much simpler than C++ comparators.",
            },
          ],
          realWorld:
            "Comprehensions are faster and more Pythonic than `map`/`filter`. Use lambdas mainly in `sorted(key=...)` and `min/max(key=...)`.",
          exercise: {
            id: "ex-cpp-py-fn-2",
            prompt:
              "Write a lambda `double` that multiplies its argument by 2. Print `double(5)`.",
            starterCode: "# double = lambda ...\n",
            solution: "double = lambda x: x * 2\nprint(double(5))",
            expectedOutputIncludes: "10",
            xp: 30,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-py-fn-1",
          prompt: "How do you define a function in Python?",
          choices: [
            "function add(a, b) { return a + b; }",
            "int add(int a, int b) { return a + b; }",
            "def add(a, b): return a + b",
            "fn add(a, b) -> a + b",
          ],
          correctIndex: 2,
          explanation: "`def` keyword, colon, indented body.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-fn-2",
          prompt: "What does `*args` collect in a function signature?",
          choices: [
            "A pointer to arguments",
            "Positional arguments as a tuple",
            "Keyword arguments as a dict",
            "A single required argument",
          ],
          correctIndex: 1,
          explanation: "`*args` collects extra positional arguments into a tuple.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-fn-3",
          prompt: "What is a limitation of Python lambdas compared to C++ lambdas?",
          choices: [
            "They must return int",
            "They cannot capture variables",
            "They are restricted to a single expression",
            "They cannot take arguments",
          ],
          correctIndex: 2,
          explanation:
            "Python lambdas are syntactic sugar for a single return expression. Use `def` for anything more complex.",
          xp: 15,
        },
        {
          kind: "debug",
          id: "q-cpp-py-fn-4",
          prompt: "What's wrong with this lambda?",
          brokenCode: "f = lambda x:\n    return x + 1",
          choices: [
            "Lambdas can't have a return statement — they're expressions",
            "Missing parentheses",
            "Lambda must use `fn` keyword",
            "x is not defined",
          ],
          correctIndex: 0,
          explanation:
            "Lambdas are single expressions: `lambda x: x + 1`. No `return`, no multi-line.",
          xp: 15,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-fn-5",
          prompt: "Which is more Pythonic for doubling every element in a list?",
          choices: [
            "list(map(lambda x: x*2, nums))",
            "[x * 2 for x in nums]",
            "for i in range(len(nums)): nums[i] *= 2",
            "nums.map(x => x * 2)",
          ],
          correctIndex: 1,
          explanation: "List comprehensions are the idiomatic Python way.",
          xp: 10,
        },
      ],
    },
    {
      id: "cpp-py-strings-collections",
      title: "Strings & Collections",
      tagline: "std::vector and std::string, but batteries-included.",
      icon: "📜",
      level: "beginner",
      order: 5,
      requires: ["cpp-py-functions"],
      rewardXp: 100,
      lessons: [
        {
          id: "lesson-cpp-py-str-1",
          title: "Strings",
          intro:
            "Python strings are immutable sequences (like a `const std::string` you can't modify in-place). They support slicing (`s[1:4]`), f-strings (`f'Hello {name}'`), and a rich method library (`.upper()`, `.split()`, `.join()`, `.strip()`, `.replace()`, `.startswith()`).",
          comparisons: [
            {
              concept: "String creation and concatenation",
              knownCode:
                'std::string greeting = "Hello, " + name + "!";',
              targetCode: 'greeting = f"Hello, {name}!"  # f-string\n# Or: greeting = "Hello, " + name + "!"',
              note: "f-strings are the preferred way. They're faster and more readable.",
            },
            {
              concept: "Slicing",
              knownCode: 'std::string sub = s.substr(1, 3);',
              targetCode: "sub = s[1:4]  # index 1, 2, 3",
              note: "Slicing is `[start:stop]` — stop is exclusive. Supports negative indices.",
            },
            {
              concept: "String methods",
              knownCode: "// Need <algorithm>, <cctype>, manual iteration...",
              targetCode:
                "s.upper()        # 'HELLO'\ns.split(',')     # ['a', 'b', 'c']\n', '.join(parts)  # 'a, b, c'",
              note: "Python strings have 40+ built-in methods.",
            },
          ],
          realWorld:
            "f-strings (Python 3.6+) replaced `.format()` and `%` formatting. Use them everywhere.",
          exercise: {
            id: "ex-cpp-py-str-1",
            prompt:
              'Given `name = "alice"`, print it capitalized ("Alice").',
            starterCode: 'name = "alice"\n# Capitalize and print\n',
            solution: 'name = "alice"\nprint(name.capitalize())',
            expectedOutputIncludes: "Alice",
            xp: 20,
          },
        },
        {
          id: "lesson-cpp-py-col-1",
          title: "Lists, Tuples, Dicts, Sets",
          intro:
            "Python has four core collection types built-in: `list` (mutable, like `std::vector`), `tuple` (immutable), `dict` (hash map, like `std::unordered_map`), and `set` (like `std::unordered_set`). List comprehensions provide a concise way to create lists from transformations.",
          comparisons: [
            {
              concept: "List (vector)",
              knownCode:
                "std::vector<int> nums = {1, 2, 3};\nnums.push_back(4);",
              targetCode: "nums = [1, 2, 3]\nnums.append(4)",
            },
            {
              concept: "Dictionary (map)",
              knownCode:
                'std::unordered_map<std::string, int> ages;\nages["Ada"] = 36;',
              targetCode: "ages = {'Ada': 36}\nages['Bob'] = 25",
              note: "Python dicts are insertion-ordered since 3.7.",
            },
            {
              concept: "List comprehension",
              knownCode:
                "std::vector<int> evens;\nfor (int x : nums) {\n  if (x % 2 == 0) evens.push_back(x);\n}",
              targetCode: "evens = [x for x in nums if x % 2 == 0]",
              note: "Comprehensions replace filter + transform patterns in one line.",
            },
            {
              concept: "Set",
              knownCode: "std::unordered_set<int> unique = {1, 2, 3};",
              targetCode: "unique = {1, 2, 3}\n# Set operations: |, &, -, ^",
            },
          ],
          realWorld:
            "List comprehensions are faster than `append()` in a loop because they execute in optimized C internally.",
          exercise: {
            id: "ex-cpp-py-col-1",
            prompt:
              "Given `nums = [1, 2, 3, 4, 5, 6]`, use a list comprehension to create `squares` of only the even numbers. Print it.",
            starterCode: "nums = [1, 2, 3, 4, 5, 6]\n# squares = ...\n",
            solution:
              "nums = [1, 2, 3, 4, 5, 6]\nsquares = [x**2 for x in nums if x % 2 == 0]\nprint(squares)",
            expectedOutputIncludes: "[4, 16, 36]",
            xp: 35,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-py-col-1",
          prompt: "What is the Python equivalent of `std::vector`?",
          choices: ["array", "list", "tuple", "deque"],
          correctIndex: 1,
          explanation: "Python's `list` is a dynamic array, like `std::vector`.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-col-2",
          prompt: "What is the most Pythonic way to filter a list?",
          choices: [
            "A for loop with .append()",
            "List comprehension with condition",
            "std::copy_if equivalent",
            "while loop",
          ],
          correctIndex: 1,
          explanation: "List comprehensions are concise, fast, and idiomatic.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-col-3",
          prompt: "Python strings are…",
          choices: [
            "Mutable sequences of chars",
            "Immutable sequences",
            "Arrays of bytes",
            "Objects with no methods",
          ],
          correctIndex: 1,
          explanation: "Strings are immutable — methods like `.upper()` return new strings.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-py-col-4",
          prompt: "Why does this fail?",
          brokenCode: 's = "hello"\ns[0] = "H"',
          choices: [
            "Strings are immutable in Python",
            "Index 0 doesn't exist",
            "Use single quotes for characters",
            "Missing semicolons",
          ],
          correctIndex: 0,
          explanation:
            'Strings are immutable. Use `s = "H" + s[1:]` to create a new string.',
          xp: 15,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-col-5",
          prompt: "What does `s[1:4]` return for `s = 'Python'`?",
          choices: ["'Pyt'", "'yth'", "'ytho'", "'ython'"],
          correctIndex: 1,
          explanation: "Slicing is [start:stop) — indices 1, 2, 3 → 'yth'.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-col-6",
          prompt: "Which creates a set in Python?",
          choices: ["{1, 2, 3}", "[1, 2, 3]", "(1, 2, 3)", "<<1, 2, 3>>"],
          correctIndex: 0,
          explanation: "Curly braces with values make a set. `{}` alone makes an empty dict!",
          xp: 10,
        },
      ],
    },

    // ===================== INTERMEDIATE =====================
    {
      id: "cpp-py-oop",
      title: "OOP & Classes",
      tagline: "Classes without header files and `this->`.",
      icon: "👑",
      level: "intermediate",
      order: 1,
      requires: [],
      rewardXp: 120,
      lessons: [
        {
          id: "lesson-cpp-py-oop-1",
          title: "Defining classes",
          intro:
            "Python classes use `def __init__(self, ...)` instead of constructors. Every method takes `self` as the first parameter (like an explicit `this`). There's no access specifiers (`public`/`private`/`protected`) — by convention, names starting with `_` are private, and `__name` triggers name-mangling.",
          comparisons: [
            {
              concept: "Class definition",
              knownCode:
                'class Hero {\npublic:\n    std::string name;\n    Hero(const std::string& n) : name(n) {}\n    std::string greet() { return "Hi, " + name; }\n};',
              targetCode:
                "class Hero:\n    def __init__(self, name):\n        self.name = name\n\n    def greet(self):\n        return f'Hi, {self.name}'",
              note: "Every method takes `self` explicitly. No header files.",
            },
            {
              concept: "Instantiation",
              knownCode: 'Hero h("Ada");\nstd::cout << h.greet();',
              targetCode: "h = Hero('Ada')\nprint(h.greet())",
              note: "No `new` keyword — just call the class like a function.",
            },
            {
              concept: "Inheritance",
              knownCode:
                "class Mage : public Hero {\npublic:\n    std::string spell;\n    Mage(const std::string& n, const std::string& s) : Hero(n), spell(s) {}\n};",
              targetCode:
                "class Mage(Hero):\n    def __init__(self, name, spell):\n        super().__init__(name)\n        self.spell = spell",
            },
          ],
          realWorld:
            "Python supports multiple inheritance and uses the C3 linearization algorithm (MRO) to resolve method conflicts. Check `ClassName.__mro__` to see the order.",
          exercise: {
            id: "ex-cpp-py-oop-1",
            prompt:
              "Define a `Counter` class with a `count` attribute starting at 0, an `inc()` method, and print `c.count` after calling `inc()` twice.",
            starterCode: "# class Counter: ...\n",
            solution:
              "class Counter:\n    def __init__(self):\n        self.count = 0\n\n    def inc(self):\n        self.count += 1\n\nc = Counter()\nc.inc()\nc.inc()\nprint(c.count)",
            expectedOutputIncludes: "2",
            xp: 35,
          },
        },
        {
          id: "lesson-cpp-py-oop-2",
          title: "Dunder methods (magic methods)",
          intro:
            "Python uses 'dunder' (double-underscore) methods to define how objects interact with operators and built-in functions. `__str__` is like `operator<<`, `__len__` enables `len(obj)`, `__eq__` enables `==`, `__lt__` enables `<` (and sorting). There are dozens of these.",
          comparisons: [
            {
              concept: "String representation",
              knownCode:
                "friend std::ostream& operator<<(std::ostream& os, const Vec2& v) {\n    return os << \"(\" << v.x << \", \" << v.y << \")\";\n}",
              targetCode:
                "class Vec2:\n    def __str__(self):\n        return f'({self.x}, {self.y})'\n\n    def __repr__(self):\n        return f'Vec2({self.x}, {self.y})'",
              note: "`__str__` is for users (print). `__repr__` is for developers (debugging).",
            },
            {
              concept: "Operator overloading",
              knownCode:
                "Vec2 operator+(const Vec2& other) const {\n    return Vec2(x + other.x, y + other.y);\n}",
              targetCode:
                "def __add__(self, other):\n    return Vec2(self.x + other.x, self.y + other.y)",
            },
          ],
          realWorld:
            "Dataclasses (`@dataclass`) auto-generate `__init__`, `__repr__`, `__eq__`, and more. Use them for data-holding classes.",
          exercise: {
            id: "ex-cpp-py-oop-2",
            prompt:
              "Create a `Point` class with x and y attributes. Add a `__str__` method returning `(x, y)`. Print `Point(3, 4)`.",
            starterCode: "# class Point: ...\n",
            solution:
              "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f'({self.x}, {self.y})'\n\nprint(Point(3, 4))",
            expectedOutputIncludes: "(3, 4)",
            xp: 40,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-py-oop-1",
          prompt: "What is the Python equivalent of a C++ constructor?",
          choices: ["__init__", "constructor", "__new__", "__create__"],
          correctIndex: 0,
          explanation: "`__init__` initializes the object after creation.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-oop-2",
          prompt: "Why does every Python method take `self` as first parameter?",
          choices: [
            "It's the same as C++ `this`, but explicit",
            "It refers to the class, not the instance",
            "It's optional in newer Python versions",
            "It creates a new scope",
          ],
          correctIndex: 0,
          explanation: "`self` is the instance — like C++ `this`, but passed explicitly.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-oop-3",
          prompt: "How do you make a 'private' attribute in Python?",
          choices: [
            "Use the `private` keyword",
            "Prefix with _ (convention) or __ (name-mangling)",
            "It's impossible",
            "Use access() decorator",
          ],
          correctIndex: 1,
          explanation:
            "Single `_` is a convention. Double `__` triggers name-mangling (harder to access from outside).",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-py-oop-4",
          prompt: "Why does this print a memory address instead of the name?",
          brokenCode:
            "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nprint(Dog('Rex'))",
          choices: [
            "No __str__ method defined — Python uses default repr",
            "name is private",
            "Missing `new` keyword",
            "print doesn't work with objects",
          ],
          correctIndex: 0,
          explanation:
            "Define `__str__` to control what `print()` shows.",
          xp: 15,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-oop-5",
          prompt: "What does `@dataclass` auto-generate?",
          choices: [
            "Only __init__",
            "__init__, __repr__, __eq__ and more",
            "Only getters and setters",
            "Nothing — it's just documentation",
          ],
          correctIndex: 1,
          explanation: "Dataclasses generate boilerplate methods from field annotations.",
          xp: 10,
        },
      ],
    },
    {
      id: "cpp-py-errors",
      title: "Error Handling",
      tagline: "try/except instead of try/catch — plus EAFP.",
      icon: "🔥",
      level: "intermediate",
      order: 2,
      requires: ["cpp-py-oop"],
      rewardXp: 110,
      lessons: [
        {
          id: "lesson-cpp-py-err-1",
          title: "Exceptions in Python",
          intro:
            "Python uses `try/except/else/finally` instead of `try/catch`. All exceptions inherit from `BaseException` (use `Exception` for normal errors). Python embraces EAFP ('Easier to Ask Forgiveness than Permission') — try the operation and handle the exception, rather than checking conditions first (LBYL).",
          comparisons: [
            {
              concept: "try/catch",
              knownCode:
                'try {\n    int val = std::stoi(input);\n} catch (const std::invalid_argument& e) {\n    std::cerr << "Bad input: " << e.what();\n}',
              targetCode:
                "try:\n    val = int(input_str)\nexcept ValueError as e:\n    print(f'Bad input: {e}')",
              note: "`except` replaces `catch`. `as e` captures the exception object.",
            },
            {
              concept: "Multiple except + else + finally",
              knownCode: "// C++ has no 'else' or 'finally' blocks",
              targetCode:
                "try:\n    result = do_thing()\nexcept TypeError:\n    print('wrong type')\nexcept ValueError:\n    print('bad value')\nelse:\n    print('success!')  # Only runs if NO exception\nfinally:\n    cleanup()  # Always runs",
              note: "`else` runs only on success. `finally` always runs.",
            },
            {
              concept: "Raising exceptions",
              knownCode: 'throw std::runtime_error("something broke");',
              targetCode: "raise RuntimeError('something broke')",
              note: "`raise` instead of `throw`. Exception classes are called, not constructed with `new`.",
            },
          ],
          realWorld:
            "Python's EAFP style: `try: d[key]` is preferred over `if key in d: d[key]`. It's both faster and more Pythonic.",
          exercise: {
            id: "ex-cpp-py-err-1",
            prompt:
              'Write a function `safe_divide(a, b)` that returns `a / b` but prints "Cannot divide by zero" and returns 0 if b is 0.',
            starterCode: "def safe_divide(a, b):\n    pass\n\nprint(safe_divide(10, 0))\n",
            solution:
              "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        print('Cannot divide by zero')\n        return 0\n\nprint(safe_divide(10, 0))",
            expectedOutputIncludes: "Cannot divide by zero",
            xp: 35,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-py-err-1",
          prompt: "What keyword does Python use instead of `catch`?",
          choices: ["catch", "except", "handle", "rescue"],
          correctIndex: 1,
          explanation: "Python uses `except`.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-err-2",
          prompt: "What does EAFP stand for in Python?",
          choices: [
            "Errors Are Fully Preventable",
            "Easier to Ask Forgiveness than Permission",
            "Exceptions Are For Programming",
            "Error And Fault Protocol",
          ],
          correctIndex: 1,
          explanation: "EAFP: Try the operation, handle the exception. Don't check first.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-err-3",
          prompt: "When does the `else` block in `try/except/else` run?",
          choices: [
            "Always",
            "Only when an exception occurs",
            "Only when NO exception occurs",
            "Only if finally block succeeds",
          ],
          correctIndex: 2,
          explanation: "`else` runs only if the `try` block completed without raising.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-py-err-4",
          prompt: "What's wrong with this exception handler?",
          brokenCode: "try:\n    risky()\nexcept:\n    pass",
          choices: [
            "Bare `except` catches everything, including KeyboardInterrupt — use `except Exception`",
            "pass is not a valid statement",
            "Missing finally block",
            "risky must return a value",
          ],
          correctIndex: 0,
          explanation:
            "Bare `except:` catches even `SystemExit` and `KeyboardInterrupt`. Use `except Exception:` to catch only normal errors.",
          xp: 15,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-err-5",
          prompt: "How do you raise an exception in Python?",
          choices: [
            "throw RuntimeError('msg')",
            "raise RuntimeError('msg')",
            "error RuntimeError('msg')",
            "new RuntimeError('msg')",
          ],
          correctIndex: 1,
          explanation: "`raise` is Python's equivalent of C++ `throw`.",
          xp: 10,
        },
      ],
    },
    {
      id: "cpp-py-modules",
      title: "Modules & Project Structure",
      tagline: "No headers, no linking — just `import`.",
      icon: "📦",
      level: "intermediate",
      order: 3,
      requires: ["cpp-py-errors"],
      rewardXp: 100,
      lessons: [
        {
          id: "lesson-cpp-py-mod-1",
          title: "Imports and packages",
          intro:
            "Python's `import` replaces `#include` and linking. Every `.py` file is a module. A directory with `__init__.py` is a package. `import math`, `from os import path`, `from . import sibling` (relative import). The standard library is massive — 'batteries included'.",
          comparisons: [
            {
              concept: "Including/importing",
              knownCode: '#include <cmath>\n#include "myheader.h"',
              targetCode: "import math\nfrom mypackage import mymodule",
              note: "No header/source separation. One file = one module.",
            },
            {
              concept: "Using imported names",
              knownCode: "double result = std::sqrt(16.0);",
              targetCode: "result = math.sqrt(16)\n# Or: from math import sqrt; sqrt(16)",
            },
            {
              concept: "Package structure",
              knownCode: "// CMakeLists.txt, headers, source files...",
              targetCode:
                "mypackage/\n    __init__.py\n    utils.py\n    models.py",
              note: "`__init__.py` makes a directory into a package (can be empty).",
            },
          ],
          realWorld:
            "Modern Python uses `pyproject.toml` (PEP 517) for project configuration. `pip` installs from PyPI. Virtual environments (`venv`) isolate dependencies per project.",
          exercise: {
            id: "ex-cpp-py-mod-1",
            prompt:
              "Import the `math` module and print the square root of 144.",
            starterCode: "# Import math and compute sqrt(144)\n",
            solution: "import math\nprint(math.sqrt(144))",
            expectedOutputIncludes: "12",
            xp: 20,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-py-mod-1",
          prompt: "What makes a directory a Python package?",
          choices: [
            "A CMakeLists.txt file",
            "An __init__.py file",
            "A setup.cfg file",
            "Nothing — all directories are packages",
          ],
          correctIndex: 1,
          explanation:
            "`__init__.py` (even if empty) marks a directory as a package.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-mod-2",
          prompt: "What does `from math import sqrt` do?",
          choices: [
            "Imports the entire math module",
            "Imports only sqrt into the current namespace",
            "Creates a copy of sqrt",
            "Links the math library",
          ],
          correctIndex: 1,
          explanation: "You can then call `sqrt(16)` directly without `math.`.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-mod-3",
          prompt: "What is Python's package manager?",
          choices: ["npm", "pip", "cargo", "apt"],
          correctIndex: 1,
          explanation: "`pip install package_name` installs from PyPI.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-py-mod-4",
          prompt: "Why does this fail with 'ImportError'?",
          brokenCode: "from math import squareroot\nprint(squareroot(16))",
          choices: [
            "The function is called `sqrt`, not `squareroot`",
            "math is not installed",
            "You can't use `from` with built-in modules",
            "Missing parentheses",
          ],
          correctIndex: 0,
          explanation: "The correct name is `sqrt`. Python names are case-sensitive.",
          xp: 15,
        },
      ],
    },
    {
      id: "cpp-py-functional",
      title: "Functional Patterns",
      tagline: "Comprehensions, generators, and itertools.",
      icon: "⚡",
      level: "intermediate",
      order: 4,
      requires: ["cpp-py-modules"],
      rewardXp: 130,
      lessons: [
        {
          id: "lesson-cpp-py-func-1",
          title: "Comprehensions and generator expressions",
          intro:
            "List comprehensions `[expr for x in iterable if cond]` are Python's power tool. Dict comprehensions `{k: v for ...}` and set comprehensions `{expr for ...}` also exist. Generator expressions `(expr for x in ...)` are lazy — they produce values one at a time, saving memory.",
          comparisons: [
            {
              concept: "List comprehension (map + filter)",
              knownCode:
                "std::vector<int> result;\nfor (int x : nums) {\n    if (x > 0) result.push_back(x * x);\n}",
              targetCode: "result = [x * x for x in nums if x > 0]",
            },
            {
              concept: "Dict comprehension",
              knownCode: "// Manual loop to build map...",
              targetCode: "word_lengths = {w: len(w) for w in words}",
            },
            {
              concept: "Generator expression (lazy)",
              knownCode: "// No direct equivalent (need custom iterator)",
              targetCode:
                "total = sum(x * x for x in range(1000000))\n# Processes one at a time — O(1) memory",
              note: "Generator expressions use `()` instead of `[]`. No intermediate list is created.",
            },
          ],
          realWorld:
            "When you only need to iterate once, use generator expressions. They're crucial for processing large datasets without blowing up memory.",
          exercise: {
            id: "ex-cpp-py-func-1",
            prompt:
              'Create a dict comprehension mapping each word in `words = ["hello", "world", "hi"]` to its length. Print it.',
            starterCode: 'words = ["hello", "world", "hi"]\n# word_lengths = ...\n',
            solution:
              'words = ["hello", "world", "hi"]\nword_lengths = {w: len(w) for w in words}\nprint(word_lengths)',
            expectedOutputIncludes: "hello",
            xp: 35,
          },
        },
        {
          id: "lesson-cpp-py-func-2",
          title: "itertools and functools",
          intro:
            "`itertools` is Python's toolkit for efficient iteration. `itertools.chain()` concatenates iterables, `itertools.product()` computes cartesian products, `itertools.groupby()` groups consecutive elements. `functools` has `reduce()`, `lru_cache` (memoization), and `partial()`.",
          comparisons: [
            {
              concept: "Chain iterables",
              knownCode: "// Manually concatenate vectors...",
              targetCode:
                "from itertools import chain\nfor x in chain([1,2], [3,4]):\n    print(x)  # 1, 2, 3, 4",
            },
            {
              concept: "Memoization",
              knownCode: "// Manual cache with std::unordered_map",
              targetCode:
                "from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n < 2: return n\n    return fib(n-1) + fib(n-2)",
              note: "`@lru_cache` is a decorator that adds automatic memoization.",
            },
          ],
          realWorld:
            "`@lru_cache` can turn an O(2^n) recursive Fibonacci into O(n) with one line. Essential for dynamic programming.",
          exercise: {
            id: "ex-cpp-py-func-2",
            prompt:
              "Use `functools.lru_cache` to write a memoized Fibonacci function. Print `fib(10)`.",
            starterCode:
              "from functools import lru_cache\n\n# @lru_cache\n# def fib(n): ...\n",
            solution:
              "from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(10))",
            expectedOutputIncludes: "55",
            xp: 45,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-py-func-1",
          prompt: "What is the difference between `[x for x in r]` and `(x for x in r)`?",
          choices: [
            "No difference",
            "[] creates a list, () creates a generator (lazy)",
            "[] is a set, () is a tuple",
            "() is invalid syntax",
          ],
          correctIndex: 1,
          explanation:
            "Square brackets create a list in memory. Parentheses create a lazy generator.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-func-2",
          prompt: "What does `@lru_cache` do?",
          choices: [
            "Compresses function output",
            "Caches function results based on arguments (memoization)",
            "Makes the function run faster by JIT compilation",
            "Limits function call count",
          ],
          correctIndex: 1,
          explanation:
            "`lru_cache` memoizes — it stores results of previous calls and returns them for repeated inputs.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-func-3",
          prompt: "How do you create a dict comprehension?",
          choices: [
            "dict(k, v for k, v in items)",
            "{k: v for k, v in items}",
            "[k: v for k, v in items]",
            "dict{k: v for k, v in items}",
          ],
          correctIndex: 1,
          explanation: "Curly braces with `key: value` syntax.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-py-func-4",
          prompt: "Why is this generator 'empty' on the second loop?",
          brokenCode:
            "gen = (x * 2 for x in [1, 2, 3])\nfor x in gen: print(x)  # 2, 4, 6\nfor x in gen: print(x)  # prints nothing!",
          choices: [
            "Generators are single-use — they're exhausted after the first iteration",
            "gen was garbage collected",
            "The second loop has a different gen",
            "print consumes the generator",
          ],
          correctIndex: 0,
          explanation:
            "Generators are iterators — once consumed, they're done. Use a list comprehension if you need to iterate multiple times.",
          xp: 15,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-func-5",
          prompt:
            "Which itertools function computes the Cartesian product of two iterables?",
          choices: ["chain()", "product()", "combinations()", "zip()"],
          correctIndex: 1,
          explanation: "`itertools.product([1,2], [3,4])` → (1,3), (1,4), (2,3), (2,4).",
          xp: 10,
        },
      ],
    },

    // ===================== ADVANCED =====================
    {
      id: "cpp-py-memory",
      title: "Memory & Performance",
      tagline: "Garbage collection, not RAII.",
      icon: "🧠",
      level: "advanced",
      order: 1,
      requires: [],
      rewardXp: 150,
      lessons: [
        {
          id: "lesson-cpp-py-mem-1",
          title: "Memory model: GC vs RAII",
          intro:
            "C++ gives you full control: stack allocation, heap allocation with `new/delete`, RAII with destructors. Python uses reference counting + cyclic garbage collector. You never call `delete` — objects are freed when their reference count drops to zero (or the GC finds cycles). Context managers (`with`) replace RAII for deterministic cleanup.",
          comparisons: [
            {
              concept: "Resource management",
              knownCode:
                "{\n    std::ifstream file(\"data.txt\");\n    // RAII: file closed on scope exit\n}",
              targetCode:
                "with open('data.txt') as file:\n    data = file.read()\n# file closed at end of `with` block",
              note: "`with` is Python's RAII. `__enter__` and `__exit__` define context managers.",
            },
            {
              concept: "Reference counting",
              knownCode: "// C++ std::shared_ptr<T> uses reference counting",
              targetCode:
                "import sys\nx = [1, 2, 3]\nprint(sys.getrefcount(x))  # Reference count",
              note: "Python tracks references automatically. When refcount hits 0, memory is freed.",
            },
          ],
          realWorld:
            "Never rely on `__del__` for cleanup — GC timing is non-deterministic. Always use context managers for files, locks, and connections.",
          exercise: {
            id: "ex-cpp-py-mem-1",
            prompt:
              "Create a class `Lock` with `__enter__` (prints 'acquired') and `__exit__` (prints 'released'). Use it in a `with` block that prints 'working'.",
            starterCode: "class Lock:\n    pass\n\n# with Lock(): ...\n",
            solution:
              "class Lock:\n    def __enter__(self):\n        print('acquired')\n        return self\n\n    def __exit__(self, exc_type, exc_val, tb):\n        print('released')\n\nwith Lock():\n    print('working')",
            expectedOutputIncludes: "acquired\nworking\nreleased",
            xp: 50,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-py-mem-1",
          prompt: "How does Python manage memory?",
          choices: [
            "Manual malloc/free",
            "Reference counting + cyclic garbage collector",
            "Stack-only allocation",
            "RAII with destructors",
          ],
          correctIndex: 1,
          explanation:
            "Python uses reference counting as the primary mechanism, with a cyclic GC to handle reference cycles.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-mem-2",
          prompt: "Why shouldn't you rely on `__del__` for cleanup in Python?",
          choices: [
            "It is never called",
            "Garbage collection timing is non-deterministic",
            "It causes memory leaks",
            "It only works on strings",
          ],
          correctIndex: 1,
          explanation:
            "Unlike C++ destructors, `__del__` runs when the GC collects the object, which might be much later (or never in some edge cases).",
          xp: 15,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-mem-3",
          prompt: "What is Python's equivalent of C++ RAII?",
          choices: [
            "Smart pointers",
            "Context managers (`with` statement)",
            "Destructors (__del__)",
            "Manual memory management",
          ],
          correctIndex: 1,
          explanation:
            "Context managers provide deterministic resource cleanup via `__enter__` and `__exit__`.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-py-mem-4",
          prompt: "What's the memory problem here?",
          brokenCode: "data = [x ** 2 for x in range(10_000_000)]  # 10 million squares",
          choices: [
            "Creates a full list of 10 million items in memory — use a generator expression instead",
            "range can't handle large numbers",
            "** operator causes overflow",
            "No problem at all",
          ],
          correctIndex: 0,
          explanation:
            "Use `(x ** 2 for x in range(10_000_000))` for lazy evaluation, or `sum(...)` directly.",
          xp: 15,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-mem-5",
          prompt: "Which statement is true about Python's `is` vs `==`?",
          choices: [
            "They are identical",
            "`is` checks identity (same object in memory), `==` checks equality (same value)",
            "`is` is for strings only",
            "`==` checks identity, `is` checks equality",
          ],
          correctIndex: 1,
          explanation:
            "`is` compares memory addresses. `==` calls `__eq__`. Use `is` only for `None` checks.",
          xp: 10,
        },
      ],
    },
    {
      id: "cpp-py-concurrency",
      title: "Concurrency & Async",
      tagline: "The GIL, threading, and asyncio.",
      icon: "🔄",
      level: "advanced",
      order: 2,
      requires: ["cpp-py-memory"],
      rewardXp: 170,
      lessons: [
        {
          id: "lesson-cpp-py-conc-1",
          title: "Threading and the GIL",
          intro:
            "Python has a Global Interpreter Lock (GIL) that prevents true parallel execution of Python bytecode in threads. `threading` is useful for I/O-bound tasks (network, file), but not for CPU-bound. For CPU parallelism, use `multiprocessing` (separate processes) or C extensions. `asyncio` provides cooperative concurrency with `async/await`.",
          comparisons: [
            {
              concept: "Threads",
              knownCode:
                "#include <thread>\nstd::thread t(func);\nt.join();",
              targetCode:
                "import threading\nt = threading.Thread(target=func)\nt.start()\nt.join()",
              note: "Python threads can't run CPU-bound code in parallel due to the GIL.",
            },
            {
              concept: "Async/await",
              knownCode: "// C++20 coroutines are complex...",
              targetCode:
                "import asyncio\n\nasync def fetch():\n    await asyncio.sleep(1)\n    return 'done'\n\nasyncio.run(fetch())",
              note: "`async def` defines a coroutine. `await` suspends until the awaitable completes.",
            },
            {
              concept: "Multiprocessing (true parallelism)",
              knownCode:
                "// fork() or std::async with separate processes",
              targetCode:
                "from multiprocessing import Pool\n\nwith Pool(4) as p:\n    results = p.map(cpu_heavy_func, data)",
              note: "Each process has its own GIL — true parallelism for CPU-bound work.",
            },
          ],
          realWorld:
            "For web servers, use `asyncio` (FastAPI, aiohttp). For data processing, use `multiprocessing` or libraries like Dask. The GIL may be removed in future Python versions (PEP 703).",
          exercise: {
            id: "ex-cpp-py-conc-1",
            prompt:
              "Write an async function `delayed_hello()` that waits 0 seconds (use `asyncio.sleep(0)`) then returns 'hello'. Run it with `asyncio.run()` and print the result.",
            starterCode:
              "import asyncio\n\n# async def delayed_hello(): ...\n",
            solution:
              "import asyncio\n\nasync def delayed_hello():\n    await asyncio.sleep(0)\n    return 'hello'\n\nprint(asyncio.run(delayed_hello()))",
            expectedOutputIncludes: "hello",
            xp: 50,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-py-conc-1",
          prompt: "What is the GIL?",
          choices: [
            "A graphics library",
            "Global Interpreter Lock — prevents true parallel threads",
            "A garbage collection algorithm",
            "A language feature for generics",
          ],
          correctIndex: 1,
          explanation:
            "The GIL ensures only one thread executes Python bytecode at a time.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-conc-2",
          prompt: "For CPU-bound parallel work in Python, use…",
          choices: [
            "threading",
            "asyncio",
            "multiprocessing",
            "The GIL",
          ],
          correctIndex: 2,
          explanation:
            "`multiprocessing` creates separate processes, each with its own GIL.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-conc-3",
          prompt: "What does `async def` create?",
          choices: [
            "A thread",
            "A coroutine function",
            "A process",
            "A callback",
          ],
          correctIndex: 1,
          explanation: "`async def` defines a coroutine that can be `await`ed.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-py-conc-4",
          prompt: "Why does this hang?",
          brokenCode:
            "import asyncio\n\nasync def main():\n    await asyncio.sleep(1)\n\nmain()  # Nothing happens!",
          choices: [
            "Calling a coroutine function returns a coroutine object — you need `asyncio.run(main())`",
            "asyncio.sleep takes milliseconds",
            "Missing import",
            "main can't be async",
          ],
          correctIndex: 0,
          explanation:
            "Calling `main()` returns a coroutine object. Use `asyncio.run(main())` to actually execute it.",
          xp: 15,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-conc-5",
          prompt: "When should you use `threading` in Python?",
          choices: [
            "For CPU-bound computation",
            "For I/O-bound tasks (network, files)",
            "Never — it's deprecated",
            "Only for GUI applications",
          ],
          correctIndex: 1,
          explanation:
            "Threading is effective for I/O-bound work because the GIL is released during I/O operations.",
          xp: 10,
        },
      ],
    },
    {
      id: "cpp-py-advanced",
      title: "Advanced Patterns",
      tagline: "Decorators, generators, metaclasses.",
      icon: "✨",
      level: "advanced",
      order: 3,
      requires: ["cpp-py-concurrency"],
      rewardXp: 200,
      lessons: [
        {
          id: "lesson-cpp-py-adv-1",
          title: "Decorators",
          intro:
            "A decorator is a function that wraps another function to modify its behavior. The `@decorator` syntax is syntactic sugar for `func = decorator(func)`. Decorators are used everywhere in Python: `@property`, `@staticmethod`, `@classmethod`, `@dataclass`, `@lru_cache`, Flask's `@app.route()`, and more.",
          comparisons: [
            {
              concept: "Function decorator",
              knownCode: "// No direct C++ equivalent (maybe macros or CRTP)",
              targetCode:
                "def log_calls(func):\n    def wrapper(*args, **kwargs):\n        print(f'Calling {func.__name__}')\n        return func(*args, **kwargs)\n    return wrapper\n\n@log_calls\ndef add(a, b):\n    return a + b",
              note: "`@log_calls` is equivalent to `add = log_calls(add)`.",
            },
            {
              concept: "@property (getter/setter)",
              knownCode:
                "class Circle {\n    double radius_;\npublic:\n    double area() const { return 3.14 * radius_ * radius_; }\n};",
              targetCode:
                "class Circle:\n    def __init__(self, r):\n        self._r = r\n\n    @property\n    def area(self):\n        return 3.14159 * self._r ** 2",
              note: "`@property` lets you access `c.area` like an attribute, but it runs a function.",
            },
          ],
          realWorld:
            "Decorators are the cornerstone of Python metaprogramming. Frameworks like Flask, Django, FastAPI, and pytest all rely heavily on them.",
          exercise: {
            id: "ex-cpp-py-adv-1",
            prompt:
              "Write a decorator `shout` that converts a function's string return value to uppercase. Apply it to a function `greet()` that returns 'hello'. Print `greet()`.",
            starterCode:
              "def shout(func):\n    pass\n\n# @shout\n# def greet(): ...\n",
            solution:
              "def shout(func):\n    def wrapper(*args, **kwargs):\n        result = func(*args, **kwargs)\n        return result.upper()\n    return wrapper\n\n@shout\ndef greet():\n    return 'hello'\n\nprint(greet())",
            expectedOutputIncludes: "HELLO",
            xp: 55,
          },
        },
        {
          id: "lesson-cpp-py-adv-2",
          title: "Generators and yield",
          intro:
            "A generator function uses `yield` instead of `return`. When called, it returns a generator object without executing the body. Each `next()` call runs until the next `yield`. This enables lazy evaluation and infinite sequences — something that would require complex iterator classes in C++.",
          comparisons: [
            {
              concept: "Generator function",
              knownCode: "// Complex custom iterator class in C++...",
              targetCode:
                "def count_up_to(max):\n    count = 1\n    while count <= max:\n        yield count\n        count += 1\n\nfor n in count_up_to(5):\n    print(n)",
              note: "`yield` suspends the function and resumes on next iteration.",
            },
            {
              concept: "Infinite generator",
              knownCode: "// Infinite iterator requires careful design in C++",
              targetCode:
                "def naturals():\n    n = 1\n    while True:\n        yield n\n        n += 1\n\n# Use itertools.islice to take first N",
            },
          ],
          realWorld:
            "Generators are essential for processing large files, streaming data, and implementing pipelines where you can't fit everything in memory.",
          exercise: {
            id: "ex-cpp-py-adv-2",
            prompt:
              "Write a generator `evens(n)` that yields even numbers from 2 up to n. Loop and print them for `evens(10)`.",
            starterCode: "def evens(n):\n    pass\n",
            solution:
              "def evens(n):\n    for i in range(2, n + 1, 2):\n        yield i\n\nfor x in evens(10):\n    print(x)",
            expectedOutputIncludes: "2\n4\n6\n8\n10",
            xp: 50,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-py-adv-1",
          prompt: "What is `@decorator` syntactic sugar for?",
          choices: [
            "A comment",
            "func = decorator(func)",
            "A class method",
            "An import statement",
          ],
          correctIndex: 1,
          explanation: "`@decorator` above a function is equivalent to reassigning the function through the decorator.",
          xp: 10,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-adv-2",
          prompt: "What happens when a generator function is called?",
          choices: [
            "It executes fully and returns a list",
            "It returns a generator object without executing the body",
            "It throws a syntax error",
            "It yields the first value immediately",
          ],
          correctIndex: 1,
          explanation:
            "Calling a generator function returns an iterator. Execution begins on the first `next()` call.",
          xp: 15,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-adv-3",
          prompt: "What does `@property` do?",
          choices: [
            "Makes an attribute immutable",
            "Turns a method into a property accessor (attribute-like access)",
            "Declares a static variable",
            "Validates attribute types",
          ],
          correctIndex: 1,
          explanation: "`@property` lets you call `obj.attr` which actually runs a method.",
          xp: 10,
        },
        {
          kind: "debug",
          id: "q-cpp-py-adv-4",
          prompt: "Why does this decorator lose the original function's name?",
          brokenCode:
            "def my_decorator(func):\n    def wrapper(*args):\n        return func(*args)\n    return wrapper\n\n@my_decorator\ndef greet(): pass\n\nprint(greet.__name__)  # 'wrapper' — not 'greet'!",
          choices: [
            "Use `@functools.wraps(func)` on the wrapper to preserve metadata",
            "Decorators can't preserve names",
            "Use `lambda` instead",
            "Missing `self` parameter",
          ],
          correctIndex: 0,
          explanation:
            "`@functools.wraps(func)` copies `__name__`, `__doc__`, and other metadata to the wrapper.",
          xp: 15,
        },
        {
          kind: "mcq",
          id: "q-cpp-py-adv-5",
          prompt: "How do you send a value INTO a generator?",
          choices: [
            "gen.push(value)",
            "gen.send(value)",
            "gen.input(value)",
            "yield from value",
          ],
          correctIndex: 1,
          explanation: "`gen.send(value)` resumes the generator and the `yield` expression evaluates to `value`.",
          xp: 10,
        },
      ],
    },
  ],
};
