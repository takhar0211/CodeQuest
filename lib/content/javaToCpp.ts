import type { Course } from "@/lib/types";

export const javaToCpp: Course = {
  id: "java-to-cpp",
  knownLang: "java",
  targetLang: "cpp",
  title: "Java → C++",
  modules: [
    // ===================== BEGINNER =====================
    { id: "java-cpp-variables", title: "Variables & Types", tagline: "Familiar types — plus pointers and unsigned.", icon: "🏰", level: "beginner", order: 1, requires: [], rewardXp: 60,
      lessons: [
        { id: "lesson-java-cpp-vars-1", title: "Types and declarations", intro: "C++ types look similar to Java but with key differences: `bool` instead of `boolean`, `std::string` instead of `String`, unsigned types exist, and there's no autoboxing. Variables can live on the stack (automatic) or heap (`new`). `auto` infers types like Java's `var`.", comparisons: [
            { concept: "Primitives", knownCode: "int count = 0;\ndouble pi = 3.14;\nboolean done = false;", targetCode: "int count = 0;\ndouble pi = 3.14;\nbool done = false;", note: "`boolean` → `bool`. C++ also has `unsigned int`, `long long`, etc." },
            { concept: "Strings", knownCode: "String name = \"Ada\";", targetCode: "#include <string>\nstd::string name = \"Ada\";", note: "`std::string` is mutable (unlike Java String). Include `<string>`." },
            { concept: "Constants", knownCode: "final int MAX = 100;", targetCode: "const int MAX = 100;\n// Or: constexpr int MAX = 100;", note: "`constexpr` is compile-time constant. `const` is runtime-immutable." },
            { concept: "No null for primitives", knownCode: "Integer x = null;  // Wrapper", targetCode: "// C++ primitives always have a value\n// Use std::optional<int> for nullable\n#include <optional>\nstd::optional<int> x = std::nullopt;" },
          ], realWorld: "C++ `std::optional<T>` (C++17) is like Java's `Optional<T>` but works with primitives too.",
          exercise: { id: "ex-java-cpp-vars-1", prompt: "Declare a const int MAX set to 100 and print it with cout.", starterCode: "#include <iostream>\nusing namespace std;\n// Declare and print\n", solution: "#include <iostream>\nusing namespace std;\nint main() {\n    const int MAX = 100;\n    cout << MAX << endl;\n    return 0;\n}", expectedOutputIncludes: "100", xp: 20 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-cpp-var-1", prompt: "Java's `boolean` is C++'s…", choices: ["boolean", "bool", "Boolean", "bit"], correctIndex: 1, explanation: "C++ uses `bool` (4 letters, not 7).", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-var-2", prompt: "Java's `final` is C++'s…", choices: ["final", "const", "static", "readonly"], correctIndex: 1, explanation: "`const` prevents modification. `constexpr` for compile-time constants.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-var-3", prompt: "C++ has unsigned integer types. Java…", choices: ["Also has them", "Does not — all integers are signed", "Only unsigned long", "Uses wrappers"], correctIndex: 1, explanation: "Java has no unsigned types. C++ has `unsigned int`, `unsigned long`, etc.", xp: 10 },
        { kind: "debug", id: "q-java-cpp-var-4", prompt: "Why doesn't this compile?", brokenCode: "String name = \"Ada\";", choices: ["C++ uses `std::string` (lowercase) not `String`", "Missing semicolons", "name is a keyword", "Quotes are wrong"], correctIndex: 0, explanation: "Java's `String` → C++'s `std::string`. Need `#include <string>`.", xp: 15 },
        { kind: "mcq", id: "q-java-cpp-var-5", prompt: "C++ output uses…", choices: ["System.out.println()", "printf()", "std::cout <<", "Both B and C"], correctIndex: 3, explanation: "`cout` (C++) and `printf` (C-style) both work.", xp: 10 },
      ],
    },
    { id: "java-cpp-controlflow", title: "Control Flow", tagline: "Nearly identical — watch for implicit bool.", icon: "🛡️", level: "beginner", order: 2, requires: ["java-cpp-variables"], rewardXp: 70,
      lessons: [
        { id: "lesson-java-cpp-cf-1", title: "Conditionals and switch", intro: "C++ control flow is almost identical to Java. Key differences: C++ allows implicit int-to-bool conversion (0 = false), switch can fall through (same as Java without arrows), and C++17 added `if constexpr` and initializers in if-statements.", comparisons: [
            { concept: "if/else", knownCode: "if (score > 90) {\n    System.out.println(\"A\");\n}", targetCode: "if (score > 90) {\n    cout << \"A\" << endl;\n}", note: "Nearly identical! Just different output." },
            { concept: "Implicit bool", knownCode: "if (count != 0) { ... }  // Java: explicit", targetCode: "if (count) { ... }  // C++: implicit conversion", note: "C++ treats 0 as false, non-zero as true. Java requires explicit boolean." },
            { concept: "If with initializer (C++17)", knownCode: "// No Java equivalent", targetCode: "if (auto result = compute(); result > 0) {\n    use(result);\n}", note: "Declare and test in one statement. Limits scope." },
          ], realWorld: "C++17 `if constexpr` enables compile-time conditional compilation — no Java equivalent.",
          exercise: { id: "ex-java-cpp-cf-1", prompt: "Write if/else to print 'even' or 'odd' for n=7.", starterCode: "int n = 7;\n// Branch\n", solution: "int n = 7;\nif (n % 2 == 0) {\n    cout << \"even\" << endl;\n} else {\n    cout << \"odd\" << endl;\n}", expectedOutputIncludes: "odd", xp: 20 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-cpp-cf-1", prompt: "Can you write `if (count)` in C++?", choices: ["No", "Yes — 0 is false, non-zero is true", "Only with bool", "Only with auto"], correctIndex: 1, explanation: "C++ has implicit int-to-bool. Java doesn't.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-cf-2", prompt: "C++17 `if constexpr` evaluates at…", choices: ["Runtime", "Compile time", "Link time", "Preprocessor time"], correctIndex: 1, explanation: "`if constexpr` branches are resolved at compile time.", xp: 10 },
        { kind: "debug", id: "q-java-cpp-cf-3", prompt: "Why does this switch fall through?", brokenCode: "switch (x) {\n    case 1: cout << \"one\";\n    case 2: cout << \"two\";\n}", choices: ["Missing break — C++ switch falls through by default", "cout is wrong", "Missing default", "switch is deprecated"], correctIndex: 0, explanation: "Same as Java's old switch: needs `break;` to prevent fall-through.", xp: 15 },
        { kind: "mcq", id: "q-java-cpp-cf-3b", prompt: "C++ `std::cout` replaces Java's…", choices: ["printf", "System.out.println", "console.log", "Log.d"], correctIndex: 1, explanation: "`std::cout << value << std::endl;` for output.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-cf-4", prompt: "`if (auto x = f(); x > 0)` is a C++…", choices: ["Error", "17 feature: if with initializer", "20 feature", "Lambda"], correctIndex: 1, explanation: "C++17 allows declaring variables inside if/switch statements.", xp: 10 },
      ],
    },
    { id: "java-cpp-loops", title: "Loops & Iteration", tagline: "Same loops — plus iterators and algorithms.", icon: "🌀", level: "beginner", order: 3, requires: ["java-cpp-controlflow"], rewardXp: 80,
      lessons: [
        { id: "lesson-java-cpp-loops-1", title: "C++ loops and STL iteration", intro: "C++ for loops are identical to Java's. Range-based for (`for (auto& x : v)`) is like Java's enhanced for. C++ also has iterator-based loops and the `<algorithm>` library (sort, find, transform). No Stream API — use algorithms + ranges (C++20).", comparisons: [
            { concept: "Enhanced for", knownCode: "for (String word : words) {\n    System.out.println(word);\n}", targetCode: "for (const auto& word : words) {\n    cout << word << endl;\n}", note: "`const auto&` avoids copies. `auto` deduces type." },
            { concept: "Stream → Algorithm", knownCode: "nums.stream().sorted().forEach(System.out::println);", targetCode: "sort(nums.begin(), nums.end());\nfor (auto n : nums) cout << n << endl;", note: "STL algorithms work on iterator ranges." },
            { concept: "Collections.size() → .size()", knownCode: "list.size()", targetCode: "v.size()  // Same name!", note: "Most container methods have similar names." },
          ], realWorld: "C++20 Ranges provide pipeline-style operations closer to Java Streams: `nums | views::filter(pred) | views::transform(fn)`.",
          exercise: { id: "ex-java-cpp-loops-1", prompt: "Create a vector {5,3,1,4,2}, sort it, and print each element.", starterCode: "#include <vector>\n#include <algorithm>\n// Sort and print\n", solution: "vector<int> v = {5, 3, 1, 4, 2};\nsort(v.begin(), v.end());\nfor (int x : v) cout << x << \" \";", expectedOutputIncludes: "1 2 3 4 5", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-cpp-loop-1", prompt: "`for (auto& x : v)` is like Java's…", choices: ["for (var x : v)", "for (int i = 0; ...)", "v.forEach(x -> ...)", "while (v.hasNext())"], correctIndex: 0, explanation: "Both iterate values. C++ uses `auto&` for type inference + reference.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-loop-2", prompt: "Java's Stream.sorted() → C++…", choices: ["Collections.sort()", "std::sort(v.begin(), v.end())", "v.sort()", "sort(v)"], correctIndex: 1, explanation: "STL sort takes iterator range. C++20: `ranges::sort(v)` takes container directly.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-loop-3", prompt: "`.begin()` and `.end()` define…", choices: ["Array bounds", "An iterator range for STL algorithms", "Memory addresses", "Loop counters"], correctIndex: 1, explanation: "Iterator ranges are how STL algorithms know where to operate.", xp: 10 },
        { kind: "debug", id: "q-java-cpp-loop-4", prompt: "Why is this less efficient?", brokenCode: "for (auto x : bigVector) { ... }  // Copies each element!", choices: ["Missing `&` — should be `auto& x` to avoid copies", "auto is slow", "for is deprecated", "bigVector needs const"], correctIndex: 0, explanation: "Without `&`, each element is copied. Use `const auto&` for reading.", xp: 15 },
        { kind: "mcq", id: "q-java-cpp-loop-5", prompt: "C++20 Ranges are similar to…", choices: ["Java Streams", "Java iterators", "Java arrays", "Java threads"], correctIndex: 0, explanation: "Ranges provide lazy, composable pipelines like Java Streams.", xp: 10 },
      ],
    },
    { id: "java-cpp-functions", title: "Functions", tagline: "Free functions, references, and templates.", icon: "⚔️", level: "beginner", order: 4, requires: ["java-cpp-loops"], rewardXp: 90,
      lessons: [
        { id: "lesson-java-cpp-fn-1", title: "Functions and parameters", intro: "C++ has free functions — no class wrapper. Parameters can be passed by value, reference (`&`), or const reference (`const&`). C++ supports function overloading and default arguments (Java only has overloading). Lambdas use `[capture](params){ body }` syntax.", comparisons: [
            { concept: "Method → free function", knownCode: "public static int add(int a, int b) {\n    return a + b;\n}", targetCode: "int add(int a, int b) {\n    return a + b;\n}", note: "No class needed. No `static`. Just a function." },
            { concept: "Pass by reference", knownCode: "// Java: all objects are references (no choice)", targetCode: "void modify(vector<int>& v) {\n    v.push_back(42);\n}", note: "`&` explicitly passes by reference. Without it, a copy is made." },
            { concept: "Default arguments", knownCode: "// Java: use overloading", targetCode: "void greet(string name = \"World\") {\n    cout << \"Hello, \" << name << endl;\n}", note: "C++ supports default arguments — no overloading needed." },
            { concept: "Lambda", knownCode: "Function<Integer, Integer> sq = x -> x * x;", targetCode: "auto sq = [](int x) { return x * x; };", note: "`[]` is capture list. No functional interface type needed." },
          ], realWorld: "Prefer `const T&` for large parameters. Use `T&&` for move semantics. Use `auto` return types for templates.",
          exercise: { id: "ex-java-cpp-fn-1", prompt: "Write a function `max_of(int a, int b)` returning the larger. Test with 3 and 7.", starterCode: "// int max_of(int a, int b) { ... }\n", solution: "int max_of(int a, int b) {\n    return (a > b) ? a : b;\n}\n// cout << max_of(3, 7);", expectedOutputIncludes: "7", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-cpp-fn-1", prompt: "Can C++ have free functions (outside classes)?", choices: ["No — like Java", "Yes — and it's common", "Only in headers", "Only static"], correctIndex: 1, explanation: "Free functions are normal in C++. No class wrapper needed.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-fn-2", prompt: "C++ default arguments vs Java:", choices: ["Both support them", "C++ supports them, Java uses overloading", "Neither supports them", "Java supports them, C++ doesn't"], correctIndex: 1, explanation: "C++ has default arguments. Java requires method overloading.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-fn-3", prompt: "`const int&` parameter means…", choices: ["Copy of an int", "Const reference — no copy, no modification allowed", "A pointer", "A global variable"], correctIndex: 1, explanation: "Efficient (no copy) and safe (no modification).", xp: 10 },
        { kind: "debug", id: "q-java-cpp-fn-4", prompt: "Why isn't the original modified?", brokenCode: "void doubleIt(int x) {\n    x *= 2;\n}", choices: ["Pass by value — x is a copy. Use `int& x`", "int can't be modified", "doubleIt is const", "Missing return"], correctIndex: 0, explanation: "Without `&`, x is a copy. Changes don't affect the caller's variable.", xp: 15 },
        { kind: "mcq", id: "q-java-cpp-fn-5", prompt: "C++ lambda `[&]` captures by…", choices: ["Value", "Reference", "Move", "Nothing"], correctIndex: 1, explanation: "`[&]` captures all outer variables by reference. `[=]` by value.", xp: 10 },
      ],
    },
    { id: "java-cpp-collections", title: "STL Collections", tagline: "vector, map, set — and no generics erasure.", icon: "📜", level: "beginner", order: 5, requires: ["java-cpp-functions"], rewardXp: 100,
      lessons: [
        { id: "lesson-java-cpp-col-1", title: "STL containers", intro: "C++ STL containers: `vector` (ArrayList), `map` (TreeMap), `unordered_map` (HashMap), `set` (TreeSet), `unordered_set` (HashSet). Templates are like Java generics but with no type erasure — full type info at compile time. Operator `[]` works for access.", comparisons: [
            { concept: "ArrayList → vector", knownCode: "List<Integer> nums = new ArrayList<>();\nnums.add(42);", targetCode: "vector<int> nums;\nnums.push_back(42);", note: "Primitives work directly — no Integer wrapper needed!" },
            { concept: "HashMap → unordered_map", knownCode: "Map<String, Integer> m = new HashMap<>();\nm.put(\"Ada\", 36);", targetCode: "unordered_map<string, int> m;\nm[\"Ada\"] = 36;", note: "Operator `[]` works! No `.put()`/`.get()` needed." },
            { concept: "String comparison", knownCode: "if (s1.equals(s2)) { ... }", targetCode: "if (s1 == s2) { ... }", note: "`==` compares content in C++ (unlike Java!). It's overloaded for `std::string`." },
          ], realWorld: "C++ templates generate specialized code per type — no boxing overhead. `vector<int>` is a real int array, not `vector<Integer>`.",
          exercise: { id: "ex-java-cpp-col-1", prompt: "Create an unordered_map with \"Alice\"→90, \"Bob\"→85. Print Bob's score using [].", starterCode: "#include <unordered_map>\n// Create and print\n", solution: "unordered_map<string, int> scores;\nscores[\"Alice\"] = 90;\nscores[\"Bob\"] = 85;\ncout << scores[\"Bob\"] << endl;", expectedOutputIncludes: "85", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-cpp-col-1", prompt: "Java's HashMap → C++…", choices: ["map", "unordered_map", "hash_map", "dictionary"], correctIndex: 1, explanation: "`unordered_map` is hash-based. `map` is tree-based (sorted).", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-col-2", prompt: "C++ `==` for strings compares…", choices: ["References (like Java)", "Content (operator overloaded)", "Pointers", "Hash codes"], correctIndex: 1, explanation: "C++ overloads `==` for `std::string` to compare content. Unlike Java!", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-col-3", prompt: "C++ templates vs Java generics:", choices: ["Same mechanism", "Templates generate code per type, generics use erasure", "Generics are faster", "Templates use erasure too"], correctIndex: 1, explanation: "Templates: zero overhead, full type info. Generics: type erasure, boxing overhead.", xp: 10 },
        { kind: "debug", id: "q-java-cpp-col-4", prompt: "Why does `m[\"key\"]` on a missing key not throw?", brokenCode: "unordered_map<string, int> m;\ncout << m[\"missing\"];  // Prints 0!", choices: ["[] creates a default-constructed entry — use .find() or .at() to check", "0 is the default value", "Maps can't be empty", "cout handles it"], correctIndex: 0, explanation: "`[]` inserts a default value (0 for int) if key doesn't exist. Use `.count()` or `.find()` to check.", xp: 15 },
        { kind: "mcq", id: "q-java-cpp-col-5", prompt: "C++ `vector<int>` stores…", choices: ["Boxed integers (like Java)", "Actual int primitives (no boxing)", "Pointers to ints", "Objects only"], correctIndex: 1, explanation: "No boxing! `vector<int>` stores raw ints contiguously in memory.", xp: 10 },
      ],
    },
    // ===================== INTERMEDIATE =====================
    { id: "java-cpp-oop", title: "OOP & Classes", tagline: "Multiple inheritance, RAII, and operator overloading.", icon: "👑", level: "intermediate", order: 1, requires: [], rewardXp: 120,
      lessons: [
        { id: "lesson-java-cpp-oop-1", title: "Classes in C++", intro: "C++ classes support multiple inheritance, operator overloading, and RAII (destructor-based cleanup). Header/source separation is unique to C++. `this` is a pointer (`this->`), not a reference. Default access is `private` (Java: package-private). No `interface` keyword — use pure virtual classes.", comparisons: [
            { concept: "Class definition", knownCode: "public class Dog {\n    private String name;\n    public Dog(String name) { this.name = name; }\n}", targetCode: "class Dog {\nprivate:\n    string name;\npublic:\n    Dog(const string& n) : name(n) {}\n};", note: "Initializer list (`: name(n)`) is preferred over assignment in body." },
            { concept: "Interface → Pure virtual", knownCode: "interface Drawable { void draw(); }", targetCode: "class Drawable {\npublic:\n    virtual void draw() = 0;  // Pure virtual\n    virtual ~Drawable() = default;\n};", note: "`= 0` makes it pure virtual (abstract). Virtual destructor is important!" },
            { concept: "Operator overloading", knownCode: "// Java: not supported (except + for String)", targetCode: "Vec2 operator+(const Vec2& o) const {\n    return {x + o.x, y + o.y};\n}", note: "C++ can overload `+`, `-`, `*`, `==`, `<<`, `[]`, etc." },
          ], realWorld: "RAII is C++'s killer feature: destructors guarantee cleanup. No `try-with-resources` needed — scope exit handles everything.",
          exercise: { id: "ex-java-cpp-oop-1", prompt: "Define a class `Point` with x, y and overload `operator==`. Test equality of two points.", starterCode: "// class Point { ... };\n", solution: "class Point {\npublic:\n    int x, y;\n    Point(int x, int y) : x(x), y(y) {}\n    bool operator==(const Point& o) const {\n        return x == o.x && y == o.y;\n    }\n};\n// Point(1,2) == Point(1,2) → true", expectedOutputIncludes: "", xp: 40 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-cpp-oop-1", prompt: "Java's `interface` is C++'s…", choices: ["interface", "Pure virtual class (= 0)", "abstract class", "protocol"], correctIndex: 1, explanation: "Classes with only pure virtual methods serve as interfaces.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-oop-2", prompt: "C++ supports operator overloading. Java…", choices: ["Also does", "Only for String +", "Fully supports it", "Has @operator annotation"], correctIndex: 1, explanation: "Java only allows `+` for String concatenation. C++ overloads any operator.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-oop-3", prompt: "Default access in C++ class:", choices: ["public", "private", "protected", "package-private"], correctIndex: 1, explanation: "C++ class defaults to `private`. Java class defaults to package-private.", xp: 10 },
        { kind: "debug", id: "q-java-cpp-oop-4", prompt: "Why is this dangerous?", brokenCode: "class Base {\npublic:\n    ~Base() { ... }  // Non-virtual destructor!\n};", choices: ["Non-virtual destructor causes undefined behavior when deleting through base pointer", "Base is a keyword", "Destructor can't have a body", "Missing virtual"], correctIndex: 0, explanation: "If `Base` has virtual methods, the destructor must be `virtual` too.", xp: 15 },
        { kind: "mcq", id: "q-java-cpp-oop-5", prompt: "Initializer list `Dog(string n) : name(n) {}` is preferred because…", choices: ["It's shorter", "It directly constructs fields (no default-then-assign)", "It's required by the standard", "It makes fields const"], correctIndex: 1, explanation: "Initializer lists construct members directly, avoiding default construction + assignment.", xp: 10 },
      ],
    },
    { id: "java-cpp-errors", title: "Error Handling", tagline: "Exceptions, error codes, and RAII cleanup.", icon: "🔥", level: "intermediate", order: 2, requires: ["java-cpp-oop"], rewardXp: 110,
      lessons: [
        { id: "lesson-java-cpp-err-1", title: "Exceptions and RAII", intro: "C++ has `try/catch` but no checked exceptions. Many C++ codebases avoid exceptions entirely, using error codes or `std::expected` (C++23). RAII replaces try-with-resources — destructors auto-clean on scope exit. Throw by value, catch by const reference.", comparisons: [
            { concept: "try/catch", knownCode: "try {\n    risky();\n} catch (Exception e) {\n    System.err.println(e.getMessage());\n}", targetCode: "try {\n    risky();\n} catch (const exception& e) {\n    cerr << e.what() << endl;\n}" },
            { concept: "try-with-resources → RAII", knownCode: "try (var f = new FileReader(\"f\")) { ... }", targetCode: "{\n    ifstream file(\"f\");\n    // auto-closed at scope exit\n}", note: "RAII: no explicit close needed. Destructor handles it." },
            { concept: "throw", knownCode: "throw new RuntimeException(\"fail\");", targetCode: "throw runtime_error(\"fail\");", note: "No `new` — throw by value. Catch by `const&`." },
          ], realWorld: "Google and embedded C++ often disable exceptions. `std::expected<T, E>` (C++23) is a modern alternative.",
          exercise: { id: "ex-java-cpp-err-1", prompt: "Throw and catch a runtime_error with message 'test error'.", starterCode: "#include <stdexcept>\n// try/catch\n", solution: "try {\n    throw runtime_error(\"test error\");\n} catch (const runtime_error& e) {\n    cout << e.what() << endl;\n}", expectedOutputIncludes: "test error", xp: 30 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-cpp-err-1", prompt: "Does C++ have checked exceptions?", choices: ["Yes", "No — all exceptions are unchecked", "Only in C++20", "Only for IO"], correctIndex: 1, explanation: "C++ had `throw()` specifiers (deprecated). Modern C++ uses `noexcept` only.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-err-2", prompt: "RAII replaces Java's…", choices: ["try/catch", "try-with-resources", "finally block", "All of the above"], correctIndex: 3, explanation: "RAII handles all cleanup via destructors. No `finally` or try-with-resources needed.", xp: 10 },
        { kind: "debug", id: "q-java-cpp-err-3", prompt: "Why is catching by value bad?", brokenCode: "catch (exception e) { ... }  // By value", choices: ["Object slicing — derived exception info is lost. Use `const exception&`", "e is read-only", "exception is abstract", "Missing throw"], correctIndex: 0, explanation: "Catching by value slices: the derived type is lost. Always use `const&`.", xp: 15 },
        { kind: "mcq", id: "q-java-cpp-err-3b", prompt: "`noexcept` means…", choices: ["Function ignores exceptions", "Function promises not to throw", "Exceptions are disabled", "Function is async"], correctIndex: 1, explanation: "`noexcept` tells the compiler this function won't throw. Enables optimizations.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-err-4", prompt: "In C++, you throw by… and catch by…", choices: ["Pointer, value", "Value, const reference", "Reference, pointer", "new, delete"], correctIndex: 1, explanation: "Throw by value, catch by `const&`. Never throw pointers.", xp: 10 },
      ],
    },
    { id: "java-cpp-headers", title: "Headers & Build", tagline: "#include, CMake, and the compilation model.", icon: "📦", level: "intermediate", order: 3, requires: ["java-cpp-errors"], rewardXp: 100,
      lessons: [
        { id: "lesson-java-cpp-hdr-1", title: "Headers and CMake", intro: "C++ separates declarations (.h) from definitions (.cpp). `#include` literally copy-pastes the header. Compilation: preprocess → compile each .cpp → link. CMake is the standard build system. No classpath — you manage include paths and libraries manually.", comparisons: [
            { concept: "Import → #include", knownCode: "import java.util.List;", targetCode: "#include <vector>  // System\n#include \"myclass.h\"  // Local" },
            { concept: "Build system", knownCode: "// Maven pom.xml / Gradle build.gradle", targetCode: "// CMakeLists.txt\ncmake_minimum_required(VERSION 3.20)\nproject(myapp)\nadd_executable(myapp main.cpp)", note: "CMake generates build files for make, Ninja, Visual Studio, etc." },
          ], realWorld: "C++20 modules (`import std;`) aim to replace #include. Not yet widely adopted but the future of C++.",
          exercise: { id: "ex-java-cpp-hdr-1", prompt: "Write includes for iostream, vector, and string.", starterCode: "// Includes\n", solution: "#include <iostream>\n#include <vector>\n#include <string>", expectedOutputIncludes: "#include", xp: 15 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-cpp-hdr-1", prompt: "`#include` does what?", choices: ["Imports a module", "Copy-pastes the file content", "Links a library", "Downloads a dependency"], correctIndex: 1, explanation: "It's a preprocessor directive — literally inserts the header content.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-hdr-2", prompt: "Java's Maven/Gradle → C++…", choices: ["Make", "CMake", "Ant", "pip"], correctIndex: 1, explanation: "CMake is the de facto standard C++ build system.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-hdr-3", prompt: "What prevents multiple inclusion of a header?", choices: ["import statement", "#pragma once or include guards", "Package declaration", "namespace"], correctIndex: 1, explanation: "`#pragma once` or `#ifndef/#define/#endif` guards prevent double-inclusion.", xp: 10 },
        { kind: "debug", id: "q-java-cpp-hdr-4", prompt: "Why does this cause linker errors?", brokenCode: "// utils.h\nvoid helper() { cout << \"hi\"; }  // Definition in header!\n// Included by both a.cpp and b.cpp", choices: ["Function defined in header = multiple definitions. Use declaration only", "cout is wrong", "void is wrong", "Missing include guard"], correctIndex: 0, explanation: "Define in .cpp, only declare in .h: `void helper();`", xp: 15 },
      ],
    },
    { id: "java-cpp-stl", title: "STL & Algorithms", tagline: "sort, find, accumulate — the algorithm library.", icon: "⚡", level: "intermediate", order: 4, requires: ["java-cpp-headers"], rewardXp: 130,
      lessons: [
        { id: "lesson-java-cpp-stl-1", title: "STL algorithms", intro: "The `<algorithm>` header has 100+ algorithms working on iterator ranges. `sort`, `find`, `count_if`, `transform`, `accumulate`, `any_of`, `all_of`, etc. C++20 Ranges provide Java-Stream-like pipelines.", comparisons: [
            { concept: "Stream.filter.map → algorithm/ranges", knownCode: "list.stream().filter(x -> x > 0).map(x -> x * 2).collect(...)", targetCode: "// C++20 Ranges:\nauto result = nums | views::filter([](int x){ return x > 0; })\n                  | views::transform([](int x){ return x * 2; });" },
            { concept: "Stream.reduce → accumulate", knownCode: "nums.stream().reduce(0, Integer::sum)", targetCode: "int sum = accumulate(nums.begin(), nums.end(), 0);" },
          ], realWorld: "C++20 Ranges are the future. They make C++ feel almost as expressive as Java Streams for collection processing.",
          exercise: { id: "ex-java-cpp-stl-1", prompt: "Use `count_if` to count even numbers in {1,2,3,4,5,6}. Print the count.", starterCode: "#include <algorithm>\n// count_if\n", solution: "vector<int> v = {1,2,3,4,5,6};\nint c = count_if(v.begin(), v.end(), [](int x){ return x % 2 == 0; });\ncout << c << endl;", expectedOutputIncludes: "3", xp: 35 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-cpp-stl-1", prompt: "Java Streams → C++20…", choices: ["Threads", "Ranges", "Templates", "Coroutines"], correctIndex: 1, explanation: "Ranges provide lazy, composable pipelines like Java Streams.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-stl-2", prompt: "`std::accumulate` is in header…", choices: ["<algorithm>", "<numeric>", "<cmath>", "<functional>"], correctIndex: 1, explanation: "`accumulate` is in `<numeric>`, not `<algorithm>`.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-stl-3", prompt: "STL algorithms take… as parameters.", choices: ["Containers", "Iterator ranges", "Array pointers", "Template parameters"], correctIndex: 1, explanation: "Most STL algorithms take `begin()` and `end()` iterators.", xp: 10 },
        { kind: "debug", id: "q-java-cpp-stl-4", prompt: "Why doesn't `sort(v)` work?", brokenCode: "sort(v);  // Error!", choices: ["sort takes iterators: sort(v.begin(), v.end())", "v is const", "sort is deprecated", "Missing include"], correctIndex: 0, explanation: "Old-style STL algorithms need iterator ranges. C++20 `ranges::sort(v)` takes containers.", xp: 15 },
        { kind: "mcq", id: "q-java-cpp-stl-5", prompt: "`transform(begin, end, out, fn)` is like…", choices: ["Stream.map()", "Stream.filter()", "Stream.reduce()", "Stream.collect()"], correctIndex: 0, explanation: "`transform` applies a function to each element — like `map()`.", xp: 10 },
      ],
    },
    // ===================== ADVANCED =====================
    { id: "java-cpp-memory", title: "Memory & Smart Pointers", tagline: "Stack, heap, RAII, and no GC.", icon: "🧠", level: "advanced", order: 1, requires: [], rewardXp: 170,
      lessons: [
        { id: "lesson-java-cpp-mem-1", title: "Manual memory with smart pointers", intro: "Java has GC. C++ has manual memory with smart pointers for safety. `unique_ptr` = sole ownership (like try-with-resources scope). `shared_ptr` = shared ownership (like Java references). Stack allocation is preferred — no `new` needed for most objects.", comparisons: [
            { concept: "Object creation", knownCode: "Dog d = new Dog(\"Rex\");  // Always heap", targetCode: "Dog d(\"Rex\");                    // Stack\nauto p = make_unique<Dog>(\"Rex\");  // Heap + smart ptr" },
            { concept: "Shared ownership", knownCode: "// Java: GC tracks all references", targetCode: "auto dog = make_shared<Dog>(\"Rex\");\nauto alias = dog;  // Both own it\n// Freed when last shared_ptr dies" },
            { concept: "No GC", knownCode: "// Java: GC handles everything", targetCode: "// C++: stack objects destroyed at scope exit (RAII)\n// Heap objects managed by smart pointers\n// Raw new/delete = dangerous, avoid", note: "Modern C++ rarely uses `new`/`delete` directly." },
          ], realWorld: "Rule of zero: if you use smart pointers and standard containers, you rarely need custom destructors.",
          exercise: { id: "ex-java-cpp-mem-1", prompt: "Create a unique_ptr to a vector<int> with {1,2,3}. Print its size.", starterCode: "#include <memory>\n// unique_ptr\n", solution: "auto v = make_unique<vector<int>>(initializer_list<int>{1, 2, 3});\ncout << v->size() << endl;", expectedOutputIncludes: "3", xp: 40 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-cpp-mem-1", prompt: "Java's GC → C++…", choices: ["Also has GC", "RAII + smart pointers", "Manual new/delete only", "Reference counting only"], correctIndex: 1, explanation: "C++ uses RAII (stack cleanup) + smart pointers (heap ownership).", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-mem-2", prompt: "`unique_ptr` can be…", choices: ["Copied", "Only moved", "Shared", "Cloned"], correctIndex: 1, explanation: "unique_ptr has sole ownership. `std::move` transfers it.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-mem-3", prompt: "Stack vs heap allocation in C++:", choices: ["Stack is faster, automatic cleanup. Heap is manual (use smart ptrs)", "Same speed", "Heap is always better", "Stack requires GC"], correctIndex: 0, explanation: "Stack: fast, automatic. Heap: flexible size, needs smart pointers.", xp: 10 },
        { kind: "debug", id: "q-java-cpp-mem-4", prompt: "Why does this leak?", brokenCode: "int* arr = new int[100];\n// arr goes out of scope!", choices: ["No delete[] — use vector<int> or unique_ptr<int[]>", "new[] is deprecated", "int can't be arrayed", "Missing include"], correctIndex: 0, explanation: "`new` without `delete` leaks. Modern C++: use `vector` or smart pointers.", xp: 15 },
        { kind: "mcq", id: "q-java-cpp-mem-5", prompt: "`make_shared` vs `new`:", choices: ["Same", "make_shared: one allocation, exception-safe", "new is faster", "make_shared uses stack"], correctIndex: 1, explanation: "`make_shared` allocates object and control block together — more efficient.", xp: 10 },
      ],
    },
    { id: "java-cpp-concurrency", title: "Concurrency", tagline: "Real threads — same as Java, plus atomics.", icon: "🔄", level: "advanced", order: 2, requires: ["java-cpp-memory"], rewardXp: 170,
      lessons: [
        { id: "lesson-java-cpp-conc-1", title: "Threading in C++", intro: "Both Java and C++ have real OS threads. C++ uses `std::thread`, `std::mutex`, `std::lock_guard`. `std::async`/`std::future` for task-based parallelism. `std::atomic` for lock-free operations. C++20 has `std::jthread` (auto-joining) and coroutines.", comparisons: [
            { concept: "Thread creation", knownCode: "Thread t = new Thread(() -> task());\nt.start(); t.join();", targetCode: "thread t(task);\nt.join();" },
            { concept: "synchronized → mutex", knownCode: "synchronized (lock) { ... }", targetCode: "mutex mtx;\n{\n    lock_guard<mutex> lock(mtx);\n    // critical section\n}  // auto-unlocked (RAII)" },
            { concept: "CompletableFuture → async/future", knownCode: "CompletableFuture.supplyAsync(() -> compute())", targetCode: "auto fut = async(launch::async, compute);\nauto result = fut.get();" },
          ], realWorld: "C++20 `jthread` auto-joins on destruction. Use `std::atomic` for simple shared counters — no mutex needed.",
          exercise: { id: "ex-java-cpp-conc-1", prompt: "Create a thread that prints 'hello', start and join it.", starterCode: "#include <thread>\n// Thread\n", solution: "thread t([]{ cout << \"hello\" << endl; });\nt.join();", expectedOutputIncludes: "hello", xp: 35 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-cpp-conc-1", prompt: "Java's `synchronized` → C++…", choices: ["synchronized", "lock_guard<mutex>", "volatile", "atomic"], correctIndex: 1, explanation: "`lock_guard` provides RAII-based mutex locking.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-conc-2", prompt: "C++20 `jthread` auto-…", choices: ["Detaches", "Joins on destruction", "Parallelizes", "Locks"], correctIndex: 1, explanation: "`jthread` joins automatically — no risk of forgetting `.join()`.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-conc-3", prompt: "`std::atomic<int>` provides…", choices: ["Thread-safe int without mutex", "Bigger int", "Async int", "GPU int"], correctIndex: 0, explanation: "Hardware-level atomic operations. Faster than mutex for simple types.", xp: 10 },
        { kind: "debug", id: "q-java-cpp-conc-4", prompt: "Why does this call terminate()?", brokenCode: "thread t(func);\n// t destroyed without join/detach!", choices: ["Must join() or detach() before thread destructor runs", "func is wrong", "Missing include", "thread needs new"], correctIndex: 0, explanation: "Destroying a joinable thread calls `std::terminate()`. Use `jthread` to auto-join.", xp: 15 },
        { kind: "mcq", id: "q-java-cpp-conc-5", prompt: "Java's virtual threads → C++20…", choices: ["jthread", "Coroutines (partial equivalent)", "async", "fiber"], correctIndex: 1, explanation: "C++20 coroutines are low-level but enable similar patterns to virtual threads.", xp: 10 },
      ],
    },
    { id: "java-cpp-templates", title: "Templates & Metaprogramming", tagline: "Beyond generics — compile-time code generation.", icon: "✨", level: "advanced", order: 3, requires: ["java-cpp-concurrency"], rewardXp: 200,
      lessons: [
        { id: "lesson-java-cpp-tmpl-1", title: "Templates vs Generics", intro: "C++ templates are fundamentally different from Java generics. Templates generate new code for each type (monomorphization). No type erasure — full type info at compile time. Templates can take non-type parameters (ints, etc.). C++20 concepts constrain templates like bounded generics.", comparisons: [
            { concept: "Generic class → Template", knownCode: "class Box<T> {\n    private T value;\n    public T get() { return value; }\n}", targetCode: "template <typename T>\nclass Box {\n    T value;\npublic:\n    Box(T v) : value(v) {}\n    T get() const { return value; }\n};" },
            { concept: "Bounded generic → Concept", knownCode: "public <T extends Comparable<T>> T max(T a, T b) { ... }", targetCode: "template <typename T>\nrequires std::totally_ordered<T>\nT max_of(T a, T b) { return a > b ? a : b; }" },
            { concept: "No erasure = no boxing", knownCode: "List<Integer> nums;  // Boxed!", targetCode: "vector<int> nums;  // Raw ints!", note: "Templates work with any type including primitives. Zero overhead." },
          ], realWorld: "Templates enable zero-cost abstractions. The entire STL is built with them.",
          exercise: { id: "ex-java-cpp-tmpl-1", prompt: "Write a template function `print_all` that prints every element of a container.", starterCode: "template <typename Container>\n// void print_all(const Container& c) { ... }\n", solution: "template <typename Container>\nvoid print_all(const Container& c) {\n    for (const auto& x : c) {\n        cout << x << \" \";\n    }\n    cout << endl;\n}", expectedOutputIncludes: "", xp: 45 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-java-cpp-tmpl-1", prompt: "C++ templates vs Java generics:", choices: ["Same mechanism", "Templates: code gen per type. Generics: type erasure", "Generics are more powerful", "Templates use erasure too"], correctIndex: 1, explanation: "Templates generate specialized code. Generics share one implementation.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-tmpl-2", prompt: "Can templates take non-type parameters?", choices: ["No", "Yes — e.g., `template<int N>` for compile-time values", "Only with auto", "Only in C++20"], correctIndex: 1, explanation: "`template<int N> class Array { int data[N]; };` — size known at compile time.", xp: 10 },
        { kind: "mcq", id: "q-java-cpp-tmpl-3", prompt: "C++20 concepts replace Java's…", choices: ["Interfaces", "Bounded generics (extends)", "Annotations", "Reflection"], correctIndex: 1, explanation: "Concepts constrain template parameters, like `<T extends Comparable<T>>`.", xp: 10 },
        { kind: "debug", id: "q-java-cpp-tmpl-4", prompt: "Why are template errors so verbose?", brokenCode: "template<typename T>\nvoid f(T x) { x.nonexistent(); }\n// f(42);  // Pages of errors!", choices: ["Error at instantiation, not definition — use concepts for clear messages", "Templates are broken", "f is wrong", "Missing include"], correctIndex: 0, explanation: "Without concepts, errors appear deep in template expansion. Concepts provide clear errors.", xp: 15 },
        { kind: "mcq", id: "q-java-cpp-tmpl-5", prompt: "`constexpr` enables…", choices: ["Runtime optimization", "Compile-time computation", "Thread safety", "Dynamic dispatch"], correctIndex: 1, explanation: "`constexpr` functions/variables are evaluated at compile time. No Java equivalent.", xp: 10 },
      ],
    },
  ],
};
