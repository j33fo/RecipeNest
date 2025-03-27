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

        public DbSet<Chef> Chefs { get; set; } =null!;
        public DbSet<Recipe> Recipes { get; set; } = null!; 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed initial data
            modelBuilder.Entity<Chef>().HasData(
                new Chef
                {
                    Id = 1,
                    Name = "Chef John",
                    Bio = "An experienced chef with a passion for Italian cuisine.",
                    PictureUrl = "https://example.com/chef-john.jpg",
                    ContactInfo = "chef.john@example.com"
                },
                new Chef
                {
                    Id = 2,
                    Name = "Chef Jane",
                    Bio = "A pastry chef known for her delicious desserts.",
                    PictureUrl = "https://example.com/chef-jane.jpg",
                    ContactInfo = "chef.jane@example.com"
                }
            );

            modelBuilder.Entity<Recipe>().HasData(
                new Recipe
                {
                    Id = 1,
                    Title = "Spaghetti Carbonara",
                    Ingredients = "Spaghetti, eggs, pancetta, Parmesan cheese, black pepper",
                    Instructions = "Cook spaghetti. Fry pancetta. Mix eggs and cheese. Combine all with spaghetti.",
                    ChefId = 1 // Set the foreign key value
                },
                new Recipe
                {
                    Id = 2,
                    Title = "Tiramisu",
                    Ingredients = "Ladyfingers, mascarpone cheese, coffee, cocoa powder, sugar, eggs",
                    Instructions = "Layer ladyfingers soaked in coffee with mascarpone mixture. Dust with cocoa powder.",
                    ChefId = 2 // Set the foreign key value
                }
            );
        }
    }
}
