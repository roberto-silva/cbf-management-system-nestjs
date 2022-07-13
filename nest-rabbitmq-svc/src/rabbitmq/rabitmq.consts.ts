// RABBITMQ INFORMATION
export const RABBITMQ_DEFAULT_USER: string = 'admin';
export const RABBITMQ_DEFAULT_PASS: string = 'admin';
export const RABBITMQ_URL: string = `amqp://${RABBITMQ_DEFAULT_USER}:${RABBITMQ_DEFAULT_PASS}@localhost:5672`;
export const RABBITMQ_CHANEL: string = 'messages';
export const RABBITMQ_BODY_RESPONSE: string = 'body';
export const RABBITMQ_HEADERS_RESPONSE: string = 'headers';


// RABBITMQ ERRORS
export const ACKE_ERRORS_DUPLICATE_MESSAGE: string = 'E11000';
