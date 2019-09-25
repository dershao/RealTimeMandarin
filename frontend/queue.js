// TIL JavaScript doesn't have the Queue or Stack data structure

const Queue = function() {
    this.first = null;
    this.last = null;
    this.size = 0;
};

const Node = function(data) {
    this.data = data;
    this.next = null;
};

Queue.prototype.enqueue = function(data) {
    let node = Node(data);

    // this is the first node enqueued
    if (!this.first && !this.last) {
        this.first = node;
        this.last = node;
    } else {
        this.last.next = node;
        this.last = node;
    }
};

Queue.prototype.dequeue = function() {

  if (this.first) {
      let node = this.first;
      this.first = this.first.next;
      return node;
  } else {
      return null;
  }
};