"use strict";

class Node1 {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  #sortedAndNoDuplicates(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    return sortedArray;
  }

  buildTree(array) {
    let arr = this.#sortedAndNoDuplicates(array);

    if (arr.length === 0) {
      return null;
    }
    let mid = Math.floor(arr.length / 2);

    const root = new Node1(
      arr[mid],
      this.buildTree(arr.slice(0, mid)),
      this.buildTree(arr.slice(mid + 1))
    );

    return root;
  }

  display(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.display(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.display(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value, root = this.root) {
    let node = new Node1(value);
    if (root === null) {
      return;
    }
    if (root.value === node.value) {
      root = node;
    }

    if (root.value < node.value) {
      if (root.right === null) {
        root.right = node;
      }
      return this.insert(value, root.right);
    }
    if (root.value > node.value) {
      if (root.left === null) {
        root.left = node;
      }
      return this.insert(value, root.left);
    }
  }

  #findMin(root) {
    while (root.left != null) {
      root = root.left;
    }
    return root.value;
  }

  delete(value, root = this.root) {
    if (root === null) return root;
    if (root.value < value) {
      root.right = this.delete(value, root.right);
    } else if (root.value > value) {
      root.left = this.delete(value, root.left);
    } else {
      // 1child
      if (root.left === null) return root.right;
      else if (root.right === null) return root.left;

      //two children
      root.value = this.#findMin(root);
      root.right = this.delete(value, root.right);
    }
    return root;
  }

  find(value, root = this.root) {
    if (root === null) return null;
    if (root.value === value) {
      return root;
    }
    if (root.value < value) {
      return this.find(value, root.right);
    } else {
      return this.find(value, root.left);
    }
  }

  levelOrder(callback) {
    if (this.root === null) {
      return;
    }
    let newArr = [];
    let arr = [];
    arr.push(this.root);
    while (arr.length !== 0) {
      const node = arr.shift();
      if (node.left !== null) {
        arr.push(node.left);
      }
      if (node.right !== null) {
        arr.push(node.right);
      }
      newArr.push(node.value);
      if (callback) {
        callback(node);
      }
    }
    if (!callback) return newArr;
  }

  inOrder(callback) {
    let newArr = [];
    let arr = [];
    let node = this.root;

    while (true) {
      if (node !== null) {
        arr.push(node);
        node = node.left;
      } else {
        if (arr.length === 0) break;
        node = arr.pop();
        newArr.push(node.value);
        node = node.right;
      }

      if (callback) {
        callback(node);
      }
    }
    if (!callback) return newArr;
  }
  preOrder(callback) {
    if (this.root === null) {
      return;
    }
    let newArr = [];
    let arr = [];
    arr.push(this.root);
    while (arr.length !== 0) {
      const node = arr.pop();
      newArr.push(node.value);
      if (node.right !== null) {
        arr.push(node.right);
      }
      if (node.left !== null) {
        arr.push(node.left);
      }

      if (callback) {
        callback(node);
      }
    }
    if (!callback) return newArr;
  }
  postOrder(callback) {
    if (this.root === null) {
      return;
    }
    let newArr = [];
    let result = [];
    let arr = [];
    arr.push(this.root);
    while (arr.length !== 0) {
      const node = arr.pop();
      newArr.push(node.value);
      if (node.left !== null) {
        arr.push(node.left);
      }
      if (node.right !== null) {
        arr.push(node.right);
      }
      if (callback) callback(node);
    }
    while (newArr.length !== 0) {
      result.push(newArr.pop());
    }
    if (!callback) return result;
  }

  height(root = this.root) {
    if (root === null) {
      return -1;
    }
    return Math.max(this.height(root.left), this.height(root.right)) + 1;
  }

  depth(value, root = this.root, count = 0) {
    if (root === null) {
      return null;
    }
    if (root.value === value) {
      return count;
    }
    if (root.value < value) {
      return this.depth(value, root.right, (count += 1));
    } else {
      return this.depth(value, root.left, (count += 1));
    }
  }

  isBalance(root = this.root) {
    if (root === null) {
      return true;
    }
    let left = this.height(root.left);
    let right = this.height(root.right);
    return (
      left - right <= 1 &&
      this.isBalance(root.left) &&
      this.isBalance(root.right)
    );
  }

  reBalance() {
    if (this.root === null) {
      return null;
    }
    const arr = this.inOrder();
    this.root = this.buildTree(arr);
  }
}

let tree = new Tree([6, 10, 2, 3, 1, 4, 6, 9, 9]);
tree.find(10);
tree.insert(5);
tree.delete(9);
tree.height();
tree.depth(5);
tree.reBalance();
tree.levelOrder();
tree.inOrder();
tree.preOrder();
tree.postOrder();
tree.display();
