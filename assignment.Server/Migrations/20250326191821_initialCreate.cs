using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace assignment.Server.Migrations
{
    /// <inheritdoc />
    public partial class initialCreate : Migration
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
                    ContactInfo = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                    Ingredients = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Instructions = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ChefId = table.Column<int>(type: "int", nullable: false)
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
                columns: new[] { "Id", "Bio", "ContactInfo", "Name", "PictureUrl" },
                values: new object[,]
                {
                    { 1, "An experienced chef with a passion for Italian cuisine.", "chef.john@example.com", "Chef John", "https://example.com/chef-john.jpg" },
                    { 2, "A pastry chef known for her delicious desserts.", "chef.jane@example.com", "Chef Jane", "https://example.com/chef-jane.jpg" }
                });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "ChefId", "Ingredients", "Instructions", "Title" },
                values: new object[,]
                {
                    { 1, 1, "Spaghetti, eggs, pancetta, Parmesan cheese, black pepper", "Cook spaghetti. Fry pancetta. Mix eggs and cheese. Combine all with spaghetti.", "Spaghetti Carbonara" },
                    { 2, 2, "Ladyfingers, mascarpone cheese, coffee, cocoa powder, sugar, eggs", "Layer ladyfingers soaked in coffee with mascarpone mixture. Dust with cocoa powder.", "Tiramisu" }
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
