export class DoublyNode<T> {
  public data: T;
  public next: DoublyNode<T> | null;
  public prev: DoublyNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList<T> {
  private head: DoublyNode<T> | null;
  private tail: DoublyNode<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Agregar al inicio
  addFirst(data: T): void {
    const newNode = new DoublyNode(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  // Agregar al final
  addLast(data: T): void {
    const newNode = new DoublyNode(data);
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  // Agregar en posición específica
  addAt(index: number, data: T): boolean {
    if (index < 0 || index > this.size) return false;
    
    if (index === 0) {
      this.addFirst(data);
      return true;
    }
    
    if (index === this.size) {
      this.addLast(data);
      return true;
    }

    const newNode = new DoublyNode(data);
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current!.next;
    }

    newNode.next = current!.next;
    newNode.prev = current;
    current!.next!.prev = newNode;
    current!.next = newNode;
    this.size++;
    return true;
  }

  // Eliminar por índice
  removeAt(index: number): T | null {
    if (index < 0 || index >= this.size || !this.head) return null;

    let current = this.head;
    if (index === 0) {
      this.head = current.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
    } else if (index === this.size - 1) {
      current = this.tail!;
      this.tail = current.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
    } else {
      for (let i = 0; i < index; i++) {
        current = current!.next!;
      }
      current.prev!.next = current.next;
      current.next!.prev = current.prev;
    }

    this.size--;
    return current.data;
  }

  // Obtener por índice
  getAt(index: number): T | null {
    if (index < 0 || index >= this.size) return null;
    
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    return current!.data;
  }

  // Convertir a array
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}