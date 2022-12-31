﻿namespace backend.Models.inputs
{
    public class OffreInput
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public double TauxRemise { get; set; }
        public DateTime DateExperation { get; set; }
    
    }
}