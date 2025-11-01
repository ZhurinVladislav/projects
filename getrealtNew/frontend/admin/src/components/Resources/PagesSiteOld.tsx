'use client';

import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

// Define the Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

// Sample data for demonstration
const initialProducts: Product[] = [
  { id: 1, name: 'Product A', price: 10.99, category: 'Electronics' },
  { id: 2, name: 'Product B', price: 20.49, category: 'Books' },
  { id: 3, name: 'Product C', price: 15.0, category: 'Clothing' },
];

const PagesSite = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<keyof Product>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({ name: '', price: 0, category: '' });

  // Filter and sort products
  const filteredProducts = products
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      // Handle string fields (name, category)
      const aVal = String(a[sortBy]).toLowerCase();
      const bVal = String(b[sortBy]).toLowerCase();
      return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });

  // Handle add new product
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      setProducts([...products, { id: products.length + 1, ...newProduct } as Product]);
      setNewProduct({ name: '', price: 0, category: '' });
      setIsAddModalOpen(false);
    }
  };

  // Handle edit product
  const handleEditProduct = () => {
    if (currentProduct) {
      setProducts(products.map(p => (p.id === currentProduct.id ? { ...p, ...newProduct } : p)));
      setIsEditModalOpen(false);
      setNewProduct({ name: '', price: 0, category: '' });
    }
  };

  // Open edit modal with product data
  const openEditModal = (product: Product) => {
    setCurrentProduct(product);
    setNewProduct({ name: product.name, price: product.price, category: product.category });
    setIsEditModalOpen(true);
  };

  // Handle delete product
  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <>
      <h1 className="title-1">Страницы сайта</h1>

      {/* Search and Sort Controls */}
      <div className="mb-4 flex flex-col justify-between md:flex-row">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="mb-2 rounded border p-2 md:mb-0 md:w-1/3"
        />
        <div className="flex space-x-2">
          <select value={sortBy} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as keyof Product)} className="rounded border p-2">
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="category">Sort by Category</option>
          </select>
          <select value={sortOrder} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortOrder(e.target.value as 'asc' | 'desc')} className="rounded border p-2">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="mt-2 rounded bg-blue-500 p-2 md:mt-0">
          Add New Product
        </button>
      </div>

      {/* Product Table */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">ID</th>
            <th className="border-b px-4 py-2">Name</th>
            <th className="border-b px-4 py-2">Price</th>
            <th className="border-b px-4 py-2">Category</th>
            <th className="border-b px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td className="border-b px-4 py-2">{product.id}</td>
              <td className="border-b px-4 py-2">{product.name}</td>
              <td className="border-b px-4 py-2">${product.price.toFixed(2)}</td>
              <td className="border-b px-4 py-2">{product.category}</td>
              <td className="border-b px-4 py-2">
                <button onClick={() => openEditModal(product)} className="mr-2 rounded bg-yellow-500 px-2 py-1 text-white">
                  Edit
                </button>
                <button onClick={() => handleDeleteProduct(product.id)} className="rounded bg-red-500 px-2 py-1 text-white">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Product Modal */}
      <Transition appear show={isAddModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsAddModalOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="bg-opacity-25 fixed inset-0 bg-black" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Add New Product
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={newProduct.name || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="mb-2 w-full rounded border p-2"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={newProduct.price || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                      className="mb-2 w-full rounded border p-2"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={newProduct.category || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="mb-2 w-full rounded border p-2"
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleAddProduct}
                    >
                      Add Product
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Edit Product Modal */}
      <Transition appear show={isEditModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsEditModalOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="bg-opacity-25 fixed inset-0 bg-black" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Edit Product
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={newProduct.name || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="mb-2 w-full rounded border p-2"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={newProduct.price || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                      className="mb-2 w-full rounded border p-2"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={newProduct.category || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="mb-2 w-full rounded border p-2"
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleEditProduct}
                    >
                      Save Changes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PagesSite;
