import DateTimeDisplay from "./DateTimeDisplay";

export const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="show-counter">
                <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
        </div>
    );
};