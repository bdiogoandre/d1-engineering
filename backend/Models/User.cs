using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace UserApi.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id {get; set;}

        [BsonElement("Name")]
        public string fname{get;set;}
        [BsonElement("Lname")]
        public string lname{get; set;}
        public string fullName {get; set;}
        public string nascimento{get; set;}
        public string cpf{get;set;}
        public string rg{get;set;}
        public string facebook{get;set;}
        public string twitter{get; set;}
        public string linkedin{get; set;}
        public string instagram{get; set;}
        public List<Enderecos> enderecos{get; set;}
        public List<Telefones> telefones{get; set;}
    }
    public class Enderecos
    {
        public string endereco{get; set;}
        public string numero{get;set;}
        public string cep{get;set;}
        public string bairro{get;set;}
        public string cidade{get; set;}
        public string estado{get; set;}
    }
    public class Telefones
    {
        public string telefone{get; set;}
        public string telefoneLocal{get;set;}
    }
}