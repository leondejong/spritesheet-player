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
    if (this.retina) {
      this.width /= 2;
      this.height /= 2;
    }
    if (this.last === 0) {
      this.last = this.frames;
    }
    if (this.reverse) {
      this.frame = this.last;
    } else {
      this.frame = this.first;
    }
    this.container = document.querySelector(this.container);
    this.element = document.createElement('div');
    this.element.setAttribute('id', this.identifier);
    this.element.setAttribute('class', this.class);
    if (this.center) {
      this.element.style.top = 0;
      this.element.style.right = 0;
      this.element.style.bottom = 0;
      this.element.style.left = 0;
      this.element.style.margin = 'auto';
      this.element.style.position = 'fixed';
    }
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.overflow = 'hidden';
    this.element.style.backgroundImage = 'url(' + this.source + ')';
    this.element.style.backgroundSize = this.width * this.columns + 'px ' + this.height * this.rows + 'px';
    this.container.appendChild(this.element);
    if (this.run) {
      this.start();
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
    this.element.style.display = 'block';
    this.start();
  }
  hide() {
    this.element.style.display = 'none';
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
      this.x = this.column * -this.width;
      this.y = this.row * -this.height;
      const position = this.x + 'px ' + this.y + 'px';
      this.element.style.backgroundPosition = position;
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
    if (this.element.parentNode === this.container) {
      this.container.removeChild(this.element);
    }
    for (let member in this) {
      if (this.hasOwnProperty(member)) {
        delete this[member];
      }
    }
  }
}
