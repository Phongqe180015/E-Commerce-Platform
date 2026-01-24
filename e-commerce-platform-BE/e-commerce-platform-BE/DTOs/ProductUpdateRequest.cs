using System.ComponentModel.DataAnnotations;

namespace e_commerce_platform_BE.DTOs
{
    public class ProductUpdateRequest
    {
        [Required, MaxLength(200)]
        public string Name { get; set; } = null!;

        [Required, MaxLength(4000)]
        public string Description { get; set; } = null!;

        [Required, Range(0.01, 999999999)]
        public decimal Price { get; set; }

        public IFormFile? Image { get; set; }
    }
}
