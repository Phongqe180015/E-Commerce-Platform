using e_commerce_platform_BE.Models;
using Microsoft.EntityFrameworkCore;

namespace e_commerce_platform_BE.DataContext
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
    }
}
