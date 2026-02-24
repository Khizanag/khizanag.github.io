var LIVE_CODING_EASY_MEDIUM = [
  {
    "title": "Two Sum",
    "difficulty": "easy",
    "topic": "hash-maps",
    "question": "Given an array of integers and a target sum, return indices of the two numbers that add up to the target. You may assume exactly one solution exists.\n\nExample:\nInput: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\nExplanation: nums[0] + nums[1] = 2 + 7 = 9\n\nInput: nums = [3, 2, 4], target = 6\nOutput: [1, 2]",
    "hints": [
      "A brute-force approach checks all pairs in O(n²) — can you do it in a single pass?",
      "Use a dictionary to store values you've already seen along with their indices.",
      "For each number, compute its complement (target - num) and check if that complement is already in the dictionary."
    ],
    "solution": "func twoSum(_ nums: [Int], _ target: Int) -> [Int] {\n    var seen: [Int: Int] = [:]\n    for (i, num) in nums.enumerated() {\n        let complement = target - num\n        if let j = seen[complement] {\n            return [j, i]\n        }\n        seen[num] = i\n    }\n    return []\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "explanation": "Use a hash map to store each number and its index as we iterate. For each element, check if its complement (target - current) already exists in the map. If it does, we found our pair. Single pass through the array gives O(n) time."
  },
  {
    "title": "Reverse String",
    "difficulty": "easy",
    "topic": "strings",
    "question": "Write a function that reverses an array of characters in-place. You must do this with O(1) extra memory.\n\nExample:\nInput: s = [\"h\", \"e\", \"l\", \"l\", \"o\"]\nOutput: [\"o\", \"l\", \"l\", \"e\", \"h\"]\n\nInput: s = [\"H\", \"a\", \"n\", \"n\", \"a\", \"h\"]\nOutput: [\"h\", \"a\", \"n\", \"n\", \"a\", \"H\"]",
    "hints": [
      "Think about using two pointers — one at each end of the array.",
      "Swap the characters at the left and right pointers, then move them toward each other.",
      "Continue until the two pointers meet in the middle."
    ],
    "solution": "func reverseString(_ s: inout [Character]) {\n    var left = 0\n    var right = s.count - 1\n    while left < right {\n        s.swapAt(left, right)\n        left += 1\n        right -= 1\n    }\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "explanation": "Use two pointers starting at opposite ends of the array. Swap the elements at both pointers and move them inward until they meet. This reverses the array in-place using constant extra space."
  },
  {
    "title": "Valid Palindrome",
    "difficulty": "easy",
    "topic": "strings",
    "question": "Given a string, determine if it is a palindrome considering only alphanumeric characters and ignoring case.\n\nExample:\nInput: s = \"A man, a plan, a canal: Panama\"\nOutput: true\nExplanation: \"amanaplanacanalpanama\" is a palindrome.\n\nInput: s = \"race a car\"\nOutput: false\nExplanation: \"raceacar\" is not a palindrome.",
    "hints": [
      "First think about how to filter out non-alphanumeric characters and normalize case.",
      "Use two pointers — one starting from the left, one from the right.",
      "Skip non-alphanumeric characters by advancing the appropriate pointer, then compare the characters."
    ],
    "solution": "func isPalindrome(_ s: String) -> Bool {\n    let chars = Array(s)\n    var left = 0\n    var right = chars.count - 1\n    while left < right {\n        while left < right, !chars[left].isLetter, !chars[left].isNumber {\n            left += 1\n        }\n        while left < right, !chars[right].isLetter, !chars[right].isNumber {\n            right -= 1\n        }\n        if chars[left].lowercased() != chars[right].lowercased() {\n            return false\n        }\n        left += 1\n        right -= 1\n    }\n    return true\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "explanation": "Convert the string to a character array and use two pointers. Skip non-alphanumeric characters by advancing each pointer, then compare the current characters case-insensitively. If any pair doesn't match, it's not a palindrome."
  },
  {
    "title": "Maximum Subarray",
    "difficulty": "easy",
    "topic": "arrays",
    "question": "Given an integer array, find the contiguous subarray with the largest sum and return that sum. (Kadane's Algorithm)\n\nExample:\nInput: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nOutput: 6\nExplanation: The subarray [4, -1, 2, 1] has the largest sum = 6.\n\nInput: nums = [1]\nOutput: 1\n\nInput: nums = [5, 4, -1, 7, 8]\nOutput: 23",
    "hints": [
      "Think about building the sum as you go — when should you restart the subarray?",
      "At each position, decide: is it better to extend the current subarray or start fresh from this element?",
      "Keep track of both the current running sum and the global maximum seen so far."
    ],
    "solution": "func maxSubArray(_ nums: [Int]) -> Int {\n    var currentSum = nums[0]\n    var maxSum = nums[0]\n    for i in 1..<nums.count {\n        currentSum = max(nums[i], currentSum + nums[i])\n        maxSum = max(maxSum, currentSum)\n    }\n    return maxSum\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "explanation": "Kadane's algorithm: at each position, either extend the existing subarray or start a new one from the current element — whichever is larger. Track the global maximum throughout. Single pass with O(1) space."
  },
  {
    "title": "Merge Two Sorted Arrays",
    "difficulty": "easy",
    "topic": "arrays",
    "question": "Given two sorted integer arrays, merge them into a single sorted array.\n\nExample:\nInput: nums1 = [1, 3, 5], nums2 = [2, 4, 6]\nOutput: [1, 2, 3, 4, 5, 6]\n\nInput: nums1 = [1, 2, 3], nums2 = []\nOutput: [1, 2, 3]\n\nInput: nums1 = [], nums2 = [1]\nOutput: [1]",
    "hints": [
      "Think about using three pointers: one for each input array and one for the result.",
      "Compare the current elements at each pointer and pick the smaller one to append to the result.",
      "Don't forget to append any remaining elements from either array after the main loop finishes."
    ],
    "solution": "func mergeSortedArrays(_ nums1: [Int], _ nums2: [Int]) -> [Int] {\n    var result: [Int] = []\n    var i = 0\n    var j = 0\n    while i < nums1.count, j < nums2.count {\n        if nums1[i] <= nums2[j] {\n            result.append(nums1[i])\n            i += 1\n        } else {\n            result.append(nums2[j])\n            j += 1\n        }\n    }\n    result.append(contentsOf: nums1[i...])\n    result.append(contentsOf: nums2[j...])\n    return result\n}",
    "timeComplexity": "O(n + m)",
    "spaceComplexity": "O(n + m)",
    "explanation": "Use two pointers, one per array. Compare the elements at each pointer and append the smaller one to the result, advancing that pointer. Once one array is exhausted, append all remaining elements from the other array."
  },
  {
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "easy",
    "topic": "arrays",
    "question": "Given a sorted array of integers, remove duplicates in-place so each element appears only once. Return the length of the modified array. The relative order of elements must be maintained.\n\nExample:\nInput: nums = [1, 1, 2]\nOutput: 2, nums = [1, 2, ...]\n\nInput: nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]\nOutput: 5, nums = [0, 1, 2, 3, 4, ...]",
    "hints": [
      "Since the array is sorted, duplicates are always adjacent.",
      "Use a slow pointer to track the position of the last unique element.",
      "Use a fast pointer to scan through the array — whenever it finds a new unique element, write it at the slow pointer position."
    ],
    "solution": "func removeDuplicates(_ nums: inout [Int]) -> Int {\n    guard !nums.isEmpty else { return 0 }\n    var writeIndex = 1\n    for i in 1..<nums.count {\n        if nums[i] != nums[i - 1] {\n            nums[writeIndex] = nums[i]\n            writeIndex += 1\n        }\n    }\n    return writeIndex\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "explanation": "Since the array is sorted, duplicates are adjacent. Use a write pointer starting at index 1. Scan with a read pointer — when the current element differs from the previous, write it at the write pointer position and advance it. Return the write pointer as the new length."
  },
  {
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "easy",
    "topic": "arrays",
    "question": "Given an array where prices[i] is the price of a stock on day i, find the maximum profit from a single buy-sell transaction. You must buy before you sell. Return 0 if no profit is possible.\n\nExample:\nInput: prices = [7, 1, 5, 3, 6, 4]\nOutput: 5\nExplanation: Buy on day 2 (price=1), sell on day 5 (price=6). Profit = 6 - 1 = 5.\n\nInput: prices = [7, 6, 4, 3, 1]\nOutput: 0\nExplanation: Prices only decrease, so no profit is possible.",
    "hints": [
      "You need to find the maximum difference where the smaller element comes before the larger one.",
      "Track the minimum price seen so far as you iterate through the array.",
      "At each step, compute the profit if you sold today (current price - min price so far) and update the maximum profit."
    ],
    "solution": "func maxProfit(_ prices: [Int]) -> Int {\n    var minPrice = Int.max\n    var maxProfit = 0\n    for price in prices {\n        if price < minPrice {\n            minPrice = price\n        } else if price - minPrice > maxProfit {\n            maxProfit = price - minPrice\n        }\n    }\n    return maxProfit\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "explanation": "Scan left to right, tracking the minimum price seen so far. At each step, compute the potential profit if we sell today (current - min). Update the maximum profit whenever we find a better one. Single pass, constant space."
  },
  {
    "title": "Valid Parentheses",
    "difficulty": "easy",
    "topic": "stacks-queues",
    "question": "Given a string containing only '(', ')', '{', '}', '[', ']', determine if the brackets are properly balanced.\n\nExample:\nInput: s = \"()\"\nOutput: true\n\nInput: s = \"()[]{}\"\nOutput: true\n\nInput: s = \"(]\"\nOutput: false\n\nInput: s = \"([)]\"\nOutput: false\n\nInput: s = \"{[]}\"\nOutput: true",
    "hints": [
      "Think about what happens when you encounter an opening bracket versus a closing bracket.",
      "Use a stack — push opening brackets onto it, and for closing brackets check if they match the top.",
      "At the end, the stack should be empty for a valid string."
    ],
    "solution": "func isValid(_ s: String) -> Bool {\n    var stack: [Character] = []\n    let matching: [Character: Character] = [\")\": \"(\", \"]\": \"[\", \"}\": \"{\"]\n    for char in s {\n        if \"([{\".contains(char) {\n            stack.append(char)\n        } else if let expected = matching[char] {\n            if stack.isEmpty || stack.removeLast() != expected {\n                return false\n            }\n        }\n    }\n    return stack.isEmpty\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "explanation": "Use a stack to track opening brackets. When we see an opening bracket, push it. When we see a closing bracket, check that the stack's top is the matching opener. If at any point it's not, or the stack is empty when we need a match, return false. The string is valid if the stack is empty at the end."
  },
  {
    "title": "Fizz Buzz",
    "difficulty": "easy",
    "topic": "arrays",
    "question": "Write a function that returns an array of strings for numbers 1 to n:\n- \"FizzBuzz\" for multiples of both 3 and 5\n- \"Fizz\" for multiples of 3\n- \"Buzz\" for multiples of 5\n- The number itself (as a string) otherwise\n\nBonus: Make it easily extensible for arbitrary divisor-label pairs.\n\nExample:\nInput: n = 15\nOutput: [\"1\", \"2\", \"Fizz\", \"4\", \"Buzz\", \"Fizz\", \"7\", \"8\", \"Fizz\", \"Buzz\", \"11\", \"Fizz\", \"13\", \"14\", \"FizzBuzz\"]",
    "hints": [
      "Check for the combined case (divisible by both) before checking individual cases.",
      "For the extensible version, store pairs of (divisor, label) and build the output string by concatenating matching labels.",
      "If no label was added for a number, use the number itself as the string."
    ],
    "solution": "func fizzBuzz(_ n: Int) -> [String] {\n    let rules: [(Int, String)] = [(3, \"Fizz\"), (5, \"Buzz\")]\n    return (1...n).map { num in\n        let label = rules\n            .filter { num % $0.0 == 0 }\n            .map { $0.1 }\n            .joined()\n        return label.isEmpty ? \"\\(num)\" : label\n    }\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "explanation": "Store divisor-label pairs in an array for extensibility. For each number, filter pairs where the number is divisible, join the labels. If no labels matched, use the number as a string. This approach easily extends to any number of custom rules."
  },
  {
    "title": "Linked List Cycle Detection",
    "difficulty": "easy",
    "topic": "linked-lists",
    "question": "Given the head of a linked list, determine if it contains a cycle. A cycle exists if some node's next pointer points back to a previous node.\n\nExample:\nInput: 3 -> 2 -> 0 -> -4 -> (back to node 2)\nOutput: true\n\nInput: 1 -> 2 -> (back to node 1)\nOutput: true\n\nInput: 1 -> nil\nOutput: false\n\nNote: Define ListNode as: class ListNode { var val: Int; var next: ListNode? }",
    "hints": [
      "A naive approach uses a Set to track visited nodes — what's the space trade-off?",
      "Think about Floyd's Tortoise and Hare algorithm — use two pointers at different speeds.",
      "If there's a cycle, the fast pointer will eventually catch up to the slow pointer from behind."
    ],
    "solution": "class ListNode {\n    var val: Int\n    var next: ListNode?\n    init(_ val: Int) { self.val = val }\n}\n\nfunc hasCycle(_ head: ListNode?) -> Bool {\n    var slow = head\n    var fast = head\n    while fast != nil, fast?.next != nil {\n        slow = slow?.next\n        fast = fast?.next?.next\n        if slow === fast {\n            return true\n        }\n    }\n    return false\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "explanation": "Floyd's cycle detection: use a slow pointer (moves 1 step) and a fast pointer (moves 2 steps). If a cycle exists, the fast pointer will loop around and eventually meet the slow pointer. If there's no cycle, the fast pointer reaches the end. Uses O(1) space."
  },
  {
    "title": "Implement Stack Using Queues",
    "difficulty": "easy",
    "topic": "stacks-queues",
    "question": "Implement a stack (LIFO) using only queue operations. Support push, pop, top, and empty operations.\n\nExample:\nlet stack = MyStack()\nstack.push(1)\nstack.push(2)\nstack.top()   // returns 2\nstack.pop()   // returns 2\nstack.empty() // returns false\n\nNote: Queue operations available: enqueue (append), dequeue (removeFirst), peek front, check empty.",
    "hints": [
      "Think about using two queues — one as main storage, one as a helper.",
      "On push, enqueue to the helper queue, then transfer all elements from the main queue into the helper, then swap the two queues.",
      "After this, the most recently pushed element is always at the front of the main queue, making pop and top O(1)."
    ],
    "solution": "class MyStack {\n    private var queue1: [Int] = []\n    private var queue2: [Int] = []\n\n    func push(_ x: Int) {\n        queue2.append(x)\n        while !queue1.isEmpty {\n            queue2.append(queue1.removeFirst())\n        }\n        swap(&queue1, &queue2)\n    }\n\n    func pop() -> Int {\n        return queue1.removeFirst()\n    }\n\n    func top() -> Int {\n        return queue1[0]\n    }\n\n    func empty() -> Bool {\n        return queue1.isEmpty\n    }\n}",
    "timeComplexity": "O(n) push, O(1) pop/top",
    "spaceComplexity": "O(n)",
    "explanation": "On each push, enqueue the new element into queue2, then move all elements from queue1 into queue2 (so the new element ends up at the front), then swap queues. This makes pop and top O(1) since the top of the stack is always at the front of queue1."
  },
  {
    "title": "Binary Search",
    "difficulty": "easy",
    "topic": "arrays",
    "question": "Implement binary search iteratively. Given a sorted array of integers and a target, return the index of the target. Return -1 if it doesn't exist.\n\nExample:\nInput: nums = [-1, 0, 3, 5, 9, 12], target = 9\nOutput: 4\n\nInput: nums = [-1, 0, 3, 5, 9, 12], target = 2\nOutput: -1\n\nNote: You must write an O(log n) solution.",
    "hints": [
      "Maintain a search range with left and right pointers.",
      "Compute the midpoint each iteration — be careful about integer overflow when computing mid.",
      "Narrow the search range based on whether the midpoint value is less than, greater than, or equal to the target."
    ],
    "solution": "func search(_ nums: [Int], _ target: Int) -> Int {\n    var left = 0\n    var right = nums.count - 1\n    while left <= right {\n        let mid = left + (right - left) / 2\n        if nums[mid] == target {\n            return mid\n        } else if nums[mid] < target {\n            left = mid + 1\n        } else {\n            right = mid - 1\n        }\n    }\n    return -1\n}",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "explanation": "Maintain left and right bounds of the search range. At each step, check the midpoint. If it equals the target, return the index. If the target is larger, search the right half; otherwise search the left half. Use left + (right - left) / 2 instead of (left + right) / 2 to avoid integer overflow."
  },
  {
    "title": "Three Sum",
    "difficulty": "medium",
    "topic": "arrays",
    "question": "Given an integer array, find all unique triplets that sum to zero. The solution set must not contain duplicate triplets.\n\nExample:\nInput: nums = [-1, 0, 1, 2, -1, -4]\nOutput: [[-1, -1, 2], [-1, 0, 1]]\n\nInput: nums = [0, 1, 1]\nOutput: []\n\nInput: nums = [0, 0, 0]\nOutput: [[0, 0, 0]]",
    "hints": [
      "Sorting the array first makes it much easier to avoid duplicates and use a two-pointer approach.",
      "Fix one element and reduce the problem to Two Sum on the remaining subarray using two pointers.",
      "Skip duplicate values for the fixed element and for both pointers after finding a valid triplet."
    ],
    "solution": "func threeSum(_ nums: [Int]) -> [[Int]] {\n    let sorted = nums.sorted()\n    var result: [[Int]] = []\n    for i in 0..<sorted.count - 2 {\n        if i > 0, sorted[i] == sorted[i - 1] { continue }\n        var left = i + 1\n        var right = sorted.count - 1\n        while left < right {\n            let sum = sorted[i] + sorted[left] + sorted[right]\n            if sum == 0 {\n                result.append([sorted[i], sorted[left], sorted[right]])\n                while left < right, sorted[left] == sorted[left + 1] { left += 1 }\n                while left < right, sorted[right] == sorted[right - 1] { right -= 1 }\n                left += 1\n                right -= 1\n            } else if sum < 0 {\n                left += 1\n            } else {\n                right -= 1\n            }\n        }\n    }\n    return result\n}",
    "timeComplexity": "O(n²)",
    "spaceComplexity": "O(n) for sorting",
    "explanation": "Sort the array first. For each element at index i, use two pointers (left, right) to find pairs that sum to -nums[i]. Sort enables skipping duplicates: skip i if it equals the previous element, and after finding a triplet, skip duplicate values at both pointers."
  },
  {
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "medium",
    "topic": "strings",
    "question": "Given a string, find the length of the longest substring without repeating characters.\n\nExample:\nInput: s = \"abcabcbb\"\nOutput: 3\nExplanation: \"abc\" has length 3.\n\nInput: s = \"bbbbb\"\nOutput: 1\nExplanation: \"b\" has length 1.\n\nInput: s = \"pwwkew\"\nOutput: 3\nExplanation: \"wke\" has length 3.",
    "hints": [
      "Think about a sliding window — a window representing the current substring with no repeats.",
      "Use a dictionary to store the most recent index of each character.",
      "When you encounter a duplicate character, move the left boundary of the window past the previous occurrence of that character."
    ],
    "solution": "func lengthOfLongestSubstring(_ s: String) -> Int {\n    var lastSeen: [Character: Int] = [:]\n    var maxLength = 0\n    var left = 0\n    for (right, char) in s.enumerated() {\n        if let prevIndex = lastSeen[char], prevIndex >= left {\n            left = prevIndex + 1\n        }\n        lastSeen[char] = right\n        maxLength = max(maxLength, right - left + 1)\n    }\n    return maxLength\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(min(n, m)) where m is charset size",
    "explanation": "Sliding window with a dictionary tracking the last seen index of each character. The left boundary only moves forward. When we encounter a character that's in the current window (prevIndex >= left), we jump left past it. The window size at each step is right - left + 1."
  },
  {
    "title": "Container With Most Water",
    "difficulty": "medium",
    "topic": "arrays",
    "question": "Given n non-negative integers representing vertical lines at positions 0 to n-1, find two lines that together with the x-axis form a container that holds the most water.\n\nExample:\nInput: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]\nOutput: 49\nExplanation: Lines at index 1 (height 8) and index 8 (height 7) form a container with area = min(8,7) * (8-1) = 7 * 7 = 49.\n\nInput: height = [1, 1]\nOutput: 1",
    "hints": [
      "The area is determined by the shorter of the two lines and the distance between them.",
      "Start with the widest possible container (two pointers at each end).",
      "Moving the pointer at the taller line inward can never increase area — always move the pointer at the shorter line."
    ],
    "solution": "func maxArea(_ height: [Int]) -> Int {\n    var left = 0\n    var right = height.count - 1\n    var maxWater = 0\n    while left < right {\n        let water = min(height[left], height[right]) * (right - left)\n        maxWater = max(maxWater, water)\n        if height[left] < height[right] {\n            left += 1\n        } else {\n            right -= 1\n        }\n    }\n    return maxWater\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "explanation": "Start with the widest container (left=0, right=n-1). The water held is min(height[left], height[right]) * width. Moving the taller line inward always decreases width without guaranteed height improvement — so always move the shorter line's pointer. This guarantees we never miss the optimal solution."
  },
  {
    "title": "Group Anagrams",
    "difficulty": "medium",
    "topic": "hash-maps",
    "question": "Given an array of strings, group the anagrams together. You can return the answer in any order.\n\nExample:\nInput: strs = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]\nOutput: [[\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]]\n\nInput: strs = [\"\"]\nOutput: [[\"\"]]\n\nInput: strs = [\"a\"]\nOutput: [[\"a\"]]",
    "hints": [
      "Two strings are anagrams if and only if their sorted characters are identical.",
      "Use a dictionary where the key is the sorted version of each string.",
      "Group all strings that produce the same sorted key together."
    ],
    "solution": "func groupAnagrams(_ strs: [String]) -> [[String]] {\n    var groups: [String: [String]] = [:]\n    for str in strs {\n        let key = String(str.sorted())\n        groups[key, default: []].append(str)\n    }\n    return Array(groups.values)\n}",
    "timeComplexity": "O(n * k log k) where k is max string length",
    "spaceComplexity": "O(n * k)",
    "explanation": "Two strings are anagrams iff sorting their characters yields the same string. Use this sorted string as a dictionary key. Group all strings with the same key together. Finally, return all the groups as an array of arrays."
  },
  {
    "title": "Product of Array Except Self",
    "difficulty": "medium",
    "topic": "arrays",
    "question": "Given an integer array, return an array where output[i] is the product of all elements except nums[i]. Solve without using division and in O(n) time.\n\nExample:\nInput: nums = [1, 2, 3, 4]\nOutput: [24, 12, 8, 6]\n\nInput: nums = [-1, 1, 0, -3, 3]\nOutput: [0, 0, 9, 0, 0]",
    "hints": [
      "Think about computing prefix products (all elements to the left) and suffix products (all elements to the right).",
      "output[i] = (product of all elements before i) * (product of all elements after i).",
      "You can build the prefix pass in the result array directly, then do a second pass for suffix products using a running variable — no extra array needed."
    ],
    "solution": "func productExceptSelf(_ nums: [Int]) -> [Int] {\n    let n = nums.count\n    var result = [Int](repeating: 1, count: n)\n    var prefix = 1\n    for i in 0..<n {\n        result[i] = prefix\n        prefix *= nums[i]\n    }\n    var suffix = 1\n    for i in stride(from: n - 1, through: 0, by: -1) {\n        result[i] *= suffix\n        suffix *= nums[i]\n    }\n    return result\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) extra (output array doesn't count)",
    "explanation": "First pass (left to right): fill result[i] with the product of all elements to its left. Second pass (right to left): multiply result[i] by the running product of all elements to its right. Two linear passes, no division, O(1) extra space."
  },
  {
    "title": "Spiral Matrix",
    "difficulty": "medium",
    "topic": "arrays",
    "question": "Given an m x n matrix, return all elements in spiral order (clockwise from the top-left).\n\nExample:\nInput: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [1,2,3,6,9,8,7,4,5]\n\nInput: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]\nOutput: [1,2,3,4,8,12,11,10,9,5,6,7]",
    "hints": [
      "Think about boundaries: top, bottom, left, right. After traversing each side, shrink that boundary inward.",
      "Traverse top row left-to-right, then right column top-to-bottom, then bottom row right-to-left, then left column bottom-to-top.",
      "After each direction, update the corresponding boundary and check if traversal is still valid."
    ],
    "solution": "func spiralOrder(_ matrix: [[Int]]) -> [Int] {\n    guard !matrix.isEmpty else { return [] }\n    var result: [Int] = []\n    var top = 0, bottom = matrix.count - 1\n    var left = 0, right = matrix[0].count - 1\n    while top <= bottom, left <= right {\n        for col in left...right { result.append(matrix[top][col]) }\n        top += 1\n        for row in top...bottom { result.append(matrix[row][right]) }\n        right -= 1\n        if top <= bottom {\n            for col in stride(from: right, through: left, by: -1) {\n                result.append(matrix[bottom][col])\n            }\n            bottom -= 1\n        }\n        if left <= right {\n            for row in stride(from: bottom, through: top, by: -1) {\n                result.append(matrix[row][left])\n            }\n            left += 1\n        }\n    }\n    return result\n}",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(1) extra",
    "explanation": "Use four boundary variables (top, bottom, left, right). Each iteration traverses the outermost ring: top row left-to-right, right column top-to-bottom, bottom row right-to-left, left column bottom-to-top. After each side, shrink the boundary. Guard against empty rows/columns before traversing."
  },
  {
    "title": "Rotate Image",
    "difficulty": "medium",
    "topic": "arrays",
    "question": "Given an n x n 2D matrix representing an image, rotate it 90 degrees clockwise in-place.\n\nExample:\nInput: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [[7,4,1],[8,5,2],[9,6,3]]\n\nInput: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]\nOutput: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]\n\nNote: You must rotate in-place without allocating another matrix.",
    "hints": [
      "A 90-degree clockwise rotation can be decomposed into two simpler operations.",
      "First transpose the matrix (swap matrix[i][j] with matrix[j][i]).",
      "Then reverse each row. The combination equals a 90-degree clockwise rotation."
    ],
    "solution": "func rotate(_ matrix: inout [[Int]]) {\n    let n = matrix.count\n    for i in 0..<n {\n        for j in i + 1..<n {\n            let temp = matrix[i][j]\n            matrix[i][j] = matrix[j][i]\n            matrix[j][i] = temp\n        }\n    }\n    for i in 0..<n {\n        matrix[i].reverse()\n    }\n}",
    "timeComplexity": "O(n²)",
    "spaceComplexity": "O(1)",
    "explanation": "A 90-degree clockwise rotation equals: (1) transpose the matrix (swap elements across the main diagonal), then (2) reverse each row. Both steps are in-place. Transpose: for each i < j, swap matrix[i][j] and matrix[j][i]. Then reverse each row individually."
  },
  {
    "title": "Coin Change",
    "difficulty": "medium",
    "topic": "dynamic-programming",
    "question": "Given an array of coin denominations and a total amount, return the minimum number of coins needed to make up that amount. Return -1 if it cannot be achieved.\n\nExample:\nInput: coins = [1, 5, 11], amount = 15\nOutput: 3\nExplanation: 11 + 1 + 1 + 1 = 14? No: 11 + 3*1 = 14. Actually: 5 + 5 + 5 = 15 uses 3 coins.\n\nInput: coins = [1, 5, 11], amount = 15\nOutput: 3 (5 + 5 + 5)\n\nInput: coins = [2], amount = 3\nOutput: -1\n\nInput: coins = [1], amount = 0\nOutput: 0",
    "hints": [
      "Think about building up solutions from smaller amounts — classic bottom-up DP.",
      "Define dp[i] as the minimum coins needed to make amount i. What's dp[0]? How do you compute dp[i] from previous values?",
      "For each amount from 1 to target, try every coin: if the coin value <= amount, dp[i] = min(dp[i], dp[i - coin] + 1)."
    ],
    "solution": "func coinChange(_ coins: [Int], _ amount: Int) -> Int {\n    var dp = [Int](repeating: amount + 1, count: amount + 1)\n    dp[0] = 0\n    for i in 1...amount {\n        for coin in coins where coin <= i {\n            dp[i] = min(dp[i], dp[i - coin] + 1)\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount]\n}",
    "timeComplexity": "O(amount * coins.count)",
    "spaceComplexity": "O(amount)",
    "explanation": "Bottom-up DP: dp[i] = minimum coins to make amount i. Initialize dp[0] = 0 (base case) and all others to amount+1 (infinity sentinel). For each amount i, try each coin: if coin <= i, update dp[i] = min(dp[i], dp[i-coin] + 1). If dp[amount] is still the sentinel, return -1."
  },
  {
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "medium",
    "topic": "trees",
    "question": "Given the root of a binary tree, return the level-order traversal of its nodes' values (left to right, level by level).\n\nExample:\nInput: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]\n\nInput: root = [1]\nOutput: [[1]]\n\nInput: root = []\nOutput: []\n\nNote: TreeNode has val, left, and right properties.",
    "hints": [
      "Use a queue (BFS) to process nodes level by level.",
      "At the start of each level, the queue contains exactly all nodes at that level — record the queue size before processing.",
      "Dequeue each node in the current level, add its value to the level array, and enqueue its children for the next level."
    ],
    "solution": "class TreeNode {\n    var val: Int\n    var left: TreeNode?\n    var right: TreeNode?\n    init(_ val: Int) { self.val = val }\n}\n\nfunc levelOrder(_ root: TreeNode?) -> [[Int]] {\n    guard let root else { return [] }\n    var result: [[Int]] = []\n    var queue: [TreeNode] = [root]\n    while !queue.isEmpty {\n        let levelSize = queue.count\n        var level: [Int] = []\n        for _ in 0..<levelSize {\n            let node = queue.removeFirst()\n            level.append(node.val)\n            if let left = node.left { queue.append(left) }\n            if let right = node.right { queue.append(right) }\n        }\n        result.append(level)\n    }\n    return result\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "explanation": "BFS with a queue. Before processing each level, snapshot the queue size — this tells us exactly how many nodes belong to the current level. Dequeue that many nodes, collect their values, and enqueue their children. Repeat until the queue is empty."
  },
  {
    "title": "Validate Binary Search Tree",
    "difficulty": "medium",
    "topic": "trees",
    "question": "Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST has all left subtree values strictly less than the node, all right subtree values strictly greater, and both subtrees are also valid BSTs.\n\nExample:\nInput: root = [2,1,3]\nOutput: true\n\nInput: root = [5,1,4,null,null,3,6]\nOutput: false\nExplanation: The right child 4 is not greater than the root 5.\n\nNote: TreeNode has val, left, and right properties.",
    "hints": [
      "Checking only parent-child relationships is not sufficient — consider the tree [5,4,6,null,null,3,7].",
      "Each node must satisfy constraints from all its ancestors, not just its parent.",
      "Pass down a valid range (min, max) for each subtree and verify the current node's value falls within it."
    ],
    "solution": "func isValidBST(_ root: TreeNode?) -> Bool {\n    func validate(_ node: TreeNode?, _ min: Int?, _ max: Int?) -> Bool {\n        guard let node else { return true }\n        if let min, node.val <= min { return false }\n        if let max, node.val >= max { return false }\n        return validate(node.left, min, node.val)\n            && validate(node.right, node.val, max)\n    }\n    return validate(root, nil, nil)\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h) where h is tree height",
    "explanation": "Pass valid (min, max) bounds down the recursion. For the left child, the upper bound becomes the current node's value. For the right child, the lower bound becomes the current node's value. If any node violates these bounds, the tree is not a valid BST. Start with nil bounds (no constraint) at the root."
  },
  {
    "title": "LRU Cache",
    "difficulty": "medium",
    "topic": "hash-maps",
    "question": "Design a data structure that implements an LRU (Least Recently Used) cache with a given capacity. Support get and put in O(1) average time.\n\n- get(key): Return the value if the key exists, else return -1. Mark as recently used.\n- put(key, value): Insert or update the value. If capacity is exceeded, evict the least recently used item.\n\nExample:\nlet cache = LRUCache(2)\ncache.put(1, 1)  // {1:1}\ncache.put(2, 2)  // {1:1, 2:2}\ncache.get(1)     // returns 1, {2:2, 1:1}\ncache.put(3, 3)  // evicts key 2, {1:1, 3:3}\ncache.get(2)     // returns -1 (not found)",
    "hints": [
      "You need O(1) lookup (hash map) and O(1) eviction of the oldest item (doubly linked list).",
      "Combine a dictionary (key -> node) with a doubly linked list (maintains access order). Most recently used at the tail, least recently used at the head.",
      "On get/put, move the accessed node to the tail. On eviction, remove from the head."
    ],
    "solution": "class LRUCache {\n    private class Node {\n        var key: Int\n        var val: Int\n        var prev: Node?\n        var next: Node?\n        init(_ key: Int, _ val: Int) {\n            self.key = key\n            self.val = val\n        }\n    }\n    private let capacity: Int\n    private var cache: [Int: Node] = [:]\n    private let head = Node(0, 0)\n    private let tail = Node(0, 0)\n\n    init(_ capacity: Int) {\n        self.capacity = capacity\n        head.next = tail\n        tail.prev = head\n    }\n\n    func get(_ key: Int) -> Int {\n        guard let node = cache[key] else { return -1 }\n        moveToTail(node)\n        return node.val\n    }\n\n    func put(_ key: Int, _ value: Int) {\n        if let node = cache[key] {\n            node.val = value\n            moveToTail(node)\n        } else {\n            let node = Node(key, value)\n            cache[key] = node\n            insertBefore(tail, node)\n            if cache.count > capacity {\n                let lru = head.next!\n                remove(lru)\n                cache.removeValue(forKey: lru.key)\n            }\n        }\n    }\n\n    private func remove(_ node: Node) {\n        node.prev?.next = node.next\n        node.next?.prev = node.prev\n    }\n\n    private func insertBefore(_ anchor: Node, _ node: Node) {\n        node.prev = anchor.prev\n        node.next = anchor\n        anchor.prev?.next = node\n        anchor.prev = node\n    }\n\n    private func moveToTail(_ node: Node) {\n        remove(node)\n        insertBefore(tail, node)\n    }\n}",
    "timeComplexity": "O(1) for get and put",
    "spaceComplexity": "O(capacity)",
    "explanation": "Combine a hash map (key->node for O(1) lookup) with a doubly linked list (for O(1) insertion/deletion to maintain order). Sentinel head and tail nodes simplify edge cases. Most recently used nodes sit near the tail; LRU is at head.next. On access, move the node to just before the tail. On overflow, remove head.next."
  },
  {
    "title": "Decode Ways",
    "difficulty": "medium",
    "topic": "dynamic-programming",
    "question": "A message encoded as a string of digits can be decoded using a mapping '1'->\"A\", '2'->\"B\", ..., '26'->\"Z\". Given a digit string, return the total number of ways to decode it.\n\nExample:\nInput: s = \"12\"\nOutput: 2\nExplanation: \"12\" can decode as \"AB\" (1,2) or \"L\" (12).\n\nInput: s = \"226\"\nOutput: 3\nExplanation: \"BZ\" (2,26), \"VF\" (22,6), \"BBF\" (2,2,6).\n\nInput: s = \"06\"\nOutput: 0\nExplanation: \"06\" cannot be decoded — leading zero is invalid.",
    "hints": [
      "Think bottom-up: how many ways to decode the first i characters?",
      "At each position, you can take 1 digit (if it's not '0') or 2 digits (if the two-digit number is between 10 and 26).",
      "dp[i] = dp[i-1] (if single digit is valid) + dp[i-2] (if two-digit number is valid)."
    ],
    "solution": "func numDecodings(_ s: String) -> Int {\n    let chars = Array(s)\n    let n = chars.count\n    guard n > 0, chars[0] != \"0\" else { return 0 }\n    var dp = [Int](repeating: 0, count: n + 1)\n    dp[0] = 1\n    dp[1] = 1\n    for i in 2...n {\n        let oneDigit = Int(String(chars[i - 1]))!\n        let twoDigit = Int(String(chars[i - 2...i - 1]))!\n        if oneDigit >= 1 {\n            dp[i] += dp[i - 1]\n        }\n        if twoDigit >= 10, twoDigit <= 26 {\n            dp[i] += dp[i - 2]\n        }\n    }\n    return dp[n]\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "explanation": "dp[i] = number of ways to decode the first i characters. Base cases: dp[0]=1 (empty string), dp[1]=1 if first char isn't '0'. For each position, add dp[i-1] if the single digit is valid (1-9), and add dp[i-2] if the two-digit number is valid (10-26)."
  },
  {
    "title": "Flatten Nested List Iterator",
    "difficulty": "medium",
    "topic": "stacks-queues",
    "question": "Given a nested list of integers, implement an iterator that flattens it. Each element is either an integer or a list of elements (which may also be nested).\n\nImplement: init(_ nestedList: [[Any]]), next() -> Int, hasNext() -> Bool\n\nExample:\nInput: [[1,1],2,[1,1]]\nIterator output: 1, 1, 2, 1, 1\n\nInput: [1,[4,[6]]]\nIterator output: 1, 4, 6\n\nNote: Model the nested structure using an enum or class with isInteger/getInteger/getList methods.",
    "hints": [
      "Use a stack to simulate the iteration lazily — push the list onto the stack reversed.",
      "In hasNext(), peek at the top of the stack: if it's an integer, we're ready. If it's a list, pop it and push its elements reversed.",
      "next() simply calls hasNext() to ensure the top is an integer, then pops and returns it."
    ],
    "solution": "indirect enum NestedInteger {\n    case integer(Int)\n    case list([NestedInteger])\n}\n\nclass NestedIterator {\n    private var stack: [NestedInteger]\n\n    init(_ nestedList: [NestedInteger]) {\n        stack = nestedList.reversed()\n    }\n\n    func next() -> Int {\n        _ = hasNext()\n        if case .integer(let val) = stack.removeLast() {\n            return val\n        }\n        return -1\n    }\n\n    func hasNext() -> Bool {\n        while !stack.isEmpty {\n            if case .list(let list) = stack.last {\n                stack.removeLast()\n                stack.append(contentsOf: list.reversed())\n            } else {\n                return true\n            }\n        }\n        return false\n    }\n}",
    "timeComplexity": "O(n) total across all calls",
    "spaceComplexity": "O(n)",
    "explanation": "Use a stack initialized with the input list reversed (so the first element is on top). In hasNext(), while the top of the stack is a list (not an integer), pop it and push its elements reversed. This lazily flattens the structure. next() calls hasNext() to guarantee an integer is on top, then pops and returns it."
  },
];
