import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const showButton = form.querySelector('button[type="submit"]');

showButton.addEventListener("click", (event) => {
    event.preventDefault();
    const delay = Number(delayInput.value);
    const position = form.elements.state.value;
    
    if (position === "fulfilled") {
        setTimeout(() => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`,
            })
        }, delay);
 // Add 1 second to ensure it's visible
    }
    else {
        setTimeout(() => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
            })
        }, delay);
    }
});
