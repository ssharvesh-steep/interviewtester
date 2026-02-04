export const pythonProblems = [
    // --- LEVEL 1: BASIC INPUT/OUTPUT ---
    {
        id: 'py-1',
        type: 'python-course',
        lockMode: true,
        title: 'Q1: Hello World',
        difficulty: 'Simple',
        description: 'Aim:\nWrite a program to print "Hello, World!" to the console.',
        input_format: "None",
        output_format: "Hello, World!",
        constraints: ["None"],
        examples: [],
        testCases: [
            { input: "", expected_output: "Hello, World!", is_public: true },
            { input: "", expected_output: "Hello, World!", is_public: false }
        ]
    },
    {
        id: 'py-2',
        type: 'python-course',
        lockMode: true,
        title: 'Q2: Read and Print Integer',
        difficulty: 'Simple',
        description: 'Aim:\nRead an integer from standard input and print it.',
        input_format: "An integer",
        output_format: "The integer",
        constraints: ["None"],
        examples: [
            { input: "5", output: "5", explanation: "Print input" }
        ],
        testCases: [
            { input: "5", expected_output: "5", is_public: true },
            { input: "100", expected_output: "100", is_public: false }
        ]
    },
    {
        id: 'py-3',
        type: 'python-course',
        lockMode: true,
        title: 'Q3: Add Two Numbers',
        difficulty: 'Simple',
        description: 'Aim:\nRead two integers from input and print their sum.',
        input_format: "Two integers on separate lines",
        output_format: "Sum",
        constraints: ["None"],
        examples: [
            { input: "2\n3", output: "5", explanation: "2+3=5" }
        ],
        testCases: [
            { input: "2\n3", expected_output: "5", is_public: true },
            { input: "100\n200", expected_output: "300", is_public: false }
        ]
    },
    {
        id: 'py-4',
        type: 'python-course',
        lockMode: true,
        title: 'Q4: Area of a Rectangle',
        difficulty: 'Simple',
        description: 'Aim:\nRead length and width (integers) and print the area.',
        input_format: "Length\nWidth",
        output_format: "Area",
        constraints: ["Length, Width > 0"],
        examples: [
            { input: "5\n4", output: "20", explanation: "5*4=20" }
        ],
        testCases: [
            { input: "5\n4", expected_output: "20", is_public: true },
            { input: "10\n10", expected_output: "100", is_public: false }
        ]
    },
    {
        id: 'py-5',
        type: 'python-course',
        lockMode: true,
        title: 'Q5: Swap Two Numbers',
        difficulty: 'Simple',
        description: 'Aim:\nSwap two input numbers and print them on separate lines.',
        input_format: "A\nB",
        output_format: "B\nA",
        constraints: ["None"],
        examples: [
            { input: "1\n2", output: "2\n1", explanation: "Swapped" }
        ],
        testCases: [
            { input: "1\n2", expected_output: "2\n1", is_public: true },
            { input: "10\n20", expected_output: "20\n10", is_public: false }
        ]
    },
    {
        id: 'py-6',
        type: 'python-course',
        lockMode: true,
        title: 'Q6: Kilometers to Miles',
        difficulty: 'Simple',
        description: 'Aim:\nConvert Kilometers to Miles (1 km = 0.621371 miles). Print rounded to 2 decimal places.',
        input_format: "Kilometers (float)",
        output_format: "Miles",
        constraints: ["None"],
        examples: [
            { input: "10", output: "6.21", explanation: "10 * 0.621371" }
        ],
        testCases: [
            { input: "10", expected_output: "6.21", is_public: true },
            { input: "100", expected_output: "62.14", is_public: false }
        ]
    },
    {
        id: 'py-7',
        type: 'python-course',
        lockMode: true,
        title: 'Q7: Simple Interest Calculator',
        difficulty: 'Simple',
        description: 'Aim:\nCalculate Simple Interest given Principal (P), Rate (R), and Time (T). Formula: (P*R*T)/100',
        input_format: "P\nR\nT",
        output_format: "Simple Interest",
        constraints: ["All inputs > 0"],
        examples: [
            { input: "1000\n5\n2", output: "100.0", explanation: "1000*5*2/100" }
        ],
        testCases: [
            { input: "1000\n5\n2", expected_output: "100.0", is_public: true },
            { input: "500\n10\n1", expected_output: "50.0", is_public: false }
        ]
    },
    {
        id: 'py-8',
        type: 'python-course',
        lockMode: true,
        title: 'Q8: Square of a Number',
        difficulty: 'Simple',
        description: 'Aim:\nRead a number and print its square.',
        input_format: "Integer N",
        output_format: "Square",
        constraints: ["None"],
        examples: [
            { input: "5", output: "25", explanation: "5^2" }
        ],
        testCases: [
            { input: "5", expected_output: "25", is_public: true },
            { input: "-4", expected_output: "16", is_public: false }
        ]
    },
    {
        id: 'py-9',
        type: 'python-course',
        lockMode: true,
        title: 'Q9: Cube of a Number',
        difficulty: 'Simple',
        description: 'Aim:\nRead a number and print its cube.',
        input_format: "Integer N",
        output_format: "Cube",
        constraints: ["None"],
        examples: [
            { input: "3", output: "27", explanation: "3^3" }
        ],
        testCases: [
            { input: "3", expected_output: "27", is_public: true },
            { input: "-2", expected_output: "-8", is_public: false }
        ]
    },
    {
        id: 'py-10',
        type: 'python-course',
        lockMode: true,
        title: 'Q10: Last Digit Extractor',
        difficulty: 'Simple',
        description: 'Aim:\nPrint the last digit of a given integer.',
        input_format: "Integer N",
        output_format: "Last Digit",
        constraints: ["None"],
        examples: [
            { input: "123", output: "3", explanation: "123 % 10" }
        ],
        testCases: [
            { input: "123", expected_output: "3", is_public: true },
            { input: "50", expected_output: "0", is_public: false }
        ]
    },

    // --- LEVEL 2: CONDITIONALS ---
    {
        id: 'py-11',
        type: 'python-course',
        lockMode: true,
        title: 'Q11: Even or Odd',
        difficulty: 'Simple',
        description: 'Aim:\nCheck if a number is even or odd.',
        input_format: "Integer N",
        output_format: "Even or Odd",
        constraints: ["None"],
        examples: [
            { input: "4", output: "Even", explanation: "4 is even" }
        ],
        testCases: [
            { input: "4", expected_output: "Even", is_public: true },
            { input: "7", expected_output: "Odd", is_public: false }
        ]
    },
    {
        id: 'py-12',
        type: 'python-course',
        lockMode: true,
        title: 'Q12: Positive, Negative, or Zero',
        difficulty: 'Simple',
        description: 'Aim:\nCheck if a number is Positive, Negative, or Zero.',
        input_format: "Integer N",
        output_format: "Positive, Negative, or Zero",
        constraints: ["None"],
        examples: [
            { input: "5", output: "Positive", explanation: "5 > 0" }
        ],
        testCases: [
            { input: "5", expected_output: "Positive", is_public: true },
            { input: "-2", expected_output: "Negative", is_public: false }
        ]
    },
    {
        id: 'py-13',
        type: 'python-course',
        lockMode: true,
        title: 'Q13: Leap Year Validator',
        difficulty: 'Simple',
        description: 'Aim:\nCheck if a year is a leap year.',
        input_format: "Year (Integer)",
        output_format: "True or False",
        constraints: ["Year > 0"],
        examples: [
            { input: "2020", output: "True", explanation: "Leap year" }
        ],
        testCases: [
            { input: "2020", expected_output: "True", is_public: true },
            { input: "2100", expected_output: "False", is_public: false }
        ]
    },
    {
        id: 'py-14',
        type: 'python-course',
        lockMode: true,
        title: 'Q14: Maximum of Two Numbers',
        difficulty: 'Simple',
        description: 'Aim:\nPrint the larger of two numbers.',
        input_format: "Two integers",
        output_format: "Max value",
        constraints: ["None"],
        examples: [
            { input: "5\n10", output: "10", explanation: "10 > 5" }
        ],
        testCases: [
            { input: "5\n10", expected_output: "10", is_public: true },
            { input: "-5\n-1", expected_output: "-1", is_public: false }
        ]
    },
    {
        id: 'py-15',
        type: 'python-course',
        lockMode: true,
        title: 'Q15: Maximum of Three Numbers',
        difficulty: 'Simple',
        description: 'Aim:\nPrint the largest of three distinct integers.',
        input_format: "Three integers",
        output_format: "Max value",
        constraints: ["None"],
        examples: [
            { input: "1\n5\n3", output: "5", explanation: "5 is max" },
        ],
        testCases: [
            { input: "1\n5\n3", expected_output: "5", is_public: true },
            { input: "10\n10\n2", expected_output: "10", is_public: false }
        ]
    },
    {
        id: 'py-16',
        type: 'python-course',
        lockMode: true,
        title: 'Q16: Divisibility Test (5 and 11)',
        difficulty: 'Simple',
        description: 'Aim:\nCheck if a number is divisible by BOTH 5 and 11.',
        input_format: "Integer N",
        output_format: "True or False",
        constraints: ["None"],
        examples: [
            { input: "55", output: "True", explanation: "Divisible by both" }
        ],
        testCases: [
            { input: "55", expected_output: "True", is_public: true },
            { input: "50", expected_output: "False", is_public: false }
        ]
    },
    {
        id: 'py-17',
        type: 'python-course',
        lockMode: true,
        title: 'Q17: Vowel Checker',
        difficulty: 'Simple',
        description: 'Aim:\nCheck if a character is a vowel (a, e, i, o, u).',
        input_format: "Single lowercase character",
        output_format: "Vowel or Consonant",
        constraints: ["None"],
        examples: [
            { input: "a", output: "Vowel", explanation: "a is vowel" }
        ],
        testCases: [
            { input: "a", expected_output: "Vowel", is_public: true },
            { input: "z", expected_output: "Consonant", is_public: false }
        ]
    },
    {
        id: 'py-18',
        type: 'python-course',
        lockMode: true,
        title: 'Q18: Grading System',
        difficulty: 'Simple',
        description: 'Aim:\nMarks > 90: A, > 80: B, else C.',
        input_format: "Marks (Integer)",
        output_format: "Grade (A, B, or C)",
        constraints: ["0 <= Marks <= 100"],
        examples: [
            { input: "95", output: "A", explanation: "> 90" }
        ],
        testCases: [
            { input: "95", expected_output: "A", is_public: true },
            { input: "85", expected_output: "B", is_public: false }
        ]
    },
    {
        id: 'py-19',
        type: 'python-course',
        lockMode: true,
        title: 'Q19: Valid Triangle (Angles)',
        difficulty: 'Simple',
        description: 'Aim:\nGiven three angles, check if they form a valid triangle (Sum must be 180).',
        input_format: "Angle1\nAngle2\nAngle3",
        output_format: "True or False",
        constraints: ["Angles > 0"],
        examples: [
            { input: "60\n60\n60", output: "True", explanation: "Sum is 180" }
        ],
        testCases: [
            { input: "60\n60\n60", expected_output: "True", is_public: true },
            { input: "100\n50\n50", expected_output: "False", is_public: false }
        ]
    },
    {
        id: 'py-20',
        type: 'python-course',
        lockMode: true,
        title: 'Q20: Character Case Checker',
        difficulty: 'Simple',
        description: 'Aim:\nCheck if a character is Uppercase or Lowercase.',
        input_format: "Single character",
        output_format: "Upper or Lower",
        constraints: ["Alphabet character"],
        examples: [
            { input: "A", output: "Upper", explanation: "A is upper" }
        ],
        testCases: [
            { input: "A", expected_output: "Upper", is_public: true },
            { input: "a", expected_output: "Lower", is_public: false }
        ]
    },

    // --- LEVEL 3: LOOPS ---
    {
        id: 'py-21',
        type: 'python-course',
        lockMode: true,
        title: 'Q21: Print 1 to N',
        difficulty: 'Medium',
        description: 'Aim:\nPrint numbers from 1 to N, each on a new line.',
        input_format: "Integer N",
        output_format: "1 to N on newlines",
        constraints: ["N >= 1"],
        examples: [
            { input: "3", output: "1\n2\n3", explanation: "1 to 3" }
        ],
        testCases: [
            { input: "3", expected_output: "1\n2\n3", is_public: true },
            { input: "1", expected_output: "1", is_public: false }
        ]
    },
    {
        id: 'py-22',
        type: 'python-course',
        lockMode: true,
        title: 'Q22: Sum of N Natural Numbers',
        difficulty: 'Medium',
        description: 'Aim:\nCalculate the sum of natural numbers from 1 to N.',
        input_format: "Integer N",
        output_format: "Sum",
        constraints: ["N >= 1"],
        examples: [
            { input: "5", output: "15", explanation: "1+2+3+4+5" }
        ],
        testCases: [
            { input: "5", expected_output: "15", is_public: true },
            { input: "10", expected_output: "55", is_public: false }
        ]
    },
    {
        id: 'py-23',
        type: 'python-course',
        lockMode: true,
        title: 'Q23: Factorial Calculator',
        difficulty: 'Medium',
        description: 'Aim:\nCalculate N factorial.',
        input_format: "Integer N",
        output_format: "Factorial",
        constraints: ["N >= 0"],
        examples: [
            { input: "5", output: "120", explanation: "5*4*3*2*1" }
        ],
        testCases: [
            { input: "5", expected_output: "120", is_public: true },
            { input: "0", expected_output: "1", is_public: false }
        ]
    },
    {
        id: 'py-24',
        type: 'python-course',
        lockMode: true,
        title: 'Q24: Multiplication Table',
        difficulty: 'Medium',
        description: 'Aim:\nPrint the multiplication table of N (1 to 10). Format: N x i = result.',
        input_format: "Integer N",
        output_format: "Table lines",
        constraints: ["1 <= N"],
        examples: [
            { input: "2", output: "2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20", explanation: "Table of 2" }
        ],
        testCases: [
            { input: "2", expected_output: "2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20", is_public: true }
        ]
    },
    {
        id: 'py-25',
        type: 'python-course',
        lockMode: true,
        title: 'Q25: Count Digits',
        difficulty: 'Medium',
        description: 'Aim:\nCount the number of digits in an integer.',
        input_format: "Integer N",
        output_format: "Count",
        constraints: ["None"],
        examples: [
            { input: "123", output: "3", explanation: "3 digits" }
        ],
        testCases: [
            { input: "123", expected_output: "3", is_public: true },
            { input: "5", expected_output: "1", is_public: false }
        ]
    },
    {
        id: 'py-26',
        type: 'python-course',
        lockMode: true,
        title: 'Q26: Reverse a Number',
        difficulty: 'Medium',
        description: 'Aim:\nReverse the digits of a given integer.',
        input_format: "Integer N > 0",
        output_format: "Reversed Number",
        constraints: ["N > 0"],
        examples: [
            { input: "123", output: "321", explanation: "Reversed" }
        ],
        testCases: [
            { input: "123", expected_output: "321", is_public: true },
            { input: "100", expected_output: "1", is_public: false }
        ]
    },
    {
        id: 'py-27',
        type: 'python-course',
        lockMode: true,
        title: 'Q27: Palindrome Number',
        difficulty: 'Medium',
        description: 'Aim:\nCheck if a number reads the same backward as forward.',
        input_format: "Integer N > 0",
        output_format: "True or False",
        constraints: ["N > 0"],
        examples: [
            { input: "121", output: "True", explanation: "Palindrome" }
        ],
        testCases: [
            { input: "121", expected_output: "True", is_public: true },
            { input: "123", expected_output: "False", is_public: false }
        ]
    },
    {
        id: 'py-28',
        type: 'python-course',
        lockMode: true,
        title: 'Q28: Sum of Digits',
        difficulty: 'Medium',
        description: 'Aim:\nCalculate the sum of all digits in a number.',
        input_format: "Integer N >= 0",
        output_format: "Sum",
        constraints: ["N >= 0"],
        examples: [
            { input: "123", output: "6", explanation: "1+2+3" }
        ],
        testCases: [
            { input: "123", expected_output: "6", is_public: true },
            { input: "99", expected_output: "18", is_public: false }
        ]
    },
    {
        id: 'py-29',
        type: 'python-course',
        lockMode: true,
        title: 'Q29: Fibonacci Series',
        difficulty: 'Medium',
        description: 'Aim:\nPrint the first N numbers of the Fibonacci series (starts with 0, 1).',
        input_format: "Integer N >= 2",
        output_format: "Series separated by newlines",
        constraints: ["N >= 2"],
        examples: [
            { input: "3", output: "0\n1\n1", explanation: "0, 1, 1" }
        ],
        testCases: [
            { input: "3", expected_output: "0\n1\n1", is_public: true },
            { input: "5", expected_output: "0\n1\n1\n2\n3", is_public: false }
        ]
    },
    {
        id: 'py-30',
        type: 'python-course',
        lockMode: true,
        title: 'Q30: Prime Checker',
        difficulty: 'Medium',
        description: 'Aim:\nCheck if a number N is prime.',
        input_format: "Integer N > 1",
        output_format: "True or False",
        constraints: ["N > 1"],
        examples: [
            { input: "7", output: "True", explanation: "Prime" }
        ],
        testCases: [
            { input: "7", expected_output: "True", is_public: true },
            { input: "10", expected_output: "False", is_public: false }
        ]
    },

    // --- LEVEL 4: STRINGS ---
    {
        id: 'py-31',
        type: 'python-course',
        lockMode: true,
        title: 'Q31: String Length',
        difficulty: 'Medium',
        description: 'Aim:\nFind the length of a string without using len() (use a loop).',
        input_format: "String",
        output_format: "Length",
        constraints: ["None"],
        examples: [
            { input: "abc", output: "3", explanation: "Length 3" }
        ],
        testCases: [
            { input: "abc", expected_output: "3", is_public: true },
            { input: "", expected_output: "0", is_public: false }
        ]
    },
    {
        id: 'py-32',
        type: 'python-course',
        lockMode: true,
        title: 'Q32: Count Vowels',
        difficulty: 'Medium',
        description: 'Aim:\nCount the number of vowels in a string.',
        input_format: "String",
        output_format: "Count",
        constraints: ["None"],
        examples: [
            { input: "hello", output: "2", explanation: "e, o" }
        ],
        testCases: [
            { input: "hello", expected_output: "2", is_public: true },
            { input: "xyz", expected_output: "0", is_public: false }
        ]
    },
    {
        id: 'py-33',
        type: 'python-course',
        lockMode: true,
        title: 'Q33: Reverse String',
        difficulty: 'Medium',
        description: 'Aim:\nReverse a given string.',
        input_format: "String",
        output_format: "Reversed String",
        constraints: ["None"],
        examples: [
            { input: "Python", output: "nohtyP", explanation: "Reversed" }
        ],
        testCases: [
            { input: "Python", expected_output: "nohtyP", is_public: true },
            { input: "A B", expected_output: "B A", is_public: false }
        ]
    },
    {
        id: 'py-34',
        type: 'python-course',
        lockMode: true,
        title: 'Q34: Palindrome String',
        difficulty: 'Medium',
        description: 'Aim:\nCheck if a string is a palindrome.',
        input_format: "String",
        output_format: "True or False",
        constraints: ["None"],
        examples: [
            { input: "madam", output: "True", explanation: "Palindrome" }
        ],
        testCases: [
            { input: "madam", expected_output: "True", is_public: true },
            { input: "hello", expected_output: "False", is_public: false }
        ]
    },
    {
        id: 'py-35',
        type: 'python-course',
        lockMode: true,
        title: 'Q35: Remove Spaces',
        difficulty: 'Medium',
        description: 'Aim:\nRemove all spaces from a string.',
        input_format: "String",
        output_format: "String without spaces",
        constraints: ["None"],
        examples: [
            { input: "a b c", output: "abc", explanation: "Removed spaces" }
        ],
        testCases: [
            { input: "a b c", expected_output: "abc", is_public: true },
            { input: "t est", expected_output: "test", is_public: false }
        ]
    },
    {
        id: 'py-36',
        type: 'python-course',
        lockMode: true,
        title: 'Q36: Toggle Case',
        difficulty: 'Medium',
        description: 'Aim:\nSwap the case of characters (Lower to Upper and vice versa).',
        input_format: "String",
        output_format: "Toggled String",
        constraints: ["None"],
        examples: [
            { input: "AbC", output: "aBc", explanation: "Toggled" }
        ],
        testCases: [
            { input: "AbC", expected_output: "aBc", is_public: true },
            { input: "python", expected_output: "PYTHON", is_public: false }
        ]
    },
    {
        id: 'py-37',
        type: 'python-course',
        lockMode: true,
        title: 'Q37: Frequency Count',
        difficulty: 'Medium',
        description: 'Aim:\nInput a string (line 1) and a character (line 2). Count how many times the character appears.',
        input_format: "String\nCharacter",
        output_format: "Count",
        constraints: ["None"],
        examples: [
            { input: "hello\nl", output: "2", explanation: "l appears twice" }
        ],
        testCases: [
            { input: "hello\nl", expected_output: "2", is_public: true },
            { input: "world\na", expected_output: "0", is_public: false }
        ]
    },
    {
        id: 'py-38',
        type: 'python-course',
        lockMode: true,
        title: 'Q38: Check Substring',
        difficulty: 'Medium',
        description: 'Aim:\nCheck if the word "code" exists in the input string.',
        input_format: "String",
        output_format: "True or False",
        constraints: ["None"],
        examples: [
            { input: "codetantra", output: "True", explanation: "Contains code" }
        ],
        testCases: [
            { input: "codetantra", expected_output: "True", is_public: true },
            { input: "hello world", expected_output: "False", is_public: false }
        ]
    },
    {
        id: 'py-39',
        type: 'python-course',
        lockMode: true,
        title: 'Q39: Capitalize Words',
        difficulty: 'Medium',
        description: 'Aim:\nCapitalize the first letter of every word in a sentence.',
        input_format: "String",
        output_format: "Capitalized String",
        constraints: ["None"],
        examples: [
            { input: "hello world", output: "Hello World", explanation: "Capitalized" }
        ],
        testCases: [
            { input: "hello world", expected_output: "Hello World", is_public: true },
            { input: "java python", expected_output: "Java Python", is_public: false }
        ]
    },
    {
        id: 'py-40',
        type: 'python-course',
        lockMode: true,
        title: 'Q40: ASCII Value',
        difficulty: 'Simple',
        description: 'Aim:\nPrint the ASCII value of a character.',
        input_format: "Single Character",
        output_format: "ASCII Value",
        constraints: ["Single Character"],
        examples: [
            { input: "A", output: "65", explanation: "ASCII of A" }
        ],
        testCases: [
            { input: "A", expected_output: "65", is_public: true },
            { input: "a", expected_output: "97", is_public: false }
        ]
    },

    // --- LEVEL 5: LISTS & ADVANCED ---
    {
        id: 'py-41',
        type: 'python-course',
        lockMode: true,
        title: 'Q41: Sum of Array',
        difficulty: 'Tough',
        description: 'Aim:\nCalculate the sum of all elements in a list. Input is space-separated integers.',
        input_format: "Space-separated integers",
        output_format: "Sum",
        constraints: ["None"],
        examples: [
            { input: "1 2 3", output: "6", explanation: "Sum" }
        ],
        testCases: [
            { input: "1 2 3", expected_output: "6", is_public: true },
            { input: "10 10", expected_output: "20", is_public: false }
        ]
    },
    {
        id: 'py-42',
        type: 'python-course',
        lockMode: true,
        title: 'Q42: Largest Element',
        difficulty: 'Tough',
        description: 'Aim:\nFind the maximum element in a list.',
        input_format: "Space-separated integers",
        output_format: "Max",
        constraints: ["None"],
        examples: [
            { input: "1 5 2", output: "5", explanation: "5 is max" }
        ],
        testCases: [
            { input: "1 5 2", expected_output: "5", is_public: true },
            { input: "-1 -5", expected_output: "-1", is_public: false }
        ]
    },
    {
        id: 'py-43',
        type: 'python-course',
        lockMode: true,
        title: 'Q43: Smallest Element',
        difficulty: 'Tough',
        description: 'Aim:\nFind the minimum element in a list.',
        input_format: "Space-separated integers",
        output_format: "Min",
        constraints: ["None"],
        examples: [
            { input: "1 5 2", output: "1", explanation: "1 is min" }
        ],
        testCases: [
            { input: "1 5 2", expected_output: "1", is_public: true },
            { input: "10 20", expected_output: "10", is_public: false }
        ]
    },
    {
        id: 'py-44',
        type: 'python-course',
        lockMode: true,
        title: 'Q44: Sort Array',
        difficulty: 'Tough',
        description: 'Aim:\nSort the array in ascending order.',
        input_format: "Space-separated integers",
        output_format: "Sorted integers",
        constraints: ["None"],
        examples: [
            { input: "3 1 2", output: "1 2 3", explanation: "Sorted" }
        ],
        testCases: [
            { input: "3 1 2", expected_output: "1 2 3", is_public: true },
            { input: "5 0", expected_output: "0 5", is_public: false }
        ]
    },
    {
        id: 'py-45',
        type: 'python-course',
        lockMode: true,
        title: 'Q45: Second Largest Element',
        difficulty: 'Tough',
        description: 'Aim:\nFind the second largest number in a list of distinct integers.',
        input_format: "Space-separated integers",
        output_format: "Second Largest",
        constraints: ["List size >= 2"],
        examples: [
            { input: "10 20 30", output: "20", explanation: "20" }
        ],
        testCases: [
            { input: "10 20 30", expected_output: "20", is_public: true },
            { input: "5 1", expected_output: "1", is_public: false }
        ]
    },
    {
        id: 'py-46',
        type: 'python-course',
        lockMode: true,
        title: 'Q46: Remove Duplicates',
        difficulty: 'Tough',
        description: 'Aim:\nRemove duplicate numbers from a list and print the unique values sorted.',
        input_format: "Space-separated integers",
        output_format: "Sorted Unique Integers",
        constraints: ["None"],
        examples: [
            { input: "1 1 2", output: "1 2", explanation: "Unique" }
        ],
        testCases: [
            { input: "1 1 2", expected_output: "1 2", is_public: true },
            { input: "5 5 5", expected_output: "5", is_public: false }
        ]
    },
    {
        id: 'py-47',
        type: 'python-course',
        lockMode: true,
        title: 'Q47: Count Even Numbers',
        difficulty: 'Tough',
        description: 'Aim:\nCount how many even numbers are in a list.',
        input_format: "Space-separated integers",
        output_format: "Count",
        constraints: ["None"],
        examples: [
            { input: "1 2 3 4", output: "2", explanation: "2, 4 are even" }
        ],
        testCases: [
            { input: "1 2 3 4", expected_output: "2", is_public: true },
            { input: "1 3 5", expected_output: "0", is_public: false }
        ]
    },
    {
        id: 'py-48',
        type: 'python-course',
        lockMode: true,
        title: 'Q48: Linear Search',
        difficulty: 'Tough',
        description: 'Aim:\nCheck if number K exists in the list.\nLine 1: List (space separated)\nLine 2: K (integer to search)',
        input_format: "List (line 1)\nK (line 2)",
        output_format: "True or False",
        constraints: ["None"],
        examples: [
            { input: "1 2 3\n2", output: "True", explanation: "Found" }
        ],
        testCases: [
            { input: "1 2 3\n2", expected_output: "True", is_public: true },
            { input: "1 2 3\n5", expected_output: "False", is_public: false }
        ]
    },
    {
        id: 'py-49',
        type: 'python-course',
        lockMode: true,
        title: 'Q49: Valid Anagram',
        difficulty: 'Tough',
        description: 'Aim:\nGiven two strings (on separate lines), check if they are anagrams.',
        input_format: "String1\nString2",
        output_format: "True or False",
        constraints: ["None"],
        examples: [
            { input: "listen\nsilent", output: "True", explanation: "Anagram" }
        ],
        testCases: [
            { input: "listen\nsilent", expected_output: "True", is_public: true },
            { input: "rat\ncar", expected_output: "False", is_public: false }
        ]
    },
    {
        id: 'py-50',
        type: 'python-course',
        lockMode: true,
        title: 'Q50: Valid Parentheses (Advanced)',
        difficulty: 'Tough',
        description: 'Aim:\nCheck if a string containing ()[]{} is balanced.',
        input_format: "String",
        output_format: "True or False",
        constraints: ["Length >= 1"],
        examples: [
            { input: "()[]{}", output: "True", explanation: "Balanced" }
        ],
        testCases: [
            { input: "()[]{}", expected_output: "True", is_public: true },
            { input: "(]", expected_output: "False", is_public: false }
        ]
    }
];
