import { getFormattedDate } from '../utils';

export default function HolidaysList({
  holidays,
  onSelectHoliday,
  selectedHoliday,
}) {
  return (
    <ul className="holiday-list">
      {holidays.map((holiday) => (
        <HolidayCard
          key={holiday.id}
          holiday={holiday}
          onSelectHoliday={onSelectHoliday}
          selectedHoliday={selectedHoliday}
        />
      ))}
    </ul>
  );
}

function HolidayCard({ holiday, onSelectHoliday, selectedHoliday }) {
  const displayedDate = getFormattedDate(holiday.date);

  return (
    <li
      onClick={() => onSelectHoliday(holiday.id)}
      className={selectedHoliday?.id === holiday.id ? 'selected' : ''}
    >
      <h3>{holiday.name}</h3>
      <span>{displayedDate}</span>
    </li>
  );
}
