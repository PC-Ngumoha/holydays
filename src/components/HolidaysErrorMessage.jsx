export default function HolidaysErrorMessage({ countryName }) {
  return (
    <div className="holidays-error-message">
      Unable to load public holidays for {countryName} at this time. Please
      check your internet connection & try again later
    </div>
  );
}
