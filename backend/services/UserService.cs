using UserApi.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;

namespace UserApi.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IUsersDatabaseSettings settings){
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }
        public List<User> Get(int skip, int limit) =>
            _users.Find(user => true).Skip(skip).Limit(limit).ToList();

        public List<User> GetByName(string name)
        {
            _users.Indexes.CreateOne(new CreateIndexModel<User>(
                    Builders<User>.IndexKeys.Text("fullName"),
                    new CreateIndexOptions() {DefaultLanguage = "portuguese", Name = "UserNames"}
                )
            );
            return  _users.AsQueryable().Where(
                nm => nm.fullName.ToLower().Contains(name)
                ).ToList();
        }

        public User Get(string id) =>
            _users.Find<User>(user => user.id == id).FirstOrDefault();

        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }
        public void Update(string id, User userIn)=>
            _users.ReplaceOne(user => user.id == id, userIn);

        public void Remove(User userIn) =>
            _users.DeleteOne(user => user.id == userIn.id);

        public void Remove(string id) =>
            _users.DeleteOne(user => user.id == id);

        public long Count()=>
            _users.CountDocuments(new BsonDocument());
    }
}