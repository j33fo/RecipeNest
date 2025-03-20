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
            // Logic to get latest recipes (e.g., top 5 latest recipes)
            var latestRecipes = await _context.Recipes.OrderByDescending(r => r.Id).Take(5).ToListAsync();
            return latestRecipes;
        }
    }
}
