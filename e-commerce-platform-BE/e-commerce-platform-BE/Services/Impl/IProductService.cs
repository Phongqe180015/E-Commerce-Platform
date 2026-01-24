using e_commerce_platform_BE.DTOs;

namespace e_commerce_platform_BE.Services.Impl
{
    public interface IProductService
    {
        Task<List<ProductResponse>> GetAllAsync(CancellationToken ct);
        Task<ProductResponse?> GetByIdAsync(int id, CancellationToken ct);
        Task<ProductResponse> CreateAsync(ProductCreateRequest req, CancellationToken ct);
        Task<ProductResponse?> UpdateAsync(int id, ProductUpdateRequest req, CancellationToken ct);
        Task<bool> DeleteAsync(int id, CancellationToken ct);
    }
}
