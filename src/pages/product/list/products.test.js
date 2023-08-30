import { render } from '@testing-library/react'
import fetchMock, { assert } from 'fetch-mock'
import { productServices } from 'lib/apis/product/productServices'
import react from 'react'

test('render', async () => {
  fetchMock.mock('http://example.com', 200);
  const res = await fetch('http://example.com');
  assert(res.ok);
  fetchMock.restore();
})