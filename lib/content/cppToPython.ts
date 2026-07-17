import type { Course } from "@/lib/types";

export const cppToPython: Course = {
  id: "cpp-to-python",
  knownLang: "cpp",
  targetLang: "python",
  title: "C++ → Python",
  modules: [
    // --- BEGINNER ---
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
          intro: "C++ is statically typed. Python is dynamically typed — a name is just a label.",
          comparisons: [
            {
              concept: "Declaring a variable",
              knownCode: "int count = 0;\ncount = count + 1;",
              targetCode: "count = 0\ncount = count + 1",
              note: "No type, no semicolon. Just a name and a value.",
            },
          ],
          realWorld: "Python codebases often use type hints (`count: int = 0`) for mypy.",
          exercise: {
            id: "ex-cpp-vars",
            prompt: "Declare `greeting` set to the string \"world\" and print it.",
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
          choices: ["With a semicolon ;", "With a newline", "With a period .", "With end;"],
          correctIndex: 1,
          explanation: "Newlines terminate statements.",
          xp: 10,
        },
      ],
    },
    {
      id: "cpp-py-conditionals",
      title: "Conditionals & Loops",
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
          intro: "Drop the parentheses around the condition and replace {} with a : followed by an indented block. `else if` is `elif`.",
          comparisons: [
            {
              concept: "if / else if / else",
              knownCode: "if (score > 90) {\n  std::cout << \"A\";\n} else if (score > 75) {\n  std::cout << \"B\";\n}",
              targetCode: "if score > 90:\n    print('A')\nelif score > 75:\n    print('B')",
              note: "`elif`, not `else if`. The colon is mandatory.",
            }
          ],
          realWorld: "Pythonic style prefers truthiness checks (`if items:`) over length checks.",
          exercise: {
            id: "ex-cpp-cond",
            prompt: "Given `n = 7`, print 'even' if n is divisible by 2, otherwise 'odd'.",
            starterCode: "n = 7\n# Your branch here\n",
            solution: "n = 7\nif n % 2 == 0:\n    print('even')\nelse:\n    print('odd')",
            expectedOutputIncludes: "odd",
            xp: 25,
          },
        },
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-cond-1",
          prompt: "What is the equivalent of `else if`?",
          choices: ["elseif", "elsif", "elif", "else if"],
          correctIndex: 2,
          explanation: "Python uses `elif`.",
          xp: 10,
        }
      ],
    },

    // --- INTERMEDIATE ---
    {
      id: "cpp-py-collections",
      title: "Lists, Tuples & Dicts",
      tagline: "std::vector and std::unordered_map made easy.",
      icon: "📦",
      level: "intermediate",
      order: 1,
      requires: [],
      rewardXp: 100,
      lessons: [
        {
          id: "lesson-cpp-dict",
          title: "Dictionaries & Sets",
          intro: "Python's `dict` is an insertion-ordered hash map, analogous to `std::unordered_map`. `set` is like `std::unordered_set`.",
          comparisons: [
            {
              concept: "Hash Map / Dict",
              knownCode: "std::unordered_map<std::string, int> ages;\nages[\"Ada\"] = 36;",
              targetCode: "ages = {'Ada': 36}",
              note: "Python dicts are highly optimized and built-in.",
            },
            {
              concept: "List comprehensions",
              knownCode: "std::vector<int> evens;\nfor(int x : nums) {\n  if(x % 2 == 0) evens.push_back(x);\n}",
              targetCode: "evens = [x for x in nums if x % 2 == 0]",
              note: "Comprehensions are the Pythonic way to map/filter.",
            }
          ],
          realWorld: "List comprehensions are faster than append() in a loop because they are executed in C.",
          exercise: {
            id: "ex-cpp-dict",
            prompt: "Given `nums = [1, 2, 3, 4]`, use a list comprehension to create `squares` containing the square of each number. Print it.",
            starterCode: "nums = [1, 2, 3, 4]\n# squares = ...\n",
            solution: "nums = [1, 2, 3, 4]\nsquares = [x*x for x in nums]\nprint(squares)",
            expectedOutputIncludes: "[1, 4, 9, 16]",
            xp: 30,
          }
        }
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-dict-1",
          prompt: "What is the most Pythonic way to filter a list?",
          choices: ["A for loop with .append()", "List comprehensions", "std::copy_if", "while loop"],
          correctIndex: 1,
          explanation: "List comprehensions are concise and fast.",
          xp: 10,
        }
      ]
    },
    {
      id: "cpp-py-functions",
      title: "Functional & Lambda",
      tagline: "First-class functions without std::function.",
      icon: "⚔️",
      level: "intermediate",
      order: 2,
      requires: ["cpp-py-collections"],
      rewardXp: 120,
      lessons: [
        {
          id: "lesson-cpp-lambda",
          title: "Lambdas and Higher-Order Functions",
          intro: "Python functions are first-class. Lambdas are limited to a single expression. Use `map`, `filter`, or comprehensions instead of `<algorithm>`.",
          comparisons: [
            {
              concept: "Lambda function",
              knownCode: "auto add = [](int a, int b) { return a + b; };",
              targetCode: "add = lambda a, b: a + b",
              note: "Python lambdas cannot contain statements (like print or assignments).",
            }
          ],
          realWorld: "While `map` and `filter` exist, comprehensions are generally preferred in Python.",
          exercise: {
            id: "ex-cpp-lambda",
            prompt: "Write a lambda function `double` that multiplies its argument by 2. Print `double(5)`.",
            starterCode: "# double = ...\n",
            solution: "double = lambda x: x * 2\nprint(double(5))",
            expectedOutputIncludes: "10",
            xp: 40,
          }
        }
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-lambda-1",
          prompt: "What is a limitation of Python lambdas compared to C++?",
          choices: ["They must return int", "They cannot capture variables", "They are restricted to a single expression", "They cannot take arguments"],
          correctIndex: 2,
          explanation: "Lambdas in Python are just syntactic sugar for a single return expression.",
          xp: 15,
        }
      ]
    },

    // --- ADVANCED ---
    {
      id: "cpp-py-generators",
      title: "Generators & Iterators",
      tagline: "Lazy evaluation and custom iteration.",
      icon: "⚡",
      level: "advanced",
      order: 1,
      requires: [],
      rewardXp: 150,
      lessons: [
        {
          id: "lesson-cpp-gen",
          title: "The `yield` keyword",
          intro: "Instead of building a full container, a generator yields one item at a time, suspending its state. This is much more ergonomic than writing custom C++ iterators.",
          comparisons: [
            {
              concept: "Generator function",
              knownCode: "// Complex custom iterator class...",
              targetCode: "def count_up_to(max):\n    count = 1\n    while count <= max:\n        yield count\n        count += 1",
              note: "`yield` turns a normal function into a generator factory.",
            }
          ],
          realWorld: "Generators are heavily used for processing large files or streams to keep memory usage O(1).",
          exercise: {
            id: "ex-cpp-gen",
            prompt: "Write a generator `evens(n)` that yields even numbers from 2 up to `n`. Loop over `evens(6)` and print them.",
            starterCode: "def evens(n):\n    pass\n\n",
            solution: "def evens(n):\n    for i in range(2, n+1, 2):\n        yield i\n\nfor x in evens(6):\n    print(x)",
            expectedOutputIncludes: "2\n4\n6",
            xp: 50,
          }
        }
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-gen-1",
          prompt: "What happens when a generator function is called?",
          choices: ["It executes fully and returns a list", "It returns a generator object without executing the body", "It throws a syntax error", "It yields the first value immediately"],
          correctIndex: 1,
          explanation: "Calling a generator function returns an iterator object. Execution only begins on the first `next()` call.",
          xp: 20,
        }
      ]
    },
    {
      id: "cpp-py-decorators",
      title: "Decorators & Context Managers",
      tagline: "Metaprogramming and RAII.",
      icon: "✨",
      level: "advanced",
      order: 2,
      requires: ["cpp-py-generators"],
      rewardXp: 200,
      lessons: [
        {
          id: "lesson-cpp-ctx",
          title: "RAII in Python (Context Managers)",
          intro: "C++ relies on destructors (RAII) for resource cleanup. Python relies on garbage collection, so destructors (`__del__`) are unreliable. Use the `with` statement and context managers instead.",
          comparisons: [
            {
              concept: "Resource cleanup",
              knownCode: "{\n  std::ifstream file(\"data.txt\");\n  // file closed on scope exit\n}",
              targetCode: "with open('data.txt') as file:\n    # file closed at end of block",
              note: "`__enter__` and `__exit__` define a context manager.",
            }
          ],
          realWorld: "Always use `with` for files, locks, and network connections.",
          exercise: {
            id: "ex-cpp-ctx",
            prompt: "Create a dummy class `Lock` with `__enter__` (prints 'locked') and `__exit__` (prints 'unlocked'). Use it in a `with` block.",
            starterCode: "class Lock:\n    # implement __enter__ and __exit__\n\n# with Lock(): pass",
            solution: "class Lock:\n    def __enter__(self):\n        print('locked')\n    def __exit__(self, exc_type, exc_val, traceback):\n        print('unlocked')\n\nwith Lock():\n    print('inside')",
            expectedOutputIncludes: "locked\ninside\nunlocked",
            xp: 60,
          }
        }
      ],
      quiz: [
        {
          kind: "mcq",
          id: "q-cpp-ctx-1",
          prompt: "Why shouldn't you rely on `__del__` for releasing locks in Python?",
          choices: ["It is never called", "Garbage collection timing is non-deterministic", "It causes memory leaks", "It only works on strings"],
          correctIndex: 1,
          explanation: "Unlike C++ destructors, `__del__` runs when the GC collects the object, which might be much later.",
          xp: 20,
        }
      ]
    }
  ],
};
