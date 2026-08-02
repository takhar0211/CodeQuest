import type { Course } from "@/lib/types";

export const javascriptToJava: Course = {
  id: "javascript-to-java",
  knownLang: "javascript",
  targetLang: "java",
  title: "JavaScript → Java",
  modules: [
    // ===================== BEGINNER =====================
    { id: "js-java-variables", title: "Variables & Types", tagline: "Static types, semicolons, and everything in a class.", icon: "🏰", level: "beginner", order: 1, requires: [], rewardXp: 60,
      lessons: [
        { id: "lesson-js-java-vars-1", title: "Static typing", intro: "Java is statically typed — every variable needs a type declaration: `int x = 5;`. No let/const — use `final` for immutability. Java has 8 primitive types + reference types. `var` (Java 10+) provides local type inference like JS's `let`. All code lives inside classes.", comparisons: [
            { concept: "Declaration", knownCode: "let count = 0;\nconst name = 'Ada';\nlet done = true;", targetCode: "int count = 0;\nfinal String name = \"Ada\";\nboolean done = true;", note: "Type required. `const` → `final`. `boolean` (not `bool`)." },
            { concept: "Type inference", knownCode: "const x = 42;  // Type inferred", targetCode: "var x = 42;  // Java 10+ local inference", note: "`var` only for local variables. Fields need explicit types." },
            { concept: "null", knownCode: "let x = null;\nlet y = undefined;", targetCode: "String x = null;\n// No 'undefined' in Java — only null", note: "Java has only `null`. No `undefined`." },
            { concept: "No type coercion", knownCode: "'5' + 1  // '51' (coercion!)\n'5' == 5  // true (coercion!)", targetCode: "// Java: type-safe, no coercion\n// \"5\" + 1 = \"51\" (string concat only)\n// \"5\" == 5 won't compile — different types", note: "Java prevents most type coercion bugs at compile time." },
          ], realWorld: "Java's static typing catches bugs at compile time that JS only catches at runtime. TypeScript was created to add this to JS.",
          exercise: { id: "ex-js-java-vars-1", prompt: "Declare int age=25, final String name=\"Ada\". Print both.", starterCode: "// Declare and print\n", solution: "int age = 25;\nfinal String name = \"Ada\";\nSystem.out.println(name + \" is \" + age);", expectedOutputIncludes: "Ada", xp: 20 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-java-var-1", prompt: "JS `const` → Java…", choices: ["const", "final", "static", "let"], correctIndex: 1, explanation: "`final` prevents reassignment.", xp: 10 },
        { kind: "mcq", id: "q-js-java-var-2", prompt: "JS has `undefined`. Java…", choices: ["Also has undefined", "Has only null", "Has nil", "Has void"], correctIndex: 1, explanation: "Java has only `null`. No undefined concept.", xp: 10 },
        { kind: "mcq", id: "q-js-java-var-3", prompt: "JS `boolean` → Java…", choices: ["bool", "boolean", "Boolean", "bit"], correctIndex: 1, explanation: "Java's primitive is `boolean` (8 letters).", xp: 10 },
        { kind: "debug", id: "q-js-java-var-4", prompt: "Why doesn't this compile?", brokenCode: "let x = 42;", choices: ["Java doesn't use let — use `int x = 42;` or `var x = 42;`", "Missing semicolon", "42 is invalid", "x is reserved"], correctIndex: 0, explanation: "Java has no `let`. Declare with type or `var` (Java 10+).", xp: 15 },
        { kind: "mcq", id: "q-js-java-var-5", prompt: "console.log → Java…", choices: ["console.log()", "print()", "System.out.println()", "Log.d()"], correctIndex: 2, explanation: "`System.out.println()` for output.", xp: 10 },
      ],
    },
    { id: "js-java-controlflow", title: "Control Flow", tagline: "Same braces — but strict boolean required.", icon: "🛡️", level: "beginner", order: 2, requires: ["js-java-variables"], rewardXp: 70,
      lessons: [
        { id: "lesson-js-java-cf-1", title: "Conditionals", intro: "Java if/else looks identical to JS. Key differences: no truthiness (must be boolean), no `?.` or `??` operators. Java 14+ has enhanced switch with arrow syntax.", comparisons: [
            { concept: "if/else", knownCode: "if (score > 90) {\n    console.log('A');\n}", targetCode: "if (score > 90) {\n    System.out.println(\"A\");\n}", note: "Nearly identical! Different output method." },
            { concept: "No truthiness", knownCode: "if (name) { ... }  // Truthy check\nif (items?.length) { ... }", targetCode: "if (name != null && !name.isEmpty()) { ... }\nif (items != null && !items.isEmpty()) { ... }", note: "Java requires explicit boolean. No truthiness, no `?.`." },
            { concept: "No ?. or ??", knownCode: "const city = user?.address?.city ?? 'Unknown';", targetCode: "String city = (user != null && user.getAddress() != null)\n    ? user.getAddress().getCity() : \"Unknown\";\n// Or use Optional:", note: "Java `Optional<T>` is the closest to `?.` and `??`." },
          ], realWorld: "Java's verbosity here is why many Java devs appreciate Optional<T> and newer pattern matching features.",
          exercise: { id: "ex-js-java-cf-1", prompt: "Write if/else if/else for grade from score=82. Print the grade.", starterCode: "int score = 82;\n// Grade\n", solution: "int score = 82;\nif (score > 90) {\n    System.out.println(\"A\");\n} else if (score > 75) {\n    System.out.println(\"B\");\n} else {\n    System.out.println(\"C\");\n}", expectedOutputIncludes: "B", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-java-cf-1", prompt: "Can you write `if (name)` in Java?", choices: ["Yes — like JS", "No — must be a boolean expression", "Only for strings", "Only with var"], correctIndex: 1, explanation: "Java has no truthiness. Write `if (name != null)`.", xp: 10 },
        { kind: "mcq", id: "q-js-java-cf-2", prompt: "JS `?.` → Java…", choices: ["?.", "Optional<T> with .map() and .orElse()", "null-safe operator", "No equivalent"], correctIndex: 1, explanation: "`Optional.ofNullable(user).map(User::getName).orElse(\"Unknown\")`.", xp: 10 },
        { kind: "debug", id: "q-js-java-cf-3", prompt: "Why doesn't `if (count)` work in Java?", brokenCode: "int count = 5;\nif (count) { ... }", choices: ["Java requires boolean — write `if (count != 0)`", "count is wrong type", "if needs parentheses", "Missing braces"], correctIndex: 0, explanation: "No implicit int-to-boolean conversion in Java.", xp: 15 },
        { kind: "mcq", id: "q-js-java-cf-3b", prompt: "JS `??` → Java…", choices: ["??", "Optional.orElse()", "Objects.requireNonNullElse()", "Both B and C"], correctIndex: 3, explanation: "Java has utility methods for null-defaulting.", xp: 10 },
        { kind: "mcq", id: "q-js-java-cf-4", prompt: "Enhanced switch (Java 14+) uses…", choices: ["case x:", "case x ->", "when x:", "match x:"], correctIndex: 1, explanation: "Arrow syntax: no fall-through, can return values.", xp: 10 },
      ],
    },
    { id: "js-java-loops", title: "Loops & Streams", tagline: "Array methods → Stream API.", icon: "🌀", level: "beginner", order: 3, requires: ["js-java-controlflow"], rewardXp: 80,
      lessons: [
        { id: "lesson-js-java-loops-1", title: "Iteration in Java", intro: "JS `for...of` → Java enhanced for. No `.map()/.filter()` on arrays — use Stream API. Classic for loops are identical. Java has no `for...in` equivalent for objects.", comparisons: [
            { concept: "for...of → enhanced for", knownCode: "for (const word of words) {\n    console.log(word);\n}", targetCode: "for (String word : words) {\n    System.out.println(word);\n}" },
            { concept: ".map().filter() → Stream", knownCode: "const result = nums\n    .filter(x => x > 0)\n    .map(x => x * 2);", targetCode: "List<Integer> result = nums.stream()\n    .filter(x -> x > 0)\n    .map(x -> x * 2)\n    .collect(Collectors.toList());", note: "Need `.stream()` and `.collect()`. More verbose." },
            { concept: ".reduce → Stream.reduce", knownCode: "const sum = nums.reduce((a, b) => a + b, 0);", targetCode: "int sum = nums.stream().reduce(0, Integer::sum);" },
          ], realWorld: "Java Streams are more verbose than JS arrays but offer parallel processing with `.parallelStream()`.",
          exercise: { id: "ex-js-java-loops-1", prompt: "Print numbers 1 to 5 using a for loop.", starterCode: "// Print 1-5\n", solution: "for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}", expectedOutputIncludes: "1\n2\n3\n4\n5", xp: 20 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-java-loop-1", prompt: "JS `for...of` → Java…", choices: ["for (var x : items)", "for (Type x : items)", "for x in items", "forEach(x, items)"], correctIndex: 1, explanation: "Java enhanced for: `for (Type x : iterable)`.", xp: 10 },
        { kind: "mcq", id: "q-js-java-loop-2", prompt: "JS `.filter().map()` → Java…", choices: ["Same", "stream().filter().map().collect()", "Arrays.filter()", "for loops only"], correctIndex: 1, explanation: "Need `.stream()` + `.collect()` wrapper.", xp: 10 },
        { kind: "debug", id: "q-js-java-loop-3", prompt: "Why can't you do `nums.filter(...)`?", brokenCode: "List<Integer> nums = List.of(1, 2, 3);\nnums.filter(x -> x > 1);  // Error!", choices: ["Lists don't have filter() — use nums.stream().filter()", "filter is deprecated", "Lambdas can't be used here", "Missing import"], correctIndex: 0, explanation: "Java collections don't have map/filter. Use `.stream()` first.", xp: 15 },
        { kind: "mcq", id: "q-js-java-loop-3b", prompt: "Arrow syntax in lambdas: JS `=>` → Java…", choices: ["=>", "->", "~>", ":>"], correctIndex: 1, explanation: "Java uses `->` for lambdas. JS uses `=>`.", xp: 10 },
        { kind: "mcq", id: "q-js-java-loop-4", prompt: ".length for arrays → Java…", choices: [".length", ".length (field for arrays, .size() for Lists)", ".size()", "len()"], correctIndex: 1, explanation: "Arrays: `.length` (field). Lists: `.size()` (method).", xp: 10 },
      ],
    },
    { id: "js-java-functions", title: "Methods & Classes", tagline: "No free functions — everything in a class.", icon: "⚔️", level: "beginner", order: 4, requires: ["js-java-loops"], rewardXp: 90,
      lessons: [
        { id: "lesson-js-java-fn-1", title: "Methods and lambdas", intro: "Java has no free functions — every function is a method in a class. `static` methods are closest to JS functions. Java has no default parameter values — use overloading. Lambdas need functional interfaces.", comparisons: [
            { concept: "function → static method", knownCode: "function add(a, b) {\n    return a + b;\n}", targetCode: "static int add(int a, int b) {\n    return a + b;\n}", note: "Return type required. Must be in a class." },
            { concept: "Default params → overloading", knownCode: "function greet(name = 'World') { ... }", targetCode: "static void greet() { greet(\"World\"); }\nstatic void greet(String name) {\n    System.out.println(\"Hello, \" + name);\n}" },
            { concept: "Arrow → lambda", knownCode: "const sq = x => x * x;", targetCode: "Function<Integer, Integer> sq = x -> x * x;", note: "`->` not `=>`. Needs a functional interface type." },
          ], realWorld: "Java 8+ functional interfaces: `Function`, `Predicate`, `Consumer`, `Supplier`, `BiFunction`, etc.",
          exercise: { id: "ex-js-java-fn-1", prompt: "Write a static int square(int n) method. Print square(6).", starterCode: "// static int square(int n) { ... }\n", solution: "static int square(int n) {\n    return n * n;\n}\n// System.out.println(square(6));", expectedOutputIncludes: "36", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-java-fn-1", prompt: "Can Java have free functions?", choices: ["Yes", "No — everything must be in a class", "Only lambdas", "Only with static"], correctIndex: 1, explanation: "All Java code lives inside classes.", xp: 10 },
        { kind: "mcq", id: "q-js-java-fn-2", prompt: "JS `=>` → Java…", choices: ["=>", "->", "~>", ">>"], correctIndex: 1, explanation: "Java lambdas: `(params) -> expression`.", xp: 10 },
        { kind: "mcq", id: "q-js-java-fn-3", prompt: "JS default params → Java…", choices: ["Same syntax", "Method overloading", "Optional parameters", "Named parameters"], correctIndex: 1, explanation: "Java has no default params. Overload with different signatures.", xp: 10 },
        { kind: "debug", id: "q-js-java-fn-4", prompt: "Why doesn't this compile?", brokenCode: "static void greet(String name = \"World\") { ... }", choices: ["Java doesn't support default parameter values", "String wrong type", "static is wrong", "void can't print"], correctIndex: 0, explanation: "Use method overloading instead.", xp: 15 },
        { kind: "mcq", id: "q-js-java-fn-5", prompt: "Java lambdas require a…", choices: ["Return type", "Functional interface (SAM type)", "Lambda keyword", "Generic parameter"], correctIndex: 1, explanation: "Lambdas implement functional interfaces (single abstract method).", xp: 10 },
      ],
    },
    { id: "js-java-collections", title: "Collections", tagline: "ArrayList, HashMap, and .equals().", icon: "📜", level: "beginner", order: 5, requires: ["js-java-functions"], rewardXp: 100,
      lessons: [
        { id: "lesson-js-java-col-1", title: "Java collections", intro: "JS arrays → `ArrayList<T>`. JS objects → `HashMap<K,V>`. No operator `[]` for maps — use `.put()/.get()`. String comparison: `.equals()` not `==`! Generics can't use primitives — use `Integer` not `int`.", comparisons: [
            { concept: "Array → ArrayList", knownCode: "const nums = [1, 2, 3];\nnums.push(4);", targetCode: "List<Integer> nums = new ArrayList<>(List.of(1, 2, 3));\nnums.add(4);", note: "`Integer` not `int`. `.add()` not `.push()`." },
            { concept: "Object → HashMap", knownCode: "const m = { Ada: 36 };\nm.Bob = 25;\nconsole.log(m.Ada);", targetCode: "Map<String, Integer> m = new HashMap<>();\nm.put(\"Ada\", 36);\nm.put(\"Bob\", 25);\nSystem.out.println(m.get(\"Ada\"));", note: "`.put()` and `.get()` — no `[]` or dot notation." },
            { concept: "String ==", knownCode: "if (s1 === s2) { ... }  // Works!", targetCode: "if (s1.equals(s2)) { ... }  // MUST use .equals()!", note: "`==` compares references in Java, not content!" },
            { concept: "Destructuring → no equivalent", knownCode: "const { name, age } = user;\nconst [a, ...rest] = [1,2,3];", targetCode: "String name = user.getName();\nint age = user.getAge();\n// No destructuring!", note: "Java has no destructuring. Access fields via getters." },
          ], realWorld: "The `==` vs `.equals()` trap is Java's #1 gotcha for JS developers.",
          exercise: { id: "ex-js-java-col-1", prompt: "Create HashMap with Alice→90, Bob→85. Print Bob's score.", starterCode: "// HashMap\n", solution: "Map<String, Integer> m = new HashMap<>();\nm.put(\"Alice\", 90);\nm.put(\"Bob\", 85);\nSystem.out.println(m.get(\"Bob\"));", expectedOutputIncludes: "85", xp: 25 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-java-col-1", prompt: "JS `.push()` → Java…", choices: ["push()", "add()", "append()", "insert()"], correctIndex: 1, explanation: "Java's `List.add()` appends.", xp: 10 },
        { kind: "mcq", id: "q-js-java-col-2", prompt: "String comparison in Java:", choices: ["s1 === s2", "s1.equals(s2)", "s1 == s2", "s1.compare(s2)"], correctIndex: 1, explanation: "`==` compares references! `.equals()` compares content.", xp: 10 },
        { kind: "mcq", id: "q-js-java-col-3", prompt: "Why `Integer` not `int` in `List<Integer>`?", choices: ["int is deprecated", "Generics require reference types (not primitives)", "Integer is faster", "int is unsigned"], correctIndex: 1, explanation: "Java generics use type erasure — only reference types work.", xp: 10 },
        { kind: "debug", id: "q-js-java-col-4", prompt: "Why does this print false?", brokenCode: "String a = new String(\"hi\");\nString b = new String(\"hi\");\nSystem.out.println(a == b);", choices: ["`==` compares references — use `.equals()`", "Strings can't be compared", "new String is wrong", "Missing import"], correctIndex: 0, explanation: "`new String()` creates distinct objects. `==` checks identity, not value.", xp: 15 },
        { kind: "mcq", id: "q-js-java-col-5", prompt: "JS destructuring → Java…", choices: ["Same syntax", "No equivalent — use getters", "Records deconstruction (Java 21+)", "Both B and C"], correctIndex: 3, explanation: "Java 21+ adds some pattern matching. Otherwise use getters.", xp: 10 },
      ],
    },
    // ===================== INTERMEDIATE =====================
    { id: "js-java-oop", title: "OOP & Interfaces", tagline: "Real interfaces, access modifiers, and single inheritance.", icon: "👑", level: "intermediate", order: 1, requires: [], rewardXp: 120,
      lessons: [
        { id: "lesson-js-java-oop-1", title: "Java OOP", intro: "Java has explicit access modifiers (`public/private/protected`), interfaces, abstract classes, and single inheritance. `this` is always the instance (no dynamic binding issues). Records (Java 16+) are immutable data classes.", comparisons: [
            { concept: "Class", knownCode: "class Dog {\n    #name;\n    constructor(name) { this.#name = name; }\n    bark() { return `${this.#name} barks!`; }\n}", targetCode: "public class Dog {\n    private String name;\n    public Dog(String name) { this.name = name; }\n    public String bark() { return name + \" barks!\"; }\n}" },
            { concept: "Interface (no JS equivalent)", knownCode: "// JS: just implement the methods (duck typing)", targetCode: "interface Speakable {\n    String speak();\n}\nclass Dog implements Speakable {\n    public String speak() { return \"woof\"; }\n}" },
            { concept: "Record", knownCode: "// Frozen object pattern", targetCode: "record Point(int x, int y) { }\n// Auto: constructor, getters, equals, hashCode, toString" },
          ], realWorld: "Java's type system forces explicit contracts. This is invaluable for large team codebases.",
          exercise: { id: "ex-js-java-oop-1", prompt: "Create interface Greetable with greet(). Implement in Person with name. Print greeting.", starterCode: "// interface and class\n", solution: "interface Greetable {\n    String greet();\n}\nclass Person implements Greetable {\n    private String name;\n    public Person(String name) { this.name = name; }\n    public String greet() { return \"Hi, I'm \" + name; }\n}\nSystem.out.println(new Person(\"Ada\").greet());", expectedOutputIncludes: "Hi", xp: 40 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-java-oop-1", prompt: "JS `#private` → Java…", choices: ["#private", "private keyword", "_convention", "Symbol"], correctIndex: 1, explanation: "Java uses `private` keyword — enforced by compiler.", xp: 10 },
        { kind: "mcq", id: "q-js-java-oop-2", prompt: "JS has no `interface` keyword. Java…", choices: ["Also doesn't", "Has interface — defines contracts", "Uses abstract only", "Uses protocol"], correctIndex: 1, explanation: "Java interfaces define method contracts that classes must implement.", xp: 10 },
        { kind: "mcq", id: "q-js-java-oop-3", prompt: "Java's `this` vs JS `this`:", choices: ["Same dynamic behavior", "Java: always the instance. JS: depends on call site", "Java: class reference", "Both are dynamic"], correctIndex: 1, explanation: "Java's `this` is always the instance — no dynamic binding issues.", xp: 10 },
        { kind: "debug", id: "q-js-java-oop-4", prompt: "Why doesn't this compile?", brokenCode: "class Cat extends Animal, Pet { ... }", choices: ["Java: single class inheritance. Use `extends Animal implements Pet`", "Cat is reserved", "extends is wrong", "Missing import"], correctIndex: 0, explanation: "One `extends` (class), multiple `implements` (interfaces).", xp: 15 },
        { kind: "mcq", id: "q-js-java-oop-5", prompt: "Java records (16+) auto-generate…", choices: ["Only constructor", "Constructor, getters, equals, hashCode, toString", "Only toString", "Nothing"], correctIndex: 1, explanation: "Records are immutable data classes with auto-generated boilerplate.", xp: 10 },
      ],
    },
    { id: "js-java-errors", title: "Error Handling", tagline: "Checked exceptions — Java's unique feature.", icon: "🔥", level: "intermediate", order: 2, requires: ["js-java-oop"], rewardXp: 110,
      lessons: [
        { id: "lesson-js-java-err-1", title: "Checked exceptions", intro: "Java has checked exceptions — the compiler forces you to handle certain errors. This doesn't exist in JS. `try-with-resources` replaces try/finally for resource cleanup. Exception types are specific classes.", comparisons: [
            { concept: "try/catch", knownCode: "try {\n    JSON.parse(s);\n} catch (e) {\n    console.error(e.message);\n}", targetCode: "try {\n    // ...\n} catch (IOException e) {\n    System.err.println(e.getMessage());\n}", note: "Java catches specific exception types." },
            { concept: "throw", knownCode: "throw new Error('fail');", targetCode: "throw new RuntimeException(\"fail\");", note: "Java has many exception classes: IOException, NumberFormatException, etc." },
            { concept: "Resource cleanup", knownCode: "let f;\ntry { f = open(); } finally { f?.close(); }", targetCode: "try (var f = new FileReader(\"file\")) {\n    // auto-closed at end\n}" },
          ], realWorld: "Checked exceptions are controversial. Modern frameworks often wrap them in unchecked RuntimeExceptions.",
          exercise: { id: "ex-js-java-err-1", prompt: "Try parsing 'abc' as int, catch NumberFormatException, print 'Invalid'.", starterCode: "// try/catch\n", solution: "try {\n    int n = Integer.parseInt(\"abc\");\n} catch (NumberFormatException e) {\n    System.out.println(\"Invalid\");\n}", expectedOutputIncludes: "Invalid", xp: 30 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-java-err-1", prompt: "JS has checked exceptions.", choices: ["Yes", "No — Java does, JS doesn't", "Both do", "Neither does"], correctIndex: 1, explanation: "Checked exceptions are unique to Java.", xp: 10 },
        { kind: "mcq", id: "q-js-java-err-2", prompt: "try-with-resources is Java's…", choices: ["finally block", "Auto-close pattern for resources", "Error suppression", "Async handler"], correctIndex: 1, explanation: "Auto-closes `AutoCloseable` resources at block exit.", xp: 10 },
        { kind: "debug", id: "q-js-java-err-3", prompt: "Why won't this compile?", brokenCode: "void read() {\n    new FileReader(\"f.txt\");  // IOException!\n}", choices: ["FileReader throws checked IOException — must catch or declare throws", "FileReader deprecated", "Missing import", "void is wrong"], correctIndex: 0, explanation: "Add `throws IOException` or wrap in try/catch.", xp: 15 },
        { kind: "mcq", id: "q-js-java-err-3b", prompt: "Multi-catch: `catch (A | B e)` catches…", choices: ["A or B exception types", "A and B simultaneously", "Only A", "Only B"], correctIndex: 0, explanation: "Pipe `|` separates multiple exception types in one catch.", xp: 10 },
        { kind: "mcq", id: "q-js-java-err-4", prompt: "NullPointerException is…", choices: ["Checked", "Unchecked (RuntimeException)", "An Error", "A warning"], correctIndex: 1, explanation: "NPE extends RuntimeException — unchecked, doesn't need declaration.", xp: 10 },
      ],
    },
    { id: "js-java-packages", title: "Packages & Build", tagline: "npm → Maven/Gradle, modules → packages.", icon: "📦", level: "intermediate", order: 3, requires: ["js-java-errors"], rewardXp: 100,
      lessons: [
        { id: "lesson-js-java-pkg-1", title: "Packages and build tools", intro: "npm → Maven/Gradle. package.json → pom.xml/build.gradle. JS modules → Java packages (tied to directory structure). Java compiles to bytecode and runs on the JVM.", comparisons: [
            { concept: "Import", knownCode: "import { List } from './list.js';", targetCode: "import java.util.List;\nimport com.myapp.Utils;" },
            { concept: "npm → Maven/Gradle", knownCode: "npm install express\n// package.json", targetCode: "// Maven: pom.xml\n// Gradle: build.gradle\n// Dependencies from Maven Central" },
            { concept: "Module → Package", knownCode: "// Each file is a module\nexport function add() { ... }", targetCode: "package com.myapp;\n// Must match directory: com/myapp/\npublic class MyClass { ... }" },
          ], realWorld: "Gradle (modern, used by Android) and Maven (enterprise standard) both download from Maven Central.",
          exercise: { id: "ex-js-java-pkg-1", prompt: "Write package declaration for com.app and import java.util.List.", starterCode: "// Package and import\n", solution: "package com.app;\n\nimport java.util.List;", expectedOutputIncludes: "package", xp: 15 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-java-pkg-1", prompt: "npm → Java…", choices: ["npm", "Maven/Gradle", "javac", "JVM"], correctIndex: 1, explanation: "Maven and Gradle manage Java dependencies.", xp: 10 },
        { kind: "mcq", id: "q-js-java-pkg-2", prompt: "package.json → Java…", choices: ["pom.xml or build.gradle", "package.json", "Module.java", "classpath"], correctIndex: 0, explanation: "Maven uses pom.xml. Gradle uses build.gradle.", xp: 10 },
        { kind: "debug", id: "q-js-java-pkg-3", prompt: "Why can't you access this class?", brokenCode: "package com.app;\nclass Secret { }  // No modifier!", choices: ["Package-private — add `public` for external access", "Missing import", "class is wrong", "Package is invalid"], correctIndex: 0, explanation: "No modifier = package-private. Only accessible within same package.", xp: 15 },
        { kind: "mcq", id: "q-js-java-pkg-4", prompt: "Must package match directory structure?", choices: ["No", "Yes — strictly required", "Only convention", "Only for public"], correctIndex: 1, explanation: "`package com.app` must be in `com/app/` directory.", xp: 10 },
      ],
    },
    { id: "js-java-streams", title: "Streams API", tagline: "Array methods → Stream pipelines.", icon: "⚡", level: "intermediate", order: 4, requires: ["js-java-packages"], rewardXp: 130,
      lessons: [
        { id: "lesson-js-java-stream-1", title: "Stream API", intro: "JS array methods are built-in. Java requires `.stream()` to start a pipeline and `.collect()` to materialize results. Streams are lazy. Method references (`String::toUpperCase`) are like `x => x.toUpperCase()`.", comparisons: [
            { concept: "filter + map", knownCode: "const result = nums\n    .filter(x => x > 0)\n    .map(x => x * 2);", targetCode: "List<Integer> result = nums.stream()\n    .filter(x -> x > 0)\n    .map(x -> x * 2)\n    .collect(Collectors.toList());" },
            { concept: "Method reference", knownCode: "words.map(w => w.toUpperCase())", targetCode: "words.stream().map(String::toUpperCase).collect(Collectors.toList())", note: "`String::toUpperCase` = `s -> s.toUpperCase()`." },
            { concept: "reduce", knownCode: "nums.reduce((a, b) => a + b, 0)", targetCode: "nums.stream().reduce(0, Integer::sum)" },
          ], realWorld: "Streams are verbose but offer `.parallelStream()` for free parallelism on large datasets.",
          exercise: { id: "ex-js-java-stream-1", prompt: "Filter even numbers from [1..5], square them, collect to List.", starterCode: "List<Integer> nums = List.of(1,2,3,4,5);\n// Stream\n", solution: "List<Integer> nums = List.of(1,2,3,4,5);\nList<Integer> r = nums.stream()\n    .filter(n -> n % 2 == 0)\n    .map(n -> n * n)\n    .collect(Collectors.toList());\nSystem.out.println(r);", expectedOutputIncludes: "[4, 16]", xp: 40 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-java-stream-1", prompt: "JS arrays have .map(). Java arrays…", choices: ["Also have .map()", "Don't — use .stream().map().collect()", "Use Arrays.map()", "Use for loops only"], correctIndex: 1, explanation: "Java collections need `.stream()` first.", xp: 10 },
        { kind: "mcq", id: "q-js-java-stream-2", prompt: "`String::toUpperCase` is a…", choices: ["Static call", "Method reference (shorthand for lambda)", "Import", "Constructor"], correctIndex: 1, explanation: "Method references: `ClassName::method` = `x -> x.method()`.", xp: 10 },
        { kind: "debug", id: "q-js-java-stream-3", prompt: "Why does consuming a Stream twice fail?", brokenCode: "Stream<String> s = names.stream();\ns.forEach(System.out::println);\ns.forEach(System.out::println);  // IllegalStateException!", choices: ["Streams are single-use — create a new .stream() each time", "forEach is wrong", "Missing collect", "System.out is closed"], correctIndex: 0, explanation: "Streams can only be consumed once. Create a new stream for each use.", xp: 15 },
        { kind: "mcq", id: "q-js-java-stream-3b", prompt: "Streams are evaluated…", choices: ["Eagerly", "Lazily — only on terminal operations", "In parallel", "At compile time"], correctIndex: 1, explanation: "Intermediate ops are lazy. Terminal ops (collect, forEach) trigger execution.", xp: 10 },
        { kind: "mcq", id: "q-js-java-stream-4", prompt: ".parallelStream() enables…", choices: ["Async I/O", "Multi-threaded processing using ForkJoinPool", "GPU computing", "Lazy evaluation"], correctIndex: 1, explanation: "Parallel streams split work across CPU cores automatically.", xp: 10 },
      ],
    },
    // ===================== ADVANCED =====================
    { id: "js-java-memory", title: "JVM & Memory", tagline: "From V8 to JVM — GC differences.", icon: "🧠", level: "advanced", order: 1, requires: [], rewardXp: 150,
      lessons: [
        { id: "lesson-js-java-mem-1", title: "JVM internals", intro: "Both V8 and JVM use GC and JIT compilation. JVM is more mature with configurable GC algorithms (G1, ZGC), heap tuning, and JFR profiling. Java starts slower (JVM warmup) but sustains better throughput. Both allocate objects on the heap.", comparisons: [
            { concept: "GC", knownCode: "// V8: mark-and-sweep (young/old gen)", targetCode: "// JVM: G1GC default (Java 9+)\n// Young gen → Old gen promotion\n// ZGC for low latency", note: "JVM GC is more configurable than V8." },
            { concept: "JIT", knownCode: "// V8: Ignition → TurboFan", targetCode: "// JVM: C1 (fast) → C2 (optimized) tiered compilation", note: "Both JIT-compile hot code. JVM's C2 produces more optimized code." },
            { concept: "Resource cleanup", knownCode: "// try/finally or forget about it", targetCode: "try (var r = getResource()) {\n    // auto-closed\n}", note: "Java's try-with-resources is deterministic cleanup." },
          ], realWorld: "JVM tuning: `-Xmx` (max heap), `-XX:+UseZGC` (low-latency GC), JFR for profiling.",
          exercise: { id: "ex-js-java-mem-1", prompt: "Write try-with-resources using Scanner to read one line from System.in.", starterCode: "import java.util.Scanner;\n// try-with-resources\n", solution: "try (Scanner sc = new Scanner(System.in)) {\n    String line = sc.nextLine();\n    System.out.println(line);\n}", expectedOutputIncludes: "", xp: 35 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-java-mem-1", prompt: "V8 and JVM both use…", choices: ["Reference counting", "GC + JIT compilation", "Manual memory", "RAII"], correctIndex: 1, explanation: "Both use garbage collection and JIT compilation.", xp: 10 },
        { kind: "mcq", id: "q-js-java-mem-2", prompt: "JVM default GC (Java 9+):", choices: ["Serial", "Parallel", "G1 GC", "ZGC"], correctIndex: 2, explanation: "G1GC is the default. ZGC and Shenandoah for low-latency.", xp: 10 },
        { kind: "mcq", id: "q-js-java-mem-3", prompt: "`-Xmx512m` sets…", choices: ["Thread count", "Max heap to 512MB", "Stack size", "GC frequency"], correctIndex: 1, explanation: "`-Xmx` controls maximum heap. `-Xms` controls initial.", xp: 10 },
        { kind: "debug", id: "q-js-java-mem-4", prompt: "Resource leak:", brokenCode: "FileReader fr = new FileReader(\"f\");\nfr.read();\n// fr never closed!", choices: ["Use try-with-resources — GC handles memory but NOT file handles", "FileReader auto-closes", "read() closes it", "Missing flush"], correctIndex: 0, explanation: "GC frees memory. I/O resources must be explicitly closed.", xp: 15 },
        { kind: "mcq", id: "q-js-java-mem-5", prompt: "JVM starts slower than V8 because…", choices: ["JVM is older", "JVM warmup: class loading, JIT compilation ramp-up", "Java is interpreted", "JVM has no JIT"], correctIndex: 1, explanation: "JVM needs time to load classes and JIT-compile hot code.", xp: 10 },
      ],
    },
    { id: "js-java-concurrency", title: "Concurrency", tagline: "Real threads — from single-threaded to parallel.", icon: "🔄", level: "advanced", order: 2, requires: ["js-java-memory"], rewardXp: 170,
      lessons: [
        { id: "lesson-js-java-conc-1", title: "Java threading", intro: "JS is single-threaded (event loop). Java has real OS threads with true parallelism. `synchronized` blocks provide mutual exclusion. Java 21+ virtual threads (Project Loom) are lightweight — like JS's event-loop concurrency but multi-threaded.", comparisons: [
            { concept: "Single thread → Multi thread", knownCode: "// JS: single-threaded event loop\nsetTimeout(task, 0);", targetCode: "// Java: real parallel threads\nThread t = new Thread(() -> task());\nt.start();\nt.join();" },
            { concept: "Promise.all → parallel tasks", knownCode: "const [a, b] = await Promise.all([t1(), t2()]);", targetCode: "try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {\n    var f1 = exec.submit(task1);\n    var f2 = exec.submit(task2);\n    var a = f1.get();\n    var b = f2.get();\n}" },
            { concept: "No synchronization needed → synchronized", knownCode: "// JS: single-threaded, no race conditions", targetCode: "synchronized (lock) {\n    // Only one thread at a time\n}", note: "Multi-threading introduces race conditions. JS avoids this by design." },
          ], realWorld: "Virtual threads (Java 21+) combine the best of both: event-loop-like scalability with thread-like simplicity.",
          exercise: { id: "ex-js-java-conc-1", prompt: "Create a thread printing 'hello', start and join it.", starterCode: "// Thread\n", solution: "Thread t = new Thread(() -> System.out.println(\"hello\"));\nt.start();\nt.join();", expectedOutputIncludes: "hello", xp: 40 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-java-conc-1", prompt: "JS is single-threaded. Java…", choices: ["Also single-threaded", "Multi-threaded with real OS threads", "Uses event loop", "No threads"], correctIndex: 1, explanation: "Java threads run truly in parallel on multiple CPU cores.", xp: 10 },
        { kind: "mcq", id: "q-js-java-conc-2", prompt: "Why doesn't JS need synchronized?", choices: ["JS has it too", "Single-threaded = no race conditions", "JS uses locks", "JS is thread-safe"], correctIndex: 1, explanation: "With one thread, shared state can't be accessed concurrently.", xp: 10 },
        { kind: "mcq", id: "q-js-java-conc-3", prompt: "Virtual threads (Java 21+) are like…", choices: ["Web Workers", "JS event loop async tasks (but multi-threaded)", "GPU threads", "OS threads"], correctIndex: 1, explanation: "Virtual threads: lightweight like async tasks, but can block.", xp: 10 },
        { kind: "debug", id: "q-js-java-conc-4", prompt: "Why doesn't this work?", brokenCode: "Thread t = new Thread(() -> System.out.println(\"hi\"));\nt.run();  // Not start()!", choices: ["run() executes synchronously — use start() for new thread", "Lambda is wrong", "Missing join", "Thread is abstract"], correctIndex: 0, explanation: "`run()` calls the method on the current thread. `start()` creates a new OS thread.", xp: 15 },
        { kind: "mcq", id: "q-js-java-conc-5", prompt: "`CompletableFuture` is most like JS…", choices: ["setTimeout", "Promise (with then/catch)", "async/await", "Worker"], correctIndex: 1, explanation: "CompletableFuture chains async operations like Promise.then().", xp: 10 },
      ],
    },
    { id: "js-java-generics", title: "Generics & Advanced", tagline: "Type erasure, wildcards, and design patterns.", icon: "✨", level: "advanced", order: 3, requires: ["js-java-concurrency"], rewardXp: 200,
      lessons: [
        { id: "lesson-js-java-gen-1", title: "Generics", intro: "JS has no generics (TypeScript does). Java generics use type erasure — type info removed at runtime. Can't use primitives (use wrappers). Wildcards (`? extends T`, `? super T`) handle covariance. PECS: Producer Extends, Consumer Super.", comparisons: [
            { concept: "No generics → Generics", knownCode: "// JS: dynamic typing, no need\nconst box = { value: 42 };", targetCode: "class Box<T> {\n    private T value;\n    public Box(T v) { this.value = v; }\n    public T get() { return value; }\n}\nBox<Integer> box = new Box<>(42);" },
            { concept: "TypeScript generics → Java generics", knownCode: "// TS: function first<T>(items: T[]): T { return items[0]; }", targetCode: "public <T> T first(List<T> items) {\n    return items.get(0);\n}", note: "Similar syntax. Java has type erasure; TS has full type info." },
          ], realWorld: "Type erasure means no `new T()`, no `instanceof T` at runtime. This is Java's biggest generics limitation.",
          exercise: { id: "ex-js-java-gen-1", prompt: "Create generic Pair<A,B> with first, second. Test with String and Integer.", starterCode: "// class Pair<A, B> { ... }\n", solution: "class Pair<A, B> {\n    private A first;\n    private B second;\n    public Pair(A f, B s) { this.first = f; this.second = s; }\n    public String toString() { return \"(\" + first + \", \" + second + \")\"; }\n}\nSystem.out.println(new Pair<>(\"Ada\", 36));", expectedOutputIncludes: "(Ada, 36)", xp: 50 } },
      ],
      quiz: [
        { kind: "mcq", id: "q-js-java-gen-1", prompt: "JS has generics.", choices: ["Yes", "No — TypeScript does, JS doesn't", "Only with JSDoc", "Only arrays"], correctIndex: 1, explanation: "JS is dynamically typed. TypeScript adds generics.", xp: 10 },
        { kind: "mcq", id: "q-js-java-gen-2", prompt: "Type erasure means…", choices: ["Types are checked at runtime", "Generic type info removed at compile time", "Types are optional", "Generics don't exist"], correctIndex: 1, explanation: "At runtime, `List<String>` is just `List`. Can't do `new T()`.", xp: 10 },
        { kind: "mcq", id: "q-js-java-gen-3", prompt: "PECS stands for…", choices: ["Producer Extends, Consumer Super", "Private Encapsulated Class System", "Public Enum Class Structure", "Parameterized Expression Clause Syntax"], correctIndex: 0, explanation: "`? extends T` for reading, `? super T` for writing.", xp: 10 },
        { kind: "debug", id: "q-js-java-gen-4", prompt: "Why doesn't this compile?", brokenCode: "List<int> nums = new ArrayList<>();", choices: ["Generics can't use primitives — use List<Integer>", "int is wrong", "ArrayList deprecated", "Missing import"], correctIndex: 0, explanation: "Primitives need wrapper classes for generics.", xp: 15 },
        { kind: "mcq", id: "q-js-java-gen-5", prompt: "`? extends Number` accepts…", choices: ["Only Number", "Number and all subclasses (Integer, Double, etc.)", "Any type", "Only primitives"], correctIndex: 1, explanation: "Upper bounded wildcard: Number and its subclasses.", xp: 10 },
      ],
    },
  ],
};
