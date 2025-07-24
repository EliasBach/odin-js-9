function Node(value, left, right) {
    return {
      value,
      left,
      right
    }
}

function Tree(root) {
    return {
      root
    }
}

function buildTree(array) {
    // remove duplicates
    array = Array.from(new Set(array));

    // sort values
    array.sort(function(a, b){return a-b})

    // build tree
    let tree = Tree()
    for (let entry of array) {
        console.log(entry)
    }

    return tree
}

// testing
let test_array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
buildTree(test_array)