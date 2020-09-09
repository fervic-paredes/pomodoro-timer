class Pomodoro {

    advise;
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
    timer;
    display;
    counterbackup;
    timer = 5;
    minutes;
    minutesbackup;
    seconds;
    secondsbackup;
    status;
    
    constructor(focusTime, breakTime){
        this.advise = document.getElementsByClassName("advice")[0];
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
        this.display.innerHTML = this.focusTime + ":00";
        this.minutes = focusTime;
        this.minutesbackup = focusTime;
        this.seconds = 0;
        this.breakTime = breakTime;
        this.breakTimeDisplay = document.getElementsByClassName("timer__break__quantity")[0];
        this.breakTimeDisplay.innerHTML = this.breakTime;
        this.breakTimeButtonAdd = document.getElementsByClassName("timer__break__button__more")[0];
        this.breakTimeButtonAdd.onclick = this.incrementBreakTime;
        this.breakTimeButtonMinus = document.getElementsByClassName("timer__break__button__less")[0];
        this.breakTimeButtonMinus.onclick = this.decrementBreakTime;
        
        
    }
    
    convert = () => {
        if ((this.minutes != 0) || (this.seconds != 0)){
            if (this.seconds === 0){
                this.minutes--;
                this.seconds = 59;
            } else {
                this.seconds--;
            }
            
        }
    }
    
    start = () => {
        this.status = true;
        this.minutes = this.minutesbackup;
        this.display.innerHTML = this.minutes + ":" + this.seconds;
        this.startButton.innerHTML = "STOP";
        this.startButton.onclick = this.stop;
        this.timer = setInterval(() => {
            this.convert();

            if((this.minutes === 0) && (this.seconds === 0)){
                clearInterval(this.timer);
                this.advise.style.visibility = "visible";
                this.startBreakTime();
            }
            this.display.innerHTML = this.minutes + ":" + this.seconds;
        }, 1000);
        
    }

    startBreakTime = () => {
        this.status = false;
        this.minutes = this.breakTime;
        this.display.innerHTML = this.minutes + ":00";
        this.startButton.onclick = this.stop;
        this.timer = setInterval(() =>{
            this.convert();

            if((this.minutes === 0) && (this.seconds === 0)){
                clearInterval(this.timer);
                this.minutesbackup = this.focusTime;
                this.startButton.innerHTML = "START";
                this.startButton.onclick = this.start;
            }
            this.display.innerHTML = this.minutes + ":" + this.seconds;
        }, 1000);
    }
    
    reset = () => {
        this.display.innerHTML = this.focusTime;
        this.counterbackup = this.focusTime;
        clearInterval(this.timer);
        this.startButton.innerHTML = "START";
        this.advise.style.visibility = "hidden";
        this.startButton.onclick = this.start;
    }

    stop = () => {
        this.minutesbackup = this.minutes;
        this.secondsbackup = this.seconds;
        clearInterval(this.timer);
        if (status) {
            this.startButton.onclick = this.start;
        } else {
            this.startButton.onclick = this.startBreakTime;
        }
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
        this.counterbackup = this.focusTime;
        this.focusTimeDisplay.innerHTML = this.focusTime;
    }

    decrementFocusTime = () => {
        this.focusTime--;
        this.counterbackup = this.focusTime;
        this.focusTimeDisplay.innerHTML = this.focusTime;
    }

    
}

let pomodoro5min = new Pomodoro(1,1);