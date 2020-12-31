class Node {
  value: number;
  next: Node;
  previous: Node;

  constructor (value: number) {
    this.value = value;
    this.next = this; // temporary
    this.previous = this; // temporary
  }
}

export default class CircularList {
  head: Node;
  tail: Node;
  size: number;

  constructor () {
    const placeholder = new Node(-1);
    this.head = placeholder;
    this.tail = placeholder;
    this.size = 0;
  }

  getSize (): number {
    return this.size;
  }

  getHead (): Node {
    if (this.size > 0) {
      return this.head;
    }
    throw new Error('getHead() called on empty list');
  }

  push (value: number): void {
    const node = new Node(value);
    if (this.size === 0) {
      // first element
      this.head = node;
      this.tail = node;
    }
    node.previous = this.tail;
    this.tail.next = node;
    this.tail = node;
    this.head.previous = this.tail;
    node.next = this.head;
    this.size++;

    // console.log(`push() - size is now ${this.size}`);
    // this._debugEverything();
  }

  insert (value: number, after: Node): Node {
    const node = new Node(value);
    node.previous = after;
    node.next = after.next;
    after.next.previous = node;
    after.next = node;
    this.size++;
    // update head or tail?

    return node;
  }

  // TODO: this is horrendous
  // TODO: throw an exception if can't be found
  find (value: number): Node | undefined {
    let node = this.head;
    if (node.value === value) {
      return node;
    }
    node = node.next;

    while (node !== this.head) {
      if (node.value === value) {
        return node;
      }
      node = node.next;
    }
    return undefined;
  }

  remove (node: Node): number {
    if (this.size <= 1) {
      throw new Error('removing last element from Circular List - not yet supported!');
    }
    if (this.head === node) {
      this.head = node.next;
    }
    if (this.tail === node) {
      this.tail = node.previous;
    }
    node.previous.next = node.next;
    node.next.previous = node.previous;
    this.size--;

    // console.log(`remove() size now ${this.size}`);
    // this._debugEverything();
    return node.value;
  }

  _debugEverything (): void {
    console.log('Going forward >>>');
    let curNode = this.head;
    for (let i = 0; i < this.size; i++) {
      console.log(`${i}: ${curNode.value}`);
      curNode = curNode.next;
    }
    console.log(`wrapping to beginning: ${curNode.value}`);

    console.log('Going backward <<<');
    curNode = this.tail;
    for (let i = this.size; i > 0; i--) {
      console.log(`${i}: ${curNode.value}`);
      curNode = curNode.previous;
    }
    console.log(`wrapping to end: ${curNode.value}`);
  }
}
