export const cProblems = [
    {
        id: 'exp-1',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 1: Sum of Two Integers',
        difficulty: 'Simple',
        description: 'Aim:\nTo read two integers and print their sum.\n\nInput Format:\n• First line contains integer A\n• Second line contains integer B\n\nOutput Format:\n• Print the sum of A and B',
        input_format: "Two integers on separate lines",
        output_format: "Sum of the two integers",
        constraints: ["Time Limit: 1s", "Memory Limit: 64MB"],
        examples: [
            { input: "10\n20", output: "30", explanation: "10 + 20 = 30" }
        ],
        testCases: [
            { input: "10\n20", expected_output: "30", is_public: true },
            { input: "-5\n5", expected_output: "0", is_public: false },
            { input: "100\n200", expected_output: "300", is_public: false }
        ]
    },
    {
        id: 'exp-2',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 2: Difference of Two Integers',
        difficulty: 'Simple',
        description: 'Aim:\nTo read two integers and print their difference.',
        input_format: "Two integers on separate lines",
        output_format: "Difference (A - B)",
        constraints: ["Time Limit: 1s"],
        examples: [
            { input: "15\n8", output: "7", explanation: "15 - 8 = 7" }
        ],
        testCases: [
            { input: "15\n8", expected_output: "7", is_public: true }
        ]
    },
    {
        id: 'exp-3',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 3: Area of a Circle',
        difficulty: 'Simple',
        description: 'Aim:\nTo calculate the area of a circle given its radius.\n\nFormula: Area = 3.14159 * r * r',
        input_format: "One float value representing radius",
        output_format: "Print the area up to two decimal places",
        constraints: ["Time Limit: 1s"],
        examples: [
            { input: "7", output: "153.94", explanation: "Area calculation" }
        ],
        testCases: [
            { input: "7", expected_output: "153.94", is_public: true }
        ]
    },
    {
        id: 'exp-4',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 4: Simple Interest Calculation',
        difficulty: 'Medium',
        description: 'Aim:\nTo calculate simple interest using principal, rate, and time.\n\nFormula: (p * r * t) / 100',
        input_format: "principal\nrate\ntime",
        output_format: "Print simple interest up to two decimal places",
        constraints: ["Time Limit: 1s"],
        examples: [
            { input: "1000\n5\n2", output: "100.00", explanation: "Interest calculation" }
        ],
        testCases: [
            { input: "1000\n5\n2", expected_output: "100.00", is_public: true }
        ]
    },
    {
        id: 'exp-5',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 5: Basic Arithmetic Operations',
        difficulty: 'Tough',
        description: 'Aim:\nPerform basic arithmetic operations (addition, subtraction, multiplication, and division) on two numbers.\n\nThe program should:\n• Read two double-precision floating-point numbers\n• Perform all four operations\n• Display each result formatted to two decimal places\n\nAssume the second number will never be zero.',
        input_format: "enter number1: <value>\nenter non zero number2: <value>",
        output_format: "number1 operator number2 = result",
        constraints: ["Time Limit: 1s"],
        examples: [
            { input: "12.50\n2.50", output: "12.50 + 2.50 = 15.00\n12.50 - 2.50 = 10.00\n12.50 * 2.50 = 31.25\n12.50 / 2.50 = 5.00", explanation: "Arithmetic operations" }
        ],
        testCases: [
            { input: "12.50\n2.50", expected_output: "12.50 + 2.50 = 15.00\n12.50 - 2.50 = 10.00\n12.50 * 2.50 = 31.25\n12.50 / 2.50 = 5.00", is_public: true }
        ]
    },
    {
        id: 'exp-6',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 6: Check Even or Odd',
        difficulty: 'Simple',
        description: 'Problem Description\nWrite a C program that reads an integer value and determines whether the given number is even or odd.',
        input_format: "A single integer N",
        output_format: "Print Even or Odd",
        constraints: ["-10^9 <= N <= 10^9"],
        examples: [
            { input: "10", output: "Even", explanation: "10 is even" }
        ],
        testCases: [
            { input: "10", expected_output: "Even", is_public: true },
            { input: "7", expected_output: "Odd", is_public: false }
        ]
    },
    {
        id: 'exp-7',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 7: Check Positive, Negative, or Zero',
        difficulty: 'Simple',
        description: 'Problem Description\nWrite a C program that reads an integer and determines whether the number is positive, negative, or zero.',
        input_format: "A single integer N",
        output_format: "Positive, Negative, or Zero",
        constraints: ["-10^9 <= N <= 10^9"],
        examples: [
            { input: "-15", output: "Negative", explanation: "-15 < 0" }
        ],
        testCases: [
            { input: "-15", expected_output: "Negative", is_public: true },
            { input: "10", expected_output: "Positive", is_public: false },
            { input: "0", expected_output: "Zero", is_public: false }
        ]
    },
    {
        id: 'exp-8',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 8: Find Largest of Two Numbers',
        difficulty: 'Simple',
        description: 'Problem Description\nWrite a C program to find the largest of two given integers.',
        input_format: "Two integers",
        output_format: "The largest integer",
        constraints: ["Time Limit: 1s"],
        examples: [
            { input: "12\n20", output: "20", explanation: "20 > 12" }
        ],
        testCases: [
            { input: "12\n20", expected_output: "20", is_public: true }
        ]
    },
    {
        id: 'exp-9',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 9: Find Largest of Three Numbers',
        difficulty: 'Simple',
        description: 'Problem Description\nWrite a C program to find the largest among three integers using conditional statements.',
        input_format: "Three space-separated integers",
        output_format: "The largest integer",
        constraints: ["Time Limit: 1s"],
        examples: [
            { input: "5 9 3", output: "9", explanation: "9 is largest" }
        ],
        testCases: [
            { input: "5 9 3", expected_output: "9", is_public: true }
        ]
    },
    {
        id: 'exp-10',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 10: Check Leap Year',
        difficulty: 'Simple',
        description: 'Problem Description\nWrite a C program to determine whether a given year is a leap year.',
        input_format: "A single integer representing the year",
        output_format: "Print Leap Year or Not a Leap Year",
        constraints: ["1 <= Year <= 9999"],
        examples: [
            { input: "2024", output: "Leap Year", explanation: "Divisible by 4" }
        ],
        testCases: [
            { input: "2024", expected_output: "Leap Year", is_public: true },
            { input: "2023", expected_output: "Not a Leap Year", is_public: false }
        ]
    },
    {
        id: 'exp-11',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 11: Simple Calculator Using switch',
        difficulty: 'Medium',
        description: 'Problem Description\nDevelop a C program that performs basic arithmetic operations using the switch statement.',
        input_format: "enter first number: <int>\nenter second number: <int>\nenter operator: <char>",
        output_format: "result = <value>",
        constraints: ["No division by zero"],
        examples: [
            { input: "10\n5\n*", output: "result = 50", explanation: "Multiplication" }
        ],
        testCases: [
            { input: "10\n5\n*", expected_output: "result = 50", is_public: true }
        ]
    },
    {
        id: 'exp-12',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 12: Print Numbers 1 to N',
        difficulty: 'Simple',
        description: 'Problem Description\nWrite a C program that reads a positive integer N and prints all numbers from 1 to N in increasing order.',
        input_format: "A single integer N",
        output_format: "Print numbers from 1 to N, separated by space",
        constraints: ["1 <= N <= 10^5"],
        examples: [
            { input: "5", output: "1 2 3 4 5 ", explanation: "1 to 5" }
        ],
        testCases: [
            { input: "5", expected_output: "1 2 3 4 5 ", is_public: true }
        ]
    },
    {
        id: 'exp-13',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 13: Sum of First N Natural Numbers',
        difficulty: 'Simple',
        description: 'Problem Description\nCalculate the sum of the first N natural numbers using a loop.',
        input_format: "A single integer N",
        output_format: "Sum",
        constraints: ["1 <= N <= 10^5"],
        examples: [
            { input: "10", output: "55", explanation: "Sum of 1..10" }
        ],
        testCases: [
            { input: "10", expected_output: "55", is_public: true }
        ]
    },
    {
        id: 'exp-14',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 14: Multiplication Table',
        difficulty: 'Simple',
        description: 'Problem Description\nPrint the multiplication table of a given number.',
        input_format: "Integer N",
        output_format: "N x 1 = ... to N x 10 = ...",
        constraints: ["N <= 1000"],
        examples: [
            { input: "5", output: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50\n", explanation: "Table of 5" }
        ],
        testCases: [
            { input: "5", expected_output: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50\n", is_public: true }
        ]
    },
    {
        id: 'exp-15',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 15: Factorial of a Number',
        difficulty: 'Medium',
        description: 'Problem Description\nFind the factorial of a given non-negative integer using a loop.',
        input_format: "Integer N",
        output_format: "Factorial",
        constraints: ["0 <= N <= 20"],
        examples: [
            { input: "5", output: "120", explanation: "5! = 120" }
        ],
        testCases: [
            { input: "5", expected_output: "120", is_public: true }
        ]
    },
    {
        id: 'exp-16',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 16: Reverse a Number',
        difficulty: 'Simple',
        description: 'Problem Description\nReverse a given integer.',
        input_format: "Integer N",
        output_format: "Reversed Number",
        constraints: ["0 <= N <= 10^9"],
        examples: [
            { input: "1204", output: "4021", explanation: "Reverse digits" }
        ],
        testCases: [
            { input: "1204", expected_output: "4021", is_public: true }
        ]
    },
    {
        id: 'exp-17',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 17: Check Palindrome Number',
        difficulty: 'Medium',
        description: 'Problem Description\nCheck whether a given number is a palindrome.',
        input_format: "Integer N",
        output_format: "Palindrome or Not Palindrome",
        constraints: ["0 <= N <= 10^9"],
        examples: [
            { input: "121", output: "Palindrome", explanation: "121 is palindrome" }
        ],
        testCases: [
            { input: "121", expected_output: "Palindrome", is_public: true },
            { input: "123", expected_output: "Not Palindrome", is_public: false }
        ]
    },
    {
        id: 'exp-18',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 18: Read and Display Array',
        difficulty: 'Simple',
        description: 'Problem Description\nRead N integers into an array and display them.',
        input_format: "N\nN integers",
        output_format: "Array elements separated by space",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "5\n10 20 30 40 50", output: "10 20 30 40 50 ", explanation: "Elements printed" }
        ],
        testCases: [
            { input: "5\n10 20 30 40 50", expected_output: "10 20 30 40 50 ", is_public: true }
        ]
    },
    {
        id: 'exp-19',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 19: Sum and Average of Array',
        difficulty: 'Medium',
        description: 'Problem Description\nCalculate the sum and average of array elements.',
        input_format: "N\nN integers",
        output_format: "Sum\nAverage (2 decimal places)",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "4\n10 20 30 40", output: "100\n25.00", explanation: "Sum=100 Avg=25" }
        ],
        testCases: [
            { input: "4\n10 20 30 40", expected_output: "100\n25.00", is_public: true }
        ]
    },
    {
        id: 'exp-20',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 20: Find Largest in Array',
        difficulty: 'Simple',
        description: 'Problem Description\nFind the largest element in an array.',
        input_format: "N\nN integers",
        output_format: "Largest element",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "5\n2 8 1 6 4", output: "8", explanation: "8 is max" }
        ],
        testCases: [
            { input: "5\n2 8 1 6 4", expected_output: "8", is_public: true }
        ]
    },
    {
        id: 'exp-21',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 21: Find Smallest in Array',
        difficulty: 'Simple',
        description: 'Problem Description\nFind the smallest element in an array.',
        input_format: "N\nN integers",
        output_format: "Smallest element",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "5\n2 8 1 6 4", output: "1", explanation: "1 is min" }
        ],
        testCases: [
            { input: "5\n2 8 1 6 4", expected_output: "1", is_public: true }
        ]
    },
    {
        id: 'exp-22',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 22: Linear Search',
        difficulty: 'Medium',
        description: 'Problem Description\nCheck whether a key is present in the array using Linear Search. If found, print position (1-based index).',
        input_format: "N\nN integers\nKey",
        output_format: "Position or Element not found",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "5\n10 20 30 40 50\n30", output: "3", explanation: "Found at 3" }
        ],
        testCases: [
            { input: "5\n10 20 30 40 50\n30", expected_output: "3", is_public: true },
            { input: "3\n1 2 3\n5", expected_output: "Element not found", is_public: false }
        ]
    },
    {
        id: 'exp-23',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 23: Reverse an Array',
        difficulty: 'Medium',
        description: 'Problem Description\nReverse an array in place and display it.',
        input_format: "N\nN integers",
        output_format: "Reversed array",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "5\n1 2 3 4 5", output: "5 4 3 2 1 ", explanation: "Reversed" }
        ],
        testCases: [
            { input: "5\n1 2 3 4 5", expected_output: "5 4 3 2 1 ", is_public: true }
        ]
    },
    {
        id: 'exp-24',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 24: Read and Display String',
        difficulty: 'Simple',
        description: 'Problem Description\nRead a string and display it.',
        input_format: "String",
        output_format: "String",
        constraints: ["Length <= 100"],
        examples: [
            { input: "C programming", output: "C programming", explanation: "Echo" }
        ],
        testCases: [
            { input: "C programming", expected_output: "C programming", is_public: true }
        ]
    },
    {
        id: 'exp-25',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 25: Length of String',
        difficulty: 'Simple',
        description: 'Problem Description\nCalculate length of string without strlen().',
        input_format: "String",
        output_format: "Length",
        constraints: ["Length <= 100"],
        examples: [
            { input: "Hello", output: "5", explanation: "Length 5" }
        ],
        testCases: [
            { input: "Hello", expected_output: "5", is_public: true }
        ]
    },
    {
        id: 'exp-26',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 26: Copy String',
        difficulty: 'Simple',
        description: 'Problem Description\nCopy one string to another manually.',
        input_format: "String",
        output_format: "Copied String",
        constraints: ["Length <= 100"],
        examples: [
            { input: "Hello World", output: "Hello World", explanation: "Copy" }
        ],
        testCases: [
            { input: "Hello World", expected_output: "Hello World", is_public: true }
        ]
    },
    {
        id: 'exp-27',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 27: Compare Two Strings',
        difficulty: 'Medium',
        description: 'Problem Description\nCompare two strings without strcmp().',
        input_format: "String1\nString2",
        output_format: "Equal or Not Equal",
        constraints: ["Length <= 100"],
        examples: [
            { input: "Hello\nHello", output: "Equal", explanation: "Same" }
        ],
        testCases: [
            { input: "Hello\nHello", expected_output: "Equal", is_public: true },
            { input: "Hello\nWorld", expected_output: "Not Equal", is_public: false }
        ]
    },
    {
        id: 'exp-28',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 28: Reverse a String',
        difficulty: 'Medium',
        description: 'Problem Description\nReverse a string in place.',
        input_format: "String",
        output_format: "Reversed String",
        constraints: ["Length <= 100"],
        examples: [
            { input: "programming", output: "gnimmargorp", explanation: "Reverse" }
        ],
        testCases: [
            { input: "programming", expected_output: "gnimmargorp", is_public: true }
        ]
    },
    {
        id: 'exp-29',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 29: Check Palindrome String',
        difficulty: 'Tough',
        description: 'Problem Description\nCheck if a string is a palindrome.',
        input_format: "String",
        output_format: "Palindrome or Not Palindrome",
        constraints: ["Length <= 100"],
        examples: [
            { input: "madam", output: "Palindrome", explanation: "Palindrome" }
        ],
        testCases: [
            { input: "madam", expected_output: "Palindrome", is_public: true },
            { input: "hello", expected_output: "Not Palindrome", is_public: false }
        ]
    },
    {
        id: 'exp-30',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 30: Function to Add Two Numbers',
        difficulty: 'Simple',
        description: 'Problem Description\nAdd two integers using a function.',
        input_format: "Two integers",
        output_format: "Sum",
        constraints: ["-"],
        examples: [
            { input: "10 20", output: "30", explanation: "Sum" }
        ],
        testCases: [
            { input: "10 20", expected_output: "30", is_public: true }
        ]
    },
    {
        id: 'exp-31',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 31: Function for Max of Two',
        difficulty: 'Simple',
        description: 'Problem Description\nFind max using function.',
        input_format: "Two integers",
        output_format: "Max",
        constraints: ["-"],
        examples: [
            { input: "15 9", output: "15", explanation: "Max" }
        ],
        testCases: [
            { input: "15 9", expected_output: "15", is_public: true }
        ]
    },
    {
        id: 'exp-32',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 32: Function for Factorial',
        difficulty: 'Medium',
        description: 'Problem Description\nCalculate factorial using function.',
        input_format: "N",
        output_format: "Factorial",
        constraints: ["0 <= N <= 20"],
        examples: [
            { input: "5", output: "120", explanation: "120" }
        ],
        testCases: [
            { input: "5", expected_output: "120", is_public: true }
        ]
    },
    {
        id: 'exp-33',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 33: Demonstrate Call by Value',
        difficulty: 'Medium',
        description: 'Problem Description\nDemonstrate call by value (no change outside).',
        input_format: "A B",
        output_format: "Before swapping: A B\nAfter swapping: A B",
        constraints: ["-"],
        examples: [
            { input: "10 20", output: "Before swapping: 10 20\nAfter swapping: 10 20", explanation: "No swap" }
        ],
        testCases: [
            { input: "10 20", expected_output: "Before swapping: 10 20\nAfter swapping: 10 20", is_public: true }
        ]
    },
    {
        id: 'exp-34',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 34: Demonstrate Call by Reference',
        difficulty: 'Medium',
        description: 'Problem Description\nSwap using call by reference.',
        input_format: "A B",
        output_format: "Before swapping: A B\nAfter swapping: B A",
        constraints: ["-"],
        examples: [
            { input: "10 20", output: "Before swapping: 10 20\nAfter swapping: 20 10", explanation: "Swap" }
        ],
        testCases: [
            { input: "10 20", expected_output: "Before swapping: 10 20\nAfter swapping: 20 10", is_public: true }
        ]
    },
    {
        id: 'exp-35',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 35: Recursive Fibonacci',
        difficulty: 'Medium',
        description: 'Problem Description\nFibonacci series using recursion.',
        input_format: "N",
        output_format: "Series",
        constraints: ["1 <= N <= 20"],
        examples: [
            { input: "5", output: "0 1 1 2 3 ", explanation: "Fibonacci" }
        ],
        testCases: [
            { input: "5", expected_output: "0 1 1 2 3 ", is_public: true }
        ]
    },
    {
        id: 'exp-36',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 36: Pointers - Value and Address',
        difficulty: 'Medium',
        description: 'Problem Description\nDisplay value and access via pointer.',
        input_format: "N",
        output_format: "Value: N\nPointer Value: N",
        constraints: ["-"],
        examples: [
            { input: "10", output: "Value: 10\nPointer Value: 10", explanation: "Pointer check" }
        ],
        testCases: [
            { input: "10", expected_output: "Value: 10\nAddress: ", is_public: true }
        ]
    },
    {
        id: 'exp-37',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 37: Swap using Pointers',
        difficulty: 'Medium',
        description: 'Problem Description\nSwap using pointers.',
        input_format: "A B",
        output_format: "Before swapping: A B\nAfter swapping: B A",
        constraints: ["-"],
        examples: [
            { input: "10 20", output: "Before swapping: 10 20\nAfter swapping: 20 10", explanation: "Pointer swap" }
        ],
        testCases: [
            { input: "10 20", expected_output: "Before swapping: 10 20\nAfter swapping: 20 10", is_public: true }
        ]
    },
    {
        id: 'exp-38',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 38: Array Access via Pointers',
        difficulty: 'Medium',
        description: 'Problem Description\nAccess array elements using pointers.',
        input_format: "N\nN integers",
        output_format: "Elements",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "5\n1 2 3 4 5", output: "1 2 3 4 5 ", explanation: "Pointer access" }
        ],
        testCases: [
            { input: "5\n1 2 3 4 5", expected_output: "1 2 3 4 5 ", is_public: true }
        ]
    },
    {
        id: 'exp-39',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 39: Pointer Arithmetic',
        difficulty: 'Medium',
        description: 'Problem Description\nIterate array using pointer increment.',
        input_format: "N\nN integers",
        output_format: "Elements and Addresses (Simplified)",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "3\n10 20 30", output: "10 <addr>\n20 <addr>\n30 <addr>", explanation: "Pointer arithmetic" }
        ],
        testCases: [
            { input: "3\n10 20 30", expected_output: "10 ", is_public: true }
        ]
    },
    {
        id: 'exp-40',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 40: Pointers and Functions',
        difficulty: 'Medium',
        description: 'Problem Description\nSum of array using pointers and function.',
        input_format: "N\nN integers",
        output_format: "Sum",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "4\n10 20 30 40", output: "100", explanation: "Sum" }
        ],
        testCases: [
            { input: "4\n10 20 30 40", expected_output: "100", is_public: true }
        ]
    },
    {
        id: 'exp-41',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 41: Pointer to Pointer',
        difficulty: 'Tough',
        description: 'Problem Description\nDemonstrate pointer to pointer.',
        input_format: "N",
        output_format: "N\nN\nN",
        constraints: ["-"],
        examples: [
            { input: "25", output: "25\n25\n25", explanation: "Double pointer" }
        ],
        testCases: [
            { input: "25", expected_output: "25\n25\n25", is_public: true }
        ]
    },
    {
        id: 'exp-42',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 42: malloc Allocation',
        difficulty: 'Medium',
        description: 'Problem Description\nAllocate memory using malloc.',
        input_format: "N\nN integers",
        output_format: "Elements",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "5\n10 20 30 40 50", output: "10 20 30 40 50 ", explanation: "Malloc" }
        ],
        testCases: [
            { input: "5\n10 20 30 40 50", expected_output: "10 20 30 40 50 ", is_public: true }
        ]
    },
    {
        id: 'exp-43',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 43: calloc Allocation',
        difficulty: 'Medium',
        description: 'Problem Description\nAllocate using calloc.',
        input_format: "N\nN integers",
        output_format: "Elements",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "3\n4 5 6", output: "4 5 6 ", explanation: "Calloc" }
        ],
        testCases: [
            { input: "3\n4 5 6", expected_output: "4 5 6 ", is_public: true }
        ]
    },
    {
        id: 'exp-44',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 44: realloc Memory',
        difficulty: 'Medium',
        description: 'Problem Description\nResize memory using realloc.',
        input_format: "N1\nN1 ints\nN2\nN2 ints",
        output_format: "Combined Elements",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "2\n10 20\n2\n30 40", output: "10 20 30 40 ", explanation: "Realloc" }
        ],
        testCases: [
            { input: "2\n10 20\n2\n30 40", expected_output: "10 20 30 40 ", is_public: true }
        ]
    },
    {
        id: 'exp-45',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 45: Sum with Dynamic Memory',
        difficulty: 'Medium',
        description: 'Problem Description\nSum using dynamic memory.',
        input_format: "N\nN integers",
        output_format: "Sum",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "4\n5 10 15 20", output: "50", explanation: "Sum" }
        ],
        testCases: [
            { input: "4\n5 10 15 20", expected_output: "50", is_public: true }
        ]
    },
    {
        id: 'exp-46',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 46: Memory Deallocation (free)',
        difficulty: 'Medium',
        description: 'Problem Description\nAllocate and free memory.',
        input_format: "N\nN integers",
        output_format: "Elements",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "3\n1 2 3", output: "1 2 3 ", explanation: "Free" }
        ],
        testCases: [
            { input: "3\n1 2 3", expected_output: "1 2 3 ", is_public: true }
        ]
    },
    {
        id: 'exp-47',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 47: Avoid Memory Leak',
        difficulty: 'Tough',
        description: 'Problem Description\nEnsure proper memory deallocation.',
        input_format: "N\nN integers",
        output_format: "Elements",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "2\n7 8", output: "7 8 ", explanation: "No leak" }
        ],
        testCases: [
            { input: "2\n7 8", expected_output: "7 8 ", is_public: true }
        ]
    },
    {
        id: 'exp-48',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 48: Student Structure',
        difficulty: 'Medium',
        description: 'Problem Description\nDefine structure for student.',
        input_format: "Roll\nName\nMarks",
        output_format: "Roll Name Marks",
        constraints: ["-"],
        examples: [
            { input: "101\nArun\n85.5", output: "Roll Number: 101\nName: Arun\nMarks: 85.50", explanation: "Struct" }
        ],
        testCases: [
            { input: "101\nArun\n85.5", expected_output: "Roll Number: 101\nName: Arun\nMarks: 85.50", is_public: true }
        ]
    },
    {
        id: 'exp-49',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 49: Array of Structures',
        difficulty: 'Medium',
        description: 'Problem Description\nStore multiple students.',
        input_format: "N\nN Student details",
        output_format: "List",
        constraints: ["N <= 50"],
        examples: [
            { input: "2\n1 Anu 78.5\n2 Ravi 82", output: "1 Anu 78.50\n2 Ravi 82.00", explanation: "Array of struct" }
        ],
        testCases: [
            { input: "1\n1 Anu 78.5", expected_output: "1 Anu 78.50\n", is_public: true }
        ]
    },
    {
        id: 'exp-50',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 50: Pass Structure to Function',
        difficulty: 'Medium',
        description: 'Problem Description\nPass structure to function.',
        input_format: "Details",
        output_format: "Details",
        constraints: ["-"],
        examples: [
            { input: "10 Ramesh 90", output: "10 Ramesh 90.00", explanation: "Function call" }
        ],
        testCases: [
            { input: "10 Ramesh 90", expected_output: "10 Ramesh 90.00", is_public: true }
        ]
    },
    {
        id: 'exp-51',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 51: Nested Structures',
        difficulty: 'Medium',
        description: 'Problem Description\nStudent with Address structure.',
        input_format: "Details including Address",
        output_format: "Full Details",
        constraints: ["-"],
        examples: [
            { input: "12 Kiran Chennai 600001", output: "12 Kiran Chennai 600001", explanation: "Nested" }
        ],
        testCases: [
            { input: "12 Kiran Chennai 600001", expected_output: "12 Kiran Chennai 600001", is_public: true }
        ]
    },
    {
        id: 'exp-52',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 52: Union Demonstration',
        difficulty: 'Simple',
        description: 'Problem Description\nUse Union.',
        input_format: "Int",
        output_format: "Int",
        constraints: ["-"],
        examples: [
            { input: "10", output: "10", explanation: "Union" }
        ],
        testCases: [
            { input: "10", expected_output: "10", is_public: true }
        ]
    },
    {
        id: 'exp-53',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 53: Struct vs Union Size',
        difficulty: 'Tough',
        description: 'Problem Description\nCompare sizes of struct and union.',
        input_format: "",
        output_format: "Size of structure\nSize of union",
        constraints: ["-"],
        examples: [
            { input: "", output: "Size of structure: 8\nSize of union: 4", explanation: "Diff sizes" }
        ],
        testCases: [
            { input: "", expected_output: "", is_public: true }
        ]
    },
    {
        id: 'exp-54',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 54: Write Data to File',
        difficulty: 'Medium',
        description: 'Problem Description\nWrite string to file.',
        input_format: "String",
        output_format: "Data written to file successfully",
        constraints: ["-"],
        examples: [
            { input: "Welcome", output: "Data written to file successfully", explanation: "File write" }
        ],
        testCases: [
            { input: "Welcome", expected_output: "Data written to file successfully", is_public: true }
        ]
    },
    {
        id: 'exp-55',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 55: Read Data from File',
        difficulty: 'Medium',
        description: 'Problem Description\nRead content from file.',
        input_format: "-",
        output_format: "Content",
        constraints: ["File must exist"],
        examples: [
            { input: "", output: "Welcome to C programming", explanation: "File read" }
        ],
        testCases: [
            { input: "", expected_output: "Welcome to C programming", is_public: true }
        ]
    },
    {
        id: 'exp-56',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 56: Append Data to File',
        difficulty: 'Medium',
        description: 'Problem Description\nAppend string to file.',
        input_format: "String",
        output_format: "Data appended successfully",
        constraints: ["-"],
        examples: [
            { input: "Appended", output: "Data appended successfully", explanation: "Append" }
        ],
        testCases: [
            { input: "Appended", expected_output: "Data appended successfully", is_public: true }
        ]
    },
    {
        id: 'exp-57',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 57: Copy File',
        difficulty: 'Medium',
        description: 'Problem Description\nCopy source.txt to destination.txt',
        input_format: "-",
        output_format: "File copied successfully",
        constraints: ["-"],
        examples: [
            { input: "", output: "File copied successfully", explanation: "Copy" }
        ],
        testCases: [
            { input: "", expected_output: "File copied successfully", is_public: true }
        ]
    },
    {
        id: 'exp-58',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 58: Count Characters in File',
        difficulty: 'Simple',
        description: 'Problem Description\nCount number of characters in file.',
        input_format: "-",
        output_format: "Total characters: N",
        constraints: ["-"],
        examples: [
            { input: "", output: "Total characters: 10", explanation: "Count" }
        ],
        testCases: [
            { input: "", expected_output: "Total characters: ", is_public: true }
        ]
    },
    {
        id: 'exp-59',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 59: Count Words and Lines',
        difficulty: 'Tough',
        description: 'Problem Description\nCount characters, words, and lines.',
        input_format: "-",
        output_format: "Characters: C\nWords: W\nLines: L",
        constraints: ["-"],
        examples: [
            { input: "", output: "Characters: 30\nWords: 5\nLines: 2", explanation: "Stats" }
        ],
        testCases: [
            { input: "", expected_output: "Characters: ", is_public: true }
        ]
    },
    {
        id: 'exp-60',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 60: File Operations',
        difficulty: 'Medium',
        description: 'Problem Description\nCount characters, words, and lines in "data.txt".\n\nNote: If file is missing, program may output nothing or handle error.',
        input_format: "None (Reads data.txt)",
        output_format: "Characters: <c>\nWords: <w>\nLines: <l>",
        constraints: ["File existence"],
        examples: [
            { input: "", output: "", explanation: "Full stats" }
        ],
        testCases: [
            { input: "", expected_output: "", is_public: true }
        ]
    },
    {
        id: 'exp-61',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 61: Command Line Calculator',
        difficulty: 'Hard',
        description: 'Problem Description\nPerform arithmetic operations using command line arguments.',
        input_format: "Command Line Args",
        output_format: "Result or Invalid Input",
        constraints: ["Args must be valid"],
        examples: [
            { input: "", output: "Invalid Input", explanation: "No args" }
        ],
        testCases: [
            { input: "", expected_output: "Invalid Input", is_public: true }
        ]
    },
    {
        id: 'exp-62',
        type: 'c-course',
        lockMode: true,
        title: 'Experiment 62: Undefined Behavior & Arrays',
        difficulty: 'Hard',
        description: 'Problem Description\nRead N, store N integers, compute sum safely avoiding undefined behavior.',
        input_format: "N\nN integers",
        output_format: "Sum",
        constraints: ["1 <= N <= 1000"],
        examples: [
            { input: "5\n1 2 3 4 5", output: "15", explanation: "Sum" }
        ],
        testCases: [
            { input: "5\n1 2 3 4 5", expected_output: "15", is_public: true },
            { input: "1\n100", expected_output: "100", is_public: false }
        ]
    }
];
