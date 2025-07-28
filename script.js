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

  insert(value = "x") {
    let currentNode = this.root
    while (true) {
      console.log(currentNode)
      if (value == currentNode.data || value == "x") {
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

  deleteItem(value) {
    // code
  }
}

// testing
let test_array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let testTree = new Tree(test_array)
testTree.insert(555)
testTree.print()