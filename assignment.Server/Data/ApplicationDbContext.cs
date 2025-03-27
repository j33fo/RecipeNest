using Microsoft.EntityFrameworkCore;
using assignment.Server.Models;

namespace assignment.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Chef> Chefs { get; set; } = null!;
        public DbSet<Recipe> Recipes { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var seedDate = new DateTime(2024, 3, 27, 0, 0, 0, DateTimeKind.Utc);

            // Seed initial data
            modelBuilder.Entity<Chef>().HasData(
                new Chef
                {
                    Id = 1,
                    Name = "Chef John",
                    Bio = "An experienced chef with a passion for Italian cuisine.",
                    PictureUrl = "https://as1.ftcdn.net/v2/jpg/09/75/08/76/1000_F_975087698_PrQR8CiZQOCDZpzvksP5YRGcDzVTgqEB.jpg",
                    ContactInfo = "chef.john@example.com",
                    Specialty = "Italian Cuisine",
                    Email = "chef.john@example.com",
                    Location = "New York"
                },
                new Chef
                {
                    Id = 2,
                    Name = "Chef Jane",
                    Bio = "A pastry chef known for her delicious desserts.",
                    PictureUrl = "https://imgs.search.brave.com/9zdV4Sb45HXHEd0P3O4Q_wqGfqxpRGKWnogpfaBpaQg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzExLzUxLzY4LzY5/LzM2MF9GXzExNTE2/ODY5NzZfWDFFaGpY/N1E3R2tIUW1LdElV/UmtpVGU5WFlDUXkz/Q1guanBn",
                    ContactInfo = "chef.jane@example.com",
                    Specialty = "Pastry",
                    Email = "chef.jane@example.com",
                    Location = "Los Angeles"
                }
            );

            modelBuilder.Entity<Recipe>().HasData(
                new Recipe
                {
                    Id = 1,
                    Title = "Spaghetti Carbonara",
                    Description = "Classic Italian pasta dish with eggs, cheese, and pancetta",
                    Ingredients = "Spaghetti, eggs, pancetta, Parmesan cheese, black pepper",
                    Instructions = "Cook spaghetti. Fry pancetta. Mix eggs and cheese. Combine all with spaghetti.",
                    CookingTime = 30,
                    Difficulty = "medium",
                    ImageUrl = "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/spaghetti-carbonara-366e331.jpg?quality=90&webp=true&resize=93,84",
                    ChefId = 1,
                    CreatedAt = seedDate,
                    Likes = 0
                },
                new Recipe
                {
                    Id = 2,
                    Title = "Classic Tiramisu",
                    Description = "Traditional Italian dessert with coffee-soaked ladyfingers and mascarpone cream",
                    Ingredients = "Ladyfingers, mascarpone cheese, eggs, sugar, coffee, cocoa powder",
                    Instructions = "Dip ladyfingers in coffee. Layer with mascarpone mixture. Dust with cocoa.",
                    CookingTime = 45,
                    Difficulty = "medium",
                    ImageUrl = "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001515_11-62be4ec.jpg?quality=90&webp=true&resize=300,272",
                    ChefId = 2,
                    CreatedAt = seedDate,
                    Likes = 0
                }
            );
        }
    }
}
