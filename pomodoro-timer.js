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
    hours;
    minutes;
    seconds;
    status; //this varible serve for locate work flow of code, if it is on "start" or "startBreakTime"
            //too to know what part of code assigmentTime will perform
    
    constructor(focusTime, breakTime){
        this.advise = document.getElementsByClassName("advice")[0];
        this.focusTime = focusTime;
        this.focusTimeDisplay = document.getElementsByClassName("timer__focus__quantity")[0];
        this.focusTimeDisplay.innerHTML = focusTime;
        this.focusTimeButtonAdd = document.getElementsByClassName("timer__focus__button__more")[0];
        this.focusTimeButtonAdd.onclick = this.callIncrementFocus;
        this.focusTimeButtonMinus = document.getElementsByClassName("timer__focus__button__less")[0];
        this.focusTimeButtonMinus.onclick = this.decrementFocusTime;
        this.startButton = document.getElementById("startButton");
        this.startButton.onclick = this.initialize;
        this.resetButton = document.getElementById("resetButton");
        this.resetButton.onclick = this.reset;
        this.display = document.getElementById("display");
        this.display.innerHTML = this.focusTime + ":00";
        this.status = true;
        this.hours = 0;
        this.minutes = focusTime;
        this.seconds = 0;
        this.breakTime = breakTime;
        this.breakTimeDisplay = document.getElementsByClassName("timer__break__quantity")[0];
        this.breakTimeDisplay.innerHTML = breakTime;
        this.breakTimeButtonAdd = document.getElementsByClassName("timer__break__button__more")[0];
        this.breakTimeButtonAdd.onclick = this.callIncrementBreak;
        this.breakTimeButtonMinus = document.getElementsByClassName("timer__break__button__less")[0];
        this.breakTimeButtonMinus.onclick = this.decrementBreakTime;
    }

    //this funtion serves to make the convertion from minutes to hours and minutes
    assigmentTime = (time) => {
        this.hours = Math.floor(time / 60);
        this.minutes = time % 60;
        this.seconds = 0;
    }

    // this funtion serves to make countdown
    countdown = () => {
        if ((this.hours != 0) || (this.minutes != 0) || (this.seconds !=0)) { 
            if ((this.hours === 0) && (this.minutes === 0)){
                this.seconds--;
            } else if ((this.hours === 0) && (this.seconds === 0)) {
                this.minutes--;
                this.seconds = 59;
            } else if ((this.minutes === 0) && (this.seconds === 0)) {
                this.hours--;
                this.minutes = 59;
                this.seconds = 59;
            } else {
                this.seconds--;
            }
        }
    }

    settingTime = () => {
        this.hoursShow = this.hours;
        this.minutesShow = this.minutes;
        this.secondsShow = this.seconds;
        //set the times before showing them
        if (this.hoursShow < 10) {this.hoursShow = "0" + this.hours;}
        if ((this.minutesShow < 10) && (this.hours > 0)) {this.minutesShow = "0" + this.minutes;}
        if (this.secondsShow < 10) {this.secondsShow = "0" + this.seconds;}
    }

    //this funtion serves to show countdown on the screen
    show = () => {
        if (this.hours > 0){
            this.display.innerHTML = this.hoursShow + ":" + this.minutesShow + ":" + this.minutesShow;
        } else {
            this.display.innerHTML = this.minutesShow + ":" + this.secondsShow;
        }
        if (this.status) {
            this.advise.style.visibility = "hidden";
        } else {
            this.advise.style.visibility = "visible";
        }
    }
















    initialize = () => {
        if(this.status) {
            this.start(this.focusTime, this.breakTime);
        } else {
            this.start(this.breakTime, this.focusTime);
        }
    }
    


















    
    start = (timeA, timeB) => {
        this.startButton.innerHTML = "STOP";
        this.startButton.onclick = this.stop;
        console.log("empeze start");
        this.assigmentTime(timeA);
        this.countdown();
        this.settingTime();
        this.show();
        console.log("antes de entrar al bucle");
        this.timer = setInterval(() => {
            console.log("soy start dentro de setInterval");
            this.settingTime();
            this.countdown();
            this.show();
            if((this.hours === 0) && (this.minutes === 0) && (this.seconds === 0)){
                clearInterval(this.timer);
                this.status = !(this.status);
                this.start(timeB, timeA);
            }
        }, 5000);
    }







    
    
    
    
    
    
    
    
    
    
    stop = () => {
        this.startButton.innerHTML = "START";
        if (this.status) {
            clearInterval(this.timer);
            this.startButton.onclick = this.start;
        } else {
            this.startButton.onclick = this.startBreakTime;
        }
    }
    
    reset = () => {
        clearInterval(this.timer);
        this.status = true;
        this.assigmentTime();
        this.show();
        this.startButton.innerHTML = "START";
        this.advise.style.visibility = "hidden";
        this.startButton.onclick = this.start;
    }
    
    //block of call funtions
    callIncrementFocus = () => {
        this.increment(this.focusTime, this.focusTimeDisplay);
    }
   
    callIncrementBreak = () => {
        this.increment(this.breakTime, this.breakTimeDisplay);
    }

    callDecrementFocus = () => {
        this.decremet(this.focusTime, this.focusTimeDisplay);
    }

    callDecrementBreak = () => {
        this.decremet(this.breakTime, this.breakTimeDisplay);
    }
    //000000000000000000000000000000000000000000000000000000000

    //funtions of setting times, for break time and focus time
    increment = (time, side) => {
        time++;
        side.innerHTML = time;
    }

    decrement = (time, side) => {
        if (time > 0) {
            time--;
            side.innerHTML = time;
        }
    }
    //000000000000000000000000000000000000000000000000000000000
}

let pomodoro5min = new Pomodoro(1,1);