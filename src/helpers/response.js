const response = ({
  statusCode, status, message, data, res,
}) => res.status(statusCode).json({
  status,
  message,
  data,
});

export default response;
