import { useState, useEffect } from 'react';
import Countries from './countries.json';
import {
  Logo,
  SideBar,
  SelectCountry,
  Loader,
  HolidaysErrorMessage,
  HolidaysPlaceholder,
  HolidaysList,
  MainContent,
} from './components';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [holidays, setHolidays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  function handleSelectCountry(evt) {
    const countryName = evt.target.value;
    const countryObject = Countries.find(
      (country) => country.country === countryName
    );
    setSelectedCountry(countryObject);
  }

  function handleSelectHoliday(id) {
    const holidayObject = holidays.find((holiday) => holiday.id === id);
    setSelectedHoliday(holidayObject);
  }

  useEffect(
    function () {
      async function fetchPublicHolidays() {
        const currentYear = new Date().getFullYear();
        try {
          setIsError(false);
          setIsLoading(true);

          // Error handling: Reset & raise Error is user is currently offline.
          if (!navigator.onLine) {
            setHolidays([]);
            setIsError(true);
            return;
          }

          const resp = await fetch(
            `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/${selectedCountry.countryCode}`
          );
          let holidays = await resp.json();

          // Transform holiday data to include a unique ID for each holiday.
          holidays = holidays.map((holiday, idx) => ({
            ...holiday,
            id: crypto.randomUUID(),
          }));
          // console.log(holidays);
          setHolidays(holidays);
        } finally {
          setIsLoading(false);
        }
      }

      if (selectedCountry) {
        fetchPublicHolidays();
      } else {
        setHolidays([]);
      }
    },
    [selectedCountry]
  );

  return (
    <main>
      <SideBar>
        <header>
          <Logo />
          <SelectCountry
            countries={Countries}
            selectedCountry={selectedCountry}
            onSelectCountry={handleSelectCountry}
          />
        </header>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <HolidaysErrorMessage countryName={selectedCountry.country} />
        ) : holidays.length === 0 ? (
          <HolidaysPlaceholder />
        ) : (
          <HolidaysList
            holidays={holidays}
            onSelectHoliday={handleSelectHoliday}
            selectedHoliday={selectedHoliday}
          />
        )}
      </SideBar>
      <MainContent holiday={selectedHoliday} country={selectedCountry} />
    </main>
  );
}
