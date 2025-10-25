const BASE_URL = 'https://fakestoreapi.com';

async function parseJsonSafe(response) {
  try {
    const text = await response.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// Get all products
export async function getAllProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      cache: 'no-store', // always fetch fresh data
    });
    if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
    const data = await parseJsonSafe(res);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Error fetching all products:', err);
    return [];
  }
}

// Get single product by ID
export async function getProductById(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Failed to fetch product ${id} (${res.status})`);
    const data = await parseJsonSafe(res);
    return data || null;
  } catch (err) {
    console.error(`Error fetching product ${id}:`, err);
    return null;
  }
}

// Get all categories
export async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/products/categories`, {
      cache: 'force-cache',
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await parseJsonSafe(res);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
}

// Get products by category
export async function getProductsByCategory(category) {
  try {
    const res = await fetch(`${BASE_URL}/products/category/${category}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Failed to fetch products for ${category}`);
    const data = await parseJsonSafe(res);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(`Error fetching products for ${category}:`, err);
    return [];
  }
}
