using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using assignment.Server.Data;
using assignment.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace assignment.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<RecipesController> _logger;

        public RecipesController(ApplicationDbContext context, ILogger<RecipesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("latest")]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetLatestRecipes()
        {
            try
            {
                var latestRecipes = await _context.Recipes
                    .Include(r => r.Chef)
                    .OrderByDescending(r => r.CreatedAt)
                    .Take(5)
                    .ToListAsync();
                return Ok(latestRecipes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting latest recipes");
                return StatusCode(500, new { message = "An error occurred while retrieving the latest recipes" });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
        {
            try
            {
                var recipes = await _context.Recipes
                    .Include(r => r.Chef)
                    .ToListAsync();
                return Ok(recipes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all recipes");
                return StatusCode(500, new { message = "An error occurred while retrieving the recipes" });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Recipe>> GetRecipe(int id)
        {
            try
            {
                var recipe = await _context.Recipes
                    .Include(r => r.Chef)
                    .FirstOrDefaultAsync(r => r.Id == id);

                if (recipe == null)
                {
                    return NotFound(new { message = "Recipe not found" });
                }

                return Ok(recipe);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting recipe with ID: {RecipeId}", id);
                return StatusCode(500, new { message = "An error occurred while retrieving the recipe" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Recipe>> CreateRecipe(Recipe recipe)
        {
            try
            {
                _logger.LogInformation("Received recipe creation request: {@Recipe}", recipe);

                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("Invalid model state: {@ModelState}", ModelState);
                    return BadRequest(new { message = "Invalid recipe data", errors = ModelState.Values.SelectMany(v => v.Errors) });
                }

                // For now, we'll associate the recipe with the first chef
                var chef = await _context.Chefs.FirstOrDefaultAsync();
                if (chef == null)
                {
                    _logger.LogWarning("No chef found to associate with the recipe");
                    return BadRequest(new { message = "No chef found to associate with the recipe" });
                }

                recipe.ChefId = chef.Id;
                recipe.CreatedAt = DateTime.UtcNow;
                recipe.Likes = 0;

                _context.Recipes.Add(recipe);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Successfully created recipe with ID: {RecipeId}", recipe.Id);
                return CreatedAtAction(nameof(GetRecipes), new { id = recipe.Id }, recipe);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating recipe");
                return StatusCode(500, new { message = "An error occurred while creating the recipe" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecipe(int id, Recipe recipe)
        {
            try
            {
                if (id != recipe.Id)
                {
                    return BadRequest(new { message = "Recipe ID mismatch" });
                }

                var existingRecipe = await _context.Recipes.FindAsync(id);
                if (existingRecipe == null)
                {
                    return NotFound(new { message = "Recipe not found" });
                }

                existingRecipe.Title = recipe.Title;
                existingRecipe.Description = recipe.Description;
                existingRecipe.Ingredients = recipe.Ingredients;
                existingRecipe.Instructions = recipe.Instructions;
                existingRecipe.CookingTime = recipe.CookingTime;
                existingRecipe.Difficulty = recipe.Difficulty;
                existingRecipe.ImageUrl = recipe.ImageUrl;

                await _context.SaveChangesAsync();
                return Ok(existingRecipe);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating recipe with ID: {RecipeId}", id);
                return StatusCode(500, new { message = "An error occurred while updating the recipe" });
            }
        }
    }
}

