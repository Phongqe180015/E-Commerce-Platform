using e_commerce_platform_BE.DataContext;
using e_commerce_platform_BE.Models;
using e_commerce_platform_BE.Repository.Impl;
using Microsoft.EntityFrameworkCore;
using System;

namespace e_commerce_platform_BE.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ProductDbContext _db;
        public ProductRepository(ProductDbContext db) => _db = db;

        public Task<List<Product>> GetAllAsync(CancellationToken ct)
            => _db.Products.OrderByDescending(x => x.Id).ToListAsync(ct);

        public Task<Product?> GetByIdAsync(int id, CancellationToken ct)
            => _db.Products.FirstOrDefaultAsync(x => x.Id == id, ct);

        public async Task AddAsync(Product product, CancellationToken ct)
            => await _db.Products.AddAsync(product, ct);

        public void Remove(Product product) => _db.Products.Remove(product);

        public Task SaveChangesAsync(CancellationToken ct) => _db.SaveChangesAsync(ct);
    }
}
