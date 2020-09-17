class Pomodoro {

    advise;
    startButton;
    resetButton;
    breakTimeDisplay;
    breakTime;
    backupBreakTime
    breakTimeButtonAdd;
    breakTimeButtonMinus;
    focusTime;
    backupFocusTime;
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
        this.focusTime = this.backupFocusTime = focusTime;
        this.focusTimeDisplay = document.getElementsByClassName("timer__focus__quantity")[0];
        this.focusTimeDisplay.innerHTML = focusTime;
        this.focusTimeButtonAdd = document.getElementsByClassName("timer__focus__button__more")[0];
        this.focusTimeButtonAdd.onclick = this.showIncrementFocus;
        this.focusTimeButtonMinus = document.getElementsByClassName("timer__focus__button__less")[0];
        this.focusTimeButtonMinus.onclick = this.showDecrementFocus;
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
        this.breakTime = this.backupBreakTime = breakTime;
        this.breakTimeDisplay = document.getElementsByClassName("timer__break__quantity")[0];
        this.breakTimeDisplay.innerHTML = breakTime;
        this.breakTimeButtonAdd = document.getElementsByClassName("timer__break__button__more")[0];
        this.breakTimeButtonAdd.onclick = this.showIncrementBreak;
        this.breakTimeButtonMinus = document.getElementsByClassName("timer__break__button__less")[0];
        this.breakTimeButtonMinus.onclick = this.showDecrementBreak;
    }

    //this funtion serves to make the convertion from minutes to hours and minutes
    assigmentTime = (time) => {
        this.hours = Math.floor(time / 60);
        this.minutes = time % 60;
    }

    // this funtion serves to make countdown
    countdown = () => {
        if ((this.hours != 0) || (this.minutes != 0) || (this.seconds !=0)) {

            if (((this.hours != 0) || (this.minutes != 0)) && (this.seconds != 0)) {
                this.seconds--;
            } else if (((this.hours === 0) && (this.minutes != 0)) || ((this.hours != 0) && (this.minutes != 0))) {
                this.minutes--;
                this.seconds = 59;
            } else if ((this.hours != 0) && (this.minutes === 0)) {
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
            this.display.innerHTML = this.hoursShow + ":" + this.minutesShow + ":" + this.secondsShow;
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
            this.start(this.focusTime);
        } else {
            this.start(this.breakTime);
        }
    }
    
    start = (timeA) => {
        console.log(this.focusTime);
        this.startButton.onclick = this.stop;
        this.startButton.innerHTML = "STOP";
        this.assigmentTime(timeA);
        this.countdown();
        this.settingTime();
        this.show();
        this.timer = setInterval(() => {
            this.countdown();
            this.settingTime();
            this.show();
            if((this.hours === 0) && (this.minutes === 0) && (this.seconds === 0)){
                clearInterval(this.timer);
                console.log(this.status);
                if (this.status){
                    this.status = !(this.status);
                    this.initialize();
                }
            }
        }, 1000);
    }
    
    backup = () => {
        if (this.status){
            this.focusTime = (this.hours * 60) + this.minutes;
        } else {
            this.breakTime = (this.hours * 60) + this.minutes;
        }
    }

    stop = () => {
        this.startButton.innerHTML = "START";
        clearInterval(this.timer);
        this.backup();
        console.log("pase el backup");
        this.startButton.onclick = this.initialize;
    }
    
    reset = () => {
        clearInterval(this.timer);
        [this.focusTime, this.breakTime] = [this.backupFocusTime, this.backupBreakTime];
        console.log(this.focusTime);
        this.seconds = 0;
        this.status = true;
        this.assigmentTime(this.backupFocusTime);
        this.settingTime();
        this.show();
        this.startButton.innerHTML = "START";
        this.advise.style.visibility = "hidden";
        this.startButton.onclick = this.initialize;
    }
    
    //block of call funtions
    showIncrementFocus = () => {
        this.backupFocusTime = this.increment(this.backupFocusTime);
        this.focusTimeDisplay.innerHTML = this.backupFocusTime;
    }
   
    showIncrementBreak = () => {
        this.backupBreakTime = this.increment(this.backupBreakTime);
        this.breakTimeDisplay.innerHTML = this.backupBreakTime;
    }

    showDecrementFocus = () => {
        this.backupFocusTime = this.decrement(this.backupFocusTime);
        this.focusTimeDisplay.innerHTML = this.backupFocusTime;
    }

    showDecrementBreak = () => {
        this.backupBreakTime = this.decrement(this.backupBreakTime);
        this.breakTimeDisplay.innerHTML = this.backupBreakTime;
    }

    //funtions of setting times, for break time and focus time
    increment = (time) => {
        time++;
        return time;
    }

    decrement = (time) => {
        if (time > 0) {
            time--;
        }
        return time;
    }
}

let pomodoro5min = new Pomodoro(75,1);