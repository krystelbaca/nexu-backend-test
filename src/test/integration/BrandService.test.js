it('should return a list of brands with status 200 when listBrand resolves', async () => {
  const req = {};
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  const brands = ['Toyota', 'Honda'];
  jest.spyOn(require('../services/BrandService'), 'listBrand').mockResolvedValue(brands);

  await getAllBrands(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    message: 'Successfully retrieved brands',
    brands
  });
});