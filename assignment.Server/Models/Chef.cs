using System.Collections.Generic;

namespace assignment.Server.Models
{
    public class Chef
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string PictureUrl { get; set; } = string.Empty;
        public string ContactInfo { get; set; } = string.Empty;
        public string Specialty { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
    }
}
