﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using assignment.Server.Data;

#nullable disable

namespace assignment.Server.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("assignment.Server.Models.Chef", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Bio")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactInfo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PictureUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Chefs");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Bio = "An experienced chef with a passion for Italian cuisine.",
                            ContactInfo = "chef.john@example.com",
                            Name = "Chef John",
                            PictureUrl = "https://example.com/chef-john.jpg"
                        },
                        new
                        {
                            Id = 2,
                            Bio = "A pastry chef known for her delicious desserts.",
                            ContactInfo = "chef.jane@example.com",
                            Name = "Chef Jane",
                            PictureUrl = "https://example.com/chef-jane.jpg"
                        });
                });

            modelBuilder.Entity("assignment.Server.Models.Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ChefId")
                        .HasColumnType("int");

                    b.Property<string>("Ingredients")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Instructions")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ChefId");

                    b.ToTable("Recipes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ChefId = 1,
                            Ingredients = "Spaghetti, eggs, pancetta, Parmesan cheese, black pepper",
                            Instructions = "Cook spaghetti. Fry pancetta. Mix eggs and cheese. Combine all with spaghetti.",
                            Title = "Spaghetti Carbonara"
                        },
                        new
                        {
                            Id = 2,
                            ChefId = 2,
                            Ingredients = "Ladyfingers, mascarpone cheese, coffee, cocoa powder, sugar, eggs",
                            Instructions = "Layer ladyfingers soaked in coffee with mascarpone mixture. Dust with cocoa powder.",
                            Title = "Tiramisu"
                        });
                });

            modelBuilder.Entity("assignment.Server.Models.Recipe", b =>
                {
                    b.HasOne("assignment.Server.Models.Chef", "Chef")
                        .WithMany("Recipes")
                        .HasForeignKey("ChefId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Chef");
                });

            modelBuilder.Entity("assignment.Server.Models.Chef", b =>
                {
                    b.Navigation("Recipes");
                });
#pragma warning restore 612, 618
        }
    }
}
