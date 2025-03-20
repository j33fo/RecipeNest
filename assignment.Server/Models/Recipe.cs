namespace assignment.Server.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Ingredients { get; set; } = string.Empty;
        public string Instructions { get; set; } = string.Empty;
        public int ChefId { get; set; }
        public Chef Chef { get; set; } = new Chef();
    }
}
