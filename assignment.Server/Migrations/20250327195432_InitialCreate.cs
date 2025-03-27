using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace assignment.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Chefs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Bio = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PictureUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactInfo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Specialty = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chefs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ingredients = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Instructions = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CookingTime = table.Column<int>(type: "int", nullable: false),
                    Difficulty = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ChefId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Likes = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Recipes_Chefs_ChefId",
                        column: x => x.ChefId,
                        principalTable: "Chefs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Chefs",
                columns: new[] { "Id", "Bio", "ContactInfo", "Email", "Location", "Name", "PictureUrl", "Specialty" },
                values: new object[,]
                {
                    { 1, "An experienced chef with a passion for Italian cuisine.", "chef.john@example.com", "chef.john@example.com", "New York", "Chef John", "https://example.com/chef-john.jpg", "Italian Cuisine" },
                    { 2, "A pastry chef known for her delicious desserts.", "chef.jane@example.com", "chef.jane@example.com", "Los Angeles", "Chef Jane", "https://example.com/chef-jane.jpg", "Pastry" }
                });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "ChefId", "CookingTime", "CreatedAt", "Description", "Difficulty", "ImageUrl", "Ingredients", "Instructions", "Likes", "Title" },
                values: new object[,]
                {
                    { 1, 1, 30, new DateTime(2024, 3, 27, 0, 0, 0, 0, DateTimeKind.Utc), "Classic Italian pasta dish with eggs, cheese, and pancetta", "medium", "https://example.com/carbonara.jpg", "Spaghetti, eggs, pancetta, Parmesan cheese, black pepper", "Cook spaghetti. Fry pancetta. Mix eggs and cheese. Combine all with spaghetti.", 0, "Spaghetti Carbonara" },
                    { 2, 2, 45, new DateTime(2024, 3, 27, 0, 0, 0, 0, DateTimeKind.Utc), "Traditional Italian dessert with coffee-soaked ladyfingers and mascarpone cream", "medium", "https://example.com/tiramisu.jpg", "Ladyfingers, mascarpone cheese, eggs, sugar, coffee, cocoa powder", "Dip ladyfingers in coffee. Layer with mascarpone mixture. Dust with cocoa.", 0, "Classic Tiramisu" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_ChefId",
                table: "Recipes",
                column: "ChefId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Recipes");

            migrationBuilder.DropTable(
                name: "Chefs");
        }
    }
}
