using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using assignment.Server.Data;
using assignment.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace assignment.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RecipesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("latest")]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetLatestRecipes()
        {
            var latestRecipes = await _context.Recipes.OrderByDescending(r => r.Id).Take(5).ToListAsync();
            return latestRecipes;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
        {
            return await _context.Recipes.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Recipe>> CreateRecipe(Recipe recipe)
        {
            // For now, we'll associate the recipe with the first chef
            var chef = await _context.Chefs.FirstOrDefaultAsync();
            if (chef == null)
            {
                return BadRequest("No chef found to associate with the recipe");
            }

            recipe.ChefId = chef.Id;
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRecipes), new { id = recipe.Id }, recipe);
        }
    }
}

