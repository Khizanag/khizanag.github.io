var LIVE_CODING_HARD_EXPERT = [
  {
    "title": "Median of Two Sorted Arrays",
    "difficulty": "hard",
    "topic": "arrays",
    "question": "Given two sorted arrays nums1 and nums2, find the median of the combined sorted array. The solution must run in O(log(m+n)) time.\n\nExample 1:\nInput: nums1 = [1, 3], nums2 = [2]\nOutput: 2.0\n\nExample 2:\nInput: nums1 = [1, 2], nums2 = [3, 4]\nOutput: 2.5",
    "hints": [
      "Think binary search rather than merging the arrays.",
      "Binary search on the shorter array to find the correct partition point.",
      "The partition should split both arrays such that all left elements are <= all right elements. Use Int.min/Int.max for boundary conditions."
    ],
    "solution": "func findMedianSortedArrays(_ nums1: [Int], _ nums2: [Int]) -> Double {\n    let (a, b) = nums1.count <= nums2.count ? (nums1, nums2) : (nums2, nums1)\n    let m = a.count, n = b.count\n    var lo = 0, hi = m\n    while lo <= hi {\n        let i = (lo + hi) / 2\n        let j = (m + n + 1) / 2 - i\n        let leftA  = i == 0 ? Int.min : a[i - 1]\n        let rightA = i == m ? Int.max : a[i]\n        let leftB  = j == 0 ? Int.min : b[j - 1]\n        let rightB = j == n ? Int.max : b[j]\n        if leftA <= rightB, leftB <= rightA {\n            if (m + n) % 2 == 0 {\n                return Double(max(leftA, leftB) + min(rightA, rightB)) / 2.0\n            }\n            return Double(max(leftA, leftB))\n        } else if leftA > rightB {\n            hi = i - 1\n        } else {\n            lo = i + 1\n        }\n    }\n    return 0.0\n}",
    "timeComplexity": "O(log(min(m, n)))",
    "spaceComplexity": "O(1)",
    "explanation": "Binary search on the smaller array to find a partition point. At each step we check if the partition is valid — all left elements <= all right elements. The median is derived from the max of the left side and min of the right side."
  },
  {
    "title": "Merge K Sorted Lists",
    "difficulty": "hard",
    "topic": "linked-lists",
    "question": "Given an array of k linked-lists, each sorted in ascending order, merge all the lists into one sorted linked-list.\n\nExample:\nInput: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]\n\nConstraints: k == lists.count, 0 <= k <= 10^4, lists[i] is sorted in ascending order.",
    "hints": [
      "A naive approach merges lists one by one — think about how to reduce comparisons.",
      "Use a min-heap (priority queue) seeded with the head of each list.",
      "Always extract the minimum node from the heap, then push that node's next into the heap. Repeat until the heap is empty."
    ],
    "solution": "public class ListNode {\n    public var val: Int\n    public var next: ListNode?\n    public init(_ val: Int) { self.val = val }\n}\n\nstruct HeapNode: Comparable {\n    let val: Int\n    let node: ListNode\n    static func < (lhs: HeapNode, rhs: HeapNode) -> Bool { lhs.val < rhs.val }\n}\n\nstruct MinHeap<T: Comparable> {\n    private var data: [T] = []\n    var isEmpty: Bool { data.isEmpty }\n    mutating func insert(_ element: T) {\n        data.append(element)\n        siftUp(from: data.count - 1)\n    }\n    mutating func extractMin() -> T? {\n        guard !data.isEmpty else { return nil }\n        data.swapAt(0, data.count - 1)\n        let min = data.removeLast()\n        if !data.isEmpty { siftDown(from: 0) }\n        return min\n    }\n    private mutating func siftUp(from index: Int) {\n        var i = index\n        while i > 0 {\n            let parent = (i - 1) / 2\n            if data[i] < data[parent] { data.swapAt(i, parent); i = parent } else { break }\n        }\n    }\n    private mutating func siftDown(from index: Int) {\n        var i = index\n        let n = data.count\n        while true {\n            var smallest = i\n            let l = 2 * i + 1, r = 2 * i + 2\n            if l < n, data[l] < data[smallest] { smallest = l }\n            if r < n, data[r] < data[smallest] { smallest = r }\n            if smallest == i { break }\n            data.swapAt(i, smallest); i = smallest\n        }\n    }\n}\n\nfunc mergeKLists(_ lists: [ListNode?]) -> ListNode? {\n    var heap = MinHeap<HeapNode>()\n    for list in lists {\n        if let node = list { heap.insert(HeapNode(val: node.val, node: node)) }\n    }\n    let dummy = ListNode(0)\n    var cur: ListNode? = dummy\n    while !heap.isEmpty {\n        if let min = heap.extractMin() {\n            cur?.next = min.node\n            cur = cur?.next\n            if let next = min.node.next { heap.insert(HeapNode(val: next.val, node: next)) }\n        }\n    }\n    return dummy.next\n}",
    "timeComplexity": "O(N log k) where N is total nodes and k is number of lists",
    "spaceComplexity": "O(k) for the heap",
    "explanation": "A min-heap always gives the globally smallest unprocessed node in O(log k). We seed it with each list's head and repeatedly extract the min, appending it to the result list and pushing the extracted node's successor back into the heap."
  },
  {
    "title": "Trapping Rain Water",
    "difficulty": "hard",
    "topic": "arrays",
    "question": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\nExample 1:\nInput: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\n\nExample 2:\nInput: height = [4,2,0,3,2,5]\nOutput: 9",
    "hints": [
      "Water trapped at position i equals min(maxLeft[i], maxRight[i]) - height[i].",
      "You could precompute max-left and max-right arrays, but can you do it in O(1) space?",
      "Use two pointers. Move the pointer on the shorter side inward — water level is bounded by the shorter wall."
    ],
    "solution": "func trap(_ height: [Int]) -> Int {\n    var left = 0, right = height.count - 1\n    var leftMax = 0, rightMax = 0\n    var water = 0\n    while left < right {\n        if height[left] < height[right] {\n            if height[left] >= leftMax {\n                leftMax = height[left]\n            } else {\n                water += leftMax - height[left]\n            }\n            left += 1\n        } else {\n            if height[right] >= rightMax {\n                rightMax = height[right]\n            } else {\n                water += rightMax - height[right]\n            }\n            right -= 1\n        }\n    }\n    return water\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "explanation": "Two pointers converge from both ends. The pointer on the shorter side is the bottleneck for water height. We accumulate water when the current bar is shorter than the max seen so far on that side, then advance the pointer."
  },
  {
    "title": "Word Search",
    "difficulty": "hard",
    "topic": "arrays",
    "question": "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically adjacent). The same cell may not be used more than once.\n\nExample 1:\nInput: board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"\nOutput: true\n\nExample 2:\nInput: board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCB\"\nOutput: false",
    "hints": [
      "Try DFS/backtracking starting from every cell that matches the first character.",
      "Mark cells as visited before recursing and unmark them after — this avoids using extra space.",
      "Prune early: if the current cell doesn't match the expected character, return false immediately."
    ],
    "solution": "func exist(_ board: [[Character]], _ word: String) -> Bool {\n    var board = board\n    let rows = board.count, cols = board[0].count\n    let chars = Array(word)\n    func dfs(_ r: Int, _ c: Int, _ idx: Int) -> Bool {\n        if idx == chars.count { return true }\n        if r < 0 || r >= rows || c < 0 || c >= cols { return false }\n        if board[r][c] != chars[idx] { return false }\n        let tmp = board[r][c]\n        board[r][c] = \"#\"\n        let found = dfs(r+1,c,idx+1) || dfs(r-1,c,idx+1) ||\n                    dfs(r,c+1,idx+1) || dfs(r,c-1,idx+1)\n        board[r][c] = tmp\n        return found\n    }\n    for r in 0..<rows {\n        for c in 0..<cols {\n            if dfs(r, c, 0) { return true }\n        }\n    }\n    return false\n}",
    "timeComplexity": "O(m * n * 4^L) where L is word length",
    "spaceComplexity": "O(L) for recursion stack",
    "explanation": "For each cell matching the first character, we DFS in all four directions. We temporarily replace the current cell with a sentinel to avoid revisiting. After the recursive call, we restore the cell (backtrack)."
  },
  {
    "title": "Minimum Window Substring",
    "difficulty": "hard",
    "topic": "strings",
    "question": "Given two strings s and t, return the minimum window substring of s that contains all characters of t. If no such window exists, return \"\".\n\nExample 1:\nInput: s = \"ADOBECODEBANC\", t = \"ABC\"\nOutput: \"BANC\"\n\nExample 2:\nInput: s = \"a\", t = \"a\"\nOutput: \"a\"\n\nExample 3:\nInput: s = \"a\", t = \"aa\"\nOutput: \"\"",
    "hints": [
      "Use a sliding window with two pointers — expand the right pointer, then shrink from the left.",
      "Track character frequencies using two dictionaries: one for the requirement, one for the current window.",
      "Use a 'formed' counter to track how many unique characters in t are currently satisfied in the window."
    ],
    "solution": "func minWindow(_ s: String, _ t: String) -> String {\n    guard !t.isEmpty, s.count >= t.count else { return \"\" }\n    let sArr = Array(s), tArr = Array(t)\n    var need = [Character: Int]()\n    for c in tArr { need[c, default: 0] += 1 }\n    var window = [Character: Int]()\n    var have = 0, required = need.count\n    var left = 0\n    var best: (len: Int, l: Int, r: Int) = (Int.max, 0, 0)\n    for right in 0..<sArr.count {\n        let c = sArr[right]\n        window[c, default: 0] += 1\n        if let needed = need[c], window[c] == needed { have += 1 }\n        while have == required {\n            let len = right - left + 1\n            if len < best.len { best = (len, left, right) }\n            let lc = sArr[left]\n            window[lc]! -= 1\n            if let needed = need[lc], window[lc]! < needed { have -= 1 }\n            left += 1\n        }\n    }\n    if best.len == Int.max { return \"\" }\n    return String(sArr[best.l...best.r])\n}",
    "timeComplexity": "O(|s| + |t|)",
    "spaceComplexity": "O(|s| + |t|)",
    "explanation": "Expand the right pointer to grow the window until all characters of t are satisfied. Then shrink from the left to find the minimum valid window. The 'have' counter avoids re-scanning the entire window map each iteration."
  },
  {
    "title": "Serialize and Deserialize Binary Tree",
    "difficulty": "hard",
    "topic": "trees",
    "question": "Design an algorithm to serialize and deserialize a binary tree. Serialization is converting a tree to a string; deserialization is the reverse.\n\nExample:\nInput tree:    1\n              / \\\n             2   3\n                / \\\n               4   5\nserialize(root) = \"1,2,N,N,3,4,N,N,5,N,N\"\ndeserialize(above) = original tree\n\nNote: The format is flexible as long as serialize(deserialize(data)) recreates the original tree.",
    "hints": [
      "Use pre-order traversal (root, left, right) for both serialization and deserialization.",
      "Represent null nodes with a sentinel like 'N' so you can reconstruct the exact structure.",
      "For deserialization, use an index pointer (or iterator) that advances as you consume tokens from the string."
    ],
    "solution": "public class TreeNode {\n    public var val: Int\n    public var left: TreeNode?\n    public var right: TreeNode?\n    public init(_ val: Int) { self.val = val }\n}\n\nclass Codec {\n    func serialize(_ root: TreeNode?) -> String {\n        var parts = [String]()\n        func preorder(_ node: TreeNode?) {\n            guard let node = node else { parts.append(\"N\"); return }\n            parts.append(\"\\(node.val)\")\n            preorder(node.left)\n            preorder(node.right)\n        }\n        preorder(root)\n        return parts.joined(separator: \",\")\n    }\n\n    func deserialize(_ data: String) -> TreeNode? {\n        var tokens = data.split(separator: \",\").map(String.init)\n        var index = 0\n        func build() -> TreeNode? {\n            guard index < tokens.count else { return nil }\n            let token = tokens[index]\n            index += 1\n            if token == \"N\" { return nil }\n            let node = TreeNode(Int(token)!)\n            node.left = build()\n            node.right = build()\n            return node\n        }\n        return build()\n    }\n}",
    "timeComplexity": "O(n) for both serialize and deserialize",
    "spaceComplexity": "O(n)",
    "explanation": "Pre-order traversal naturally encodes the structure because the root comes first. Null markers allow exact reconstruction. During deserialization, we advance a shared index through the token array recursively."
  },
  {
    "title": "Longest Increasing Subsequence",
    "difficulty": "hard",
    "topic": "dynamic-programming",
    "question": "Given an integer array nums, return the length of the longest strictly increasing subsequence.\n\nExample 1:\nInput: nums = [10,9,2,5,3,7,101,18]\nOutput: 4  (subsequence: [2,3,7,101])\n\nExample 2:\nInput: nums = [0,1,0,3,2,3]\nOutput: 4\n\nConstraint: Solve in O(n log n) time.",
    "hints": [
      "The O(n^2) DP solution builds a dp array where dp[i] is the LIS ending at index i — can you do better?",
      "Maintain a 'tails' array where tails[i] is the smallest tail element for all increasing subsequences of length i+1.",
      "Binary search to find where to place each new element in the tails array — this gives O(n log n)."
    ],
    "solution": "func lengthOfLIS(_ nums: [Int]) -> Int {\n    var tails = [Int]()\n    for num in nums {\n        var lo = 0, hi = tails.count\n        while lo < hi {\n            let mid = (lo + hi) / 2\n            if tails[mid] < num { lo = mid + 1 } else { hi = mid }\n        }\n        if lo == tails.count {\n            tails.append(num)\n        } else {\n            tails[lo] = num\n        }\n    }\n    return tails.count\n}",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n)",
    "explanation": "The 'tails' array maintains the smallest possible tail for each subsequence length seen so far. For each new number we binary search for the leftmost tail >= num and replace it. If no such tail exists, we extend tails. The final length of tails is the answer."
  },
  {
    "title": "Course Schedule",
    "difficulty": "hard",
    "topic": "graphs",
    "question": "There are numCourses courses labeled 0 to numCourses-1. You are given an array prerequisites where prerequisites[i] = [a, b] means you must take course b before course a. Return true if you can finish all courses.\n\nExample 1:\nInput: numCourses = 2, prerequisites = [[1,0]]\nOutput: true\n\nExample 2:\nInput: numCourses = 2, prerequisites = [[1,0],[0,1]]\nOutput: false  (cycle detected)",
    "hints": [
      "This is a cycle detection problem in a directed graph.",
      "Try DFS with three states: unvisited, in-progress (currently on the call stack), visited.",
      "Alternatively, use Kahn's algorithm (BFS topological sort) — if you can process all nodes, there's no cycle."
    ],
    "solution": "func canFinish(_ numCourses: Int, _ prerequisites: [[Int]]) -> Bool {\n    var graph = [[Int]](repeating: [], count: numCourses)\n    for pre in prerequisites { graph[pre[1]].append(pre[0]) }\n    var state = [Int](repeating: 0, count: numCourses) // 0=unvisited,1=visiting,2=done\n    func hasCycle(_ node: Int) -> Bool {\n        if state[node] == 1 { return true }\n        if state[node] == 2 { return false }\n        state[node] = 1\n        for neighbor in graph[node] {\n            if hasCycle(neighbor) { return true }\n        }\n        state[node] = 2\n        return false\n    }\n    for i in 0..<numCourses {\n        if hasCycle(i) { return false }\n    }\n    return true\n}",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V + E)",
    "explanation": "We model courses as a directed graph. A cycle means it's impossible to complete all courses. DFS with three-color marking (unvisited/in-progress/done) detects back edges, which indicate cycles."
  },
  {
    "title": "Word Ladder",
    "difficulty": "hard",
    "topic": "graphs",
    "question": "Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists. Each step changes exactly one letter and every intermediate word must be in wordList.\n\nExample 1:\nInput: beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]\nOutput: 5  ([\"hit\",\"hot\",\"dot\",\"dog\",\"cog\"])\n\nExample 2:\nInput: beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]\nOutput: 0",
    "hints": [
      "Model each word as a graph node; edges connect words that differ by exactly one letter.",
      "BFS finds the shortest path — but building the full graph is expensive. Can you generate neighbors on the fly?",
      "For each word position, try replacing the character with every letter a-z and check if the result is in the dictionary set."
    ],
    "solution": "func ladderLength(_ beginWord: String, _ endWord: String, _ wordList: [String]) -> Int {\n    var wordSet = Set(wordList)\n    guard wordSet.contains(endWord) else { return 0 }\n    var queue = [(beginWord, 1)]\n    var visited = Set([beginWord])\n    let alphabet = Array(\"abcdefghijklmnopqrstuvwxyz\")\n    while !queue.isEmpty {\n        let (word, steps) = queue.removeFirst()\n        var chars = Array(word)\n        for i in 0..<chars.count {\n            let original = chars[i]\n            for letter in alphabet {\n                chars[i] = letter\n                let next = String(chars)\n                if next == endWord { return steps + 1 }\n                if wordSet.contains(next), !visited.contains(next) {\n                    visited.insert(next)\n                    queue.append((next, steps + 1))\n                }\n            }\n            chars[i] = original\n        }\n    }\n    return 0\n}",
    "timeComplexity": "O(M^2 * N) where M is word length and N is dictionary size",
    "spaceComplexity": "O(M * N)",
    "explanation": "BFS guarantees the shortest path. Instead of building an explicit adjacency list, we generate each neighbor by substituting one character at a time and checking dictionary membership. Visited set prevents revisiting nodes."
  },
  {
    "title": "Sliding Window Maximum",
    "difficulty": "hard",
    "topic": "stacks-queues",
    "question": "Given an array of integers nums and a sliding window of size k, return the maximum value in each window as the window slides from left to right.\n\nExample:\nInput: nums = [1,3,-1,-3,5,3,6,7], k = 3\nOutput: [3,3,5,5,6,7]\n\nExplanation:\nWindow [1,3,-1] -> max 3\nWindow [3,-1,-3] -> max 3\nWindow [-1,-3,5] -> max 5\nWindow [-3,5,3]  -> max 5\nWindow [5,3,6]   -> max 6\nWindow [3,6,7]   -> max 7",
    "hints": [
      "A brute force O(nk) approach scans each window. Think about how to reuse information across windows.",
      "Use a monotonic deque — a double-ended queue that keeps indices in decreasing order of their values.",
      "Before adding a new element, remove indices from the back that have smaller values. Remove from the front any index that has left the window."
    ],
    "solution": "func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {\n    var deque = [Int]() // stores indices\n    var result = [Int]()\n    for i in 0..<nums.count {\n        // Remove indices out of window\n        if !deque.isEmpty, deque.first! <= i - k { deque.removeFirst() }\n        // Remove smaller elements from back\n        while !deque.isEmpty, nums[deque.last!] < nums[i] { deque.removeLast() }\n        deque.append(i)\n        if i >= k - 1 { result.append(nums[deque.first!]) }\n    }\n    return result\n}",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(k)",
    "explanation": "The monotonic deque stores indices in decreasing order of values. The front always holds the index of the current window's maximum. We evict stale indices from the front and smaller candidates from the back as we slide the window."
  },
  {
    "title": "Clone Graph",
    "difficulty": "hard",
    "topic": "graphs",
    "question": "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node contains a value (Int) and a list of its neighbors.\n\nExample:\nInput: adjList = [[2,4],[1,3],[2,4],[1,3]]\nOutput: [[2,4],[1,3],[2,4],[1,3]]  (a new graph with the same structure)\n\nNote: The graph may contain cycles.",
    "hints": [
      "Use a hash map to track already-cloned nodes and avoid infinite loops from cycles.",
      "DFS or BFS both work — when you visit a node, create its clone immediately and store it in the map.",
      "Before recursing into a neighbor, check if its clone already exists in the map."
    ],
    "solution": "public class Node {\n    public var val: Int\n    public var neighbors: [Node?]\n    public init(_ val: Int) { self.val = val; self.neighbors = [] }\n}\n\nfunc cloneGraph(_ node: Node?) -> Node? {\n    guard let node = node else { return nil }\n    var visited = [Int: Node]()\n    func dfs(_ n: Node) -> Node {\n        if let clone = visited[n.val] { return clone }\n        let clone = Node(n.val)\n        visited[n.val] = clone\n        for neighbor in n.neighbors {\n            if let neighbor = neighbor { clone.neighbors.append(dfs(neighbor)) }\n        }\n        return clone\n    }\n    return dfs(node)\n}",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V)",
    "explanation": "DFS with memoization: we immediately store the clone in the visited map before recursing into neighbors. This breaks cycles — when we encounter an already-visited node, we return the existing clone instead of creating another."
  },
  {
    "title": "Design Twitter Feed",
    "difficulty": "hard",
    "topic": "stacks-queues",
    "question": "Design a simplified version of Twitter. Implement the following:\n- postTweet(userId, tweetId): Post a tweet.\n- getNewsFeed(userId): Get the 10 most recent tweet IDs from the user and users they follow.\n- follow(followerId, followeeId): The follower follows the followee.\n- unfollow(followerId, followeeId): The follower unfollows the followee.\n\nExample:\npostTweet(1, 5)\ngetNewsFeed(1) -> [5]\nfollow(1, 2)\npostTweet(2, 6)\ngetNewsFeed(1) -> [6, 5]",
    "hints": [
      "Store tweets with a global timestamp so you can compare recency across users.",
      "getNewsFeed requires merging the most recent tweets from multiple users — a max-heap helps.",
      "For each user in the feed (self + followees), push their most recent tweet onto the heap, then pop 10 times."
    ],
    "solution": "class Twitter {\n    private var timestamp = 0\n    private var tweets = [Int: [(time: Int, id: Int)]]()  // userId -> tweets\n    private var following = [Int: Set<Int>]()             // userId -> followees\n\n    func postTweet(_ userId: Int, _ tweetId: Int) {\n        timestamp += 1\n        tweets[userId, default: []].append((time: timestamp, id: tweetId))\n    }\n\n    func getNewsFeed(_ userId: Int) -> [Int] {\n        var sources = [Int: Int]() // userId -> current index in their tweet list\n        var candidates = [(time: Int, userId: Int, index: Int)]()\n        var users = following[userId] ?? []\n        users.insert(userId)\n        for uid in users {\n            let list = tweets[uid] ?? []\n            if !list.isEmpty {\n                let idx = list.count - 1\n                candidates.append((time: list[idx].time, userId: uid, index: idx))\n                _ = sources  // silence unused warning\n            }\n        }\n        // Max-heap simulation via sort for simplicity (for true O(n log k) use a heap)\n        var result = [Int]()\n        while result.count < 10, !candidates.isEmpty {\n            candidates.sort { $0.time > $1.time }\n            let top = candidates.removeFirst()\n            result.append(tweets[top.userId]![top.index].id)\n            let nextIdx = top.index - 1\n            if nextIdx >= 0 {\n                let uid = top.userId\n                candidates.append((time: tweets[uid]![nextIdx].time, userId: uid, index: nextIdx))\n            }\n        }\n        return result\n    }\n\n    func follow(_ followerId: Int, _ followeeId: Int) {\n        following[followerId, default: []].insert(followeeId)\n    }\n\n    func unfollow(_ followerId: Int, _ followeeId: Int) {\n        following[followerId]?.remove(followeeId)\n    }\n}",
    "timeComplexity": "postTweet O(1), follow/unfollow O(1), getNewsFeed O(k log k) where k is number of followees",
    "spaceComplexity": "O(users + tweets)",
    "explanation": "Tweets are stored per user with a global timestamp. getNewsFeed collects the latest tweet pointer for each relevant user and simulates a merge using a max-heap (here simplified to a sort). Real production would use an actual priority queue."
  },
  {
    "title": "Implement Trie (Prefix Tree)",
    "difficulty": "hard",
    "topic": "strings",
    "question": "Implement a Trie with insert, search, and startsWith operations.\n- insert(word): Insert a word into the trie.\n- search(word): Return true if the word is in the trie.\n- startsWith(prefix): Return true if any word in the trie starts with the given prefix.\n\nExample:\nlet trie = Trie()\ntrie.insert(\"apple\")\ntrie.search(\"apple\")    -> true\ntrie.search(\"app\")      -> false\ntrie.startsWith(\"app\")  -> true\ntrie.insert(\"app\")\ntrie.search(\"app\")      -> true",
    "hints": [
      "Each node stores up to 26 child pointers (one per letter) and an isEnd flag.",
      "For insert, traverse (creating nodes as needed) and mark the last node as a word end.",
      "search checks isEnd at the terminal node; startsWith just checks reachability."
    ],
    "solution": "class TrieNode {\n    var children = [Character: TrieNode]()\n    var isEnd = false\n}\n\nclass Trie {\n    private let root = TrieNode()\n\n    func insert(_ word: String) {\n        var node = root\n        for ch in word {\n            if node.children[ch] == nil { node.children[ch] = TrieNode() }\n            node = node.children[ch]!\n        }\n        node.isEnd = true\n    }\n\n    func search(_ word: String) -> Bool {\n        var node = root\n        for ch in word {\n            guard let next = node.children[ch] else { return false }\n            node = next\n        }\n        return node.isEnd\n    }\n\n    func startsWith(_ prefix: String) -> Bool {\n        var node = root\n        for ch in prefix {\n            guard let next = node.children[ch] else { return false }\n            node = next\n        }\n        return true\n    }\n}",
    "timeComplexity": "O(L) per operation where L is word/prefix length",
    "spaceComplexity": "O(ALPHABET_SIZE * N * L) for storage",
    "explanation": "Each TrieNode holds a dictionary of children and an end-of-word flag. All three operations traverse characters one by one. insert creates missing nodes; search requires the path to exist and the final node to be marked; startsWith only requires path existence."
  },
  {
    "title": "Regular Expression Matching",
    "difficulty": "expert",
    "topic": "dynamic-programming",
    "question": "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.\n- '.' matches any single character.\n- '*' matches zero or more of the preceding element.\nThe match must cover the entire string.\n\nExample 1:\nInput: s = \"aa\", p = \"a*\"\nOutput: true\n\nExample 2:\nInput: s = \"ab\", p = \".*\"\nOutput: true\n\nExample 3:\nInput: s = \"aab\", p = \"c*a*b\"\nOutput: true",
    "hints": [
      "Define dp[i][j] as whether s[0..<i] matches p[0..<j].",
      "If p[j-1] is '*', two cases: use zero occurrences of the preceding char (dp[i][j-2]), or use one more occurrence if the preceding char matches s[i-1].",
      "If p[j-1] is '.' or matches s[i-1], then dp[i][j] = dp[i-1][j-1]."
    ],
    "solution": "func isMatch(_ s: String, _ p: String) -> Bool {\n    let s = Array(s), p = Array(p)\n    let m = s.count, n = p.count\n    var dp = [[Bool]](repeating: [Bool](repeating: false, count: n + 1), count: m + 1)\n    dp[0][0] = true\n    for j in 1...n {\n        if p[j-1] == \"*\", j >= 2 { dp[0][j] = dp[0][j-2] }\n    }\n    for i in 1...m {\n        for j in 1...n {\n            if p[j-1] == \"*\" {\n                dp[i][j] = (j >= 2) && dp[i][j-2] // zero occurrences\n                if j >= 2, p[j-2] == \".\" || p[j-2] == s[i-1] {\n                    dp[i][j] = dp[i][j] || dp[i-1][j] // one more occurrence\n                }\n            } else if p[j-1] == \".\" || p[j-1] == s[i-1] {\n                dp[i][j] = dp[i-1][j-1]\n            }\n        }\n    }\n    return dp[m][n]\n}",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "explanation": "2D DP where dp[i][j] represents whether the first i characters of s match the first j characters of p. The '*' case has two sub-cases: treat it as zero occurrences (skip x*) or extend the match by one more character if the preceding pattern element matches."
  },
  {
    "title": "Alien Dictionary",
    "difficulty": "expert",
    "topic": "graphs",
    "question": "Given a sorted list of words from an alien language, determine the order of characters in that language. If the order is invalid (cycle exists), return \"\".\n\nExample 1:\nInput: words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]\nOutput: \"wertf\"\n\nExample 2:\nInput: words = [\"z\",\"x\"]\nOutput: \"zx\"\n\nExample 3:\nInput: words = [\"z\",\"x\",\"z\"]\nOutput: \"\"  (cycle: z > x > z)",
    "hints": [
      "Compare adjacent words to extract ordering constraints between characters.",
      "The first differing character between consecutive words gives you a directed edge: earlier word's char -> later word's char.",
      "Build a directed graph from these edges, then topological sort. A cycle means no valid ordering exists."
    ],
    "solution": "func alienOrder(_ words: [String]) -> String {\n    var adj = [Character: Set<Character>]()\n    var inDegree = [Character: Int]()\n    for word in words {\n        for ch in word {\n            if adj[ch] == nil { adj[ch] = []; inDegree[ch] = 0 }\n        }\n    }\n    for i in 0..<words.count - 1 {\n        let w1 = Array(words[i]), w2 = Array(words[i+1])\n        let minLen = min(w1.count, w2.count)\n        if w1.count > w2.count, w1.prefix(minLen) == w2.prefix(minLen) { return \"\" }\n        for j in 0..<minLen {\n            if w1[j] != w2[j] {\n                if !adj[w1[j]]!.contains(w2[j]) {\n                    adj[w1[j]]!.insert(w2[j])\n                    inDegree[w2[j]]! += 1\n                }\n                break\n            }\n        }\n    }\n    var queue = inDegree.filter { $0.value == 0 }.map { $0.key }.sorted()\n    var result = \"\"\n    while !queue.isEmpty {\n        let ch = queue.removeFirst()\n        result.append(ch)\n        for neighbor in adj[ch]!.sorted() {\n            inDegree[neighbor]! -= 1\n            if inDegree[neighbor]! == 0 { queue.append(neighbor) }\n        }\n    }\n    return result.count == adj.count ? result : \"\"\n}",
    "timeComplexity": "O(C) where C is total characters across all words",
    "spaceComplexity": "O(1) — at most 26 unique characters",
    "explanation": "Compare adjacent words to derive character ordering edges. Build a directed graph and run Kahn's topological sort (BFS with in-degree tracking). If we can process all unique characters, we have a valid ordering; otherwise a cycle exists."
  },
  {
    "title": "Maximal Rectangle",
    "difficulty": "expert",
    "topic": "stacks-queues",
    "question": "Given a binary matrix filled with '0' and '1', find the largest rectangle containing only '1's and return its area.\n\nExample:\nInput:\nmatrix = [\n  [\"1\",\"0\",\"1\",\"0\",\"0\"],\n  [\"1\",\"0\",\"1\",\"1\",\"1\"],\n  [\"1\",\"1\",\"1\",\"1\",\"1\"],\n  [\"1\",\"0\",\"0\",\"1\",\"0\"]\n]\nOutput: 6",
    "hints": [
      "Build a heights array row by row — heights[j] is the number of consecutive '1's above (and including) row i at column j.",
      "Each row's heights array becomes a 'largest rectangle in histogram' problem.",
      "Use a monotonic stack for the histogram problem: maintain an increasing stack of indices."
    ],
    "solution": "func maximalRectangle(_ matrix: [[Character]]) -> Int {\n    guard !matrix.isEmpty else { return 0 }\n    let rows = matrix.count, cols = matrix[0].count\n    var heights = [Int](repeating: 0, count: cols)\n    var maxArea = 0\n    func largestInHistogram(_ h: [Int]) -> Int {\n        var stack = [Int](), area = 0\n        for i in 0...h.count {\n            let cur = i == h.count ? 0 : h[i]\n            while !stack.isEmpty, h[stack.last!] > cur {\n                let height = h[stack.removeLast()]\n                let width = stack.isEmpty ? i : i - stack.last! - 1\n                area = max(area, height * width)\n            }\n            stack.append(i)\n        }\n        return area\n    }\n    for r in 0..<rows {\n        for c in 0..<cols {\n            heights[c] = matrix[r][c] == \"1\" ? heights[c] + 1 : 0\n        }\n        maxArea = max(maxArea, largestInHistogram(heights))\n    }\n    return maxArea\n}",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(n)",
    "explanation": "We extend the classic 'largest rectangle in histogram' to 2D. For each row, we compute cumulative heights. The monotonic stack tracks histogram bars: when we see a shorter bar, we pop and compute the area that the popped bar could have maximally spanned."
  },
  {
    "title": "Edit Distance",
    "difficulty": "expert",
    "topic": "dynamic-programming",
    "question": "Given two strings word1 and word2, return the minimum number of operations required to convert word1 into word2. Allowed operations: insert a character, delete a character, replace a character.\n\nExample 1:\nInput: word1 = \"horse\", word2 = \"ros\"\nOutput: 3  (horse -> rorse -> rose -> ros)\n\nExample 2:\nInput: word1 = \"intention\", word2 = \"execution\"\nOutput: 5",
    "hints": [
      "Define dp[i][j] as the minimum edit distance between word1[0..<i] and word2[0..<j].",
      "If word1[i-1] == word2[j-1], no operation needed: dp[i][j] = dp[i-1][j-1].",
      "Otherwise take the minimum of insert (dp[i][j-1]+1), delete (dp[i-1][j]+1), replace (dp[i-1][j-1]+1)."
    ],
    "solution": "func minDistance(_ word1: String, _ word2: String) -> Int {\n    let a = Array(word1), b = Array(word2)\n    let m = a.count, n = b.count\n    var dp = [[Int]](repeating: [Int](repeating: 0, count: n + 1), count: m + 1)\n    for i in 0...m { dp[i][0] = i }\n    for j in 0...n { dp[0][j] = j }\n    for i in 1...m {\n        for j in 1...n {\n            if a[i-1] == b[j-1] {\n                dp[i][j] = dp[i-1][j-1]\n            } else {\n                dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])\n            }\n        }\n    }\n    return dp[m][n]\n}",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n), reducible to O(min(m, n))",
    "explanation": "Classic DP. Base cases: transforming empty string to/from another requires insertions equal to the other string's length. For matching characters, we inherit the previous diagonal. For mismatches, we pick the cheapest among insert, delete, or replace."
  },
  {
    "title": "Burst Balloons",
    "difficulty": "expert",
    "topic": "dynamic-programming",
    "question": "You are given n balloons indexed from 0 to n-1. Each balloon is painted with a number on it. Bursting balloon i earns coins[i-1] * coins[i] * coins[i+1]. Burst all balloons to maximize coins. Treat out-of-bounds as 1.\n\nExample 1:\nInput: nums = [3,1,5,8]\nOutput: 167  (burst 1: 3*1*5=15, burst 5: 3*5*8=120, burst 3: 1*3*8=24, burst 8: 1*8*1=8)\n\nExample 2:\nInput: nums = [1,5]\nOutput: 10",
    "hints": [
      "Thinking about which balloon to burst first leads to complex dependencies. Instead, think about which balloon to burst LAST in a range.",
      "Define dp[left][right] = max coins obtainable by bursting all balloons in the open interval (left, right).",
      "For each k in (left, right), assume k is the last balloon burst: coins += nums[left]*nums[k]*nums[right] + dp[left][k] + dp[k][right]."
    ],
    "solution": "func maxCoins(_ nums: [Int]) -> Int {\n    var balloons = [1] + nums + [1]\n    let n = balloons.count\n    var dp = [[Int]](repeating: [Int](repeating: 0, count: n), count: n)\n    for length in 2..<n {\n        for left in 0..<n - length {\n            let right = left + length\n            for k in left+1..<right {\n                let coins = balloons[left] * balloons[k] * balloons[right]\n                dp[left][right] = max(dp[left][right], coins + dp[left][k] + dp[k][right])\n            }\n        }\n    }\n    return dp[0][n-1]\n}",
    "timeComplexity": "O(n^3)",
    "spaceComplexity": "O(n^2)",
    "explanation": "We reverse the thinking: instead of which to burst first, we decide which to burst last within a range. Padding with sentinel 1s handles boundaries. The interval DP computes optimal coins for increasing window sizes, building up to the full array."
  },
  {
    "title": "Shortest Path in Weighted Graph (Dijkstra)",
    "difficulty": "expert",
    "topic": "graphs",
    "question": "Given a directed weighted graph with n nodes (1 to n), an edge list, and a source node, return the shortest distance from the source to all other nodes. Return -1 for unreachable nodes.\n\nExample:\nInput: n = 5, edges = [[1,2,2],[1,3,4],[2,3,1],[3,5,3],[2,4,7]], source = 1\nOutput: [0, 2, 3, 9, 6]  (distances from node 1 to nodes 1-5)",
    "hints": [
      "Dijkstra's algorithm uses a min-heap (priority queue) to always process the closest unvisited node next.",
      "Initialize distances to infinity, set source distance to 0, and push (0, source) onto the heap.",
      "For each popped node, relax all outgoing edges: if dist[u] + weight < dist[v], update and push to heap."
    ],
    "solution": "func dijkstra(_ n: Int, _ edges: [[Int]], _ source: Int) -> [Int] {\n    var graph = [[( to: Int, weight: Int)]](repeating: [], count: n + 1)\n    for edge in edges { graph[edge[0]].append((to: edge[1], weight: edge[2])) }\n    var dist = [Int](repeating: Int.max, count: n + 1)\n    dist[source] = 0\n    // Min-heap: (distance, node)\n    var heap = [(dist: Int, node: Int)]()\n    heap.append((0, source))\n    while !heap.isEmpty {\n        heap.sort { $0.dist < $1.dist } // Use a proper heap in production\n        let (d, u) = heap.removeFirst()\n        if d > dist[u] { continue }\n        for (v, w) in graph[u] {\n            let newDist = dist[u] + w\n            if newDist < dist[v] {\n                dist[v] = newDist\n                heap.append((newDist, v))\n            }\n        }\n    }\n    return (1...n).map { dist[$0] == Int.max ? -1 : dist[$0] }\n}",
    "timeComplexity": "O((V + E) log V) with a proper priority queue",
    "spaceComplexity": "O(V + E)",
    "explanation": "Dijkstra's greedy algorithm processes nodes in order of current known distance. The min-heap ensures we always extend the shortest known path. Once a node is popped with its final distance, we relax its neighbors. Stale entries in the heap are skipped with the d > dist[u] check."
  },
  {
    "title": "Count of Smaller Numbers After Self",
    "difficulty": "expert",
    "topic": "sorting",
    "question": "Given an integer array nums, return an array counts where counts[i] is the number of smaller elements to the right of nums[i].\n\nExample 1:\nInput: nums = [5,2,6,1]\nOutput: [2,1,1,0]\n\nExample 2:\nInput: nums = [-1,-1]\nOutput: [1,0]",
    "hints": [
      "A brute force O(n^2) approach works but is too slow. Think about how merge sort naturally counts inversions.",
      "During the merge step, when a right-side element is placed before left-side elements, those left-side elements are all greater than this right-side element.",
      "Carry original indices through the sort so you can update the correct count for each element."
    ],
    "solution": "func countSmaller(_ nums: [Int]) -> [Int] {\n    var result = [Int](repeating: 0, count: nums.count)\n    var indexed = nums.enumerated().map { ($0.offset, $0.element) }\n    func mergeSort(_ arr: inout [(Int, Int)]) {\n        guard arr.count > 1 else { return }\n        let mid = arr.count / 2\n        var left = Array(arr[0..<mid])\n        var right = Array(arr[mid...])\n        mergeSort(&left)\n        mergeSort(&right)\n        var i = 0, j = 0, k = 0\n        var rightCount = 0\n        while i < left.count, j < right.count {\n            if left[i].1 > right[j].1 {\n                rightCount += 1\n                arr[k] = right[j]\n                j += 1\n            } else {\n                result[left[i].0] += rightCount\n                arr[k] = left[i]\n                i += 1\n            }\n            k += 1\n        }\n        while i < left.count {\n            result[left[i].0] += rightCount\n            arr[k] = left[i]\n            i += 1; k += 1\n        }\n        while j < right.count { arr[k] = right[j]; j += 1; k += 1 }\n    }\n    mergeSort(&indexed)\n    return result\n}",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n)",
    "explanation": "During merge sort, when we prefer an element from the right half over the left half, all remaining left-half elements are greater than this right element. We track 'rightCount' (how many right elements were placed ahead) and add it to each left element's count as we place it."
  },
  {
    "title": "LFU Cache",
    "difficulty": "expert",
    "topic": "hash-maps",
    "question": "Design and implement a Least Frequently Used (LFU) cache with O(1) time for get and put operations.\n- get(key): Return the value if present, else -1. Increment frequency.\n- put(key, value): Insert or update. If at capacity, evict the LFU item (LRU among ties).\n\nExample:\nlet cache = LFUCache(2)\ncache.put(1, 1)\ncache.put(2, 2)\ncache.get(1)    -> 1\ncache.put(3, 3) // evicts key 2\ncache.get(2)    -> -1\ncache.get(3)    -> 3",
    "hints": [
      "You need three data structures: a key->value map, a key->frequency map, and a frequency->ordered-keys map.",
      "Track the minimum frequency globally. On put when at capacity, evict the least recently used key at minFreq.",
      "Use a LinkedHashSet (or ordered dictionary) for each frequency bucket to maintain LRU ordering within equal frequencies."
    ],
    "solution": "class LFUCache {\n    private let capacity: Int\n    private var minFreq = 0\n    private var keyToVal = [Int: Int]()\n    private var keyToFreq = [Int: Int]()\n    private var freqToKeys = [Int: [Int]]()\n    private var freqToKeySet = [Int: Set<Int>]()\n    // Using array as ordered set simulation\n    private var freqToOrderedKeys = [Int: NSMutableOrderedSet]()\n\n    init(_ capacity: Int) { self.capacity = capacity }\n\n    func get(_ key: Int) -> Int {\n        guard let val = keyToVal[key] else { return -1 }\n        updateFreq(key)\n        return val\n    }\n\n    func put(_ key: Int, _ value: Int) {\n        guard capacity > 0 else { return }\n        if keyToVal[key] != nil {\n            keyToVal[key] = value\n            updateFreq(key)\n            return\n        }\n        if keyToVal.count == capacity {\n            evict()\n        }\n        keyToVal[key] = value\n        keyToFreq[key] = 1\n        freqToOrderedKeys[1, default: NSMutableOrderedSet()].add(key)\n        minFreq = 1\n    }\n\n    private func updateFreq(_ key: Int) {\n        let freq = keyToFreq[key]!\n        keyToFreq[key] = freq + 1\n        freqToOrderedKeys[freq]?.remove(key)\n        if freqToOrderedKeys[freq]?.count == 0, freq == minFreq { minFreq += 1 }\n        freqToOrderedKeys[freq + 1, default: NSMutableOrderedSet()].add(key)\n    }\n\n    private func evict() {\n        guard let keys = freqToOrderedKeys[minFreq], let lru = keys.firstObject as? Int else { return }\n        freqToOrderedKeys[minFreq]?.remove(lru)\n        keyToVal.removeValue(forKey: lru)\n        keyToFreq.removeValue(forKey: lru)\n    }\n}",
    "timeComplexity": "O(1) amortized for get and put",
    "spaceComplexity": "O(capacity)",
    "explanation": "Three maps work together: key->value, key->frequency, and frequency->ordered set of keys. The ordered set at each frequency acts as an LRU queue. We track minFreq globally — it resets to 1 on new inserts and increments when the minimum-frequency bucket empties."
  },
  {
    "title": "N-Queens Solver",
    "difficulty": "expert",
    "topic": "recursion",
    "question": "Given an integer n, return all distinct solutions to the n-queens puzzle. Each solution is a board configuration where n queens are placed such that no two queens attack each other.\n\nExample:\nInput: n = 4\nOutput: [\n  [\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],\n  [\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]\n]",
    "hints": [
      "Use backtracking — place one queen per row, then recursively attempt to place the next row's queen.",
      "Track which columns and diagonals are occupied. Main diagonals share (row - col), anti-diagonals share (row + col).",
      "When row == n, you have a valid placement — convert the column array to the board string format."
    ],
    "solution": "func solveNQueens(_ n: Int) -> [[String]] {\n    var results = [[String]]()\n    var cols = Set<Int>()\n    var diag1 = Set<Int>() // row - col\n    var diag2 = Set<Int>() // row + col\n    var queens = [Int](repeating: -1, count: n)\n    func backtrack(_ row: Int) {\n        if row == n {\n            let board = queens.map { col -> String in\n                var row = [Character](repeating: \".\", count: n)\n                row[col] = \"Q\"\n                return String(row)\n            }\n            results.append(board)\n            return\n        }\n        for col in 0..<n {\n            if cols.contains(col) { continue }\n            if diag1.contains(row - col) { continue }\n            if diag2.contains(row + col) { continue }\n            cols.insert(col); diag1.insert(row - col); diag2.insert(row + col)\n            queens[row] = col\n            backtrack(row + 1)\n            cols.remove(col); diag1.remove(row - col); diag2.remove(row + col)\n        }\n    }\n    backtrack(0)\n    return results\n}",
    "timeComplexity": "O(n!) — pruning makes it much faster in practice",
    "spaceComplexity": "O(n) for the recursion stack and auxiliary sets",
    "explanation": "We place queens row by row. Sets for columns and both diagonal directions allow O(1) conflict checking. When we find a valid placement in the last row, we build the board string. Backtracking removes the queen's marks before trying the next column."
  },
  {
    "title": "Palindrome Partitioning II",
    "difficulty": "expert",
    "topic": "dynamic-programming",
    "question": "Given a string s, return the minimum number of cuts needed to partition s into substrings where every substring is a palindrome.\n\nExample 1:\nInput: s = \"aab\"\nOutput: 1  (\"aa\" | \"b\")\n\nExample 2:\nInput: s = \"a\"\nOutput: 0\n\nExample 3:\nInput: s = \"ab\"\nOutput: 1",
    "hints": [
      "Precompute a 2D boolean table isPalin[i][j] = true if s[i...j] is a palindrome.",
      "Define dp[i] = minimum cuts for s[0...i]. If s[0...i] is itself a palindrome, dp[i] = 0.",
      "For each i, scan all j from 0 to i: if s[j...i] is palindrome, dp[i] = min(dp[i], dp[j-1] + 1)."
    ],
    "solution": "func minCut(_ s: String) -> Int {\n    let chars = Array(s), n = chars.count\n    var isPalin = [[Bool]](repeating: [Bool](repeating: false, count: n), count: n)\n    for i in 0..<n { isPalin[i][i] = true }\n    for length in 2...n {\n        for i in 0...n - length {\n            let j = i + length - 1\n            if chars[i] == chars[j] {\n                isPalin[i][j] = length == 2 ? true : isPalin[i+1][j-1]\n            }\n        }\n    }\n    var dp = [Int](repeating: Int.max, count: n)\n    for i in 0..<n {\n        if isPalin[0][i] { dp[i] = 0; continue }\n        for j in 1...i {\n            if isPalin[j][i], dp[j-1] != Int.max {\n                dp[i] = min(dp[i], dp[j-1] + 1)\n            }\n        }\n    }\n    return dp[n-1]\n}",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(n^2)",
    "explanation": "Two-phase DP: first precompute all palindromic substrings in O(n^2). Then for each position i, the minimum cuts is 0 if the whole prefix is a palindrome, otherwise we try every split point j where s[j...i] is a palindrome and take the min of dp[j-1] + 1."
  },
  {
    "title": "Implement Thread-Safe Queue",
    "difficulty": "expert",
    "topic": "stacks-queues",
    "question": "Implement a thread-safe generic queue in Swift that supports concurrent reads and exclusive writes. It must support:\n- enqueue(_ element: T)\n- dequeue() -> T?\n- peek() -> T?\n- isEmpty: Bool\n\nThe implementation should be safe to use from multiple threads simultaneously without data races.\n\nBonus: Implement a blocking dequeue that waits until an element is available.",
    "hints": [
      "Use a DispatchQueue with a barrier flag for writes and concurrent reads — this is the reader-writer pattern.",
      "A serial DispatchQueue is simpler but serializes reads unnecessarily. A concurrent queue with .barrier for writes allows parallel reads.",
      "For the blocking variant, use a DispatchSemaphore — signal on enqueue, wait on dequeue."
    ],
    "solution": "final class ThreadSafeQueue<T> {\n    private var storage = [T]()\n    private let queue = DispatchQueue(label: \"com.queue.concurrent\", attributes: .concurrent)\n    private let semaphore = DispatchSemaphore(value: 0)\n\n    var isEmpty: Bool {\n        queue.sync { storage.isEmpty }\n    }\n\n    func enqueue(_ element: T) {\n        queue.async(flags: .barrier) { [weak self] in\n            self?.storage.append(element)\n        }\n        semaphore.signal()\n    }\n\n    func dequeue() -> T? {\n        queue.sync(flags: .barrier) {\n            guard !storage.isEmpty else { return nil }\n            return storage.removeFirst()\n        }\n    }\n\n    func peek() -> T? {\n        queue.sync { storage.first }\n    }\n\n    // Blocking dequeue — waits until element is available\n    func blockingDequeue() -> T {\n        semaphore.wait()\n        return queue.sync(flags: .barrier) {\n            storage.removeFirst()\n        }\n    }\n}",
    "timeComplexity": "O(1) for enqueue/peek; O(n) for dequeue due to array shift (use LinkedList for O(1))",
    "spaceComplexity": "O(n)",
    "explanation": "A concurrent DispatchQueue with .barrier ensures writes are exclusive while reads can happen concurrently. sync{} for reads blocks the caller until complete; async(flags: .barrier) for writes lets them execute exclusively. The semaphore enables the blocking dequeue pattern without busy-waiting."
  },
  {
    "title": "Design Rate Limiter",
    "difficulty": "expert",
    "topic": "hash-maps",
    "question": "Design a rate limiter that allows at most N requests per user per time window W (in seconds). Implement:\n- func allow(userId: String) -> Bool: Returns true if the request is allowed.\n\nThe implementation should use a sliding window approach for accuracy.\n\nExample:\nlet limiter = RateLimiter(maxRequests: 3, windowSeconds: 10)\nlimiter.allow(\"user1\") -> true   // 1st request\nlimiter.allow(\"user1\") -> true   // 2nd\nlimiter.allow(\"user1\") -> true   // 3rd\nlimiter.allow(\"user1\") -> false  // 4th within window",
    "hints": [
      "Store a list of timestamps for each user's recent requests.",
      "On each request, remove timestamps older than (now - windowSeconds) from the user's list.",
      "If the remaining count is less than maxRequests, allow and append the current timestamp."
    ],
    "solution": "import Foundation\n\nfinal class RateLimiter {\n    private let maxRequests: Int\n    private let windowSeconds: TimeInterval\n    private var timestamps = [String: [Date]]()\n    private let lock = NSLock()\n\n    init(maxRequests: Int, windowSeconds: Int) {\n        self.maxRequests = maxRequests\n        self.windowSeconds = TimeInterval(windowSeconds)\n    }\n\n    func allow(userId: String) -> Bool {\n        lock.lock()\n        defer { lock.unlock() }\n        let now = Date()\n        let cutoff = now.addingTimeInterval(-windowSeconds)\n        var userTimestamps = timestamps[userId] ?? []\n        userTimestamps = userTimestamps.filter { $0 > cutoff }\n        if userTimestamps.count < maxRequests {\n            userTimestamps.append(now)\n            timestamps[userId] = userTimestamps\n            return true\n        }\n        timestamps[userId] = userTimestamps\n        return false\n    }\n}\n\n// Token Bucket variant for comparison:\nfinal class TokenBucketRateLimiter {\n    private let capacity: Double\n    private let refillRate: Double  // tokens per second\n    private var tokens: [String: Double] = [:]\n    private var lastRefill: [String: Date] = [:]\n    private let lock = NSLock()\n\n    init(capacity: Int, refillPerSecond: Double) {\n        self.capacity = Double(capacity)\n        self.refillRate = refillPerSecond\n    }\n\n    func allow(userId: String) -> Bool {\n        lock.lock()\n        defer { lock.unlock() }\n        let now = Date()\n        let elapsed = now.timeIntervalSince(lastRefill[userId] ?? now)\n        var currentTokens = min(capacity, (tokens[userId] ?? capacity) + elapsed * refillRate)\n        lastRefill[userId] = now\n        if currentTokens >= 1 {\n            currentTokens -= 1\n            tokens[userId] = currentTokens\n            return true\n        }\n        tokens[userId] = currentTokens\n        return false\n    }\n}",
    "timeComplexity": "O(n) per request where n is requests in window; O(1) amortized with cleanup",
    "spaceComplexity": "O(users * window_size)",
    "explanation": "The sliding window approach stores exact timestamps per user. On each request we evict expired timestamps and check count. NSLock ensures thread safety. The token bucket alternative is more memory efficient: it calculates elapsed time to determine how many tokens have refilled, consuming one per allowed request."
  }
];
