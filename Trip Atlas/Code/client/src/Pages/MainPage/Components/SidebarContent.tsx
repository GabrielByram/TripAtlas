import { useState, useEffect } from "react";
import { Row, Label } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IProps {
    setSelectedMonth: Function;
};

function SideBarContent(props: IProps) {
    const [selectedDate, setselectedDate] = useState<Date | undefined | null>(null);

    useEffect(() => {
        if (selectedDate) {
            console.log(selectedDate.getMonth())
            props.setSelectedMonth(selectedDate.getMonth() + 1);
        }
      }, [selectedDate]);

    return (
        <div>
            <Row>
                <Label>
                    When will your trip be?
                </Label>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setselectedDate(date)}
                    showMonthYearPicker
                    dateFormat="MM/yyyy"
                    placeholderText="Select month"
                />
            </Row>
        </div>
    )
}

export default SideBarContent