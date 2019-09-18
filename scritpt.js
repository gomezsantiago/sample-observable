const { Observable, fromEvent, operators, EMPTY} = rxjs;
const {map, switchMap, takeUntil, take} = operators;

const myButton = document.getElementById('da-button');
var clicked = false;
const btnClick$ = fromEvent(myButton, 'click');
const mouseMove$ = fromEvent(document, 'mousemove');

const observer = {
  next: (pos) => { 
    myButton.style.top = `${pos.y}px`;
    myButton.style.left = `${pos.x}px`;
  },
  complete: () => console.log('done!')
};
btnClick$.pipe(
  map((event) => {
    clicked = !clicked
    console.log(`Button ${clicked? `clicked x-position: ${event.clientX}, y-position: ${event.clientY}` : 'unclicked'}`)
  }),
  switchMap(() => clicked? mouseMove$: EMPTY),
  map((event) => ({x: event.clientX, y: event.clientY})),

).subscribe(observer);

