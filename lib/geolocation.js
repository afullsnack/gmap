// navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

// navigator.geolocation.getCurrentPosition();

export function getCurrentPosition() {
  return navigator.geolocation.getCurrentPosition(getPos, onPosError, {
    enableHighAccuracy: true,
    maximumAge: 10000,
  });
}

const getPos = (position) => {
  const { longitude, latitude } = position;

  return { longitude, latitude };
};

const onPosError = (error) => {
  console.error(error);
  throw error;
};
