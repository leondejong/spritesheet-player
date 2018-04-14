class Sprite {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.frame = 0;
    this.row = 0;
    this.column = 0;
    this.running = false;
    this.options = {};
    this.default();
  }
  default() {
    this.identifier = this.generateId();
    this.container = 'body';
    this.class = 'sprite';
    this.source = 'sprite.png';
    this.rate = 32;
    this.frames = 64;
    this.rows = 8;
    this.columns = 8;
    this.first = 0;
    this.last = 0;
    this.width = 128;
    this.height = 128;
    this.run = true;
    this.loop = true;
    this.reverse = false;
    this.retina = true;
    this.center = false;
  }
  configure(options) {
    this.options = options || {};
    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key];
      }
    }
    this.setup();
  }
  setup() {
    this.container = document.querySelector(this.container);
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', this.identifier);
    this.canvas.setAttribute('class', this.class);
    this.context = this.canvas.getContext('2d');
    this.image = new Image();
    this.image.src = this.source;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    if (this.last === 0) {
      this.last = this.frames;
    }
    if (this.reverse) {
      this.frame = this.last;
    } else {
      this.frame = this.first;
    }
    if (this.retina) {
      this.canvas.style.width = this.width / 2 + 'px';
      this.canvas.style.height = this.height / 2 + 'px';
    } else {
      this.canvas.style.width = this.width + 'px';
      this.canvas.style.height = this.height + 'px';
    }
    if (this.center) {
      this.canvas.style.top = 0;
      this.canvas.style.right = 0;
      this.canvas.style.bottom = 0;
      this.canvas.style.left = 0;
      this.canvas.style.margin = 'auto';
      this.canvas.style.position = 'fixed';
    }
    this.image.onload = () => {
      this.container.appendChild(this.canvas);
      this.context.drawImage(this.image, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
      if (this.run) {
        this.start();
      }
    }
  }
  start() {
    if (!this.running) {
      this.running = true;
      setTimeout(() => {
        if (this.reverse) {
          this.previous();
        } else {
          this.next();
        }
      });
    }
  }
  stop() {
    this.running = false;
  }
  show() {
    this.canvas.style.display = 'block';
    this.start();
  }
  hide() {
    this.canvas.style.display = 'none';
    this.stop();
  }
  next() {
    if (this.running) {
      if (++this.frame > this.last - 1) {
        this.frame = this.first;
        if (!this.loop) {
          this.stop();
        }
      }
      this.shift();
    }
  }
  previous() {
    if (this.running) {
      if (--this.frame < this.first) {
        this.frame = this.last - 1;
        if (!this.loop) {
          this.stop();
        }
      }
      this.shift();
    }
  }
  shift() {
    if (this.running) {
      this.row = Math.floor(this.frame / this.columns);
      this.column = Math.floor(this.frame - this.row * this.columns);
      this.x = this.column * this.width;
      this.y = this.row * this.height;
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.drawImage(this.image, this.x, this.y, this.width, this.height, 0, 0, this.width, this.height);
      if (this.reverse) {
        setTimeout(this.previous.bind(this), 1000 / this.rate);
      } else {
        setTimeout(this.next.bind(this), 1000 / this.rate);
      }
    }
  }
  generateId() {
    return Math.random().toString(36).substr(2, 8);
  }
  dispose() {
    this.stop();
    if (this.canvas.parentNode === this.container) {
      this.container.removeChild(this.canvas);
    }
    for (let member in this) {
      if (this.hasOwnProperty(member)) {
        delete this[member];
      }
    }
  }
}
