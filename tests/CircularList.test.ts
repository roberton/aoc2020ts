import CircularList from '../src/lib/CircularList';

describe('CircularList when created', () => {
  it('should have a size of zero', () => {
    const list = new CircularList();
    expect(list.getSize()).toBe(0);
  });
});

describe('CircularList, when adding five elements 32415,', () => {
  let list: CircularList;

  beforeEach(() => {
    list = new CircularList();
    list.push(3);
    list.push(2);
    list.push(4);
    list.push(1);
    list.push(5);
  });

  it('should allow those five elements to be queried, with wrapping (forward)', () => {
    expect(list.getSize()).toBe(5);

    let node = list.getHead();
    expect(node.value).toBe(3);
    node = node.next;
    expect(node.value).toBe(2);
    node = node.next;
    expect(node.value).toBe(4);
    node = node.next;
    expect(node.value).toBe(1);
    node = node.next;
    expect(node.value).toBe(5);
    node = node.next;
    expect(node.value).toBe(3);
  });

  it('should allow those five elements to be queried, with wrapping (backward)', () => {
    expect(list.getSize()).toBe(5);

    let node = list.getHead();
    expect(node.value).toBe(3);
    node = node.previous;
    expect(node.value).toBe(5);
    node = node.previous;
    expect(node.value).toBe(1);
    node = node.previous;
    expect(node.value).toBe(4);
    node = node.previous;
    expect(node.value).toBe(2);
    node = node.previous;
    expect(node.value).toBe(3);
  });

  it('should support searching by value', () => {
    const node = list.find(4);
    expect(node).not.toBe(undefined);
    if (node !== undefined) {
      expect(node.value).toBe(4);
    }
  });

  it('should support searching by value at the "end" of the list', () => {
    const node = list.find(5);
    expect(node).not.toBe(undefined);
    if (node !== undefined) {
      expect(node.value).toBe(5);
    }
  });

  it('should return undefined if searching for value not present', () => {
    expect(list.find(9)).toBe(undefined); // no such value
  });
});

describe('CircularList, removing items', () => {
  let list: CircularList;

  beforeEach(() => {
    list = new CircularList();
    list.push(1);
    list.push(2);
    list.push(3);
    list.push(4);
    list.push(5);
  });

  it('should allow first item to be removed', () => {
    list.remove(list.getHead());
    expect(list.getSize()).toBe(4);
    expect(list.getHead().value).toBe(2);
    expect(list.getHead().next.value).toBe(3);
    expect(list.getHead().previous.value).toBe(5);
  });

  it('should allow middle item to be removed', () => {
    const node = list.find(3);
    expect(node).not.toBe(undefined);
    if (node !== undefined) {
      const previousNode = node.previous;
      const nextNode = node.next;

      expect(list.remove(node)).toBe(3);
      expect(list.getSize()).toBe(4);
      expect(previousNode.next).toBe(nextNode);
      expect(nextNode.previous).toBe(previousNode);
    }
  });

  it('should allow last item to be removed', () => {
    const node = list.find(5);
    expect(node).not.toBe(undefined);

    if (node !== undefined) {
      expect(list.remove(node)).toBe(5);
      expect(list.getSize()).toBe(4);
      expect(list.getHead().value).toBe(1); // shouldn't change
      expect(list.getHead().previous.value).toBe(4); // item before head is new last items
    }
  });
});
