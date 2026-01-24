using e_commerce_platform_BE.DTOs;
using e_commerce_platform_BE.Models;
using e_commerce_platform_BE.Repository.Impl;
using e_commerce_platform_BE.Services.Impl;

namespace e_commerce_platform_BE.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repo;
        private readonly IWebHostEnvironment _env;

        public ProductService(IProductRepository repo, IWebHostEnvironment env)
        {
            _repo = repo;
            _env = env;
        }

        public async Task<List<ProductResponse>> GetAllAsync(CancellationToken ct)
            => (await _repo.GetAllAsync(ct)).Select(ToResponse).ToList();

        public async Task<ProductResponse?> GetByIdAsync(int id, CancellationToken ct)
        {
            var p = await _repo.GetByIdAsync(id, ct);
            return p is null ? null : ToResponse(p);
        }

        public async Task<ProductResponse> CreateAsync(ProductCreateRequest req, CancellationToken ct)
        {

            var imageUrl = await ResolveImageUrlAsync(req.Image, ct);

            var product = new Product
            {
                Name = req.Name.Trim(),
                Description = req.Description.Trim(),
                Price = req.Price,
                ImageUrl = imageUrl
            };

            await _repo.AddAsync(product, ct);
            await _repo.SaveChangesAsync(ct);
            return ToResponse(product);
        }

        public async Task<ProductResponse?> UpdateAsync(int id, ProductUpdateRequest req, CancellationToken ct)
        {
            var product = await _repo.GetByIdAsync(id, ct);
            if (product is null) return null;

            var imageUrl = await ResolveImageUrlAsync(req.Image, ct);

            product.Name = req.Name.Trim();
            product.Description = req.Description.Trim();
            product.Price = req.Price;
            
            // Only update image if new image is provided
            if (imageUrl != null)
                product.ImageUrl = imageUrl;

            await _repo.SaveChangesAsync(ct);
            return ToResponse(product);
        }

        public async Task<bool> DeleteAsync(int id, CancellationToken ct)
        {
            var product = await _repo.GetByIdAsync(id, ct);
            if (product is null) return false;

            _repo.Remove(product);
            await _repo.SaveChangesAsync(ct);
            return true;
        }

        private static ProductResponse ToResponse(Product p) => new()
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            ImageUrl = p.ImageUrl
        };

        private async Task<string?> ResolveImageUrlAsync(IFormFile? imageFile, CancellationToken ct)
        {
            // If no image file provided, return null
            if (imageFile == null)
                return null;

            // Lưu local: wwwroot/uploads/...
            var uploadsDir = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads");
            Directory.CreateDirectory(uploadsDir);

            var ext = Path.GetExtension(imageFile.FileName);
            var fileName = $"{Guid.NewGuid():N}{ext}";
            var absPath = Path.Combine(uploadsDir, fileName);

            await using var stream = File.Create(absPath);
            await imageFile.CopyToAsync(stream, ct);

            // URL public
            return $"/uploads/{fileName}";
        }
    }
}
