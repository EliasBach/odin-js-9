class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree([...new Set(arr)].sort((a, b) => a - b));
  }

  buildTree(array) {
    if (array.length == 0) {return null};
    const middle = Math.floor(array.length / 2);
    const node = new Node(array[middle]);
    node.left = this.buildTree(array.slice(0, middle));
    node.right = this.buildTree(array.slice(middle + 1, array.length));
    return node;
  }

  print() {
    let node = this.root;
    const prettyPrint = (node, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };
    prettyPrint(node);
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

    // !!! bug with non-root 2 child deletion !!!
    // case 3: node with 2 child nodes => 
    // swap with successor, need to know parent and children
    if (currentNode.left != null && currentNode.right != null) {
      successorNode = this.findSuccessor(value)
      let parentSucessorNode = this.findParent(successorNode.data)

      if (currentNode != this.root) {
        parentNode = this.findParent(value)
        parentNode.data < value ? parentNode.right = currentNode.left : parentNode.left = currentNode.left
      } else {
        // special case: root node => simply reassign root pointer
        this.root = successorNode
      }
      
      successorNode.left = currentNode.left
      successorNode.right = currentNode.right
      currentNode.left = null
      currentNode.right = null
      parentSucessorNode.data < value ? parentSucessorNode.right = null : parentSucessorNode.left = null
      return
    } 
  }
}

// testing
let test_array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let testTree = new Tree(test_array)
testTree.insert(555)
testTree.deleteItem(8)
testTree.deleteItem(9)
testTree.deleteItem()
testTree.print()
console.log(testTree.root)
console.log("done")