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

export default function App() {
  return (
    <main>
      <aside>
        <header>
          <nav className="logo">HolyDays</nav>
          <div className="select-country">
            <img
              src="https://flagsapi.com/NG/flat/24.png"
              alt="Flag of the Federal Republic of Nigeria."
            />
            <select>
              <option>Nigeria</option>
              <option>United States</option>
            </select>
          </div>
        </header>
        <ul className="holiday-list">
          {initialHolidays.map((holiday, idx) => (
            <li key={idx}>
              <h3>{holiday.name}</h3>
              <span>
                {
                  // Convert "2026-01-01" to "January 1"
                  new Intl.DateTimeFormat(undefined, {
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(holiday.date))
                }
              </span>
            </li>
          ))}
        </ul>
      </aside>
      <article>
        <h1>New Year's Day</h1>
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
          <span>
            {
              // Convert "2026-01-01" to "January 1"
              new Intl.DateTimeFormat(undefined, {
                month: 'long',
                day: 'numeric',
              }).format(new Date('2026-01-01'))
            }
          </span>
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
          pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
          tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
          Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
          hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
          per conubia nostra inceptos himenaeos.
        </p>

        {/* https://i.ibb.co/Vszvz7g/new-year.webp */}
        <img
          src="https://i.ibb.co/Vszvz7g/new-year.webp"
          alt="Image: new year"
        />
      </article>
    </main>
  );
}
