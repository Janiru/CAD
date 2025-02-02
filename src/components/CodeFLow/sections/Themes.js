import React, { useState, useEffect } from 'react'
import SectionTopic from '../SectionTopic'
import SubSectionTopic from '../SubSectionTopic'
import classes from "../../../styles/CodeFLow/Themes.module.css";

let init = false;

const Themes = () => {
    const calculateTimeLeft = () => {
      let year = new Date().getFullYear();
      let difference = +new Date(`02/23/${year}`) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return timeLeft;
    }

	const textColor = "#07253a";
	const pendulamColor = "#07253a";
    const [time, setTime] = useState();
    const [mins, setMins] = useState();
    const [hours, setHours] = useState();
    const [days, setDays] = useState();
    const [eventStarted, setEventStarted] = useState(false);    
    useEffect(() => {
        if (!init){
            init = true;
            const timeLeft = calculateTimeLeft();
            if (timeLeft.days){
                setTime(timeLeft.seconds);
                setHours(timeLeft.hours);
                setMins(timeLeft.minutes);
                setDays(timeLeft.days);
            }
            else {
                setEventStarted(true)
            }
        }
        else if(!eventStarted) {
            const timer = setTimeout(() => {
                    if (days === 0 && hours === 0 && mins === 0 && time === 0){
                        setEventStarted(true);
                    }
                    else {
                        if (hours === 0){
                            if (days > 0) {
                                setDays(curr => curr - 1); 
                                setHours(24);
                            }
                        }
                        if (mins === 0){
                            
                            if (hours > 0) {
                                setHours(curr => curr - 1);
                                setMins(60);
                            }
                        }
                        if (time === 0){
                            if (mins > 0) {setMins(curr => curr - 1); 
                                setTime(60)
                            }
                        }
                        else {
                            setTime(curr => curr - 1);
                        }
                    }
                    
                }, 1000)

              return () => clearTimeout(timer);
        }
      
    }, [eventStarted, days, hours, mins, time]);
  return (
    <section className={classes.Container} id="themes">
    	<SectionTopic
    		title={"Themes"}
    		color={textColor}
    		pendulamColor={pendulamColor}
    	>
                {!eventStarted ? <div className={classes.TimeContainer}>
                <h1>Themes Will Be Revealed In!</h1>
                    <div className={classes.TimeBar}>
                        <div>
                            <p>{ days }</p>
                            <p>Days</p>
                        </div>
                        <div className={classes.Dots}>:</div>
                        <div>
                            <p>{ hours }</p>
                            <p>Hours</p>
                        </div>
                        <div className={classes.Dots}>:</div>
                        <div>
                            <p>{ mins }</p>
                            <p>Mins</p>
                        </div>
                        <div className={classes.Dots}>:</div>
                        <div>
                            <p>{ time }</p>
                            <p>Seconds</p>
                        </div>
                    </div>
                </div> : <
                div className={classes.SubContainer}>
                    <SubSectionTopic 
                        title={"Senior Category"}
                        color={textColor}
                        pendulamColor={pendulamColor}
                    >
                        <ul>
                            <li>Senior Theme ABCDE</li>
                            <li>Senior Theme ABCDE</li>
                            <li>Senior Theme ABCDE</li>
                            <li>Senior Theme ABCDE</li>
                            <li>Senior Theme ABCDE</li>
                        </ul>
                    </SubSectionTopic>
                    <SubSectionTopic 
                        title={"Junior Category"}
                        color={textColor}
                        pendulamColor={pendulamColor}
                    >
                        <ul>
                            <li>Junior Theme ABCDE</li>
                            <li>Junior Theme ABCDE</li>
                            <li>Junior Theme ABCDE</li>
                        </ul>
                    </SubSectionTopic>
                </div>}
    	</SectionTopic>
    </section>
  )
}

export default Themes