# The Odin Project - Javascript Course Exercise 9
## Binary Search Trees
Description: This exercise asks to implemenet a balanced Binary Search Tree (BST), a basic type of data structure consisting of nodes. The tree starts with the so-called “root node”, which then splits into child nodes. Child nodes can split into further nodes. A node with no children is called a “leaf node”.

The following functions were implemented:
- *buildTree*: build the tree given an array of values
- *insert*: inserts a new value into the tree
- *deleteItem*: deletes a given value from the tree and preserves the structure
- *find*, *findParent*, *findSuccessor*: finds specific nodes
- *LevelOrderForEach*: applies a callback function to all nodes, by traversing in LevelOrder
- *LevelOrder*, *PreOrder*, *InOrder*, *PostOrder*: traversal algorithms to print values in a certain order
- *isBalanced*: checks if tree is balanced, i.e. are the value equally distributes across branches
- *rebalance*: takes all the values in the tree and builds a new balanced binary search tree

## Additional References Used
- https://dev.to/niemet0502/depth-first-search-of-a-binary-tree-1fpf
- https://www.baeldung.com/cs/tree-depth-height-difference 