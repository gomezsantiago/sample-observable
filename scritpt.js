const { Observable, fromEvent, operators} = rxjs;
const {map, switchMap, takeUntil, take} = operators;

const myButton = document.getElementById('da-button');
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
    console.log(event)
    console.log(`Button clicked x-position: ${event.clientX}, y-position: ${event.clientY}`)
  }),
  switchMap(() => mouseMove$),
  map((event) => ({x: event.clientX, y: event.clientY})),

).subscribe(observer);

