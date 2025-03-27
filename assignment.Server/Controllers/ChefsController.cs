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
    public class ChefsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ChefsController> _logger;

        public ChefsController(ApplicationDbContext context, ILogger<ChefsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("featured")]
        public async Task<ActionResult<IEnumerable<Chef>>> GetFeaturedChefs()
        {
            try
            {
                var featuredChefs = await _context.Chefs.Take(3).ToListAsync();
                return Ok(featuredChefs);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting featured chefs");
                return StatusCode(500, new { message = "An error occurred while retrieving featured chefs" });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chef>>> GetChefs()
        {
            try
            {
                var chefs = await _context.Chefs.ToListAsync();
                return Ok(chefs);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all chefs");
                return StatusCode(500, new { message = "An error occurred while retrieving chefs" });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Chef>> GetChef(int id)
        {
            try
            {
                var chef = await _context.Chefs.FindAsync(id);

                if (chef == null)
                {
                    return NotFound(new { message = "Chef not found" });
                }

                return Ok(chef);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting chef with ID: {ChefId}", id);
                return StatusCode(500, new { message = "An error occurred while retrieving the chef" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Chef>> PostChef(Chef chef)
        {
            _context.Chefs.Add(chef);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetChef), new { id = chef.Id }, chef);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutChef(int id, Chef chef)
        {
            if (id != chef.Id)
            {
                return BadRequest();
            }

            _context.Entry(chef).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChef(int id)
        {
            var chef = await _context.Chefs.FindAsync(id);
            if (chef == null)
            {
                return NotFound();
            }

            _context.Chefs.Remove(chef);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("me")]
        public async Task<ActionResult<Chef>> GetCurrentChef()
        {
            try
            {
                var chef = await _context.Chefs.FirstOrDefaultAsync();
                if (chef == null)
                {
                    return NotFound(new { message = "No chef found" });
                }
                return Ok(chef);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting current chef");
                return StatusCode(500, new { message = "An error occurred while retrieving the current chef" });
            }
        }

        [HttpGet("me/recipes")]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetCurrentChefRecipes()
        {
            try
            {
                var chef = await _context.Chefs
                    .Include(c => c.Recipes)
                    .FirstOrDefaultAsync();

                if (chef == null)
                {
                    _logger.LogWarning("No chef found in the database");
                    return NotFound(new { message = "No chef found" });
                }

                _logger.LogInformation($"Found chef {chef.Id} with {chef.Recipes.Count} recipes");
                return Ok(chef.Recipes.ToList());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting current chef's recipes");
                return StatusCode(500, new { message = "An error occurred while retrieving the recipes" });
            }
        }

        [HttpPut("me")]
        public async Task<IActionResult> UpdateCurrentChef(Chef chef)
        {
            try
            {
                var existingChef = await _context.Chefs.FirstOrDefaultAsync();
                if (existingChef == null)
                {
                    return NotFound(new { message = "No chef found" });
                }

                existingChef.Name = chef.Name;
                existingChef.Bio = chef.Bio;
                existingChef.Specialty = chef.Specialty;
                existingChef.Email = chef.Email;
                existingChef.Location = chef.Location;
                existingChef.PictureUrl = chef.PictureUrl;

                await _context.SaveChangesAsync();
                return Ok(existingChef);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating current chef");
                return StatusCode(500, new { message = "An error occurred while updating the chef" });
            }
        }

        [HttpGet("{id}/recipes")]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetChefRecipes(int id)
        {
            var chef = await _context.Chefs
                .Include(c => c.Recipes)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (chef == null)
            {
                return NotFound();
            }

            return Ok(chef.Recipes);
        }
    }
}

