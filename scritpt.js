const { Observable, fromEvent, operators, EMPTY} = rxjs;
const {map, switchMap, takeUntil, take, scan, tap} = operators;

var clicked = false;
const myButton = document.getElementById('da-button');
const myInput = document.getElementById('da-input');

const btnClick$ = fromEvent(myButton, 'click');
const input$ = fromEvent(myInput, 'input');
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
  tap(() => {
    clicked = !clicked
  }),
  switchMap(() => (clicked ? mouseMove$ : EMPTY)),
  map(({clientX, clientY}) => { return {x: clientX, y: clientY}}),

).subscribe(observer);

input$.pipe(
  scan(((acc, {data}) => (data == null ? '': acc+data)),'')
).subscribe((inputText)=> {
  myInput.value = inputText;
  myButton.textContent = inputText.trim() ? inputText:'Click Me';
})
