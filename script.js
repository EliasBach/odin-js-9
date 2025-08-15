class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b))
  }

  buildTree(array) {
    if (array.length == 0) {return null}
    const middle = Math.floor(array.length / 2)
    const node = new Node(array[middle])
    node.left = this.buildTree(array.slice(0, middle))
    node.right = this.buildTree(array.slice(middle + 1, array.length))
    return node
  }

  print() {
    let node = this.root;
    const prettyPrint = (node, prefix = "", isLeft = true) => {
      if (node === null) {
        return
      }
      if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
      }
    };
    prettyPrint(node)
  }

  insert(value) {
    let currentNode = this.root

    while (currentNode !== null) {
      if (value == currentNode.data || value == null) {
        console.log("function insert: Key already exists OR no key provided")
        return
      }

      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value)
          return
        } else {
          currentNode = currentNode.left
        }
      } 

      if (value > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = new Node(value)
          return
        } else {
          currentNode = currentNode.right
        }
      } 
    }
  }

  find(value) {
    let currentNode = this.root
    
    if (value == null) {
      console.log("function find: No value provided")
      return
    }

    while(currentNode !== null) {
      if (value == currentNode.data) {
        return currentNode
      }

      if (value < currentNode.data) {
        if (currentNode.left === null) {
          console.log("function find: Node not found")
          return
        }
        currentNode = currentNode.left
        continue
      }

      if (value > currentNode.data) {
        if (currentNode.right === null) {
          console.log("function find: Node not found")
          return
        }
        currentNode = currentNode.right
        continue
      }
    }
  }

  findParent(value) {
    let currentNode = this.root
    let parentNode;
    
    if (value == this.root.data) {
      console.log("function findParent: Root node has no parent")
      return
    }
    if (value == null) {
      console.log("function findParent: No value provided")
      return
    }

    while(currentNode !== null) {
      if (value == currentNode.data) {
        return parentNode
      }

      if (value < currentNode.data) {
        if (currentNode.left === null) {
          console.log("function findParent: Node not found")
          return
        }
        parentNode = currentNode
        currentNode = currentNode.left
        continue
      }

      if (value > currentNode.data) {
        if (currentNode.right === null) {
          console.log("function findParent: Node not found")
          return
        }
        parentNode = currentNode
        currentNode = currentNode.right
        continue
      }
    }
  }

  findSuccessor(value) {
    let currentNode = this.find(value)
    let successorNode = currentNode.right

    if (value == null) {
      console.log("function findSuccessor: No value provided")
      return
    }
    if (currentNode == undefined) {
      console.log("function findSuccessor: Node not found")
      return
    }
    if (currentNode.right == null) {
      console.log("function findSuccessor: No successor found")
      return
    }

    while(successorNode.left !== null) {
      if (value == currentNode.data) {
        successorNode = successorNode.left
      }
    }
    return successorNode
  }

  deleteItem(value) {
    let currentNode = this.find(value)
    let parentNode;
    let successorNode;

    if (value == null) {
      console.log("function deleteItem: No value provided")
      return
    }
    if (currentNode == undefined) {
      console.log("function deleteItem: Node not found")
      return
    }

    // case 1: leaf node => delete link from parent
    if (currentNode.left == null && currentNode.right == null) {
      parentNode = this.findParent(value)
      parentNode.data < value ? parentNode.right = null : parentNode.left = null
      return
    }

    // case 2: node with 1 child node => swap with parent, then delete link
    if (currentNode.left == null)  {
      let parentNode = this.findParent(value)
      parentNode.data < value ? parentNode.right = currentNode.right : parentNode.left = currentNode.right
      return
    }
    if (currentNode.right == null) {
      parentNode = this.findParent(value)
      parentNode.data < value ? parentNode.right = currentNode.left : parentNode.left = currentNode.left
      return
    }

    // case 3: node with 2 child nodes => 
    // swap with successor, then delete link
    if (currentNode.left != null && currentNode.right != null) {
      successorNode = this.findSuccessor(value)
      let successorParentNode = this.findParent(successorNode.data)
      
      // swap children
      let child = successorNode.right // successor never has left child
      successorNode.left = currentNode.left
      successorNode.right = currentNode.right
      currentNode.left = null
      currentNode.right = child
      
      // swap parents of currentNode and successorNode
      // now node can be deleted, as in case 2
      successorParentNode.left = currentNode.right // sucessor is always bigger
      if (currentNode.data != this.root.data) {
        parentNode = this.findParent(value)
        parentNode.data < successorParentNode.data ? parentNode.right = successorNode : parentNode.left = successorNode
      } else {
        // special case: root node, then root assignment is changed instead
        this.root = successorNode
      }
      return
    } 
  }

  LevelOrder(root = this.root) {
    let queue = [root]
    let result = []
    let node

    while (queue.length > 0) {
      node = queue.shift()
      result.push(node.data)
      if (node.left != null) {
        queue.push(node.left)
      }
      if (node.right != null) {
        queue.push(node.right)
      }
    }
    return result
  }

  LevelOrderForEach(callback) {
    if (callback == null) {
      console.log("function LevelOrderForEach: no callback function provided")
    }

    let queue = [this.root]
    let result = []
    let node

    while (queue.length > 0) {
      node = queue.shift()
      node.data = callback(node.data)
      if (node.left != null) {
        queue.push(node.left)
      }
      if (node.right != null) {
        queue.push(node.right)
      }
    }
  }

  PreOrder(root = this.root) {
    let stack = [root]
    let result = []
    let node

    while (stack.length > 0) {
      node = stack.pop()
      result.push(node.data)
      
      if (node.left != null) {
        stack.push(node.left)
      }
      if (node.right != null) {
        stack.push(node.right)
      }
    }
    return result
  }

  InOrder(root = this.root) {
    let stack = []
    let result = []
    let node = root

    while(stack.length > 0 || node != null) {
      while(node != null) {
        stack.push(node)
        node = node.left
      }

      node = stack.pop()
      result.push(node.data)
      node = node.right
    }
    return result
  }
  
  PostOrder(root = this.root) {
    let stack = [root]
    let result = []
    let node

    while(stack.length > 0) {
      node = stack.pop()

      if (node.left != null) {
        stack.push(node.left)
      }
      if (node.right != null) {
        stack.push(node.right)
      }

      result.push(node.data)
    }

    return result.reverse()
  }

  depth(value, root = this.root) {
    // depth is the number of edges from root to current node
    let currentNode = root
    let depth = 0
    
    if (value == null) {
      console.log("function depth: No value provided")
      return null
    }

    while(currentNode !== null) {
      if (value == currentNode.data) {
        return depth
      }

      depth++
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          console.log("function depth: Node not found")
          return null
        }
        currentNode = currentNode.left
        continue
      }

      if (value > currentNode.data) {
        if (currentNode.right === null) {
          console.log("function depth: Node not found")
          return null
        }
        currentNode = currentNode.right
        continue
      }
    }
  }

  height(value) {
    // height is the number of edges from value to farthest downwards leaf node
    let currentNode = this.find(value)
    if (currentNode == null) {
      console.log("function height: Node not found")
      return null
    }

    // find farthest leaf node by taking the last LevelOrder value from subtree
    let farthestLeafValue = this.LevelOrder(currentNode).splice(-1)[0]

    // use currentNode as root
    let height = this.depth(farthestLeafValue, currentNode)
    return height
  }

  isBalanced(root = this.root) {
    // base case
    if(root == null) return true

    let leftHeight
    let rightHeight
    if (root.left != null) leftHeight = this.height(root.left.data)
    if (root.right != null) rightHeight = this.height(root.right.data)
    
    // check condition for every node recursively
    if (Math.abs(leftHeight - rightHeight) > 1) return false
    return (this.isBalanced(root.left) && this.isBalanced(root.right))
  }

  rebalance() {
    const array = this.LevelOrder()
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b))
  }
}

// extra functions for testing
function by2(x) {
  return x*2
}

function randomIntegerArray(n=100, max=500) {
  let array = []
  for (let i = 0; i < n; i++) {
    array.push(Math.floor(Math.random() * max))
  }
  return array
}

// testing: initialisation
let test_array = randomIntegerArray(30)
let testTree = new Tree(test_array)
testTree.print()
console.log("Initial Tree (Tree is balanced: " + testTree.isBalanced() +")")
testTree.print()

// testing function: LevelOrderForEach
console.log("> Multiply all entries by 2 using LevelOrderForEach")
testTree.LevelOrderForEach(by2)
testTree.print()

// testing function: insert, depth, height
testTree.insert(99)
testTree.insert(101)

testTree.insert(105)
console.log("depth of value 99: " + testTree.depth(99))
console.log("height of value 99: " + testTree.height(99))
console.log("> Insert values 99, 101, 103, 105 (Tree is balanced: " + testTree.isBalanced() +")")
testTree.print()

// testing function: delete
console.log("> Delete value 99 (Tree is balanced: " + testTree.isBalanced() +")")
testTree.deleteItem(99)
testTree.print()

// testing function: rebalance
testTree.rebalance()
console.log("> Rebalance Tree (Tree is balanced: " + testTree.isBalanced() +")")
testTree.print()
console.log("done")

// testing function: LevelOrder, PreOrder, InOrder, PostOrder
console.log(testTree.LevelOrder())
console.log(testTree.PreOrder())
console.log(testTree.InOrder())
console.log(testTree.PostOrder())

console.log("done")