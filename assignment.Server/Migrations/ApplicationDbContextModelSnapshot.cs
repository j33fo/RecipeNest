﻿// <auto-generated />
using System;
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

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PictureUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Specialty")
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
                            Email = "chef.john@example.com",
                            Location = "New York",
                            Name = "Chef John",
                            PictureUrl = "https://as1.ftcdn.net/v2/jpg/09/75/08/76/1000_F_975087698_PrQR8CiZQOCDZpzvksP5YRGcDzVTgqEB.jpg",
                            Specialty = "Italian Cuisine"
                        },
                        new
                        {
                            Id = 2,
                            Bio = "A pastry chef known for her delicious desserts.",
                            ContactInfo = "chef.jane@example.com",
                            Email = "chef.jane@example.com",
                            Location = "Los Angeles",
                            Name = "Chef Jane",
                            PictureUrl = "https://imgs.search.brave.com/9zdV4Sb45HXHEd0P3O4Q_wqGfqxpRGKWnogpfaBpaQg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzExLzUxLzY4LzY5/LzM2MF9GXzExNTE2/ODY5NzZfWDFFaGpY/N1E3R2tIUW1LdElV/UmtpVGU5WFlDUXkz/Q1guanBn",
                            Specialty = "Pastry"
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

                    b.Property<int>("CookingTime")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Difficulty")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Ingredients")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Instructions")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Likes")
                        .HasColumnType("int");

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
                            CookingTime = 30,
                            CreatedAt = new DateTime(2024, 3, 27, 0, 0, 0, 0, DateTimeKind.Utc),
                            Description = "Classic Italian pasta dish with eggs, cheese, and pancetta",
                            Difficulty = "medium",
                            ImageUrl = "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/spaghetti-carbonara-366e331.jpg?quality=90&webp=true&resize=93,84",
                            Ingredients = "Spaghetti, eggs, pancetta, Parmesan cheese, black pepper",
                            Instructions = "Cook spaghetti. Fry pancetta. Mix eggs and cheese. Combine all with spaghetti.",
                            Likes = 0,
                            Title = "Spaghetti Carbonara"
                        },
                        new
                        {
                            Id = 2,
                            ChefId = 2,
                            CookingTime = 45,
                            CreatedAt = new DateTime(2024, 3, 27, 0, 0, 0, 0, DateTimeKind.Utc),
                            Description = "Traditional Italian dessert with coffee-soaked ladyfingers and mascarpone cream",
                            Difficulty = "medium",
                            ImageUrl = "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001515_11-62be4ec.jpg?quality=90&webp=true&resize=300,272",
                            Ingredients = "Ladyfingers, mascarpone cheese, eggs, sugar, coffee, cocoa powder",
                            Instructions = "Dip ladyfingers in coffee. Layer with mascarpone mixture. Dust with cocoa.",
                            Likes = 0,
                            Title = "Classic Tiramisu"
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
