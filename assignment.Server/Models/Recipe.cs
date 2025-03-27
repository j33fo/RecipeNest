namespace assignment.Server.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Ingredients { get; set; } = string.Empty;
        public string Instructions { get; set; } = string.Empty;
        public int CookingTime { get; set; }
        public string Difficulty { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public int ChefId { get; set; }
        public Chef? Chef { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int Likes { get; set; } = 0;
    }
}
