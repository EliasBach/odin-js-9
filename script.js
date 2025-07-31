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
        console.log("Error. Key already exists OR no key provided")
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

    while(currentNode !== null) {
      if (value == currentNode.data) {
        return currentNode
      }

      if (value < currentNode.data) {
        if (currentNode.left === null) {
          console.log("Node not found")
          return
        }
        currentNode = currentNode.left
        continue
      }

      if (value > currentNode.data) {
        if (currentNode.right === null) {
          console.log("Node not found")
          return
        }
        currentNode = currentNode.right
        continue
      }
    }
  }

  findParent(value) {
    if (value == this.root.data || value == null) {
      console.log("Root value or no value provided")
      return
    }

    let currentNode = this.root
    let parentNode = null

    while(currentNode !== null) {
      if (value == currentNode.data) {
        return parentNode
      }

      if (value < currentNode.data) {
        if (currentNode.left === null) {
          console.log("Node not found")
          return
        }
        parentNode = currentNode
        currentNode = currentNode.left
        continue
      }

      if (value > currentNode.data) {
        if (currentNode.right === null) {
          console.log("Node not found")
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
    if (value == null || currentNode == undefined) {
      console.log("No value provided OR value not in tree")
      return
    }

    let successorNode = null
    if (currentNode.right == null) {
      console.log("No successor exists")
    } else {
      successorNode = currentNode.right
    }

    while(successorNode.left !== null) {
      if (value == currentNode.data) {
        successorNode = successorNode.left
      }
    }
    return successorNode
  }

  delete(value) {
    let currentNode = this.find(value)
    if (value == null || currentNode == undefined) {
      console.log("No value provided OR value not in tree")
      return
    }

    // case 1: leaf node => delete link from parent
    if (currentNode.left == null && currentNode.right == null) {
      return
    }

    // case 2: node with 1 child node => swap with parent, then delete link
    if (currentNode.left == null || currentNode.right == null) {
      return
    }

    // case 3: node with 2 child nodes => swap with successor, then delete link
    if (currentNode.left != null && currentNode.right != null) {
      return
    } 
  }
}

// testing
let test_array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let testTree = new Tree(test_array)
testTree.insert(555)
testTree.print()
testTree.find(3.1)
console.log(testTree.findParent(555))
console.log(testTree.findSuccessor(67))