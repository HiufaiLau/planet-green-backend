// pass the product model
export const advancedResults = (model) => async (req, res, next) => {
  let query;

  const requestQuery = { ...req.query };
  const removeFields = ['sort', 'category'];
  removeFields.forEach((param) => delete requestQuery[param]);

  query = model.find({
    $and: [
      {
        name: new RegExp(requestQuery['name'], 'i'),
      },
    ],
  });

  query = req.query.sort ? createSort(req, query) : query;

  const results = await query;

  res.advancedResults = {
    success: true,
    count: results.length,
    data: results,
  };
  next();
};

const createSort = (req, query) => {
  const sortBy = req.query.sort.split(',').join(' ');
  query = query.sort(sortBy);
  return query;
};
