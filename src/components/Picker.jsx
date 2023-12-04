import { useState } from "react";
import Entry from '@/components/Entry.jsx';


export default function datesPicker() {

    // year init
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);

    const yearsRange = 50;
    const years = [];

    for (let i = 0; i < yearsRange; i++) {
    years.push(currentYear - Math.floor(yearsRange / 2) + i);
    }

    const changeYear = (increment) => {
    const currentIndex = years.indexOf(year);
    const newIndex = (currentIndex + increment + years.length) % years.length;
    setYear(years[newIndex]);
    };

    // month init
    const [month, setMonth] = useState(new Date().getMonth());
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const changeMonth = (increment) => {
        const newMonth = (month + increment + 12) % 12;
        setMonth(newMonth);
    }


    // days init
    const today = new Date();

    const daysInMonth = 32 - new Date(year, month, 32).getDate();

    const daysArray = [];
    let date = 1;
    
    for (let i = 0; date <= daysInMonth; i++) {
        let week = [];
    
        for (let j = 0; j < 7 && date <= daysInMonth; j++) {
            
            const isToday = date === today.getDate() && year === today.getFullYear() && month === today.getMonth();
    
            week.push({
                key: `day-${date}`,
                className: `dates ${isToday ? 'today' : ''}`,
                id: `${year}${month + 1}${date}`,
                content: date
            });
            date++;
        }
        daysArray.push(week);
    }

    // handle day
    const [selectedDate, setSelectedDate] = useState(today.getDate());
    const [lastSelectedDate, setLastSelectedDate] = useState(null);
    const [submittedNotes, setSubmittedNotes] = useState({});
    
    const handleDateClick = (date) => {
        if (date === lastSelectedDate) {
        return;
        }
        setSelectedDate(date);
        setLastSelectedDate(date);
    };


    return (
        <div className="picker">
            <div className="counter1" >
                <button className={`decr ${month === 0 ? 'disabled' : ''}`} onClick={() => changeMonth(-1)} disabled={month === 0} >&lt;</button>
                <p className='month_display'>{monthNames[month]}</p>
                <button className={`incr ${month === 11 ? 'disabled' : ''}`} onClick={() => changeMonth(1)} disabled={month === 11}>&gt;</button>
            </div>
            <div className="counter2" >
                <button className='decr' onClick={() => changeYear(-1)}>&lt;</button>
                <p className='year_display'>{year}</p>
                <button className='incr' onClick={() => changeYear(1)}>&gt;</button>
            </div>
            <div>
                <div className="calendar-body">{daysArray.map((week, i) => (
                        <div key={`week-${i}`} className="week">
                            {week.map(day => (day ? (<div key={day.key}className={`date-box ${day.className}`} id={day.id} onClick={() => handleDateClick(day.content)}
                            style={{
                                    backgroundColor: selectedDate === day.content ? "#D4F4D4" : (today.getDate() === day.content && today.getMonth() === month && today.getFullYear() === year && selectedDate === null) ? "#D4F4D4" : "white"
                                }} >{day.content} <div className="emoji">{submittedNotes[day.id] && "💌"}</div> </div>) : null
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <Entry selectedDate={selectedDate} year={year} month={month} submittedNotes={submittedNotes} setSubmittedNotes={setSubmittedNotes} />
        </div>
    );

}