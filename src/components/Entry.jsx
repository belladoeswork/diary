import { useState, useEffect } from "react";

export default function diaryEntry({ selectedDate, year, month, submittedNotes, setSubmittedNotes }) {

    const [text, setText] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [emoji, setEmoji] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setText(submittedNotes[`${year}${month + 1}${selectedDate}`] || "");
        setIsSubmitted(!!submittedNotes[`${year}${month + 1}${selectedDate}`]);setIsEditing(false);
    }, [selectedDate, year, month]);

    const handleSubmit = () => {
        console.log("Note submitted:", text);

        setSubmittedNotes((prevNotes) => ({...prevNotes,
        [`${year}${month + 1}${selectedDate}`]: text,
      }));
      setEmoji("💌");
      setIsSubmitted(true);
      setIsEditing(false);
    };

    // edit / delete options
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDelete = () => {
        setSubmittedNotes((prevNotes) => {
            const updatedNotes = { ...prevNotes };
            delete updatedNotes[`${year}${month + 1}${selectedDate}`];
            return updatedNotes;
        });

        setText("");
        setIsSubmitted(false);
        setIsEditing(false);
    };

    // save editted notes
    const handleSave = () => {
        setSubmittedNotes((prevNotes) => ({
            ...prevNotes,
            [`${year}${month + 1}${selectedDate}`]: text,
        }));
        setIsSubmitted(true);
        setIsEditing(false);
    };


    return (
        <div>
            <div className={`notes ${isSubmitted ? 'submitted' : ''}`} >
                <input  
                className={`typeme ${isSubmitted ? 'submitted' : ''}`} type="text" 
                placeholder={isSubmitted ? text : "What's on your mind?"} onChange={(e) => setText(e.target.value)} 
                value={text}
                disabled={isSubmitted && !isEditing}  
                style={{ backgroundColor: isSubmitted ? '#D4F4D4' : '' }}     
                />
            </div>
            {!isSubmitted && !submittedNotes[`${year}${month + 1}${selectedDate}`] && (
            <div className="sub">
                <button className='submit' onClick={handleSubmit} >Submit</button>
            </div>
            )}
            {isSubmitted && (
                <div className="sub2">
                    <p className='edit' onClick={handleEdit}>✎</p>
                    <p className='delete' onClick={handleDelete}>🗑️</p>
                    {isEditing && (
                        <p className='save' onClick={handleSave}>💾</p>
                    )}
                </div>
            )}
           
        </div>
    );
}
