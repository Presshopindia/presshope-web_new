import React, { memo, useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { BiPlay, BiTimeFive, BiSupport } from "react-icons/bi";


const Timer = (props) => {

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    function calculateTimeLeft() {
        const targetDate = new Date(props.deadline && props.deadline);
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        if (days >= 1) {
            return {
                days,
                hours,
                minutes
            };
        } else {
            return {
                hours,
                minutes,
                seconds
            };
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div>
            <div className="timeSlots_tiles">
                <label>Time left</label>
                <span className='sm-tiles'><BiTimeFive /> {props.deadline ? (!timeLeft.days ? (!isNaN(timeLeft?.hours) ? timeLeft?.hours + "h:" + timeLeft?.minutes + "m:" + timeLeft?.seconds + "s" : "") : (!isNaN(timeLeft?.days) ? timeLeft?.days + "d:" + timeLeft?.hours + "h:" + timeLeft?.minutes + "m": "")) : " 00 min "}</span>
            </div>
        </div>
    );
};

export default memo(Timer);