import ClientError from './ClientError.js';

class DuplicateError extends ClientError {
  constructor(message) {
    super(message, 409);
    this.name = 'DuplicateError';
  }
}

export default DuplicateError;
