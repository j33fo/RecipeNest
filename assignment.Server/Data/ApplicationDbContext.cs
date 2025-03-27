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
                    PictureUrl = "https://example.com/chef-john.jpg",
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
                    PictureUrl = "https://example.com/chef-jane.jpg",
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
                    ImageUrl = "https://example.com/carbonara.jpg",
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
                    ImageUrl = "https://example.com/tiramisu.jpg",
                    ChefId = 2,
                    CreatedAt = seedDate,
                    Likes = 0
                }
            );
        }
    }
}
