const { Observable, fromEvent, operators, EMPTY} = rxjs;
const {map, switchMap, scan} = operators;

const myButton = document.getElementById('da-button');

const btnClick$ = fromEvent(myButton, 'click');
const mouseMove$ = fromEvent(document, 'mousemove');

const observer = {
  next: (pos) => { 
    myButton.style.top = `${pos.y}px`;
    myButton.style.left = `${pos.x}px`;
  },
  error: (data) => console.error('Error ',data),
  complete: (data) => console.log('done!: ', data)
};

btnClick$.pipe(
  scan(( acc,next ) => ({...acc, ...next, on: !acc.on}), {on: false}),
  map(( acc ) => acc.on),
  switchMap(( isOn ) => isOn ? mouseMove$ : EMPTY),
  map( ({clientX, clientY}) => ({x: clientX, y: clientY}) ),
  ).subscribe(observer);

