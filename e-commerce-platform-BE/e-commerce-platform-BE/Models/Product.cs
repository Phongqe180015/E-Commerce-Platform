using System.ComponentModel.DataAnnotations;

namespace e_commerce_platform_BE.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(40, ErrorMessage ="MaxLength must 40")]
        public string Name { get; set; }
        [Required,MaxLength(200, ErrorMessage = "MaxLength must 200")]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }    
    }
}
