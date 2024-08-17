import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import Badge from "@mui/material/Badge";
import { Dayjs } from "dayjs";

interface DatePickerProps {
  onDateChange: (date: Dayjs | null) => void;
  selectedDates?: string[]; // Seçili tarihlerin listesi (optional)
}

const DatePicker: React.FC<DatePickerProps> = ({
  onDateChange,
  selectedDates = [], // Varsayılan değer olarak boş bir dizi
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    onDateChange(date); // Seçilen tarihi üst bileşene iletin
  };

  const CustomPickersDay: React.FC<PickersDayProps<Dayjs>> = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const formattedDate = day.format("YYYY-MM-DD");
    const isSelected = selectedDates.includes(formattedDate);

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={isSelected ? "🌟" : undefined}
      >
        <PickersDay
          {...other}
          day={day}
          outsideCurrentMonth={outsideCurrentMonth}
        />
      </Badge>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate}
        onChange={handleDateChange}
        slots={{
          day: CustomPickersDay,
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
