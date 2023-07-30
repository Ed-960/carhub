import { CarProps, FilterProps } from '@/types';
export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, fuel, limit, model } = filters;

  const headers = {
    'X-RapidAPI-Key': '4f618068dbmsh016ca202ea35ff7p1f1f4cjsn2fca70a2505e',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );
  const result = await response.json();
  return result;
}

export const calculateCarRent = (car: CarProps) => {
  const {
    city_mpg,
    combination_mpg,
    cylinders,
    displacement,
    drive,
    fuel_type,
    highway_mpg,
    make,
    model,
    transmission,
    year,
  } = car;

  const basePricePerDay = 50;
  const discountPercent = 0.1;
  const mileageFactor = 0.1;
  const ageFactor = 2;
  const combinationMpgFactor = 0.2;
  const displacementFactor = 0.05;
  const driveTypeFactors: { [key: string]: number } = {
    fwd: 0.8,
    rwd: 1,
    awd: 1.2,
  };

  const fuelTypeFactors: { [key: string]: number } = {
    gas: 1,
    electricity: 0.5,
  };
  const mileageRate = city_mpg * mileageFactor * ageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const combinationMpgRate = combination_mpg * combinationMpgFactor;
  const displacementRate = displacement * displacementFactor;

  const driveTypeFactor = driveTypeFactors[drive.toLowerCase()] || 1;
  const fuelTypeFactor = fuelTypeFactors[fuel_type.toLowerCase()] || 1;

  const ratePerDayWithoutDiscount =
    basePricePerDay +
    mileageRate +
    ageRate +
    combinationMpgRate +
    displacementRate;

  const rentalRatePerDay =
    ratePerDayWithoutDiscount *
    driveTypeFactor *
    fuelTypeFactor *
    (1 - discountPercent);

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');
  const { make, model, year } = car;

  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};
