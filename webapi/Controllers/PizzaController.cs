using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PizzaController : ControllerBase
    {
        private static readonly List<Pizza> PizzaData = new List<Pizza>
        {
            new Pizza { Id = 1, Name = "Margherita", Description = "Tomato sauce, mozzarella, and basil" },
            new Pizza { Id = 2, Name = "Pepperoni", Description = "Tomato sauce, mozzarella, and pepperoni" },
            new Pizza { Id = 3, Name = "Hawaiian", Description = "Tomato sauce, mozzarella, ham, and pineapple" }
        };

        [HttpGet]
        public IEnumerable<Pizza> Get()
        {
            return PizzaData;
        }

        [HttpGet("{id}")]
        public ActionResult<Pizza> Get(int id)
        {
            var pizza = PizzaData.FirstOrDefault(x => x.Id == id);
            if (pizza == null)
            {
                return NotFound();
            }
            return pizza;
        }

        [HttpDelete("{id}")]
        public ActionResult RemovePizzaById(int id)
        {
            var pizza = PizzaData.FirstOrDefault(p => p.Id == id);
            if (pizza == null)
            {
                return NotFound();
            }
            PizzaData.Remove(pizza);
            return NoContent();
        }

        [HttpPut("{id}")]
        public ActionResult<Pizza> EditPizza(int id, [FromBody] Pizza updatedPizza)
        {
            var pizza = PizzaData.FirstOrDefault(p => p.Id == id);
            if (pizza == null)
            {
                return NotFound();
            }

            pizza.Name = updatedPizza.Name;
            pizza.Description = updatedPizza.Description;

            return NoContent();
        }

        [HttpPost]
        public ActionResult<Pizza> AddPizza([FromBody] Pizza newPizza)
        {
            newPizza.Id = PizzaData.Max(p => p.Id) + 1;

            PizzaData.Add(newPizza);

            return CreatedAtAction(nameof(Get), new { id = newPizza.Id }, newPizza);
;       }
    }
}