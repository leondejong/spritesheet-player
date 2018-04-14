(function(scope) {
  // Cube spritesheet
  let cube = new Sprite();
  cube.configure({
    container: '.main',
    source: './cube.png',
    rate: 30,
    frames: 30,
    rows: 6,
    columns: 5,
    width: 60,
    height: 60,
    center: true,
  });

  // Example of all the options
  const fullOptionsExample = {
    container: '.main',
    identifier: 'cube',
    class: 'cube',
    source: './cube.png',
    rate: 30,
    frames: 30,
    rows: 6,
    columns: 5,
    first: 0,
    last: 30,
    width: 60,
    height: 60,
    run: true,
    loop: true,
    reverse: false,
    retina: true,
    center: true,
  };
}(window));
