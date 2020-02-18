import React, { useState, useEffect, useCallback } from 'react';

// Usage
function LocationRequest (props) {
  const { execute, pending, value, error } = useAsync(getCurrentLocation, false);
    
  return (
    // <div>
    //   {value && <div>{value}</div>}
    //   {error && <div>{error}</div>}
    //   <button onClick={execute} disabled={pending}>
    //     {!pending ? 'Click me' : 'Loading...'}
    //   </button>
    // </div>
    value
  );
}

// An async function for testing our hook.
// Will be successful 50% of the time.
const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var currentLocation = {}
            if (navigator && navigator.geolocation){
                navigator.geolocation.getCurrentPosition(pos => {
                    var coords = pos.coords;
                        currentLocation = {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    console.dir(currentLocation)                       
                });
            }currentLocation ?
            resolve(currentLocation) :
            reject(false);

            // console.log(`Curr location ${currentLocation},${currentLocation.lat},${currentLocation.lng}`)
            
        }, 2000);
    });
};

// Hook
const useAsync = (asyncFunction, immediate = true) => {
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setPending(true);
    setValue(null);
    setError(null);
    return asyncFunction()
      .then(response => setValue(response))
      .catch(error => setError(error))
      .finally(() => setPending(false));
  }, [asyncFunction]);

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, pending, value, error };
};

export default LocationRequest();