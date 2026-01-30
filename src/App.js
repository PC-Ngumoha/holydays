
const initialHolidays = [
  {
    "date": "2026-01-01",
    "localName": "New Year's Day",
    "name": "New Year's Day",
    "countryCode": "NG",
    "fixed": false,
    "global": true,
    "counties": null,
    "launchYear": null,
    "types": [
      "Public"
    ]
  },
  {
    "date": "2026-04-03",
    "localName": "Good Friday",
    "name": "Good Friday",
    "countryCode": "NG",
    "fixed": false,
    "global": true,
    "counties": null,
    "launchYear": null,
    "types": [
      "Public"
    ]
  },
  {
    "date": "2026-04-06",
    "localName": "Easter Monday",
    "name": "Easter Monday",
    "countryCode": "NG",
    "fixed": false,
    "global": true,
    "counties": null,
    "launchYear": null,
    "types": [
      "Public"
    ]
  },
  {
    "date": "2026-05-01",
    "localName": "Workers' Day",
    "name": "Workers' Day",
    "countryCode": "NG",
    "fixed": false,
    "global": true,
    "counties": null,
    "launchYear": null,
    "types": [
      "Public"
    ]
  },
  {
    "date": "2026-05-27",
    "localName": "Children's Day",
    "name": "Children's Day",
    "countryCode": "NG",
    "fixed": false,
    "global": true,
    "counties": null,
    "launchYear": null,
    "types": [
      "Public"
    ]
  },
  {
    "date": "2026-06-12",
    "localName": "Democracy Day",
    "name": "Democracy Day",
    "countryCode": "NG",
    "fixed": false,
    "global": true,
    "counties": null,
    "launchYear": null,
    "types": [
      "Public"
    ]
  },
  {
    "date": "2026-10-01",
    "localName": "National Day",
    "name": "National Day",
    "countryCode": "NG",
    "fixed": false,
    "global": true,
    "counties": null,
    "launchYear": null,
    "types": [
      "Public"
    ]
  },
  {
    "date": "2026-11-01",
    "localName": "National Youth Day",
    "name": "National Youth Day",
    "countryCode": "NG",
    "fixed": false,
    "global": true,
    "counties": null,
    "launchYear": null,
    "types": [
      "Public"
    ]
  },
  {
    "date": "2026-12-25",
    "localName": "Christmas Day",
    "name": "Christmas Day",
    "countryCode": "NG",
    "fixed": false,
    "global": true,
    "counties": null,
    "launchYear": null,
    "types": [
      "Public"
    ]
  },
  {
    "date": "2026-12-28",
    "localName": "Boxing Day",
    "name": "Boxing Day",
    "countryCode": "NG",
    "fixed": false,
    "global": true,
    "counties": null,
    "launchYear": null,
    "types": [
      "Public"
    ]
  }
]


export default function App() {
  return <main>
    <aside>
      <header>
        <nav className="logo">HolyDays</nav>
        <div className="select-country">
          <img src="https://flagsapi.com/US/flat/24.png" alt="Flag of the United states"/>
          <select>
            <option>United States</option>
            <option>Nigeria</option>
          </select>
        </div>
      </header>
      <ul className="holiday-list">

      </ul>
    </aside>
    <article> Main content</article>
  </main>
}