import logo from './logo.svg';
import './App.css';
import { CopyBlock , dracula } from 'react-code-blocks';



function App() {
    let json = {
        1: './assets/1.png',
        2: './assets/2.png',
        3: './assets/3.png',
        4: './assets/4.png',
        5: './assets/5.png',
        6: './assets/6.png',
        7: './assets/7.png',
    }

    console.log(json)
  return (
    <div className="App">
      <h1>red black</h1>
      <CopyBlock className ='code'
      
        text={redblack}
        language={'c'}
        // showLineNumbers={showLineNumbers}
        theme={dracula}
      
      />;
      <h1>b tree</h1>
      <CopyBlock className ='code'
      
        text={btree}
        language={'c'}
        // showLineNumbers={showLineNumbers}
        theme={dracula}
      
      />;
      <h1>huff man</h1>
      <CopyBlock className ='code'
        text={huffman}
        language={'c'}
        // showLineNumbers={showLineNumbers}
        theme={dracula}
      
      />;
      <h1>b plus</h1>
      <CopyBlock className ='code'
        text={bplus}
        language={'c'}
        // showLineNumbers={showLineNumbers}
        theme={dracula}
      
      />;
    </div>
  );
}

export default App;

const btree=`#include <stdio.h>
#include <stdlib.h>

#define MAX_KEYS 4
#define MIN_KEYS ((MAX_KEYS + 1) / 2 - 1)

typedef struct node {
    int num_keys;
    int keys[MAX_KEYS];
    struct node* children[MAX_KEYS + 1];
    struct node* parent;
    int is_leaf;
} Node;

Node* create_node() {
    Node* new_node = (Node*)malloc(sizeof(Node));
    new_node->num_keys = 0;
    new_node->parent = NULL;
    new_node->is_leaf = 1;
    for (int i = 0; i < MAX_KEYS + 1; i++) {
        new_node->children[i] = NULL;
    }
    return new_node;
}

void insert_non_full(Node* node, int key) {
    int i = node->num_keys - 1;
    if (node->is_leaf) {
        while (i >= 0 && node->keys[i] > key) {
            node->keys[i + 1] = node->keys[i];
            i--;
        }
        node->keys[i + 1] = key;
        node->num_keys++;
    } else {
        while (i >= 0 && node->keys[i] > key) {
            i--;
        }
        i++;
        if (node->children[i]->num_keys == MAX_KEYS) {
            split_child(node, i, node->children[i]);
            if (node->keys[i] < key) {
                i++;
            }
        }
        insert_non_full(node->children[i], key);
    }
}

void split_child(Node* parent, int index, Node* child) {
    Node* new_node = create_node();
    new_node->is_leaf = child->is_leaf;
    new_node->num_keys = MIN_KEYS;

    for (int j = 0; j < MIN_KEYS; j++) {
        new_node->keys[j] = child->keys[j + MIN_KEYS];
    }

    if (!child->is_leaf) {
        for (int j = 0; j < MIN_KEYS + 1; j++) {
            new_node->children[j] = child->children[j + MIN_KEYS];
        }
    }

    child->num_keys = MIN_KEYS;
    for (int j = parent->num_keys; j >= index + 1; j--) {
        parent->children[j + 1] = parent->children[j];
    }
    parent->children[index + 1] = new_node;
    for (int j = parent->num_keys - 1; j >= index; j--) {
        parent->keys[j + 1] = parent->keys[j];
    }
    parent->keys[index] = child->keys[MIN_KEYS];
    parent->num_keys++;
}

void insert(Node** root, int key) {
    Node* root_node = *root;
    if (root_node == NULL) {
        Node* new_root = create_node();
        new_root->keys[0] = key;
        new_root->num_keys = 1;
        *root = new_root;
    } else {
        if (root_node->num_keys == MAX_KEYS) {
            Node* new_root = create_node();
            new_root->children[0] = root_node;
            new_root->is_leaf = 0;
            *root = new_root;
            split_child(new_root, 0, root_node);
            insert_non_full(new_root, key);
        } else {
            insert_non_full(root_node, key);
        }
    }
}

void print_tree(Node* node) {
    if (node != NULL) {
        for (int i = 0; i < node->num_keys; i++) {
            printf("%d ", node->keys[i]);
        }
        printf("\n");
        if (!node->is_leaf) {
            for (int i = 0; i <= node->num_keys; i++) {
                print_tree(node->children[i]);
            }
        }
    }
}

int main() {
    Node* root = NULL;

    insert(&root, 8);
    insert(&root, 12);
    insert(&root, 15);
    insert(&root, 4);
    insert(&root, 6);
    insert(&root, 7);
    insert(&root, 2);
    insert(&root, 18);
    insert(&root, 20);

    print_tree(root);

    return 0;
}
`
const huffman =`#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Structure to represent a node in the Huffman tree
struct Node {
    char data;
    unsigned frequency;
    struct Node* left;
    struct Node* right;
};

// Function to create a new node
struct Node* createNode(char data, unsigned frequency) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->frequency = frequency;
    newNode->left = newNode->right = NULL;
    return newNode;
}

// Function to check if a node is a leaf node
bool isLeafNode(struct Node* node) {
    return (node->left == NULL && node->right == NULL);
}

// Function to build the Huffman tree
struct Node* buildHuffmanTree(char data[], unsigned frequency[], int size) {
    struct Node *left, *right, *top;

    // Create an empty min heap
    struct MinHeap* minHeap = createMinHeap(size);

    // Add all the characters and their frequencies to the min heap
    for (int i = 0; i < size; ++i)
        insertMinHeap(minHeap, createNode(data[i], frequency[i]));

    // Build the Huffman tree by repeatedly extracting the minimum node
    while (!isSizeOne(minHeap)) {
        // Extract the two minimum frequency nodes from the min heap
        left = extractMinHeap(minHeap);
        right = extractMinHeap(minHeap);

        // Create a new internal node with the sum of the frequencies
        // and set the extracted nodes as the left and right children
        top = createNode('$', left->frequency + right->frequency);
        top->left = left;
        top->right = right;

        // Add the new node to the min heap
        insertMinHeap(minHeap, top);
    }

    // The remaining node in the min heap is the root node
    return extractMinHeap(minHeap);
}

// Function to print the Huffman codes for each character
void printHuffmanCodes(struct Node* root, int arr[], int top) {
    // Assign 0 to the left edge of the tree and recur
    if (root->left) {
        arr[top] = 0;
        printHuffmanCodes(root->left, arr, top + 1);
    }

    // Assign 1 to the right edge of the tree and recur
    if (root->right) {
        arr[top] = 1;
        printHuffmanCodes(root->right, arr, top + 1);
    }

    // If a leaf node is reached, print the character and its code
    if (isLeafNode(root)) {
        printf("%c: ", root->data);
        for (int i = 0; i < top; ++i)
            printf("%d", arr[i]);
        printf("\n");
    }
}

// Function to perform Huffman coding
void huffmanCoding(char data[], unsigned frequency[], int size) {
    // Build the Huffman tree
    struct Node* root = buildHuffmanTree(data, frequency, size);

    // Create an array to store the Huffman codes
    int arr[100], top = 0;

    // Print the Huffman codes
    printHuffmanCodes(root, arr, top);
}

// Driver program to test the Huffman coding algorithm
int main() {
    char data[] = {'a', 'b', 'c', 'd', 'e', 'f'};
    unsigned frequency[] = {5, 9, 12, 13, 16, 45};
    int size = sizeof(data) / sizeof(data[0]);

    huffmanCoding(data, frequency, size);

    return 0;
}
`;
const bplus =`#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

#define MAX_KEYS 3
#define MAX_CHILDREN MAX_KEYS + 1

struct BPlusTreeNode {
    int keys[MAX_KEYS];
    struct BPlusTreeNode* children[MAX_CHILDREN];
    bool isLeaf;
    int numKeys;
    struct BPlusTreeNode* next;
};

struct BPlusTreeNode* createNode(bool isLeaf) {
    struct BPlusTreeNode* newNode = (struct BPlusTreeNode*)malloc(sizeof(struct BPlusTreeNode));
    newNode->isLeaf = isLeaf;
    newNode->numKeys = 0;
    newNode->next = NULL;
    for (int i = 0; i < MAX_CHILDREN; ++i)
        newNode->children[i] = NULL;
    return newNode;
}

struct BPlusTreeNode* insertIntoLeaf(struct BPlusTreeNode* leaf, int key) {
    int i;
    for (i = leaf->numKeys - 1; i >= 0 && leaf->keys[i] > key; --i)
        leaf->keys[i + 1] = leaf->keys[i];
    leaf->keys[i + 1] = key;
    leaf->numKeys++;
    return leaf;
}

struct BPlusTreeNode* splitLeaf(struct BPlusTreeNode* leaf) {
    int splitIndex = (leaf->numKeys - 1) / 2;
    struct BPlusTreeNode* newLeaf = createNode(true);

    for (int i = splitIndex + 1; i < leaf->numKeys; ++i) {
        newLeaf->keys[i - splitIndex - 1] = leaf->keys[i];
        newLeaf->numKeys++;
        leaf->numKeys--;
    }

    newLeaf->next = leaf->next;
    leaf->next = newLeaf;

    return newLeaf;
}

struct BPlusTreeNode* insertIntoParent(struct BPlusTreeNode* parent, struct BPlusTreeNode* child, int key) {
    int i;
    for (i = parent->numKeys - 1; i >= 0 && parent->keys[i] > key; --i)
        parent->keys[i + 1] = parent->keys[i];
    parent->keys[i + 1] = key;
    parent->numKeys++;
    for (i = parent->numKeys - 2; i >= 0 && parent->children[i + 1] != child; --i)
        parent->children[i + 1] = parent->children[i];
    parent->children[i + 1] = child;
    return parent;
}

struct BPlusTreeNode* splitParent(struct BPlusTreeNode* parent, struct BPlusTreeNode* child) {
    int splitIndex = parent->numKeys / 2;
    int key = parent->keys[splitIndex];

    struct BPlusTreeNode* newParent = createNode(false);
    newParent->numKeys = parent->numKeys - splitIndex - 1;

    for (int i = splitIndex + 1; i < parent->numKeys; ++i) {
        newParent->keys[i - splitIndex - 1] = parent->keys[i];
        newParent->children[i - splitIndex - 1] = parent->children[i];
        parent->numKeys--;
    }

    newParent->children[newParent->numKeys] = parent->children[parent->numKeys];
    parent->numKeys--;

    return insertIntoParent(parent, child, key);
}

struct BPlusTreeNode* insert(struct BPlusTreeNode* root, int key) {
    if (root == NULL) {
        root = createNode(true);
        root = insertIntoLeaf(root, key);
        return root;
    }

    struct BPlusTreeNode* curNode = root;
    struct BPlusTreeNode* parent = NULL;

    while (!curNode->isLeaf) {
        parent = curNode;
        int i;
        for (i = curNode->numKeys - 1; i >= 0 && curNode->keys[i] > key; --i)
            curNode->keys[i + 1] = curNode->keys[i];
        curNode->keys[i + 1] = key;
        for (i = curNode->numKeys - 1; i >= 0 && curNode->keys[i] > key; --i)
            curNode->children[i + 2] = curNode->children[i + 1];
        curNode->children[i + 2] = curNode->children[i + 1];
        curNode->numKeys++;
        curNode = curNode->children[i + 1];
    }

    if (curNode->numKeys < MAX_KEYS) {
        curNode = insertIntoLeaf(curNode, key);
    } else {
        curNode = insertIntoLeaf(curNode, key);
        while (curNode->numKeys == MAX_KEYS) {
            if (parent == NULL) {
                root = splitLeaf(curNode);
                break;
            } else {
                parent = splitParent(parent, curNode);
                curNode = parent->children[parent->numKeys - 1];
            }
        }
    }

    return root;
}

void printLeafNodes(struct BPlusTreeNode* root) {
    if (root == NULL) {
        printf("Empty tree\n");
        return;
    }

    struct BPlusTreeNode* curNode = root;
    while (!curNode->isLeaf)
        curNode = curNode->children[0];

    while (curNode != NULL) {
        for (int i = 0; i < curNode->numKeys; ++i)
            printf("%d ", curNode->keys[i]);
        curNode = curNode->next;
    }

    printf("\n");
}

int main() {
    struct BPlusTreeNode* root = NULL;

    root = insert(root, 3);
    root = insert(root, 8);
    root = insert(root, 1);
    root = insert(root, 5);
    root = insert(root, 12);
    root = insert(root, 10);
    root = insert(root, 6);
    root = insert(root, 15);
    root = insert(root, 18);
    root = insert(root, 20);
    root = insert(root, 25);

    printLeafNodes(root);

    return 0;
}
`
const redblack =`#include <stdio.h>
#include <stdlib.h>

enum Color {
    RED,
    BLACK
};

struct Node {
    int data;
    enum Color color;
    struct Node* left;
    struct Node* right;
    struct Node* parent;
};

struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->color = RED;
    newNode->left = newNode->right = newNode->parent = NULL;
    return newNode;
}

struct Node* bstInsert(struct Node* root, struct Node* newNode) {
    if (root == NULL)
        return newNode;

    if (newNode->data < root->data) {
        root->left = bstInsert(root->left, newNode);
        root->left->parent = root;
    } else if (newNode->data > root->data) {
        root->right = bstInsert(root->right, newNode);
        root->right->parent = root;
    }

    return root;
}

void swapColors(enum Color* a, enum Color* b) {
    enum Color temp = *a;
    *a = *b;
    *b = temp;
}

void rotateLeft(struct Node** root, struct Node* node) {
    struct Node* rightChild = node->right;
    node->right = rightChild->left;

    if (node->right != NULL)
        node->right->parent = node;

    rightChild->parent = node->parent;

    if (node->parent == NULL)
        *root = rightChild;
    else if (node == node->parent->left)
        node->parent->left = rightChild;
    else
        node->parent->right = rightChild;

    rightChild->left = node;
    node->parent = rightChild;
}

void rotateRight(struct Node** root, struct Node* node) {
    struct Node* leftChild = node->left;
    node->left = leftChild->right;

    if (node->left != NULL)
        node->left->parent = node;

    leftChild->parent = node->parent;

    if (node->parent == NULL)
        *root = leftChild;
    else if (node == node->parent->left)
        node->parent->left = leftChild;
    else
        node->parent->right = leftChild;

    leftChild->right = node;
    node->parent = leftChild;
}

void fixViolation(struct Node** root, struct Node* node) {
    struct Node* parent = NULL;
    struct Node* grandparent = NULL;

    while ((node != *root) && (node->color != BLACK) && (node->parent->color == RED)) {
        parent = node->parent;
        grandparent = parent->parent;

        if (parent == grandparent->left) {
            struct Node* uncle = grandparent->right;

            if (uncle != NULL && uncle->color == RED) {
                grandparent->color = RED;
                parent->color = BLACK;
                uncle->color = BLACK;
                node = grandparent;
            } else {
                if (node == parent->right) {
                    rotateLeft(root, parent);
                    node = parent;
                    parent = node->parent;
                }

                rotateRight(root, grandparent);
                swapColors(&(parent->color), &(grandparent->color));
                node = parent;
            }
        } else {
            struct Node* uncle = grandparent->left;

            if (uncle != NULL && uncle->color == RED) {
                grandparent->color = RED;
                parent->color = BLACK;
                uncle->color = BLACK;
                node = grandparent;
            } else {
                if (node == parent->left) {
                    rotateRight(root, parent);
                    node = parent;
                    parent = node->parent;
                }

                rotateLeft(root, grandparent);
                swapColors(&(parent->color), &(grandparent->color));
                node = parent;
            }
        }
    }

    (*root)->color = BLACK;
}

struct Node* insert(struct Node* root, int data) {
    struct Node* newNode = createNode(data);
    root = bstInsert(root, newNode);
    fixViolation(&root, newNode);
    return root;
}

void inorderTraversal(struct Node* root) {
    if (root == NULL)
        return;

    inorderTraversal(root->left);
    printf("%d ", root->data);
    inorderTraversal(root->right);
}

int main() {
    struct Node* root = NULL;

    root = insert(root, 7);
    root = insert(root, 3);
    root = insert(root, 18);
    root = insert(root, 10);
    root = insert(root, 22);
    root = insert(root, 8);
    root = insert(root, 11);
    root = insert(root, 26);
    root = insert(root, 2);
    root = insert(root, 6);
    root = insert(root, 13);

    printf("Inorder Traversal: ");
    inorderTraversal(root);
    printf("\n");

    return 0;
}
`