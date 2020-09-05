class Pomodoro {

    startButton;
    resetButton;
    breakTimeDisplay;
    breakTime;
    breakTimeButtonAdd;
    breakTimeButtonMinus;
    focusTime;
    focusTimeDisplay;
    focusTimeButtonAdd;
    focusTimeButtonMinus;
    counter;
    notification;
    timer;
    display;
    counterbackup;
    timer = 5;
    
    constructor(focusTime, breakTime){
        this.focusTime = focusTime;
        this.focusTimeDisplay = document.getElementsByClassName("timer__focus__quantity")[0];
        this.focusTimeDisplay.innerHTML = this.focusTime;
        this.focusTimeButtonAdd = document.getElementsByClassName("timer__focus__button__more")[0];
        this.focusTimeButtonAdd.onclick = this.incrementFocusTime;
        this.focusTimeButtonMinus = document.getElementsByClassName("timer__focus__button__less")[0];
        this.focusTimeButtonMinus.onclick = this.decrementFocusTime;
        this.startButton = document.getElementById("startButton");
        this.startButton.onclick = this.start;
        this.resetButton = document.getElementById("resetButton");
        this.resetButton.onclick = this.reset;
        this.display = document.getElementById("display");
        this.display.innerHTML = this.focusTime;
        this.counterbackup = this.focusTime;
        this.breakTime = breakTime;
        this.breakTimeDisplay = document.getElementsByClassName("timer__break__quantity")[0];
        this.breakTimeDisplay.innerHTML = this.breakTime;
        this.breakTimeButtonAdd = document.getElementsByClassName("timer__break__button__more")[0];
        this.breakTimeButtonAdd.onclick = this.incrementBreakTime;
        this.breakTimeButtonMinus = document.getElementsByClassName("timer__break__button__less")[0];
        this.breakTimeButtonMinus.onclick = this.decrementBreakTime;
        

    }

    start = () => {
        this.counter = this.counterbackup;
        this.display.innerHTML = this.counter;
        this.startButton.innerHTML = "STOP";
        this.startButton.onclick = this.stop;
        this.timer = setInterval(() =>{
            this.counter--;
            if(this.counter === 0){
                clearInterval(this.timer);
                this.startBreakTime();
                console.log("hola mundo");
                setTimeout(() => console.log("hola fervic"),5000);

            }
            this.display.innerHTML = this.counter;
        }, 1000);
        
    }

    reset = () => {
        this.display.innerHTML = this.focusTime;
        this.counterbackup = this.focusTime;
        clearInterval(this.timer);
        this.startButton.innerHTML = "START";
        this.startButton.onclick = this.start;
    }

    stop = () => {
        this.counterbackup = this.counter;
        clearInterval(this.timer);
        this.startButton.onclick = this.start;
        this.startButton.innerHTML = "START";
    }

    incrementBreakTime = () => {
        this.breakTime++;
        this.breakTimeDisplay.innerHTML = this.breakTime;
    }

    decrementBreakTime = () => {
        this.breakTime--;
        this.breakTimeDisplay.innerHTML = this.breakTime;
    }

    incrementFocusTime = () => {
        this.focusTime++;
        this.focusTimeDisplay.innerHTML = this.focusTime;
    }

    decrementFocusTime = () => {
        this.focusTime--;
        this.focusTimeDisplay.innerHTML = this.focusTime;
    }

    startBreakTime = () => {
        console.log("soy startbreak ");
        this.counter = this.counterbackup;
        this.display.innerHTML = this.counter;
        this.startButton.innerHTML = "STOP";
        this.startButton.onclick = this.stop;
        
        this.timer = setInterval(() =>{
            this.counter--;
            if(this.counter === 0){
                clearInterval(this.timer);

            }
            this.display.innerHTML = this.counter;
            console.log("estoy dentro de starbrak");
        }, 4000);
        console.log("fin startbreak");
    }
    
}

let pomodoro5min = new Pomodoro(6,5);