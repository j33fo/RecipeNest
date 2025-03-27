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
    public class ChefsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ChefsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("featured")]
        public async Task<ActionResult<IEnumerable<Chef>>> GetFeaturedChefs()
        {
            var featuredChefs = await _context.Chefs.Take(3).ToListAsync();
            return featuredChefs;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chef>>> GetChefs()
        {
            return await _context.Chefs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Chef>> GetChef(int id)
        {
            var chef = await _context.Chefs.FindAsync(id);

            if (chef == null)
            {
                return NotFound();
            }

            return chef;
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
            // For now, we'll return the first chef as a placeholder
            var chef = await _context.Chefs.FirstOrDefaultAsync();
            if (chef == null)
            {
                return NotFound();
            }
            return chef;
        }

        [HttpPut("me")]
        public async Task<IActionResult> UpdateCurrentChef(Chef chef)
        {
            // For now, we'll update the first chef as a placeholder
            var existingChef = await _context.Chefs.FirstOrDefaultAsync();
            if (existingChef == null)
            {
                return NotFound();
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

        [HttpGet("me/recipes")]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetCurrentChefRecipes()
        {
            // For now, we'll return recipes for the first chef
            var chef = await _context.Chefs.FirstOrDefaultAsync();
            if (chef == null)
            {
                return NotFound("Chef not found");
            }

            var recipes = await _context.Recipes
                .Where(r => r.ChefId == chef.Id)
                .ToListAsync();

            return recipes;
        }
    }
}

