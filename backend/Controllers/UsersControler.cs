using UserApi.Models;
using UserApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;

namespace UserApi.Controllers{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class UsersController : ControllerBase{
        private readonly UserService _userService;
        public UsersController(UserService userService){
            _userService = userService;
        }
        [HttpGet("{skip:int}")]
        public ActionResult<List<User>> Get(int skip)=>
            _userService.Get(skip, 10);
        
        [HttpGet("count")]
        public long Count()
        {
            return _userService.Count();
        }

        [HttpGet("name/{fullName}")]
        public ActionResult<List<User>> GetByName(string fullName)
        {
            return _userService.GetByName(fullName);
        }

        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public ActionResult<User> Get(string id)
        {
            var user = _userService.Get(id);
            if(user == null)
            {
                return NotFound();
            }
            return user;            
        }
        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            _userService.Create(user);
            return CreatedAtRoute("GetUser", new {id = user.id.ToString()}, user);
        }
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, User userIn)
        {
            var user = _userService.Get(id);
            if(user == null)
            {
                return NotFound();
            }
            _userService.Update(id, userIn);
            return NoContent();
        }
        [HttpDelete("delete/{id:length(24)}")]
        public IActionResult Delete(string Id)
        {
            var user = _userService.Get(Id);
            if(user == null)
            {
                return NotFound();
            }
            _userService.Remove(user.id);
            return NoContent();
        }
    }
}