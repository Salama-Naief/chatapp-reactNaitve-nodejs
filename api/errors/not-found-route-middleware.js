const notFoundRoute = (req, res) => {
  res.status(404).json(`this route is not found `);
};

export default notFoundRoute;
