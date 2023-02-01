// https://rollbar.com/guides/javascript/how-to-throw-exceptions-in-javascript/

export default function RequestException(message) {
    const error = new Error(message);
    return error;
  }
  
  // Função que criar terá o mesmo prototype do Error
  RequestException.prototype = Object.create(Error.prototype);