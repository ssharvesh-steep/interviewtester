-- ============================================
-- Sample Problems for Testing
-- ============================================
-- This script seeds the database with sample coding problems

-- ============================================
-- PROBLEM 1: Two Sum
-- ============================================
INSERT INTO problems (title, slug, difficulty, description, input_format, output_format, constraints, examples, time_limit, memory_limit)
VALUES (
  'Two Sum',
  'two-sum',
  'Easy',
  'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.',
  'First line contains n (size of array)
Second line contains n space-separated integers (the array)
Third line contains the target integer',
  'Two space-separated integers representing the indices',
  ARRAY[
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Only one valid answer exists'
  ],
  '[
    {"input": "4\n2 7 11 15\n9", "output": "0 1", "explanation": "nums[0] + nums[1] = 2 + 7 = 9"},
    {"input": "3\n3 2 4\n6", "output": "1 2", "explanation": "nums[1] + nums[2] = 2 + 4 = 6"}
  ]'::jsonb,
  2000,
  256
);

-- Test cases for Two Sum
INSERT INTO test_cases (problem_id, input, expected_output, is_public, order_index)
VALUES
  (1, E'4\n2 7 11 15\n9', '0 1', true, 1),
  (1, E'3\n3 2 4\n6', '1 2', true, 2),
  (1, E'2\n3 3\n6', '0 1', false, 3),
  (1, E'5\n1 5 3 7 9\n10', '1 3', false, 4),
  (1, E'6\n-1 -2 -3 -4 -5\n-8', '2 4', false, 5);

-- Code templates for Two Sum
INSERT INTO code_templates (problem_id, language, template_code)
VALUES
  (1, 'python', E'def two_sum(nums, target):\n    # Write your code here\n    pass\n\n# Read input\nn = int(input())\nnums = list(map(int, input().split()))\ntarget = int(input())\n\n# Call function and print result\nresult = two_sum(nums, target)\nprint(result[0], result[1])'),
  (1, 'javascript', E'function twoSum(nums, target) {\n    // Write your code here\n}\n\n// Read input\nconst readline = require(\'readline\');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nconst lines = [];\nrl.on(\'line\', (line) => {\n    lines.push(line);\n    if (lines.length === 3) {\n        const n = parseInt(lines[0]);\n        const nums = lines[1].split(\' \').map(Number);\n        const target = parseInt(lines[2]);\n        const result = twoSum(nums, target);\n        console.log(result[0], result[1]);\n        rl.close();\n    }\n});'),
  (1, 'cpp', E'#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Write your code here\n}\n\nint main() {\n    int n, target;\n    cin >> n;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) {\n        cin >> nums[i];\n    }\n    cin >> target;\n    \n    vector<int> result = twoSum(nums, target);\n    cout << result[0] << " " << result[1] << endl;\n    return 0;\n}'),
  (1, 'java', E'import java.util.*;\n\npublic class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{0, 0};\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) {\n            nums[i] = sc.nextInt();\n        }\n        int target = sc.nextInt();\n        \n        int[] result = twoSum(nums, target);\n        System.out.println(result[0] + " " + result[1]);\n    }\n}');

-- ============================================
-- PROBLEM 2: Palindrome Number
-- ============================================
INSERT INTO problems (title, slug, difficulty, description, input_format, output_format, constraints, examples, time_limit, memory_limit)
VALUES (
  'Palindrome Number',
  'palindrome-number',
  'Easy',
  'Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.

An integer is a palindrome when it reads the same backward as forward.

For example, `121` is a palindrome while `123` is not.',
  'A single integer x',
  'true or false',
  ARRAY[
    '-2^31 <= x <= 2^31 - 1'
  ],
  '[
    {"input": "121", "output": "true", "explanation": "121 reads as 121 from left to right and from right to left"},
    {"input": "-121", "output": "false", "explanation": "From left to right, it reads -121. From right to left, it becomes 121-"},
    {"input": "10", "output": "false", "explanation": "Reads 01 from right to left"}
  ]'::jsonb,
  2000,
  256
);

-- Test cases for Palindrome Number
INSERT INTO test_cases (problem_id, input, expected_output, is_public, order_index)
VALUES
  (2, '121', 'true', true, 1),
  (2, '-121', 'false', true, 2),
  (2, '10', 'false', true, 3),
  (2, '0', 'true', false, 4),
  (2, '12321', 'true', false, 5),
  (2, '1000021', 'false', false, 6);

-- Code templates for Palindrome Number
INSERT INTO code_templates (problem_id, language, template_code)
VALUES
  (2, 'python', E'def is_palindrome(x):\n    # Write your code here\n    pass\n\n# Read input\nx = int(input())\n\n# Call function and print result\nresult = is_palindrome(x)\nprint(str(result).lower())'),
  (2, 'javascript', E'function isPalindrome(x) {\n    // Write your code here\n}\n\n// Read input\nconst readline = require(\'readline\');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on(\'line\', (line) => {\n    const x = parseInt(line);\n    const result = isPalindrome(x);\n    console.log(result);\n    rl.close();\n});');

-- ============================================
-- PROBLEM 3: Reverse String
-- ============================================
INSERT INTO problems (title, slug, difficulty, description, input_format, output_format, constraints, examples, time_limit, memory_limit)
VALUES (
  'Reverse String',
  'reverse-string',
  'Easy',
  'Write a function that reverses a string. The input string is given as an array of characters.

You must do this by modifying the input array in-place with O(1) extra memory.',
  'A single line containing the string to reverse',
  'The reversed string',
  ARRAY[
    '1 <= s.length <= 10^5',
    's[i] is a printable ascii character'
  ],
  '[
    {"input": "hello", "output": "olleh"},
    {"input": "Hannah", "output": "hannaH"}
  ]'::jsonb,
  2000,
  256
);

-- Test cases for Reverse String
INSERT INTO test_cases (problem_id, input, expected_output, is_public, order_index)
VALUES
  (3, 'hello', 'olleh', true, 1),
  (3, 'Hannah', 'hannaH', true, 2),
  (3, 'a', 'a', false, 3),
  (3, 'racecar', 'racecar', false, 4);

-- Code templates for Reverse String
INSERT INTO code_templates (problem_id, language, template_code)
VALUES
  (3, 'python', E'def reverse_string(s):\n    # Write your code here\n    pass\n\n# Read input\ns = input().strip()\n\n# Call function and print result\nresult = reverse_string(s)\nprint(result)'),
  (3, 'javascript', E'function reverseString(s) {\n    // Write your code here\n}\n\n// Read input\nconst readline = require(\'readline\');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on(\'line\', (line) => {\n    const result = reverseString(line.trim());\n    console.log(result);\n    rl.close();\n});');

-- ============================================
-- PROBLEM 4: FizzBuzz
-- ============================================
INSERT INTO problems (title, slug, difficulty, description, input_format, output_format, constraints, examples, time_limit, memory_limit)
VALUES (
  'FizzBuzz',
  'fizzbuzz',
  'Easy',
  'Given an integer `n`, return a string array answer (1-indexed) where:

- answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
- answer[i] == "Fizz" if i is divisible by 3.
- answer[i] == "Buzz" if i is divisible by 5.
- answer[i] == i (as a string) if none of the above conditions are true.

Print each element on a new line.',
  'A single integer n',
  'n lines, each containing the FizzBuzz result for that number',
  ARRAY[
    '1 <= n <= 10^4'
  ],
  '[
    {"input": "3", "output": "1\n2\nFizz"},
    {"input": "5", "output": "1\n2\nFizz\n4\nBuzz"},
    {"input": "15", "output": "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz"}
  ]'::jsonb,
  2000,
  256
);

-- Test cases for FizzBuzz
INSERT INTO test_cases (problem_id, input, expected_output, is_public, order_index)
VALUES
  (4, '3', E'1\n2\nFizz', true, 1),
  (4, '5', E'1\n2\nFizz\n4\nBuzz', true, 2),
  (4, '15', E'1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', false, 3);

-- Code templates for FizzBuzz
INSERT INTO code_templates (problem_id, language, template_code)
VALUES
  (4, 'python', E'def fizzbuzz(n):\n    # Write your code here\n    pass\n\n# Read input\nn = int(input())\n\n# Call function and print result\nresult = fizzbuzz(n)\nfor item in result:\n    print(item)'),
  (4, 'javascript', E'function fizzBuzz(n) {\n    // Write your code here\n}\n\n// Read input\nconst readline = require(\'readline\');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on(\'line\', (line) => {\n    const n = parseInt(line);\n    const result = fizzBuzz(n);\n    result.forEach(item => console.log(item));\n    rl.close();\n});');

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE 'Sample problems seeded successfully!';
  RAISE NOTICE 'Problems added: Two Sum, Palindrome Number, Reverse String, FizzBuzz';
  RAISE NOTICE 'Total test cases: %', (SELECT COUNT(*) FROM test_cases);
END $$;
