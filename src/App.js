import { useState, useEffect } from 'react';
import Countries from './countries.json';

const initialHolidays = [
  {
    date: '2026-01-01',
    localName: "New Year's Day",
    name: "New Year's Day",
    countryCode: 'NG',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2026-04-03',
    localName: 'Good Friday',
    name: 'Good Friday',
    countryCode: 'NG',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2026-04-06',
    localName: 'Easter Monday',
    name: 'Easter Monday',
    countryCode: 'NG',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2026-05-01',
    localName: "Workers' Day",
    name: "Workers' Day",
    countryCode: 'NG',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2026-05-27',
    localName: "Children's Day",
    name: "Children's Day",
    countryCode: 'NG',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2026-06-12',
    localName: 'Democracy Day',
    name: 'Democracy Day',
    countryCode: 'NG',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2026-10-01',
    localName: 'National Day',
    name: 'National Day',
    countryCode: 'NG',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2026-11-01',
    localName: 'National Youth Day',
    name: 'National Youth Day',
    countryCode: 'NG',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2026-12-25',
    localName: 'Christmas Day',
    name: 'Christmas Day',
    countryCode: 'NG',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2026-12-28',
    localName: 'Boxing Day',
    name: 'Boxing Day',
    countryCode: 'NG',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
];

// UTILITY FUNCTION
function getFormattedDate(dateString) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'long',
    day: '2-digit',
  }).format(new Date(dateString));
}

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
    // console.log(holidayObject);
    setSelectedHoliday(holidayObject);
  }

  // Effect: Load public holiday info on new country selection.
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

          // FIXME: Transform holiday data to include a unique ID for each holiday.
          holidays = holidays.map((holiday, idx) => ({ ...holiday, id: idx }));

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

function SideBar({ children }) {
  return <aside>{children}</aside>;
}

function Logo() {
  return <nav className="logo">HolyDays</nav>;
}

function SelectCountry({ countries, selectedCountry, onSelectCountry }) {
  return (
    <div className="select-country">
      {selectedCountry ? (
        <img
          src={`https://flagsapi.com/${selectedCountry?.countryCode}/flat/24.png`}
          alt={`Flag of ${selectedCountry.country}.`}
        />
      ) : (
        <div />
      )}
      <select value={selectedCountry?.country} onChange={onSelectCountry}>
        <option defaultValue>Select Country</option>
        {countries.map((country) => (
          <option key={country.id} name={country.countryCode}>
            {country.country}
          </option>
        ))}
      </select>
    </div>
  );
}

function HolidaysPlaceholder() {
  return (
    <div className="holidays-placeholder">
      Select a country to see it's public holidays!
    </div>
  );
}

function Loader() {
  return <div className="holidays-placeholder">LOADING ...</div>;
}

function HolidaysErrorMessage({ countryName }) {
  return (
    <div className="holidays-error-message">
      Unable to load public holidays for {countryName} at this time. Please
      check your internet connection & try again later
    </div>
  );
}

function HolidaysList({ holidays, onSelectHoliday, selectedHoliday }) {
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

function MainContent({ holiday, country }) {
  return (
    <article>
      {holiday ? (
        <>
          <header>
            <div className="flag">
              <img
                src={`https://flagsapi.com/${holiday.countryCode}/flat/64.png`}
                alt="Flag of host country."
              />
            </div>
            <h1>{holiday.name}</h1>
            {holiday.name !== holiday.localName && (
              <h2>Local Name: {holiday.localName}</h2>
            )}
            <DateView date={holiday.date} />
          </header>
          {/*Adding a key causes React to destroy and rebuild the component when attached key changes. */}
          <HolidayDescription
            holiday={holiday}
            country={country}
            key={holiday.id}
          />
          <HolidayImage />
        </>
      ) : (
        <ContentPlaceholder />
      )}
    </article>
  );
}

function DateView({ date }) {
  const displayedDate = getFormattedDate(date);

  return (
    <div className="date">
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <path
            d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{' '}
        </g>
      </svg>
      <span>{displayedDate}</span>
    </div>
  );
}

function ContentPlaceholder() {
  return (
    <article className="content-placeholder">
      <svg
        version="1.0"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        width="150px"
        height="150px"
        viewBox="0 0 64 64"
        enable-background="new 0 0 64 64"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <g>
            {' '}
            <path
              fill="#231F20"
              d="M60,4h-7V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H17V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H4 C1.789,4,0,5.789,0,8v52c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V8C64,5.789,62.211,4,60,4z M18,53c0,0.553-0.447,1-1,1h-6 c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M18,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5 c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M18,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6 c0.553,0,1,0.447,1,1V31z M30,53c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M30,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M30,31 c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V31z M42,53c0,0.553-0.447,1-1,1h-6 c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M42,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5 c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M42,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6 c0.553,0,1,0.447,1,1V31z M54,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M54,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V31z M62,15H2V8 c0-1.104,0.896-2,2-2h7v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h30v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h7c1.104,0,2,0.896,2,2V15z"
            ></path>{' '}
          </g>{' '}
        </g>
      </svg>
      <span>Select a country and a public holiday to view.</span>
    </article>
  );
}

function HolidayDescription({ holiday, country }) {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  /* FIXME: Running useEffect hook twice during strict mode causes
     the fetch API to send a GET request to API endpoint causing the
     AI-generated description to change. This creates a bad User Experience.
  */
  useEffect(function () {
    async function fetchDescription() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:8000/countries/${country.country}/holidays/${holiday.name}`
        );
        const data = await response.json();

        // console.log(data);
        setDescription(data.Response);
      } catch (error) {
        // console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDescription();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <HolidayDescriptionErrorMessage
          holidayName={holiday.name}
          countryName={country.country}
        />
      ) : (
        <p>{description}</p>
      )}
    </>
  );
}

function HolidayDescriptionErrorMessage({ holidayName, countryName }) {
  return (
    <div className="holidays-error-message">
      Currently unable to load description of {holidayName} holiday for{' '}
      {countryName}. Please try again.
    </div>
  );
}

function HolidayImage() {
  // https://i.ibb.co/Vszvz7g/new-year.webp

  return (
    <img src="https://i.ibb.co/Vszvz7g/new-year.webp" alt="Image: new year" />
  );
}
