import { useState, useEffect } from 'react';
import Loader from './Loader';
import HolidaysErrorMessage from './HolidaysErrorMessage';

export default function HolidayDetails({ holiday, country }) {
  const [description, setDescription] = useState('');
  const [imageData, setImageData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  /* FIXME: Running useEffect hook twice during strict mode causes
     the fetch API to send a GET request to API endpoint causing the
     AI-generated description to change. This creates a bad User Experience.
  */
  useEffect(function () {
    const descriptionURL = `http://localhost:8000/countries/${country.country}/holidays/${holiday.name}`;
    const imageURL = `http://localhost:8000/image/countries/${country.country}/holidays/${holiday.name}`;

    async function fetchDetails() {
      try {
        setIsError(false);
        setIsLoading(true);

        let response, data;

        response = await fetch(descriptionURL);
        data = await response.json();
        setDescription(data.Response);

        response = await fetch(imageURL);
        data = await response.json();
        setImageData(data.results.at(0));
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <HolidaysErrorMessage />
      ) : (
        <>
          <Description description={description} />
          <DisplayImage imageData={imageData} />
        </>
      )}
    </>
  );
}

function Description({ description }) {
  return <p>{description}</p>;
}

function DisplayImage({ imageData }) {
  // https://i.ibb.co/Vszvz7g/new-year.webp

  return (
    <figure>
      <img src={imageData?.urls?.regular} alt={imageData?.slug} />
      <figcaption>
        Photo by{' '}
        <a
          href={`https://unsplash.com/@${imageData?.user?.username}?utm_source=HolyDays&utm_medium=referral`}
        >
          {imageData?.user?.name}
        </a>{' '}
        on{' '}
        <a href="https://unsplash.com/?utm_source=HolyDays&utm_medium=referral">
          Unsplash
        </a>
      </figcaption>
    </figure>
  );
}
