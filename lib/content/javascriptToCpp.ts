import type { Course } from "@/lib/types";

export const javascriptToCpp: Course = {
  id: "javascript-to-cpp",
  knownLang: "javascript",
  targetLang: "cpp",
  title: "JavaScript → C++",
  modules: [
    // ===================== BEGINNER =====================
    { id: "js-cpp-variables", title: "Variables & Types", tagline: "Static typing, compilation, and explicit memory.", icon: "🏰", level: "beginner", order: 1, requires: [], rewardXp: 60,
      lessons: [
        { id: "lesson-js-cpp-vars-1", title: "Types and compilation", intro: "C++ is a compiled, statically typed language. Every variable needs a type (or `auto` to infer). No `let`/`const` — use `const` + type. JS numbers are doubles; C++ has `int`, `float`, `double`, `unsigned`, etc. There is no `undefined` — variables must be initialized.", comparisons: [
            { concept: "Declaration", knownCode: "let count = 0;\nconst name = 'Ada';\nlet done = true;", targetCode: "int count = 0;\nconst std::string name = \"Ada\";\nbool done = true;", note: "Type first. `const` works similarly but enforces deep immutability." },
            { concept: "Type inference", knownCode: "const x = 42; // Inferred", targetCode: "auto x = 42;  // Compiler infers int", note: "`auto` is like JS `let` or `const` (use `const auto` for immutable)." },
            { concept: "undefined/null", knownCode: "let x = null;\nlet y; // undefined", targetCode: "int* ptr = nullptr;\n// No undefined! Uninitialized variables hold garbage data.", note: "Use `nullptr` for empty pointers. Never leave variables uninitialized." },
            { concept: "Equality", knownCode: "if (a === b) { ... }", targetCode: "if (a == b) { ... }", note: "C++ `==` is safe and strict. No coercion like JS `==`." },
          ], realWorld: "C++ catches type errors at compile time, completely eliminating the need for `typeof` checks and coercion bugs.",
          exercise: { id: "ex-js-cpp-vars-1", prompt: "Declare an int `age` as 25, a const string `name` as \"Ada\". Print them.", starterCode: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Declare and print\n    return 0;\n}\n", solution: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int age = 25;\n    const string name = \"Ada\";\n    cout << name << \" is \" << age << endl;\n    return 0;\n}", expectedOutputIncludes: "Ada", xp: 20 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-cpp-var-1", prompt: "JS `let` → C++…", choices: ["let", "Type (e.g., int) or auto", "var", "dynamic"], correctIndex: 1, explanation: "Specify the type explicitly or let the compiler deduce it with `auto`.", xp: 10 },
        { kind: "mcq", id: "q-js-cpp-var-2", prompt: "JS `null` → C++…", choices: ["null", "nullptr", "None", "undefined"], correctIndex: 1, explanation: "`nullptr` is the modern C++ null pointer constant.", xp: 10 },
        { kind: "mcq", id: "q-js-cpp-var-3", prompt: "What happens to an uninitialized C++ variable like `int x;`?", choices: ["It is undefined", "It is null", "It holds random garbage data from memory", "It throws an error"], correctIndex: 2, explanation: "Uninitialized primitives have undefined behavior. Always initialize!", xp: 10 },
        { kind: "debug", id: "q-js-cpp-var-4", prompt: "Why doesn't this compile?", brokenCode: "String name = \"Ada\";", choices: ["C++ uses `std::string` — not `String`", "Missing semicolon", "name is reserved", "Quotes are wrong"], correctIndex: 0, explanation: "C++ string type is `std::string` (needs `#include <string>`).", xp: 15 },
        { kind: "mcq", id: "q-js-cpp-var-5", prompt: "JS `===` → C++…", choices: ["===", "==", "equals()", "is"], correctIndex: 1, explanation: "C++ `==` checks value without JS-style weird coercion.", xp: 10 },
      ],
    },
    { id: "js-cpp-controlflow", title: "Control Flow", tagline: "Same braces, mostly the same rules.", icon: "🛡️", level: "beginner", order: 2, requires: ["js-cpp-variables"], rewardXp: 70,
      lessons: [
        { id: "lesson-js-cpp-cf-1", title: "Conditionals", intro: "C++ `if/else` looks identical to JS. However, C++ truthiness is different: only 0 is falsy for integers, and pointers check against `nullptr`. Empty arrays/strings are NOT falsy in C++.", comparisons: [
            { concept: "if/else", knownCode: "if (score > 90) {\n    console.log('A');\n}", targetCode: "if (score > 90) {\n    cout << \"A\" << endl;\n}" },
            { concept: "Truthiness", knownCode: "if (\"\") { ... }  // Falsy in JS\nif ([]) { ... }  // Truthy in JS", targetCode: "if (\"\") { ... }  // ERROR: String is not a bool!\nif (v.empty()) { ... } // Correct way", note: "C++ doesn't implicitly convert objects to bool. Use `.empty()`." },
            { concept: "Pointer truthiness", knownCode: "if (user) { ... }", targetCode: "if (user_ptr) { ... }", note: "Pointers evaluate to true if not null." },
          ], realWorld: "C++17 adds `if (auto res = init(); res > 0)` which is great for scoping variables to the if block.",
          exercise: { id: "ex-js-cpp-cf-1", prompt: "Write if/else to print 'even' or 'odd' for int n=7.", starterCode: "int n = 7;\n// Branch\n", solution: "int n = 7;\nif (n % 2 == 0) {\n    cout << \"even\" << endl;\n} else {\n    cout << \"odd\" << endl;\n}", expectedOutputIncludes: "odd", xp: 20 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-cpp-cf-1", prompt: "Can you write `if (myString)` in C++?", choices: ["Yes, true if non-empty", "No — strings don't convert to bool. Use `!myString.empty()`", "Yes, always true", "Only with auto"], correctIndex: 1, explanation: "C++ requires boolean expressions. Objects don't auto-convert.", xp: 10 },
        { kind: "mcq", id: "q-js-cpp-cf-2", prompt: "Can you write `if (count)` where count is an int?", choices: ["Yes — 0 is false, non-zero is true", "No — must use count != 0"], correctIndex: 0, explanation: "C++ inherits C's int-to-bool conversion. 0 is false.", xp: 10 },
        { kind: "debug", id: "q-js-cpp-cf-3", prompt: "Why does this switch fall through?", brokenCode: "switch(x) {\n    case 1: cout << \"one\";\n    case 2: cout << \"two\";\n}", choices: ["Missing `break;` — C++ switch falls through by default", "cout is wrong", "Missing default", "switch is broken"], correctIndex: 0, explanation: "Just like JS, C++ switch needs `break` to prevent fall-through.", xp: 15 },
        { kind: "mcq", id: "q-js-cpp-cf-4", prompt: "JS `?.` (optional chaining) → C++…", choices: ["?.", "Optional chaining operator", "No equivalent natively", "null safe"], correctIndex: 2, explanation: "C++ has no optional chaining. You must check pointers explicitly.", xp: 10 },
      ],
    },
    { id: "js-cpp-loops", title: "Loops & Iteration", tagline: "for...of becomes range-based for.", icon: "🌀", level: "beginner", order: 3, requires: ["js-cpp-controlflow"], rewardXp: 80,
      lessons: [
        { id: "lesson-js-cpp-loops-1", title: "C++ iteration", intro: "Classic `for` loops are identical. JS `for...of` → C++ range-based for. C++ has no array methods like `.map()` or `.filter()`; instead, use the `<algorithm>` library.", comparisons: [
            { concept: "for...of → range-based for", knownCode: "for (const word of words) {\n    console.log(word);\n}", targetCode: "for (const auto& word : words) {\n    cout << word << endl;\n}", note: "`auto&` iterates by reference (no copy). `const` prevents mutation." },
            { concept: "Classic for", knownCode: "for (let i = 0; i < 5; i++)", targetCode: "for (int i = 0; i < 5; i++)" },
            { concept: ".forEach(fn)", knownCode: "items.forEach(x => ...)", targetCode: "for_each(v.begin(), v.end(), [](int x) { ... });", note: "Algorithm library works on iterator ranges (`.begin()`, `.end()`)." },
          ], realWorld: "Always use `for (const auto& x : container)` when reading to avoid expensive copies of objects.",
          exercise: { id: "ex-js-cpp-loops-1", prompt: "Create a vector {1,2,3,4,5} and use a range-based for loop to print each element.", starterCode: "#include <vector>\n#include <iostream>\nusing namespace std;\n// Loop\n", solution: "int main() {\n    vector<int> v = {1, 2, 3, 4, 5};\n    for (const auto& x : v) {\n        cout << x << endl;\n    }\n    return 0;\n}", expectedOutputIncludes: "1", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-cpp-loop-1", prompt: "JS `for...of` → C++…", choices: ["for (auto x in items)", "for (const auto& x : items)", "forEach(x)", "for (int i=0...)"], correctIndex: 1, explanation: "Range-based for loop. Uses `:` instead of `of`.", xp: 10 },
        { kind: "mcq", id: "q-js-cpp-loop-2", prompt: "Why use `const auto&` instead of `auto` in loops?", choices: ["Faster — prevents copying each element", "Required by compiler", "Allows mutation", "No difference"], correctIndex: 0, explanation: "`auto` copies the element. `auto&` gives a reference. `const` makes it read-only.", xp: 10 },
        { kind: "debug", id: "q-js-cpp-loop-3", prompt: "Why doesn't this compile?", brokenCode: "vector<int> v = {1,2,3};\nv.map([](int x) { return x * 2; });", choices: ["C++ vectors don't have .map() — use <algorithm> transform", "Lambda is wrong", "Vector can't hold ints", "Missing map include"], correctIndex: 0, explanation: "Use `std::transform(v.begin(), v.end(), out.begin(), ...)`.", xp: 15 },
        { kind: "mcq", id: "q-js-cpp-loop-4", prompt: "C++ iterator `.begin()` points to…", choices: ["First element", "Array size", "Last element", "Null"], correctIndex: 0, explanation: "Iterators abstract traversal. `begin()` to `end()` defines a range.", xp: 10 },
      ],
    },
    { id: "js-cpp-functions", title: "Functions & References", tagline: "Types, pointers, and reference parameters.", icon: "⚔️", level: "beginner", order: 4, requires: ["js-cpp-loops"], rewardXp: 90,
      lessons: [
        { id: "lesson-js-cpp-fn-1", title: "Functions and params", intro: "C++ functions require return types. Parameters are passed by value (copied) by default. To modify a parameter (like JS objects), pass by reference (`&`). Lambdas exist but have explicit capture lists `[]` to control closure behavior.", comparisons: [
            { concept: "function → free function", knownCode: "function add(a, b) {\n    return a + b;\n}", targetCode: "int add(int a, int b) {\n    return a + b;\n}" },
            { concept: "Pass by reference", knownCode: "// JS objects passed by reference automatically", targetCode: "void appendTo(vector<int>& v) {\n    v.push_back(42);\n}", note: "Without the `&`, C++ makes a full copy of the vector!" },
            { concept: "Arrow function → Lambda", knownCode: "const sq = x => x * x;", targetCode: "auto sq = [](int x) { return x * x; };", note: "`[]` is the capture list. `[&]` captures surrounding vars by reference." },
            { concept: "Default parameters", knownCode: "function greet(name = 'World')", targetCode: "void greet(string name = \"World\")" },
          ], realWorld: "Pass large objects as `const T&` (const reference). It's fast (no copy) and safe (read-only).",
          exercise: { id: "ex-js-cpp-fn-1", prompt: "Write `int max_of(int a, int b)`. Test with 3 and 7.", starterCode: "// function\n", solution: "int max_of(int a, int b) {\n    return (a > b) ? a : b;\n}\n// cout << max_of(3, 7);", expectedOutputIncludes: "7", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-cpp-fn-1", prompt: "If you pass `vector<int> v` (no `&`) to a function:", choices: ["It passes a reference", "It copies the entire vector", "It throws an error", "It passes a pointer"], correctIndex: 1, explanation: "C++ passes by value by default, meaning deep copies.", xp: 10 },
        { kind: "mcq", id: "q-js-cpp-fn-2", prompt: "JS `=>` → C++…", choices: ["=>", "[](){}", "->", "lambda()"], correctIndex: 1, explanation: "C++ lambdas: `[captures](params) { body }`.", xp: 10 },
        { kind: "debug", id: "q-js-cpp-fn-3", prompt: "Why doesn't this lambda know what `factor` is?", brokenCode: "int factor = 2;\nauto doubleIt = [](int x) { return x * factor; };", choices: ["Missing capture: use `[factor]` or `[&]` to capture outer variables", "Lambda is wrong", "factor needs const", "Return type missing"], correctIndex: 0, explanation: "C++ lambdas don't automatically close over variables. You must explicitly capture them.", xp: 15 },
        { kind: "mcq", id: "q-js-cpp-fn-4", prompt: "JS supports method overloading.", choices: ["Yes", "No — but C++ DOES support overloading", "Neither do", "Both do"], correctIndex: 1, explanation: "C++ allows multiple functions with the same name but different parameters.", xp: 10 },
      ],
    },
    { id: "js-cpp-collections", title: "STL Containers", tagline: "vector, map, and the STL.", icon: "📜", level: "beginner", order: 5, requires: ["js-cpp-functions"], rewardXp: 100,
      lessons: [
        { id: "lesson-js-cpp-col-1", title: "STL containers", intro: "JS Arrays → `std::vector`. JS Objects → `std::unordered_map`. C++ containers are strictly typed (homogeneous). Operator `[]` works for arrays and maps. C++ strings are mutable, unlike JS strings.", comparisons: [
            { concept: "Array → vector", knownCode: "const nums = [1, 2, 3];\nnums.push(4);\nnums[0]", targetCode: "#include <vector>\nvector<int> nums = {1, 2, 3};\nnums.push_back(4);\nnums[0]" },
            { concept: "Object → unordered_map", knownCode: "const user = { Ada: 36 };\nuser['Bob'] = 25;", targetCode: "#include <unordered_map>\nunordered_map<string, int> user;\nuser[\"Ada\"] = 36;\nuser[\"Bob\"] = 25;" },
            { concept: "String mutation", knownCode: "let s = \"cat\";\ns[0] = \"b\"; // Fails in JS", targetCode: "string s = \"cat\";\ns[0] = 'b';  // Works! s is now \"bat\"", note: "C++ strings are mutable arrays of characters." },
          ], realWorld: "The Standard Template Library (STL) is incredibly fast and memory-efficient compared to JS objects.",
          exercise: { id: "ex-js-cpp-col-1", prompt: "Create a vector of strings {\"A\", \"B\"}. Push_back \"C\". Print the size().", starterCode: "#include <vector>\n#include <string>\n#include <iostream>\nusing namespace std;\n// ...\n", solution: "int main() {\n    vector<string> v = {\"A\", \"B\"};\n    v.push_back(\"C\");\n    cout << v.size() << endl;\n    return 0;\n}", expectedOutputIncludes: "3", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-cpp-col-1", prompt: "JS `.push()` → C++ vector…", choices: ["push()", "push_back()", "add()", "append()"], correctIndex: 1, explanation: "`push_back()` appends to a vector.", xp: 10 },
        { kind: "mcq", id: "q-js-cpp-col-2", prompt: "JS `.length` → C++ vector…", choices: [".length", ".size()", "len()", ".count()"], correctIndex: 1, explanation: "`.size()` returns the number of elements.", xp: 10 },
        { kind: "mcq", id: "q-js-cpp-col-3", prompt: "C++ maps allow `[]` access.", choices: ["True", "False"], correctIndex: 0, explanation: "`map[\"key\"] = value` works perfectly in C++.", xp: 10 },
        { kind: "debug", id: "q-js-cpp-col-4", prompt: "Why is this dangerous?", brokenCode: "vector<int> v;\ncout << v[0];", choices: ["[] doesn't check bounds — causes undefined behavior/crash. Use .at(0) for safe access", "v is null", "v must be initialized with 0", "cout is wrong"], correctIndex: 0, explanation: "`[]` is fast but unsafe. `.at()` throws an exception on out-of-bounds.", xp: 15 },
        { kind: "mcq", id: "q-js-cpp-col-5", prompt: "Can a C++ vector hold mixed types `[1, \"a\"]`?", choices: ["Yes", "No — strictly typed", "Only with auto", "Only in C++20"], correctIndex: 1, explanation: "Containers are homogeneous. Need `std::variant` or `std::any` for mixed types.", xp: 10 },
      ],
    },
    // ===================== INTERMEDIATE =====================
    { id: "js-cpp-oop", title: "Classes & RAII", tagline: "Headers, destructors, and memory cleanup.", icon: "👑", level: "intermediate", order: 1, requires: [], rewardXp: 120,
      lessons: [
        { id: "lesson-js-cpp-oop-1", title: "C++ classes", intro: "C++ separates class declarations (.h) from definitions (.cpp). Unlike JS, C++ has explicit destructors (`~Class()`) which run automatically when an object goes out of scope (RAII). `this` is a pointer (`this->`), not a dynamic reference like JS.", comparisons: [
            { concept: "Class", knownCode: "class Dog {\n    #name;\n    constructor(n) { this.#name = n; }\n    bark() { return this.#name; }\n}", targetCode: "class Dog {\nprivate:\n    string name;\npublic:\n    Dog(const string& n) : name(n) {}\n    string bark() const { return name; }\n};" },
            { concept: "this", knownCode: "this.name", targetCode: "this->name", note: "Since `this` is a pointer, you use `->` to access members." },
            { concept: "RAII", knownCode: "// JS: Garbage collection", targetCode: "class File {\n    ~File() { close(); }  // Destructor\n};\n// Auto-closed when scope ends!" },
          ], realWorld: "RAII (Resource Acquisition Is Initialization) is C++'s greatest feature. It guarantees resource cleanup without try/finally.",
          exercise: { id: "ex-js-cpp-oop-1", prompt: "Define class `Point` with public x, y. Add constructor using initializer list.", starterCode: "// class Point { ... };\n", solution: "class Point {\npublic:\n    int x, y;\n    Point(int x, int y) : x(x), y(y) {}\n};", expectedOutputIncludes: "", xp: 35 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-cpp-oop-1", prompt: "JS `constructor` → C++…", choices: ["constructor()", "init()", "Method with same name as class", "new()"], correctIndex: 2, explanation: "Constructor name = class name.", xp: 10 },
        { kind: "mcq", id: "q-js-cpp-oop-2", prompt: "In C++, `this` is a…", choices: ["Reference", "Pointer", "Copy", "Global"], correctIndex: 1, explanation: "`this` is a pointer. Use `this->member`.", xp: 10 },
        { kind: "mcq", id: "q-js-cpp-oop-3", prompt: "What is RAII?", choices: ["A garbage collector", "Tying resource cleanup to object destructors", "A build tool", "A pointer type"], correctIndex: 1, explanation: "Scope exit → destructor runs → resource freed.", xp: 10 },
        { kind: "debug", id: "q-js-cpp-oop-4", prompt: "Why add `const` to the method?", brokenCode: "int getX() const { return x; }", choices: ["Promises the method won't modify the object state", "Makes return value immutable", "Makes method static", "Required by compiler"], correctIndex: 0, explanation: "Const methods can be called on const objects.", xp: 15 },
      ],
    },
    { id: "js-cpp-build", title: "Build System", tagline: "Compilation, #include, and CMake.", icon: "📦", level: "intermediate", order: 2, requires: ["js-cpp-oop"], rewardXp: 110,
      lessons: [
        { id: "lesson-js-cpp-bld-1", title: "Headers and CMake", intro: "JS runs directly or via bundlers (webpack). C++ must be compiled. `#include` literally copy-pastes header files. CMake generates build instructions (like package.json scripts but for C++).", comparisons: [
            { concept: "import → #include", knownCode: "import { List } from 'list';", targetCode: "#include <vector>\n#include \"myheader.h\"", note: "`<>` for system, `\"\"` for local files." },
            { concept: "npm → CMake", knownCode: "// package.json", targetCode: "// CMakeLists.txt\nproject(MyApp)\nadd_executable(MyApp main.cpp)" },
            { concept: "Execution", knownCode: "node app.js", targetCode: "g++ main.cpp -o app\n./app", note: "Compile first, then run the binary." },
          ], realWorld: "CMake is the industry standard. Header inclusion is slow; C++20 modules will eventually replace it.",
          exercise: { id: "ex-js-cpp-bld-1", prompt: "Write the includes for standard IO, strings, and vectors.", starterCode: "// Includes\n", solution: "#include <iostream>\n#include <string>\n#include <vector>", expectedOutputIncludes: "#include", xp: 15 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-cpp-bld-1", prompt: "JS `import` → C++…", choices: ["import", "#include", "require", "using"], correctIndex: 1, explanation: "Pre-processor directive that copies file content.", xp: 10 },
        { kind: "mcq", id: "q-js-cpp-bld-2", prompt: "npm/package.json → C++…", choices: ["Make", "CMake", "gcc", "clang"], correctIndex: 1, explanation: "CMake configures C++ builds.", xp: 10 },
        { kind: "debug", id: "q-js-cpp-bld-3", prompt: "Linker error: multiple definitions.", brokenCode: "// utils.h\nvoid func() { } // Included in a.cpp and b.cpp", choices: ["Header contains definition — move body to .cpp, keep only declaration in .h", "func is reserved", "Missing include guard", "Need static"], correctIndex: 0, explanation: "Headers should only declare (`void func();`). Define in .cpp.", xp: 15 },
      ],
    },
    { id: "js-cpp-stl", title: "STL Algorithms", tagline: "Array methods → algorithm library.", icon: "⚡", level: "intermediate", order: 3, requires: ["js-cpp-build"], rewardXp: 130,
      lessons: [
        { id: "lesson-js-cpp-stl-1", title: "Iterators and Algorithms", intro: "JS array methods (`.map`, `.filter`, `.sort`) are built-in. C++ separates containers from algorithms. The `<algorithm>` header provides 100+ functions that work on iterators (`.begin()`, `.end()`).", comparisons: [
            { concept: ".sort()", knownCode: "arr.sort((a, b) => a - b);", targetCode: "#include <algorithm>\nsort(v.begin(), v.end());" },
            { concept: ".filter() → copy_if", knownCode: "arr.filter(x => x > 0)", targetCode: "copy_if(v.begin(), v.end(), back_inserter(out), [](int x){ return x > 0; });" },
            { concept: ".map() → transform", knownCode: "arr.map(x => x * 2)", targetCode: "transform(v.begin(), v.end(), out.begin(), [](int x){ return x * 2; });" },
          ], realWorld: "C++20 Ranges (`v | views::filter(...)`) provide a syntax much closer to JS chained methods.",
          exercise: { id: "ex-js-cpp-stl-1", prompt: "Sort a vector {3,1,2} and print the first element.", starterCode: "#include <algorithm>\n// Sort\n", solution: "vector<int> v = {3, 1, 2};\nsort(v.begin(), v.end());\ncout << v[0] << endl;", expectedOutputIncludes: "1", xp: 30 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-cpp-stl-1", prompt: "JS `.sort()` → C++…", choices: ["v.sort()", "std::sort(v.begin(), v.end())", "Arrays.sort(v)", "sort(v)"], correctIndex: 1, explanation: "STL algorithms take iterator ranges.", xp: 10 },
        { kind: "mcq", id: "q-js-cpp-stl-2", prompt: "JS `.map()` → C++…", choices: ["std::map", "std::transform", "std::copy", "std::apply"], correctIndex: 1, explanation: "Transforms each element into an output range.", xp: 10 },
        { kind: "debug", id: "q-js-cpp-stl-3", prompt: "Why does sort fail to compile?", brokenCode: "vector<int> v = {3, 1};\nsort(v);", choices: ["sort requires iterators: sort(v.begin(), v.end())", "v is const", "Missing #include", "vector can't be sorted"], correctIndex: 0, explanation: "Algorithms operate on ranges, not containers directly.", xp: 15 },
      ],
    },
    // ===================== ADVANCED =====================
    { id: "js-cpp-memory", title: "Memory Management", tagline: "Goodbye Garbage Collector.", icon: "🧠", level: "advanced", order: 1, requires: [], rewardXp: 170,
      lessons: [
        { id: "lesson-js-cpp-mem-1", title: "Stack, Heap, and Smart Pointers", intro: "JS has a Garbage Collector (V8). C++ requires manual memory management. Stack allocation is automatic and preferred. Heap allocation (`new`) must be manually freed (`delete`), but modern C++ uses smart pointers (`unique_ptr`, `shared_ptr`) to automate this.", comparisons: [
            { concept: "Object creation", knownCode: "const d = new Dog();  // Heap + GC", targetCode: "Dog d; // Stack (preferred, auto cleanup)\nauto p = make_unique<Dog>(); // Heap + smart ptr" },
            { concept: "Ownership", knownCode: "// JS: GC tracks all references", targetCode: "// C++: unique_ptr ensures exactly one owner\n// shared_ptr tracks reference counts" },
            { concept: "Leaks", knownCode: "// Forgotten event listeners leak memory", targetCode: "// Using raw 'new' without 'delete' leaks memory\n// Rule: NEVER use raw 'new'." },
          ], realWorld: "Use `std::unique_ptr` by default. It has zero overhead compared to a raw pointer but guarantees cleanup.",
          exercise: { id: "ex-js-cpp-mem-1", prompt: "Create a unique_ptr to an int(42). Print its value via dereference (*p).", starterCode: "#include <memory>\n#include <iostream>\nusing namespace std;\n// ...\n", solution: "int main() {\n    auto p = make_unique<int>(42);\n    cout << *p << endl;\n    return 0;\n}", expectedOutputIncludes: "42", xp: 40 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-cpp-mem-1", prompt: "JS objects live on the heap. C++ objects should usually live on the…", choices: ["Heap", "Stack", "Disk", "GPU"], correctIndex: 1, explanation: "Stack allocation is fast and guarantees automatic cleanup.", xp: 10 },
        { kind: "mcq", id: "q-js-cpp-mem-2", prompt: "Instead of raw `new`, modern C++ uses…", choices: ["malloc", "unique_ptr / make_unique", "Garbage collection", "References"], correctIndex: 1, explanation: "Smart pointers automate `delete`.", xp: 10 },
        { kind: "debug", id: "q-js-cpp-mem-3", prompt: "Why does this leak?", brokenCode: "void f() {\n    int* p = new int(5);\n    // Missing delete p;\n}", choices: ["Heap memory allocated with `new` must be manually freed with `delete`", "p goes out of scope", "int is too small", "Memory is infinite"], correctIndex: 0, explanation: "Raw pointers don't clean up memory. Use `unique_ptr`.", xp: 15 },
      ],
    },
    { id: "js-cpp-templates", title: "Templates", tagline: "Compile-time generics.", icon: "✨", level: "advanced", order: 2, requires: ["js-cpp-memory"], rewardXp: 170,
      lessons: [
        { id: "lesson-js-cpp-tmpl-1", title: "Templates vs Dynamic Typing", intro: "JS handles any type dynamically: `function add(a, b) { return a + b; }`. C++ achieves this through Templates. The compiler generates a separate function for every type used. Zero runtime overhead.", comparisons: [
            { concept: "Dynamic function → Template", knownCode: "function max(a, b) {\n    return a > b ? a : b;\n}", targetCode: "template <typename T>\nT max_of(T a, T b) {\n    return (a > b) ? a : b;\n}" },
            { concept: "Concepts (C++20)", knownCode: "// TS: function max<T extends number>", targetCode: "template <typename T>\nrequires std::integral<T>\nT max_of(T a, T b) { ... }", note: "Concepts restrict templates, giving better error messages." },
          ], realWorld: "Templates are incredibly powerful. The entire STL (vector, map, sort) is built on them.",
          exercise: { id: "ex-js-cpp-tmpl-1", prompt: "Write a template function `printItem` that prints any type.", starterCode: "// template\n", solution: "template <typename T>\nvoid printItem(T item) {\n    cout << item << endl;\n}", expectedOutputIncludes: "template", xp: 40 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-cpp-tmpl-1", prompt: "C++ templates are resolved at…", choices: ["Runtime", "Compile time", "Link time", "Execution time"], correctIndex: 1, explanation: "The compiler generates specific code for each type at compile time.", xp: 10 },
        { kind: "mcq", id: "q-js-cpp-tmpl-2", prompt: "C++20 Concepts provide…", choices: ["Garbage collection", "Type constraints for templates", "Async/await", "Memory safety"], correctIndex: 1, explanation: "Concepts act like constraints, improving compiler error messages.", xp: 10 },
        { kind: "debug", id: "q-js-cpp-tmpl-3", prompt: "Template error without concepts:", brokenCode: "template<typename T> void f(T x) { x.walk(); }\nf(42); // Massive error log!", choices: ["Compiler tries to generate code for int, fails deep inside — concepts prevent this early", "int can walk", "Templates don't work with int", "Missing include"], correctIndex: 0, explanation: "Without concepts, template errors are notoriously long and hard to read.", xp: 15 },
      ],
    },
    { id: "js-cpp-concurrency", title: "Concurrency", tagline: "Real threads — no event loop.", icon: "🔄", level: "advanced", order: 3, requires: ["js-cpp-templates"], rewardXp: 200,
      lessons: [
        { id: "lesson-js-cpp-conc-1", title: "Threads and Async", intro: "JS is single-threaded with an event loop. C++ has true multi-threading with OS threads. C++ requires explicit locking (`std::mutex`) to prevent race conditions. C++ also has `std::async` for Promise-like futures.", comparisons: [
            { concept: "Async execution", knownCode: "setTimeout(task, 0);\n// JS handles event queue", targetCode: "std::thread t(task);\nt.join();\n// Real parallel execution" },
            { concept: "Promise → Future", knownCode: "const val = await promise;", targetCode: "auto fut = std::async(task);\nauto val = fut.get();" },
            { concept: "Race conditions", knownCode: "// Impossible in JS (single thread)", targetCode: "std::mutex mtx;\nstd::lock_guard<std::mutex> lock(mtx);\n// Critical section", note: "Multi-threading requires locks." },
          ], realWorld: "C++20 introduced coroutines which allow `co_await`, providing async/await syntax very similar to JS.",
          exercise: { id: "ex-js-cpp-conc-1", prompt: "Launch a thread running a lambda that prints 'async'. Join it.", starterCode: "#include <thread>\n#include <iostream>\n// ...\n", solution: "int main() {\n    std::thread t([]{ std::cout << \"async\\n\"; });\n    t.join();\n    return 0;\n}", expectedOutputIncludes: "async", xp: 50 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-cpp-conc-1", prompt: "JS is single-threaded. C++ is…", choices: ["Also single-threaded", "Multi-threaded with real OS parallelism", "Interpreter based", "Event loop based"], correctIndex: 1, explanation: "C++ spawns real threads that run simultaneously on multiple cores.", xp: 10 },
        { kind: "mcq", id: "q-js-cpp-conc-2", prompt: "Because C++ is multi-threaded, you must worry about…", choices: ["Event loops", "Promises", "Race conditions (requires mutexes)", "Garbage collection"], correctIndex: 2, explanation: "Shared memory modified by multiple threads causes race conditions.", xp: 10 },
        { kind: "debug", id: "q-js-cpp-conc-3", prompt: "Why does this program crash on exit?", brokenCode: "std::thread t(func);\n// Main ends without t.join()", choices: ["A joinable thread's destructor calls std::terminate()", "func is infinite", "Missing lock", "thread is broken"], correctIndex: 0, explanation: "You must always `join()` or `detach()` a thread. (Or use C++20 `jthread`).", xp: 15 },
        { kind: "mcq", id: "q-js-cpp-conc-4", prompt: "JS `await` → C++…", choices: ["await", "fut.get() or C++20 co_await", "join()", "yield"], correctIndex: 1, explanation: "Futures use `.get()`. C++20 coroutines add `co_await`.", xp: 10 },
      ],
    },
  ],
};
