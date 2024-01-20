import { useState, useEffect } from "react";

export default function QuestionTimer({timeOut, onTimeout, mode}){

    const [remainingTime, setRemainingTime] = useState(timeOut);

    useEffect(() => {
        console.log("setting Timeout");
        const timer = setTimeout(onTimeout, timeOut);

        return () =>{
            clearTimeout(timer);
        };

    },[onTimeout, timeOut]);

    useEffect(() =>{
        console.log("setting Interval");
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime-100);
        }, 100);

        return () =>{
            clearInterval(interval);
        };

    },[]);

    return (
        <progress id="question-time" max={timeOut} value={remainingTime} className={mode}/>
    );
}