import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const selector = document.querySelector("#datetime-picker");
let userSelectedDate = null;
const buttonStart = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');


const options = {
  enableTime: true, // Вмикає вибір часу
  time_24hr: true, // Відображає вибір часу в 24-годинному режимі без вибору AM/PM, якщо ввімкнено
  defaultDate: new Date(), // Встановлює початкову вибрану дату (дати)
  minuteIncrement: 1, // Налаштовує крок для введення хвилин (включно з прокручуванням)
  
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      if (userSelectedDate <= new Date()) {
          buttonStart.disabled = true;
          return iziToast.error({title: 'Error', message: 'Please choose a date in the future'});
        } else {
            userSelectedDate = selectedDates[0];
          buttonStart.disabled = false;

          return 
      }
      
    },
};

flatpickr(selector, options)

buttonStart.addEventListener('click', () => {
    buttonStart.disabled = true;
    selector.disabled = true;

    const timerId = setInterval(() => {
        if (!userSelectedDate) {
            return;
        }

        const defaultDate = new Date();
        const diff = userSelectedDate - defaultDate;

        if (diff <= 0) {
            clearInterval(timerId);
            selector.disabled = false;
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(diff);
        daysSpan.textContent = days.toString().padStart(2, '0');
        hoursSpan.textContent = hours.toString().padStart(2, '0');
        minutesSpan.textContent = minutes.toString().padStart(2, '0');
        secondsSpan.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
});


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
