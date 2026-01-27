
using e_commerce_platform_BE.DataContext;
using Microsoft.EntityFrameworkCore;

namespace e_commerce_platform_BE
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<ProductDbContext>(options =>
            {
                var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
                    ?? Environment.GetEnvironmentVariable("DATABASE_URL");
                
                // Log for debugging (remove in production)
                Console.WriteLine($"Connection String Length: {connectionString?.Length ?? 0}");
                Console.WriteLine($"Connection String Ends With: {connectionString?.Substring(Math.Max(0, connectionString.Length - 20))}");
                
                options.UseNpgsql(connectionString);
            });

            // Register repositories and services
            builder.Services.AddScoped<e_commerce_platform_BE.Repository.Impl.IProductRepository, e_commerce_platform_BE.Repository.ProductRepository>();
            builder.Services.AddScoped<e_commerce_platform_BE.Services.Impl.IProductService, e_commerce_platform_BE.Services.ProductService>();

            // Add CORS for frontend
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Auto-apply migrations on startup (for production deployment)
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<ProductDbContext>();
                db.Database.Migrate();
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowFrontend");

            app.UseAuthorization();

            app.UseStaticFiles();
            app.MapControllers();

            app.Run();
        }
    }
}
