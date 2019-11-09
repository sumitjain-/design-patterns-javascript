setHeading('Proxy Pattern');

function fakeAPICall(url) {
  return new Promise((resolve, reject) => {
    const responseTime = 500 + Math.floor(Math.random() * 2000);
    setTimeout(() => {
      resolve({ data: {} });
    }, responseTime);
  });
}

function APIService({ APIEndpoint }) {
  const apiLog = [];

  function createBaseLogObject(path, params, options = {}) {
    return {
      ts: Date.now(),
      path,
      params,
      authenticated: !!options.authenticated,
    };
  }

  this.authenticatedRequest = async (path, params) => {
    const logObject = createBaseLogObject(path, params, { authenticated: true });

    // make api call
    const response = await fakeAPICall(`${APIEndpoint}${path}`);
    logObject.responseTime = Date.now() - logObject.ts;
    logObject.response = response;

    apiLog.push(logObject);

    return response;
  }
  
  this.unauthenticatedRequest = async (path, params) => {
    const logObject = createBaseLogObject(path, params);

    // make api call
    const response = await fakeAPICall(`${APIEndpoint}${path}`);
    logObject.responseTime = Date.now() - logObject.ts;
    logObject.response = response;

    apiLog.push(logObject);

    return response;
  }

  this.publishAPIlog = () => {
    console.log(apiLog);
  }
}

const bookingsAPI = new APIService({ APIEndpoint: 'https://api.airbnb.com/bookings' });

bookingsAPI.authenticatedRequest('/get/5');
bookingsAPI.unauthenticatedRequest('/get/all/dec-2019');

const roomsAPI = new APIService({ APIEndpoint: 'https://api.airbnb.com/rooms' });

roomsAPI.unauthenticatedRequest('/location/goa/dec-2019');


bookingsAPI.publishAPIlog();
roomsAPI.publishAPIlog();