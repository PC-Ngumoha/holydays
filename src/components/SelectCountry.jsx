export default function SelectCountry({
  countries,
  selectedCountry,
  onSelectCountry,
}) {
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
