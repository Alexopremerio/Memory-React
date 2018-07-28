class TimerElapsed {

    constructor(){
       
        
        this.totalTime = 0;
        this.intervalId = '';
    } 
    
    start() {
        this.intervalId = setInterval(this.loop, 1000);
    }

    loop = () => {
        ++this.totalTime;  
    }

    end() {
        clearInterval(this.intervalId);
    }
}

export default TimerElapsed;