using e_commerce_platform_BE.Models;

namespace e_commerce_platform_BE.Repository.Impl
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllAsync(CancellationToken ct);
        Task<Product?> GetByIdAsync(int id, CancellationToken ct);
        Task AddAsync(Product product, CancellationToken ct);
        Task SaveChangesAsync(CancellationToken ct);
        void Remove(Product product);
    }
}
